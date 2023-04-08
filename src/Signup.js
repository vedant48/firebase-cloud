import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { db } from './App';
import { Link, Navigate } from 'react-router-dom';
import './Signin.css';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await db.collection("users").doc(user.uid).set({
        name,
        email,
        location
      });
      Navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <div>
        New Here? <Link to="/signin">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
