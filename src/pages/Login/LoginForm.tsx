import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

type Props = {
  onForgotPassword: () => void;
};

export default function LoginForm({ onForgotPassword }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
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
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
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

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Logging in...</> : "Login"}
      </Button>
    </form>
  );
}
