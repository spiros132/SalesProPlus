from fastapi import FastAPI
import sqlite3

app = FastAPI()

@app.get("/")
def get_root():
    return {"Hello": "World"}

connection = sqlite3.connect("test.db")
cursor = connection.cursor()

""" with open('insert.sql', 'r') as sql_file:
    sql_script = sql_file.read()

cursor.executescript(sql_script) """

connection.close()