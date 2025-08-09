import { Input } from "@/components/ui/input";
import { useState } from "react";

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
    <section>
      <h2 className="text-xl font-semibold mb-4 text-white">Search Materials</h2>

      <Input
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 bg-slate-800 border border-slate-600 text-white"
      />

      <ul className="space-y-2">
        {filtered.map((item, idx) => (
          <li
            key={idx}
            className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white hover:border-orange-500 transition"
          >
            {item}
          </li>
        ))}

        {filtered.length === 0 && (
          <li className="text-sm text-slate-400 italic">No results found.</li>
        )}
      </ul>
    </section>
  );
}
