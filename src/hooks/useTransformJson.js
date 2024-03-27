import React, { useContext, useEffect } from 'react'
import { transformJson } from '../helpers/transformJson'
import { AsyncContext } from '../context/asincContext/AsyncContext'

export const useTransformJson = () => {
  
    const {objetoData, setObjetoData, days, setDays, predictions, setPredictions} = useContext(AsyncContext)

    useEffect(()=>{
    //    const { daysArray, predictionsArray, objetoDataJson}=transformJson()
    //    setObjetoData(objetoDataJson)
    //    setDays(daysArray)
    //    setPredictions(predictionsArray)
    const fetchDataAndSet = async () => {
        const { daysArray, predictionsArray, objetoDataJson } = await transformJson();
        setObjetoData(objetoDataJson);
        setDays(daysArray);
        setPredictions(predictionsArray);
    };
    fetchDataAndSet();
    },[setObjetoData, setDays, setPredictions])
   
    
}
