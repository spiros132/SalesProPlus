INSERT INTO Products VALUES (
    10575064, 
    "IKEA PS 1995", 
    499, 
    2, 
    "Klockan IKEA PS 1995 visar tiden och är också en iögonfallande dekoration i ditt hem. Du kan hänga den på väggen eller ställa den på en hylla – och öppna fronten på klockan och förvara småsaker."
);

insert into ProductCategories (categoryID, category) values 
    ("sovrum", NULL), 
    ("bed", "sovrum"), 
    ("lamp", "sovrum");

insert into Material (name, country, emission) values (
    "Stål", 
    "Sverige", 
    1
);


insert into ProductMaterials (material, articleId) values (
    "Stål", 
    10575064
);

INSERT INTO ProductInformation (
    ProductID, 
    Description, 
    Designer, 
    AdditionalInfo, 
    Material, 
    Category
    Certification, 
    ManualURL
) VALUES (
    10575064, 
    "Klockan är även en bra förvaringsplats för småsaker. Inga störande tickande ljud, eftersom klockan har ett tyst kvartsurverk. Kan hängas på väggen eller ställas på en hylla. Visar tiden exakt, eftersom den är utrustad med ett quartzurverk.", 
    "Thomas Eriksson", 
    "Batterier säljs separat. IKEA rekommenderar det laddningsbara batteriet LADDA. Denna klocka fungerar även med alkaliska batterier, 1xAA. Olika väggmaterial kräver olika typer av fästbeslag. Använd beslag som passar väggarna i ditt hem, säljes separat.", 
    "sovrum",
    "Denna produkt bär CE-märket.", 
    "https://www.ikea.com/se/sv/manuals/ikea-ps-1995-klocka-bla__AA-2328816-2-2.pdf"
);

INSERT INTO ProductDimensions (
    ProductID, 
    Unit, 
    Height, 
    Width, 
    Length, 
    Weight, 
    Packaging
) VALUES (
    10575064, 
    "CM", 
    15, 
    48, 
    29, 
    NULL, 
    "bredd: 30 cm  Höjd: 15 cm  Längd: 49 cm  Vikt: 3.40 kg  Förpackning(ar): 1"
);
