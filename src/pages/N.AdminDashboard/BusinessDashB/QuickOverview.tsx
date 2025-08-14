import {
  Clock3,
  FileText,
  XCircle,
  Users
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Materials Pending",
    value: 7,
    icon: Clock3,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    label: "Quotation Requests",
    value: 23,
    icon: FileText,
    color: "text-white",
    bg: "bg-white/10",
  },
  {
    label: "Rejected Materials",
    value: 4,
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    label: "Customer Inquiries",
    value: 9,
    icon: Users,
    color: "text-green-400",
    bg: "bg-green-500/10",
  }
];

export default function QuickOverview() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-white text-manrope">Quick Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-slate-800 border border-slate-700 hover:border-slate-600 hover:shadow-lg transition-all duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.bg}`}>
                  <Icon className={`${stat.color}`} size={22} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <h3 className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
