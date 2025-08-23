import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PasswordField from "./PasswordField";
import TermsDialog from "./TermsDialog";
import PrivacyDialog from "./PrivacyDialog";

export default function SignupForm() {
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
    <form className="space-y-4 font-manrope" onSubmit={handleSubmit}>
      {/* First + Last Name */}
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

      {/* Email */}
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

      {/* Passwords */}
      <PasswordField
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      {/* ID Upload */}
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
          <p className="text-xs text-gray-400 mt-1">
            Selected: {form.idFile.name}
          </p>
        )}
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start gap-2 text-sm text-gray-300">
        <input type="checkbox" required className="mt-1 accent-orange-500" />
        <span>
          I agree to JSEVEN’s <TermsDialog /> and <PrivacyDialog />.
        </span>
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-500 text-white hover:bg-orange-600 font-manrope font-bold"
      >
        Sign Up
      </Button>
      <p className="text-sm text-center text-gray-400 mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
