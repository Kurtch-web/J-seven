import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import signupImage from "@/assets/images/signupImage.jpg";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account created!");
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
          <br></br>
          <br></br>
          <div>
            <p className="text-sm text-gray-400 font-bold font-manrope">START FOR FREE</p>
            <h2 className="text-4xl font-bold">
              Create your{" "}
              <span className="text-orange-500 font-playfair">J</span>
              <span className="text-blue-600 font-playfair">Seven</span> account
            </h2>
          </div>
          <br></br>

          {/* Form */}
          <form className="space-y-4 font-manrope" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <Input
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <Input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <Input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Confirm Password
              </label>
              <Input
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <br></br>
            {/* Terms Agreement */}
            <div className="flex items-start gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                required
                className="mt-1 accent-orange-500"
              />
              <span>
                I agree to JSEVEN's{" "}
                <Dialog>
                  <DialogTrigger className="text-blue-400 hover:underline">
                    Terms of Service
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                      <DialogTitle>Terms of Service</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-gray-700">
                      <p>
                        These are sample Terms of Service. You can update this
                        content with your actual legal agreement...
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>{" "}
                and{" "}
                <Dialog>
                  <DialogTrigger className="text-blue-400 hover:underline">
                    Privacy Policy
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-gray-700">
                      <p>
                        This is a sample Privacy Policy. You can describe how
                        you collect, store, and use user data here...
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 text-white hover:bg-orange-600 font-manrope font-bold"
            >
              Sign Up
            </Button>
            <p className="text-sm text-center text-gray-400 mt-2 ">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
