import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Plus, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Material = {
  name: string;
  spec: string;
  quantity: number;
  unitPrice: number;
};

type Section = {
  id: number;
  title: string;
  materials: Material[];
};

export default function QuotationTool() {
  const [sections, setSections] = useState<Section[]>([]);
  const [headerColor, setHeaderColor] = useState<"blue" | "orange">("blue");

  const addSection = () => {
    const newSection: Section = {
      id: Date.now(),
      title: `Section ${sections.length + 1}`,
      materials: [],
    };
    setSections([...sections, newSection]);
  };

  const addMaterial = (sectionId: number) => {
    setSections(sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            materials: [
              ...section.materials,
              { name: "", spec: "", quantity: 1, unitPrice: 0 },
            ],
          }
        : section
    ));
  };

  const updateMaterial = (
    sectionId: number,
    index: number,
    field: keyof Material,
    value: string | number
  ) => {
    setSections(sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            materials: section.materials.map((mat, i) =>
              i === index ? { ...mat, [field]: field === "name" || field === "spec" ? value : Number(value) } : mat
            ),
          }
        : section
    ));
  };

  const deleteMaterial = (sectionId: number, index: number) => {
    setSections(sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            materials: section.materials.filter((_, i) => i !== index),
          }
        : section
    ));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Quotation Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    sections.forEach((section, i) => {
      autoTable(doc, {
        startY: i === 0 ? 35 : undefined,
        head: [[section.title]],
        styles: {
          fillColor: headerColor === "blue" ? [59, 130, 246] : [249, 115, 22],
          halign: "center",
          fontStyle: "bold",
          textColor: "#ffffff",
        },
        theme: "grid",
      });

      autoTable(doc, {
        head: [["Material", "Spec", "Qty", "Unit Price", "Total"]],
        body: section.materials.map((m) => [
          m.name,
          m.spec,
          m.quantity,
          `₱${m.unitPrice}`,
          `₱${m.quantity * m.unitPrice}`,
        ]),
      });
    });

    doc.save("quotation.pdf");
  };

  return (
    <section className="font-manrope">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Quotation Tool</h2>
        <Button
          onClick={addSection}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus size={16} className="mr-2" />
          Add Section
        </Button>
      </div>

      {/* Toggle Color */}
      <div className="mb-6 text-white flex items-center gap-4">
        <span>Header Color:</span>
        <button
          onClick={() => setHeaderColor("blue")}
          className={`px-3 py-1 rounded ${headerColor === "blue" ? "bg-blue-500" : "bg-slate-700"}`}
        >
          Blue
        </button>
        <button
          onClick={() => setHeaderColor("orange")}
          className={`px-3 py-1 rounded ${headerColor === "orange" ? "bg-orange-500" : "bg-slate-700"}`}
        >
          Orange
        </button>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.id} className="mb-10 bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-white text-lg font-bold mb-4">{section.title}</h3>

          <div className="space-y-4">
            {section.materials.map((mat, idx) => (
              <div key={idx} className="grid md:grid-cols-5 gap-3 items-center">
                <Input
                  placeholder="Material Name"
                  value={mat.name}
                  onChange={(e) =>
                    updateMaterial(section.id, idx, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Specification"
                  value={mat.spec}
                  onChange={(e) =>
                    updateMaterial(section.id, idx, "spec", e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Qty"
                  value={mat.quantity}
                  onChange={(e) =>
                    updateMaterial(section.id, idx, "quantity", e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Unit Price"
                  value={mat.unitPrice}
                  onChange={(e) =>
                    updateMaterial(section.id, idx, "unitPrice", e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => deleteMaterial(section.id, idx)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="mt-4 border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white"
            onClick={() => addMaterial(section.id)}
          >
            <Plus size={16} className="mr-2" />
            Add Material
          </Button>
        </div>
      ))}

      <div className="mt-8">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={exportToPDF}
        >
          <Download size={16} className="mr-2" />
          Export to PDF
        </Button>
      </div>
    </section>
  );
}
