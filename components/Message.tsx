'use client'
import React, { useEffect, useState } from "react";
import { Messages } from "./ChatContainer";
import Image from "next/image";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

const Message = ({ message }: { message: Messages }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

   const isUserOwnerOfMessage =user?.email === message.userEmail;

  return (
<div
  className={`flex items-end gap-2 ${
    isUserOwnerOfMessage ? "flex-row-reverse" : "flex-row"
  }`}
>
  {/* Profile Picture */}
  <Image
    src={message.userPicture}
    width={40}
    height={40}
    alt={message.userName}
    className="rounded-full border border-indigo-200 shadow-sm"
  />

  {/* Message Bubble */}
  <div
    className={`flex flex-col max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
      isUserOwnerOfMessage
        ? "bg-indigo-600 text-white rounded-br-none"
        : "bg-gray-100 text-gray-800 rounded-bl-none"
    }`}
  >
    <span className="break-words leading-snug">{message.message}</span>
    <span
      className={`text-xs mt-1 ${
        isUserOwnerOfMessage ? "text-indigo-200" : "text-gray-500"
      }`}
    >
      {message?.date?.toDate().toLocaleString()}
    </span>
  </div>
</div>

  );
};

export default Message;
