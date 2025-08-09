import { Card } from "@/components/ui/card";
import {
  Calculator,
  MapPin,
  FileText,
  Clock,
  BarChart3,
  Smartphone,
} from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-20 bg-slate-800 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white font-extrabold mb-6">
            Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            Everything you need to create accurate, professional, and optimized project quotations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* First 4 Features */}
          <FeatureCard
            icon={<Calculator className="h-10 w-10 text-white" />}
            color="bg-blue-500"
            title="Material-Based Pricing"
            desc="Upload or select housing plans and get an instant cost breakdown for materials and labor."
            note="Accurate site-specific quotes"
          />

          <FeatureCard
            icon={<MapPin className="h-10 w-10 text-white" />}
            color="bg-green-500"
            title="Local Rate Integration"
            desc="Automatically factor in regional labor and material costs for accurate site-specific quotes."
            note="Real-time regional pricing"
          />

          <FeatureCard
            icon={<FileText className="h-10 w-10 text-white" />}
            color="bg-orange-500"
            title="PDF Export"
            desc="Generate accurate, professional PDF proposals ready to send to clients in one click."
            note="Professional documentation"
          />

          <FeatureCard
            icon={<Clock className="h-10 w-10 text-white" />}
            color="bg-blue-500"
            title="Real-Time Updates"
            desc="Live market rates and material costs automatically updated daily."
            note="Up-to-date quotations"
          />
        </div>

        {/* Centered Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 justify-center">
          <div className="lg:col-start-2 lg:col-span-2">
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-white" />}
              color="bg-purple-500"
              title="Analytics Dashboard"
              desc="Track project performance and identify cost optimization opportunities."
              note="Insight-driven planning"
            />
          </div>
          <div className="lg:col-span-2">
            <FeatureCard
              icon={<Smartphone className="h-10 w-10 text-white" />}
              color="bg-orange-500"
              title="Mobile Access"
              desc="Access your quotes and estimates from anywhere with our responsive mobile tools."
              note="Stay connected anytime"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  color,
  title,
  desc,
  note,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
  note: string;
}) {
  return (
    <Card className="bg-slate-700 border-slate-600 text-center p-8 shadow-lg">
      <div className="mb-6">
        <div className={`w-20 h-20 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          {icon}
        </div>
        <h3 className="text-2xl text-white font-extrabold mb-4">{title}</h3>
        <p className="text-gray-300 mb-6 font-medium">{desc}</p>
        <div className="text-sm text-gray-400">{note}</div>
      </div>
    </Card>
  );
}
