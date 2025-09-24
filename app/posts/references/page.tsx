import Link from 'next/link';

export default function ReferencesPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">参考文献</h1>
      <ul className="list-disc list-outside space-y-3 text-gray-800 text-lg px-6 pt-2 pb-6">
        <li>防災イツモプロジェクト (2025) 防災イツモマニュアル. ポプラ社, 東京, pp.125-146</li>
        <li>静岡県危機管理部危機情報課 (2012) チェックリスト(家庭内対策編). https://www.city.gotemba.lg.jp/anzen/a-1/a-1-3/2030.html (2025/09/24アクセス)</li>
        <li>国崎信江, Q：災害に備えて家族で決めておくことは?. 内閣府,  https://www.bousai.go.jp/kohou/kouhoubousai/h20/11/question.html (2025/09/24アクセス)</li>
        <li>消防防災博物館, 非常用品(備蓄品・非常持ち出し品)の準備. https://www.bousaihaku.com/survival/prepare/home/home06/ (2025/09/24アクセス)</li>
        <li>濱田宏彰監修 (2024) 災害発生！被災時「ないと困るもの」. https://www.secom.co.jp/homesecurity/bouhan/bosai_bouka/bouhan084.html (2025/09/24アクセス)</li>
      </ul>
      <Link href="/" className="btn btn-secondary mt-4">
        ホームに戻る
      </Link>
    </main>
  );
}
