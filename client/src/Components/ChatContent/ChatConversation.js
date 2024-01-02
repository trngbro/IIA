import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const ChatConversation = (props) => {
    const [chats, setChats] = useState([])
    const history = useHistory()

    const { chatInfo, token } = props;

    console.log(">>>Chat data:", chatInfo)

    useEffect(() => {
        const fetchChats = async () => {
            const res = await axios.get(`/api/message/${chatInfo._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data)

            setChats(res.data.data)
        }

        fetchChats()

    }, [])

    return (
        <div className="conversation active" id="a">
            <div className="conversation-top">
                <button type="button" className="conversation-back"><i className="ri-arrow-left-line"></i></button>
                <div className="conversation-user">
                    <img className="conversation-user-image" src="https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png" alt="" />
                    <div>
                        <div className="conversation-user-name">{chatInfo.name}</div>
                        <div className="conversation-user-status online">online</div>
                    </div>
                </div>
                <div className="conversation-buttons">
                    <button type="button"><i className="ri-phone-fill"></i></button>
                    <button type="button"><i className="ri-vidicon-line"></i></button>
                    <button type="button"><i className="ri-information-line"></i></button>
                </div>
            </div>
            <div className="conversation-main">
                <ul className="conversation-wrapper">
                    {
                        chats && chats.length > 0 &&
                        chats.map((chat, index) => {
                            return (
                                <li key={index} className={chat.sender ? "conversation-item me" : "conversation-item"}>
                                    <div className="conversation-item-side">
                                        <img className="conversation-item-image" src="https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png" alt="" />
                                    </div>
                                    <div className="conversation-item-content">
                                        <div className="conversation-item-wrapper">
                                            <div className="conversation-item-box">
                                                <div className="conversation-item-text">
                                                    <p>{chat.content ? chat.content : ""}</p>
                                                    <div className="conversation-item-time">{chat.createdAt}</div>
                                                </div>
                                                <div className="conversation-item-dropdown">
                                                    <button type="button" className="conversation-item-dropdown-toggle"><i className="ri-more-2-line"></i></button>
                                                    <ul className="conversation-item-dropdown-list">
                                                        <li><a href="./chats"><i className="ri-share-forward-line"></i> Forward</a></li>
                                                        <li><a href="./chats"><i className="ri-delete-bin-line"></i> Delete</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
            <div className="conversation-form">
                <button type="button" className="conversation-form-button"><i className="ri-emotion-line"></i></button>
                <div className="conversation-form-group">
                    <textarea className="conversation-form-input" rows="1" placeholder="Type here..."></textarea>
                    <button type="button" className="conversation-form-record"><i className="ri-mic-line"></i></button>
                </div>
                <button type="button" className="conversation-form-button conversation-form-submit"><i className="ri-send-plane-2-line"></i></button>
            </div>
        </div>
    )
}

export default ChatConversation
