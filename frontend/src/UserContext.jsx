import { useEffect } from "react";
import axios from "axios";
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // for handling the delay of useEffect to get profile (checking whether userData is ready)

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
