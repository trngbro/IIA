import { CreateContext } from 'react'

const ChatContext = CreateContext()

const ChatProvider = ({ children }) => {
    return <ChatContext>{children}</ChatContext>
}

export default ChatProvider