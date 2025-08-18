import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import login from "@/assets/images/login.jpg";

export default function Login() {
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryInput, setRecoveryInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ⏳ Simulate API request
    setTimeout(() => {
      setLoading(false);
      alert("Logged in successfully!");
    }, 1500);
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Recovery link sent to: ${recoveryInput}`);
    setShowRecovery(false);
    setRecoveryInput("");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-900 text-white relative">
      {/* MOBILE TOP BACK BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full px-4 py-3 bg-slate-900/80 backdrop-blur-md z-50 flex items-center">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-300 hover:text-orange-400 font-manrope font-medium transition"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>

      {/* LEFT: Login form */}
      <div className="flex flex-col justify-center px-10 py-20 md:py-0 font-manrope relative z-10">
        <div className="max-w-md w-full mx-auto space-y-6">
          {/* DESKTOP Back link */}
          <Link
            to="/"
            className="mb-4 hidden md:inline-flex items-center text-sm text-gray-400 hover:text-orange-400 font-manrope font-medium transition"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <br />
          <br />
          <div>
            <p className="text-sm text-gray-400 font-bold font-manrope">
              WELCOME BACK
            </p>
            <h1 className="text-4xl font-bold">
              Log in to{" "}
              <span className="text-orange-500 font-playfair">J</span>
              <span className="text-blue-600 font-playfair">Seven</span>.
            </h1>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <Input type="email" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <Input type="password" required />
            </div>

            <div className="text-sm text-right">
              <button
                type="button"
                onClick={() => setShowRecovery(true)}
                className="text-blue-400 hover:underline font-bold"
              >
                Forgot password?
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold flex items-center justify-center gap-2"
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

          <p className="text-center text-sm text-gray-400 mt-2">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT: Background image */}
      <div className="hidden md:block">
        <img
          src={login}
          alt="Login Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Forgot Password Modal */}
      <Dialog open={showRecovery} onOpenChange={setShowRecovery}>
        <DialogContent className="bg-slate-900 border border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-orange-500">
              Password Recovery
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your email to receive a recovery link.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-3" onSubmit={handleRecovery}>
            <Input
              type="text"
              placeholder="email@account.com"
              required
              value={recoveryInput}
              onChange={(e) => setRecoveryInput(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border-slate-600 text-gray-300 hover:bg-slate-800"
                onClick={() => setShowRecovery(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 text-white hover:bg-orange-700 font-bold"
              >
                Send Recovery Link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
