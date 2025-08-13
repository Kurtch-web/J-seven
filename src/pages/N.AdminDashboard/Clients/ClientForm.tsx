import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import type { Client, Address } from "./types";

type Props = {
  initialData: Client | null;
  isEditing: boolean;
  onSave: (data: Client) => void;
  onCancel: () => void;
};

const emptyAddress: Address = { street: "", city: "", state: "", postalCode: "" };

export default function ClientForm({ initialData, isEditing, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Client>(
    initialData || {
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
    }
  );

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
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const updateMainAddress = (field: keyof Address, value: string) =>
    setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));

  const addShippingAddress = () => {
    setForm((prev) => ({
      ...prev,
      shippingAddresses: [...prev.shippingAddresses, { ...emptyAddress }],
    }));
  };

  const updateShippingAddress = (index: number, field: keyof Address, value: string) => {
    setForm((prev) => {
      const next = [...prev.shippingAddresses];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, shippingAddresses: next };
    });
  };

  const handleSubmit = () => {
    if (!form.businessName.trim()) return alert("Business Name is required.");
    if (!form.email.trim()) return alert("Email is required.");
    if (!form.phone.trim()) return alert("Phone is required.");

    const dateAdded = isEditing
      ? form.dateAdded || new Date().toLocaleDateString("en-US")
      : new Date().toLocaleDateString("en-US");

    onSave({ ...form, dateAdded });
  };

  return (
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
            className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 
                       file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold 
                       file:bg-blue-600 file:text-white hover:file:bg-blue-500"
          />
        </div>
      </div>

      {/* Business Name */}
      <input
        placeholder="Business Name"
        value={form.businessName}
        onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
        className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
      />

      {/* Email + Phone */}
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
          value={form.address.street}
          onChange={(e) => updateMainAddress("street", e.target.value)}
          className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white mb-2"
        />
        <div className="grid grid-cols-3 gap-2">
          <input
            placeholder="City / Town Name"
            value={form.address.city}
            onChange={(e) => updateMainAddress("city", e.target.value)}
            className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
          />
          <input
            placeholder="State / Province"
            value={form.address.state}
            onChange={(e) => updateMainAddress("state", e.target.value)}
            className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
          />
          <input
            placeholder="Postal Code / Zip Code"
            value={form.address.postalCode}
            onChange={(e) => updateMainAddress("postalCode", e.target.value)}
            className="p-2 rounded bg-slate-900 border border-slate-600 text-white"
          />
        </div>
      </div>

      {/* Shipping Addresses */}
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-slate-200">Shipping Address(es)</h4>
          <Button size="sm" variant="outline" onClick={addShippingAddress} className="text-slate-300 border-slate-600">
            + Add
          </Button>
        </div>
        <div className="mt-2 space-y-3">
          {form.shippingAddresses.map((addr, idx) => (
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

      {/* Attachments */}
      <div>
        <label className="block text-sm mb-2 text-slate-200">Attachment(s)</label>
        <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
          {form.attachments.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {form.attachments.map((att, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={att}
                    alt={`attachment-${idx}`}
                    className="h-16 w-16 object-cover rounded border border-slate-700"
                  />
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
            className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 
                       file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold 
                       file:bg-blue-600 file:text-white hover:file:bg-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
          {isEditing ? "Update Client" : "Add Client"}
        </Button>
        <Button onClick={onCancel} className="bg-slate-600 hover:bg-slate-700 text-white">
          Cancel
        </Button>
      </div>
    </div>
  );
}
