// pages/N.AdminDashboard/Clients/ClientTable.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import type { Client, ClientDisplayKeys } from "./types";

type Props = {
  clients: Client[];
  visibleColumns: ClientDisplayKeys[];
  columns: { key: ClientDisplayKeys; label: string }[];
  sortKey: ClientDisplayKeys | null;
  sortOrder: "asc" | "desc";
  onSortToggle: (key: ClientDisplayKeys) => void;
  getClientField: (c: Client, key: ClientDisplayKeys) => string;
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function ClientTable({
  clients,
  visibleColumns,
  columns,
  sortKey,
  sortOrder,
  onSortToggle,
  getClientField,
  onEdit,
  onDelete,
  selectedIds,
  setSelectedIds,
}: Props) {
  const toggleSelectAll = () => {
    if (selectedIds.length === clients.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(clients.map((c) => c.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto border border-slate-700 rounded">
      <table className="w-full text-sm text-white">
        <thead className="bg-slate-700">
          <tr>
            {/* Master checkbox */}
             <th className="p-3 w-10">
               <Checkbox
                 checked={
                  selectedIds.length === clients.length
                  ? true
                 : selectedIds.length === 0
                 ? false
               : "indeterminate"
                 }
               onCheckedChange={toggleSelectAll}
                  />
               </th>
            <th className="p-3">Logo</th>
            {columns.map((col) =>
              visibleColumns.includes(col.key) ? (
                <th
                  key={col.key}
                  className="p-3 cursor-pointer select-none"
                  onClick={() => onSortToggle(col.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    {sortKey === col.key && (
                      <span className="text-xs text-slate-300">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ) : null
            )}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-t border-slate-600 hover:bg-slate-800"
            >
              {/* Row checkbox */}
              <td className="p-3 w-10">
                <Checkbox
                  checked={selectedIds.includes(client.id)}
                  onCheckedChange={() => toggleSelect(client.id)}
                />
              </td>
              <td className="p-3">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt="logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                    N/A
                  </div>
                )}
              </td>
              {columns.map((col) =>
                visibleColumns.includes(col.key) ? (
                  <td key={col.key} className="p-3">
                    {getClientField(client, col.key)}
                  </td>
                ) : null
              )}
              <td className="p-3 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                  onClick={() => onEdit(client)}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => onDelete(client.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
