import sqlite3
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

db = sqlite3.connect(os.path.join(script_dir, "test.db"))
cursor = db.cursor()

# Schema setup
tables_sql_path = os.path.join(script_dir, 'tables.sql')
with open(tables_sql_path, 'r') as sql_file:
    sql_script = sql_file.read()

try:
    cursor.executescript(sql_script)
except sqlite3.Error as e:
    print(f"Error executing schema: {e}")

# Insert sample data into Products
try:
    cursor.execute(
       """ INSERT INTO Products VALUES 
        (
            10575064, 
            "IKEA PS 1995",
            "https://www.ikea.com/se/sv/images/products/ikea-ps-1995-klocka-bla__1277238_pe931019_s5.jpg?width=500",
            499, 
            2, 
            "The IKEA PS 1995 clock shows the time and is also an eye-catching decoration in your home. You can hang it on the wall or put it on a shelf - and open the front of the clock and store small things."
        ),
        (
            69385750, 
            "SÄBÖVIK",
            "https://www.ikea.com/se/en/images/products/saeboevik-divan-bed-firm-vissle-grey__0891216_pe782251_s5.jpg?width=500",
            3795, 
            5, 
            "A complete bed designed to be comfortable both for sleeping and reading. It provides nice support where needed, has a soft feel where possible – and is smartly packaged, making it easy to transport."
        ),
        (
            40571248, 
            "SLATTUM",
            "https://www.ikea.com/se/sv/images/products/slattum-klaedd-saengstomme-vissle-moerkgra__1259335_pe926650_s5.jpg?width=500",
            1495, 
            0, 
            "SLATTUM bed frame has soft upholstery and a padded headboard that complete the stylish and simple lines. Easy to like – and convenient to bring home thanks to the whole frame coming in a single package."
        ),
        (
            90447176, 
            "IDANÄS",
            "https://www.ikea.com/se/en/images/products/idanaes-upholstered-storage-bed-gunnared-dark-grey__1151051_pe884753_s5.jpg?width=500",
            7995, 
            3, 
            "The sloping headboard and soft upholstery make this bed frame extra comfortable. Classic button detailing and turned wooden legs are timeless, while soft-closing drawers under the bed add everyday storage."
        ),
                (
            40407922, 
            "BRIMNES",
            "https://www.ikea.com/se/en/images/products/brimnes-wardrobe-with-3-doors-white__0176787_pe329567_s5.jpg?width=500",
            1995, 
            1, 
            "Small spaces need smart storage. This wardrobe has a clothes rail for shirts and dresses, shelves for folded clothes, shoes and bags – and a mirror door too so you avoid needing to mount a separate mirror."
        ),
        (
            40470089, 
            "VESTERÖY",
            "https://www.ikea.com/se/en/images/products/vesteroey-pocket-sprung-mattress-medium-firm-light-blue__1150853_pe884906_s5.jpg?width=500",
            1795, 
            0, 
            "A medium-firm 20 cm high mattress with individual pocket springs and a layer of foam offers comfort and support. The cover with extra foam and a soft stretch fabric adds even more comfort."
        );
       """
    )
    db.commit()  # Commit after each insert block
    print("Product inserted.")
except sqlite3.Error as e:
    print(f"Error inserting into Products: {e}")

# Insert sample data into ProductCategories
try:
    cursor.execute(
        """INSERT INTO ProductCategories (categoryID, categoryName, categoryImage, parent) VALUES 
        ("bedroom", "Bedroom", "https://www.ikea.com/ext/ingkadam/m/5b082ba034c824b8/original/PH200846.jpg?imwidth=500", NULL), 
        ("bed", "Beds", "https://www.ikea.com/se/sv/range-categorisation/images/product/beds-bm003.jpeg?imwidth=500", "bedroom"), 

         ("doublebed", "Double Beds", "https://www.ikea.com/global/assets/range-categorisation/images/product/double-beds-16284.jpeg?imwidth=500", "bed"),
         ("sofa-bed", "Sofa-beds", "https://www.ikea.com/global/assets/range-categorisation/images/product/sofa-beds-10663.jpeg?imwidth=500", "bed"),
         ("divanbed", "Divan beds", "https://www.ikea.com/global/assets/range-categorisation/images/product/divan-beds-28433.jpeg?imwidth=500", "bed"),
         ("singlebed", "Single beds", "https://www.ikea.com/se/sv/range-categorisation/images/product/single-beds-16285.jpeg?imwidth=500", "bed"),

        ("lamp", "Lamps", "https://www.ikea.com/global/assets/range-categorisation/images/product/lamps-li002.jpeg?imwidth=500", "bedroom"),
        ("mattresses", "Mattresses", "https://www.ikea.com/global/assets/range-categorisation/images/product/mattresses-bm002.jpeg?imwidth=500", "bedroom"), 
        ("wardrobes", "Wardrobes", "https://www.ikea.com/global/assets/range-categorisation/images/product/wardrobes-19053.jpeg?imwidth=500", "bedroom"),
        ("lighting", "Lighting", "https://www.ikea.com/se/sv/range-categorisation/images/product/lighting-li001.jpeg?imwidth=500", "bedroom"),
        ("childrensroom", "Children's room", "https://www.ikea.com/ext/ingkadam/m/41d17d5948e99544/original/PH200516.jpg?imwidth=500", NULL),
         ("livingroom", "Living room", "https://www.ikea.com/ext/ingkadam/m/7262b24abd9b498f/original/PH200284.jpg?imwidth=500", NULL),
         ("kitchen", "Kitchen", "https://www.ikea.com/ext/ingkadam/m/3f08c0f072397c16/original/PH200757_SHI_001.jpg?imwidth=500", NULL),
         ("homeoffice", "Home office", "https://www.ikea.com/ext/ingkadam/m/2345c6d3fe01268b/original/PH199092.jpg?imwidth=500", NULL),
         ("bathroom", "Bathroom", "https://www.ikea.com/ext/ingkadam/m/a526ca14590e862/original/PH200663_SHI_002.jpg?imwidth=500", NULL);

        """
    )
    db.commit()  # Commit after this block
    print("ProductCategories inserted.")
except sqlite3.Error as e:
    print(f"Error inserting into ProductCategories: {e}")

# Insert data into Materials
try:
    cursor.execute(
        """INSERT INTO Materials (name, country, emissions, emission_unit, recycling, image, description) VALUES 
        (
            "Steel", 
            "Sweden", 
            2, 
            "kg (CO2)/kg steel",
            80,
            "https://5.imimg.com/data5/IJ/DB/MY-997053/stainless-steel-round-bar-304l-500x500.jpg",
            "Steel is a strong, durable, and versatile alloy made primarily of iron and a small percentage of carbon, which enhances its strength and hardness. Known for its excellent mechanical properties, such as high tensile strength and resistance to deformation, steel is widely used in construction, transportation, manufacturing, and infrastructure. It can be easily shaped, welded, and treated to achieve different grades and finishes, making it adaptable to a range of applications. Additionally, steel is highly recyclable, retaining its properties through multiple recycling processes, making it both a critical and sustainable material in modern industry."
        ),
            (
            "Polyester", 
            "Austria", 
            5,
            "kg CO2/kg polyester",
            95,
            "https://www.poundametre.com/cdn/shop/articles/what-is-polyester-fabric-a-brief-introduction-427550.jpg?v=1695352842&width=1000",
            "Polyester is a synthetic polymer made primarily from petroleum-based products, most commonly polyethylene terephthalate (PET). It is widely used in textiles for clothing, home furnishings, and industrial products due to its durability, wrinkle resistance, and quick-drying properties. Polyester fabrics are lightweight, strong, and retain their shape well, making them popular in activewear and outdoor gear.
            However, polyester is not biodegradable, and its production is energy-intensive, contributing to environmental concerns. In response, recycled polyester (rPET), made from post-consumer plastic waste, is gaining popularity as a more sustainable alternative that reduces plastic waste and lowers greenhouse gas emissions compared to virgin polyester production."
        ),
        (
            "Polyurethane", 
            "Norway", 
            6,
            "kg CO2/kg polyurethane",
            10,
            "https://www.gteek.com/image/cache/catalog/rubber/PUR/polyurethane-rods-50-Shore-A-on-stock-1200x900.jpg",
            "Polyurethane is a versatile polymer composed of organic units joined by urethane links, often derived from petroleum products. It comes in many forms, including foams, elastomers, and coatings, and is widely used across various industries. Common applications include cushioning materials for furniture and mattresses, thermal insulation in buildings and appliances, and as coatings or adhesives for surfaces and products.
            Polyurethane is valued for its flexibility, durability, and resistance to wear and tear, water, and chemicals. It can be formulated to be soft and flexible (e.g., foam) or tough and rigid (e.g., for insulation). However, like other petroleum-based materials, polyurethane is non-biodegradable and poses environmental challenges, particularly in terms of waste disposal and its carbon footprint during production. Efforts are underway to develop bio-based polyurethanes and improve recycling techniques to mitigate these environmental impacts."
        );
        """
    )
    db.commit()  # Commit after each insert
    print("Material inserted.")
except sqlite3.Error as e:
    print(f"Error inserting into Materials: {e}")

# Insert data into ProductMaterials
try:
    cursor.execute(
        """INSERT INTO ProductMaterials (material, part, articleId) VALUES 
        (
            "1",
            "frame",
            10575064
        ),
        (
            "2",
            "headboard",
            40571248
        ),
        (
            "3",
            "headboard",
            40571248
        );
        """
    )
    db.commit()  # Commit after this insert
    print("ProductMaterial inserted.")
except sqlite3.Error as e:
    print(f"Error inserting into ProductMaterials: {e}")

# Insert into ProductInformation
try:
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
            "The clock is also a good storage place for small things. No disturbing ticking sounds, as the watch has a quiet quartz movement. Can be hung on the wall or placed on a shelf. Shows the time accurately, as it is equipped with a quartz movement.", 
            "Thomas Eriksson", 
            "Batteries sold separately. IKEA recommends the LADDA rechargeable battery. This clock also works with alkaline batteries, 1xAA. Different wall materials require different types of fixings. Use fittings that match the walls in your home, sold separately.", 
            "bedroom",
            "This product carries the CE mark.", 
            "https://www.ikea.com/se/sv/manuals/ikea-ps-1995-klocka-bla__AA-2328816-2-2.pdf"
        ),
        (
            69385750, 
            "The padded headboard serves as a comfortable backrest, for example when reading or enjoying your weekend breakfast in bed.

The VISSLE cover is soft to touch and made from recycled polyester.

Bonnell springs in the mattress provides great support to your entire body and help you to get a good night´s sleep.

The layer-glued slats adjust to your body weight and makes the mattress more supple and comfortable.

The mattress pad is easy to keep fresh and clean, as it is machine washable.

The clean and simple design is easy to match with your other furniture and fits in any bedroom.

It’s easy to take home, as the whole bed is packed in 2 flat-packs and a roll.", 
            "Thomas Eriksson", 
            "Bed linen sold separately.", 
            "bed",
            NULL, 
            "https://www.ikea.com/se/en/assembly_instructions/saeboevik-divan-bed-vissle-grey__AA-2222904-2-2.pdf"
        ),
                (
            40571248, 
            "You can easily vacuum under the bed frame to keep the space clean and dust-free.

The simple and versatile design coordinates well with other bedroom furniture and fits perfectly in any modern bedroom.

Convenient to take home as the entire bed frame, including slats, is snuggly packed into 1 flat package.

There’s plenty of space under the bed for storage boxes - perfect for storing extra duvets and pillows.

Quick to put together thanks to a straightforward assembly process – probably easier than you think!

The fixed cover is made from Vissle fabric, which is made of 100 percent recycled polyester. It’s a durable material with a smooth weave and a nice two-tone effect.", 
            "Thomas Eriksson", 
            "Mattress and bedlinen are sold separately.", 
            "bed",
            "This bed frame has been tested and meets the requirements for safety, durability and stability set forth by standard EN1725.", 
            "https://www.ikea.com/se/en/assembly_instructions/slattum-upholstered-bed-frame-vissle-dark-grey__AA-2141869-3-2.pdf"
        ),
                        (
            90447176, 
            "Adjustable bed sides allow you to use mattresses of different thicknesses.

You can easily vacuum under the bed frame to keep the space clean and dust-free.

4 spacious drawers under the bed make the best use of the space. They are great for storing extra duvets, pillows and bed linens – or your clothes.

The drawers open and close silently and softly, so you can use them without waking up your partner.

Classic button detailing makes the headboard eye-catching in any bedroom.

The upholstery is soft to the touch and makes bedtime even cosier.

The solid wooden legs are strong and sturdy – and complement the classic design.

Create a coordinated bedroom by combining this bed frame with other furniture from the IDANÄS series.

GUNNARED fabric in dark grey is durable and gives the bedroom a timeless style.

IDANÄS upholstered storage bed has a thick, sloping headboard that provides comfortable support for your back - perfect for lazy mornings and long evenings when reading a newspaper or a book in bed.", 
            "Thomas Eriksson", 
            "Mattress and bedlinen are sold separately.", 
            "bed",
            NULL, 
            "https://www.ikea.com/se/en/assembly_instructions/idanaes-upholstered-storage-bed-gunnared-dark-grey__AA-2264457-4-100.pdf"
        ),
        (
            40407922, 
            "The mirror door can be placed on the left side, right side or in the middle.

If you want to organise inside, you can complement with interior accessories from the SKUBB series.

Adjustable shelves make it easy to customise the space according to your needs.

Of course your home should be a safe place for the entire family. That’s why a safety fitting is included so that you can attach the wardrobe to the wall.", 
            "K Hagberg/M Hagberg", 
            NULL, 
            "wardrobes",
            "WARNING! TIPPING HAZARD – Unanchored furniture can tip over. This furniture shall be anchored to the wall with the enclosed safety fitting to prevent it from tipping over.", 
            "https://www.ikea.com/se/en/assembly_instructions/brimnes-wardrobe-with-3-doors-white__AA-2207256-3-100.pdf"
        ),
                (
            40470089, 
            "The complete mattress is covered by a 10 year guarantee. You can read about the terms in the guarantee brochure.

The mattress is roll-packed so it’s easier to bring home

Add a pillow that suits your sleeping position and a mattress protector to keep the mattress clean.

Pocket springs that respond independently without transferring motion to others.

Edge-to-edge pocket springs allow air to circulate for better breathability and there is no loss of comfort if 2 mattresses are placed next to each other.

A layer of foam on the top adds comfort.

Soft quilted stretch cover with added wadding.", 
            "Paulin Machado", 
            NULL, 
            "mattresses",
            "This mattress has been tested and meets the requirements for durability set forth by standard EN 1957, and flammability requirements set forth by EN 597-1.", 
            "https://www.ikea.com/se/en/manuals/vesteroey-pocket-sprung-mattress-medium-firm-light-blue__AA-2369518-1-100.pdf"
        );
        """
    )
    db.commit()  # Commit after this insert
    print("ProductInformation inserted.")
except sqlite3.Error as e:
    print(f"Error inserting into ProductInformation: {e}")

# Insert into ProductDimensions
try:
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
        ) VALUES 
        (
            10575064, 
            "CM", 
            15, 
            48, 
            23,
            29, 
            3.40,
            "Width: 30 cm  Height: 15 cm Length: 49 cm  Weight: 3.40 kg  Package(s): 1"
        ),
        (
            69385750, 
            "CM", 
            90, 
            140, 
            NULL,
            204, 
            NULL,
            "Width: 30 cm  Height: 15 cm Length: 49 cm  Weight: 3.40 kg  Package(s): 1"
        ),
        (
            40571248, 
            "CM", 
            85, 
            164, 
            NULL,
            206, 
            NULL,
            "Width: 30 cm  Height: 15 cm Length: 49 cm  Weight: 3.40 kg  Package(s): 1"
        ),
        (
            90447176, 
            "CM", 
            121, 
            170, 
            NULL,
            223, 
            NULL,
            "Width: 30 cm  Height: 15 cm Length: 49 cm  Weight: 3.40 kg  Package(s): 1"
        ),
        (
            40407922, 
            "CM", 
            190, 
            117, 
            50,
            NULL, 
            NULL,
            "Width: 30 cm  Height: 15 cm Length: 49 cm  Weight: 3.40 kg  Package(s): 1"
        ),
        (
            40470089, 
            "CM", 
            NULL, 
            120, 
            20,
            200, 
            NULL,
            "Width: 30 cm  Height: 15 cm Length: 49 cm  Weight: 3.40 kg  Package(s): 1"
        );
        """
    )
    db.commit()  # Commit after this insert
    print("ProductDimensions inserted.")
except sqlite3.Error as e:
    print(f"Error inserting into ProductDimensions: {e}")

# Insert into User
try:
    cursor.execute(
        """INSERT INTO User (username, department, region) VALUES ("test", "kallered", "sweden")"""
    )
    db.commit()  # Commit after each insert
    print("User inserted.")
except sqlite3.Error as e:
    print(f"Error inserting into User: {e}")

# Close cursor and connection
cursor.close()
db.close()