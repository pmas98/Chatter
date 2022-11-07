import React from 'react'
import {useState} from 'react'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';


export const Register = () => {

    const [err,setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        if(!file){
          const fileURL = 'https://firebasestorage.googleapis.com/v0/b/chat-84289.appspot.com/o/default.png?alt=media&token=d35ecb95-505e-4a6f-910a-a3276bc33ce4'
          try{
            const auth = await getAuth();
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const db = getFirestore()
    
            const storage = getStorage();
            const storageRef = ref(storage, displayName);
            await updateProfile(res.user, {
              displayName,
              photoURL: fileURL,
            }).then(() => {
              // Profile updated!
              // ...
              console.log("it works")
            }).catch((error) => {
              // An error occurred
              // ...
              console.log(error)
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: fileURL,
            });

            await setDoc(doc(db,"userChats",res.user.uid),{
            }
            
            )
            navigate("/");
            }
            catch (err) {
                console.log(err)
                setErr(true);
              }
        }
            
        else{
        try{
        const auth = await getAuth();
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const db = getFirestore()

        const storage = getStorage();
        const storageRef = ref(storage, displayName);


        console.log(res.user.uid)
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        await uploadBytesResumable(storageRef, file).then(() => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //Update profile
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  }).then(() => {
                    // Profile updated!
                    // ...
                    console.log("it works")
                  }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error)
                  });
                  ;
                  //create user on firestore
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });

                  await setDoc(doc(db,"userChats",res.user.uid),{
                  }
                  
                  )
                  navigate("/");
        }
        catch (err) {
            console.log(err)
            setErr(true);
          }
    });
        }
        );  
    }
        catch(err){
            console.log(err)
            setErr(true)
        }}
    }

  return (
    <div className='formContainer'>
        
    <div className='formWrapper'>
        <span className='logo'>Chatter</span>
        <span className='title'>Register</span>
        
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input style={{display:"none"}} type="file" id="file" />
                <label htmlFor="file">
                    <img src='img/add.png' alt="" />
                    <span>Add an avatar</span>
                </label>
                
                <button>Sign Up</button>
                {err && <span> Something went wrong</span>}
            </form>
            <p>You do have an account? <Link to="/login"> Login</Link></p>
        </div>
    </div>
  )
}
