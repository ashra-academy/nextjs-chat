import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Chats from '@/lib/models/chatModel'
import { ChatList } from '@/components/chat-list'
import { type Chat } from '@/lib/types'
import { connectMongoDB } from '@/lib/configuration/mongoodb'

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }
  // console.log('get chat userid ', userId)
  // await connectMongoDB()
  try {
    // const results = await Chats.find({userId: userId})
    // return results as Chat[]
    // return results
  } catch (error) {
    return []
  }
  return []
}

export async function getChat(id: string, userId: string) {
  // const chat = await kv.hgetall<Chat>(`chat:${id}`)
  // if (!chat || (userId && chat.userId !== userId)) {
  //   return null
  // }
  // return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  // const session = await auth()

  // if (!session) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }

  // const uid = await kv.hget<string>(`chat:${id}`, 'userId')

  // if (uid !== session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }

  // await kv.del(`chat:${id}`)
  // await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  // revalidatePath('/')
  // return revalidatePath(path)
  return revalidatePath('/')
}

export async function clearChats() {
  // const session = await auth()
  // if (!session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }
  // const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)
  // if (!chats.length) {
  // return redirect('/')
  // }
  // const pipeline = kv.pipeline()
  // for (const chat of chats) {
  //   pipeline.del(chat)
  //   pipeline.zrem(`user:chat:${session.user.id}`, chat)
  // }
  // await pipeline.exec()
  // revalidatePath('/')
  // return redirect('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  // const response: any = await fetch(`/api/chats?sharepath=${id}`, {
  //   method: 'GET'
  // })
  // const data = await response.json()
  // const chat = data.chat
  // if (!chat || !chat.sharePath) {
  //   return null
  // }

  return null
  //  {
  //   ...chat
  // }
}

export async function shareChat(chat: Chat) {
  // const session = await auth()
  // if (!session?.user?.id || session.user.id !== chat.userId) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }
  // await connectMongoDB()
  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }
  // await Chats.create({...payload})
  return payload
}
