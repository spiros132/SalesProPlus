import sqlite3

def test_db():
    with sqlite3.connect("test.db") as db:
        with db.cursor() as cursor:

            with open('insert.sql', 'r') as sql_file:
                sql_script = sql_file.read()

        cursor.executescript(sql_script)
