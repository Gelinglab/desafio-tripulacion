import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../../context/AuthContext";

const Login = () => {
  const { emailPasswordSignIn, user, rol, validMails } = UserAuth();
  const [inputs, setInputs] = useState({
    mail: "",
    pass: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado con el nuevo valor del input
    setInputs({
      ...inputs,
      [name]: value,
    }

    );
  };

  function validarEmail(email) {
    // Expresión regular para validar el formato de un correo electrónico
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Comprobar si el correo electrónico coincide con la expresión regular
    return regex.test(email);
  };

  function validarPassword(pasword) {
    // Expresión regular para validar la contraseña
    var regex = /^.{8,}$/;

    // Comprobar si la contraseña coincide con la expresión regular
    return regex.test(pasword);
  };

  function buscarPorMail(array, correo) {
    //comprobar si el mail introducido figura en la bade de datos como autorizado
    return array.findIndex(objeto => objeto.mail === correo);
  }

  function handleSubmit() {
    if (validarEmail(inputs.mail) == false) {
      alert("El formato del mail no es correcto");
    } else if (validarPassword(inputs.pass) == false) {
      alert("La contraseña debe contener al menos 6 caracteres, un número y una mayúscula")
    } else if (buscarPorMail(validMails, inputs.mail) == -1) {

      alert("Su mail no está registrado en nuestra base de datos")
    } else {
      try {
        emailPasswordSignIn(inputs.mail, inputs.pass);
      } catch (error) {
        alert("Mail o contraseña incorrectas")
      }
    }

  }

  return (
    <>
      {!user &&
        <section className="main-auth-container">
          <article className="left-container">
            <div className="logo-container">
              <img id="main-logo" src="assets/umbrella-morado-icono.webp" alt="main-logo" />
              <img id="text-logo" src="assets/logo-umbrella-blanco.webp" alt="main-logo" />
            </div>
          </article>
          <article className="right-container">
            <div className="content-container">
              <h1>FOR THE EVERY DAY RAIN</h1>
              <div className="login-container">
                <label htmlFor="email">Usuario</label>
                <input type="email" name="mail" id="email" placeholder="info@ejemplo.com" onChange={handleInputs} />
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="pass" className="log" placeholder="Contraseña" onChange={handleInputs} />
                <Link to={"/password-reset"}>¿Contraseña olvidada?</Link>
                <button onClick={handleSubmit}>LOGIN</button>
              </div>
            </div>
          </article>
        </section>
      }
    </>
  );
};

export default Login;
