"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";


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
        <div className="mb-4">
          <Image
            src={result} // public フォルダ配下に画像を置いている前提
            alt="診断結果画像"
            width={1200}      // 横幅の最大値
            height={600}      // 横長画像に合わせた縦幅
           style={{ width: "100%", height: "auto"}} // 親幅に合わせて自動調整
  />
        </div>
      ) : (
        <h2 className="mb-4">診断結果がありません</h2>
      )}

      <a href="/" className="btn btn-secondary">
        ホームに戻る
      </a>
    </div>
  );
}
