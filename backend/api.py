from fastapi import FastAPI
import uvicorn
import sqlite3

DB_PATH = "test.db"
app = FastAPI()

@app.get("/search/{prompt}")
def search_prompt(prompt: str):

    db = sqlite3.connect(DB_PATH)

    cursor = db.cursor()
    
    cursor.execute("""
        SELECT 
            p.articleID 
        FROM Products p
        JOIN ProductsFTS s ON p.articleID = s.articleID 
        WHERE ProductsFTS MATCH ?
        """, (prompt,))
    
    result = cursor.fetchall()
    cursor.close()
    db.close()

    return result
    
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
            pd.dimensions, 
            pd.packaging
        FROM Products p
        LEFT JOIN ProductInformation pi ON p.articleID = pi.articleID
        LEFT JOIN ProductDimensions pd ON p.articleID = pd.articleID
        WHERE p.articleID = ?
        """, (id,))
    
    result = cursor.fetchone()
    cursor.close()
    db.close()
        
    return result 


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
