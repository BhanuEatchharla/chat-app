'use client'
import React, { useEffect, useState } from 'react'
import  {onAuthStateChanged,User } from 'firebase/auth'
import {auth} from "../firebase";
import ChatApp from '@/components/ChatApp';
import SignIn from '@/components/SignIn';


const Page = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return <div>{user ? <ChatApp  user={user}/> : <SignIn />}</div>;
};

export default Page;
