export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-gray-900 font-extrabold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Simple 4-step process to get accurate construction estimates
          </p>
        </div>

        {/* Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-semibold">
              1
            </div>
            <h3 className="text-xl font-bold mb-4">Upload Plans</h3>
            <p className="text-gray-600 text-sm font-medium">
              Upload your architectural plans or select from our library of standard designs
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-semibold">
              2
            </div>
            <h3 className="text-xl font-bold mb-4">Set Location</h3>
            <p className="text-gray-600 text-sm font-medium">
              Specify the project location for accurate regional pricing and labor costs
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-semibold">
              3
            </div>
            <h3 className="text-xl font-bold mb-4">Generate Quote</h3>
            <p className="text-gray-600 text-sm font-medium">
              Our system automatically calculates materials, labor, and total project costs
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-semibold">
              4
            </div>
            <h3 className="text-xl font-bold mb-4">Export & Share</h3>
            <p className="text-gray-600 text-sm font-medium">
              Download professional PDF proposals and share with clients instantly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
