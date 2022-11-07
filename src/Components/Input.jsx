import {getFirestore, doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext'
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'

export const Input = () => {
  const db = getFirestore();
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)


  const handleSend = async () => {
    if(img){

      const storageRef = ref(storage,uuid())
      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on((error) => {
        console.log(error)
      },()=>{
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              //Update profile
              await updateDoc(doc(db,"chats",data.chatId),{
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img:downloadURL
                })
              })
              
    }
    catch (err) {
        console.log(err);
      }
    });
    }
    );  

    }

    else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    });

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })

    setText("")
    setImg(null)
  };
  return (
    <div className='Input'>
        <input  type="text" 
        placeholder='type something' 
        onChange={e=>setText(e.target.value)}
        value={text}
        />

        <div className='send'>
            <img src="img/attach.png" alt="" />
            <input type="file" style={{display:"none"}}  
            id="file" 
            onChange={e=>setImg(e.target.files[0])}
            />
            <label htmlFor="file">
                <img style={{paddingTop:'5px'}} src="img/img.png" alt="" />
            </label>
            <button className='round' onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}
