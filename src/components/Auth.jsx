import React from "react";
import ReactDOM from 'react-dom'
import { useState } from "react";
import {auth} from '../config/firebase.js'
import {createUserWithEmailAndPassword} from'firebase/auth'

export default function Auth (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    }
    return (
        <div className='h-max flex flex-col'>
            <input className="my-3 outline" type='email' placeholder='Email...' onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input className="my-3 outline" type='password' placeholder='Password...' onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button className="my-3 bg-slate-400 h-full" onClick={signIn}>Sign In</button>
        </div>
    );
}