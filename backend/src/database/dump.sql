-- ____________________ CONFIGURATION ____________________
-- Prevent deleting a parent row if there are dependent rows in the child table
PRAGMA foreign_keys = ON;

-- ____________________ CREATE TABLES ____________________
DROP      TABLE IF EXISTS `ad_tags_tag`;

DROP      TABLE IF EXISTS `ad`;

DROP      TABLE IF EXISTS `category`;

DROP      TABLE IF EXISTS `tag`;

CREATE    TABLE `category` (`id` INTEGER NOT NULL PRIMARY KEY, `name` TEXT NOT NULL);

CREATE    TABLE `tag` (`id` INTEGER NOT NULL PRIMARY KEY, `name` TEXT NOT NULL);

CREATE    TABLE `ad` (
          `id` INTEGER NOT NULL PRIMARY KEY,
          `title` TEXT NOT NULL,
          `description` TEXT NOT NULL,
          `owner` TEXT NOT NULL,
          `price` INTEGER NOT NULL,
          `picture` TEXT NOT NULL,
          `location` TEXT NOT NULL,
          `createdAt` TEXT NOT NULL,
          `categoryId` INTEGER NOT NULL,
          FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
          );

CREATE    TABLE `ad_tags_tag` (
          `adId` INTEGER NOT NULL,
          `tagId` INTEGER NOT NULL,
          FOREIGN KEY (`adId`) REFERENCES `ad` (`id`),
          FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`)
          );

-- ____________________ POPULATE TABLES ____________________
INSERT    INTO `category` (`name`)
VALUES    ("bikes"),
          ("cars"),
          ("real estate"),
          ("furniture"),
          ("electronics"),
          ("home appliances"),
          ("music"),
          ("sports"),
          ("tools"),
          ("garden"),
          ("motos"),
          ("baby"),
          ("pets"),
          ("interior"),
          ("outdoor");

INSERT    INTO `tag` (`name`)
VALUES    ("new"),
          ("second-hand"),
          ("vintage"),
          ("rare"),
          ("collectible"),
          ("limited edition"),
          ("antique"),
          ("modern"),
          ("classic"),
          ("retro"),
          ("contemporary"),
          ("handmade"),
          ("custom"),
          ("unique"),
          ("original");

-- Price are stored in cents for accurate calculations and comparisons.
INSERT    INTO `ad` (
          `title`,
          `description`,
          `owner`,
          `price`,
          `picture`,
          `location`,
          `createdAt`,
          `categoryId`
          )
VALUES    (
          "Bike to sell",
          "My bike is blue, working fine. I'm selling it because I've got a new one",
          "bike.seller@gmail.com",
          10000,
          "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
          "Paris",
          "2023-09-05T10:13:14.755Z",
          1
          ),
          (
          "Car to sell",
          "My car is blue, working fine. I'm selling it because I've got a new one",
          "car.seller@gmail.com",
          1000000,
          "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
          "Paris",
          "2023-10-05T10:14:15.922Z",
          2
          ),
          (
          "Apartment for rent",
          "Spacious apartment with 3 bedrooms in the city center. Ideal for families.",
          "apartment.owner@gmail.com",
          120000,
          "https://plus.unsplash.com/premium_photo-1676321046262-4978a752fb15?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-11-15T09:23:12.001Z",
          3
          ),
          (
          "Sofa to sell",
          "Comfortable red sofa in excellent condition. Perfect for a small living room.",
          "sofa.seller@gmail.com",
          30000,
          "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-09-25T14:45:10.222Z",
          4
          ),
          (
          "Laptop for sale",
          "High-performance laptop with 16GB RAM and 1TB SSD. Barely used.",
          "laptop.seller@gmail.com",
          80000,
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-08-18T16:17:21.132Z",
          5
          ),
          (
          "Vintage Vinyl Records",
          "Collection of rare vintage vinyl records from the 70s. In great condition.",
          "vinyl.seller@gmail.com",
          15000,
          "https://images.unsplash.com/photo-1491848128688-e0c30289e89f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-07-07T11:09:05.533Z",
          7
          ),
          (
          "Electric Guitar for sale",
          "Well-maintained electric guitar with amplifier. Great for beginners.",
          "guitar.seller@gmail.com",
          45000,
          "https://images.unsplash.com/photo-1680543098552-90e4dfb90b80?q=80&w=2594&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-06-12T08:30:50.642Z",
          7
          ),
          (
          "Office Desk for sale",
          "Large office desk with drawers. Minimal wear and tear, perfect for home office.",
          "desk.seller@gmail.com",
          20000,
          "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-10-30T12:00:45.511Z",
          4
          ),
          (
          "Dining Table for sale",
          "Wooden dining table with 6 chairs. In excellent condition, perfect for family gatherings.",
          "diningtable.seller@gmail.com",
          40000,
          "https://plus.unsplash.com/premium_photo-1684445034959-b3faeb4597d2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-09-02T11:33:15.902Z",
          4
          ),
          (
          "Mountain Bike",
          "Black mountain bike, great for off-road adventures. Selling because I no longer use it.",
          "bike.seller2@gmail.com",
          25000,
          "https://images.unsplash.com/photo-1534150034764-046bf225d3fa?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-07-22T09:27:30.712Z",
          1
          ),
          (
          "Smartphone for sale",
          "Latest model smartphone with all accessories included. Used for only a few months.",
          "phone.seller@gmail.com",
          60000,
          "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-11-10T13:25:19.533Z",
          5
          ),
          (
          "Gaming Console",
          "Brand new gaming console, barely used. Comes with two controllers and three games.",
          "console.seller@gmail.com",
          50000,
          "https://images.unsplash.com/photo-1665611003976-df351b153a0b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-10-19T08:13:42.155Z",
          5
          ),
          (
          "Bookshelf for sale",
          "Tall wooden bookshelf, perfect for storing books and decorations.",
          "bookshelf.seller@gmail.com",
          10000,
          "https://images.unsplash.com/photo-1605116959031-6e2d13a2ee56?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-11-02T15:10:23.622Z",
          4
          ),
          (
          "Kids Bicycle",
          "Red kids' bicycle, great for ages 5-10. Lightly used, still in very good condition.",
          "kidsbike.seller@gmail.com",
          7500,
          "https://images.unsplash.com/photo-1573222558250-11baa3b2811f?q=80&w=2176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-09-30T11:59:31.915Z",
          1
          ),
          (
          "Camera for sale",
          "Professional DSLR camera, in excellent condition. Includes lenses and bag.",
          "camera.seller@gmail.com",
          90000,
          "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-08-27T10:43:39.377Z",
          5
          ),
          (
          "Coffee Table",
          "Glass-top coffee table, modern design. Selling because I'm redecorating.",
          "coffeetable.seller@gmail.com",
          15000,
          "https://images.unsplash.com/photo-1523362365717-c50b87d8ce3c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-09-10T09:40:17.912Z",
          4
          ),
          (
          "Vacuum Cleaner for sale",
          "High-power vacuum cleaner, perfect for home cleaning. Selling because I upgraded to a robot vacuum.",
          "vacuum.seller@gmail.com",
          20000,
          "https://images.unsplash.com/photo-1653990480360-31a12ce9723e?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-10-20T13:35:25.412Z",
          6
          ),
          (
          "Electric Scooter",
          "Electric scooter, great for commuting. Barely used and in excellent condition.",
          "scooter.seller@gmail.com",
          35000,
          "https://plus.unsplash.com/premium_photo-1715697682205-e033c9ec5efa?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-07-18T12:22:43.215Z",
          11
          ),
          (
          "Dining Chairs",
          "Set of four dining chairs in perfect condition. Selling because we bought new ones.",
          "chairs.seller@gmail.com",
          20000,
          "https://images.unsplash.com/photo-1656403002413-2ac6137237d6?q=80&w=3034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-09-29T14:08:18.914Z",
          4
          ),
          (
          "Smartwatch for sale",
          "Brand new smartwatch with fitness tracking features. Only used for a week.",
          "smartwatch.seller@gmail.com",
          25000,
          "https://images.unsplash.com/photo-1517502474097-f9b30659dadb?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-11-04T16:30:55.133Z",
          5
          ),
          (
          "Home Theater System",
          "Complete home theater system with surround sound speakers. In excellent condition.",
          "hometheater.seller@gmail.com",
          60000,
          "https://images.unsplash.com/photo-1644586195587-4c376c041f08?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-08-12T15:47:05.912Z",
          7
          ),
          (
          "Electric Drill",
          "Powerful electric drill, barely used. Perfect for DIY projects at home.",
          "drill.seller@gmail.com",
          8000,
          "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-10-13T10:23:14.533Z",
          9
          ),
          (
          "Bed Frame",
          "Wooden bed frame, fits a queen-size mattress. In excellent condition.",
          "bedframe.seller@gmail.com",
          30000,
          "https://images.unsplash.com/photo-1688384452844-8364c3e2fc28?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-09-12T16:22:15.122Z",
          4
          ),
          (
          "Garden Tools",
          "Set of high-quality garden tools, perfect for home gardening. Lightly used.",
          "garden.seller@gmail.com",
          5000,
          "https://plus.unsplash.com/premium_photo-1678722938403-cbac99a17dea?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-07-13T12:15:41.632Z",
          10
          ),
          (
          "Bicycle Helmet",
          "Brand new bicycle helmet, never worn. Selling because I bought the wrong size.",
          "helmet.seller@gmail.com",
          4000,
          "https://images.unsplash.com/photo-1611485100985-cb332cd79671?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-11-06T18:32:18.004Z",
          1
          ),
          (
          "Electric Kettle",
          "Electric kettle in excellent condition. Selling because I got a new one.",
          "kettle.seller@gmail.com",
          3000,
          "https://images.unsplash.com/photo-1647619124290-10fb9273b4b5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-10-01T13:45:09.002Z",
          6
          ),
          (
          "PlayStation 5 for sale",
          "Brand new PlayStation 5, still in original packaging. Selling because I received two as gifts.",
          "ps5.seller@gmail.com",
          55000,
          "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-08-25T14:11:31.302Z",
          5
          ),
          (
          "Kayak for sale",
          "Single-person kayak, perfect for lake trips. Lightly used, in excellent condition.",
          "kayak.seller@gmail.com",
          40000,
          "https://images.unsplash.com/photo-1543804491-66d81260fe90?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-09-17T11:25:12.311Z",
          8
          ),
          (
          "Washing Machine",
          "High-efficiency washing machine, perfect for large families. Barely used, like new.",
          "washingmachine.seller@gmail.com",
          70000,
          "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-08-29T15:35:25.412Z",
          6
          ),
          (
          "Camping Tent",
          "4-person camping tent, used only once. Perfect for weekend getaways.",
          "tent.seller@gmail.com",
          12000,
          "https://images.unsplash.com/photo-1698521660341-2392b5639034?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-09-20T08:30:40.712Z",
          8
          ),
          (
          "Baby Stroller",
          "Lightweight baby stroller in excellent condition. Only used for a few months.",
          "stroller.seller@gmail.com",
          15000,
          "https://images.unsplash.com/photo-1623085287198-b23f6666f9a2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-07-29T10:33:50.002Z",
          12
          ),
          (
          "Air Conditioner",
          "Portable air conditioner, barely used. Selling because I installed central air.",
          "ac.seller@gmail.com",
          35000,
          "https://images.unsplash.com/photo-1665826254141-bfa10685e002?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-10-27T14:25:15.701Z",
          14
          ),
          (
          "Golf Clubs",
          "Set of golf clubs in great condition. Used for a few rounds only.",
          "golfclubs.seller@gmail.com",
          40000,
          "https://images.unsplash.com/photo-1530028828-25e8270793c5?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-09-05T09:14:15.613Z",
          8
          ),
          (
          "Electric Fireplace",
          "Modern electric fireplace, perfect for a cozy living room. Hardly used.",
          "fireplace.seller@gmail.com",
          50000,
          "https://www.electricfireplacescanada.ca/cdn/shop/files/Napoleon-Astound-Series-Linear-Electric-Fireplace-Lifestyle-1-Cropped_54ce33bd-a28a-4df4-9148-734edca02db6_1024x1024.jpg?v=1727327857",
          "Bordeaux",
          "2023-11-01T11:02:33.421Z",
          4
          ),
          (
          "Running Shoes",
          "Brand new running shoes, never worn. Selling because they don't fit.",
          "shoes.seller@gmail.com",
          8000,
          "https://plus.unsplash.com/premium_photo-1663100769321-9eb8fe5a8e6b?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-10-06T14:19:24.712Z",
          8
          ),
          (
          "Snowboard",
          "Snowboard in excellent condition, only used a couple of times. Selling because I'm moving to a warmer area.",
          "snowboard.seller@gmail.com",
          35000,
          "https://westonbackcountry.com/cdn/shop/files/2425-Weston-Logger-Snowboard-p-Carly-Finke-1.jpg?v=1721789403&width=1445",
          "Lyon",
          "2023-08-21T11:33:50.221Z",
          8
          ),
          (
          "Table Lamp",
          "Modern table lamp, perfect for a study or bedroom. In great condition.",
          "lamp.seller@gmail.com",
          5000,
          "https://images.unsplash.com/photo-1573676386604-78f8ed228e2b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-09-18T10:50:40.642Z",
          4
          ),
          (
          "Gaming Chair",
          "Comfortable gaming chair with adjustable height and recline. Like new.",
          "chair.seller@gmail.com",
          25000,
          "https://images.unsplash.com/photo-1612011213721-3936d387f318?q=80&w=3038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-11-07T12:14:10.003Z",
          4
          ),
          (
          "Fishing Rod",
          "High-quality fishing rod, used only a couple of times. Selling because I don't have time to fish.",
          "fishingrod.seller@gmail.com",
          12000,
          "https://plus.unsplash.com/premium_photo-1661508763045-3077c515b94b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-09-01T13:15:33.201Z",
          8
          ),
          (
          "Barbecue Grill",
          "Large barbecue grill, perfect for outdoor cooking. Barely used.",
          "grill.seller@gmail.com",
          30000,
          "https://images.unsplash.com/photo-1694444399030-e442cccb98ae?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-07-20T10:40:20.801Z",
          15
          ),
          (
          "Treadmill",
          "High-end treadmill, perfect for home workouts. Like new condition.",
          "treadmill.seller@gmail.com",
          70000,
          "https://1upnutrition.com/cdn/shop/articles/Benefits_of_Curved_Treadmills_600x400_crop_center.progressive.jpg?v=1688418580",
          "Paris",
          "2023-08-10T16:32:10.202Z",
          9
          ),
          (
          "Portable Projector",
          "Compact portable projector, great for outdoor movie nights. Lightly used.",
          "projector.seller@gmail.com",
          35000,
          "https://images.unsplash.com/photo-1589113050289-1c654e7e305d?q=80&w=2872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-10-23T09:45:10.001Z",
          5
          ),
          (
          "Baby Crib",
          "Wooden baby crib, gently used and in great condition. Selling because our baby has outgrown it.",
          "crib.seller@gmail.com",
          25000,
          "https://plus.unsplash.com/premium_photo-1684779979166-bf2924a32c49?q=80&w=2800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-09-25T12:22:40.812Z",
          12
          ),
          (
          "Bike Rack",
          "Bike rack for 3 bikes, perfect for road trips. In great condition.",
          "bikerack.seller@gmail.com",
          15000,
          "https://www.velocirax.com/cdn/shop/files/GarageMode.jpg?v=1718662361&width=2400",
          "Paris",
          "2023-07-26T14:13:30.922Z",
          1
          ),
          (
          "Electric Hedge Trimmer",
          "Electric hedge trimmer, perfect for keeping your garden neat. Barely used.",
          "hedge.seller@gmail.com",
          10000,
          "https://plus.unsplash.com/premium_photo-1661347864217-c6b83199b603?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-09-14T13:09:19.611Z",
          10
          ),
          (
          "Blender for sale",
          "Powerful blender, great for smoothies and soups. Lightly used and in excellent condition.",
          "blender.seller@gmail.com",
          6000,
          "https://plus.unsplash.com/premium_photo-1718043036193-e9d56e94e391?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-10-11T14:30:45.711Z",
          6
          ),
          (
          "Massage Chair",
          "Full-body massage chair, like new. Selling because I'm moving and I don't have space.",
          "massagechair.seller@gmail.com",
          100000,
          "https://images.unsplash.com/photo-1711837061597-f062efdb44b3?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-07-30T10:42:50.711Z",
          4
          ),
          (
          "Portable Air Purifier",
          "Compact air purifier, perfect for small rooms. Barely used, like new.",
          "airpurifier.seller@gmail.com",
          12000,
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY5tp1r5xi7YtHDNPFYJi8IeSSYT8ygc-HL-PVEQCPeRAweXRLpsWvXfiPAyn4ilbhVG8&usqp=CAU",
          "Lyon",
          "2023-10-25T11:45:25.412Z",
          14
          ),
          (
          "Yoga Mat",
          "Brand new yoga mat, never used. Selling because I received it as a gift but already have one.",
          "yogamat.seller@gmail.com",
          3000,
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxq1P69oL2UzCb9nk1mmgSBQvr_UCBLtAc7z_CLMCYpaRbJt8c58s4M1ipnkDdM5Y7gCw&usqp=CAU",
          "Bordeaux",
          "2023-09-22T15:25:10.314Z",
          8
          ),
          (
          "Electric Scooter for sale",
          "Lightweight electric scooter, perfect for commuting. In excellent condition.",
          "scooter2.seller@gmail.com",
          40000,
          "https://images.unsplash.com/photo-1606186226740-0528ea7dfeed?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-10-17T14:18:41.412Z",
          11
          ),
          (
          "Surfboard",
          "Surfboard in great condition, perfect for beginners. Selling because I upgraded to a larger board.",
          "surfboard.seller@gmail.com",
          25000,
          "https://plus.unsplash.com/premium_photo-1676645882020-8387c2c77ef8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-09-09T08:35:15.612Z",
          8
          ),
          (
          "Electric Oven",
          "Compact electric oven, great for small kitchens. Barely used.",
          "oven.seller@gmail.com",
          20000,
          "https://www.owncomforts.co.uk/cdn/shop/products/7_252F6_252F7_252F9_252F767942dbe92cccfce4732e1a1c1d9255ee1cc6a6_SDA1609GE_6288a4db-8976-4545-9d09-433a69f29088.jpg?v=1696944134",
          "Paris",
          "2023-11-05T12:55:20.801Z",
          6
          ),
          (
          "Stand Mixer for sale",
          "High-quality stand mixer, used only a few times. Great for baking.",
          "mixer.seller@gmail.com",
          22000,
          "https://images.unsplash.com/photo-1577495917765-9497a0de7caa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-09-19T12:22:18.922Z",
          6
          ),
          (
          "Electric Lawn Mower",
          "Powerful electric lawn mower, perfect for medium-sized gardens.",
          "lawnmower.seller@gmail.com",
          25000,
          "https://www.thesun.co.uk/wp-content/uploads/2024/06/Vonhaus-1800W-Electric-Lawn-Mower.jpeg?strip=all&w=897",
          "Bordeaux",
          "2023-10-02T15:12:33.814Z",
          10
          ),
          (
          "Dining Set",
          "Modern dining set with a table and four chairs, perfect for small spaces.",
          "dining.set.seller@gmail.com",
          50000,
          "https://img5.su-cdn.com/cdn-cgi/image/width=750,height=750/mall/file/2022/05/17/604f6e4618a5d8b53abc1a6a831dec42.jpg",
          "Bordeaux",
          "2023-08-25T16:20:05.621Z",
          4
          ),
          (
          "Gaming Monitor",
          "27-inch gaming monitor with 144Hz refresh rate. Like new condition.",
          "monitor.seller@gmail.com",
          35000,
          "https://images.unsplash.com/flagged/photo-1551954810-43cd6aef5b1f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Lyon",
          "2023-09-14T17:33:12.332Z",
          5
          ),
          (
          "Coffee Machine",
          "Espresso coffee machine, perfect for quick and delicious coffee.",
          "coffee.seller@gmail.com",
          12000,
          "https://images.unsplash.com/photo-1707241358597-bafcc8a8e73d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-09-25T11:50:15.212Z",
          6
          ),
          (
          "Electric Grill",
          "Portable electric grill, great for indoor and balcony use.",
          "grill.seller2@gmail.com",
          15000,
          "https://images.unsplash.com/photo-1523139348426-081681667818?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Paris",
          "2023-09-08T16:23:35.233Z",
          6
          ),
          (
          "Electric Heater",
          "Portable electric heater, great for small spaces. Used for one winter, still works perfectly.",
          "heater.seller@gmail.com",
          7500,
          "https://styla-prod-us.imgix.net/92314b9e-c171-46ba-b234-64ae64285741/1664357841680_4bf4e57f-b9f7-48bf-905b-06bf20681837?auto=format%2Ccompress&w=1280&h=853&fit=original&q=25",
          "Lyon",
          "2023-10-01T12:35:55.510Z",
          14
          ),
          (
          "Pet Carrier",
          "Lightweight pet carrier, ideal for cats and small dogs. Barely used, in great shape.",
          "petcarrier.seller@gmail.com",
          4000,
          "https://images.unsplash.com/photo-1608060375223-c5ab552bc9a9?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "Bordeaux",
          "2023-09-27T10:28:30.421Z",
          13
          );

INSERT    INTO `ad_tags_tag` (`adId`, `tagId`)
VALUES    (1, 2)