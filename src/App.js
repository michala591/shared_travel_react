import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import UserContext from './UserContext';
import Search from './components/Search';
import Trips from './components/Trips';
import TripsContext from './TripsContext';
import { getAllTrips } from './api';
import MyAccount from './components/MyAccount';
import Login from './components/Login';

function App() {
  const [login, setLogin] = useState([])
  const [trips, setTrips] = useState([])


  useEffect(() => {
    async function fetchTrips() {
      const fetchedTrips = await getAllTrips();
      setTrips(fetchedTrips);
      console.log(trips)
    }
    fetchTrips();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ login, setLogin }}>
        <TripsContext.Provider value={{ trips, setTrips }}>
          <Navbar />
          <Search />
          <Trips/>
          <Login/>
          <MyAccount/>
        </TripsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
