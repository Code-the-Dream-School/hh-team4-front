import React, { useState, useEffect } from 'react';
//import { drugData } from './data.jsx'; // Update path accordingly

export default function FilterSearch({data , onFilter}) {
  
    
    const [formValues , setFormValues] = useState({
        
        drugname: '',
        lot: '',
        ExpirationdateFrom: '',
        Expirationdateto: '',
        type: '',
    })

    const HandelSearch = (e) => {
        e.preventDefault();
       
        let filteredData = data;
       
        // Apply filters
      
        if (formValues.drugname) {
            

            filteredData = filteredData.filter((item) =>
                item.name.toLowerCase().includes( formValues.drugname.toLowerCase())
            );
           
        }
       
        if (formValues.lot) {
            filteredData = filteredData.filter((item) => item.lot === formValues.lot);
        }

        if (formValues.ExpirationdateFrom && formValues.Expirationdateto) {
            filteredData = filteredData.filter(
                (item) =>
                    new Date(item.expirationDate) >= new Date(formValues.ExpirationdateFrom) &&
                    new Date(item.expirationDate) <= new Date(formValues.Expirationdateto)
            );
        }

        if (formValues.type) {
            filteredData = filteredData.filter((item) =>
                item.type.toLowerCase().includes(formValues.type.toLowerCase())
            );
        }
        onFilter(filteredData);
       
    };
    const HandelCancel = (e) => {
        setFormValues({
            drugname: '',
            lot: '',
            ExpirationdateFrom: '',
            Expirationdateto: '',
            type: '',
        });
        onFilter(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
      
    };
    
    return (
        <>
        <form>
            <div>
                <label htmlFor="drugname">Drug Name: </label>
                <input name="drugname"  value={formValues.drugname} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="lot">Lot number: </label>
                <input name="lot"   value={formValues.lot} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="ExpirationdateFrom">Expirationdate From: </label>
                <input name="ExpirationdateFrom"  value={formValues.ExpirationdateFrom}  onChange={handleInputChange} type="date"/>
                <label htmlFor="Expirationdateto">Expirationdate To: </label>
                <input name="Expirationdateto"  value={formValues.Expirationdateto}  onChange={handleInputChange} type="date"/>
            </div>
            <div>
                <label htmlFor="type">Type of Drug:</label>
                <input name="type" value={formValues.type}  onChange={handleInputChange}/>
            </div>
            <div>
                <button onClick={HandelSearch}>Search</button>
                <button onClick={HandelCancel}>Cancel</button>
            </div>
            </form>
        </>
    );
}
