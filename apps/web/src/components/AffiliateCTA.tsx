export default function AffiliateCTA() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 my-6">
      <h4 className="font-semibold text-gray-800 mb-2">Recommended Creator Stack</h4>
      <p className="text-gray-600 text-sm mb-3">
        Save time on scheduling and visual design with our starter tools.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="https://metricool.com/?utm_source=creatoraitools&utm_medium=affiliate&utm_campaign=caption_generator"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
          data-affiliate="metricool-primary"
        >
          Try Metricool
        </a>
        <a
          href="https://www.canva.com/pro/?utm_source=creatoraitools&utm_medium=affiliate&utm_campaign=caption_generator"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors"
          data-affiliate="canva-secondary"
        >
          Try Canva Pro
        </a>
      </div>
    </div>
  );
}
