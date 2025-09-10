"use client"
import React from "react";

// 選択肢の型定義
interface Option {
    label: string;
    value: string;
}

// このコンポーネントが受け取るPropsの型定義
interface RadioProps {
    question: string;
    options: Option[];
    selectedValue: string;
    onValueChange: (value: string) => void; // 親コンポーネントにstring型の値を渡す
    questionName: string;
}

const RadioQuestion = ({ question, options, selectedValue, onValueChange, questionName }: RadioProps) => {

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(event.target.value);
    };

    /* classNameでデザインを変更可能（Bootstrapというものに定義されているCSS）*/
    return (
        <div className="my-6 p-8 border rounded">
            <p className="fw-bold">{question}</p>
            {options.map(option => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name={questionName}
                        //id={`${questionName}-${option.value}`}
                        value={option.value}
                        checked={option.value === selectedValue}
                        onChange={changeValue}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default RadioQuestion;