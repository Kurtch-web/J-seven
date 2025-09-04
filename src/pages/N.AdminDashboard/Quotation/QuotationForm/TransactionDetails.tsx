// src/pages/N.AdminDashboard/QuotationForm/TransactionDetails.tsx

import { Textarea } from "@/components/ui/textarea";

interface TransactionDetailsProps {
  transactionNotes: string;
  setTransactionNotes: (value: string) => void;
}

export default function TransactionDetails({
  transactionNotes,
  setTransactionNotes,
}: TransactionDetailsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>

      {/* Fixed Payment Method */}
      <div className="mb-4 p-4 rounded-lg bg-slate-900 border border-slate-700">
        <p className="font-medium text-slate-200">Mode of Payment</p>
        <p className="text-slate-400">Cash on Delivery (CoD)</p>
      </div>

      {/* Optional Notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          Additional Instructions
        </label>
        <Textarea
          placeholder="Add any special transaction instructions (optional)..."
          value={transactionNotes}
          onChange={(e) => setTransactionNotes(e.target.value)}
          className="bg-slate-900 border-slate-700"
        />
      </div>
    </div>
  );
}
