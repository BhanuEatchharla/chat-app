import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
// import { Span } from 'next/dist/trace';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';

 export type Messages = {
  id:  string;
  message:string,
  userEmail :string,
  userPicture: string,
  userName: string,
  date:Timestamp
 
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<Messages[]>([]);

  const bottomDivRef =useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    const q = query(collection(db, 'message'), orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Messages[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  useEffect(()=>{
   if(bottomDivRef.current){
    bottomDivRef.current.scrollIntoView({behavior:"smooth"})
   }
  },[messages])

  return (
<div
  className="w-[600px] h-[400px] p-0 rounded-3xl flex flex-col overflow-hidden 
    bg-white shadow-2xl border border-indigo-200 backdrop-blur-sm"
>
  {/* Fixed Header */}
  <div className="sticky top-0 z-20 bg-white border-b border-indigo-200 py-2">
    <h2 className="text-indigo-700 font-semibold text-lg text-center">💬 Chat Room</h2>
  </div>

  {/* Scrollable Messages */}
  <div
    className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto scroll-smooth 
      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    {messages.map((message) => (
      <Message key={message.id} message={message} />
    ))}
    <div ref={bottomDivRef}></div>
  </div>
</div>
  );
};

export default ChatContainer;


