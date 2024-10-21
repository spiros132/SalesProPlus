import sqlite3
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

db = sqlite3.connect(os.path.join(script_dir, "test.db"))
cursor = db.cursor()

cursor.execute(
    """SELECT name FROM sqlite_master WHERE type = 'table';"""
)
print(cursor.fetchall())

tables_sql_path = os.path.join(script_dir, 'tables.sql')

with open(tables_sql_path, 'r') as sql_file:
    sql_script = sql_file.read()
cursor.executescript(sql_script)

cursor.execute(
   """ INSERT INTO Products VALUES (
    10575064, 
    "IKEA PS 1995",
    "https://www.ikea.com/se/sv/images/products/ikea-ps-1995-klocka-bla__1277238_pe931019_s5.jpg",
    499, 
    2, 
    "Klockan IKEA PS 1995 visar tiden och är också en iögonfallande dekoration i ditt hem. Du kan hänga den på väggen eller ställa den på en hylla – och öppna fronten på klockan och förvara småsaker."
);"""
)

cursor.execute(
    """insert into ProductCategories (categoryID, categoryName, categoryImage, parent) values 
    ("sovrum", "Sovrum", "https://www.ikea.com/ext/ingkadam/m/5b082ba034c824b8/original/PH200846.jpg?imwidth=500", NULL), 
    ("bed", "Beds", "https://www.ikea.com/se/sv/range-categorisation/images/product/beds-bm003.jpeg?imwidth=500", "sovrum"), 
    ("lamp", "Lamps", "https://www.ikea.com/global/assets/range-categorisation/images/product/lamps-li002.jpeg?imwidth=500", "sovrum");"""
)

cursor.execute(
    """insert into Materials (name, country, emission) values (
    "Stål", 
    "Sverige", 
    1
);"""
)

cursor.execute(
    """insert into ProductMaterials (material, part, articleId) values (
    "Stål",
    "ram",
    10575064
);"""
)

cursor.execute(
    """INSERT INTO ProductInformation (
    articleID, 
    info_description, 
    Designer, 
    info, 
    category,
    safety, 
    manuals
) VALUES (
    10575064, 
    "Klockan är även en bra förvaringsplats för småsaker. Inga störande tickande ljud, eftersom klockan har ett tyst kvartsurverk. Kan hängas på väggen eller ställas på en hylla. Visar tiden exakt, eftersom den är utrustad med ett quartzurverk.", 
    "Thomas Eriksson", 
    "Batterier säljs separat. IKEA rekommenderar det laddningsbara batteriet LADDA. Denna klocka fungerar även med alkaliska batterier, 1xAA. Olika väggmaterial kräver olika typer av fästbeslag. Använd beslag som passar väggarna i ditt hem, säljes separat.", 
    "sovrum",
    "Denna produkt bär CE-märket.", 
    "https://www.ikea.com/se/sv/manuals/ikea-ps-1995-klocka-bla__AA-2328816-2-2.pdf"
);
"""
)

cursor.execute(
    """INSERT INTO ProductDimensions (
    articleID, 
    Unit, 
    Height, 
    Width, 
    depth,
    length, 
    weight, 
    Packaging
) VALUES (
    10575064, 
    "CM", 
    15, 
    48, 
    23,
    29, 
    3.40,
    "bredd: 30 cm  Höjd: 15 cm  Längd: 49 cm  Vikt: 3.40 kg  Förpackning(ar): 1"
);
"""
)

cursor.execute("""
    INSERT INTO User (username, department, region) VALUES ("test", "kallered", "sweden")
""")

db.commit()


cursor.execute(
    """SELECT name FROM sqlite_master WHERE type = 'table';"""
)
print(cursor.fetchall())
cursor.close()
db.close()