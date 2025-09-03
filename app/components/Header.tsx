// components/Header.tsx
import React from 'react'
import Link from 'next/link';
import styles from './Header.module.css'


const Header = () => {
  return (
    <header className='bg-red-400 text-center py-8'>
      <nav>
        <Link href="/">
          <p>ヘッダー（トップページへ遷移もするよ）</p>
        </Link>
        {/* 他のリンクも追加可能 */}
        <Link href="/about">
        <p>色々記述可能　今はわかりやすくするために赤色でおいています</p>
        </Link>
      </nav>
    </header>
  );
}

export default Header