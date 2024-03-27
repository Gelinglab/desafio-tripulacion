import React, { useState } from "react";
import { AsyncContext } from "./AsyncContext";

export const AsyncProvider = ({ children }) => {


const [objetoData, setObjetoData] = useState({});
const [days, setDays] = useState([]);
const [predictions, setPredictions] = useState([]);

  return (
    <>
      <AsyncContext.Provider value={{objetoData, setObjetoData, days, setDays, predictions, setPredictions}}>
        {children}
      </AsyncContext.Provider>
    </>
  );
};
