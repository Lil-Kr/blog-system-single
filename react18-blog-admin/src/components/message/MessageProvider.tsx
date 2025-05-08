import React, { createContext, useContext } from 'react'
import { message } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'

const MessageContext = createContext<MessageInstance | null>(null)

let _messageApi: MessageInstance | null = null
export const getGlobalMessage = () => {
  if (!_messageApi) {
    throw new Error('Message API not initialized. Make sure MessageProvider is rendered.')
  }
  return _messageApi
}

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage()
  _messageApi = messageApi

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  )
}

export const useMessage = () => {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return context
}

export default MessageProvider
