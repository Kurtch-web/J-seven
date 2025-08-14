// pages/N.AdminDashboard/QuickActions.tsx
import { FileText, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type Props = {
  onSelect: (section: string) => void;
};

export default function QuickActions({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {/* Quotation Card */}
      <Card className="bg-slate-800 border-slate-700 hover:border-orange-500 transition">
        <CardHeader className="flex flex-col items-center text-center">
          <FileText size={40} className="text-orange-400 mb-3" />
          <CardTitle className="text-white">Create Quotation</CardTitle>
          <CardDescription className="text-slate-400">
            Quickly prepare and send a quotation to a client.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            onClick={() => onSelect("quotation")}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Go to Quotation Tool
          </Button>
        </CardContent>
      </Card>

      {/* Invoice Card */}
      <Card className="bg-slate-800 border-slate-700 hover:border-orange-500 transition">
        <CardHeader className="flex flex-col items-center text-center">
          <Receipt size={40} className="text-orange-400 mb-3" />
          <CardTitle className="text-white">Create Invoice</CardTitle>
          <CardDescription className="text-slate-400">
            Generate and send invoices to your clients.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            onClick={() => onSelect("invoices")}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Go to Invoices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
