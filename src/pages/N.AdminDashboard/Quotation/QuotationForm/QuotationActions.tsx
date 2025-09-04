// src/pages/N.AdminDashboard/QuotationForm/QuotationActions.tsx
import { Button } from "@/components/ui/button";
import { Save, Eye, FileDown, FileText } from "lucide-react";

interface QuotationActionsProps {
  onSave: () => void;
  onPreview: () => void;
  onExportPDF: () => void;
  onExportCSV: () => void;
}

export default function QuotationActions({
  onSave,
  onPreview,
  onExportPDF,
  onExportCSV,
}: QuotationActionsProps) {
  return (
    <div className="flex justify-end gap-3">
      {/* Save Draft */}
      <Button
        variant="secondary"
        className="bg-slate-600 hover:bg-slate-500"
        onClick={onSave}
      >
        <Save className="w-4 h-4 mr-2" />
        Save Draft
      </Button>

      {/* Preview */}
      <Button
        variant="outline"
        className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
        onClick={onPreview}
      >
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </Button>

      {/* Export PDF */}
      <Button
        className="bg-red-600 hover:bg-red-700 text-white"
        onClick={onExportPDF}
      >
        <FileText className="w-4 h-4 mr-2" />
        Export PDF
      </Button>

      {/* Export CSV */}
      <Button
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={onExportCSV}
      >
        <FileDown className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
    </div>
  );
}
