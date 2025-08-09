import heroPic from "@/assets/images/hero-pic.jpg";

export function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 items-center lg:grid-cols-2">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl mb-8 font-semibold">
              <span className="text-orange-500 font-manrope font-extrabold">JSEVEN</span>{" "}
              <span className="text-blue-600 font-manrope font-extrabold">for Suppliers</span>
            </h2>

            <div className="space-y-6 font-manrope text-gray-700">
              {[
                {
                  title: "Smart Quotation Engine",
                  desc: "Generate accurate material quotations instantly with supplier-specific pricing and up-to-date stock availability.",
                },
                {
                  title: "Streamlined Inventory Management",
                  desc: "Track, update, and manage your construction material inventory effortlessly within one dashboard.",
                },
                {
                  title: "Faster Procurement Workflow",
                  desc: "Reduce manual communication and speed up approvals by sending ready-to-print, client-specific quotations in seconds.",
                },
                {
                  title: "Trusted by Contractors & Builders",
                  desc: "Seamlessly connect with project managers, engineers, and developers who rely on accurate supplier quotes for bidding and fulfillment.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg mb-2 font-extrabold">{item.title}</h3>
                    <p className="text-gray-600 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Card */}
          <div className="relative">
            <div className="rounded-2xl shadow-xl overflow-hidden rotate-2">
              <img
                src={heroPic}
                alt="Supply Dashboard Interface"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="p-6 bg-white">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
