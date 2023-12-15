import React, { useEffect, useState } from 'react'
import '../Styles/chat.stylesheets.css'
import '../Styles/chat.tailwind.css'
import axios from 'axios'
import ChatConversation from '../Components/ChatContent/ChatConversation.js'
import './scripts.js'

const ChatPage = () => {
    const [chats, setChats] = useState([])
    const [isChoose, setIsChoose] = useState(null)

    const fetchChats = async () => {
        const user = JSON.parse(localStorage.getItem("userInfoDataSaved"));
        await axios.get(`/test/chatsData`, {
            headers: {
                'Authorization': `Basic ${user.token}`
            },
        }).then(res => {
            setChats(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleClickToNav = async (chat) => {
        setIsChoose(chat.userId)
        console.log(chat)
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <>
            <section className="chat-section">
                <div className="chat-container">
                    <aside className="chat-sidebar">
                        <a href="./otherpage" className="chat-sidebar-logo">
                            <i className="ri-chat-1-fill"></i>
                        </a>
                        <ul className="chat-sidebar-menu">
                            <li className="active"><a href="./otherpage" data-title="Chats"><i className="ri-chat-3-line"></i></a></li>
                            <li><a href="./otherpage" data-title="Contacts"><i className="ri-contacts-line"></i></a></li>
                            <li><a href="./otherpage" data-title="Documents"><i className="ri-folder-line"></i></a></li>
                            <li><a href="./otherpage" data-title="Settings"><i className="ri-settings-line"></i></a></li>
                            <li className="chat-sidebar-profile">
                                <button type="button" className="chat-sidebar-profile-toggle">
                                    <img src="https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png" alt="" />
                                </button>
                                <ul className="chat-sidebar-profile-dropdown">
                                    <li><a href="./otherpage"><i className="ri-user-line"></i> Profile</a></li>
                                    <li><a href="./otherpage"><i className="ri-logout-box-line"></i> Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </aside>
                    <div className="chat-content">
                        <div className="content-sidebar">
                            <div className="content-sidebar-title">Chats</div>
                            <form action="" className="content-sidebar-form">
                                <input type="search" className="content-sidebar-input" placeholder="Search..." />
                                <button type="submit" className="content-sidebar-submit"><i className="ri-search-line"></i></button>
                            </form>
                            <div className="content-messages">
                                <ul className="content-messages-list">
                                    <li className="content-message-title"><span>BOT</span></li>
                                    <li>
                                        <div data-conversation="#conversation-1">
                                            <img className="content-message-image" src="https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png" alt="" />
                                            <span className="content-message-info">
                                                <span className="content-message-name">Meow</span>
                                                <span className="content-message-text">Lorem ipsum dolor sit amet consectetur.</span>
                                            </span>
                                            <span className="content-message-more">
                                                <span className="content-message-unread">5</span>
                                                <span className="content-message-time">12:30</span>
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="content-messages-list">
                                    <li className="content-message-title"><span>Recently</span></li>
                                    {
                                        chats && chats.length > 0 &&

                                        chats.map((chat, index) => {
                                            return (
                                                <li
                                                    key={chat.userId}
                                                    onClick={() => handleClickToNav(chat)}
                                                >
                                                    <div data-conversation={chat.userId}>
                                                        <img className="content-message-image" src="https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png" alt="" />
                                                        <span className="content-message-info">
                                                            <span className="content-message-name">{chat.name}</span>
                                                            <span className="content-message-text">{chat.faculty}</span>
                                                        </span>
                                                        <span className="content-message-more">
                                                            <span className="content-message-unread">5</span>
                                                            <span className="content-message-time">12:30</span>
                                                        </span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        {
                            !isChoose ?
                                <div className="conversation conversation-default active">
                                    <i className="ri-chat-3-line"></i>
                                    <p>Select chat and view conversation!</p>
                                </div>
                                :
                                <ChatConversation
                                    userId={isChoose}
                                />
                        }
                    </div>
                </div>
            </section>

        </>
    )
}

export default ChatPage
