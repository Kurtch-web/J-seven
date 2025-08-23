import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PasswordField from "./PasswordField"; // reuse same PasswordField

interface LoginFormProps {
  onForgotPassword: () => void;
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Logged in successfully!");
    }, 1500);
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <Input type="email" required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Password</label>
        <PasswordField name="password" required />
      </div>

      <div className="text-sm text-right">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-blue-400 hover:underline font-bold"
        >
          Forgot password?
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white hover:bg-orange-600 font-bold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </form>
  );
}
