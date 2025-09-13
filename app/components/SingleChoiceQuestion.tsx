"use client"
import { useState } from "react";

interface SingleChoiceQuestionProps {
    text: string;
    options: { label: string; value: string }[];
    callback: (value: string) => void;
}

export default function SingleChoiceQuestion({text, options, callback}: SingleChoiceQuestionProps){

    const baseClasses = "px-4 py-2 rounded transition-colors duration-200";
    const selectedClasses = "bg-orange-500 text-white";
    const unselectedClasses = "bg-gray-200 text-black";

    const [choice, setChoice] = useState<number>(0);

    return(
   <div className="my-6 p-8 border rounded">
            <p className="fw-bold">{text}</p>
            <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`btn ${index === choice ? 'btn-warning text-white' : 'btn-outline-secondary'}`}
                        onClick={() => { setChoice(index); callback(option.value); }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}