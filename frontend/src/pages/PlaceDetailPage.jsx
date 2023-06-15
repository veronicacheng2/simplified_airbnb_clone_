import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

import PlaceGallery from "../components/PlaceGallery";
import PlaceSpecification from "../components/PlaceSpecification";

const PlaceDetailPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then(({ data }) => setPlace(data));
  }, []);

  if (showAll) {
    window.scrollTo(0, 0);
    return (
      <div className="absolute bg-white inset-0 p-8">
        <div className="mb-12">
          <button
            className="fixed flex gap-1 py-2 px-4 rounded-2xl shadow"
            onClick={() => {
              setShowAll(false);
              window.scrollTo(0, 0);
            }}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close photos
          </button>
        </div>
        <div className="w-8/12 mx-auto grid grid-cols-2 gap-1">
          {place.photos?.length > 0 &&
            place.photos.map((photo, i) => (
              <div key={photo} className={i === 0 ? "col-span-2" : "max-h-96"}>
                <img
                  src={`${axios.defaults.baseURL}/uploads/${photo}`}
                  className="w-full h-full"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 -mx-8 px-48 py-6 bg-gray-100">
      <div>
        <h1 className="text-3xl">{place?.title}</h1>
        <a
          href={`https://maps.google.com/?q=${place.address}`}
          target="_blank"
          className="flex gap-1 my-3 block font-semibold underline"
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
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          {place.address}
        </a>
      </div>
      <PlaceGallery place={place} setShowAll={setShowAll} />
      <div className="grid grid-cols-2 gap-5">
        <PlaceSpecification place={place} />
        <div className="my-4">
          <BookingWidget place={place} />
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailPage;
