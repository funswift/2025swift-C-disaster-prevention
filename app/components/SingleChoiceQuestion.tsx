"use client"
import { useEffect, useState } from "react";
import { parseQst } from "lib/parseQst";
import qstToHash from "lib/qstToHash";

export default function SingleChoiceQuestion({id, text, options}: {id: number, text: string, options: string[]}){


    const baseClasses =
        "px-4 py-2 rounded transition-colors duration-200";
    const selectedClasses = "bg-blue-500 text-white";
    const unselectedClasses = "bg-gray-200 text-black";

    let init = 0;
    const [choice, setChoice] = useState<number>(init);
    const [qst, setQst] = useState<string[]>([]);

    useEffect(() => { // ハッシュが変更されたときに、読み取って保存、チョイスの変更
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            const qst_tmp = parseQst(hash);
            setQst(qst_tmp);
            if(id < qst_tmp.length && /^[0-9]+$/.test(qst_tmp[id]) && Number(qst_tmp[id]) <= options.length){
                setChoice(Number(qst_tmp[id]));
            }
        };
        handleHashChange(); // 初回読み込み時にも実行

        // イベント登録
        window.addEventListener("hashchange", handleHashChange);

        // クリーンアップ
        return () => {
        window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    function setNewHash(index: number){
        let newQst = [...qst]; // コピー
        newQst[id] = String(index);
        window.location.hash = qstToHash(newQst);
    }

    return(
    <>
        <p>{text}</p>
        {options.map( (option, index) => (
            index += 1,

            <button
            key={index}
            className={`${baseClasses} ${
            index == choice ? selectedClasses : unselectedClasses
            }`}  
            onClick={()=> {setChoice(index); setNewHash(index);} } // hash変更、一応choiceも変更
            >
                {option}
            </button>
        )
        )}
    </>
    )
}
