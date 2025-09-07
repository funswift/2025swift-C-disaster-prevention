export default function qstToHash(qst: string[]): string {
    return "qst:" + qst.join(",") + ".";
}