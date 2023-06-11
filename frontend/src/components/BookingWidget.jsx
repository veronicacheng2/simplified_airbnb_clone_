import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingWidget = ({ place }) => {
  return (
    <div className="bg-white shadow p-6 rounded-2xl">
      <span className="font-bold text-2xl">${place.price} CAD </span> night
      <form className="grid gap-3 my-4">
        <label>
          Check-in <DatePicker />
        </label>
        <label>
          Checkout <DatePicker />
        </label>
        <label>
          Number of guest
          <input type="number" name="" id="" />
        </label>
      </form>
      <button className="primary">Reserve</button>
    </div>
  );
};

export default BookingWidget;
