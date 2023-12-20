import React, { useEffect, useState } from 'react'
import '../Styles/chat.stylesheets.css'
import '../Styles/chat.tailwind.css'
import axios from 'axios'
import ChatConversation from '../Components/ChatContent/ChatConversation.js'
import './chatPageScripts.js'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from "../store/index.js"
import { bindActionCreators } from 'redux';

const ChatPage = () => {
    const history = useHistory()
    const toast = useToast();
    const [chats, setChats] = useState([])
    const [isChoose, setIsChoose] = useState(null)
    const [isSelectAvatar, setSelectAvatar] = useState(false)

    const state = useSelector((state) => state.account)
    const dispatch = useDispatch()
    const { loginSaved, logoutSaved } = bindActionCreators(ActionCreators, dispatch)

    useEffect(() => {
        if (Object.keys(state).length === 0) {
            history.push("/");
            return
        }
    })

    const handleClickToNav = async (chat) => {
        setIsChoose(chat.userId)
    }

    const handleClickToLogout = () => {
        logoutSaved()
        toast({
            title: "Logout yet",
            description: "Sign in again",
            status: 'error',
            duration: 3000,
            isClosable: true,
        })

        history.push("/");

        return;
    }

    return (
        <>
            <section className="chat-section">
                <div className="chat-container">
                    <aside className="chat-sidebar">
                        <a href className="chat-sidebar-logo">
                            <i className="ri-chat-1-fill"></i>
                        </a>
                        <ul className="chat-sidebar-menu">
                            <li className="active"><a href data-title="Chats"><i className="ri-chat-3-line"></i></a></li>
                            <li><a href data-title="Contacts"><i className="ri-contacts-line"></i></a></li>
                            <li><a href data-title="Documents"><i className="ri-folder-line"></i></a></li>
                            <li><a href data-title="Settings"><i className="ri-settings-line"></i></a></li>
                            <li
                                className={isSelectAvatar ? "chat-sidebar-profile active" : "chat-sidebar-profile"}
                                onMouseLeave={() => setSelectAvatar(false)}
                            >
                                <button
                                    type="button"
                                    className="chat-sidebar-profile-toggle"
                                    onClick={() => setSelectAvatar(true)}
                                >
                                    <img src="https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png" alt="" />
                                </button>
                                <ul
                                    className="chat-sidebar-profile-dropdown"

                                >
                                    <li><a href><i className="ri-user-line"></i> Profile</a></li>
                                    <li
                                        onClick={() => handleClickToLogout()}
                                    ><a href ><i className="ri-logout-box-line"></i> Logout</a></li>
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