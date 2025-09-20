"use client"
import { useState } from "react";


interface SingleChoiceQuestionProps {
    text: string;
    options: { label: string; value: string }[];
    callback: (value: string) => void;
}

export default function SingleChoiceQuestion({text, options, callback}: SingleChoiceQuestionProps){

    const baseClasses = "px-8 py-4 rounded transition-colors duration-200";
    const selectedClasses = "bg-[#FEAF71] border-3 border-[#CCBFA7]";
    const unselectedClasses = "bg-[#FFFFFF]  border-3 border-[#CCBFA7]";

    const [choice, setChoice] = useState<number>(0);

    return(
   <div className="my-6 p-4 rounded flex flex-col">
            <p className="text-3xl p-4">{text}</p>
            <div className="p-4 flex flex-col gap-2 items-center">
                {options.map((option, index) => (

                    index++,

                    <button
                        key={index}
                        className={`${baseClasses} ${index === choice ? selectedClasses : unselectedClasses} rounded-lg !text-2xl w-full items-center`}
                        onClick={() => { setChoice(index); callback(option.value); }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}