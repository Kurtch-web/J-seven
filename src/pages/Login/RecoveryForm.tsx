import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface RecoveryFormProps {
  onDone: () => void;
}

export default function RecoveryForm({ onDone }: RecoveryFormProps) {
  const [recoveryInput, setRecoveryInput] = useState("");

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Recovery code sent to: ${recoveryInput}`);
    setRecoveryInput("");
    onDone();
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleRecovery}>
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          required
          value={recoveryInput}
          onChange={(e) => setRecoveryInput(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="w-full bg-orange-600 text-white hover:bg-orange-700 font-bold"
        >
          Send Recovery Code
        </Button>
      </DialogFooter>
    </form>
  );
}
