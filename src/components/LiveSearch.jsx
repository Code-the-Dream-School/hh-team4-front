import React,{useState} from 'react' ;

export default function LiveSearch({data , liveSearchFilter}){

    const [liveSearch , setLiveSearch]= useState("")


    const handelLiveSearchInput=(e)=>{
        const value=e.target.value.toLowerCase() ;
        
        
        
        setLiveSearch(value);
        const filtereddata = data.filter((item) => item.name.toLowerCase().includes(value))}
    
    liveSearchFilter(filtereddata) ;
        
    

    return (
                <input
                            type="text"
                            placeholder="Search by drug name ..."
                            className="search-input"
                            onChange={handelLiveSearchInput}
                        />
    );
}

