'use client'
import { shareChat } from '@/app/actions'
import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'
import { useEffect, useState } from 'react'

export interface SidebarListProps {
  userId?: string
}

export async function SidebarList({ userId }: SidebarListProps) {
  const [chats, setChats] = useState([])
  const [changeChatRemoved, setChangeChatRemoved] = useState([])
  async function fetchChats() {
    setChats(chats)
    const response: any = await fetch(`/api/chats?userid=${userId}`, {
      method: 'GET'
    })
    const data = await response.json()
    // console.log('chat response data: ', data.chats)
    setChats(data.chats)
  }
  useEffect(() => {
    
    fetchChats()
  }, [])
  // const chats:any = []
  // console.log('userid: ', userId)

  return (
    <div className="flex-1 overflow-auto">
      {chats?.length ? (
        <div className="space-y-2 px-2">
          {chats.map(
            (chat,index) =>
              chat && (
                <SidebarItem key={index} chat={chat}>
                  <SidebarActions
                    chat={chat}
                    fetchChats={fetchChats}
                    shareChat={shareChat}
                  />
                </SidebarItem>
              )
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No chat history
          </p>
        </div>
      )}
    </div>
  )
}
