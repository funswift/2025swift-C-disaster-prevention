"use client";
import type { Question } from "data/questions";

export type Answers = Record<string, string | string[]>;

export function calculatePreparedness(answers: Answers): string {
  let yesCount = 0;

  ["contact-method", "gathering-place", "document-storage", "evacuation-route"].forEach((key) => {
    if (answers[key] === "yes") yesCount++;
    console.log(`yes とカウントされました。現在の yesCount: ${yesCount}`);
  });

  const stockpile = Array.isArray(answers["stockpile-items"])
    ? answers["stockpile-items"].length
    : 0;

if (answers["q1"] === "no") {
return "q1 がno　いざというときに連絡つかないタイプ";
}
else if (answers["q2"] === "no") {
return "q2 がno　大切なものなくす";
}
else if (answers["q3"] === "no") {
return "q3 がnoのタイプ";
}
else if (answers["q4"] === "no") {
return "q4 がno　避難場所わからないタイプ";
}
else if (stockpile <= 3) {
    return "備蓄少なめタイプ"
}else{
    return "パーフェクトです素晴らしい"
}
}