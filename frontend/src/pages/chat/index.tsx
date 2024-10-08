import React, { useState } from 'react';
import ArrowIcon from "../../icons/arrowicon";

export default function Chat() {

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };

    const handleClick = () => {
        alert('Input Value: ' + inputValue);
    };

    return (

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
    );
}