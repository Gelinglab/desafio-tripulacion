import React, { useContext } from "react";
import { apiProductos } from "./apiProductos";
import { AsyncContext } from "../context/asincContext/AsyncContext";

export const transformJson = async () => {
  try {

    const dataJson = await apiProductos();

    console.log("viene de fetch", dataJson);

    let objetoDataJson = dataJson.reduce((acumulador, objetoActual) => {
      return { ...acumulador, ...objetoActual };
    }, {});
    console.log(objetoDataJson);

    let daysArray = [];
    let predictionsArray = [];

    const clavesExcluidas = ["ubicacion", "maquina", "producto"];

    Object.entries(objetoDataJson).forEach(([clave, valor]) => {
      if (!clavesExcluidas.includes(clave)) {
        daysArray.push(clave);
        predictionsArray.push(valor);
      }

      console.log("dias", daysArray);
      console.log("predicciones", predictionsArray);
    });

    return {
        daysArray,
        predictionsArray,
        objetoDataJson
    }
  } catch (error) {

  }
};
