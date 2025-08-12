import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import type { Supplier, Address, BankDetails } from "./types";

const emptyAddress: Address = { street: "", city: "", state: "", postalCode: "" };
const emptyBank: BankDetails = { bankName: "", accountName: "", accountNumber: "", swiftCode: "" };

type SupplierFormProps = {
  initialData?: Supplier | null;
  isEditing: boolean; 
  onSave: (supplier: Supplier) => void;
  onCancel: () => void;
};

export default function SupplierForm({ initialData, onSave, onCancel }: SupplierFormProps) {
  const [form, setForm] = useState<Supplier>(
    initialData || {
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
        setForm((prev) => ({
          ...prev,
          attachments: [...(prev.attachments || []), reader.result as string],
        }));
      reader.readAsDataURL(f);
    });
  };

  const removeAttachment = (index: number) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const updateAddress = (field: keyof Address, value: string) =>
    setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));

  const updateBankDetails = (field: keyof BankDetails, value: string) =>
    setForm((prev) => ({ ...prev, bankDetails: { ...prev.bankDetails, [field]: value } }));

  const handleSave = () => {
    if (!form.businessName.trim()) return alert("Business Name is required.");
    if (!form.email.trim()) return alert("Email is required.");
    if (!form.phone.trim()) return alert("Phone is required.");

    const dateAdded =
      form.dateAdded || new Date().toLocaleDateString("en-US");

    onSave({ ...form, dateAdded });
  };

  return (
    <div className="space-y-4">
      {/* Logo Upload */}
      <div>
        <label className="block mb-1 text-sm text-slate-300">Logo</label>
        <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
          {form.logo ? (
            <img
              src={form.logo}
              alt="logo preview"
              className="mx-auto h-24 object-contain mb-2 rounded"
            />
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

      {/* Basic Info */}
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

      {/* VAT */}
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
          placeholder="SWIFT / BIC"
          value={form.bankDetails.swiftCode}
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
            className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
          {form.id ? "Update Supplier" : "Add Supplier"}
        </Button>
        <Button
          onClick={() => {
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
            onCancel();
          }}
          className="bg-slate-600 hover:bg-slate-700 text-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
