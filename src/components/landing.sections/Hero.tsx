import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.0&auto=format&fit=crop&w=2070&q=80"
        alt="Construction site with blueprint and tools"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-bold mb-6 leading-tight">
            <span className="text-orange-400 font-manrope">Quote</span> smart.{" "}
            <span className="text-blue-400 font-manrope">Supply</span> faster.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-manrope">
            Helps suppliers and contractors generate accurate material quotations, manage inventory, and speed up procurement—everything in one dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-manrope"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pb-8 sm:pb-0">
            <div>
              <div className="text-3xl text-orange-400 font-semibold mb-2">50K+</div>
              <div className="text-gray-300 font-manrope">Quotes Generated</div>
            </div>
            <div>
              <div className="text-3xl text-blue-400 font-semibold mb-2">95%</div>
              <div className="text-gray-300 font-manrope">Faster Bidding Process</div>
            </div>
            <div>
              <div className="text-3xl text-green-400 font-semibold mb-2">2.5M+</div>
              <div className="text-gray-300 font-manrope">Material Records Managed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
