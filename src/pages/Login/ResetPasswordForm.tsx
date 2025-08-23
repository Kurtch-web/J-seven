import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";

interface ResetPasswordFormProps {
  onSuccess?: () => void;
}

export default function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Password reset for ${email} with code ${code}. New password: ${newPassword}`
    );
    setEmail("");
    setCode("");
    setNewPassword("");
    if (onSuccess) onSuccess();
  };

  return (
    <form className="space-y-4" onSubmit={handleReset}>
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
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Recovery Code</label>
        <Input
          type="text"
          placeholder="Enter code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">New Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
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
