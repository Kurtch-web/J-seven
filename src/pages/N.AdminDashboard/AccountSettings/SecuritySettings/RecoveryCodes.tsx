import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RecoveryCodes() {
  const [codes, setCodes] = useState<string[]>([]);

  const generateCodes = () => {
    const newCodes = Array.from({ length: 5 }, () =>
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    setCodes(newCodes);
  };

  return (
    <div className="space-y-4">
      {codes.length === 0 ? (
        <p className="text-slate-400 text-sm">
          Generate recovery codes to regain access if you lose 2FA.
        </p>
      ) : (
        <ul className="space-y-2 bg-slate-900 p-4 rounded-lg border border-slate-700">
          {codes.map((code, i) => (
            <li key={i} className="font-mono text-orange-400">
              {code}
            </li>
          ))}
        </ul>
      )}

      <Button
        onClick={generateCodes}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {codes.length === 0 ? "Generate Codes" : "Regenerate Codes"}
      </Button>
    </div>
  );
}
