from fastapi import FastAPI
import uvicorn
import sqlite3

DB_PATH = "test.db"
app = FastAPI()

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
        return {"error": "no product found"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
