import React from 'react'

const Medication = ({ name, dosage, price, imageUrl, onAddToCart }) => {
  return (
    <div  
    style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "300px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      >
      {/* Medication Image */}
      <img src='' alt={name} style={{
        width: '100px', height:'100px'}}
        />

      {/* Dosage */}   
      <p>{dosage}</p>

      {/* Price */}
      <p>${price}</p>

      {/* Add to Cart Button */}
      <button onClick={onAddToCart}
       style={{padding: "10px 20px",

       }}
       >
        Add to Cart

        </button>
    </div>
  )
}

export default Medication
