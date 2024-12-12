import React,{useState} from 'react' ;

export default function LiveSearch({data , liveSearchFilter}){

    const [liveSearch , setLiveSearch]= useState("")


    const handelLiveSearchInput=(e)=>{
        const value=e.target.value.toLowerCase() ;
        
        
        
        setLiveSearch(value);
        const livefiltereddata = data.filter((item) => item.name.toLowerCase().includes(value))
    
    liveSearchFilter(livefiltereddata) ;
    }    
        
    

    return (
                <input
                            type="text"
                            placeholder="Search by drug name ..."
                            className="search-input"
                            onChange={handelLiveSearchInput}
                        />
    );
}

