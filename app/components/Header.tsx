// components/Header.tsx
import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-[F9F8F1] text-center">
      <div className="flex justify-center items-center p-10">
        <Image
          src="/picture/header.png"
          alt="icon"
          width={1200} 
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
