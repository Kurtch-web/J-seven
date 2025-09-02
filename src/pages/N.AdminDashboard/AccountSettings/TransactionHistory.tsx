import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";

// Mock data
const invoices = [
  {
    id: "INV-001",
    date: "2025-08-10",
    client: "ABC Corp",
    amount: 1200,
    status: "Paid",
  },
  {
    id: "INV-002",
    date: "2025-08-20",
    client: "QuickBuild Inc",
    amount: 500,
    status: "Cancelled",
  },
];

const quotations = [
  {
    id: "QTN-001",
    date: "2025-08-05",
    client: "Mega Supplies",
    amount: 2000,
    status: "Accepted",
  },
  {
    id: "QTN-002",
    date: "2025-08-12",
    client: "TechnoMart",
    amount: 1500,
    status: "Draft",
  },
  {
    id: "QTN-003",
    date: "2025-08-18",
    client: "BuildFast",
    amount: 950,
    status: "Rejected",
  },
];

export default function TransactionHistory() {
  const [tab, setTab] = useState("invoices");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const renderStatus = (status: string) => {
    switch (status) {
      case "Paid":
      case "Accepted":
        return <Badge className="bg-green-600">{status}</Badge>;
      case "Draft":
        return <Badge className="bg-yellow-600">{status}</Badge>;
      case "Cancelled":
      case "Rejected":
        return <Badge className="bg-red-600">{status}</Badge>;
      default:
        return <Badge className="bg-gray-600">{status}</Badge>;
    }
  };

  const handleExport = (type: string, format: "pdf" | "csv") => {
    alert(`Exporting ${type} as ${format.toUpperCase()}...`);
  };

  const filterData = (data: typeof invoices | typeof quotations) => {
    return data.filter((row) => {
      const matchesSearch =
        row.client.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const renderSummary = (data: typeof invoices | typeof quotations) => {
    const stats = data.reduce(
      (acc, row) => {
        acc.total += row.amount;
        acc[row.status] = (acc[row.status] || 0) + 1;
        return acc;
      },
      { total: 0 } as Record<string, number>
    );

    return (
      <div className="flex gap-6 text-sm text-slate-300">
        {Object.entries(stats).map(([status, count]) =>
          status !== "total" ? (
            <span key={status}>
              {status}: <span className="font-semibold">{count}</span>
            </span>
          ) : null
        )}
        <span>
          Total:{" "}
          <span className="font-semibold">₱{stats.total.toLocaleString()}</span>
        </span>
      </div>
    );
  };

  const renderTable = (
    data: typeof invoices | typeof quotations,
    type: string
  ) => {
    const filtered = filterData(data);

    return (
      <div className="space-y-6">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <Input
            placeholder="Search by Client or Ref No."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm bg-slate-900 border border-slate-700 text-white"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-slate-900 border border-slate-700 text-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border border-slate-700 text-white">
              <SelectItem value="all">All Status</SelectItem>
              {type === "invoices" && (
                <>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </>
              )}
              {type === "quotations" && (
                <>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Summary stats */}
        {renderSummary(data)}

        {/* Export Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleExport(type, "csv")}
            className="flex items-center gap-1"
          >
            <Download size={16} /> Export CSV
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleExport(type, "pdf")}
            className="flex items-center gap-1"
          >
            <Download size={16} /> Export PDF
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ref No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client / Supplier</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-700/30 even:bg-slate-900"
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.client}</TableCell>
                  <TableCell className="text-right">
                    ₱{row.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{renderStatus(row.status)}</TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => alert(`Viewing ${row.id}`)}
                      className="text-blue-400 hover:underline"
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-slate-400">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <section className="w-full max-w-6xl font-manrope text-white space-y-8">
        <h2 className="text-2xl font-bold text-center">Transaction History</h2>

        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 rounded-lg overflow-hidden">
            <TabsTrigger
              value="invoices"
              className={`py-2 font-medium ${
                tab === "invoices" ? "bg-blue-600 text-white" : "bg-slate-800"
              }`}
            >
              Invoices
            </TabsTrigger>
            <TabsTrigger
              value="quotations"
              className={`py-2 font-medium ${
                tab === "quotations"
                  ? "bg-green-600 text-white"
                  : "bg-slate-800"
              }`}
            >
              Quotations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoices">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              {renderTable(invoices, "invoices")}
            </div>
          </TabsContent>
          <TabsContent value="quotations">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              {renderTable(quotations, "quotations")}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
