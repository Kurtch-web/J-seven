import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

type Material = {
  id: number;
  name: string;
  spec: string;
  price: string;
  supplier: string;
};

export default function MaterialsManager() {
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, name: "Plywood", spec: "3/4 x 4x8", price: "₱980", supplier: "WoodWorks" },
    { id: 2, name: "Cement", spec: "40kg", price: "₱260", supplier: "CemCo" },
    { id: 3, name: "Rebar", spec: "#10", price: "₱400", supplier: "SteelSupplies" },
  ]);

  const [form, setForm] = useState<Material>({
    id: 0,
    name: "",
    spec: "",
    price: "",
    supplier: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Material | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const newMaterial = { ...form, id: Date.now() };
    setMaterials([...materials, newMaterial]);
    resetForm();
  };

  const handleEdit = (mat: Material) => {
    setForm(mat);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdate = () => {
    setMaterials(materials.map((m) => (m.id === form.id ? form : m)));
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this material?")) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  const resetForm = () => {
    setForm({ id: 0, name: "", spec: "", price: "", supplier: "" });
    setIsEditing(false);
    setShowForm(false);
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
      const valA = a[sortKey].toString().toLowerCase();
      const valB = b[sortKey].toString().toLowerCase();
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  return (
    <section className="font-manrope">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-white">Manage Materials</h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
          <Button
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
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
              ].map(({ key, label }) => (
                <th key={key} className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort(key as keyof Material)}>
                    {label}
                    {sortKey === key ? (
                      sortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    ) : null}
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
                <td className="p-3 space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                    onClick={() => handleEdit(mat)}
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

      {/* Form */}
      {showForm && (
        <div className="bg-slate-800 mt-10 p-6 rounded-lg border border-slate-700 max-w-xl">
          <h3 className="text-white font-bold text-md mb-4">
            {isEditing ? "Edit Material" : "Add New Material"}
          </h3>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Material Name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
            />
            <input
              name="spec"
              placeholder="Specification"
              value={form.spec}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
            />
            <input
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
            />
            <input
              name="supplier"
              placeholder="Supplier"
              value={form.supplier}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-slate-900 border border-slate-600 text-white"
            />
            <div className="flex gap-3">
              <Button
                onClick={isEditing ? handleUpdate : handleAdd}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isEditing ? "Update Material" : "Add Material"}
              </Button>
              <Button
                onClick={resetForm}
                className="bg-slate-600 hover:bg-slate-700 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
