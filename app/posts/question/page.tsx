"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // ページ遷移のためにインポート

/* データと子コンポーネントをインポート */
import { calculatePreparedness } from "../../../data/calculate";

import { Question, questions } from "data/questions";
import SingleChoiceQuestion from "@/components/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
import { optimizeImage } from "next/dist/server/image-optimizer";

export default function Page() {
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

            {questions.map((question, index) => {
                if (question.type === "radio") {
                    return (
                        <SingleChoiceQuestion
                            key={index}
                            text={question.text}
                            options={question.options}
                            callback={(value) => answerUpdate(question.id, value)}
                            />
                    )
                } else if (question.type === "checkbox") {
                    return (
                        <MultipleChoiceQuestion
                            key={index}
                            text={question.text}
                            options={question.options}
                            callback={(value) => answerUpdate(question.id, value)}
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
