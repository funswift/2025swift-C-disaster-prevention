"use client";

import React, { useEffect, useState } from "react";

export default function Result() {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    // localStorage から診断結果を取得
    const storedResult = localStorage.getItem("disasterResult");
    if (storedResult) {
      setResult(storedResult);
    }
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">あなたの診断結果</h1>

      {result ? (
        <h2 className="mb-4">{result}</h2>
      ) : (
        <h2 className="mb-4">診断結果がありません</h2>
      )}

      <a href="/" className="btn btn-secondary">
        ホームに戻る
      </a>
    </div>
  );
}
