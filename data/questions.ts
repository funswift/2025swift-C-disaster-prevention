export interface Question {
  id: string;
  type: "radio" | "checkbox";
  name: string;
  text: string;
  options: { label: string; value: string }[];
}

export const questions: Question[] = [
  {
    id: "q1",
    type: "radio",
    name: "contact-method",
    text: "非常時の家族との連絡手段を決めていますか？",
    options: [
      { label: "はい", value: "yes" },
      { label: "いいえ", value: "no" },
    ],
  },
  // ...残りの質問
];