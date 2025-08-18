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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import signupImage from "@/assets/images/signupImage.jpg";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    idFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, idFile: file });
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
          <br />
          <br />
          <div>
            <h2 className="text-4xl font-bold">
              Create your{" "}
              <span className="text-orange-500 font-playfair">J</span>
              <span className="text-blue-600 font-playfair">Seven</span> account
            </h2>
          </div>
          <br />

          {/* Form */}
          <form className="space-y-4 font-manrope" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">First Name</label>
                <Input
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Last Name</label>
                <Input
                  name="lastName"
                  type="text"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
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
              <label className="block text-sm font-semibold mb-1">Confirm Password</label>
              <Input
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Government/Employee ID Upload */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Upload Government ID or Employee ID
              </label>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="bg-slate-800 border-slate-700"
              />
              {form.idFile && (
                <p className="text-xs text-gray-400 mt-1">Selected: {form.idFile.name}</p>
              )}
            </div>

            <br />

            {/* Terms Agreement */}
            <div className="flex items-start gap-2 text-sm text-gray-300">
              <input type="checkbox" required className="mt-1 accent-orange-500" />
              <span>
                I agree to JSEVEN's{" "}
                <Dialog>
                  <DialogTrigger className="text-blue-400 hover:underline">
                    Terms of Service
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-lg shadow-lg max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Terms of Service</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-gray-700 space-y-3 max-h-[50vh] overflow-y-auto">
                      <p>
                        Welcome to JSEVEN. By using our platform, you agree to
                        abide by these Terms of Service. Please read carefully.
                      </p>
                      <p>
                        1. Users must provide accurate information when signing up.
                      </p>
                      <p>
                        2. Unauthorized use of this system is strictly prohibited.
                      </p>
                      <p>
                        3. JSEVEN reserves the right to update terms at any time.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="bg-orange-500 text-white hover:bg-orange-600">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{" "}
                and{" "}
                <Dialog>
                  <DialogTrigger className="text-blue-400 hover:underline">
                    Privacy Policy
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-lg shadow-lg max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-gray-700 space-y-3 max-h-[50vh] overflow-y-auto">
                      <p>
                        JSEVEN values your privacy. This policy explains how we
                        handle your personal data.
                      </p>
                      <p>
                        - We collect only essential information for account
                        creation and usage.
                      </p>
                      <p>
                        - We do not sell or share your information with third
                        parties without consent.
                      </p>
                      <p>
                        - Users can request data deletion by contacting support.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="bg-orange-500 text-white hover:bg-orange-600">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
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
              <Link to="/login" className="text-blue-400 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
