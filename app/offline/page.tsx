"use client";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">オフラインです</h1>
      <p className="text-lg text-center mb-6">
        インターネット接続がありません。
        <br />
        接続が回復したら、ページを再読み込みしてください。
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        再読み込み
      </button>
    </div>
  );
}