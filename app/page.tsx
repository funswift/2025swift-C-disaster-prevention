import Link from 'next/link';
import styles from './styles.module.css';
import React from "react";


export default function Page() {
  return (
    //wbr 改行可能ポイント br 強制改行
<main>
    <div className="text-center mt-30 mb-150 p-8">
        {/* buttonの代わりにLinkコンポーネントを使用し、同じクラスを指定します */}
        <Link href="/posts/question" 
          className="bg-[#FEAF71] border-[#CCBFA7] w-full py-3 px-6 rounded-2xl text-5xl"
        >
          診断画面へ→
        </Link>
      </div>
</main>    
  );
}
