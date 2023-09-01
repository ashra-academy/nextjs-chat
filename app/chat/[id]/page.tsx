import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

export const runtime = 'edge'
export const preferredRegion = 'home'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {


  const chat = {title:"await getChat(params.id, session.user.id)"}
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  // const session = await auth()
  // const [authUser,setAuthUser] = useLocalStorage<string | null>('authuser',null)

  // if (!session?.user) {
  //   redirect(`/sign-in?next=/chat/${params.id}`)
  // }

  // const chat = await getChat(params.id, session.user.id)

  // if (!chat) {
  //   notFound()
  // }

  // if (chat?.userId !== session?.user?.id) {
  //   notFound()
  // }

  return <Chat id={"123"} initialMessages={[{
    id: "123",
    createdAt: new Date(),
    content: "string",
    role: 'system',
}]} />
}
