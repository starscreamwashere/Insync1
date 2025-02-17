import React from "react";
import { TestimonialsData } from "../../mockData/data";
import Slider from "react-slick";

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000, // Default for large screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024, // For medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // For small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-14 mb-10 bg-[#FFFFFF] w-full"> {/* Lighter background from the palette */}
      {/* Header Section */}
      <div className="text-center mb-10 max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-[#023047]"> {/* Dark blue text for title */}
          What Are The Customers Saying About Us
        </h1>
        <p className="text-[#8D99AE]"> {/* Light gray text for description */}
          Here’s what our customers have to say about their experience with us.
        </p>
      </div>

      {/* Testimonials Slider */}
      <div className="w-full">
        <Slider {...settings}>
          {TestimonialsData.map((data) => (
            <div key={data.id} className="px-4">
              <div className="flex flex-col gap-4 p-6 shadow-lg rounded-xl bg-[#F5F7FA]">
                {/* Upper Section */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={data.img}
                      alt="Customer"
                      className="rounded-full w-16 h-16 object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-[#023047]">
                      {data.name}
                    </p>
                    <p className="text-sm text-[#8D99AE]">{data.position}</p> {/* Light gray text for position */}
                  </div>
                </div>
                {/* Testimonial Text */}
                <div className="py-4 text-[#023047]">
                  <p className="text-sm">{data.text}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
