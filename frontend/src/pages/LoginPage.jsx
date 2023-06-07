import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useUserContext();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login successful");
      navigate("/");
    } catch (e) {
      console.log(e);
      alert("Login failed");
    }
  };

  return (
    <>
      {!user && (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form
              action=""
              className="max-w-md mx-auto"
              onSubmit={handleLoginSubmit}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name=""
                id=""
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="primary">Login</button>
              <div className="text-center py-2 text-gray-500">
                Don&apos;t have an account yet?{" "}
                <Link to="/register" className="underline text-black">
                  Register now
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
