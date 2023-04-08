import { Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState("hhj");

    useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
          setUser(currentUser);
        });
      }, []);

  console.log("Current user:", user);
  return user ? children : <Navigate to= "/signin" />;
};


export default PrivateRoute;
