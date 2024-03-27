import React from "react";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

const NavBar = () => {

  const { user, rol, setRol, logOut } = UserAuth();



  const cerrarSesion = async () => {
    try {
      await logOut();
      alert("Cerraste sesión correctamente. ¡Hasta pronto!")
    } catch (error) {
      console.log(error);
    }
  };
  


  return (

    <ul>

      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      {rol &&
        <li>
          <NavLink to="/users">Usuarios</NavLink>
        </li>
      }
      <li onClick={cerrarSesion}>
        <a href="">LogOut</a>
      </li>
    </ul>
  )
};

export default NavBar;
