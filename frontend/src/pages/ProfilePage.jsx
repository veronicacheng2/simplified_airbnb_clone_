import { useUserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const { user, ready, setUser, setReady } = useUserContext();
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
    return navigate("/");
  }

  return (
    <div className="text-center max-w-lg mx-auto">
      Logged in as {user.name} ({user.email})
      <button className="primary max-w-sm mt-2" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
