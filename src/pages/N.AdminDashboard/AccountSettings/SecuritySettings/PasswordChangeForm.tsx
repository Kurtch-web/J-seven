import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PasswordChangeForm() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4 max-w-md">
      <Input
        type="password"
        name="current"
        placeholder="Current Password"
        value={passwords.current}
        onChange={handleChange}
        className="bg-slate-900 border-slate-600 text-white"
      />
      <Input
        type="password"
        name="new"
        placeholder="New Password"
        value={passwords.new}
        onChange={handleChange}
        className="bg-slate-900 border-slate-600 text-white"
      />
      <Input
        type="password"
        name="confirm"
        placeholder="Confirm New Password"
        value={passwords.confirm}
        onChange={handleChange}
        className="bg-slate-900 border-slate-600 text-white"
      />
      <Button
        onClick={() => alert("Password updated")}
        className="bg-orange-600 hover:bg-orange-700 text-white"
      >
        Update Password
      </Button>
    </div>
  );
}
