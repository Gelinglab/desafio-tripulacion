import React, { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';



const PasswordReset = () => {
  const { resetPassword, validMails } = UserAuth();
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  function validarEmail(email) {
    // Expresión regular para validar el formato de un correo electrónico
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Comprobar si el correo electrónico coincide con la expresión regular
    return regex.test(email);
  };


  function buscarPorMail(array, correo) {
    //comprobar si el mail introducido figura en la bade de datos como autorizado
    return array.findIndex(objeto => objeto.mail === correo);
  }

  const handleResetPassword = async () => {
    if (validarEmail(email) && buscarPorMail(validMails, email) !== -1) {
      setResetSent(await resetPassword(email))
    } else {
      alert("Su email no figura en la base de datos")
    }
  };


  return (
    <>
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
              <h2>Recuperar Contraseña</h2>
              {resetSent ? (
                <>
                  <p>Se ha enviado un correo electrónico a <b>{email}</b> con instrucciones para restablecer tu contraseña.</p>
                  <button id="volver-button"><Link to="/">VOLVER</Link></button>
                </>
              ) : (
                <>
                  <label htmlFor="email">Usuario</label>
                  <input
                    name="mail" 
                    id="email"
                    type="email"
                    placeholder="info@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleResetPassword}>ENVIAR</button>
                  <button id="volver-button"><Link to="/">VOLVER</Link></button>
                </>
              )}

            </div>
          </div>
        </article>
      </section>

    </>
  );
};

export default PasswordReset;
