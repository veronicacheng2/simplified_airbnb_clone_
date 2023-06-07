import { useUserContext } from "../UserContext";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const AccountPage = () => {
  const { user, ready, setUser, setReady } = useUserContext();
  let { subpage } = useParams();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      setReady(false);
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  if (subpage === undefined) subpage = "profile";

  return (
    <div>
      <AccountNav subpage={subpage} />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
