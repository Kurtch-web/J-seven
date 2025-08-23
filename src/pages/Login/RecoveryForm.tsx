import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface RecoveryFormProps {
  onSuccess?: () => void;
}

export default function RecoveryForm({ onSuccess }: RecoveryFormProps) {
  const [email, setEmail] = useState("");

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Recovery code sent to: ${email}`);
    setEmail("");
    if (onSuccess) onSuccess();
  };

  return (
    <form className="space-y-4" onSubmit={handleRecovery}>
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
        />
        <p className="mt-1 text-xs text-gray-400">
          We’ll send a recovery code to this email.
        </p>
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
