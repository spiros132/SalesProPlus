from fastapi import FastAPI
import sqlite3

DB_PATH = "test.db"

db = sqlite3.connect(DB_PATH)
app = FastAPI()

@app.get("/search/{prompt}")
def search_prompt(prompt: str):

    with db.cursor() as cur:
        res = cur.execute("""
            select * from Products where description match ?
            """, prompt)
        
    return res.Rows
    
@app.get("/product/{id}")
def product_page(id: int):

    with db.cursor() as cur:
        res = cur.execute("""
            select * from ProductInformation where ArticleId = ?
            """, id)
        
    return res.Rows

db.close()