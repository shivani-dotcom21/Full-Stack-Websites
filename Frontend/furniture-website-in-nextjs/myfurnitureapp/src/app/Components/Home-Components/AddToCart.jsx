"use client";
import React, { useState } from "react";

export default function SinglePageCart() {
  // 1. Ek sample product list
  const products = [
    { id: 1, name: "Modern Wooden Chair", price: 2499 },
    { id: 2, name: "Comfort Sofa", price: 12999 },
  ];

  // 2. Cart state (shuruat me cart khali rahega)
  const [cart, setCart] = useState([]);

  // 3. Add to cart karne ka function
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Agar item pehle se cart me hai, to quantity badha dein
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      // Agar naya item hai, to quantity 1 ke sath add karein
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">
        🛒 Products & Cart (Single Page)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600 mb-4">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Add to Cart 🛍️
            </button>
          </div>
        ))}
      </div>

      <hr className="mb-6" />

      {/* Cart Summary Section */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-4">📦 Your Cart Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center mb-3 border-b pb-2"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-semibold">
                    ₹{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>
                ₹
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0,
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
