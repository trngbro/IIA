import React, { useCallback, useEffect, useState } from 'react'
import '../Styles/chat.stylesheets.css'
import '../Styles/chat.tailwind.css'
import axios from 'axios'
import ChatConversation from '../Components/ChatContent/ChatConversation.js'
import './scripts/chatPageScript.js'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from "../store/index.js";
import { bindActionCreators } from 'redux';
import { getOtherUser, isChatBot } from '../Logic/userLogics.js'

const ChatPage = () => {
    const history = useHistory()
    const toast = useToast();
    const [chats, setChats] = useState([])
    const [isChoose, setIsChoose] = useState(null)
    const [isSelectAvatar, setSelectAvatar] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [chatBotInfo, setChatBotInfo] = useState()

    const state = useSelector((state) => state.account)

    const dispatch = useDispatch()
    const { logoutSaved } = bindActionCreators(ActionCreators, dispatch)

    const fetchUserChatData = useCallback(async (searchValue) => {
        console.log(state.token);
        const res = await axios.get('/api/chat', {
            headers: {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res && res.data && res.data.success) {
            setChats(res.data.data);
            console.log(chats);
            return;
        } else {
            // Handle error cases
        }
    }, [state.token, chats]);

    useEffect(() => {
        if (!state.token) {
            history.push("/");
            return;
        } else {
            fetchUserChatData(searchValue);
            return;
        }
    }, [chatBotInfo]);

    const handleClickToSearchButton = () => {
        console.log("clicked");
        return
        fetchUserChatData(searchValue)
    }

    const handleClickToNav = async (chat) => {
        setIsChoose(chat)
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
                                    <img src={state.info._doc.picture} alt="" />
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
                                <input type="search" className="content-sidebar-input" placeholder="Search..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <button type="button" className="content-sidebar-submit"
                                    onClick={() => handleClickToSearchButton()}
                                ><i className="ri-search-line"></i></button>
                            </form>
                            <div className="content-messages">
                                <ul className="content-messages-list">
                                    <li className="content-message-title"><span>BOT</span></li>
                                    {
                                        chatBotInfo ? (
                                            <>
                                                <li
                                                    key={chatBotInfo._id}
                                                    onClick={() => handleClickToNav(chatBotInfo)}
                                                >
                                                    <div data-conversation={chatBotInfo._id}>
                                                        <img className="content-message-image" src={chatBotInfo.picture} alt="" />
                                                        <span className="content-message-info">
                                                            <span className="content-message-name">{chatBotInfo.name}</span>
                                                            <span className="content-message-text">{chatBotInfo.content}</span>
                                                        </span>
                                                        <span className="content-message-more">
                                                            {
                                                                !chatBotInfo.latestMessage ? (
                                                                    <span className="content-message-unread">new</span>
                                                                ) : (
                                                                    <span className="content-message-time">{chatBotInfo.latestMessage.createdAt}</span>
                                                                )
                                                            }

                                                        </span>
                                                    </div>
                                                </li>
                                            </>
                                        ) : (
                                            <li key={'emptybotchatexsiting'}>

                                            </li>
                                        )
                                    }

                                </ul>
                                <ul className="content-messages-list">
                                    <li className="content-message-title"><span>Recently</span></li>
                                    {
                                        chats && chats.length > 0 &&

                                        chats.map((chat, index) => {
                                            let user = getOtherUser(chat.users, state.info._doc)
                                            let content = "Saysomething"
                                            let time = "hh:mm"
                                            if (isChatBot(chat.users) && !chatBotInfo) {
                                                setChatBotInfo({
                                                    _id: chat._id,
                                                    name: user.name,
                                                    picture: user.picture,
                                                    content: chat.latestMessage ? chat.latestMessage.content : content,
                                                    latestMessage: {
                                                        createdAt: chat.latestMessage ? chat.latestMessage.createdAt : time
                                                    }
                                                });
                                            } else if (!isChatBot(chat.users)) {
                                                if (chat.latestMessage) {
                                                    time = new Date(chat.latestMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                                                    content = chat.latestMessage.content
                                                }
                                                return (
                                                    <>
                                                        <li
                                                            key={chat._id}
                                                            onClick={() => setIsChoose(chat)}
                                                        >
                                                            <div data-conversation={chat._id}>
                                                                <img className="content-message-image" src={user.picture} alt="" />
                                                                <span className="content-message-info">
                                                                    <span className="content-message-name">{user.name}</span>
                                                                    <span className="content-message-text">{content}</span>
                                                                </span>
                                                                <span className="content-message-more">
                                                                    {/* <span className="content-message-unread">new</span> */}
                                                                    <span className="content-message-time">{time}</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </>
                                                )
                                            }
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
                                    chatInfo={isChoose}
                                    token={state.token}
                                    userId={state.info._doc}
                                />
                        }
                    </div>
                </div>
            </section>

        </>
    )
}

export default ChatPage
