import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSearch from './FilterSearch';

export default function Medication() {
    const location = useLocation();
    const { filterTitle, filterData } = location.state || {}; // Safeguard for missing state

    console.log(location);
    console.log('Filter Title:', filterTitle);
    console.log('Filter Data:', filterData);

    if (!filterData) {
        return <p>No data available</p>;
    }

    const [searchsection, setsearchsection] = useState(false);
    const toggleSearch = () => {
        setsearchsection((prevState) => !prevState);
    };

    return (
        <div>
            <div>
                <button onClick={toggleSearch}>Filter and search</button>
                {searchsection && (
                    <div>
                        <FilterSearch />
                    </div>
                )}
            </div>
            <h1>{filterTitle}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Generic</th>
                        <th>Class</th>
                        <th>Quantity</th>
                        <th>Threshold</th>
                        <th>Expiration</th>
                        <th>Batch</th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((drug) => (
                        <tr key={drug.id}>
                            <td>{drug.name}</td>
                            <td>{drug.generic}</td>
                            <td>{drug.class}</td>
                            <td>{drug.quantity}</td>
                            <td>{drug.threshold}</td>
                            <td>{drug.expiration}</td>
                            <td>{drug.batch}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
