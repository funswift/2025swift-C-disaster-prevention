"use client"
import { useState } from "react";

interface MultipleChoiceQuestionProps {
    text: string;
    options: { label: string; value: string }[];
    callback: (value: string[]) => void;
}

export default function MultipleChoiceQuestion({text, options, callback}: MultipleChoiceQuestionProps){

    const baseClasses =
        "px-4 py-2 rounded transition-colors duration-200";
    const selectedClasses = "bg-blue-500 text-white";
    const unselectedClasses = "bg-gray-200 text-black";

    const [choices, setChoices] = useState<number[]>([]);

    return(
    <>
        <p>{text}</p>
        {options.map( (option, index) => (
            index += 1,

            <button
            key={index}
            className={`${baseClasses} ${
            choices.includes(index) ? selectedClasses : unselectedClasses
            }`}  
            // setChoicesにindexが含まれていれば削除、含まれていなければ追加
            onClick={()=> {const tmp = choices.includes(index) ? choices.filter(i => i !== index) : [...choices, index]; setChoices(tmp); callback(tmp.map(i => options[i-1].value));} }
            >
                {option.label}
            </button>
        )
        )}
    </>
    )
}