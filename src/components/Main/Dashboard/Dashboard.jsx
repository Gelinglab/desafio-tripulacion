import React from "react";
import { UserAuth } from "../../../context/AuthContext";
import BarChart from "../BarChart/BarChart";
// import { transformJson } from "../../../helpers/transformJson";

const Dashboard = () => {
  const { user, rol } = UserAuth();
  // console.log("Esta funcionando el rol?", rol)
  // console.log("Asegurando que en dashboard lee user", user)
// transformJson()
  
  return (
    <>
      {user &&
      <>
        <section>
           <h2>Bienvenido {user.email}</h2>
          <p>Estas en el DASHBOARD</p>
          {rol &&
            <p>Eres rol admin   {rol}</p>
          }
        </section>
      <BarChart/>
      </>
      }
      {!user &&
        <p>No tienes permiso para acceder a esta funcion</p>
      }
    </>

  );
};

export default Dashboard;
