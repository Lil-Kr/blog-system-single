import React, { createContext, useContext } from 'react'
import { message } from 'antd/lib'
import { MessageInstance } from 'antd/lib/message/interface'

const MessageContext = createContext<MessageInstance | null>(null)

let globalMessageApi: MessageInstance | null = null

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage()
  globalMessageApi = messageApi
  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder} {/* 这里渲染 message 组件 */}
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

export const getGlobalMessage = () => globalMessageApi
