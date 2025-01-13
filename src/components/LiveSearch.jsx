import React, { useState } from 'react';

export default function LiveSearch({ formName, data, liveSearchFilter }) {
    const [liveSearch, setLiveSearch] = useState('');

    const handelLiveSearchInput = (e) => {
        const value = e.target.value.toLowerCase();

        setLiveSearch(value);
        let livefiltereddata = '';
        if (formName === 'allDrug') {
            livefiltereddata = data.filter((item) => item.name.toLowerCase().includes(value));
        } else if (formName === 'pastOrders') {
            livefiltereddata = data.filter((item) => item.drugName.toLowerCase().includes(value));
        }

        liveSearchFilter(livefiltereddata);
    };

    return (
        <input
            type="text"
            placeholder="Search by drug name ..."
            value={liveSearch}
            className="search-input"
            onChange={handelLiveSearchInput}
        />
    );
}
