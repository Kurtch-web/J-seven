// src/pages/N.AdminDashboard/QuotationForm/TermsConditions.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface TermsConditionsProps {
  terms: string[];
  setTerms: React.Dispatch<React.SetStateAction<string[]>>;
  total: number;
  labor: number;
  vat: number;
  invoiceTotal: number;
}

export default function TermsConditions({
  terms,
  setTerms,
  total,
  labor,
  vat,
  invoiceTotal,
}: TermsConditionsProps) {
  const handleTermChange = (index: number, value: string) => {
    const updated = [...terms];
    updated[index] = value;
    setTerms(updated);
  };

  const handleAddTerm = () => {
    setTerms([...terms, "New term..."]);
  };

  const handleRemoveTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>

      {/* Terms List */}
      <div className="space-y-3">
        {terms.map((term, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={term}
              onChange={(e) => handleTermChange(index, e.target.value)}
              className="bg-slate-900 border-slate-700 flex-1"
              placeholder={`Term ${index + 1}`}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleRemoveTerm(index)}
              className="text-red-500 hover:bg-red-500/10"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}

        <Button
          onClick={handleAddTerm}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-slate-600"
        >
          <Plus size={16} /> Add Term
        </Button>
      </div>

      {/* Totals Summary */}
      <div className="mt-8 border-t border-slate-700 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">TOTAL</span>
              <span className="text-right">₱ {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">LABOR</span>
              <span className="text-right">₱ {labor.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">VAT 12%</span>
              <span className="text-right">₱ {vat.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-lg border border-slate-700 font-bold text-blue-400">
            <span>INVOICE TOTAL</span>
            <span>₱ {invoiceTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
