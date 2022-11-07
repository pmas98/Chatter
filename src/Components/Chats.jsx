import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext'

export const Chats = () => {

  const [chats,setChats] = useState([]);
  const db = getFirestore();
  const {currentUser} = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
    const unsub = onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
      setChats(doc.data());
    });

    return() => {
      unsub();
    };
  };
    currentUser.uid && getChats();
  },[currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    console.log(Object.entries(chats));
  }

  return (
    <div className='Chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(chat=> (

        <div className="userChat" 
             key={chat[0]} 
             onClick={ () => handleSelect(chat[1].userInfo)}
        >
        <img src={chat[1].userInfo.photoURL} 
             alt="" 
        />
        <div className="userChatInfo">
            <span  className="big">{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
            
        </div>
    </div>

      ))}
    </div>
  )
}
