"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaRegHandPointRight } from "react-icons/fa";

export default function CartPage() {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Page load hone par localStorage se items load karein
  const loadCart = () => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  // Item remove karne ka function
  const handleRemove = (cartId) => {
    const updated = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated")); // Header/Sidebar ko bhi sync karne ke liye
  };

  // Pehle totalPrice calculate hoga:
  const totalPrice = cartItems.reduce((acc, item) => {
    const qty = item.quantity || 1;
    return acc + item.price * qty;
  }, 0);

  // Uske baad finalTotal banega:
  const discount = 50;
  const finalTotal = totalPrice - discount;

  const handleQuantityChange = (cartId, qty) => {
    const newQty = Math.max(1, Number(qty) || 1);
    const updated = cartItems.map((item) =>
      item.cartId === cartId ? { ...item, quantity: newQty } : item,
    );
    setCartItems(updated);
  };

  return (
    <div className="max-w-[1320px] mx-auto py-5 px-5 font-outfit">
      {/* <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1> */}

      {cartItems.length === 0 ? (
        <div>
          <div className="flex items-center gap-2">
            <p className=" text-center text-2xl font-semibold">
              Your cart is empty
            </p>
            <FaRegHandPointRight className=" text-center text-2xl font-semibold" />
            <p className="text-sm text-blue-600 underline hover:text-blue-700 font-poppins">
              <Link href="/"> Go For Shopping </Link>
            </p>
          </div>
          <img
            src="https://png.pngtree.com/png-clipart/20241115/original/pngtree-happy-cartoon-boy-running-with-shopping-cart-clipart-illustration-png-image_17080149.png"
            alt=""
            className="w-75 h-75"
          />
        </div>
      ) : (
        <div className=" flex gap-5 p-5 ">
          <div className="space-y-4">
            <tr>
              <th className="px-10 py-3 border-y border-gray-300  border-l">
                Image
              </th>
              <th className="px-10 py-3 border-y border-gray-300 ">Product</th>
              <th className="px-10 py-3 border-y border-gray-300 ">Price</th>
              <th className="px-10 py-3 border-y border-gray-300 ">Quantity</th>
              <th className="px-10 py-3 border-y border-gray-300 ">Total</th>
              <th className="px-10 py-3 border-y border-gray-300 border-r">
                Delete
              </th>
            </tr>
            <tbody>
              {cartItems.map((item) => (
                <tr className="border-b border-gray-300 text-center ">
                  <td className="p-1 border-b border-l border-gray-300 w-[100px] h-[50px] ">
                    <img
                      src={`http://localhost:8000/${item.productImage}`}
                      alt={item.title || item.name}
                      className="w-full h-fit cursor-pointer"
                    />
                  </td>

                  <td className="p-3 border-b border-gray-300 text-sm ">
                    {item.title || item.name}
                  </td>
                  <td className="p-3 border-b border-gray-300 text-zinc-800 font-semibold text-[15px]">
                    Rs. {item.price}
                  </td>
                  <td className="p-3 border-b border-gray-300 text-zinc-800 text-[15px] ">
                    Quantity
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || item.qty || 1}
                      onChange={(e) =>
                        handleQuantityChange(item.cartId, e.target.value)
                      }
                      className="border border-gray-200 text-zinc-800 font-semibold outline-none w-12 p-1 ml-3 "
                    />
                  </td>
                  <td className="p-3 border-b border-gray-300 text-zinc-800 font-semibold text-[15px]">
                    Rs. {item.price * (item.quantity || 1)}
                  </td>
                  <td className="p-3 border-b border-r border-gray-300 font-semibold">
                    <button
                      onClick={() => handleRemove(item.cartId)}
                      className=" text-red-500 hover:text-red-600 px-4 py-2 rounded text-sm font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>

          <div>
            <div className="w-[450px]  border border-gray-300 font-outfit grid gap-5">
              <h1 className="text-xl bg-zinc-800 p-2 text-white font-poppins">
                Coupon
              </h1>
              <div className="p-5">
                <p className="text-[15px]">
                  Enter your coupon code if you have one.
                </p>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="w-fit py-2 border border-gray-300 pl-5 placeholder:text-[15px] placeholder:text-zinc-600 outline-none"
                />
                <button className="py-2 px-5 mt-5 text-[13px] ml-5 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-amber cursor-pointer">
                  APPLY COUPON
                </button>
              </div>
            </div>

            <div className="w-[450px] border  border-gray-300 font-outfit  grid gap-5 mt-5">
              <h1 className="text-xl bg-zinc-800 p-2 text-white font-poppins">
                Cart Totals
              </h1>
              <div className=" grid gap-3 p-5 font-semibold ">
                <p className="flex justify-between align-items-center">
                  Subtotal{" "}
                  <span className="text-[16px] font-bold">
                    Rs. {totalPrice.toFixed(2)}
                  </span>
                </p>
                <p className="flex justify-between align-items-center">
                  Discount (-){" "}
                  <span className="text-[16px] font-bold">
                    Rs. {discount.toFixed(2)}
                  </span>
                </p>
                <p className="flex justify-between align-items-center">
                  Total{" "}
                  <span className="c">
                    Rs. {finalTotal.toFixed(2)}
                  </span>
                </p>
                <div className="grid justify-end">
                  <button className="  py-2 px-5 mt-5 text-[16px] ml-5 bg-amber  text-white font-semibold rounded-lg hover:bg-zinc-800 cursor-pointer">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
