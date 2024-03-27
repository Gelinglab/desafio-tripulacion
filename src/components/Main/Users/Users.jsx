import React from "react";

import { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext"
import { setDoc, updateDoc, deleteDoc, doc, collection, } from "firebase/firestore";
import { firestore } from "../../../config/firebaseAuth";

const Users = () => {
  const { rol, validMails, setValidMails, emailPasswordSignUp } = UserAuth();
  const [elegido, setElegido] = useState('');

  const handleUserChange = (e) => {
    setElegido(e.target.value);
  }


  const addUser = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
    const newUser = {
      mail: e.target.newUserMail.value,
      admin: e.target.admin.value === 'true' // Convierte el valor del campo de administrador a un booleano
    };

    try {
      const usersCollection = collection(firestore, 'users');
      const userDoc = doc(firestore, "users", e.target.newUserMail.value);
      await setDoc(userDoc, newUser);
      alert('Usuario agregado exitosamente');
      setValidMails([...validMails, newUser]);
      await emailPasswordSignUp(e.target.newUserMail.value, e.target.newUserPassword.value);
    } catch (error) {
      if (error.code === 'already-exists') {
        alert('El usuario ya existe');
      } else {
        alert('Error al agregar usuario: ' + error.message);
      }
    }
  };


  const updateUser = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
    const editedUser = {
      mail: e.target.editUser.value,
      admin: e.target.editAdmin.value === 'true' // Convierte el valor del campo de administrador a un booleano
    };
    try {
      const userDoc = doc(firestore, 'users', e.target.editUser.value);
      await updateDoc(userDoc, editedUser);
      alert('Usuario actualizado exitosamente');
      setValidMails([...validMails.filter(element => element.mail !== editedUser.mail), editedUser]);
    } catch (error) {
      alert('Error al actualizar usuario: ' + error.message);
    }
  };

  const deleteUser = async (elegido) => {
    if (window.confirm('¿Está seguro que desea borrar el usuario? Esta accion no es reversible.'	)) {
      try {
        const userDoc = doc(firestore, 'users', elegido);
        await deleteDoc(userDoc);
        alert('Usuario eliminado exitosamente');
        setValidMails(validMails.filter(element => element.mail !== elegido));
      } catch (error) {
        alert('Error al eliminar usuario: ' + error.message);
      }
    }
  };

  return (
    <>
      {rol &&
        <section>
          <article>
          <p>PANEL DE ADMINSTRACIÓN DE USUARIOS</p>
          <table>
            <thead>
              <tr>
                <th>Mail</th>
                <th>Permisos de Admin</th>
              </tr>
            </thead>
            <tbody>
              {validMails.map((user, index) => (
                <tr key={index}>
                  <td>{user.mail}</td>
                  <td>{user.admin ? 'Si' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </article>

          <article>
          <select name="borrar" id="borrar" onChange={handleUserChange}>
            <option>Borrar un usuario</option>
            {validMails.map((user, index) => (
              <option key={index} value={user.mail}>{user.mail}</option>
            ))}
          </select>
          <button onClick={() => deleteUser(elegido)}>Eliminar</button>

          </article>
          <article>


          <form onSubmit={updateUser}>
          <select name="editUser" id="editUser">
            <option>Editar un usuario</option>
            {validMails.map((user, index) => (
              <option key={index} value={user.mail}>{user.mail}</option>
            ))}
          </select>
            <label>
              Permisos de Admin:
              <label>
                <input type="radio" name="editAdmin" value="true" required />
                Si
              </label>
              <label>
                <input type="radio" name="editAdmin" value="false" required />
                No
              </label>
            </label>
  
            <button type="submit">Editar</button>
          </form>


          </article>

          <article>
          <p>Registrar un nuevo usuario</p>
          <form onSubmit={addUser}>
            <input type="email" name="newUserMail" id="newUserMail" placeholder="Nuevo usuario mail" />
            <label>
              Permisos de Admin:
              <label>
                <input type="radio" name="admin" value="true" required />
                Si
              </label>
              <label>
                <input type="radio" name="admin" value="false" required />
                No
              </label>
            </label>
            <input  name="newUserPassword" id="newUserPassword" placeholder="Nueva contraseña" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="La contraseña debe contener al menos 8 caracteres, una mayúscula y un número" />
            <button type="submit">Añadir</button>
          </form>
          </article>
        </section>
      }
      {!rol &&
        <section>
          <p>Acceso denegado</p>
        </section>
      }
    </>
  )
};

export default Users;

