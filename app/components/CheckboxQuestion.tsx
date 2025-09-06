"use client"
import React from "react";

// 選択肢の型定義
interface Option {
    label: string;
    value: string;
}

// このコンポーネントが受け取るPropsの型定義
interface CheckboxQuestionProps {
    question: string;
    options: Option[];
    selectedValues: string[]; // 複数選択なのでstringの配列
    onValueChange: (values: string[]) => void; // 親コンポーネントにstring型配列を渡す
    questionName: string;
}

const CheckboxQuestion = ({ question, options, selectedValues, onValueChange, questionName }: CheckboxQuestionProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        /* event.targetはクリックされた<input type="checkbox">要素そのもののこと 
           valueはJSONファイルで設定した選択肢のvalue（例:"food", "water"）
           checkedはチェックボックスがクリックされた後の状態を示す
           チェックされた→true, チェックが外れた→false
        */
        const { value, checked } = event.target;
        let newSelectedValues: string[];

        if (checked) {
            /* チェックされたら、現在の選択リストに値を追加
               ...selectedValues（スプレッド構文）は、そのリストの全項目をコピーしている
            */
            newSelectedValues = [...selectedValues, value];
        } else {
            /* チェックが外されたら、現在の選択リストから値を削除 */
            newSelectedValues = selectedValues.filter(v => v !== value);
        }
        onValueChange(newSelectedValues);
    };

    /* classNameでデザインを変更可能（Bootstrapというものに定義されているCSS）*/
    return (
        <div className="my-6 p-8 border rounded">
            <p className="fw-bold">{question}</p>
            {options.map(option => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name={questionName}
                        value={option.value}
                        checked={selectedValues.includes(option.value)}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxQuestion;