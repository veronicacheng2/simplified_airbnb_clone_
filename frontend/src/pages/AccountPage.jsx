import { useUserContext } from "../UserContext";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import Layout from "../styles/Layout";

const AccountPage = () => {
  const { user, ready, setUser, setReady } = useUserContext();
  let subpage = "profile";
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname.includes("bookings")) {
    subpage = "bookings";
  } else if (pathname.includes("places")) {
    subpage = "places";
  } else {
    subpage = "profile";
  }

  return (
    <div>
      <AccountNav subpage={subpage} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountPage;

/*

{subpage === "profile" && (
        
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}

*/
