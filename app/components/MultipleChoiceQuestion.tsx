"use client"
import { useState } from "react";

interface MultipleChoiceQuestionProps {
    text: string;
    options: { label: string; value: string }[];
    callback: (value: string[]) => void;
}

export default function MultipleChoiceQuestion({text, options, callback}: MultipleChoiceQuestionProps){

    //const baseClasses ="px-4 py-2 rounded transition-colors duration-200";
    //const selectedClasses = "bg-blue-500 text-white";
    //const unselectedClasses = "bg-gray-200 text-black";

    const [choices, setChoices] = useState<number[]>([]);

    return(
    <div className="my-6 p-8 border rounded">
            <p className="fw-bold">{text}</p>
            <div className="d-grid gap-2"> {/* Bootstrapのグリッドレイアウトで縦並びに */}
                {options.map((option, index) => (
                    <button
                        key={index}
                        // ここでBootstrapのクラスを使用
                        className={`btn ${
                            choices.includes(index)
                                ? 'btn-warning text-white' // 選択時はオレンジ（warning）
                                : 'btn-outline-secondary'  // 未選択時はアウトラインのグレー
                        }`}
                        onClick={() => {
                            const tmp = choices.includes(index)
                                ? choices.filter(i => i !== index)
                                : [...choices, index];
                            setChoices(tmp);
                            callback(tmp.map(i => options[i].value));
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}