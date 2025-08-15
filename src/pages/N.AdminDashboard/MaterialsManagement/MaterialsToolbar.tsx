// pages/N.AdminDashboard/MaterialsManagement/MaterialsToolbar.tsx

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface MaterialsToolbarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onAdd: () => void;
  onBulkDelete: () => void;
  selectedCount: number;
}

export default function MaterialsToolbar({
  searchTerm,
  setSearchTerm,
  onAdd,
  onBulkDelete,
  selectedCount,
}: MaterialsToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
      {/* Search */}
      <Input
        placeholder="Search materials..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-64"
      />

      {/* Actions */}
      <div className="flex gap-2">
        {selectedCount > 0 && (
          <Button
            variant="destructive"
            onClick={onBulkDelete}
            className="flex items-center gap-1"
          >
            <Trash2 size={16} />
            Delete ({selectedCount})
          </Button>
        )}
        <Button onClick={onAdd} className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1">
          <Plus size={16} />
          Add Material
        </Button>
      </div>
    </div>
  );
}
