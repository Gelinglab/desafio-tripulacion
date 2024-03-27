import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../src/config/firebaseAuth";
import {collection, getDocs} from "firebase/firestore";
import { firestore } from "../../src/config/firebaseAuth";

const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [validMails, setValidMails] = useState();
  const [user, setUser] = useState();
  const [rol, setRol] = useState();
  
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const emailPasswordSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        // console.log('Usuario ha iniciado sesión:', user);
      })
      .catch((error) => {
        alert("Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña e inténtalo nuevamente.")
        console.error('Error al iniciar sesión con correo/contraseña:', error.message);
      });
  };

  const emailPasswordSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        // console.log('Usuario se ha registrado:', user);
      })
      .catch((error) => {

        console.error('Error al registrarse con correo/contraseña:', error.message);
      });
  };

  const logOut = () => {
    signOut(auth);
    setRol();
  };

  const resetPassword = async (email) => {
      try {
        await sendPasswordResetEmail(auth, email);
        return true
      } catch (error) {
        alert(error.message);
        return false
      }
    
  };

  useEffect(()=>{
    const queryCollection = collection(firestore,"users")
    getDocs(queryCollection)
      .then(res => setValidMails(res.docs.map(user => ({...user.data()}))))           
  },[])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log('Usuario', currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (validMails && user && validMails.length > 0) {
      const userMail = user.email;
      const userIndex = validMails.findIndex(mail => mail.mail === userMail);
      if (userIndex !== -1) {
        setRol(validMails[userIndex].admin);
      }

    }
  }, [validMails, user]);




  return (
    <AuthContext.Provider value={{ googleSignIn, emailPasswordSignIn, emailPasswordSignUp, logOut, resetPassword, validMails, setValidMails, user, rol}}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

