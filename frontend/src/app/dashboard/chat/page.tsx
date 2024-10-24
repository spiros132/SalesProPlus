'use client';

import React, { useEffect, useRef, useState } from 'react';
import ArrowIcon from "@/src/icons/arrowicon";
import { ChatAI } from '@/src/lib/BackendConnection';
import '@/styles/chat.css';

interface ChatMessage {
    sender: "user" | "ai";
    message: string;
}

export default function Chat() {
    const [inputValue, setInputValue] = useState('');
    const [chat, updateChat] = useState<ChatMessage[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };

    const handleClick = () => {
        setInputValue("");
        const newMessage: ChatMessage = {sender: "user", message: inputValue}
        let updatedChat = [...chat, newMessage];
        updateChat(updatedChat);

        ChatAI({question: inputValue})
        .then((response) => {
            updatedChat = [...chat, newMessage];
            
            if(response) {
                let message: ChatMessage;
                if(response.error)
                    message = {sender: "ai", message: response.error};
                else 
                    message = {sender: "ai", message: response.answer};

                updatedChat.push(message);
            }
            else {
                const message: ChatMessage = {sender: "ai", message: "Something wrong happened, please try again later!"}
                updatedChat.push(message);
            }

            updateChat(updatedChat);
        });
    };

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            const timeoutId = setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 0);

            return () => clearTimeout(timeoutId);
        }
    }, [chat]);

    return (
    <div>
        <div className='h-[77vh] text-chatFontGray chat'>
            <div className='h-full overflow-y-auto pb-[12vh]' ref={chatContainerRef}>
                {chat.map((message, index) => {
                    const sender = message.sender === 'user' ? 'items-end' : 'items-start';
                    return (
                        <div key={index} className={`w-full flex flex-col ${sender}`}>
                            <div className='bg-chatBgGray m-2 rounded-xl p-3 max-w-[65%] w-fit' dangerouslySetInnerHTML={{ __html: message.message }} />
                        </div>
                    )

                    })}
            </div>            
        </div>

        <div className="fixed flex bottom-[12vh] w-full h-[10vh] -mx-4 items-center justify-center">
            <div className='flex items-center justify-center'>
                <input
                    className=' w-[70vw] h-[5vh] m-2 bg-chatBgGray rounded-xl p-4'
                    type="text" 
                    value={inputValue}
                    onChange={handleChange}
                    placeholder='Ask...'
                />
                <button 
                    className='w-[5vh] h-[5vh] p-[0.8rem] bg-chatBgGray rounded-full m-2'
                    onClick={handleClick}>
                    <ArrowIcon></ArrowIcon>
                </button>            
            </div>

        </div>        
    </div>

    );
}