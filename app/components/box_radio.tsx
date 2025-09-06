

// export default function SelectButtons({ labels }: { labels: string[] }) {
export default function BoxRadio({ labels }: { labels: string[] }){
  return (
    <>
    {labels.map((label, index) => (
      <div key={index} className="w-1/3 h-8 mx-auto border border-black rounded-sm p-4 flex items-center justify-center">
        {label}
      </div>
    ))}
    </>
  )
}