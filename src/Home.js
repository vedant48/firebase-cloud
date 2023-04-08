import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { db } from './App';
import FileUpload from './FileUpload';
import './Home.css';

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

  return (
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
          <button type="button" onClick={() => setUpdatingProfile(true)}>Update Profile</button>
          <button type="button" onClick={handleLogout}>Log Out</button>
        </>
      )}
      <FileUpload user={user} />
    </div>
  );
};

export default Home;
