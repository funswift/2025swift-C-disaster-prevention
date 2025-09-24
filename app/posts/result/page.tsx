import { Suspense } from "react";
import ResultContent from "./resultContent";

export default function Page() {
  return (
    <Suspense fallback={<div>診断結果を読み込み中...</div>}>
      <ResultContent />
    </Suspense>
  );
}