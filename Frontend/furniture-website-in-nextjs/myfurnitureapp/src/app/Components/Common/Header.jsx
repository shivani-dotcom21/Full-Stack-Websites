"use client";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "@/app/redux/authSlice";
import { redirect } from "next/navigation";
import { FaRegHandPointRight } from "react-icons/fa";

export default function Header() {
  let token = useSelector((allstore) => allstore.auth.token);
  console.log(token);

  let dispatch = useDispatch();
  let logOut = () => {
    dispatch(clearCredentials());
    redirect("/login");
  };

  // let [halfCart, setHalfCart] = useState(false);
  let [menu, setMenu] = useState(false);
  let [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 150) {
  //       // 150px scroll hone ke baad header change hoga
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const [halfCart, setHalfCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // LocalStorage se cart load karne ka function
  const loadCart = () => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadCart();
    // Custom event sunne ke liye taaki add/remove par header turant update ho
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  // Cart me se specific item remove karne ke liye
  const handleRemove = (cartId) => {
    const updated = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated")); // Header ko turant sync karne ke liye
  };

  // For Total price & count calculate
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price || 0),
    0,
  );
  const totalCount = cartItems.length;

  return (
    <>
      <div>
        <div className=" hidden lg:block w-[1320px] lg:flex justify-between items-center py-3 text-[13px] px-30">
          <div className="w-full  text-end font-semibold">
            {token ? (
              <>
                <button
                  onClick={logOut}
                  className="mr-2 hover:text-amber cursor-pointer"
                >
                  Logout
                </button>
                <button className="hover:text-amber cursor-pointer">
                  MyProfile
                </button>
              </>
            ) : (
              <>
                <span className="hover:text-amber cursor-pointer">
                  <Link href="/login">Login / </Link>
                </span>
                <span className="hover:text-amber cursor-pointer">
                  <Link href="/register">Register</Link>
                </span>
              </>
            )}
          </div>
        </div>

        <hr className="text-gray-300" />
        <div className=" flex justify-between items-center py-5 lg:px-30 px-15">
          <figure>
            <img
              src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
              className="w-[130px] cursor-pointer"
            />
          </figure>
          <div className="flex gap-5">
            <form className="hidden lg:block  lg:flex items-center gap-5 border border-gray-300 py-2 px-5 ">
              <input
                placeholder="Search product"
                className="placeholder:text-sm focus:outline-none"
              />
              <IoSearchOutline className="text-lg hover:text-amber cursor-pointer" />
            </form>
            <div className="border px-3 flex items-center border-gray-200 py-2 lg:py-0 hover:text-amber">
              <Link href="/wishlist">
                <FaHeart className="text-xl cursor-pointer hover:scale-120 duration-500 ease-inout" />
              </Link>
            </div>

            <div
              onClick={() => setHalfCart(!halfCart)}
              className="flex items-center gap-2 border border-gray-300 px-3 hover:text-amber cursor-pointer  "
            >
              <p className="absolute lg:right-47 right-52  text-sm px-1.5 bg-amber text-white rounded-full ">
                {totalCount}
              </p>
              <IoMdCart className=" text-2xl" />
              <button className="hidden lg:block lg:flex items-center gap-2 text-sm font-semibold hover:cursor-pointer">
                {/* Rs. {totalPrice.toFixed(2)} */}
                <MdExpandMore className="text-xl" />
              </button>
            </div>
          </div>

          {/* 1. Ye blur overlay wala code */}
          {halfCart && (
            <div
              onClick={() => setHalfCart(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all"
            />
          )}
          <div
            className={`hidden lg:block p-5 fixed top-0 right-0 h-screen w-[27%] bg-white z-50 border transition-transform   duration-500 ease-in-out ${
              halfCart ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div>
              <h2 className="flex justify-between items-center text-xl font-semibold border-b pb-3 border-gray-300">
                Cart
                <IoMdClose
                  onClick={() =>
                    setHalfCart(halfCart == "true" ? null : "true")
                  }
                  className="text-2xl hover:text-amber hover:cursor-pointer"
                />
              </h2>

              <div className="mt-4 overflow-y-auto h-[50vh] space-y-3 pr-1">
                {cartItems.length === 0 ? (
                  <div>
                    <p className=" text-center text-2xl font-semibold">
                      Your cart is empty
                    </p>

                    <img
                      src="https://png.pngtree.com/png-clipart/20241115/original/pngtree-happy-cartoon-boy-running-with-shopping-cart-clipart-illustration-png-image_17080149.png"
                      alt=""
                      className="w-75 h-[275px]"
                    />
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.cartId}
                      className="flex items-center justify-between border-b pb-2 gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`http://localhost:8000/${item.productImage}`}
                          alt={item.title || item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium line-clamp-1">
                            {item.title || item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Rs. {item.price}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.cartId)}
                        className="text-red-500 text-xs bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="grid justify-center items-center gap-5 p-5 bg-black my-5">
                <button className="px-24 py-3  bg-zinc-800 text-white font-semibold text-sm rounded-lg hover:bg-amber">
                  <Link href="/cart" onClick={() => setHalfCart(false)}>
                    VIEW CART
                  </Link>
                </button>
                <button className="px-24 py-3 bg-amber text-white font-semibold text-sm rounded-lg">
                  <Link href="/checkout" onClick={() => setHalfCart(false)}>
                    CHECKOUT
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMenu(!menu)}
            className="lg:hidden sm:block border rounded-sm p-1 border-gray-600"
          >
            <IoIosMenu className="text-xl  font-bold" />
          </button>
          <div
            className={`lg:hidden sm:block fixed top-0 ${menu ? "left-0" : "left-[-80%]"} duration-1000 ease-in-out w-75 h-screen z-999  bg-white p-5 font-outfit`}
          >
            <button
              onClick={() => setMenu(!menu)}
              className="lg:hidden sm:block"
            >
              <MdOutlineClose className="text-xl  font-bold mb-3 ml-60" />
            </button>

            <div className="text-[13px] text-gray-600 grid justify-center text-center gap-5">
              <p>Contact us 24/7 : +91-98745612330</p>
              <p>furniture@gmail.com</p>
            </div>
            <div>
              <ul className="grid gap-8 uppercase font-outfit text-[13px] py-5 text-gray-600 font-semibold cursor-pointer">
                <li className="border-b border-gray-200 pb-2">
                  <Link href="/"> Home</Link>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2 ">
                  Living <MdExpandMore className="text-lg" />
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  Sofa <MdExpandMore className="text-lg" />
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  Pages
                  <MdExpandMore className="text-lg" />
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2 ">
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />

        <div>
          <ul className="flex justify-center items-center gap-10 uppercase font-outfit text-[13px] py-5 text-gray-600 font-semibold cursor-pointer">
            <li className="text-[#C09578] hover:text-[#C09578]">
              <Link href="/">Home</Link>
            </li>
            <li className="flex items-end hover:text-amber">
              <Link href=""> Living</Link> <MdExpandMore className="text-lg" />
            </li>
            <li className="flex items-end hover:text-amber">
              Sofa <MdExpandMore className="text-lg" />
            </li>
            <li className="flex items-end hover:text-amber">
              Pages
              <MdExpandMore className="text-lg" />
            </li>

            <li className="flex items-end hover:text-amber">
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        {isScrolled && (
          <div className="fixed top-0 w-full z-999 bg-white/80 flex justify-center items-center gap-10">
            <figure>
              <img
                src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                className="w-[130px]"
              />
            </figure>
            <ul className="flex justify-center items-center gap-10 uppercase font-outfit text-[13px] py-5 text-gray-600 font-semibold cursor-pointer">
              <li className="text-[#C09578] hover:text-[#C09578]">
                <Link href="/">Home</Link>
              </li>
              <li className="flex items-end hover:text-[#C09578]">
                Living <MdExpandMore className="text-lg" />
              </li>
              <li className="flex items-end hover:text-[#C09578]">
                Sofa <MdExpandMore className="text-lg" />
              </li>
              <li className="flex items-end hover:text-[#C09578]">
                Pages
                <MdExpandMore className="text-lg" />
              </li>
              <li className="flex items-end hover:text-[#C09578]">
                <Link href="/contact-us">Contact us</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
