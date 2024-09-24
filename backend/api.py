from fastapi import FastAPI
import sqlite3

db = sqlite3.connect("test.db")
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





 


cursor = db.cursor()

""" with open('insert.sql', 'r') as sql_file:
    sql_script = sql_file.read()

 cursor.executescript(sql_script) """

db.close()