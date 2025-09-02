import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TwoFactorSetup() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-4">
      <p className="text-slate-300 text-sm">
        Protect your account by requiring an additional authentication step.
      </p>
      {!enabled ? (
        <Button
          onClick={() => setEnabled(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Enable Email-based 2FA
        </Button>
      ) : (
        <div>
          <p className="text-green-400 text-sm mb-2">✅ Two-Factor Enabled</p>
          <Button
            onClick={() => setEnabled(false)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Disable 2FA
          </Button>
        </div>
      )}
    </div>
  );
}
