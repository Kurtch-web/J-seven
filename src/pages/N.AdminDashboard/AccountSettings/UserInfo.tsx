import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserInfoForm() {
  const [userInfo, setUserInfo] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    role: "Supplier Admin",
    company: "",
    city: "",
    province: "",
    country: "",
  });

  const [originalEmail] = useState(userInfo.email); // store original email
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setIsEmailChanged(value !== originalEmail);
    }
  };

  return (
    <div className="flex justify-center">
      <section className="w-full max-w-5xl font-manrope text-white space-y-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          User Information
        </h2>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Overview */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm mb-4">
              No Photo
            </div>
            <p className="font-semibold">
              {userInfo.firstName} {userInfo.lastName}
            </p>
            <p className="text-xs text-slate-400">{userInfo.role}</p>
            <Button variant="secondary" className="mt-3 w-32">
              Upload
            </Button>
          </div>

          {/* Personal Info */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleInfoChange}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInfoChange}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Info */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Email Address
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    name="email"
                    value={userInfo.email}
                    onChange={handleInfoChange}
                    className="bg-slate-900 border-slate-700"
                  />
                  {isEmailChanged && (
                    <Button
                      variant="secondary"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                      onClick={() => alert("Verification email sent ✅")}
                    >
                      Verify New Email
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Role</label>
                <Input
                  name="role"
                  value={userInfo.role}
                  disabled
                  className="bg-slate-900 border-slate-700 text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Organization Info */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Organization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Company / Organization
                </label>
                <Input
                  name="company"
                  value={userInfo.company}
                  onChange={handleInfoChange}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">City</label>
                <Input
                  name="city"
                  value={userInfo.city}
                  onChange={handleInfoChange}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Province
                </label>
                <Input
                  name="province"
                  value={userInfo.province}
                  onChange={handleInfoChange}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Country
                </label>
                <Input
                  name="country"
                  value={userInfo.country}
                  onChange={handleInfoChange}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="secondary"
            className="bg-slate-600 hover:bg-slate-500"
          >
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Save Changes
          </Button>
        </div>
      </section>
    </div>
  );
}
