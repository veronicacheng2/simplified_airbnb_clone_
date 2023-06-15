import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./styles/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import Header from "./components/Header";
import PlacesPage from "./pages/PlacesPage";
import BookingsPage from "./pages/BookingsPage";
import ProfilePage from "./pages/ProfilePage";
import AddPlaceForm from "./components/AddPlaceForm";
import AddedPlaces from "./components/AddedPlaces";
import PlaceDetailPage from "./pages/PlaceDetailPage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Layout>
        <Header />
      </Layout>
      <Layout>
        <Routes>
          <Route index path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />}>
            <Route index path="/account/" element={<ProfilePage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />

            <Route path="/account/places" element={<PlacesPage />}>
              <Route path="/account/places/" element={<AddedPlaces />} />
              <Route path="/account/places/new" element={<AddPlaceForm />} />
              <Route
                path="/account/places/:placeId"
                element={<AddPlaceForm />}
              />
            </Route>
          </Route>
          <Route path="/place/:id" element={<PlaceDetailPage />} />
        </Routes>
      </Layout>
    </UserContextProvider>
  );
}

export default App;

/*
<Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />}>
            <Route path="/profile" element={<AccountPage />} />
            <Route path="/bookings" element={<AccountPage />} />
            <Route path="/places" element={<AccountPage />} />
          </Route>
        </Route>
      </Routes>


*/
