"use client";
import type { Question } from "data/questions";

export interface PreparednessResult {
  main: string; // メインで表示する画像
  sub: string[] | null; // その他に表示する画像リスト
}
export type Answers = Record<string, string | string[]>;

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
      image: "/picture/result_picture/type1.png",
    },
    {
      key: "q2",
      condition: answers["q2"] === "no",
      image: "/picture/result_picture/type2.png",
    },
    {
      key: "q3",
      condition: answers["q3"] === "no",
      image: "/picture/result_picture/type3.png",
    },
    {
      key: "q4",
      condition: answers["q4"] === "no",
      image: "/picture/result_picture/type4.png",
    },
    {
      key: "stockpile",
      condition: answers["q5"] === "no",
      image: "/picture/result_picture/type5.png",
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
          "/picture/result_picture/type1.png":
            "/picture/result_picture/mini_type1.png",
          "/picture/result_picture/type2.png":
            "/picture/result_picture/mini_type2.png",
          "/picture/result_picture/type3.png":
            "/picture/result_picture/mini_type3.png",
          "/picture/result_picture/type4.png":
            "/picture/result_picture/mini_type4.png",
          "/picture/result_picture/type5.png":
            "/picture/result_picture/mini_type5.png",
        };
        sub.push(subImageMap[check.image] ?? check.image);
      }
    }
  }

  return {
    main: main ?? "/picture/result_picture/type6.png", // 全部OKならデフォルト画像
    sub,
  };
}
