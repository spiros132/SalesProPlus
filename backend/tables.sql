CREATE TABLE Products (
    articleID INT PRIMARY KEY,
    name TEXT NOT NULL,
    price INT NOT NULL,
    description TEXT
);

CREATE TABLE ProductInformation (
    articleID INT PRIMARY KEY,
    description TEXT,
    designer TEXT,
    info TEXT,
    material TEXT,
    safety TEXT,
    manuals TEXT,
    FOREIGN KEY (articleID) REFERENCES Products(articleID)
);

CREATE TABLE ProductDimensions (
    articleID INT PRIMARY KEY,
    dimensions TEXT,
    packaging TEXT,
    FOREIGN KEY (articleID) REFERENCES Products(articleID)
);

