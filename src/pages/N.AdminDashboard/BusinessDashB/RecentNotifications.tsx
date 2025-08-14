import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, AlertTriangle, FileText } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "superadmin",
    message: "Your material 'Cement - 25kg' was approved.",
    time: "2 hours ago",
    icon: <CheckCircle className="text-green-400" size={18} />,
  },
  {
    id: 2,
    type: "client",
    message: "Client Anna requested a quotation for 4 items.",
    time: "5 hours ago",
    icon: <FileText className="text-blue-400" size={18} />,
  },
  {
    id: 3,
    type: "superadmin",
    message: "'Gravel - 1 cu.m' was rejected. Check your submission.",
    time: "1 day ago",
    icon: <AlertTriangle className="text-red-400" size={18} />,
  },
];

export default function RecentNotifications() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-white">Recent Notifications</h2>
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <ScrollArea className="h-64">
            <ul className="divide-y divide-slate-700">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className={`flex items-start gap-3 p-4 transition-colors hover:bg-slate-750 border-l-4 ${
                    note.type === "superadmin" 
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">{note.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          note.type === "superadmin"
                            ? "text-orange-400 border-orange-400"
                            : "text-blue-400 border-blue-400"
                        }
                      >
                        {note.type}
                      </Badge>
                      <span className="text-xs text-slate-400">{note.time}</span>
                    </div>
                    <p className="text-sm text-white mt-1">{note.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
}
