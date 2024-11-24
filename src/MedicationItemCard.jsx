import React from 'react'
import Medication from './Medication';
import Alerts from './Alerts';

const MedicationItemCard = () => {

    const handleAddToCart = () => {
        <Alerts
          message="Medication added to cart!"
          type="success"
          onClose={() => setShowAlert(false)}
        />
      };
  return (
    <div>
      <Medication 
        name= 'Aspirin'
        dosage='400mg'
        price='10.99'
        imageUrl='image nameparth'
        onAddToCart={handleAddToCart}
       />

       <Medication 
        name= 'Ativan'
        dosage='400mg'
        price='10.99'
        imageUrl='image nameparth'
        onAddToCart={handleAddToCart}
       />

       <Medication 
        name= 'Ativan'
        dosage='400mg'
        price='10.99'
        imageUrl='image nameparth'
        onAddToCart={handleAddToCart}
       />

<Medication 
        name= 'Botox'
        dosage='400mg'
        price='10.99'
        imageUrl='image nameparth'
        onAddToCart={handleAddToCart}
       />

       <Medication 
        name= 'Brilinta'
        dosage='400mg'
        price='10.99'
        imageUrl='image nameparth'
        onAddToCart={handleAddToCart}
       />

       <Medication 
        name= 'Ibuprofen'
        dosage='400mg'
        price='10.99'
        imageUrl='image nameparth'
        onAddToCart={handleAddToCart}
       />
    </div>
  )
}

export default MedicationItemCard
