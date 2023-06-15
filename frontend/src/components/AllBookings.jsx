import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { differenceInCalendarDays } from "date-fns";
import PlaceImg from "./PlaceImg";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const dateFormat = (date) => moment(date).format("DD/MM/YYYY");

  useEffect(() => {
    axios.get("/bookings").then(({ data }) => setBookings(data));
  }, []);
  return (
    <>
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <div key={booking._id} className="mb-5 px-38">
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer">
              <div className="w-44 h-44 bg-gray-300">
                <PlaceImg place={booking.place} />
              </div>

              <div className="py-3 pr-3 grow mx-5">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <div className="flex gap-1 mb-2 mt-4 text-gray-500">
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    )}{" "}
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    ) > 1
                      ? "nights"
                      : "night"}
                    :
                    <div className="flex gap-1 items-center ml-2">
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                      {dateFormat(booking.checkIn)}
                    </div>
                    &rarr;
                    <div className="flex gap-1 items-center">
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                      {dateFormat(booking.checkOut)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-xl">
                      Total price: ${booking.totalPrice}
                    </span>
                  </div>
                </div>
                <div className="text-md mt-5 text-gray-500">
                  <h3>
                    Location:{" "}
                    <a
                      className="underline"
                      href={`https://maps.google.com/?q=${booking.place.address}`}
                    >
                      {booking.place.address}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default AllBookings;
