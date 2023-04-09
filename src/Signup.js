import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { db } from './App';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';
import Navbar from './Navbar';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await db.collection("users").doc(user.uid).set({
        name,
        email,
        location
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className='container'>
      <form onSubmit={handleSignup}>
      <h1>Sign Up</h1>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <div style={{color: 'black'}}>
        Already have an account? <Link to="/signin">Log In</Link>
      </div>
    </div>
    </>
  );
};

export default Signup;
