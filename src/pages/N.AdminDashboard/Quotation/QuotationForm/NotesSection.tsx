// src/pages/N.AdminDashboard/QuotationForm/NotesSection.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface NotesSectionProps {
  notes: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function NotesSection({ notes, setNotes }: NotesSectionProps) {
  const handleNoteChange = (index: number, value: string) => {
    const updated = [...notes];
    updated[index] = value;
    setNotes(updated);
  };

  const handleAddNote = () => {
    setNotes([...notes, ""]);
  };

  const handleRemoveNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Notes</h3>

      <div className="space-y-3">
        {notes.map((note, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={note}
              onChange={(e) => handleNoteChange(index, e.target.value)}
              className="bg-slate-900 border-slate-700 flex-1"
              placeholder={`Note ${index + 1}`}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleRemoveNote(index)}
              className="text-red-500 hover:bg-red-500/10"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}

        <Button
          onClick={handleAddNote}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-slate-600"
        >
          <Plus size={16} /> Add Note
        </Button>
      </div>
    </div>
  );
}
