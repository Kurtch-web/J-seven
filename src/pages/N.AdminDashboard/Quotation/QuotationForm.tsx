// src/pages/N.AdminDashboard/QuotationForm.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import CompanyHeader from "./QuotationForm/CompanyHeader";
import RecipientForm from "./QuotationForm/RecipientForm";
import GeneralRequirements from "./QuotationForm/GeneralRequirements";
import MaterialsSection from "./QuotationForm/MaterialsSection";
import TermsConditions from "./QuotationForm/TermsConditions";
import TransactionDetails from "./QuotationForm/TransactionDetails";
import NotesSection from "./QuotationForm/NotesSection";
import Signatories from "./QuotationForm/Signatories";
import QuotationActions from "./QuotationForm/QuotationActions";

// 🟢 Quotation Data Type
export interface QuotationData {
  recipient: {
    toCompany: string;
    tin: string;
    businessStyle: string;
    address: string;
    forProject: string;
    forLocation: string;
  };
  generalReq: {
    id: number;
    description: string;
    quantity: number;
    unit: string;
    unitCost: number;
  }[];
  materials: {
    id: number;
    description: string;
    quantity: number;
    unit: string;
    unitCost: number;
  }[];
  terms: string[];
  transactionNotes: string;
  notes: string[];
  signatories: {
    operationsManager: string;
    conforme: string;
  };
}

interface QuotationFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: QuotationData;
}

export default function QuotationForm({
  open,
  onClose,
  initialData,
}: QuotationFormProps) {
  // 🟢 NEW: header color state
  const [headerColor, setHeaderColor] = useState<string>(
    "#0f172a" // default dark slate
  );

  // Recipient
  const [recipient, setRecipient] = useState(
    initialData?.recipient || {
      toCompany: "",
      tin: "",
      businessStyle: "",
      address: "",
      forProject: "",
      forLocation: "",
    }
  );

  // General Requirements
  const [generalReqs, setGeneralReqs] = useState(
    initialData?.generalReq || [
      {
        id: 1,
        description: "Mobilization/Demobilization",
        quantity: 1,
        unit: "lot",
        unitCost: 5000,
      },
      {
        id: 2,
        description: "Platform Support, Tools and Equipment",
        quantity: 1,
        unit: "lot",
        unitCost: 5000,
      },
      {
        id: 3,
        description: "Project Management",
        quantity: 1,
        unit: "lot",
        unitCost: 5000,
      },
    ]
  );

  // Materials
  const [materials, setMaterials] = useState(
    initialData?.materials || [
      {
        id: 1,
        description: "Ming Philflex THHN Wire 2.0mm² #14 (150mtrs/box)",
        quantity: 5,
        unit: "pcs",
        unitCost: 1500,
      },
    ]
  );

  // Terms
  const [terms, setTerms] = useState<string[]>(
    initialData?.terms || [
      "50% Downpayment",
      "40% Progress Billing",
      "10% Upon Completion",
      "Completion - 7 Working Days",
      "Warranty - 1 Year",
    ]
  );

  // Other states
  const [transactionNotes, setTransactionNotes] = useState(
    initialData?.transactionNotes || ""
  );
  const [notes, setNotes] = useState<string[]>(initialData?.notes || [""]);
  const [signatories, setSignatories] = useState(
    initialData?.signatories || {
      operationsManager: "Engr. Jimmy Catipay",
      conforme: "",
    }
  );

  // Handlers
  const handleRecipientChange = (
    field: keyof typeof recipient,
    value: string
  ) => setRecipient((prev) => ({ ...prev, [field]: value }));

  const updateGeneralReq = (
    id: number,
    field: string,
    value: string | number
  ) => {
    setGeneralReqs((prev) =>
      prev.map((req) => (req.id === id ? { ...req, [field]: value } : req))
    );
  };

  const updateMaterial = (
    id: number,
    field: string,
    value: string | number
  ) => {
    setMaterials((prev) =>
      prev.map((mat) => (mat.id === id ? { ...mat, [field]: value } : mat))
    );
  };

  const addMaterial = () => {
    const newId = materials.length + 1;
    setMaterials([
      ...materials,
      { id: newId, description: "", quantity: 1, unit: "", unitCost: 0 },
    ]);
  };

  const removeMaterial = (id: number) => {
    setMaterials((prev) => prev.filter((mat) => mat.id !== id));
  };

  // Totals
  const generalReqTotal = generalReqs.reduce(
    (sum, item) => sum + item.quantity * item.unitCost,
    0
  );
  const materialsTotal = materials.reduce(
    (sum, item) => sum + item.quantity * item.unitCost,
    0
  );
  const total = generalReqTotal + materialsTotal;
  const labor = generalReqTotal;
  const vat = total * 0.12;
  const invoiceTotal = total + vat;

  // color presets
  const PRESETS = ["#0f172a", "#0ea5a3", "#fb923c", "#ef4444", "#2563eb"];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-slate-900 text-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {initialData ? "Edit Quotation" : "Create Quotation"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Company Header (dynamic color) */}
          <CompanyHeader
            headerColor={headerColor}
            date={new Date().toLocaleDateString()}
            quoteNo="AUTO-0001"
          />

          {/* Color Picker */}
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-3">Header Color</h3>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
                className="w-10 h-10 p-0 border-0"
              />
              <Input
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
                className="max-w-[120px] bg-slate-900 border-slate-700 text-white"
              />
              <div className="flex items-center gap-2 ml-auto">
                {PRESETS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setHeaderColor(c)}
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Rest of the form sections */}
          <RecipientForm
            recipient={recipient}
            onChange={handleRecipientChange}
          />
          <GeneralRequirements
            items={generalReqs}
            onChange={updateGeneralReq}
          />
          <MaterialsSection
            materials={materials}
            onChange={updateMaterial}
            onAdd={addMaterial}
            onRemove={removeMaterial}
          />
          <TermsConditions
            terms={terms}
            setTerms={setTerms}
            total={total}
            labor={labor}
            vat={vat}
            invoiceTotal={invoiceTotal}
          />
          <TransactionDetails
            transactionNotes={transactionNotes}
            setTransactionNotes={setTransactionNotes}
          />
          <NotesSection notes={notes} setNotes={setNotes} />
          <Signatories
            signatories={signatories}
            onChange={(field, value) =>
              setSignatories((prev) => ({ ...prev, [field]: value }))
            }
          />
          <QuotationActions
            onSave={() => alert("Quotation saved ✅")}
            onPreview={() => alert("Preview Quotation")}
            onExportPDF={() => alert("Exported as PDF")}
            onExportCSV={() => alert("Exported as CSV")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
