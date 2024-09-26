CREATE TABLE User (
    username TEXT NOT NULL,
    region TEXT NOT NULL
);

CREATE TABLE Products (
    articleID INT PRIMARY KEY,
    name TEXT NOT NULL,
    price INT NOT NULL,
    description TEXT
);

CREATE TABLE ProductInformation (
    articleID INT PRIMARY KEY,
    info_description TEXT,
    designer TEXT,
    info TEXT,
    material TEXT,
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