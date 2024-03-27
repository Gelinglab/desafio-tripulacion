import React, { useContext, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import Loading from "../Loading/Loading";
import { AsyncContext } from "../../../context/asincContext/AsyncContext";
import { useTransformJson } from "../../../hooks/useTransformJson";

const BarChart = () => {
  const {objetoData, days, predictions, } = useContext(AsyncContext)
  
 
  useTransformJson()
  
 

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `${objetoData.ubicacion}, ${objetoData.maquina}`,
      },
    },
  };
  
  const data = {
    labels: days,
    datasets: [
      {
        label: objetoData.producto,
        data: predictions,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      {/* {objetoData ? ( */}
      <Bar options={options} data={data} />
       {/* ) : <Loading/>} */}
    </>
  );
};

export default BarChart;
