"use client";

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

  /* 各問題要素への参照を保持するRef */
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* 全ての回答を一つのオブジェクトで管理 */
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );

  /* 回答が更新されたときに呼ばれる関数 */
  const answerUpdate = (
    questionId: string,
    value: string | string[],
    questionType: string
  ) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));

    // ラジオボタン（単一選択）の場合のみ自動スクロールを実行
    if (questionType === "radio") {
      const currentIndex = questions.findIndex((q) => q.id === questionId);
      const nextIndex = currentIndex + 1;

      // 次の問題が存在する場合
      if (nextIndex < questions.length) {
        const nextQuestionEl = questionRefs.current[nextIndex];
        if (nextQuestionEl) {
          setTimeout(() => {
            nextQuestionEl.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 200); // 0.2秒のディレイ
        }
      }
    }
  };

  /* 診断ボタンが押されたときの処理（ページ遷移のみ実装） */
  const submit = () => {
    console.log("最終的な回答:", answers);
    //診断ロジックを実行
    const result = calculatePreparedness(answers);
    console.log("診断結果:", result);

    //結果を localStorage に保存（ページ遷移後に取り出す用）
    //localStorage.setItem("disasterResult", result);
    localStorage.setItem("disasterResult", JSON.stringify(result));

    /* 診断ボタンが押されたら結果ページに遷移 */
    router.push("/posts/result");
  };

  /* classNameでデザインを変更可能（Bootstrapというものに定義されているCSS）*/
  return (
    <div className="py-5">
      {questions.map((question, index) => {
        // このdivがスクロールのターゲットになる
        return (
          <div
            key={question.id}
            ref={(el) => {
              questionRefs.current[index] = el;
            }}
          >
            {(() => {
              if (question.type === "radio") {
                return (
                  <SingleChoiceQuestion
                    // key={index} は親のdivに移動したので不要
                    text={question.text}
                    options={question.options}
                    callback={(value) =>
                      answerUpdate(question.id, value, question.type)
                    }
                  />
                );
              } else if (question.type === "checkbox") {
                return (
                  <MultipleChoiceQuestion
                    // key={index} は親のdivに移動したので不要
                    text={question.text}
                    options={question.options}
                    callback={(value) =>
                      answerUpdate(question.id, value, question.type)
                    }
                  />
                );
              }
              return null;
            })()}
          </div>
        );
      })}

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
