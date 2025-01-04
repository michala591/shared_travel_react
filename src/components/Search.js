import React, { useContext, useState } from 'react'
import TripsContext from '../TripsContext'

function Search() {
      const [search, setSearch] = useState([])
      const { trips, setTrips } = useContext(TripsContext)


      function searchTrip() {
        if (Search) {
            
        } else {
            
        }
      }
    
    return (

        <div class="container mt-5 pt-5">
            <div class="search-section">
                <div class="row">
                    <div class="col-md-8">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} class="form-control search-input" 
                            placeholder="Search trips by city or zone" />
                    </div>
                    <div class="col-md-4">
                        <button id="search-button" class="btn search-button w-100">Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search