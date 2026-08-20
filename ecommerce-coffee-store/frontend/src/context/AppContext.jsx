import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";

const AppContext = createContext();

export const FALLBACK_PRODUCTS = [
  {
    _id: "demo-1",
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
    _id: "demo-2",
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
    _id: "demo-3",
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
    _id: "demo-4",
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
    _id: "demo-5",
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
    _id: "demo-6",
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
    _id: "demo-7",
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
    _id: "demo-8",
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
    _id: "demo-9",
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
    _id: "demo-10",
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
    _id: "demo-11",
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
    _id: "demo-12",
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

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("brewcart_user") || "null"));
  const fixImage = (img) => (!img || img.includes("photo-1534687524002-3c2243d46f56")) ? "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80" : img;

  const [cart, setCart] = useState(() => {
    const raw = JSON.parse(localStorage.getItem("brewcart_cart") || "[]");
    return raw.map(i => ({ ...i, image: fixImage(i.image) }));
  });
  const [wishlist, setWishlist] = useState(() => {
    const raw = JSON.parse(localStorage.getItem("brewcart_wishlist") || "[]");
    return raw.map(i => ({ ...i, image: fixImage(i.image) }));
  });

  const [theme, setTheme] = useState(() => localStorage.getItem("brewcart_theme") || "light");
  const [toast, setToast] = useState(null);

  useEffect(() => { localStorage.setItem("brewcart_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("brewcart_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("brewcart_theme", theme);
  }, [theme]);

  const showToast = (message, type = "info") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("brewcart_token", data.token);
      localStorage.setItem("brewcart_user", JSON.stringify(data.user));
      setUser(data.user);
      showToast(`Welcome back, ${data.user.name.split(" ")[0]}! ☕`, "success");
      return data.user;
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed", "error");
      throw err;
    }
  };

  const register = async (payload) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      localStorage.setItem("brewcart_token", data.token);
      localStorage.setItem("brewcart_user", JSON.stringify(data.user));
      setUser(data.user);
      showToast("Account created successfully! Welcome to BrewCart 🎉", "success");
      return data.user;
    } catch (err) {
      showToast(err.response?.data?.message || "Registration failed", "error");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("brewcart_token");
    localStorage.removeItem("brewcart_user");
    setUser(null);
    showToast("Signed out successfully", "info");
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const found = prev.find(i => i.product === product._id);
      if (found) {
        return prev.map(i => i.product === product._id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity
      }];
    });
    showToast(`Added ${product.name} to your cart 🛒`, "success");
  };

  const updateQty = (id, quantity) => {
    setCart(prev => quantity < 1 ? prev.filter(i => i.product !== id) : prev.map(i => i.product === id ? { ...i, quantity } : i));
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(i => i.product !== id));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(i => i._id === product._id);
      if (exists) {
        showToast(`Removed ${product.name} from Wishlist`, "info");
        return prev.filter(i => i._id !== product._id);
      } else {
        showToast(`Added ${product.name} to Wishlist ❤️`, "success");
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.some(i => i._id === productId);

  const value = useMemo(() => ({
    user, login, register, logout,
    cart, addToCart, updateQty, removeFromCart, clearCart,
    wishlist, toggleWishlist, isInWishlist,
    theme, toggleTheme: () => setTheme(t => t === "light" ? "dark" : "light"),
    toast, showToast,
    cartCount: cart.reduce((s, i) => s + i.quantity, 0),
    cartTotal: cart.reduce((s, i) => s + i.price * i.quantity, 0),
    wishlistCount: wishlist.length
  }), [user, cart, wishlist, theme, toast]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
