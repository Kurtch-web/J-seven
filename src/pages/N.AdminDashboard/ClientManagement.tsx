import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Upload, ChevronDown } from "lucide-react";

type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

type Client = {
  id: number;
  logo?: string;
  businessName: string;
  email: string;
  phone: string;
  vatNumber?: string;
  address: Address;
  shippingAddresses: Address[];
  attachments: string[]; // base64 data URLs
  dateAdded: string; // formatted MM/DD/YYYY for display
};

/** helper type for safe column indexing */
type ClientDisplayKeys = "businessName" | "email" | "phone" | "dateAdded";

export default function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      logo: "https://via.placeholder.com/80",
      businessName: "Acme Construction Ltd.",
      email: "contact@acme.com",
      phone: "+63 912 345 6789",
      vatNumber: "VAT-123456",
      address: { street: "123 Main Street", city: "Manila", state: "NCR", postalCode: "1000" },
      shippingAddresses: [{ street: "456 Warehouse Road", city: "Quezon City", state: "NCR", postalCode: "1100" }],
      attachments: [],
      dateAdded: "08/09/2025",
    },
    {
      id: 2,
      logo: "https://via.placeholder.com/80",
      businessName: "Steel & Co.",
      email: "info@steelco.com",
      phone: "+63 933 222 1111",
      vatNumber: "VAT-654321",
      address: { street: "789 Industrial Avenue", city: "Cebu", state: "Cebu", postalCode: "6000" },
      shippingAddresses: [
        { street: "101 Factory Drive", city: "Mandaue", state: "Cebu", postalCode: "6014" },
        { street: "202 Storage Lane", city: "Cebu City", state: "Cebu", postalCode: "6000" },
      ],
      attachments: [],
      dateAdded: "08/08/2025",
    },
  ]);

  const emptyAddress: Address = { street: "", city: "", state: "", postalCode: "" };

  const [form, setForm] = useState<Client>({
    id: 0,
    logo: "",
    businessName: "",
    email: "",
    phone: "",
    vatNumber: "",
    address: { ...emptyAddress },
    shippingAddresses: [],
    attachments: [],
    dateAdded: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // column visibility (logo is fixed and not togglable)
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

  // dropdown open state + outside click handler
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

  // sorting support (user wanted "newest first" default; we show sorted by dateAdded desc by default)
  const [sortKey, setSortKey] = useState<ClientDisplayKeys | null>("dateAdded");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleColumn = (key: ClientDisplayKeys) => {
    setVisibleColumns((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const sortToggle = (key: ClientDisplayKeys) => {
    if (sortKey === key) setSortOrder((s) => (s === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // safe accessor for string columns
  const getClientField = (c: Client, key: ClientDisplayKeys) => {
    return c[key] ?? "";
  };

  // client list sorted view
  const sortedClients = [...clients].sort((a, b) => {
    if (!sortKey) return 0;
    const va = (getClientField(a, sortKey) || "").toString().toLowerCase();
    const vb = (getClientField(b, sortKey) || "").toString().toLowerCase();
    return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  // ----------------- Form handlers -----------------
  const openAddModal = () => {
    setForm({
      id: 0,
      logo: "",
      businessName: "",
      email: "",
      phone: "",
      vatNumber: "",
      address: { ...emptyAddress },
      shippingAddresses: [],
      attachments: [],
      dateAdded: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (client: Client) => {
    setForm({ ...client });
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
      if (!f.type.startsWith("image/")) return; // skip non-images
      if (f.size > 2 * 1024 * 1024) return; // skip large
      const reader = new FileReader();
      reader.onload = () =>
        setForm((prev) => ({ ...prev, attachments: [...(prev.attachments || []), reader.result as string] }));
      reader.readAsDataURL(f);
    });
  };

  const removeAttachment = (index: number) => {
    setForm((prev) => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
  };

  const addShippingAddress = () => {
    setForm((prev) => ({ ...prev, shippingAddresses: [...prev.shippingAddresses, { ...emptyAddress }] }));
  };

  const updateShippingAddress = (index: number, field: keyof Address, value: string) => {
    setForm((prev) => {
      const next = [...prev.shippingAddresses];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, shippingAddresses: next };
    });
  };

  const updateMainAddress = (field: keyof Address, value: string) =>
    setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));

  const handleSave = () => {
    // minimal validation
    if (!form.businessName.trim()) return alert("Business Name is required.");
    if (!form.email.trim()) return alert("Email is required.");
    if (!form.phone.trim()) return alert("Phone is required.");

    const dateAdded = isEditing ? form.dateAdded || new Date().toLocaleDateString("en-US") : new Date().toLocaleDateString("en-US");
    if (isEditing) {
      setClients((prev) => prev.map((c) => (c.id === form.id ? { ...form, dateAdded } : c)));
    } else {
      setClients((prev) => [...prev, { ...form, id: Date.now(), dateAdded }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this client?")) return;
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // ----------------- UI -----------------
  return (
    <section className="font-manrope">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Client Management</h2>

        <div className="flex items-center gap-3">
          {/* Column toggle dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded bg-slate-700 text-white hover:bg-slate-600"
            >
              Columns <ChevronDown size={14} className={dropdownOpen ? "transform rotate-180 transition-transform" : "transition-transform"} />
            </button>

            {/* Animated dropdown */}
            <div
              className={`origin-top-right absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded shadow-lg z-30
                transform transition-all duration-180 ease-out
                ${dropdownOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}
              aria-hidden={!dropdownOpen}
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
            <Plus size={14} /> Add Client
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
                  <th
                    key={col.key}
                    className="p-3 cursor-pointer select-none"
                    onClick={() => sortToggle(col.key)}
                  >
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
            {sortedClients.map((client) => (
              <tr key={client.id} className="border-t border-slate-600 hover:bg-slate-800">
                <td className="p-3">
                  {client.logo ? (
                    <img src={client.logo} alt="logo" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">N/A</div>
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
                    onClick={() => openEditModal(client)}
                  >
                    <Pencil size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => handleDelete(client.id)}
                  >
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
            <h3 className="text-white font-bold mb-4">{isEditing ? "Edit Client" : "Add New Client"}</h3>

            <div className="space-y-4">
              {/* Logo upload (styled like MaterialsManager) */}
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
                    className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                </div>
              </div>

              {/* Basic business info */}
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

              {/* Tax Information */}
              <div>
               <h4 className="text-sm text-slate-200 mb-2">Tax Information</h4>
               <input
                 placeholder="VAT Number"
                 value={form.vatNumber || ""}
                 onChange={(e) => setForm((p) => ({ ...p, vatNumber: e.target.value }))}
                 className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
                />
             </div>

              {/* Main Address */}
              <div>
                <h4 className="text-sm text-slate-200 mb-2">Address</h4>
                <input
                  placeholder="Street Address"
                  value={form.address?.street || ""}
                  onChange={(e) => updateMainAddress("street", e.target.value)}
                  className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white mb-2"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    placeholder="City / Town Name"
                    value={form.address?.city || ""}
                    onChange={(e) => updateMainAddress("city", e.target.value)}
                    className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                  />
                  <input
                    placeholder="State / Province"
                    value={form.address?.state || ""}
                    onChange={(e) => updateMainAddress("state", e.target.value)}
                    className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                  />
                  <input
                    placeholder="Postal Code / Zip Code"
                    value={form.address?.postalCode || ""}
                    onChange={(e) => updateMainAddress("postalCode", e.target.value)}
                    className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Shipping Addresses (multiple) */}
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm text-slate-200">Shipping Address(es)</h4>
                  <Button size="sm" variant="outline" onClick={addShippingAddress} className="text-slate-300 border-slate-600">
                    + Add
                  </Button>
                </div>
                <div className="mt-2 space-y-3">
                  {(form.shippingAddresses || []).map((addr, idx) => (
                    <div key={idx} className="border rounded p-3 border-slate-600">
                      <input
                        placeholder="Street Address"
                        value={addr.street}
                        onChange={(e) => updateShippingAddress(idx, "street", e.target.value)}
                        className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white mb-2"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          placeholder="City / Town"
                          value={addr.city}
                          onChange={(e) => updateShippingAddress(idx, "city", e.target.value)}
                          className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                        />
                        <input
                          placeholder="State / Province"
                          value={addr.state}
                          onChange={(e) => updateShippingAddress(idx, "state", e.target.value)}
                          className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                        />
                        <input
                          placeholder="Postal Code / Zip"
                          value={addr.postalCode}
                          onChange={(e) => updateShippingAddress(idx, "postalCode", e.target.value)}
                          className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments (multiple) */}
              <div>
                <label className="block text-sm mb-2 text-slate-200">Attachment(s)</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                  {form.attachments && form.attachments.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                      {form.attachments.map((att, idx) => (
                        <div key={idx} className="relative">
                          <img src={att} alt={`attachment-${idx}`} className="h-16 w-16 object-cover rounded border border-slate-700" />
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                            title="Remove"
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
                    className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                </div>
              </div>

              {/* buttons */}
              <div className="flex gap-3">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  {isEditing ? "Update Client" : "Add Client"}
                </Button>
                <Button
                  onClick={() => {
                    setShowModal(false);
                    // reset form not strictly necessary but OK
                    setForm({
                      id: 0,
                      logo: "",
                      businessName: "",
                      email: "",
                      phone: "",
                      vatNumber: "",
                      address: { ...emptyAddress },
                      shippingAddresses: [],
                      attachments: [],
                      dateAdded: "",
                    });
                    setIsEditing(false);
                  }}
                  className="bg-slate-600 hover:bg-slate-700 text-white"
                >
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
