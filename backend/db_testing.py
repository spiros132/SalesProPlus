import sqlite3

db = sqlite3.connect("test.db")

cursor =  db.cursor()

with open('tables.sql', 'r') as sql_file:
    sql_script = sql_file.read()

cursor.executescript(sql_script)

with open('insert.sql', 'r') as sql_file:
    sql_script = sql_file.read()

cursor.executescript(sql_script)