export default function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details key={i} className="group bg-white rounded-lg shadow-sm border border-gray-100">
            <summary className="p-4 cursor-pointer font-medium text-gray-800 hover:text-blue-600 transition-colors list-none flex justify-between items-center">
              {item.question}
              <span className="text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
            </summary>
            <p className="px-4 pb-4 text-gray-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
