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



  useEffect(() => {
    async function fetchTrips() {
      const fetchedTrips = await getAllTrips();
      setTrips(fetchedTrips);
    }
    fetchTrips();
  }, []);

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
    </>
  );
}

export default App;
