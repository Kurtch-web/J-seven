import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import PasswordField from "./PasswordField";

interface ResetPasswordFormProps {
  onDone: () => void;
}

export default function ResetPasswordForm({ onDone }: ResetPasswordFormProps) {
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Password reset for ${resetEmail} using code ${resetCode}. New password: ${newPassword}`
    );
    setResetEmail("");
    setResetCode("");
    setNewPassword("");
    onDone();
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleResetPassword}>
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          required
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Recovery Code</label>
        <Input
          type="text"
          placeholder="Enter code"
          required
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">New Password</label>
        <PasswordField
          name="newPassword"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold"
        >
          Reset Password
        </Button>
      </DialogFooter>
    </form>
  );
}
