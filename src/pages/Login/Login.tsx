import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import login from "@/assets/images/login.jpg";
import LoginForm from "./LoginForm";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function Login() {
  const [showRecovery, setShowRecovery] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-900 text-white relative">
      {/* Left: Form */}
      <div className="flex flex-col justify-center px-10 py-20 md:py-0 font-manrope relative z-10">
        <div className="max-w-md w-full mx-auto space-y-6">
          <Link
            to="/"
            className="mb-4 hidden md:inline-flex items-center text-sm text-gray-400 hover:text-orange-400 font-medium transition"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>

          <div>
            <p className="text-sm text-gray-400 font-bold">WELCOME BACK</p>
            <h1 className="text-4xl font-bold">
              Log in to{" "}
              <span className="text-orange-500 font-playfair">J</span>
              <span className="text-blue-600 font-playfair">Seven</span>.
            </h1>
          </div>

          <LoginForm onForgotPassword={() => setShowRecovery(true)} />

          <p className="text-center text-sm text-gray-400 mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Background */}
      <div className="hidden md:block">
        <img src={login} alt="Login Background" className="w-full h-full object-cover" />
      </div>

      {/* Modal */}
      <ForgotPasswordModal open={showRecovery} onOpenChange={setShowRecovery} />
    </div>
  );
}
