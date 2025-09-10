"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { PreparednessResult } from "data/calculate"; // ここは保存先に合わせて修正

export default function Result() {
  const [result, setResult] = useState<PreparednessResult | null>(null);

  useEffect(() => {
    // localStorage から診断結果を取得
    const storedResult = localStorage.getItem("disasterResult");
    if (storedResult) {
      try {
        const parsed: PreparednessResult = JSON.parse(storedResult);
        setResult(parsed);
      } catch (e) {
        console.error("診断結果のパースに失敗しました:", e);
      }
    }
  }, []);

  return (
    <div className="main-container">
      <h1>あなたの診断結果</h1>

      {result ? (
        <>
          {/* メイン画像 */}
          <div className="mb-4 flex justify-center">
            <Image
              src={result.main}
              alt="診断結果画像"
              width={1200}
              height={600}
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </div>

          {/* サブ画像 */}
          {result.sub.length > 0 && (
            <div className="text-center mb-6">
              <h2 className="mb-4">あなたには他にこのような傾向もあります</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {result.sub.map((img, i) => (
                  <div key={i} className="flex justify-center">
                    <Image
                      src={img}
                      alt={`傾向${i + 1}`}
                      width={300} // 小さめに調整
                      height={200}
                      style={{
                        display: "block",
                        width: "100%",
                        maxWidth: "300px",
                        height: "auto",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <h2 className="mb-4">診断結果がありません</h2>
      )}

      <a href="/" className="btn btn-secondary mt-4">
        ホームに戻る
      </a>
    </div>
  );
}
