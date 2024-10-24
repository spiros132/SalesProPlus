DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS ProductInformation;
DROP TABLE IF EXISTS ProductDimensions;
DROP TABLE IF EXISTS ProductsFTS;
DROP TABLE IF EXISTS ProductCategories;
DROP TABLE IF EXISTS ProductMaterials;
DROP TABLE IF EXISTS Materials;

CREATE TABLE User (
    username TEXT NOT NULL,
    department TEXT NOT NULL,
    region TEXT NOT NULL
);

CREATE TABLE Products (
    articleID INT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    description TEXT
);

create table ProductCategories (
    categoryID TEXT PRIMARY KEY,
    categoryName TEXT NOT NULL,
    categoryImage TEXT NOT NULL,
    parent TEXT REFERENCES ProductCategories(categoryID) on delete cascade
);

create table Materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT KEY,
    country TEXT,
    emissions int,
    emission_unit TEXT, 
    recycling int,
    image TEXT NOT NULL, 
    description TEXT NOT NULL
);

CREATE TABLE ProductInformation (
    articleID INT PRIMARY KEY,
    info_description TEXT,
    designer TEXT,
    info TEXT,
    category text REFERENCES ProductCategories(categoryID),
    safety TEXT,
    manuals TEXT,
    FOREIGN KEY (articleID) REFERENCES Products(articleID)
);

CREATE TABLE ProductDimensions (
    articleID INT PRIMARY KEY,
    unit CHECK( unit IN ('CM','M','H') ),
    height INT,
    width INT,
    depth INT,
    length INT,
    weight INT,
    packaging TEXT,
    FOREIGN KEY (articleID) REFERENCES Products(articleID)
);

CREATE TABLE ProductMaterials (
    material int REFERENCES Materials(id),
    articleID INT REFERENCES Products(articleID),
    part TEXT NOT NULL,
    PRIMARY KEY (material, articleID)
);

CREATE VIRTUAL TABLE ProductsFTS USING fts5 (
    articleID,
    name,
    description,
    tokenize="trigram case_sensitive 0"
);

CREATE TABLE Questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    author TEXT,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES Products(articleID)
);

CREATE TABLE Answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    author TEXT,
    question_id INT NOT NULL,
    FOREIGN KEY (question_Id) REFERENCES Questions(id)
);

CREATE TRIGGER after_products_insert_update
AFTER INSERT ON Products
BEGIN
    INSERT INTO ProductsFTS(articleID, name, description) 
    VALUES (new.articleID, new.name, new.description);
END;

CREATE TRIGGER after_products_update
AFTER UPDATE ON Products
BEGIN
    UPDATE ProductsFTS
    SET 
        name = new.name, 
        description = new.description
    WHERE articleID = new.articleID;
END;

CREATE TRIGGER after_products_delete
AFTER DELETE ON Products
BEGIN
    DELETE FROM ProductsFTS 
    WHERE articleID = old.articleID;
END;