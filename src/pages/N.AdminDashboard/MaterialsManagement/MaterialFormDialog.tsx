import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import type { Material, MaterialStatus } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: Material | null;
  onSave: (material: Material) => void;
  categories: string[];
}

const STATUSES: MaterialStatus[] = ["Approved", "Pending", "Rejected"];

export default function MaterialFormDialog({
  open,
  onOpenChange,
  material,
  onSave,
  categories,
}: Props) {
  const [form, setForm] = useState<Material>({
    id: 0,
    name: "",
    spec: "",
    price: "",
    supplier: "",
    category: "",
    image: "",
    stockDate: new Date().toISOString().split("T")[0],
    creator: "",
    status: "Pending",
    availableStock: 0,
  });

  useEffect(() => {
    if (material) {
      setForm(material);
    } else {
      setForm({
        id: 0,
        name: "",
        spec: "",
        price: "",
        supplier: "",
        category: "",
        image: "",
        stockDate: new Date().toISOString().split("T")[0],
        creator: "",
        status: "Pending",
        availableStock: 0,
      });
    }
  }, [material]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "availableStock" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setForm((prev) => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.spec ||
      !form.price ||
      !form.supplier ||
      !form.category ||
      !form.creator ||
      !form.stockDate
    ) {
      alert("Please fill in all required fields");
      return;
    }
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 text-white border border-slate-700 rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-manrope font-bold">
            {form.id ? "Edit Material" : "Add Material"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm font-manrope">
          {/* Material Name */}
          <div>
            <label className="block text-slate-300 mb-1">Material Name</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-slate-900 border-slate-600"
            />
          </div>

          {/* Specification */}
          <div>
            <label className="block text-slate-300 mb-1">Specification</label>
            <Input
              name="spec"
              value={form.spec}
              onChange={handleChange}
              className="bg-slate-900 border-slate-600"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-slate-300 mb-1">Price</label>
            <Input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="bg-slate-900 border-slate-600"
            />
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-slate-300 mb-1">Supplier</label>
            <Input
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              className="bg-slate-900 border-slate-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-300 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-900 border border-slate-600"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Available Stock */}
          <div>
            <label className="block text-slate-300 mb-1">Available Stock</label>
            <Input
              name="availableStock"
              type="number"
              value={form.availableStock}
              onChange={handleChange}
              className="bg-slate-900 border-slate-600"
            />
          </div>

          {/* Creator */}
          <div>
            <label className="block text-slate-300 mb-1">Creator Name</label>
            <Input
              name="creator"
              value={form.creator}
              onChange={handleChange}
              className="bg-slate-900 border-slate-600"
              disabled={!!form.id}
            />
          </div>

          {/* Stock Date */}
          <div>
            <label className="block text-slate-300 mb-1">Stock Date</label>
            <Input
              type="date"
              name="stockDate"
              value={form.stockDate}
              onChange={handleChange}
              className="bg-slate-900 border-slate-600"
              disabled={!!form.id}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-slate-300 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-900 border border-slate-600"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-slate-300 mb-1">Material Image</label>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
              {form.image ? (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mx-auto h-24 object-contain mb-2 rounded"
                />
              ) : (
                <Upload className="mx-auto mb-2 text-slate-400" size={32} />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="bg-slate-900 border-slate-600"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600">
              {form.id ? "Update" : "Add"}
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
