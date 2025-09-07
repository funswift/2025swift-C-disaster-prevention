export function parseQst(input: string): string[] {
    if(!input) return [];
    const m = input.match(/qst:([^.]+)\./); // qst: と 次の . の間
    if (!m) return [];
    let parts = m[1].split(","); // (キャッチグループ)のみ取得
    // 空白はURLなのでない, 空の配列はカウントしておきたい

    // 数字に変換できるか調べて、できなかったものだけハイフンで分割する
    // 分割した配列がすべて数字に変換できるならばそのまま
    // できないものがあれば、文字列の0にする
    parts.map((part) => {
        if(!/^[0-9]+$/.test(part)){
            part.split("-").map((n) => {
                if(!/^[0-9]+$/.test(n)){
                    part = "0";
                }
            })
        }
    })

    return parts;
}
