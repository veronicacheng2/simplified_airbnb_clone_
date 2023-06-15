import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInCalendarDays } from "date-fns";
import { useUserContext } from "../UserContext";

const BookingWidget = ({ place }) => {
  const [date, setDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [guestNum, setGuestNum] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    phone: "",
  });

  const { user } = useUserContext();
  useEffect(() => {
    if (user) {
      setGuestInfo({ name: user.name, phone: "" });
    }
  }, []);

  const navigate = useNavigate();

  const numOfDays = differenceInCalendarDays(date.checkOut, date.checkIn);
  const priceTotal = numOfDays * place.price;
  const taxes = Math.ceil(priceTotal * 0.05);
  const feeTotal = priceTotal + 40 + taxes + 25;

  const confirmReservation = async (e) => {
    e.preventDefault();
    const booking = {
      ...date,
      place: place._id,
      guestNum,
      ...guestInfo,
      totalPrice: feeTotal,
    };

    await axios.post("/bookings", booking);
    navigate(`/account/bookings/${place._id}`);
  };

  return (
    <div className="bg-white shadow p-6 rounded-2xl">
      <span className="font-bold text-2xl">${place.price} CAD </span> night
      <form className="grid gap-3 my-4" onSubmit={(e) => confirmReservation(e)}>
        <label>
          Check-in{" "}
          <DatePicker
            selected={date.checkIn}
            onChange={(date) =>
              setDate((state) => ({ ...state, checkIn: date }))
            }
          />
        </label>
        <label>
          Check-out{" "}
          <DatePicker
            selected={date.checkOut}
            onChange={(date) =>
              setDate((state) => ({ ...state, checkOut: date }))
            }
          />
        </label>
        <label>
          Number of guest
          <input
            type="number"
            name=""
            id=""
            min={1}
            value={guestNum}
            onChange={(e) => setGuestNum(e.target.value)}
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label>
            Name
            <input
              type="text"
              value={guestInfo.name}
              onChange={(e) =>
                setGuestInfo((state) => ({ ...state, name: e.target.value }))
              }
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              value={guestInfo.phone}
              onChange={(e) =>
                setGuestInfo((state) => ({ ...state, phone: e.target.value }))
              }
            />
          </label>
        </div>

        <button className="primary">Reserve</button>
      </form>
      <div>
        <h1 className="text-center text-gray-600 mt-2">
          You won&#39;t be charged yet
        </h1>
        <div className="grid grid-cols-[3fr_1fr] px-10 text-gray-600 mt-7 gap-y-4">
          <span className="underline">
            ${place.price} CAD x{" "}
            {differenceInCalendarDays(date.checkOut, date.checkIn)}
            {numOfDays > 1 ? " nights" : " night"}
          </span>
          <span className="text-end">${priceTotal} CAD</span>
          <span className="underline">Cleaning fee</span>
          <span className="text-end">$40 CAD</span>
          <span className="underline">Airbnb service fee</span>
          <span className="text-end">$25 CAD</span>
          <span className="underline">Taxes</span>
          <span className="text-end">${taxes} CAD</span>
        </div>
        <hr className="mt-5" />
      </div>
      <div className="grid grid-cols-[3fr_1fr] px-10 mt-7 text-black font-bold text-lg">
        <h1 className="">Total</h1>
        <span className="text-end">${feeTotal} CAD</span>
      </div>
    </div>
  );
};

export default BookingWidget;
