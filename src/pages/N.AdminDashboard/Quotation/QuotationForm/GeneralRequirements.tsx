import { Input } from "@/components/ui/input";

interface GeneralRequirement {
  id: number;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
}

interface GeneralRequirementsProps {
  items: GeneralRequirement[];
  onChange: (
    id: number,
    field: keyof GeneralRequirement,
    value: string | number
  ) => void;
}

export default function GeneralRequirements({
  items,
  onChange,
}: GeneralRequirementsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">A.) General Requirements</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white border border-slate-700 rounded">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-3 text-left">Description</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Unit Cost</th>
              <th className="p-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const subtotal = item.quantity * item.unitCost;
              return (
                <tr key={item.id} className="border-t border-slate-600">
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        onChange(item.id, "quantity", Number(e.target.value))
                      }
                      className="bg-slate-900 border-slate-700 w-20"
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      value={item.unit}
                      onChange={(e) =>
                        onChange(item.id, "unit", e.target.value)
                      }
                      className="bg-slate-900 border-slate-700 w-20"
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      type="number"
                      value={item.unitCost}
                      onChange={(e) =>
                        onChange(item.id, "unitCost", Number(e.target.value))
                      }
                      className="bg-slate-900 border-slate-700 w-28"
                    />
                  </td>
                  <td className="p-3 text-right">
                    ₱ {subtotal.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
