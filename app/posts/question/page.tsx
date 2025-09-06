import Link from "next/link"
import RadioButton from "@/components/select_button";
import BoxRadio from "@/components/box_radio";

export default function Question() {
  return (
  <>
    <BoxRadio labels={["チョコレート", "ケーキ", "パイ"]} />
  <h2>
    <Link href="/posts/result">
      診断結果を見る（ページ遷移）
    </Link>
  </h2>
  </>
  );
}
