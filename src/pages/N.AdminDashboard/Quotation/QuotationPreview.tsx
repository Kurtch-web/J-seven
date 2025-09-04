// src/pages/N.AdminDashboard/QuotationPreview.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuotationPreviewProps {
  open: boolean;
  onClose: () => void;
  data: {
    recipient: {
      toCompany: string;
      tin: string;
      businessStyle: string;
      address: string;
      forProject: string;
      forLocation: string;
    };
    generalReq: {
      description: string;
      quantity: number;
      unit: string;
      unitCost: number;
    }[];
    materials: {
      description: string;
      quantity: number;
      unit: string;
      unitCost: number;
    }[];
    terms: string[];
    transactionNotes: string; // ✅ add this
    notes: string[];
    signatories: {
      operationsManager: string;
      conforme: string;
    };
    totals: {
      total: number;
      labor: number;
      vat: number;
      invoiceTotal: number;
    };
  };
}

export default function QuotationPreview({
  open,
  onClose,
  data,
}: QuotationPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-900 text-white border border-slate-700 rounded-lg">
        <DialogHeader>
          <DialogTitle>Quotation Preview</DialogTitle>
        </DialogHeader>

        {/* Scrollable content */}
        <ScrollArea className="h-[70vh] pr-4">
          {/* Recipient */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Recipient</h3>
            <p>
              <strong>To:</strong> {data.recipient.toCompany}
            </p>
            <p>
              <strong>TIN:</strong> {data.recipient.tin}
            </p>
            <p>
              <strong>Business Style:</strong> {data.recipient.businessStyle}
            </p>
            <p>
              <strong>Address:</strong> {data.recipient.address}
            </p>
            <p>
              <strong>For Project:</strong> {data.recipient.forProject}
            </p>
            <p>
              <strong>Location:</strong> {data.recipient.forLocation}
            </p>
          </div>

          {/* General Requirements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              A. General Requirements
            </h3>
            <table className="w-full text-sm border-collapse border border-slate-700">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-2 border border-slate-700">Description</th>
                  <th className="p-2 border border-slate-700">Qty</th>
                  <th className="p-2 border border-slate-700">Unit</th>
                  <th className="p-2 border border-slate-700">Unit Cost</th>
                  <th className="p-2 border border-slate-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.generalReq.map((item, i) => (
                  <tr key={i} className="border-t border-slate-700">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.unit}</td>
                    <td className="p-2">₱ {item.unitCost.toLocaleString()}</td>
                    <td className="p-2">
                      ₱ {(item.quantity * item.unitCost).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Materials */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">B. Materials</h3>
            <table className="w-full text-sm border-collapse border border-slate-700">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-2 border border-slate-700">Description</th>
                  <th className="p-2 border border-slate-700">Qty</th>
                  <th className="p-2 border border-slate-700">Unit</th>
                  <th className="p-2 border border-slate-700">Unit Cost</th>
                  <th className="p-2 border border-slate-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.materials.map((item, i) => (
                  <tr key={i} className="border-t border-slate-700">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.unit}</td>
                    <td className="p-2">₱ {item.unitCost.toLocaleString()}</td>
                    <td className="p-2">
                      ₱ {(item.quantity * item.unitCost).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Terms */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Terms & Conditions</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {data.terms.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {data.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>

          {/* Totals */}
          <div className="mt-6 border-t border-slate-700 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">TOTAL</span>
                <span>₱ {data.totals.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">LABOR</span>
                <span>₱ {data.totals.labor.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">VAT 12%</span>
                <span>₱ {data.totals.vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-400">
                <span>INVOICE TOTAL</span>
                <span>₱ {data.totals.invoiceTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Signatories */}
          <div className="mt-6 flex justify-between text-sm">
            <div>
              <p className="font-semibold">
                {data.signatories.operationsManager}
              </p>
              <p className="text-slate-400">Operations Manager</p>
            </div>
            <div>
              <p className="font-semibold">{data.signatories.conforme}</p>
              <p className="text-slate-400">Conforme</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
