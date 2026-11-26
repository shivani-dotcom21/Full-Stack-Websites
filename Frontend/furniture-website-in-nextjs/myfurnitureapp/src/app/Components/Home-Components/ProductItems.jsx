"use client";
import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";

export default function ProductItems() {
  const [activeTab, setActiveTab] = useState("Featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend API se data fetch karne ke liye useEffect
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_APIBASEURL}type/${activeTab}`,
        );
        let data = await response.json();
        if (data.success || data.status) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeTab]);

  // Add to Cart handler function
  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newItem = { ...item, cartId: Date.now() }; // Har item ki unique ID taaki alag count ho
    const updatedCart = [...existingCart, newItem];

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Header ko turant update karne ke liye custom event trigger karein
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <section className="max-w-[1320px] mx-auto font-poppins">
      {/* Dynamic Tabs */}
      <ul className="lg:flex justify-center items-center mt-18 text-2xl font-semibold grid grid-cols-1 w-fit mx-auto gap-3 cursor-pointer">
        {["Featured", "New Arrivals", "Onsale"].map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-py-2 px-7 transition-all duration-200 text-center ${
              activeTab === tab
                ? "border-amber-500 text-amber-500 border-b-2"
                : "border-gray-300 text-gray-400 hover:text-amber-500"
            }`}
          >
            {tab}
          </li>
        ))}
      </ul>

      {/* Products Display Section */}
      {loading ? (
        <p className="text-center py-10 text-gray-500 text-lg">
          Loading products...
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 my-10 lg:p-0 p-5">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 w-full py-5 text-lg">
              No products found in this category.
            </p>
          ) : (
            products.map((item) => (
              <div
                key={item.item_id}
                className="lg:w-[260px] shadow-lg shadow-gray-400 p-4 bg-white rounded-lg flex flex-col justify-between"
              >
                {/* Dynamic Product Image */}
                <figure className="relative overflow-hidden">
                  <img
                    src={`https://server-lyart-zeta.vercel.app/${item.productImage}`}
                    alt={item.title || item.name}
                    className="w-full h-[200px] object-cover hover:scale-105 duration-200 ease-in-out"
                  />
                </figure>

                <div className="mt-4">
                  <p className="text-[13px] font-outfit text-gray-500">
                    {item.title || "Furniture Collection"}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 hover:text-amber-500 cursor-pointer text-base mt-1">
                    {item.item_name || item.title || item.name}
                  </p>

                  {/* Prices */}
                  <p className="font-outfit mt-2">
                    {item.oldPrice && (
                      <span className="line-through text-sm mr-2 text-gray-400">
                        Rs. {item.oldPrice}
                      </span>
                    )}
                    <span className="text-[17px] font-bold text-amber-600">
                      Rs. {item.price}
                    </span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <button className="p-2 rounded hover:bg-amber-500 hover:text-white transition-colors">
                    <FaRegHeart className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-gray-200 hover:bg-amber-500 hover:text-white py-1 px-5 text-[12px] font-outfit rounded transition-colors"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
