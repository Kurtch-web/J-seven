// src/pages/N.AdminDashboard/QuotationForm/RecipientForm.tsx

import { Input } from "@/components/ui/input";

interface RecipientFormProps {
  recipient: {
    toCompany: string;
    tin: string;
    businessStyle: string;
    address: string;
    forProject: string;
    forLocation: string;
  };
  onChange: (
    field: keyof RecipientFormProps["recipient"],
    value: string
  ) => void;
}

export default function RecipientForm({
  recipient,
  onChange,
}: RecipientFormProps) {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
      <h2 className="text-lg font-semibold mb-4">Recipient Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - To */}
        <div>
          <h3 className="text-sm font-semibold mb-2">To:</h3>
          <div className="space-y-3">
            <Input
              placeholder="Company / Client Name"
              value={recipient.toCompany}
              onChange={(e) => onChange("toCompany", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
            <Input
              placeholder="TIN"
              value={recipient.tin}
              onChange={(e) => onChange("tin", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
            <Input
              placeholder="Business Style"
              value={recipient.businessStyle}
              onChange={(e) => onChange("businessStyle", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
            <Input
              placeholder="Address"
              value={recipient.address}
              onChange={(e) => onChange("address", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
          </div>
        </div>

        {/* Right side - For */}
        <div>
          <h3 className="text-sm font-semibold mb-2">For:</h3>
          <div className="space-y-3">
            <Input
              placeholder="Project / Work Description"
              value={recipient.forProject}
              onChange={(e) => onChange("forProject", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
            <Input
              placeholder="Location"
              value={recipient.forLocation}
              onChange={(e) => onChange("forLocation", e.target.value)}
              className="bg-slate-900 border-slate-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
