import React from "react";
import NavBar from "./NavBar/NavBar";
import { UserAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, rol } = UserAuth();

  return (
    <>
      
      
      {user && 
      <>
      <div>Header</div>
      <NavBar />
      </>
      }
    </>
  );
};

export default Header;
