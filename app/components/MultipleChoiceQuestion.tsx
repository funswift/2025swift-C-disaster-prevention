"use client"
import { useEffect, useState } from "react";

export default function MultipleChoiceQuestion({text, options}: {text: string, options: string[]}){


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
            onClick={()=> setChoices(choices.includes(index) ? choices.filter(i => i !== index) : [...choices, index]) }
            >
                {option}
            </button>
        )
        )}
    </>
    )
}