"use client"
import { useEffect, useState } from "react";

export default function SingleChoiceQuestion({text, options, }: {text: string, options: string[]}){


    const baseClasses =
        "px-4 py-2 rounded transition-colors duration-200";
    const selectedClasses = "bg-blue-500 text-white";
    const unselectedClasses = "bg-gray-200 text-black";

    const [choice, setChoice] = useState<number>(0);

    return(
    <>
        <p>{text}</p>
        {options.map( (option, index) => (
            index += 1,

            <button
            key={index}
            className={`${baseClasses} ${
            index == choice ? selectedClasses : unselectedClasses
            }`}  
            onClick={()=> {setChoice(index);} }
            >
                {option}
            </button>
        )
        )}
    </>
    )
}