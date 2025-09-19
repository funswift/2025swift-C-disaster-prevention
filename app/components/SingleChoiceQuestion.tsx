"use client"
import { useState } from "react";

interface SingleChoiceQuestionProps {
    id: string;
    text: string;
    options: { label: string; value: string }[];
    callback: (value: string) => void;
}

export default function SingleChoiceQuestion({id, text, options, callback}: SingleChoiceQuestionProps){

    const baseClasses = "px-8 py-4 rounded transition-colors duration-200";
    const selectedClasses = "bg-orange-300 text-white border-5 border-orange-500";
    const unselectedClasses = "bg-gray-200 text-black border-5 border-gray-400";

    const [choice, setChoice] = useState<number>(0);

    return(
   <div className="my-6 p-8 rounded">
    <span className="flex justify-center items-center w-12 h-12 mx-auto bg-gray-200 rounded-full font-bold text-2xl">
        {id}
        </span>
            <p className="font-bold text-2xl rounded p-4 bg-white">{text}</p>
            <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                    index++,
                    <button
                        key={index}
                        className={`${baseClasses} ${index === choice ? selectedClasses : unselectedClasses} font-bold !text-2xl`}
                        onClick={() => { setChoice(index); callback(option.value); }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}