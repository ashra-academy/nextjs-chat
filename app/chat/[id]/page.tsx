import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { nanoid } from 'nanoid'
import { useContext, useEffect, useState } from 'react'
import { LogedInUserContext } from '@/components/contextapis/auth-context'
import ChatSingle from '@/components/chat-single'

// export const runtime = 'edge'
// export const preferredRegion = 'home'

// export interface ChatPageProps {
//   params: {
//     id: string
//   }
// }

// export async function generateMetadata({
//   params
// }: ChatPageProps): Promise<Metadata> {
//   const chat = { title: 'await getChat(params.id, session.user.id)' }
//   return {
//     title: chat?.title.toString().slice(0, 50) ?? 'Chat'
//   }
// }

export default async function ChatPage({params}: { params: { id: string } }) {
  return (
    <ChatSingle id={params.id}/>
  )
}
