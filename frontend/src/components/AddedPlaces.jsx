import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddedPlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => setPlaces(data));
  }, []);

  console.log(axios.defaults.baseURL);

  return (
    <div className="mt-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={`/account/places/${place._id}`}
            key={place._id}
            className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer"
          >
            <div className="w-32 h-32 bg-gray-300 grow shrink-0">
              {place.photos.length > 0 &&
                place.photos.map((photo) => (
                  <img
                    src={`${axios.defaults.baseURL}/uploads/${photo}`}
                    key={photo}
                  />
                ))}
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm">{place.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default AddedPlaces;
