import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

    const dateAdded = form.dateAdded || new Date().toLocaleDateString("en-US");
    onSave({ ...form, dateAdded });
  };

  return (
    <div className="space-y-6 font-manrope text-sm text-white">
      {/* Logo Upload */}
      <div>
        <label className="block mb-1 text-slate-300">Logo</label>
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
          <Input type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <label className="block mb-1 text-slate-300">Business Name</label>
        <Input
          value={form.businessName}
          onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
          className="bg-slate-900 border-slate-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-slate-300">Email</label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="bg-slate-900 border-slate-600"
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-300">Phone Number</label>
          <Input
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="bg-slate-900 border-slate-600"
          />
        </div>
      </div>

      {/* VAT */}
      <div>
        <label className="block mb-1 text-slate-300">VAT Number</label>
        <Input
          value={form.vatNumber || ""}
          onChange={(e) => setForm((p) => ({ ...p, vatNumber: e.target.value }))}
          className="bg-slate-900 border-slate-600"
        />
      </div>

      {/* Address */}
      <div>
        <h4 className="text-sm text-slate-200 pb-2 border-b border-slate-700 font-semibold">
          Address
        </h4>
        <br />
        <label className="block mb-1 text-slate-300">Street Address</label>
        <Input
          value={form.address.street}
          onChange={(e) => updateAddress("street", e.target.value)}
          className="bg-slate-900 border-slate-600 mb-2"
        />
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block mb-1 text-slate-300">City</label>
            <Input
              value={form.address.city}
              onChange={(e) => updateAddress("city", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
          </div>
          <div>
            <label className="block mb-1 text-slate-300">State</label>
            <Input
              value={form.address.state}
              onChange={(e) => updateAddress("state", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
          </div>
          <div>
            <label className="block mb-1 text-slate-300">Postal Code</label>
            <Input
              value={form.address.postalCode}
              onChange={(e) => updateAddress("postalCode", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div>
        <h4 className="text-sm text-slate-200 pb-2 border-b border-slate-700 font-semibold">
          Bank Details
        </h4>
        <br />
        <label className="block mb-1 text-slate-300">Bank Name</label>
        <Input
          value={form.bankDetails.bankName}
          onChange={(e) => updateBankDetails("bankName", e.target.value)}
          className="bg-slate-900 border-slate-600 mb-2"
        />
        <label className="block mb-1 text-slate-300">Account Name</label>
        <Input
          value={form.bankDetails.accountName}
          onChange={(e) => updateBankDetails("accountName", e.target.value)}
          className="bg-slate-900 border-slate-600 mb-2"
        />
        <label className="block mb-1 text-slate-300">Account Number</label>
        <Input
          value={form.bankDetails.accountNumber}
          onChange={(e) => updateBankDetails("accountNumber", e.target.value)}
          className="bg-slate-900 border-slate-600 mb-2"
        />
        <label className="block mb-1 text-slate-300">SWIFT / BIC</label>
        <Input
          value={form.bankDetails.swiftCode}
          onChange={(e) => updateBankDetails("swiftCode", e.target.value)}
          className="bg-slate-900 border-slate-600"
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
          <Input type="file" accept="image/*" multiple onChange={handleAttachmentsUpload} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
          {form.id ? "Update Supplier" : "Add Supplier"}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-slate-500 text-slate-300 hover:bg-slate-700"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
