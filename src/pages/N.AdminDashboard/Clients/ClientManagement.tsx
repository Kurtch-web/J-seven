// pages/N.AdminDashboard/Clients/ClientManagement.tsx
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
import ClientForm from "./ClientForm";
import ClientTable from "./ClientTable";
import type { Client, ClientDisplayKeys } from "./types";

export default function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Client | null>(null);

  const [visibleColumns, setVisibleColumns] = useState<ClientDisplayKeys[]>([
    "businessName",
    "email",
    "phone",
    "dateAdded",
  ]);

  const columns: { key: ClientDisplayKeys; label: string }[] = [
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

  const [sortKey, setSortKey] = useState<ClientDisplayKeys | null>("dateAdded");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleColumn = (key: ClientDisplayKeys) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const onSortToggle = (key: ClientDisplayKeys) => {
    if (sortKey === key) setSortOrder((s) => (s === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getClientField = (c: Client, key: ClientDisplayKeys) => {
    return c[key] ?? "";
  };

  const sortedClients = [...clients].sort((a, b) => {
    if (!sortKey) return 0;
    const va = (getClientField(a, sortKey) || "").toString().toLowerCase();
    const vb = (getClientField(b, sortKey) || "").toString().toLowerCase();
    return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const openAddModal = () => {
    setEditData(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (client: Client) => {
    setEditData(client);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = (data: Client) => {
    if (isEditing) {
      setClients((prev) => prev.map((c) => (c.id === data.id ? data : c)));
    } else {
      setClients((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this client?")) return;
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className="font-manrope">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Client Management</h2>

        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded bg-slate-700 text-white hover:bg-slate-600"
            >
              Columns{" "}
              <ChevronDown size={14} className={dropdownOpen ? "transform rotate-180" : ""} />
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

          <Button
            onClick={openAddModal}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <Plus size={14} /> Add Client
          </Button>
        </div>
      </div>

      <ClientTable
        clients={sortedClients}
        visibleColumns={visibleColumns}
        columns={columns}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortToggle={onSortToggle} // updated name
        getClientField={getClientField}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.12)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <ClientForm
              initialData={editData}
              isEditing={isEditing}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
