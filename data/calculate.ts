"use client";
import type { Question } from "data/questions";

export interface PreparednessResult {
  main: string; // メインで表示する画像
  sub: string[] | null; // その他に表示する画像リスト
}
export type Answers = Record<string, string | string[]>;

export const typeToPath: Record<string, string> = {
  type1: "/picture/result_picture/type1.png",
  type2: "/picture/result_picture/type2.png",
  type3: "/picture/result_picture/type3.png",
  type4: "/picture/result_picture/type4.png",
  type5: "/picture/result_picture/type5.png",
  type6: "/picture/result_picture/type6.png",
  miniType1: "/picture/result_picture/mini_type1.png",
  miniType2: "/picture/result_picture/mini_type2.png",
  miniType3: "/picture/result_picture/mini_type3.png",
  miniType4: "/picture/result_picture/mini_type4.png",
  miniType5: "/picture/result_picture/mini_type5.png",
};



export function calculatePreparedness(answers: Answers): PreparednessResult {
  let yesCount = 0;

  [
    "contact-method",
    "gathering-place",
    "document-storage",
    "evacuation-route",
  ].forEach((key) => {
    if (answers[key] === "yes") yesCount++;
  });

  const stockpile = Array.isArray(answers["q5"]) ? answers["q5"].length : 0;

  // 優先順位つきの判定リスト
  const checks = [
    {
      key: "q1",
      condition: answers["q1"] === "no",
      image: "type1",
    },
    {
      key: "q2",
      condition: answers["q2"] === "no",
      image: "type2",
    },
    {
      key: "q3",
      condition: answers["q3"] === "no",
      image: "type3",
    },
    {
      key: "q4",
      condition: answers["q4"] === "no",
      image: "type4",
    },
    {
      key: "stockpile",
      condition: answers["q5"] === "no",
      image: "type5",
    },
  ];

  let main: string | null = null;
  const sub: string[] = [];

  for (const check of checks) {
    if (check.condition) {
      if (!main) {
        // 最初に見つかった「no」がメイン
        main = check.image;
      } else if (check.image !== main) {
        //sub.push(check.image);
        const subImageMap: Record<string, string> = {
          "type1":
            "mini_type1",
          "type2":
            "mini_type2",
          "type3":
            "mini_type3",
          "type4":
            "mini_type4",
          "type5":
            "mini_type5",
        };
        sub.push(subImageMap[check.image] ?? check.image);
      }
    }
  }

  return {
    main: main ?? "type6", // 全部OKならデフォルト画像
    sub,
  };
}
