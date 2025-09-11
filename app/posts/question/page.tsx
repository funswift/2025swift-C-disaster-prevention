"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // ページ遷移のためにインポート

/* データと子コンポーネントをインポート */
import { calculatePreparedness } from "../../../data/calculate";

import { Question, questionsData } from "data/questions";
import SingleChoiceQuestion from "@/components/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";

export default function Page() {
    /* routerオブジェクトを取得 */
    const router = useRouter(); 
    
    /* 全ての回答を一つのオブジェクトで管理 */
    const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});

    /* 回答が更新されたときに呼ばれる関数 */
    const answerUpdate = (qsData: Question[], qsIndex: number, choiceIndex: number | number[]) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            // qsDataと質問と回答のindexを使って キー:選択 を設定 回答indexは1始まりなので-1(0は未選択)
            [qsData[qsIndex].question_name]: Array.isArray(choiceIndex) ? choiceIndex.map(i => qsData[qsIndex].options_name[i-1]) : qsData[qsIndex].options_name[choiceIndex - 1]
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

            {questionsData.map((question, index) => {
                if (question.type === 0) {
                    return (
                        <SingleChoiceQuestion
                            key={index}
                            text={question.text}
                            options={question.options}
                            callback={(choice) => answerUpdate(questionsData, index, choice)}
                            />
                    )
                } else if (question.type === 1) {
                    return (
                        <MultipleChoiceQuestion
                            key={index}
                            text={question.text}
                            options={question.options}
                            callback={(choices) => answerUpdate(questionsData, index, choices)}
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
