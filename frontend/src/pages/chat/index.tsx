import React, { useEffect, useRef, useState } from 'react';
import ArrowIcon from "../../icons/arrowicon";

interface ChatMessage {
    sender: "user" | "ai";
    message: string;
}

/*---------------------Den här ska bort när riktiga meddelanden läggs till------------------------ */
function getLoremIpsum(min: number, max: number): string {
    const loremIpsumString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(count);
    const words = loremIpsumString.split(" ");
    const slicedWords = words.slice(0, count);
    const finalText = slicedWords.join(" ");
    return finalText;
};

/*------------------------------------------------------------------------------------------------ */

export default function Chat() {



    const [inputValue, setInputValue] = useState('');
    const [chat, updateChat] = useState<ChatMessage[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };

    const handleClick = () => {
        const newMessage: ChatMessage = {sender: "user", message: inputValue}
        const updatedChat = [...chat, newMessage];
        setInputValue("");

        /*--------------------Kalla api och byt ut mot riktigt svar från ai----------------*/
        const response: ChatMessage = {sender: "ai", message: getLoremIpsum(10,30)}
        updatedChat.push(response);
        /**------------------------------------------------------------------------------- */

        updateChat(updatedChat);

    };

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            // Using a timeout to ensure messages are fully rendered
            const timeoutId = setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 0); // Adjust delay if necessary

            return () => clearTimeout(timeoutId); // Cleanup on unmount
        }
    }, [chat]);

    return (
    <div>
        <div className='h-[77vh]'>
            <div className='h-full overflow-y-auto pb-[12vh]' ref={chatContainerRef}>
                {chat.map((message, index) => {
                    const sender = message.sender === 'user' ? 'items-end' : 'items-start';
                    return (
                        <div key={index} className={`w-full flex flex-col ${sender}`}>
                            <div className='bg-chatBgGray m-2 rounded-xl p-3 max-w-[65%] w-fit'>
                                {message.message}
                            </div>                    
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
                    placeholder='Placeholder...'
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