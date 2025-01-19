import React, { useState } from 'react'

function Search({ letter, setLetter, originList }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCityClick = (city) => {
        setLetter(city);
        setIsDropdownOpen(false);
    };

    return (
        <div><div class="search-section">
            <div class="col-md-8">
                <input value={letter} onChange={(e) => {
                    setLetter(e.target.value);
                    setIsDropdownOpen(e.target.value.trim() !== '');
                }} class="form-control search-input"
                    placeholder="Search trips by city or zone" />
                {letter.trim() !== '' && originList.length > 0 && isDropdownOpen && (
                    <ul className="dropdown-menu show w-100 mt-1">
                        {originList.map((origin, index) => (
                            <li
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleCityClick(origin.city)}
                                style={{ cursor: 'pointer' }}
                            >
                                {origin.city}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
        </div></div>
    )
}

export default Search