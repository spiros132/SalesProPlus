from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sqlite3
from pydantic import BaseModel
import os
from typing import Optional, Tuple

#pip install fastapi

DB_PATH = "test.db"
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def check_working():
    return "Working"

@app.get("/chat/{question}")
def chat(question: str):
    return ""

class Filter(BaseModel):
    min_price: Optional[int] = None
    max_price: Optional[int] = None
    min_height: Optional[int] = None
    max_height: Optional[int] = None
    min_width: Optional[int] = None
    max_width: Optional[int] = None
    min_depth: Optional[int] = None
    max_depth: Optional[int] = None
    min_length: Optional[int] = None
    max_length: Optional[int] = None
    category: Optional[str] = None


@app.get("/search")
def search_prompt(q: Optional[str] = None, filters: Filter = Depends()):

    db = sqlite3.connect(DB_PATH)
    cursor = db.cursor()

    query = """
        SELECT
            BM25(ProductsFTS),
            p.*,
            pd.*
        FROM Products p
        LEFT JOIN ProductDimensions pd ON p.articleID = pd.articleID
        LEFT JOIN ProductInformation pi ON p.articleID = pi.articleID
        JOIN ProductsFTS s ON p.articleID = s.articleID 
    """
    params = []

    if q is not None and q != "":
        query += "WHERE ProductsFTS MATCH ?"
        params.append(q)

 
    if filters.min_price:
        query += " AND p.price >= ?"
        params.append(filters.min_price)
    if filters.max_price:
        query += " AND p.price <= ?"
        params.append(filters.max_price)
    

    if filters.min_height:
        query += " AND pd.height >= ?"
        params.append(filters.min_height)
    if filters.max_height:
        query += " AND pd.height <= ?"
        params.append(filters.max_height)


    if filters.min_width:
        query += " AND pd.width >= ?"
        params.append(filters.min_width)
    if filters.max_width:
        query += " AND pd.width <= ?"
        params.append(filters.max_width)


    if filters.min_depth is not None:
        query += " AND pd.depth >= ?"
        params.append(filters.min_depth)
    if filters.max_depth is not None:
        query += " AND pd.depth <= ?"
        params.append(filters.max_depth)
    

    if filters.min_length is not None:
        query += " AND pd.length >= ?"
        params.append(filters.min_length)
    if filters.max_length is not None:
        query += " AND pd.length <= ?"
        params.append(filters.max_length)

    if filters.category is not None:
        query += " AND pi.category = ?"
        params.append(filters.category)

    query += " ORDER BY BM25(ProductsFTS)"
    
    cursor.execute(query, tuple(params))
    
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
            pi.safety, 
            pi.manuals, 
            pi.category,
            pd.unit,
            pd.height,
            pd.width,
            pd.depth,
            pd.length,
            pd.packaging,
            GROUP_CONCAT(pm.material, ', ') AS materials
        FROM Products p
        LEFT JOIN ProductInformation pi ON p.articleID = pi.articleID
        LEFT JOIN ProductDimensions pd ON p.articleID = pd.articleID
        left join ProductMaterials pm on p.articleID = pm.articleID
        WHERE p.articleID = ?
        GROUP BY p.articleID;
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

@app.get("/categories")
def categories(parent: Optional[str] = None):
    db = sqlite3.connect(DB_PATH)
    cursor = db.cursor()
    if parent is not None:
        cursor.execute("""
            SELECT *
            FROM ProductCategories c
            WHERE c.parent = ?
        """, (parent, ))
    else:
        cursor.execute("""
            SELECT *
            FROM ProductCategories c
            WHERE c.parent IS NULL
        """)
    result = cursor.fetchall()
    cursor.close()
    db.close()

    column_names = [description[0] for description in cursor.description]

    return [dict(zip(column_names, row)) for row in result]

@app.get("/categories/{id}")
def categories(id: str):
    db = sqlite3.connect(DB_PATH)
    cursor = db.cursor()
    cursor.execute("""
        SELECT *
        FROM ProductCategories c
        WHERE c.categoryID = ?
    """, (id,))
    result = cursor.fetchone()
    cursor.close()
    db.close()

    column_names = [description[0] for description in cursor.description]

    return dict(zip(column_names, result))

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