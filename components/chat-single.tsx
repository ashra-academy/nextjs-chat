'use client'
import React from 'react'
import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useContext, useEffect, useState } from 'react'
import { LogedInUserContext } from '@/components/contextapis/auth-context'

const ChatSingle = ({ id }: any) => {
  const [auth, setAuth] = useState(null)
  const [chat, setChat] = useState<any>(null)
  const { logedInUser, setLogInUser } = useContext<any>(LogedInUserContext)

  useEffect(() => {
    let userauthinfo = localStorage.getItem('botsession')
    async function fetchChats() {
        let loginuserid: any
        if (userauthinfo && userauthinfo !== 'undefined') {
         loginuserid = JSON.parse(userauthinfo)
         setLogInUser(JSON.parse(userauthinfo))
      }
      const response: any = await fetch(`/api/chats?userid=${loginuserid?._id}&&chatid=${id}`, {
        method: 'GET'
      })
      const data = await response.json()
      // console.log('chat response data: ', data.chats)
      setChat(data.chats)
    }
    fetchChats()
  }, [auth])

  return (
    <>{
        chat?
        <Chat
          id={`${id}`}
          initialMessages={[
            ...chat?.messages
          ]}
        />:''
    }</>
  )
}

export default ChatSingle
