"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ChairCollection() {
  const [chairCollection, setChairCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se data laane ke liye useEffect
  useEffect(() => {
    async function fetchChairCollection() {
      try {
        const response = await fetch(
          "http://localhost:8000/web/chairCollection",
        ); // Apne backend ka URL yahan dein
        const data = await response.json();

        if (data.success) {
          setChairCollection(data.chairCollection);
        }
      } catch (error) {
        console.error("Error fetching Chair Collection data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChairCollection();
  }, []);

  if (loading) {
    return <p className="text-center py-4">Loading Chair Collection...</p>;
  }

  return (
    <>
      <section className=" max-w-[1320px] mx-auto font-poppins">
        {chairCollection.length === 0 ? (
          <p className="text-center text-gray-500">No slider images found.</p>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-5 my-10 lg:p-0 p-5">
            {chairCollection.map((item) => (
              <Link href="/page" key={item._id}>
                <div className="relative overflow-hidden">
                  <figure className="w-[300px] h-[300px] relative overflow-hidden">
                    <img
                      src={`http://localhost:8000/${item.imageUrl}`}
                      alt={item.title || "Chair Collection Image"}
                      className="w-full lg:w-[300px] h-full hover:scale-110 duration-200 ease-in-out"
                    />
                    <div className="absolute top-5 left-5">
                      <p className="text-sm font-semibold">Design Creative</p>
                      <p className="text-2xl font-semibold">{item.title}</p>
                    </div>
                  </figure>
                </div>
              </Link>
            ))}
          </div>
        )}
        <hr className="text-gray-300" />
      </section>
    </>
  );
}
