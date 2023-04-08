import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './Signin.css';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='container'>
            <h1>Sign In</h1>
            <form onSubmit={handleSignin}>
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
                <button type="submit">Sign In</button>
                <p>or</p>
                <div>
                    Already have an account? <Link to="/signup">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Signin;