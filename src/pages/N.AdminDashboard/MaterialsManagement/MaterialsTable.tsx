import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Material } from "./types";

interface MaterialsTableProps {
  materials: Material[];
  onEdit: (mat: Material) => void;
  onDelete: (id: number) => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function MaterialsTable({
  materials,
  onEdit,
  onDelete,
  selectedIds,
  setSelectedIds,
}: MaterialsTableProps) {
  const toggleSelectAll = () => {
    if (selectedIds.length === materials.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(materials.map((m) => m.id));
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto border border-slate-700 rounded">
      <table className="w-full text-sm text-white">
        <thead className="bg-slate-700 text-left">
          <tr>
            <th className="p-3">
              <Checkbox
                checked={selectedIds.length === materials.length && materials.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </th>
            <th className="p-3">Material Name</th>
            <th className="p-3">Specification</th>
            <th className="p-3">Price</th>
            <th className="p-3">Supplier</th>
            <th className="p-3">Category</th>
            <th className="p-3">Available Stock</th>
            <th className="p-3">Stock Date</th>
            <th className="p-3">Creator</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat.id} className="border-t border-slate-600 hover:bg-slate-800">
              <td className="p-3">
                <Checkbox
                  checked={selectedIds.includes(mat.id)}
                  onCheckedChange={() => toggleSelectOne(mat.id)}
                />
              </td>
              <td className="p-3">{mat.name}</td>
              <td className="p-3">{mat.spec}</td>
              <td className="p-3">{mat.price}</td>
              <td className="p-3">{mat.supplier}</td>
              <td className="p-3">{mat.category}</td>
              <td className="p-3">{mat.availableStock}</td>
              <td className="p-3">{mat.stockDate}</td>
              <td className="p-3">{mat.creator}</td>
              <td className="p-3">
                <Badge
                  variant={
                    mat.status === "Approved"
                      ? "success"
                      : mat.status === "Pending"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {mat.status}
                </Badge>
              </td>
              <td className="p-3 space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                  onClick={() => onEdit(mat)}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => onDelete(mat.id)}
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
