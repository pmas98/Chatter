import React, { useContext, useState } from 'react'
import {collection, doc, getDocs, getFirestore, query, setDoc, where, updateDoc, serverTimestamp, getDoc} from "firebase/firestore"
import {getStorage, ref} from "firebase/storage" 
import { AuthContext } from './context/AuthContext'

export const Search = () => {
  const [username,setUsername] = useState("")
  const [user,setUser] = useState(null)
  const [err,setErr] = useState(null)
  const {currentUser} = useContext(AuthContext)
  const db = getFirestore()  
  
  const handleSearch = async () => {
    const q = query(collection(db,"users"), 
    where("displayName","==",username));

    try{
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    })
  }
    catch(err){
      setErr(true)
      console.log(err)
    }
  };

  const handleKey = e=> {
    e.code ==="Enter" && handleSearch();
  };

  const handleSelect = async () =>{
    //check whether chat exists
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid 
                                                  : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db,"chats", combinedId));

      if(!res.exists()){
        //creating chat
        await setDoc(doc(db,"chats", combinedId),{messages:[]})
      
        //create user chat
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });
        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        })
      }
    }

    catch(err){
      console.log(err)
    }
    setUser(null)
    setUsername("")
  };

  return (
    <div className='Search'>
        <div className="searchForm">
            <input type="text" placeholder='find a friend' 
            onKeyDown = {handleKey} 
            onChange={e=>setUsername(e.target.value)}
            value={username}
            />

        </div>
        {err && <span>User not found</span>}
        {user && <div className="userChat big" onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}
