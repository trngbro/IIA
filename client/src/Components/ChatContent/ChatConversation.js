import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { isUserSign } from '../../Logic/userLogics'

const ChatConversation = (props) => {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)
    const [sendingInput, setSendingInput] = useState("")
    const history = useHistory()

    const { chatInfo, token, userId } = props;

    const clickToSendMessage = async () => {
        const res = await axios.post('/api/message', {
            content: sendingInput,
            chatId: chatInfo._id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200 && res.data) {
            setSendingInput("")
            let updateData = [
                ...chats,
                res.data
            ]
            setChats(updateData)
        } else {

        }
    }

    const nextFetchChats = async () => {
        setLoading(true)
        let res = await axios.get(`/api/message/${chatInfo._id}/${chats.length}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (res.data.success && res.data.data && Array.isArray(res.data.data)) {
            res = res.data.data.reverse()
            setChats([
                ...res
            ])
            return
        } else {
            console.log(res);
        }

        console.log("in");
        setLoading(false)
        return

    }

    useEffect(() => {
        const fetchChats = async () => {
            const res = await axios.get(`/api/message/${chatInfo._id}/0`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setChats(res.data.data.reverse())
        }



        fetchChats()

        const conversationMain = document.querySelector('.conversation-main');

        const handleScroll = () => {
            const scrolledValue = conversationMain.scrollTop;
            if (scrolledValue === 0)
                nextFetchChats()
        };
        conversationMain.addEventListener('scroll', handleScroll);

    }, [loading])

    return (
        <div className="conversation active" id="a">
            <div className="conversation-top">
                <button type="button" className="conversation-back"><i className="ri-arrow-left-line"></i></button>
                <div className="conversation-user">
                    <img className="conversation-user-image" src={chatInfo.picture} alt="" />
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
                                <li key={index} className={!isUserSign(chat.sender._id, userId) ? "conversation-item me" : "conversation-item"}>
                                    <div className="conversation-item-side">
                                        <img className="conversation-item-image" src={chat.sender.picture} alt="" />
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
                    <textarea value={sendingInput} className="conversation-form-input" rows="1" placeholder="Type here..."
                        onChange={(e) => setSendingInput(e.target.value)}
                    ></textarea>
                </div>
                <button type="button" className="conversation-form-button conversation-form-submit"
                    onClick={() => clickToSendMessage()}
                ><i className="ri-send-plane-2-line"></i></button>
            </div>
        </div>
    )
}

export default ChatConversation
