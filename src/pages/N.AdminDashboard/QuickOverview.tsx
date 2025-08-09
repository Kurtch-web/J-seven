import {
  Clock3,
  FileText,
  XCircle,
  Users
} from "lucide-react";

const stats = [
  {
    label: "Materials Pending",
    value: 7,
    icon: <Clock3 className="text-orange-500" />,
    textColor: "text-orange-500",
  },
  {
    label: "Quotation Requests",
    value: 23,
    icon: <FileText className="text-white" />,
    textColor: "text-white",
  },
  {
    label: "Rejected Materials",
    value: 4,
    icon: <XCircle className="text-red-500" />,
    textColor: "text-red-500",
  },
  {
    label: "Customer Inquiries",
    value: 9,
    icon: <Users className="text-green-400" />,
    textColor: "text-green-400",
  }
];

export default function QuickOverview() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-white">Quick Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-xl"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-slate-700 rounded-full">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <h3 className={`text-2xl font-bold mt-1 ${stat.textColor}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
