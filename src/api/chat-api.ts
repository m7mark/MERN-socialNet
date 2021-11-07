import axios from "axios"

type MessagesRecievedSubscriberType = (messages: ChatMessageApiType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

type EventsNamesType = 'messages-recieved' | 'status-changed'

export type StatusType = 'pending' | 'ready' | 'error'

let subscribers = {
  'messages-recieved': [] as MessagesRecievedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null
const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(s => s(status))
}
const closeHandler = () => {
  console.log('Close ws')
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 9000)
}
const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['messages-recieved'].forEach(s => s(newMessages))
}
const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
  notifySubscribersAboutStatus('error')
}
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const BASE_URL = 'https://social-network.samuraijs.com/api/1.0/auth/login'
const opt = {
  withCredentials: true,
  headers: {
    'API-KEY': 'f1044d61-6ff5-426d-9719-a80a9bdbb47b'
  }
}
async function login() {
  try {
    await axios.post(BASE_URL, {
      email: 'm7mark@yandex.ru',
      password: 'poilka'
    }, opt)
  } catch (e) {
    console.log(e);
  }
}
export async function logoutChat() {
  try {
    await axios.delete(BASE_URL, opt)
  } catch (e) {
    console.log(e);
  }
}


function createChannel() {
  login()
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatApi = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['messages-recieved'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: EventsNamesType, callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    }
  },
  unsubscribe(eventName: EventsNamesType, callback: MessagesRecievedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)

  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}

export type ChatMessageApiType = {
  message: string
  photo: string
  userId: number,
  userName: string
}
