import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

const mockMaterials = [
  "Cement - 25kg",
  "Rebar - 10mm",
  "Plywood - 4x8",
  "Gravel - 1 cu.m",
  "Paint - White Latex",
];

export default function SearchMaterials() {
  const [query, setQuery] = useState("");

  const filtered = mockMaterials.filter((material) =>
    material.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="bg-slate-800 border border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-white text-lg font-semibold">
          Search Materials
        </CardTitle>
        <Search className="h-5 w-5 text-slate-400" />
      </CardHeader>

      <CardContent>
        <Input
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4 bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
        />

        <ScrollArea className="h-[200px]">
          <ul className="space-y-2">
            {filtered.map((item, idx) => (
              <li
                key={idx}
                className="bg-slate-900 border border-slate-700 px-4 py-3 rounded-lg text-white hover:border-orange-500 transition"
              >
                {item}
              </li>
            ))}

            {filtered.length === 0 && (
              <li className="text-sm text-slate-400 italic">
                No results found.
              </li>
            )}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
