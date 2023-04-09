import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { db } from './App';
import FileUpload from './FileUpload';
import './Home.css';
import HomeNav from './HomeNav';


const Home = () => {
  const [user, setUser] = useState(null);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    Navigate('/signin');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const userDocRef = db.collection('users').doc(user.uid);
    await userDocRef.update({ name, location });

    setUser({ ...user, name, location });
    setUpdatingProfile(false);
  };

  console.log(userData)
  console.log(user)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const doc = await db.collection("users").doc(user.uid).get();
        setUserData({ uid: user.uid, ...doc.data() });
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
    <nav>
      <div className="logo">
        <img src={require('./logo.png')} />
      </div>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={handleMenuClick}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li>
          <a href="#">New Quote</a>
        </li>
        <li>
          <a href="#">My Quotes</a>
        </li>
        <li>
          <a href="#">My Orders</a>
        </li>
        <li>
          <button onClick={() => setUpdatingProfile(true)} className="login-button">
            Update Profile
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="join-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
    <div className="home-container">
      <h1 className="home-heading">Welcome {userData?.name}</h1>
      <h3 className="home-subheading">You are in {userData?.location}</h3>
      {updatingProfile ? (
        <form onSubmit={handleUpdateProfile}>
          <label>
            Name:
            <input type="text" placeholder={userData?.name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Location:
            <input type="text" placeholder={userData?.location} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <br />
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setUpdatingProfile(false)}>Cancel</button>
        </form>
      ) : (
        <>
        </>
      )}
      <FileUpload user={user} />
    </div>
    </>
  );
};

export default Home;
