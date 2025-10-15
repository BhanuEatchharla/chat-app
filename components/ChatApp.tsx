'use client'
import { auth, db } from '../firebase'
import { signOut, User } from 'firebase/auth'
import React, { useState } from 'react'
import ChatContainer from './ChatContainer'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const ChatApp = ({ user }: { user: User }) => {
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false) 

  const handleSignOut = async () => {
    await signOut(auth)
  }

  const handleSendMessage = async () => {
    try {
      setLoading(true)

      await addDoc(collection(db, 'message'), {
        message: inputText,
        userEmail: user.email,
        userPicture: user.photoURL,
        userName: user.displayName,
        date: serverTimestamp(), 
      })

      setInputText('')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
<div className="flex flex-col gap-4 mx-auto max-w-7xl items-center bg-gradient-to-br from-indigo-50 to-white min-h-screen py-8">
  {/* Chat Container */}
  <ChatContainer />

  {/* Message Input Section */}
  <div className="w-[600px] flex items-center border border-indigo-200 rounded-full shadow-md overflow-hidden bg-white">
    <input
      type="text"
      placeholder="Type your message..."
      className="flex-1 px-4 py-3 text-sm focus:outline-none text-gray-700"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      disabled={loading}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSendMessage();
        }
      }}
    />
    <button
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-medium transition-all duration-200 disabled:opacity-50"
      onClick={handleSendMessage}
      disabled={loading}
    >
      {loading ? "Sending..." : "Send"}
    </button>
  </div>

  {/* Sign Out Button */}
  <button
    className="mt-3 px-5 py-2 border border-indigo-300 rounded-full text-indigo-700 font-medium hover:bg-indigo-50 transition-all"
    onClick={handleSignOut}
  >
    Sign Out
  </button>
</div>

  )
}

export default ChatApp

