import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MaterialsTable from "./MaterialsTable";
import MaterialFormDialog from "./MaterialFormDialog";
import type { Material } from "./types";

export default function MaterialsManager() {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: "Plywood",
      spec: "3/4 x 4x8",
      price: "₱980",
      supplier: "WoodWorks",
      category: "Wood",
      availableStock: 120,
      stockDate: "2025-08-05",
      creator: "Admin John",
      status: "Approved",
      image: "",
    },
    {
      id: 2,
      name: "Cement",
      spec: "40kg",
      price: "₱260",
      supplier: "CemCo",
      category: "Construction",
      availableStock: 300,
      stockDate: "2025-08-06",
      creator: "Admin Sarah",
      status: "Pending",
      image: "",
    },
  ]);

  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const categories = ["Wood", "Construction", "Metal", "Electrical Supply", "Others"];

  const handleAddClick = () => {
    setSelectedMaterial(null);
    setShowModal(true);
  };

  const handleEditClick = (mat: Material) => {
    setSelectedMaterial(mat);
    setShowModal(true);
  };

  const handleSave = (material: Material) => {
    if (material.id) {
      // Update
      setMaterials((prev) => prev.map((m) => (m.id === material.id ? material : m)));
    } else {
      // Create new
      setMaterials((prev) => [...prev, { ...material, id: Date.now() }]);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this material?")) {
      setMaterials((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm("Delete selected materials?")) {
      setMaterials((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
      setSelectedIds([]);
    }
  };

  const filteredMaterials = materials.filter((mat) =>
    Object.values(mat)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="font-manrope">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Materials Management</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
          {selectedIds.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete Selected
            </Button>
          )}
          <Button
            onClick={handleAddClick}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus size={16} className="mr-2" />
            Add Material
          </Button>
        </div>
      </div>

      <MaterialsTable
        materials={filteredMaterials}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      <MaterialFormDialog
        open={showModal}
        onOpenChange={setShowModal}
        material={selectedMaterial}
        onSave={handleSave}
        categories={categories}
      />
    </section>
  );
}
