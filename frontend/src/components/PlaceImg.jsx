import axios from "axios";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover w-full h-full";
  }

  return (
    <img
      className={className}
      src={`${axios.defaults.baseURL}/uploads/${place.photos[index]}`}
    />
  );
};

export default PlaceImg;
