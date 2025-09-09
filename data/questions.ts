// questions.ts
export type Question = {
    type: number; // 0: single choice, 1: multiple choice
    text: string;
    options: string[];
};

export const questions: Question[] = [
  {
  type: 0,
    text: "非常時の家族との連絡手段を決めていますか？",
    options: ["はい", "いいえ"],
  },
  {
    type: 0,
    text: "連絡手段が断たれていた時の集合場所を決めていますか？",
    options: ["はい", "いいえ"],
  },
  {
    type: 0,
    text: "マイナンバーカードなどの大切な書類の保管場所を共有していますか？",
    options: ["はい", "いいえ"],
  },
  {
    type: 0,
    text: "避難場所とそこまでの経路を決めていますか？",
    options: ["はい", "いいえ"],
  },
  {
    type: 1,
    text: "災害に備えて備蓄しているものを選択してください（複数選択可）",
    options: ["食料", "水", "簡易トイレ", "医薬品","モバイルバッテリー"],
  },
];