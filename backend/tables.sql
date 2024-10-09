DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS ProductInformation;
DROP TABLE IF EXISTS ProductDimensions;
DROP TABLE IF EXISTS ProductsFTS;

CREATE TABLE User (
    username TEXT NOT NULL,
    department TEXT NOT NULL,
    region TEXT NOT NULL
);

create table ProductCategories (
    name TEXT PRIMARY KEY,
    parent TEXT REFERENCES ProductCategories(name),
);

create table Materials (
    name TEXT PRIMARY KEY,
    country TEXT,
    emission int,
);

create table ProductMaterials (
    material TEXT REFERENCES Materials(name),
    FOREIGN KEY (articleID) REFERENCES Products(articleID),
    primary key (material, articleID)
);

CREATE TABLE Products (
    articleID INT PRIMARY KEY,
    name TEXT NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    description TEXT
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
    packaging TEXT,
    FOREIGN KEY (articleID) REFERENCES Products(articleID)
);

CREATE VIRTUAL TABLE ProductsFTS USING fts5 (
    articleID,
    name,
    description,
    tokenize="trigram case_sensitive 0"
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