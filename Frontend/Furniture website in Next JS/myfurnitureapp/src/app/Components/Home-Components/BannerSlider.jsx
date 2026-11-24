"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";

export default function DynamicSlider() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se data laane ke liye useEffect
  useEffect(() => {
    async function fetchSliders() {
      try {
        const response = await fetch("http://localhost:8000/web/sliders"); // Apne backend ka URL yahan dein
        const data = await response.json();

        if (data.success) {
          setSliders(data.sliders);
        }
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSliders();
  }, []);

  if (loading) {
    return <p className="text-center py-4">Loading slider...</p>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-6 overflow-hidden rounded-lg shadow-md">
      {sliders.length === 0 ? (
        <p className="text-center text-gray-500">No slider images found.</p>
      ) : (
        <Swiper
          className="w-full h-[450px]"
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          <div className="w-full">
            {sliders.map((slide) => (
              <div key={slide._id} className="w-full h-full relative">
                <SwiperSlide>
                  <img
                    src={`http://localhost:8000/${slide.imageUrl}`}
                    alt={slide.title || "Slider Image"}
                    className="w-full h-full object-cover"
                  />
                  {slide.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-2 px-5 text-lg font-semibold">
                      {slide.title}
                    </div>
                  )}
                </SwiperSlide>
              </div>
            ))}
          </div>
        </Swiper>
      )}
    </div>
  );
}

// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";

// import { Pagination, Autoplay } from "swiper/modules";

// export default function BannerSlider() {
//   return (
//     <>
// <Swiper
//   className="w-full h-fit"
//   modules={[Pagination, Autoplay]}
//   slidesPerView={1}
//   pagination={{ clickable: true }}
//   autoplay={{ delay: 3000 }}
//   loop={true}
// >
//         <SwiperSlide>
//           <figure>
//             <img
//               src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/slider/648e23d4-5e5d-4fd0-b0f7-856ee45c6629-1671388137.jpg"
//               className="w-full h-full lg:h-[500px]"
//             />
//           </figure>
//         </SwiperSlide>
//         <SwiperSlide>
//           <figure>
//             <img
//               src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/slider/541928cd-e696-4c09-9f1c-bc9d7127c451-1671388153.jpg"
//               className="w-full h-full lg:h-[500px]"
//             />
//           </figure>
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }
