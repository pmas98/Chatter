import React, { useContext } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { AuthContext } from './context/AuthContext'

export const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const auth = getAuth()
  return (
    <div className='Navbar'>
        <span className="logo">Chatter</span>
        <div className="user" style={{color:'white'}}>
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName} </span>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}
