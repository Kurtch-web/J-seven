// src/pages/N.AdminDashboard/QuotationForm/MaterialsSection.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

interface MaterialItem {
  id: number;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
}

interface MaterialsSectionProps {
  materials: MaterialItem[];
  onChange: (
    id: number,
    field: keyof MaterialItem,
    value: string | number
  ) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
}

export default function MaterialsSection({
  materials,
  onChange,
  onAdd,
  onRemove,
}: MaterialsSectionProps) {
  const grandTotal = materials.reduce(
    (sum, mat) => sum + mat.quantity * mat.unitCost,
    0
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">B.) Materials</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white border border-slate-700 rounded">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-center">Quantity</th>
              <th className="p-2 text-center">Unit</th>
              <th className="p-2 text-center">Unit Cost</th>
              <th className="p-2 text-center">Total</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((mat) => (
              <tr
                key={mat.id}
                className="border-t border-slate-600 hover:bg-slate-800"
              >
                <td className="p-2">
                  <Input
                    value={mat.description}
                    onChange={(e) =>
                      onChange(mat.id, "description", e.target.value)
                    }
                    className="bg-slate-900 border-slate-700"
                  />
                </td>
                <td className="p-2 text-center">
                  <Input
                    type="number"
                    value={mat.quantity}
                    onChange={(e) =>
                      onChange(mat.id, "quantity", Number(e.target.value))
                    }
                    className="w-20 bg-slate-900 border-slate-700 text-center"
                  />
                </td>
                <td className="p-2 text-center">
                  <Input
                    value={mat.unit}
                    onChange={(e) => onChange(mat.id, "unit", e.target.value)}
                    className="w-20 bg-slate-900 border-slate-700 text-center"
                  />
                </td>
                <td className="p-2 text-center">
                  <Input
                    type="number"
                    value={mat.unitCost}
                    onChange={(e) =>
                      onChange(mat.id, "unitCost", Number(e.target.value))
                    }
                    className="w-28 bg-slate-900 border-slate-700 text-center"
                  />
                </td>
                <td className="p-2 text-center">
                  ₱ {(mat.quantity * mat.unitCost).toLocaleString()}
                </td>
                <td className="p-2 text-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemove(mat.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Material + Grand Total */}
      <div className="flex justify-between items-center mt-4">
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
          onClick={onAdd}
        >
          <Plus size={16} /> Add Material
        </Button>
        <div className="text-right font-semibold">
          Grand Total: ₱ {grandTotal.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
