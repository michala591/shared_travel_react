import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import UserContext from './UserContext';
import Trips from './components/Trips';
import TripsContext from './TripsContext';
import { getAllTrips } from './api';
import MyAccount from './components/MyAccount';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './components/Register';
import TokenContext from './TokenContext';
import MyTripsContext from './MyTripsContext';

function App() {
  const [login, setLogin] = useState([])
  const [trips, setTrips] = useState([])
  const [myTrips, setMyTrips] = useState([])
  const [token, setToken] = useState([])
  const [showScrollButton, setShowScrollButton] = useState(false);




  useEffect(() => {
    async function fetchTrips() {
      const fetchedTrips = await getAllTrips();
      console.log(fetchTrips)
      console.log("start app!")
      if (Array.isArray(fetchedTrips)) {
        setTrips(fetchedTrips);
      } else {
        console.error("Expected an array, got:", fetchedTrips);
        setTrips([]); // Set to an empty array if invalid
      }
    }
    fetchTrips();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ login, setLogin }}>
          <TokenContext.Provider value={{ token, setToken }}>
            <TripsContext.Provider value={{ trips, setTrips }}>
              <MyTripsContext.Provider value={{ myTrips, setMyTrips }}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Trips />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/account" element={<MyAccount />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </MyTripsContext.Provider>
            </TripsContext.Provider>
          </TokenContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
      {showScrollButton && (
        <button
          className="scroll-to-top-btn"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </>
  );
}

export default App;
