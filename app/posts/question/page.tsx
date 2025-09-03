import Link from "next/link"
import RadioButton from "@/components/select_button";

export default function Question() {
  return (
  <>
    <RadioButton />
  <h2>
    <Link href="/posts/result">
      診断結果を見る（ページ遷移）
    </Link>
  </h2>
  </>
  );
}
