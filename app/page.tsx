import Link from 'next/link';
import styles from './styles.module.css';
import React from "react";


export default function Page() {
  return (
    //wbr 改行可能ポイント br 強制改行
<main>
  <div className="max-w-[520px] mx-auto text-m text-center font-medium break-keep">
  あなたの防災レベルを診断できるよ！！！！！！
  <wbr />
  結果は全部で〇〇タイプあります
  <br />
  <Link href="/questions">
          診断スタート！！！！！！（ここ押したらページ遷移）
    </Link>
</div>
</main>    
  );
}
