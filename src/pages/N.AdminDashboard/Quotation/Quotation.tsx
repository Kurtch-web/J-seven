// src/pages/N.AdminDashboard/Quotation.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import QuotationForm, { type QuotationData } from "./QuotationForm";
import QuotationPreview from "./QuotationPreview";
import QuotationTable, { type Quotation } from "./QuotationTable";

// Mock data
const mockQuotations: Quotation[] = [
  {
    id: "QTN-001",
    client: "Mega Supplies",
    project: "Electrical Works @ Laguna",
    date: "2025-08-05",
    amount: 2000,
    status: "Accepted",
  },
  {
    id: "QTN-002",
    client: "TechnoMart",
    project: "Warehouse Wiring",
    date: "2025-08-12",
    amount: 1500,
    status: "Draft",
  },
  {
    id: "QTN-003",
    client: "BuildFast",
    project: "Residential Project",
    date: "2025-08-18",
    amount: 950,
    status: "Rejected",
  },
];

export default function Quotation() {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingData, setEditingData] = useState<QuotationData | undefined>(
    undefined
  );

  const filtered = mockQuotations.filter((q) =>
    [q.client, q.project, q.id].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  // --- Handlers ---
  const handleNew = () => {
    setEditingData(undefined); // blank form
    setFormOpen(true);
  };

  const handleEdit = (q: Quotation) => {
    const data: QuotationData = {
      recipient: {
        toCompany: q.client,
        tin: "",
        businessStyle: "",
        address: "",
        forProject: q.project,
        forLocation: "",
      },
      generalReq: [],
      materials: [],
      terms: [],
      transactionNotes: "",
      notes: [""],
      signatories: {
        operationsManager: "Engr. Jimmy Catipay",
        conforme: "",
      },
    };
    setEditingData(data);
    setFormOpen(true);
  };

  const buildPreviewData = (q: Quotation) => {
    const total = q.amount;
    const vat = total * 0.12;
    const invoiceTotal = total + vat;

    return {
      recipient: {
        toCompany: q.client,
        tin: "",
        businessStyle: "",
        address: "",
        forProject: q.project,
        forLocation: "",
      },
      generalReq: [],
      materials: [],
      terms: [],
      transactionNotes: "",
      notes: [],
      signatories: {
        operationsManager: "",
        conforme: "",
      },
      totals: {
        total,
        labor: 0,
        vat,
        invoiceTotal,
      },
    };
  };

  return (
    <div className="w-full px-6 space-y-6">
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quotations</h2>
        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <Button
              className="bg-red-700"
              size="sm"
              variant="destructive"
              onClick={() => {
                alert(`Deleting quotations: ${selectedIds.join(", ")}`);
                // later replace with actual delete logic
                setSelectedIds([]);
              }}
            >
              Delete Selected
            </Button>
          )}
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleNew}
          >
            <Plus size={16} className="mr-2" /> New Quotation
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <Input
          placeholder="Search by Client, Project, or Quote No."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-slate-800 border border-slate-700 text-white"
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-1"
          >
            <Download size={16} /> Export CSV
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-1"
          >
            <Download size={16} /> Export PDF
          </Button>
        </div>
      </div>

      {/* Quotation Table */}
      <QuotationTable
        quotations={filtered}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onView={(q) => {
          setSelectedQuote(q);
          setPreviewOpen(true);
        }}
        onEdit={handleEdit}
        onDelete={(id) => {
          alert(`Deleting quotation ${id}`);
        }}
      />

      {/* Form Modal (New/Edit) */}
      {formOpen && (
        <QuotationForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          initialData={editingData}
        />
      )}

      {/* Preview Modal */}
      {previewOpen && selectedQuote && (
        <QuotationPreview
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          data={buildPreviewData(selectedQuote)}
        />
      )}
    </div>
  );
}
