import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/compat/firestore';
import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD9NzNMwbfkmTcD9hcZDrC--DnQjpWQGko",
  authDomain: "my-name-a2315.firebaseapp.com",
  databaseURL: "https://my-name-a2315.firebaseio.com",
  projectId: "my-name-a2315",
  storageBucket: "my-name-a2315.appspot.com",
  messagingSenderId: "524678210454",
  appId: "1:524678210454:web:88625e4869bef5bcbbf3b7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = getStorage(firebaseApp)



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
