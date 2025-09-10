"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // ページ遷移のためにインポート

/* データと子コンポーネントをインポート */
import questionsData from "data/questions.json";
import RadioQuestion from "@/components/RadioQuestion";
import CheckboxQuestion from "@/components/CheckboxQuestion";
import { calculatePreparedness } from "../../../data/calculate";

/* コンポーネント名を Question から QuestionsPage に変更 */
export default function QuestionsPage() {
    /* routerオブジェクトを取得 */
    const router = useRouter(); 
    
    /* 全ての回答を一つのオブジェクトで管理 */
    const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});

    /* 回答が更新されたときに呼ばれる関数 */
    const answerUpdate = (questionId: string, value: string | string[]) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }));
    };

    /* 診断ボタンが押されたときの処理（ページ遷移のみ実装） */
    const submit = () => {
        console.log("最終的な回答:", answers);
        // TODO: ここで集めた `answers` を使って診断ロジックを実行する
        // 例えば、診断結果をstateやlocalStorageに保存するなど
        
        //診断ロジックを実行
        const result = calculatePreparedness(answers);
        console.log("診断結果:", result);

        //結果を localStorage に保存（ページ遷移後に取り出す用）
        //localStorage.setItem("disasterResult", result);
        localStorage.setItem("disasterResult", JSON.stringify(result));


        /* 診断ボタンが押されたら結果ページに遷移するように変更 */
        router.push('/posts/result'); 
    };

    /* classNameでデザインを変更可能（Bootstrapというものに定義されているCSS）*/
    return (
        <div className="container py-5">
            <h1 className="mb-4">防災診断</h1>

            {/* JSONデータを元に質問を動的に生成するように変更 */}
            {questionsData.map((question) => {
                if (question.type === "radio") {
                    return (
                        <RadioQuestion
                            key={question.id}
                            question={question.text}
                            options={question.options}
                            questionName={question.id}
                            selectedValue={(answers[question.id] as string) || ''}
                            onValueChange={(value) => answerUpdate(question.id, value)}
                        />
                    );
                } else if (question.type === "checkbox") {
                    return (
                        <CheckboxQuestion
                            key={question.id}
                            question={question.text}
                            options={question.options}
                            questionName={question.name}
                            selectedValues={(answers[question.id] as string[]) || []}
                            onValueChange={(values) => answerUpdate(question.id, values)}
                        />
                    );
                }
                return null;
            })}

            <div className="text-center mt-5">
                {/* LinkをButtonに変更し、クリックでsubmit関数を呼ぶ */}
                <button className="btn btn-primary btn-lg" onClick={submit}>
                    診断結果を見る（ページ遷移）
                </button>
            </div>
        </div>
    );
}
