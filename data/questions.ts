// questions.ts
export type Question = {
    type: number; // 0: single choice, 1: multiple choice
    text: string;
    options: string[];
    question_name:string; // 得点計算ファイルで、識別子があった方が分かりやすいかもしれないので追加
    options_name:string[];
};

export const questionsData: Question[] = [
  {
  type: 0,
    text: "非常時の家族との連絡手段を決めていますか？",
    options: ["はい", "いいえ"],
    question_name: "contact-method",
    options_name: ["yes","no"]
  },
  {
    type: 0,
    text: "連絡手段が断たれていた時の集合場所を決めていますか？",
    options: ["はい", "いいえ"],
    question_name: "gathering-place",
    options_name: ["yes","no"]
  },
  {
    type: 0,
    text: "マイナンバーカードなどの大切な書類の保管場所を共有していますか？",
    options: ["はい", "いいえ"],
    question_name: "document-storage",
    options_name: ["yes","no"]
  },
  {
    type: 0,
    text: "避難場所とそこまでの経路を決めていますか？",
    options: ["はい", "いいえ"],
    question_name: "evacuation-route",
    options_name: ["yes","no"]
  },
  {
    type: 1,
    text: "災害に備えて備蓄しているものを選択してください（複数選択可）",
    options: ["食料", "水", "簡易トイレ", "医薬品","モバイルバッテリー"],
    question_name: "stockpile-items",
    options_name: ["food", "water", "toilet", "medicine","battery"]
  },
];

// export interface Question {
//   id: string;
//   type: "radio" | "checkbox";
//   name: string;
//   text: string;
//   options: { label: string; value: string }[];
// }

// export const questions: Question[] = [
//   {
//     id: "q1",
//     type: "radio",
//     name: "contact-method",
//     text: "非常時の家族との連絡手段を決めていますか？",
//     options: [
//       { label: "はい", value: "yes" },
//       { label: "いいえ", value: "no" },
//     ],
//   },
//   // ...残りの質問
// ];