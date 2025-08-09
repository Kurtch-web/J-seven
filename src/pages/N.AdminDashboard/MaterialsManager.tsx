import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, ArrowUp, ArrowDown, Upload } from "lucide-react";

type Material = {
  id: number;
  name: string;
  spec: string;
  price: string;
  supplier: string;
  category: string;
  image?: string;
  stockDate: string; // YYYY-MM-DD format
};

export default function MaterialsManager() {
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, name: "Plywood", spec: "3/4 x 4x8", price: "₱980", supplier: "WoodWorks", category: "Wood", stockDate: "2025-08-05" },
    { id: 2, name: "Cement", spec: "40kg", price: "₱260", supplier: "CemCo", category: "Construction", stockDate: "2025-08-06" },
    { id: 3, name: "Rebar", spec: "#10", price: "₱400", supplier: "SteelSupplies", category: "Metal", stockDate: "2025-08-07" },
  ]);

  const [form, setForm] = useState<Material>({
    id: 0,
    name: "",
    spec: "",
    price: "",
    supplier: "",
    category: "",
    image: "",
    stockDate: new Date().toISOString().split("T")[0],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Material | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const categories = ["Wood", "Construction", "Metal", "Electrical Supply", "Others"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    resetForm();
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (mat: Material) => {
    setForm(mat);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.spec || !form.price || !form.supplier || !form.category || !form.stockDate) {
      alert("Please fill in all required fields, including stock date.");
      return;
    }

    if (isEditing) {
      setMaterials(materials.map((m) => (m.id === form.id ? form : m)));
    } else {
      setMaterials([...materials, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this material?")) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  const resetForm = () => {
    setForm({
      id: 0,
      name: "",
      spec: "",
      price: "",
      supplier: "",
      category: "",
      image: "",
      stockDate: new Date().toISOString().split("T")[0],
    });
    setIsEditing(false);
  };

  const handleSort = (key: keyof Material) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedMaterials = [...materials]
    .filter((mat) =>
      Object.values(mat)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (sortKey === "stockDate") {
        return sortOrder === "asc"
          ? new Date(a.stockDate).getTime() - new Date(b.stockDate).getTime()
          : new Date(b.stockDate).getTime() - new Date(a.stockDate).getTime();
      }
      const valA = a[sortKey]?.toString().toLowerCase() || "";
      const valB = b[sortKey]?.toString().toLowerCase() || "";
      return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <section className="font-manrope">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-white">Materials Management</h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
          <Button onClick={handleAddClick} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus size={16} className="mr-2" />
            Add Material
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-700 rounded">
        <table className="w-full text-sm text-white">
          <thead className="bg-slate-700 text-left">
            <tr>
              {[
                { key: "name", label: "Material Name" },
                { key: "spec", label: "Specification" },
                { key: "price", label: "Price" },
                { key: "supplier", label: "Supplier" },
                { key: "category", label: "Category" },
                { key: "stockDate", label: "Stock Date" },
              ].map(({ key, label }) => (
                <th key={key} className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort(key as keyof Material)}>
                    {label}
                    {sortKey === key ? sortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} /> : null}
                  </div>
                </th>
              ))}
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedMaterials.map((mat) => (
              <tr key={mat.id} className="border-t border-slate-600 hover:bg-slate-800">
                <td className="p-3">{mat.name}</td>
                <td className="p-3">{mat.spec}</td>
                <td className="p-3">{mat.price}</td>
                <td className="p-3">{mat.supplier}</td>
                <td className="p-3">{mat.category}</td>
                <td className="p-3">{formatDate(mat.stockDate)}</td>
                <td className="p-3 space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                    onClick={() => handleEditClick(mat)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => handleDelete(mat.id)}
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
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 w-full max-w-lg">
            <h3 className="text-white font-bold text-md mb-4">
              {isEditing ? "Edit Material" : "Add New Material"}
            </h3>
            <div className="space-y-4">
              <input name="name" placeholder="Material Name" value={form.name} onChange={handleInputChange} className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white" />
              <input name="spec" placeholder="Specification" value={form.spec} onChange={handleInputChange} className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white" />
              <input name="price" placeholder="Price" value={form.price} onChange={handleInputChange} className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white" />
              <input name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleInputChange} className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white" />
              <select name="category" value={form.category} onChange={handleInputChange} className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input type="date" name="stockDate" value={form.stockDate} onChange={handleInputChange} className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white" />
              {/* Image Upload */}
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                {form.image ? (
                  <img src={form.image} alt="Material" className="mx-auto h-24 object-contain mb-2" />
                ) : (
                  <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500" />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                  {isEditing ? "Update Material" : "Add Material"}
                </Button>
                <Button onClick={() => { setShowModal(false); resetForm(); }} className="bg-slate-600 hover:bg-slate-700 text-white">
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
