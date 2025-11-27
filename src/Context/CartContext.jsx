import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 
  const normalizeProduct = (product, quantity = 1, size = null) => {
    
    const id =
      product.id ??
      product._id ??
      product.sku ??
      product.title ??
      product.name ??
      String(Math.random()).slice(2); 

    const name = product.name ?? product.title ?? "Product";

    const price = Number(product.price ?? product.amount ?? 0);

    const image =
      product.image ??
      product.img ??
      product.img1 ??
      product.img2 ??
      product.imageUrl ??
      product.src ??
      "";

    return {
      id,
      name,
      price,
      image,
      quantity: Number(quantity) || 1,
      size: size ?? null,
      
      __raw: product,
    };
  };

  // Add to cart - robust to different calling styles
  // Usage supports both:
  //   addToCart(productObject, quantity, size)
  //   addToCart(itemToAdd)  // where itemToAdd already contains id/name/price/image/quantity/size
  const addToCart = (product, quantity = 1, size = null) => {
    if (!product) return { ok: false, message: "Invalid product" };

    const itemToAdd =
      product && product.id && (product.name || product.title) && (product.image || product.img || product.img1)
        ? {
            id: product.id,
            name: product.name ?? product.title,
            price: Number(product.price ?? 0),
            image: product.image ?? product.img ?? product.img1 ?? "",
            quantity: Number(product.quantity ?? quantity) || 1,
            size: product.size ?? size ?? null,
            __raw: product.__raw ?? product,
          }
        : normalizeProduct(product, quantity, size);

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => String(item.id) === String(itemToAdd.id) && item.size === itemToAdd.size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          String(item.id) === String(itemToAdd.id) && item.size === itemToAdd.size
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
        );
      } else {
        return [...prevCart, itemToAdd];
      }
    });

    return { ok: true, message: "Added to cart" };
  };


  const removeFromCart = (id, size = null) => {
  setCart((prevCart) =>
    prevCart.filter((item) => {
      const sameId = String(item.id) === String(id);
      const sameSize =
        (item.size || null) === (size || null); 
      return !(sameId && sameSize);
    })
  );
};

  const increaseQuantity = (id, size = null) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.id) === String(id) && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  
  const decreaseQuantity = (id, size = null) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.id) === String(id) && item.size === size && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  
  const getTotal = () => cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

  const totalItems = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
   
const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotal,
        totalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
