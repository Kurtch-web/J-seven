import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import signupImage from "@/assets/images/signupImage.jpg";
import SignupForm from "./SignupForm";

export default function Signup() {
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

      {/* LEFT: Background image */}
      <div className="hidden md:block">
        <img
          src={signupImage}
          alt="Signup Background"
          className="w-full h-full object-cover object-left md:object-[center_25%]"
        />
      </div>

      {/* RIGHT: Signup form */}
      <div className="flex flex-col justify-center px-10 py-20 md:py-0 font-manrope relative z-10">
        <div className="max-w-md w-full mx-auto space-y-6">
          {/* DESKTOP back link */}
          <Link
            to="/"
            className="mb-4 hidden md:inline-flex items-center text-sm text-gray-400 hover:text-orange-400 font-manrope font-medium transition"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h2 className="text-4xl font-bold">
            Create your{" "}
            <span className="text-orange-500 font-playfair">J</span>
            <span className="text-blue-600 font-playfair">Seven</span> account
          </h2>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
