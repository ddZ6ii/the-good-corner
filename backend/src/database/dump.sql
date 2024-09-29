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
          `price` REAL NOT NULL,
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
          100,
          "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
          "Paris",
          "2023-09-05T10:13:14.755Z",
          1
          ),
          (
          "Car to sell",
          "My car is blue, working fine. I'm selling it because I've got a new one",
          "car.seller@gmail.com",
          10000,
          "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
          "Paris",
          "2023-10-05T10:14:15.922Z",
          2
          ),
          (
          "Apartment for rent",
          "Spacious apartment with 3 bedrooms in the city center. Ideal for families.",
          "apartment.owner@gmail.com",
          1200,
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Paris_apartment.jpg/640px-Paris_apartment.jpg",
          "Bordeaux",
          "2023-11-15T09:23:12.001Z",
          3
          ),
          (
          "Sofa to sell",
          "Comfortable red sofa in excellent condition. Perfect for a small living room.",
          "sofa.seller@gmail.com",
          300,
          "https://cdn.pixabay.com/photo/2016/11/19/14/00/sofa-1839791_1280.jpg",
          "Lyon",
          "2023-09-25T14:45:10.222Z",
          4
          ),
          (
          "Laptop for sale",
          "High-performance laptop with 16GB RAM and 1TB SSD. Barely used.",
          "laptop.seller@gmail.com",
          800,
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Ubuntu_Dell_Laptop.jpg/640px-Ubuntu_Dell_Laptop.jpg",
          "Paris",
          "2023-08-18T16:17:21.132Z",
          5
          ),
          (
          "Vintage Vinyl Records",
          "Collection of rare vintage vinyl records from the 70s. In great condition.",
          "vinyl.seller@gmail.com",
          150,
          "https://cdn.pixabay.com/photo/2016/11/23/14/45/vinyl-1850120_1280.jpg",
          "Bordeaux",
          "2023-07-07T11:09:05.533Z",
          7
          ),
          (
          "Electric Guitar for sale",
          "Well-maintained electric guitar with amplifier. Great for beginners.",
          "guitar.seller@gmail.com",
          450,
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Fender_Stratocaster_electric_guitar.JPG/640px-Fender_Stratocaster_electric_guitar.JPG",
          "Lyon",
          "2023-06-12T08:30:50.642Z",
          7
          ),
          (
          "Office Desk for sale",
          "Large office desk with drawers. Minimal wear and tear, perfect for home office.",
          "desk.seller@gmail.com",
          200,
          "https://cdn.pixabay.com/photo/2017/09/16/16/09/office-2756356_1280.jpg",
          "Paris",
          "2023-10-30T12:00:45.511Z",
          4
          ),
          (
          "Dining Table for sale",
          "Wooden dining table with 6 chairs. In excellent condition, perfect for family gatherings.",
          "diningtable.seller@gmail.com",
          400,
          "https://cdn.pixabay.com/photo/2015/09/18/19/23/wood-950348_1280.jpg",
          "Bordeaux",
          "2023-09-02T11:33:15.902Z",
          4
          ),
          (
          "Mountain Bike",
          "Black mountain bike, great for off-road adventures. Selling because I no longer use it.",
          "bike.seller2@gmail.com",
          250,
          "https://cdn.pixabay.com/photo/2017/05/11/08/35/mountain-bike-2304287_1280.jpg",
          "Lyon",
          "2023-07-22T09:27:30.712Z",
          1
          ),
          (
          "Smartphone for sale",
          "Latest model smartphone with all accessories included. Used for only a few months.",
          "phone.seller@gmail.com",
          600,
          "https://cdn.pixabay.com/photo/2015/01/06/10/25/smartphone-591928_1280.jpg",
          "Paris",
          "2023-11-10T13:25:19.533Z",
          5
          ),
          (
          "Gaming Console",
          "Brand new gaming console, barely used. Comes with two controllers and three games.",
          "console.seller@gmail.com",
          500,
          "https://cdn.pixabay.com/photo/2015/12/14/19/09/gaming-1096607_1280.jpg",
          "Lyon",
          "2023-10-19T08:13:42.155Z",
          5
          ),
          (
          "Bookshelf for sale",
          "Tall wooden bookshelf, perfect for storing books and decorations.",
          "bookshelf.seller@gmail.com",
          100,
          "https://cdn.pixabay.com/photo/2014/12/15/13/40/bookcase-569156_1280.jpg",
          "Bordeaux",
          "2023-11-02T15:10:23.622Z",
          4
          ),
          (
          "Kids Bicycle",
          "Red kids' bicycle, great for ages 5-10. Lightly used, still in very good condition.",
          "kidsbike.seller@gmail.com",
          75,
          "https://cdn.pixabay.com/photo/2016/08/18/20/06/bicycle-1607581_1280.jpg",
          "Paris",
          "2023-09-30T11:59:31.915Z",
          1
          ),
          (
          "Camera for sale",
          "Professional DSLR camera, in excellent condition. Includes lenses and bag.",
          "camera.seller@gmail.com",
          900,
          "https://cdn.pixabay.com/photo/2015/12/01/20/28/photographer-1077435_1280.jpg",
          "Lyon",
          "2023-08-27T10:43:39.377Z",
          5
          ),
          (
          "Coffee Table",
          "Glass-top coffee table, modern design. Selling because I'm redecorating.",
          "coffeetable.seller@gmail.com",
          150,
          "https://cdn.pixabay.com/photo/2016/11/23/14/40/coffee-table-1850129_1280.jpg",
          "Bordeaux",
          "2023-09-10T09:40:17.912Z",
          4
          ),
          (
          "Vacuum Cleaner for sale",
          "High-power vacuum cleaner, perfect for home cleaning. Selling because I upgraded to a robot vacuum.",
          "vacuum.seller@gmail.com",
          200,
          "https://cdn.pixabay.com/photo/2016/01/19/16/18/vacuum-cleaner-1142799_1280.jpg",
          "Paris",
          "2023-10-20T13:35:25.412Z",
          6
          ),
          (
          "Electric Scooter",
          "Electric scooter, great for commuting. Barely used and in excellent condition.",
          "scooter.seller@gmail.com",
          350,
          "https://cdn.pixabay.com/photo/2017/01/10/19/05/electric-scooter-1960613_1280.jpg",
          "Lyon",
          "2023-07-18T12:22:43.215Z",
          11
          ),
          (
          "Dining Chairs",
          "Set of four dining chairs in perfect condition. Selling because we bought new ones.",
          "chairs.seller@gmail.com",
          200,
          "https://cdn.pixabay.com/photo/2016/11/29/08/07/chairs-1868277_1280.jpg",
          "Bordeaux",
          "2023-09-29T14:08:18.914Z",
          4
          ),
          (
          "Smartwatch for sale",
          "Brand new smartwatch with fitness tracking features. Only used for a week.",
          "smartwatch.seller@gmail.com",
          250,
          "https://cdn.pixabay.com/photo/2015/03/27/22/35/smart-watch-694041_1280.jpg",
          "Paris",
          "2023-11-04T16:30:55.133Z",
          5
          ),
          (
          "Home Theater System",
          "Complete home theater system with surround sound speakers. In excellent condition.",
          "hometheater.seller@gmail.com",
          600,
          "https://cdn.pixabay.com/photo/2016/03/12/23/18/tv-1255942_1280.jpg",
          "Lyon",
          "2023-08-12T15:47:05.912Z",
          7
          ),
          (
          "Electric Drill",
          "Powerful electric drill, barely used. Perfect for DIY projects at home.",
          "drill.seller@gmail.com",
          80,
          "https://cdn.pixabay.com/photo/2017/06/23/21/55/drill-2438661_1280.jpg",
          "Bordeaux",
          "2023-10-13T10:23:14.533Z",
          9
          ),
          (
          "Bed Frame",
          "Wooden bed frame, fits a queen-size mattress. In excellent condition.",
          "bedframe.seller@gmail.com",
          300,
          "https://cdn.pixabay.com/photo/2016/11/23/14/35/bed-frame-1850121_1280.jpg",
          "Paris",
          "2023-09-12T16:22:15.122Z",
          4
          ),
          (
          "Garden Tools",
          "Set of high-quality garden tools, perfect for home gardening. Lightly used.",
          "garden.seller@gmail.com",
          50,
          "https://cdn.pixabay.com/photo/2017/01/04/00/03/garden-1956987_1280.jpg",
          "Lyon",
          "2023-07-13T12:15:41.632Z",
          10
          ),
          (
          "Bicycle Helmet",
          "Brand new bicycle helmet, never worn. Selling because I bought the wrong size.",
          "helmet.seller@gmail.com",
          40,
          "https://cdn.pixabay.com/photo/2018/02/13/17/43/bike-helmet-3155319_1280.jpg",
          "Bordeaux",
          "2023-11-06T18:32:18.004Z",
          1
          ),
          (
          "Electric Kettle",
          "Electric kettle in excellent condition. Selling because I got a new one.",
          "kettle.seller@gmail.com",
          30,
          "https://cdn.pixabay.com/photo/2014/05/02/21/50/electric-kettle-336666_1280.jpg",
          "Paris",
          "2023-10-01T13:45:09.002Z",
          6
          ),
          (
          "PlayStation 5 for sale",
          "Brand new PlayStation 5, still in original packaging. Selling because I received two as gifts.",
          "ps5.seller@gmail.com",
          550,
          "https://cdn.pixabay.com/photo/2020/11/24/12/54/playstation-5777744_1280.jpg",
          "Lyon",
          "2023-08-25T14:11:31.302Z",
          5
          ),
          (
          "Kayak for sale",
          "Single-person kayak, perfect for lake trips. Lightly used, in excellent condition.",
          "kayak.seller@gmail.com",
          400,
          "https://cdn.pixabay.com/photo/2018/05/30/23/57/kayak-3444193_1280.jpg",
          "Bordeaux",
          "2023-09-17T11:25:12.311Z",
          8
          ),
          (
          "Washing Machine",
          "High-efficiency washing machine, perfect for large families. Barely used, like new.",
          "washingmachine.seller@gmail.com",
          700,
          "https://cdn.pixabay.com/photo/2015/06/23/12/23/washing-machine-818263_1280.jpg",
          "Paris",
          "2023-08-29T15:35:25.412Z",
          6
          ),
          (
          "Camping Tent",
          "4-person camping tent, used only once. Perfect for weekend getaways.",
          "tent.seller@gmail.com",
          120,
          "https://cdn.pixabay.com/photo/2016/07/04/11/53/tent-1497618_1280.jpg",
          "Lyon",
          "2023-09-20T08:30:40.712Z",
          8
          ),
          (
          "Baby Stroller",
          "Lightweight baby stroller in excellent condition. Only used for a few months.",
          "stroller.seller@gmail.com",
          150,
          "https://cdn.pixabay.com/photo/2016/07/11/17/25/stroller-1500733_1280.jpg",
          "Bordeaux",
          "2023-07-29T10:33:50.002Z",
          12
          ),
          (
          "Air Conditioner",
          "Portable air conditioner, barely used. Selling because I installed central air.",
          "ac.seller@gmail.com",
          350,
          "https://cdn.pixabay.com/photo/2016/06/19/06/00/air-conditioner-1469817_1280.jpg",
          "Paris",
          "2023-10-27T14:25:15.701Z",
          14
          ),
          (
          "Golf Clubs",
          "Set of golf clubs in great condition. Used for a few rounds only.",
          "golfclubs.seller@gmail.com",
          400,
          "https://cdn.pixabay.com/photo/2017/09/29/17/19/golf-club-2790831_1280.jpg",
          "Lyon",
          "2023-09-05T09:14:15.613Z",
          8
          ),
          (
          "Electric Fireplace",
          "Modern electric fireplace, perfect for a cozy living room. Hardly used.",
          "fireplace.seller@gmail.com",
          500,
          "https://cdn.pixabay.com/photo/2016/01/19/15/05/fireplace-1142771_1280.jpg",
          "Bordeaux",
          "2023-11-01T11:02:33.421Z",
          4
          ),
          (
          "Running Shoes",
          "Brand new running shoes, never worn. Selling because they don't fit.",
          "shoes.seller@gmail.com",
          80,
          "https://cdn.pixabay.com/photo/2015/11/22/19/12/running-shoes-1055044_1280.jpg",
          "Paris",
          "2023-10-06T14:19:24.712Z",
          8
          ),
          (
          "Snowboard",
          "Snowboard in excellent condition, only used a couple of times. Selling because I'm moving to a warmer area.",
          "snowboard.seller@gmail.com",
          350,
          "https://cdn.pixabay.com/photo/2015/12/01/20/25/snowboard-1077437_1280.jpg",
          "Lyon",
          "2023-08-21T11:33:50.221Z",
          8
          ),
          (
          "Table Lamp",
          "Modern table lamp, perfect for a study or bedroom. In great condition.",
          "lamp.seller@gmail.com",
          50,
          "https://cdn.pixabay.com/photo/2017/12/28/14/22/lamp-3048402_1280.jpg",
          "Bordeaux",
          "2023-09-18T10:50:40.642Z",
          4
          ),
          (
          "Gaming Chair",
          "Comfortable gaming chair with adjustable height and recline. Like new.",
          "chair.seller@gmail.com",
          250,
          "https://cdn.pixabay.com/photo/2020/06/26/07/15/gaming-5342834_1280.jpg",
          "Paris",
          "2023-11-07T12:14:10.003Z",
          4
          ),
          (
          "Fishing Rod",
          "High-quality fishing rod, used only a couple of times. Selling because I don't have time to fish.",
          "fishingrod.seller@gmail.com",
          120,
          "https://cdn.pixabay.com/photo/2015/09/05/21/58/fishing-rod-924288_1280.jpg",
          "Lyon",
          "2023-09-01T13:15:33.201Z",
          8
          ),
          (
          "Barbecue Grill",
          "Large barbecue grill, perfect for outdoor cooking. Barely used.",
          "grill.seller@gmail.com",
          300,
          "https://cdn.pixabay.com/photo/2016/04/19/14/55/barbecue-1335249_1280.jpg",
          "Bordeaux",
          "2023-07-20T10:40:20.801Z",
          15
          ),
          (
          "Treadmill",
          "High-end treadmill, perfect for home workouts. Like new condition.",
          "treadmill.seller@gmail.com",
          700,
          "https://cdn.pixabay.com/photo/2016/01/18/09/38/treadmill-1140932_1280.jpg",
          "Paris",
          "2023-08-10T16:32:10.202Z",
          9
          ),
          (
          "Portable Projector",
          "Compact portable projector, great for outdoor movie nights. Lightly used.",
          "projector.seller@gmail.com",
          350,
          "https://cdn.pixabay.com/photo/2015/03/26/09/39/projector-691865_1280.jpg",
          "Lyon",
          "2023-10-23T09:45:10.001Z",
          5
          ),
          (
          "Baby Crib",
          "Wooden baby crib, gently used and in great condition. Selling because our baby has outgrown it.",
          "crib.seller@gmail.com",
          250,
          "https://cdn.pixabay.com/photo/2014/12/14/22/52/baby-bed-569135_1280.jpg",
          "Bordeaux",
          "2023-09-25T12:22:40.812Z",
          12
          ),
          (
          "Bike Rack",
          "Bike rack for 3 bikes, perfect for road trips. In great condition.",
          "bikerack.seller@gmail.com",
          150,
          "https://cdn.pixabay.com/photo/2017/05/23/09/34/bike-2334501_1280.jpg",
          "Paris",
          "2023-07-26T14:13:30.922Z",
          1
          ),
          (
          "Electric Hedge Trimmer",
          "Electric hedge trimmer, perfect for keeping your garden neat. Barely used.",
          "hedge.seller@gmail.com",
          100,
          "https://cdn.pixabay.com/photo/2015/10/13/15/06/hedge-shears-986229_1280.jpg",
          "Lyon",
          "2023-09-14T13:09:19.611Z",
          10
          ),
          (
          "Blender for sale",
          "Powerful blender, great for smoothies and soups. Lightly used and in excellent condition.",
          "blender.seller@gmail.com",
          60,
          "https://cdn.pixabay.com/photo/2016/10/05/16/00/kitchen-1719674_1280.jpg",
          "Bordeaux",
          "2023-10-11T14:30:45.711Z",
          6
          ),
          (
          "Massage Chair",
          "Full-body massage chair, like new. Selling because I'm moving and I don't have space.",
          "massagechair.seller@gmail.com",
          1000,
          "https://cdn.pixabay.com/photo/2015/09/02/13/22/massage-chair-918560_1280.jpg",
          "Paris",
          "2023-07-30T10:42:50.711Z",
          4
          ),
          (
          "Portable Air Purifier",
          "Compact air purifier, perfect for small rooms. Barely used, like new.",
          "airpurifier.seller@gmail.com",
          120,
          "https://cdn.pixabay.com/photo/2017/07/20/21/21/air-purifier-2522237_1280.jpg",
          "Lyon",
          "2023-10-25T11:45:25.412Z",
          14
          ),
          (
          "Yoga Mat",
          "Brand new yoga mat, never used. Selling because I received it as a gift but already have one.",
          "yogamat.seller@gmail.com",
          30,
          "https://cdn.pixabay.com/photo/2016/11/18/12/56/yoga-mat-1839192_1280.jpg",
          "Bordeaux",
          "2023-09-22T15:25:10.314Z",
          8
          ),
          (
          "Electric Scooter for sale",
          "Lightweight electric scooter, perfect for commuting. In excellent condition.",
          "scooter2.seller@gmail.com",
          400,
          "https://cdn.pixabay.com/photo/2020/10/04/09/35/electric-scooter-5626523_1280.jpg",
          "Paris",
          "2023-10-17T14:18:41.412Z",
          11
          ),
          (
          "Surfboard",
          "Surfboard in great condition, perfect for beginners. Selling because I upgraded to a larger board.",
          "surfboard.seller@gmail.com",
          250,
          "https://cdn.pixabay.com/photo/2016/08/19/12/24/surfboard-1609907_1280.jpg",
          "Lyon",
          "2023-09-09T08:35:15.612Z",
          8
          ),
          (
          "Electric Oven",
          "Compact electric oven, great for small kitchens. Barely used.",
          "oven.seller@gmail.com",
          200,
          "https://cdn.pixabay.com/photo/2016/06/29/09/22/oven-1480692_1280.jpg",
          "Paris",
          "2023-11-05T12:55:20.801Z",
          6
          ),
          (
          "Stand Mixer for sale",
          "High-quality stand mixer, used only a few times. Great for baking.",
          "mixer.seller@gmail.com",
          220,
          "https://cdn.pixabay.com/photo/2017/05/08/15/27/kitchen-2290971_1280.jpg",
          "Paris",
          "2023-09-19T12:22:18.922Z",
          6
          ),
          (
          "Electric Lawn Mower",
          "Powerful electric lawn mower, perfect for medium-sized gardens.",
          "lawnmower.seller@gmail.com",
          250,
          "https://cdn.pixabay.com/photo/2015/06/10/00/20/lawnmower-803588_1280.jpg",
          "Bordeaux",
          "2023-10-02T15:12:33.814Z",
          10
          ),
          (
          "Dining Set",
          "Modern dining set with a table and four chairs, perfect for small spaces.",
          "dining.set.seller@gmail.com",
          500,
          "https://cdn.pixabay.com/photo/2016/11/19/15/18/dining-set-1839720_1280.jpg",
          "Bordeaux",
          "2023-08-25T16:20:05.621Z",
          4
          ),
          (
          "Gaming Monitor",
          "27-inch gaming monitor with 144Hz refresh rate. Like new condition.",
          "monitor.seller@gmail.com",
          350,
          "https://cdn.pixabay.com/photo/2017/09/07/17/20/computer-2728524_1280.jpg",
          "Lyon",
          "2023-09-14T17:33:12.332Z",
          5
          ),
          (
          "Coffee Machine",
          "Espresso coffee machine, perfect for quick and delicious coffee.",
          "coffee.seller@gmail.com",
          120,
          "https://cdn.pixabay.com/photo/2015/09/02/12/13/coffee-918742_1280.jpg",
          "Bordeaux",
          "2023-09-25T11:50:15.212Z",
          6
          ),
          (
          "Electric Grill",
          "Portable electric grill, great for indoor and balcony use.",
          "grill.seller2@gmail.com",
          150,
          "https://cdn.pixabay.com/photo/2016/07/13/17/27/grill-1516736_1280.jpg",
          "Paris",
          "2023-09-08T16:23:35.233Z",
          6
          ),
          (
          "Electric Heater",
          "Portable electric heater, great for small spaces. Used for one winter, still works perfectly.",
          "heater.seller@gmail.com",
          75,
          "https://cdn.pixabay.com/photo/2014/12/27/15/31/heater-581592_1280.jpg",
          "Lyon",
          "2023-10-01T12:35:55.510Z",
          14
          ),
          (
          "Pet Carrier",
          "Lightweight pet carrier, ideal for cats and small dogs. Barely used, in great shape.",
          "petcarrier.seller@gmail.com",
          40,
          "https://cdn.pixabay.com/photo/2016/11/22/07/10/pet-carrier-1845732_1280.jpg",
          "Bordeaux",
          "2023-09-27T10:28:30.421Z",
          13
          );

INSERT    INTO `ad_tags_tag` (`adId`, `tagId`)
VALUES    (1, 2)