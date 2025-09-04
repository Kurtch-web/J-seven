// src/pages/N.AdminDashboard/QuotationTable.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";

export interface Quotation {
  id: string;
  client: string;
  project: string;
  date: string;
  amount: number;
  status: "Accepted" | "Draft" | "Rejected" | "Pending";
}

interface QuotationTableProps {
  quotations: Quotation[];
  onView: (q: Quotation) => void;
  onEdit: (q: Quotation) => void;
  onDelete: (id: string) => void;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function QuotationTable({
  quotations,
  onView,
  onEdit,
  onDelete,
  selectedIds,
  setSelectedIds,
}: QuotationTableProps) {
  const toggleSelectAll = () => {
    if (selectedIds.length === quotations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(quotations.map((q) => q.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const renderStatus = (status: Quotation["status"]) => {
    switch (status) {
      case "Accepted":
        return <Badge className="bg-green-600">{status}</Badge>;
      case "Draft":
        return <Badge className="bg-yellow-600">{status}</Badge>;
      case "Rejected":
        return <Badge className="bg-red-600">{status}</Badge>;
      default:
        return <Badge className="bg-gray-600">{status}</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto border border-slate-700 rounded-md">
      <table className="w-full text-sm text-white">
        <thead className="bg-slate-700 text-left">
          <tr>
            <th className="p-3 w-10">
              <Checkbox
                checked={
                  selectedIds.length === quotations.length &&
                  quotations.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
            </th>
            <th className="p-3">Quote No.</th>
            <th className="p-3">Date</th>
            <th className="p-3">Client</th>
            <th className="p-3">Project</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((q) => (
            <tr
              key={q.id}
              className="border-t border-slate-600 hover:bg-slate-800"
            >
              <td className="p-3">
                <Checkbox
                  checked={selectedIds.includes(q.id)}
                  onCheckedChange={() => toggleSelectOne(q.id)}
                />
              </td>
              <td className="p-3">{q.id}</td>
              <td className="p-3">{q.date}</td>
              <td className="p-3">{q.client}</td>
              <td className="p-3">{q.project}</td>
              <td className="p-3">₱{q.amount.toLocaleString()}</td>
              <td className="p-3">{renderStatus(q.status)}</td>
              <td className="p-3 text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                  onClick={() => onView(q)}
                >
                  <Eye size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                  onClick={() => onEdit(q)}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => onDelete(q.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </td>
            </tr>
          ))}

          {quotations.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center text-slate-400 py-6">
                No quotations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
