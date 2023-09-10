
import { connectMongoDB } from '@/lib/configuration/mongoodb'
import { parse } from 'url'
import Chats from '@/lib/models/chatModel'
import UserChat from '@/lib/models/userChatModel'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {

  // Get the URL from the request
  const { url } = req

  // Use the 'url' module to parse the URL and extract query parameters
  const { query } = parse(url, true)

  // Extract the 'userId' query parameter
  let userId = ''
  let chatId = ''
  let sharePath = ''
  
  userId = String(query.userid)
  chatId = String(query.chatid)
  sharePath = String(query.sharepath)



  await connectMongoDB()

  if(sharePath !== 'undefined'){
    // console.log('Share path: ', sharePath)
    const userchatExist = await Chats.findOne({ id: sharePath })
  
    return NextResponse.json({ chat: userchatExist || {} }, { status: 200 })

  }

  if(chatId == 'undefined' || chatId == 'null'){
    
    const userchatExist = await Chats.find({ userId: userId }).sort({ updatedAt: -1})
  
    return NextResponse.json({ chats: userchatExist || [] }, { status: 200 })
  
  }else{

    const userchatExist = await Chats.findOne({ userId: userId, id: chatId })
  
    return NextResponse.json({ chats: userchatExist || [] }, { status: 200 })

  }
}
export async function DELETE(req: Request) {

  // Get the URL from the request
  const { url } = req

  // Use the 'url' module to parse the URL and extract query parameters
  const { query } = parse(url, true)

  // Extract the 'userId' query parameter
  let userId = ''
  let chatId = ''
  
  userId = String(query.userid)
  chatId = String(query.chatid)

  await connectMongoDB()
  if (userId == 'undefined' || chatId == 'undefined') {

    return NextResponse.json({ msg: 'user id and chat id required' }, { status: 400 })

  }
  else{

    const userchatExist = await Chats.deleteOne({ userId: userId, id: chatId })
  
    return NextResponse.json({ 'message': 'chat deleted successfully' }, { status: 200 })

  }
}
