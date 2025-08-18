// pages/N.AdminDashboard/Suppliers/SupplierManagement.tsx
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
import SupplierForm from "./SupplierForm";
import SupplierTable from "./SupplierTable";
import type { Supplier, SupplierDisplayKeys } from "./types";

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      logo: "",
      businessName: "ABC Electric Co.",
      email: "contact@abcelectric.com",
      phone: "123-456-7890",
      vatNumber: "VAT12345",
      address: { street: "123 Main St", city: "Manila", state: "NCR", postalCode: "1000" },
      bankDetails: { bankName: "BPI", accountName: "ABC Electric", accountNumber: "1234567890", swiftCode: "" },
      attachments: [],
      dateAdded: "08/12/2025"
    },
    {
      id: 2,
      logo: "",
      businessName: "Manila Power Supplies",
      email: "sales@manilapower.com",
      phone: "987-654-3210",
      vatNumber: "VAT67890",
      address: { street: "456 Rizal Ave", city: "Quezon City", state: "NCR", postalCode: "1100" },
      bankDetails: { bankName: "Metrobank", accountName: "Manila Power Supplies", accountNumber: "9876543210", swiftCode: "" },
      attachments: [],
      dateAdded: "08/10/2025"
    },
    {
      id: 3,
      logo: "",
      businessName: "Global Electrical Trading",
      email: "info@globalelectrical.com",
      phone: "555-123-4567",
      vatNumber: "VAT54321",
      address: { street: "789 Makati Ave", city: "Makati", state: "NCR", postalCode: "1200" },
      bankDetails: { bankName: "Landbank", accountName: "Global Electrical", accountNumber: "5432167890", swiftCode: "" },
      attachments: [],
      dateAdded: "08/08/2025"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Supplier | null>(null);

  const [visibleColumns, setVisibleColumns] = useState<SupplierDisplayKeys[]>([
    "businessName",
    "email",
    "phone",
    "dateAdded",
  ]);

  const columns: { key: SupplierDisplayKeys; label: string }[] = [
    { key: "businessName", label: "Business Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "dateAdded", label: "Date Added" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const [sortKey, setSortKey] = useState<SupplierDisplayKeys | null>("dateAdded");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleColumn = (key: SupplierDisplayKeys) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const onSortToggle = (key: SupplierDisplayKeys) => {
    if (sortKey === key) setSortOrder((s) => (s === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getSupplierField = (s: Supplier, key: SupplierDisplayKeys) => {
    return s[key] ?? "";
  };

  const filteredSuppliers = suppliers.filter((s) =>
    Object.values(s)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (!sortKey) return 0;
    const va = (getSupplierField(a, sortKey) || "").toString().toLowerCase();
    const vb = (getSupplierField(b, sortKey) || "").toString().toLowerCase();
    return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const openAddModal = () => {
    setEditData(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (supplier: Supplier) => {
    setEditData(supplier);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = (data: Supplier) => {
    if (isEditing) {
      setSuppliers((prev) => prev.map((s) => (s.id === data.id ? data : s)));
    } else {
      setSuppliers((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this supplier?")) return;
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleBulkDelete = () => {
    if (!confirm("Delete selected suppliers?")) return;
    setSuppliers((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
    setSelectedIds([]);
  };

  return (
    <section className="font-manrope">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Supplier Management</h2>

        <div className="flex items-center gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"
          />

          {/* Bulk Delete */}
          {selectedIds.length > 0 && (
            <Button variant="destructive" className="bg-red-700" onClick={handleBulkDelete}>
              Delete Selected
            </Button>
          )}

          {/* Column Toggle */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded bg-slate-700 text-white hover:bg-slate-600"
            >
              Columns <ChevronDown size={14} className={dropdownOpen ? "transform rotate-180" : ""} />
            </button>
            <div
              className={`origin-top-right absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded shadow-lg z-30 transform transition-all duration-180 ease-out ${
                dropdownOpen
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
              }`}
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

          {/* Add Button */}
          <Button
            onClick={openAddModal}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <Plus size={14} /> Add Supplier
          </Button>
        </div>
      </div>

      {/* Table */}
      <SupplierTable
        suppliers={sortedSuppliers}
        visibleColumns={visibleColumns}
        columns={columns}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortToggle={onSortToggle}
        getSupplierField={getSupplierField}
        onEdit={openEditModal}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      {/* Form */}
      <SupplierForm
        open={showModal}
        onOpenChange={setShowModal}
        initialData={editData}
        isEditing={isEditing}
        onSave={handleSave}
      />
    </section>
  );
}
