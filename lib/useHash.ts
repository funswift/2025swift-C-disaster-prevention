"use client"

import { useState, useEffect, useCallback } from "react";

/**
 * URL のハッシュを読み書き・監視するカスタムフック
 *
 * const [hash, setHash] = useHash();
 * 
 * めっちゃGPT
 */
export function useHash(): [string, (newHash: string) => void] {
  const [hash, setHashState] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setHashState(window.location.hash.slice(1));
    };

    // イベント登録
    window.addEventListener("hashchange", handleHashChange);

    // クリーンアップ
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // ハッシュ更新関数
  const setHash = useCallback((newHash: string) => {
    window.location.hash = newHash;
  }, []);

  return [hash, setHash];
}