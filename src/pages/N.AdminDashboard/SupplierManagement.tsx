import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Upload, ChevronDown } from "lucide-react";

type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

type BankDetails = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode?: string;
};

type Supplier = {
  id: number;
  logo?: string;
  businessName: string;
  email: string;
  phone: string;
  vatNumber?: string;
  address: Address;
  bankDetails: BankDetails;
  attachments: string[];
  dateAdded: string;
};

type SupplierDisplayKeys = "businessName" | "email" | "phone" | "dateAdded";

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const emptyAddress: Address = { street: "", city: "", state: "", postalCode: "" };
  const emptyBank: BankDetails = { bankName: "", accountName: "", accountNumber: "", swiftCode: "" };

  const [form, setForm] = useState<Supplier>({
    id: 0,
    logo: "",
    businessName: "",
    email: "",
    phone: "",
    vatNumber: "",
    address: { ...emptyAddress },
    bankDetails: { ...emptyBank },
    attachments: [],
    dateAdded: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  const toggleColumn = (key: SupplierDisplayKeys) => {
    setVisibleColumns((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const sortToggle = (key: SupplierDisplayKeys) => {
    if (sortKey === key) setSortOrder((s) => (s === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getSupplierField = (s: Supplier, key: SupplierDisplayKeys) => {
    return s[key] ?? "";
  };

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    if (!sortKey) return 0;
    const va = (getSupplierField(a, sortKey) || "").toString().toLowerCase();
    const vb = (getSupplierField(b, sortKey) || "").toString().toLowerCase();
    return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const openAddModal = () => {
    setForm({
      id: 0,
      logo: "",
      businessName: "",
      email: "",
      phone: "",
      vatNumber: "",
      address: { ...emptyAddress },
      bankDetails: { ...emptyBank },
      attachments: [],
      dateAdded: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (supplier: Supplier) => {
    setForm({ ...supplier });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return alert("Logo must be an image.");
    if (f.size > 2 * 1024 * 1024) return alert("Logo must be <= 2MB.");
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, logo: reader.result as string }));
    reader.readAsDataURL(f);
  };

  const handleAttachmentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    files.forEach((f) => {
      if (!f.type.startsWith("image/")) return;
      if (f.size > 2 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = () =>
        setForm((prev) => ({ ...prev, attachments: [...prev.attachments, reader.result as string] }));
      reader.readAsDataURL(f);
    });
  };

  const removeAttachment = (index: number) => {
    setForm((prev) => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
  };

  const updateAddress = (field: keyof Address, value: string) =>
    setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));

  const updateBankDetails = (field: keyof BankDetails, value: string) =>
    setForm((prev) => ({ ...prev, bankDetails: { ...prev.bankDetails, [field]: value } }));

  const handleSave = () => {
    if (!form.businessName.trim()) return alert("Business Name is required.");
    if (!form.email.trim()) return alert("Email is required.");
    if (!form.phone.trim()) return alert("Phone is required.");

    const dateAdded = isEditing ? form.dateAdded || new Date().toLocaleDateString("en-US") : new Date().toLocaleDateString("en-US");
    if (isEditing) {
      setSuppliers((prev) => prev.map((s) => (s.id === form.id ? { ...form, dateAdded } : s)));
    } else {
      setSuppliers((prev) => [...prev, { ...form, id: Date.now(), dateAdded }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this supplier?")) return;
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <section className="font-manrope">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Supplier Management</h2>

        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded bg-slate-700 text-white hover:bg-slate-600"
            >
              Columns <ChevronDown size={14} className={dropdownOpen ? "transform rotate-180" : ""} />
            </button>
            <div
              className={`origin-top-right absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded shadow-lg z-30 transform transition-all duration-180 ease-out ${
                dropdownOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
              }`}
            >
              <div className="p-2">
                {columns.map((col) => (
                  <label key={col.key} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-700 cursor-pointer text-sm text-slate-200">
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

          <Button onClick={openAddModal} className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
            <Plus size={14} /> Add Supplier
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-700 rounded">
        <table className="w-full text-sm text-white">
          <thead className="bg-slate-700">
            <tr>
              <th className="p-3">Logo</th>
              {columns.map((col) =>
                visibleColumns.includes(col.key) ? (
                  <th key={col.key} className="p-3 cursor-pointer" onClick={() => sortToggle(col.key)}>
                    <div className="flex items-center gap-2">
                      <span>{col.label}</span>
                      {sortKey === col.key && <span className="text-xs text-slate-300">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </div>
                  </th>
                ) : null
              )}
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedSuppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t border-slate-600 hover:bg-slate-800">
                <td className="p-3">
                  {supplier.logo ? (
                    <img src={supplier.logo} alt="logo" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">N/A</div>
                  )}
                </td>
                {columns.map((col) =>
                  visibleColumns.includes(col.key) ? <td key={col.key} className="p-3">{getSupplierField(supplier, col.key)}</td> : null
                )}
                <td className="p-3 flex gap-2">
                  <Button size="sm" variant="outline" className="text-blue-500 border-blue-500" onClick={() => openEditModal(supplier)}>
                    <Pencil size={14} />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500 border-red-500" onClick={() => handleDelete(supplier.id)}>
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.12)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-bold mb-4">{isEditing ? "Edit Supplier" : "Add New Supplier"}</h3>

            <div className="space-y-4">
              {/* Logo */}
              <div>
                <label className="block mb-1 text-sm text-slate-300">Logo</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                  {form.logo ? (
                    <img src={form.logo} alt="logo preview" className="mx-auto h-24 object-contain mb-2 rounded" />
                  ) : (
                    <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                </div>
              </div>

              {/* Business Info */}
              <input
                placeholder="Business Name"
                value={form.businessName}
                onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
                className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
                />
                <input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
                />
              </div>
              <input
                placeholder="VAT Number"
                value={form.vatNumber || ""}
                onChange={(e) => setForm((p) => ({ ...p, vatNumber: e.target.value }))}
                className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
              />

              {/* Address */}
              <div>
                <h4 className="text-sm text-slate-200 mb-2">Address</h4>
                <input
                  placeholder="Street Address"
                  value={form.address.street}
                  onChange={(e) => updateAddress("street", e.target.value)}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white mb-2"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    placeholder="City / Town Name"
                    value={form.address.city}
                    onChange={(e) => updateAddress("city", e.target.value)}
                    className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                  />
                  <input
                    placeholder="State / Province"
                    value={form.address.state}
                    onChange={(e) => updateAddress("state", e.target.value)}
                    className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                  />
                  <input
                    placeholder="Postal Code / Zip Code"
                    value={form.address.postalCode}
                    onChange={(e) => updateAddress("postalCode", e.target.value)}
                    className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h4 className="text-sm text-slate-200 mb-2">Bank Details</h4>
                <input
                  placeholder="Bank Name"
                  value={form.bankDetails.bankName}
                  onChange={(e) => updateBankDetails("bankName", e.target.value)}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white mb-2"
                />
                <input
                  placeholder="Account Name"
                  value={form.bankDetails.accountName}
                  onChange={(e) => updateBankDetails("accountName", e.target.value)}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white mb-2"
                />
                <input
                  placeholder="Account Number"
                  value={form.bankDetails.accountNumber}
                  onChange={(e) => updateBankDetails("accountNumber", e.target.value)}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white mb-2"
                />
                <input
                  placeholder="SWIFT / BIC Code (optional)"
                  value={form.bankDetails.swiftCode || ""}
                  onChange={(e) => updateBankDetails("swiftCode", e.target.value)}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm mb-2 text-slate-200">Attachment(s)</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                  {form.attachments.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                      {form.attachments.map((att, idx) => (
                        <div key={idx} className="relative">
                          <img src={att} alt={`attachment-${idx}`} className="h-16 w-16 object-cover rounded border border-slate-700" />
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAttachmentsUpload}
                    className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  {isEditing ? "Update Supplier" : "Add Supplier"}
                </Button>
                <Button onClick={() => setShowModal(false)} className="bg-slate-600 hover:bg-slate-700 text-white">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
