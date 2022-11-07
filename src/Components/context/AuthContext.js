import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {getAuth} from 'firebase/auth';

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const auth = getAuth()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            console.log(user)
        });
        return () => {
            unsub()
        }
    }, []);

    return(
    <AuthContext.Provider value={{currentUser}}>
        {children};
    </AuthContext.Provider>)
}