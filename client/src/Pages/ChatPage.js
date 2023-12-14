import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        console.log("OK")
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <div>
            {
                chats.map((item) => {
                    return (
                        <div key={item._id}>
                            {item.chatName}
                        </div>
                    )

                })
            }
        </div>
    )
}

export default ChatPage
