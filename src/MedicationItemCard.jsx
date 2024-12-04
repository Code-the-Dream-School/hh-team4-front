import React from 'react'
import Medication from './Medication';
import {drugData} from '/data';
import { Card, Box } from "@chakra-ui/react"
// import {layerStyles} from "/Layer-styles"

const MedicationItemCard = () => {

  return (
    <Box maxW='2xl' m='m auto'>
      {/* <Card.Body gap='2'> */}
      {drugData.map((drug) => (    
      <Medication
         key={drug.id}
         name={drug.name}
         generic={drug.generic}
         drugClass={drug.class}
         quantity={drug.quantity}
         expiration={drug.expiration}
         lot={drug.lot}
         ndc={drug.ndc}
       />
      ))}
      {/* </Card.Body> */}
    </Box>
  )
}

export default MedicationItemCard
