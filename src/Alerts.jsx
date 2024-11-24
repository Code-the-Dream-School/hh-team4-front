import React, {useState} from "react";

const Alerts = () => {
  
  const Alert = ({ message, type, onClose}) => {
    const alertStyles ={
        success: { backgroundColor: "green", color:"white"},
        error: { backgroundColor: "red", color: "white"},
        warning: { backgroundColor: "orange", color: "black"},
    };
  } 

  return (
    <div style={{padding: "10px", ...alertStyles[type] }}>
        {message}

        <button onClick={onClose} style={{ marginLeft: "10px"}}>
            Close
        </button>
      
    </div>
  )
}

export default Alerts
