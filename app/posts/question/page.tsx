"use client";

/* テスト */
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // ページ遷移のためにインポート

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

    /* エラーメッセージの管理 */
    const[errors, setErrors] = useState<{ [key: string]: string }>({});

    /* 
      各問題要素への参照を保持するRef 
      キーが問題ID、値がエラーメッセージのオブジェクト
    */
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);


    /* 回答が更新されたときに呼ばれる関数 */
    const answerUpdate = (questionId: string, value: string | string[], questionType: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }));

        /* 回答が入力されたら、その問題のエラーメッセージを消す*/
        if (errors[questionId]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[questionId];
                return newErrors;
            });
        }

        // ラジオボタン（単一選択）の場合のみ自動スクロールを実行
        if (questionType === 'radio') {
            const currentIndex = questions.findIndex(q => q.id === questionId);
            const nextIndex = currentIndex + 1;
            // 次の問題が存在する場合
            if (nextIndex < questions.length) {
                const nextQuestionEl = questionRefs.current[nextIndex];
                if (nextQuestionEl) {
                    setTimeout(() => {
                        nextQuestionEl.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }, 200); // 0.2秒のディレイ
                }
            }
        }
    };

    /* 診断ボタンが押されたときの処理 */
    const submit = () => {
        const newErrors: { [key: string]: string } = {};

        /* 全ての問題をループして、回答があるかチェック */
        questions.forEach((question) => {
            const answer = answers[question.id];
            /* 単一選択の問題で回答がない場合 */
                if(question.type === "radio" && !answer) {
                newErrors[question.id] = "回答は必須です。";
            }
        });

        setErrors(newErrors);

        // newErrorsオブジェクトに一つでもエラーがあれば、処理を中断
        if (Object.keys(newErrors).length > 0) {
            // 未回答の最初の質問までスクロールする
            const firstErrorId = Object.keys(newErrors)[0];
            const firstErrorIndex = questions.findIndex(q => q.id === firstErrorId);
            if (firstErrorIndex !== -1) {
                questionRefs.current[firstErrorIndex]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            return;
        }

        console.log("最終的な回答:", answers);
        //診断ロジックを実行
        const result = calculatePreparedness(answers);
        console.log("診断結果:", result);

        //結果を localStorage に保存（ページ遷移後に取り出す用）
        //localStorage.setItem("disasterResult", result);
        // localStorage.setItem("disasterResult", JSON.stringify(result));

        /* 診断ボタンが押されたら結果ページに遷移 */
        /* その際クエリパラメータに診断結果ファイル名を付記 */
        const params = new URLSearchParams({ main: result.main, sub: result.sub ? result.sub.join(',') : '' });
        router.push('/posts/result?' + params.toString());

    };

    /* classNameでデザインを変更可能（Bootstrapというものに定義されているCSS）*/
return (
  <div className="container py-5">
    <h1 className="mb-4">防災診断</h1>

    {/* mapメソッドで各質問をループ表示 */}
    {questions.map((question, index) => {
      // このdivがスクロールのターゲットになる
      return (
        <div key={question.id} ref={(el) => { questionRefs.current[index] = el; }}>
          {/* 即時実行関数を使って、question.typeによって表示するコンポーネントを切り替える */}
          {(() => {
            if (question.type === "radio") {
              return (
                <SingleChoiceQuestion
                  text={question.text}
                  options={question.options}
                  callback={(value) => answerUpdate(question.id, value, question.type)}
                />
              );
            } else if (question.type === "checkbox") {
              return (
                <MultipleChoiceQuestion
                  text={question.text}
                  options={question.options}
                  callback={(value) => answerUpdate(question.id, value, question.type)}
                />
              );
            }
            return null; // 'radio'でも'checkbox'でもない場合は何も表示しない
          })()}

          {/* エラーメッセージの表示 */}
          {errors[question.id] && (
            <p className="text-danger mt-2 fw-bold">
              {errors[question.id]}
            </p>
          )}
        </div>
      );
    })}

    {/* ↓↓↓ このボタンは map のループの外に配置する ↓↓↓ */}
    <div className="text-center mt-5 p-8">
      <button
        className="bg-[#FEAF71] border-[#CCBFA7] w-full py-3 px-6 rounded-full text-2xl"
        onClick={submit}
      >
        診断結果へ→
      </button>
    </div>
  </div>
);
}
