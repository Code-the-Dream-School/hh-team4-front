import { useEffect, useState } from "react";
import FilterSearch from "./FilterSearch";


const Dashboard = () => {

    const [data , setData] = useState ([]) ;
    const [filterData, setFilterData] = useState ([]) ;
    const [loading , setLoading  ]= useState(true) ;
    const [error , setError]=useState(false) ;
    const [searchsection, setSearchSection] = useState(false);

   
    useEffect(()=>{
        fetch("http://localhost:8000/api/v1/inventory")
        .then(response =>{
            if (!response){
                throw new error ('Network response was not ok')
            }
            return response.json() ;
        })
        .then((data) => {
            setData(data.data);
            console.log(data) ;
            setFilterData(data.data);
            console.log("Filterdata ", filterData) ; 
            setLoading(false);
        })
        .catch(error=> setError(error.message)) ;

    }, []);
    


    const toggleSearch = () => {
        setSearchSection((prevState) => !prevState);
    };

    const handleFilter = (filteredData) => {
        console.log('this is handle filter from the page dashboard') ;
        console.log(filteredData);
        setFilterData(filteredData);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1>Dashboard</h1>
            <div>
                <button onClick={toggleSearch}>Filter and search</button>
                {searchsection && (
                    <div>
                        <FilterSearch  data={data} onFilter={handleFilter} />
                    </div>
                )}
            </div>
            <div>
            
            
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
                    { filterData.map((drug)  => (
                      
                        <tr key={drug._id}>
                             
                            <td>{drug.name}</td>
                            <td>{drug.genericName}</td>
                            
                            <td>{drug.lot}</td>
                            
                            <td>{drug.expirationDate}</td>
                            <td>{drug.class}</td>
                            <td>{drug.store}</td>
                            <td>{drug.ndcNumber}</td>
                            <td>{drug.threshold}</td>
                            <td>{drug.quantity}</td>
                          
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
           
        </>
    );
};

export default Dashboard;
