require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const products = [
  {
    name: "Ethiopian Yirgacheffe Beans",
    description: "Floral and citrusy single-origin coffee with light jasmine aroma and vibrant bergamot finish.",
    price: 490,
    category: "Coffee Beans",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=900&q=80",
    stock: 25,
    rating: 4.9,
    numReviews: 42,
    roastLevel: "Light",
    origin: "Yirgacheffe, Ethiopia",
    ingredients: "100% Arabica Whole Beans",
    isBestseller: true,
    isFeatured: true
  },
  {
    name: "Classic Italian Espresso",
    description: "Bold & intense double shot with dark caramel crema, cocoa undertones, and robust texture.",
    price: 180,
    category: "Espresso",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=900&q=80",
    stock: 40,
    rating: 4.8,
    numReviews: 89,
    roastLevel: "Dark",
    origin: "Milan, Italy Blend",
    ingredients: "Espresso Extract, Arabica/Robusta Blend",
    isBestseller: true,
    isFeatured: false
  },
  {
    name: "Velvety Cappuccino",
    description: "Perfect harmony of rich espresso, steamed microfoam milk, and dusting of fine dark cocoa.",
    price: 220,
    category: "Cappuccino",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
    stock: 30,
    rating: 4.9,
    numReviews: 64,
    roastLevel: "Medium",
    origin: "House Blend",
    ingredients: "Espresso, Steamed Whole Milk, Cocoa Powder",
    isBestseller: true,
    isFeatured: true
  },
  {
    name: "Artisanal Caramel Latte",
    description: "Silky steamed milk poured over double espresso infused with slow-cooked buttery caramel syrup.",
    price: 250,
    category: "Latte",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80",
    stock: 20,
    rating: 4.9,
    numReviews: 112,
    roastLevel: "Medium",
    origin: "Colombia Supremo",
    ingredients: "Espresso, Whole Milk, Caramel Drizzle",
    isBestseller: true,
    isFeatured: true
  },
  {
    name: "Signature Cold Brew",
    description: "Steeped for 18 hours in cold purified water for sub-acidic smooth taste with chocolate notes.",
    price: 240,
    category: "Cold Coffee",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    stock: 35,
    rating: 4.8,
    numReviews: 53,
    roastLevel: "Medium-Dark",
    origin: "Guatemala Antigua",
    ingredients: "Cold Water Extracted Arabica Coffee, Ice",
    isBestseller: true,
    isFeatured: true
  },
  {
    name: "Roasted Hazelnut Frappe",
    description: "Creamy iced blend of bold espresso, roasted hazelnut notes, topped with velvety whipped cream.",
    price: 290,
    category: "Cold Coffee",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=80",
    stock: 18,
    rating: 4.7,
    numReviews: 38,
    roastLevel: "Medium",
    origin: "Brazil Santos",
    ingredients: "Espresso, Hazelnut Syrup, Milk, Whipped Cream",
    isBestseller: true,
    isFeatured: false
  },
  {
    name: "Dark Chocolate Mocha",
    description: "Rich Dutch cocoa melted into hot espresso and velvety steamed milk topped with cocoa nibs.",
    price: 270,
    category: "Latte",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
    stock: 22,
    rating: 4.8,
    numReviews: 47,
    roastLevel: "Dark",
    origin: "Blend",
    ingredients: "Espresso, Dark Cocoa, Steamed Milk, Shaved Dark Chocolate",
    isBestseller: false,
    isFeatured: true
  },
  {
    name: "Colombian Supremo Ground Coffee",
    description: "Full-bodied ground roast with sweet nutty aroma, subtle cherry acidity, and balanced body.",
    price: 450,
    category: "Coffee Beans",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
    stock: 28,
    rating: 4.9,
    numReviews: 31,
    roastLevel: "Medium",
    origin: "Huila, Colombia",
    ingredients: "100% Arabica Medium Roast Coffee",
    isBestseller: false,
    isFeatured: false
  },
  {
    name: "Vanilla Bean Iced Latte",
    description: "Double espresso served chilled over ice with fresh Madagascar vanilla bean milk blend.",
    price: 260,
    category: "Cold Coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    stock: 24,
    rating: 4.7,
    numReviews: 29,
    roastLevel: "Light-Medium",
    origin: "Sumatra Mandheling",
    ingredients: "Espresso, Cold Whole Milk, Madagascar Vanilla Extract",
    isBestseller: false,
    isFeatured: true
  },
  {
    name: "Flat White",
    description: "Ristretto double shot topped with smooth velvety microfoam for concentrated coffee flavor.",
    price: 230,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=900&q=80",
    stock: 30,
    rating: 4.8,
    numReviews: 41,
    roastLevel: "Medium",
    origin: "Australia Blend",
    ingredients: "Double Ristretto, Steamed Whole Milk Microfoam",
    isBestseller: false,
    isFeatured: false
  },
  {
    name: "Spanish Cortado",
    description: "Equal parts intense espresso and warm silky milk to cut down acidity while preserving depth.",
    price: 200,
    category: "Espresso",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    stock: 15,
    rating: 4.9,
    numReviews: 19,
    roastLevel: "Dark",
    origin: "Spain Inspired Blend",
    ingredients: "Espresso, Warm Milk",
    isBestseller: false,
    isFeatured: false
  },
  {
    name: "Organic Sumatra Dark Roast Beans",
    description: "Earthy, smoky, and heavy-bodied dark roast with low acidity and deep herbal spicy notes.",
    price: 520,
    category: "Coffee Beans",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=900&q=80",
    stock: 16,
    rating: 4.8,
    numReviews: 22,
    roastLevel: "Dark",
    origin: "Sumatra, Indonesia",
    ingredients: "100% Organic Fair-Trade Arabica Whole Beans",
    isBestseller: false,
    isFeatured: false
  }
];

(async () => {
  await connectDB();
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});

  const admin = await User.create({
    name: "BrewCart Admin",
    email: "admin@brewcart.com",
    password: await bcrypt.hash("Admin@123", 10),
    role: "admin",
    phone: "+91 98765 43210",
    address: "100 Brew Avenue",
    city: "Mumbai",
    postalCode: "400001"
  });

  const demoUser = await User.create({
    name: "Demo User",
    email: "user@brewcart.com",
    password: await bcrypt.hash("User@123", 10),
    role: "user",
    phone: "+91 91234 56789",
    address: "42 Coffee Street",
    city: "Bangalore",
    postalCode: "560001"
  });

  const createdProducts = await Product.insertMany(products);

  // Seed a sample order for demo user
  await Order.create({
    user: demoUser._id,
    items: [
      {
        product: createdProducts[0]._id,
        name: createdProducts[0].name,
        image: createdProducts[0].image,
        price: createdProducts[0].price,
        quantity: 1
      },
      {
        product: createdProducts[3]._id,
        name: createdProducts[3].name,
        image: createdProducts[3].image,
        price: createdProducts[3].price,
        quantity: 2
      }
    ],
    subtotal: 990,
    discount: 198,
    shippingFee: 0,
    totalAmount: 792,
    couponCode: "BREW20",
    paymentMethod: "UPI / NetBanking",
    shippingAddress: {
      fullName: "Demo User",
      address: "42 Coffee Street",
      city: "Bangalore",
      postalCode: "560001",
      phone: "+91 91234 56789"
    },
    status: "Preparing"
  });

  console.log("BrewCart seed complete with 12 products, 2 users, and 1 sample order.");
  process.exit(0);
})();
