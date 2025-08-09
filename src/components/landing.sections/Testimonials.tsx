import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-gray-900 font-extrabold mb-6">
            <span className="text-orange-500">What</span>{" "}
            <span className="text-blue-600">Users</span>{" "}
            <span className="text-gray-700">Say.</span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200">
            <div className="flex items-center mb-4">
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-gray-700 mb-6 text-lg italic">
              "CivilQuote cut our estimation time by 70%. Now we deliver precise bids faster than ever."
            </blockquote>
            <div className="border-t border-orange-200 pt-4">
              <div className="text-gray-900 font-medium">Maria Santos</div>
              <div className="text-gray-600 text-sm">Project Manager, BuildIt Inc.</div>
            </div>
          </Card>

          {/* Testimonial 2 */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="flex text-blue-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-gray-700 mb-6 text-lg italic">
              "The location-based cost factors are a game changer. No more guesswork on local rates!"
            </blockquote>
            <div className="border-t border-blue-200 pt-4">
              <div className="text-gray-900 font-medium">John Delgado</div>
              <div className="text-gray-600 text-sm">Contractor, Metro Homes</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
