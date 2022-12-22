import React, { createContext, useEffect, useState } from 'react'
import {auth} from '../firebase'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { props } from '../typings';
import Loading from '../components/elements/Loading';
const AuthContext=createContext({
    user:null,
    signUp: (email:string,password:string) => {  },
    login: (email:string,password:string) => {  },
    logout: () => {},
    cart:[],
    setCart:(char:any)=>{}
    });
export function AuthProvider({children}:props){
    const [user,setUser]=useState<any>("");
    const [authLoading,setAuthLoading]=useState(true);
    const [cart,setCart]=useState<any>([]);
    const signUp=(email:string,password:string)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const login=(email:string,password:string)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout=()=>{
        return signOut(auth);
    }
    useEffect(()=>{
        const unsub=auth.onAuthStateChanged((u)=>{
            setUser(u);
            setAuthLoading(false);
            setCart([]);
        })
        return ()=>{
            unsub();
        }
    },[])
    return(
        <AuthContext.Provider value={{user,signUp,login,logout,cart,setCart}}>
            {!authLoading && children}
            <Loading visible={authLoading}/>
        </AuthContext.Provider>
    )
}
export default AuthContext