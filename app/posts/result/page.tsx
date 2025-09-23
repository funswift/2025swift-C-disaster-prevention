"use client";

import React, { useEffect, useState,} from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import type { PreparednessResult } from "data/calculate"; // ここは保存先に合わせて修正
import Link from "next/link";

export default function Result() {
  const [result, setResult] = useState<PreparednessResult | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // localStorage から診断結果を取得
    // const storedResult = localStorage.getItem("disasterResult");
    // if (storedResult) {
    //   try {
    //     const parsed: PreparednessResult = JSON.parse(storedResult);
    //     setResult(parsed);
    //   } catch (e) {
    //     console.error("診断結果のパースに失敗しました:", e);
    //   }
    // }
    const mainParameter = searchParams.get('main') ;
    const subParameter = searchParams.get('sub') ;
    setResult({ main: mainParameter ? mainParameter : '', sub: subParameter ? subParameter.split(',') : [] });
    console.log("mainParameter", mainParameter);

  }, []);

  return (
    <div className="main-container">
      <header className="bg-[F9F8F1] text-center">
        <div className="flex justify-center items-center p-10">
          <Image
            src="/picture/result_head.png"
            alt="icon"
            width={1200}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </header>

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

          {result.sub != null && result.sub.length > 0 && (
           
            <div className="text-center mb-6">
              <br />
              <h2 className="text-center text-4xl p-12">他の行動タイプ</h2>
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
                        maxWidth: "500px",
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

      <div className="text-center mt-5 p-8">
        <button
          className="bg-[#FEAF71] border-[#CCBFA7] w-full py-3 px-6 rounded-full text-2xl"
          onClick={() => {
            window.location.href = "/posts/question";
          }}
        >
          診断画面へ→
        </button>
      </div>
      <Link href="/" className="btn btn-secondary mt-4">
        ホームに戻る
      </Link>
    </div>
  );
}
