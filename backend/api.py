from fastapi import FastAPI, HTTPException
import uvicorn
import sqlite3
from dotenv import load_dotenv
from pydantic import BaseModel
import os

#pip install fastapi

DB_PATH = "test.db"
app = FastAPI()
load_dotenv() 

# a function to send the question to the model and return the answer using vanna api
@app.get("/chat/{question}")
def chat(question: str):
    return ""

@app.get("/search/{prompt}")
def search_prompt(prompt: str):

    db = sqlite3.connect(DB_PATH)

    cursor = db.cursor()
    # name, price, dimensions, description
    cursor.execute("""
        SELECT
            BM25(ProductsFTS),
            p.*,
            pd.*
        FROM Products p
        LEFT JOIN ProductDimensions pd ON p.articleID = pd.articleID
        JOIN ProductsFTS s ON p.articleID = s.articleID 
        WHERE ProductsFTS MATCH ?
        ORDER BY BM25(ProductsFTS)
        """, (prompt,))
    
    result = cursor.fetchall()
    
    column_names = [description[0] for description in cursor.description]

    cursor.close()
    db.close()

    return [dict(zip(column_names, row)) for row in result]
    
@app.get("/product/{id}")
def product_page(id: int):

    db = sqlite3.connect(DB_PATH)

    cursor =  db.cursor()
    cursor.execute("""
        SELECT
            p.*, 
            pi.info_description, 
            pi.designer, 
            pi.info, 
            pi.material, 
            pi.safety, 
            pi.manuals, 
            pd.unit,
            pd.height,
            pd.width,
            pd.depth,
            pd.length,
            pd.packaging
        FROM Products p
        LEFT JOIN ProductInformation pi ON p.articleID = pi.articleID
        LEFT JOIN ProductDimensions pd ON p.articleID = pd.articleID
        WHERE p.articleID = ?
        """, (id,))
    
    result = cursor.fetchone()
    
    column_names = [description[0] for description in cursor.description]

    cursor.close()
    db.close()
    
    if result:
        return dict(zip(column_names, result))
    else:
        return HTTPException(status_code=404, detail="No products Found")

class LoginForm(BaseModel):
    username: str

@app.post("/login")
def login(loginForm: LoginForm):

    db = sqlite3.connect(DB_PATH)

    cursor =  db.cursor()

    cursor.execute(""" 
        SELECT * 
        FROM User 
        WHERE username = ?
        """,(loginForm.username,))
    
    user = cursor.fetchone()

    cursor.close()
    db.close()

    if user:
        return {"success": True, "username": user[0], "department": user[1], "region": user[2]}
    else:
        raise HTTPException(status_code=401, detail="User not found")

class RegisterForm(BaseModel):
    username: str
    department: str
    region: str

@app.post("/register")
def register(registerForm: RegisterForm):
    
    db = sqlite3.connect(DB_PATH)

    cursor =  db.cursor()

    cursor.execute(""" 
        SELECT * 
        FROM User 
        WHERE username = ?
        """,(registerForm.username,))
    
    user = cursor.fetchone()

    if user:
        cursor.close()
        db.close()
        raise HTTPException(status_code=400, detail="Username already taken")
    
    cursor.execute("""
        INSERT INTO User (username, department, region) 
        VALUES (?, ?, ?)
        """, (registerForm.username, registerForm.department, registerForm.region))
    db.commit()

    cursor.close()
    db.close()

    return {"success": True, "username": registerForm.username, "department": registerForm.department, "region": registerForm.region}
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)