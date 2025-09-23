// components/Header.tsx
import React from 'react'
import Link from 'next/link';
import styles from './Footer.module.css'


const Footer = () => {
  return (
    <footer className='bg-blue-400 text-center py-8'>
      <Link href="/posts/references">
        参考文献はこちら（ここ押したらページ遷移）
      </Link>
    </footer>
  );
}

export default Footer

