import React from "react";

export const apiProductos = async () => {
  try {
    const response = await fetch(
      "http://13.51.45.166/api/v1/ventas/predict?ubicacion=the_bridge&maquina=vitrina&producto=agua&fecha=2024-03-21",
        
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   
    if (!response.ok) {
      throw new Error("Usuarios no encontradas");
    }
   
    const resp = await response.json();
    
    return resp

  } catch (error) {}


};
