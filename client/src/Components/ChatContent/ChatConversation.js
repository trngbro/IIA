import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { isUserSign } from '../../Logic/userLogics'
import { Progress } from '@chakra-ui/react'

const ChatConversation = (props) => {
    const [chats, setChats] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false)
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
        setIsIndeterminate(true)
        let res = await axios.get(`/api/message/${chatInfo._id}/${chats.length}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(res.data);

        if (res.data.success) {
            setChats(res.data.data.reverse())
        } else {

        }

        setIsIndeterminate(false)
        return
    }

    useEffect(() => {
        const fetchChats = async () => {
            setIsIndeterminate(true)
            const res = await axios.get(`/api/message/${chatInfo._id}/${chats.length || 0}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setChats(res.data.data.reverse())
            setIsIndeterminate(false)
            return
        }



        fetchChats()

        const conversationMain = document.querySelector('.conversation-main');

        const handleScroll = async () => {
            const scrolledValue = conversationMain.scrollTop;
            if (scrolledValue === 0 && !isFetching) {
                console.log("spam");
                conversationMain.removeEventListener('scroll', handleScroll);
                setIsFetching(true);
                await nextFetchChats().then(() => {
                    setIsFetching(false);
                });
            }
        };
        conversationMain.addEventListener('scroll', handleScroll);

    }, [isFetching])

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
                <Progress size='xs' isIndeterminate={isIndeterminate} />

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
