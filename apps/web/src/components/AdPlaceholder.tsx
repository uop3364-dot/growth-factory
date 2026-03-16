export default function AdPlaceholder({ slot = 'default' }: { slot?: string }) {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-gray-400 my-4" data-ad-slot={slot}>
      <p className="text-xs">Advertisement</p>
    </div>
  );
}
