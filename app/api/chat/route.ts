import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { connectMongoDB } from '@/lib/configuration/mongoodb'
// import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import prompts from './prompts.json'
import { parse } from 'url'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  await connectMongoDB()
  const finerPrompts: Record<string, string> = prompts;
  const referrer = req.headers.get('Referer'); // Get the referrer URL

  let keyParams = ''; // Initialize referrerKey

  if (referrer) {
    const parsedReferrer = parse(referrer, true); // Parse the referrer URL
    const { key } = parsedReferrer.query; // Destructure the key from parsedReferrer.query
    if (typeof key === 'string') {
      keyParams = key; // Assign the single string value to referrerKey
    }
  }
  // console.log('keyparams',keyParams? finerPrompts[`${keyParams}`]: 'not passed')
  const json = await req.json()
  const { messages } = json
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: keyParams
          ? finerPrompts[`${keyParams}`]
          : "I want you to act as a mentor for graduate students and help improve their research questions. You will use the FINER framework to evaluate and guide their research question. You ask thought-provoking and engaging questions related to their research question to help them learn how to develop good research questions by themselves. You don't say more than 30 words at a time."
      },
      ...messages
    ],
    temperature: 0.7,
    stream: true,
  })
  // console.log('response ',res)

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId: '123',
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      // await kv.hmset(`chat:${id}`, payload)
      // await kv.zadd(`user:chat:${payload.userId}`, {
      //   score: createdAt,
      //   member: `chat:${id}`
      // })
    }
  })

  return new StreamingTextResponse(stream)
}
