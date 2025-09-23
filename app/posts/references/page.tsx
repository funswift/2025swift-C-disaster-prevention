"use client";

export default function ReferencesPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">参考文献</h1>
      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li>〇〇著 『△△の基礎』 出版社, 2020年.</li>
        <li>××, "タイトル", 学会誌, Vol.10, No.2, 2021年.</li>
        <li>John Smith, <i>Introduction to Something</i>, Academic Press, 2019.</li>
        <li>その他必要な参考文献をここに追加...</li>
      </ul>
      <a href="/" className="btn btn-secondary mt-4">
        ホームに戻る
      </a>
    </main>
  );
}
