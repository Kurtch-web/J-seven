import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

export default function AccountTermination() {
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = () => {
    alert("Your account has been permanently deleted.");
  };

  const handleDeactivate = () => {
    alert("Your account has been deactivated. You can reactivate anytime.");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-lg bg-slate-800 border border-red-700 rounded-xl p-8 shadow-lg text-center space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <AlertTriangle className="text-red-500 w-10 h-10" />
          <h2 className="text-2xl font-bold text-red-500">
            Account Termination
          </h2>
          <p className="text-gray-300">
            This action is <span className="font-semibold">permanent</span>.
            Deleting your account will erase all data including quotations,
            invoices, and preferences. Please proceed with caution.
          </p>
        </div>

        {/* Deactivate Option */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
          <h3 className="text-lg font-semibold text-orange-400">
            Deactivate Account
          </h3>
          <p className="text-gray-400 text-sm">
            Temporarily disable your account. You can log back in to reactivate.
          </p>
          <Button
            onClick={handleDeactivate}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            Deactivate Account
          </Button>
        </div>

        {/* Delete Option */}
        <div className="bg-slate-900 p-4 rounded-lg border border-red-600 space-y-3">
          <h3 className="text-lg font-semibold text-red-500">Delete Account</h3>
          <p className="text-gray-400 text-sm">
            To confirm deletion, type{" "}
            <span className="font-mono font-bold text-red-400">DELETE</span>{" "}
            below.
          </p>

          <Input
            placeholder="Type DELETE to confirm"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white text-center"
          />

          <Button
            onClick={handleDelete}
            disabled={confirmationText !== "DELETE"}
            className={`w-full ${
              confirmationText === "DELETE"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-900 text-gray-400 cursor-not-allowed"
            }`}
          >
            Permanently Delete My Account
          </Button>
        </div>
      </div>
    </div>
  );
}
