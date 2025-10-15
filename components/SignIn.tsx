"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../firebase'
const Sign = () => {
  
  const handleSignIn= async ()=>{
    try{
     const provider= new GoogleAuthProvider()
      await signInWithPopup(auth,provider)
    }catch(e){
      console.log(e)

    }
  }
  return (
    <div className="flex flex-col items-center">
      <button className="rounded-full border px-4 py-2 cursor-pointer" onClick={handleSignIn}>
        Sign With Google
      </button>
    </div>
  );
};

export default Sign;
