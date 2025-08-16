import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2 } from "lucide-react";
import type { Client, Address } from "./types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Client | null;
  isEditing: boolean;
  onSave: (data: Client) => void;
};

const emptyAddress: Address = { street: "", city: "", state: "", postalCode: "" };

export default function ClientForm({ open, onOpenChange, initialData, isEditing, onSave }: Props) {
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

  // ✅ Fix: reset form correctly based on mode
  useEffect(() => {
    if (isEditing && initialData) {
      setForm(initialData);
    } else if (!isEditing) {
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
    }
  }, [initialData, isEditing]);

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

  const removeShippingAddress = (index: number) => {
    setForm((prev) => ({
      ...prev,
      shippingAddresses: prev.shippingAddresses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!form.businessName.trim()) return alert("Business Name is required.");
    if (!form.email.trim()) return alert("Email is required.");
    if (!form.phone.trim()) return alert("Phone is required.");

    const dateAdded = isEditing
      ? form.dateAdded || new Date().toLocaleDateString("en-US")
      : new Date().toLocaleDateString("en-US");

    onSave({ ...form, dateAdded });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 text-white border border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Client" : "Add New Client"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 font-manrope text-sm">
          {/* Logo */}
          <div>
            <label className="block mb-1 text-slate-300">Logo</label>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
              {form.logo ? (
                <img src={form.logo} alt="logo preview" className="mx-auto h-24 object-contain mb-2 rounded" />
              ) : (
                <Upload className="mx-auto mb-2 text-slate-400" size={32} />
              )}
              <Input type="file" accept="image/*" onChange={handleLogoUpload} />
            </div>
          </div>

          {/* Business Name */}
          <div>
            <label className="block mb-1 text-slate-300">Business Name</label>
            <Input
              value={form.businessName}
              onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
              className="bg-slate-900 border-slate-600"
            />
          </div>

          {/* Email + Phone */}
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

          {/* Tax Info */}
          <div>
            <h4 className="text-sm text-slate-200 pb-2 border-b border-slate-700 font-semibold">Tax Information</h4>
            <label className="block mb-1 text-slate-300 mt-2">VAT Number</label>
            <Input
              value={form.vatNumber || ""}
              onChange={(e) => setForm((p) => ({ ...p, vatNumber: e.target.value }))}
              className="bg-slate-900 border-slate-600"
            />
          </div>

          {/* Main Address */}
          <div>
            <h4 className="text-sm text-slate-200 pb-2 border-b border-slate-700 font-semibold">Main Address</h4>
            <label className="block mb-1 text-slate-300 mt-2">Street Address</label>
            <Input
              value={form.address.street}
              onChange={(e) => updateMainAddress("street", e.target.value)}
              className="bg-slate-900 border-slate-600 mb-2"
            />
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block mb-1 text-slate-300">City</label>
                <Input
                  value={form.address.city}
                  onChange={(e) => updateMainAddress("city", e.target.value)}
                  className="bg-slate-900 border-slate-600"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-300">State</label>
                <Input
                  value={form.address.state}
                  onChange={(e) => updateMainAddress("state", e.target.value)}
                  className="bg-slate-900 border-slate-600"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-300">Postal Code</label>
                <Input
                  value={form.address.postalCode}
                  onChange={(e) => updateMainAddress("postalCode", e.target.value)}
                  className="bg-slate-900 border-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Shipping Addresses */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <h4 className="text-sm text-slate-200 font-semibold">Shipping Address(es)</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={addShippingAddress}
                className="text-slate-300 border-slate-600"
              >
                + Add
              </Button>
            </div>
            <div className="space-y-3 mt-3">
              {form.shippingAddresses.map((addr, idx) => (
                <div key={idx} className="border rounded p-3 border-slate-600 relative">
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeShippingAddress(idx)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                    title="Remove this address"
                  >
                    <Trash2 size={16} />
                  </button>

                  <label className="block mb-1 text-slate-300">Street Address</label>
                  <Input
                    value={addr.street}
                    onChange={(e) => updateShippingAddress(idx, "street", e.target.value)}
                    className="bg-slate-900 border-slate-600 mb-2"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block mb-1 text-slate-300">City</label>
                      <Input
                        value={addr.city}
                        onChange={(e) => updateShippingAddress(idx, "city", e.target.value)}
                        className="bg-slate-900 border-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-slate-300">State</label>
                      <Input
                        value={addr.state}
                        onChange={(e) => updateShippingAddress(idx, "state", e.target.value)}
                        className="bg-slate-900 border-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-slate-300">Postal Code</label>
                      <Input
                        value={addr.postalCode}
                        onChange={(e) => updateShippingAddress(idx, "postalCode", e.target.value)}
                        className="bg-slate-900 border-slate-600"
                      />
                    </div>
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
              <Input type="file" accept="image/*" multiple onChange={handleAttachmentsUpload} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600">
              {isEditing ? "Update Client" : "Add Client"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-500 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
