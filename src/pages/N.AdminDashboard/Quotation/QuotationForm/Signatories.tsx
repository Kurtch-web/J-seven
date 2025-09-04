// src/pages/N.AdminDashboard/QuotationForm/Signatories.tsx
import { Input } from "@/components/ui/input";

interface SignatoriesProps {
  signatories: {
    operationsManager: string;
    conforme: string;
  };
  onChange: (
    field: keyof SignatoriesProps["signatories"],
    value: string
  ) => void;
}

export default function Signatories({
  signatories,
  onChange,
}: SignatoriesProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Signatories</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Operations Manager */}
        <div className="flex flex-col items-center space-y-3">
          <Input
            placeholder="Operations Manager Name"
            value={signatories.operationsManager}
            onChange={(e) => onChange("operationsManager", e.target.value)}
            className="bg-slate-900 border-slate-700 text-center"
          />
          <p className="text-sm text-slate-400">Operations Manager</p>
        </div>

        {/* Conforme */}
        <div className="flex flex-col items-center space-y-3">
          <Input
            placeholder="Conforme Name"
            value={signatories.conforme}
            onChange={(e) => onChange("conforme", e.target.value)}
            className="bg-slate-900 border-slate-700 text-center"
          />
          <p className="text-sm text-slate-400">Conforme</p>
        </div>
      </div>
    </div>
  );
}
