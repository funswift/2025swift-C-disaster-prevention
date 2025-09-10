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
    <div className="container py-5">
      <h1 className="mb-4">あなたの診断結果</h1>

      {result ? (
        <>
          {/* メイン画像 */}
          <div className="mb-4">
            <Image
              src={result.main}
              alt="診断結果画像"
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* サブ画像 */}
          {result.sub.length > 0 && (
            <div>
              <h2 className="mb-3">あなたには他にこのような傾向もあります</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.sub.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`傾向${i + 1}`}
                    width={600}
                    height={400}
                    style={{ width: "100%", height: "auto" }}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <h2 className="mb-4">診断結果がありません</h2>
      )}

      <a href="/" className="btn btn-secondary">
        ホームに戻る
      </a>
    </div>
  );
}
