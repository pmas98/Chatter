import React from 'react'
import {useState} from 'react'
import {getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom';

export const Login = () => {

  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
      
      e.preventDefault()
      const email = e.target[0].value;
      const password = e.target[1].value;

      try{
        await signInWithEmailAndPassword(auth,email,password)
        navigate("/")
      }
      catch (err) {
          console.log(err)
          setErr(true);
        }
      }

  return (
    <div className='formContainer'>
        
    <div className='formWrapper'>
        <span className='logo'>Chatter</span>
        <span className='title'>Login</span>
        
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>

                <button>Sign In</button>
                {err && <span> Something went wrong</span>}
            </form>
            <p>You don't have an account? <Link to="/register"> Register</Link></p>
        </div>
    </div>
  )
}
