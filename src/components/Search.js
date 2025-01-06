import React, { useState } from 'react'

function Search({onSearch}) {
    const [letter, setLetter] = useState([])
    
    const handleSearch = () => {
        onSearch(letter);
    };

    

    return (

        <div class="container mt-5 pt-5">
            <div class="search-section">
                <div class="row">
                    <div class="col-md-8">
                        <input value={letter} onChange={(e) => setLetter(e.target.value)} class="form-control search-input"
                            placeholder="Search trips by city or zone" />
                    </div>
                    <div class="col-md-4">
                        <button id="search-button" class="btn search-button w-100" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search