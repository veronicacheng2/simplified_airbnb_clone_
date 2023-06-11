import React from "react";
import axios from "axios";

const PlaceGallery = ({ place, setShowAll }) => {
  return (
    <div className="relative max-h-[28rem] ">
      <div className="grid gap-2 grid-cols-[4fr_2fr]  overflow-hidden">
        {place.photos?.[0] && (
          <div>
            <img
              src={`${axios.defaults.baseURL}/uploads/${place.photos[0]}`}
              className="w-full max-h-[28rem] object-cover rounded-l-2xl"
            />
          </div>
        )}

        <div className="flex flex-col max-h-[28rem] gap-2">
          {place.photos?.[1] && (
            <div className="w-full h-1/2">
              <img
                src={`${axios.defaults.baseURL}/uploads/${place.photos[1]}`}
                className="w-full h-full rounded-tr-2xl"
              />
            </div>
          )}
          {place.photos?.[2] && (
            <div className="w-full h-1/2 rounded-br-2xl">
              <img
                src={`${axios.defaults.baseURL}/uploads/${place.photos[2]}`}
                className="w-full h-full rounded-br-2xl"
              />
            </div>
          )}
        </div>
      </div>
      <button
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-gray-500"
        onClick={() => setShowAll(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
};

export default PlaceGallery;
