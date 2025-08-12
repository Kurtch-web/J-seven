// pages/N.AdminDashboard/Suppliers/SupplierTable.tsx
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import type { Supplier, SupplierDisplayKeys } from "./types";
import { useState, useRef, useEffect } from "react";

type Props = {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
  visibleColumns: SupplierDisplayKeys[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<SupplierDisplayKeys[]>>;
};

export default function SupplierTable({
  suppliers,
  onEdit,
  onDelete,
  visibleColumns,
  setVisibleColumns,
}: Props) {
  const columns: { key: SupplierDisplayKeys; label: string }[] = [
    { key: "businessName", label: "Business Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "dateAdded", label: "Date Added" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleColumn = (key: SupplierDisplayKeys) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  return (
    <div className="overflow-x-auto border border-slate-700 rounded">
      <div className="flex justify-end p-2">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-3 py-1.5 border rounded bg-slate-700 text-white hover:bg-slate-600"
          >
            Columns
            <ChevronDown
              size={14}
              className={dropdownOpen ? "transform rotate-180 transition-transform" : "transition-transform"}
            />
          </button>

          <div
            className={`origin-top-right absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded shadow-lg z-30
              transform transition-all duration-180 ease-out
              ${dropdownOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}
          >
            <div className="p-2">
              {columns.map((col) => (
                <label
                  key={col.key}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-700 cursor-pointer text-sm text-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => toggleColumn(col.key)}
                    className="w-4 h-4"
                  />
                  <span>{col.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <table className="w-full text-sm text-white">
        <thead className="bg-slate-700">
          <tr>
            <th className="p-3">Logo</th>
            {columns.map(
              (col) =>
                visibleColumns.includes(col.key) && <th key={col.key} className="p-3">{col.label}</th>
            )}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-t border-slate-600 hover:bg-slate-800">
              <td className="p-3">
                {supplier.logo ? (
                  <img
                    src={supplier.logo}
                    alt="logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                    N/A
                  </div>
                )}
              </td>
              {columns.map(
                (col) =>
                  visibleColumns.includes(col.key) && (
                    <td key={col.key} className="p-3">{supplier[col.key]}</td>
                  )
              )}
              <td className="p-3 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                  onClick={() => onEdit(supplier)}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => onDelete(supplier.id)}
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
