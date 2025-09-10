"use client";
import type { Question } from "data/questions";

export interface PreparednessResult {
  main: string;     // メインで表示する画像
  sub: string[] | null;  // その他に表示する画像リスト
}
export type Answers = Record<string, string | string[]>;

export function calculatePreparedness(answers: Answers): PreparednessResult {
  let yesCount = 0;

  ["contact-method", "gathering-place", "document-storage", "evacuation-route"].forEach((key) => {
    if (answers[key] === "yes") yesCount++;
  });

  const stockpile = Array.isArray(answers["stockpile-items"])
    ? answers["stockpile-items"].length
    : 0;

  // 優先順位つきの判定リスト
  const checks = [
    { key: "q1", condition: answers["q1"] === "no", image: "/picture/q1.jpg" },
    { key: "q2", condition: answers["q2"] === "no", image: "/picture/q1.jpg" },
    { key: "q3", condition: answers["q3"] === "no", image: "/picture/q1.jpg" },
    { key: "q4", condition: answers["q4"] === "no", image: "/picture/q1.jpg" },
    { key: "stockpile", condition: stockpile <= 3, image: "/picture/q1.jpg" },
  ];

  let main: string | null = null;
  const sub: string[] = [];

  for (const check of checks) {
    if (check.condition) {
      if (!main) {
        // 最初に見つかった「no」がメイン
        main = check.image;
      } else if (check.image !== main) {
        // それ以外はサブに追加
        sub.push(check.image);
      }
    }
  }

  return {
    main: main ?? "/picture/q1.jpg", // 全部OKならデフォルト画像
    sub,
  };
}
