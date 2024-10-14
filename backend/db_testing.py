import sqlite3
import os

db = sqlite3.connect("test.db")
cursor = db.cursor()

cursor.execute(
    """SELECT name FROM sqlite_master WHERE type = 'table';"""
)
print(cursor.fetchall())

script_dir = os.path.dirname(os.path.abspath(__file__))

tables_sql_path = os.path.join(script_dir, 'tables.sql')
insert_sql_path = os.path.join(script_dir, 'insert.sql')

with open(tables_sql_path, 'r') as sql_file:
    sql_script = sql_file.read()
cursor.executescript(sql_script)

with open(insert_sql_path, 'r') as sql_file:
    sql_script = sql_file.read()
cursor.executescript(sql_script)

db.commit()


cursor.execute(
    """SELECT name FROM sqlite_master WHERE type = 'table';"""
)
print(cursor.fetchall())
cursor.close()
db.close()