import React from "react";

const PlaceSpecification = ({ place }) => {
  return (
    <div>
      <div className="my-4">
        <h2 className="font-semibold text-2xl mb-1">Description</h2>
        {place.description}
      </div>

      <div className="leading-6">
        Check-in: {place.checkIn} <br />
        Checkout: {place.checkOut} <br />
        {place.maxGuests} guests maximum
      </div>

      <div className="my-8">
        <h2 className="text-2xl">What this place offers</h2>
        <p className="leading-8 text-gray-800 text-sm">{place.extraInfo}</p>
      </div>
    </div>
  );
};

export default PlaceSpecification;
