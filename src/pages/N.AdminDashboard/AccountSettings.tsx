import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AccountSettings() {
  const [userInfo, setUserInfo] = useState({
    name: "Admin User",
    email: "admin@example.com",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
  });

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="font-manrope text-white space-y-12">
      {/* User Info */}
      <div>
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block mb-1 text-sm font-semibold">Full Name</label>
            <Input
              name="name"
              value={userInfo.name}
              onChange={handleInfoChange}
              className="bg-slate-800 border border-slate-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <Input
              name="email"
              value={userInfo.email}
              onChange={handleInfoChange}
              className="bg-slate-800 border border-slate-600 text-white"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-2">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Password Change */}
      <div>
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block mb-1 text-sm font-semibold">Current Password</label>
            <Input
              name="current"
              type="password"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="bg-slate-800 border border-slate-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">New Password</label>
            <Input
              name="new"
              type="password"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="bg-slate-800 border border-slate-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Confirm New Password</label>
            <Input
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="bg-slate-800 border border-slate-600 text-white"
            />
          </div>
          <Button
            onClick={() => alert("Password updated")}
            className="bg-orange-600 hover:bg-orange-700 text-white mt-2"
          >
            Update Password
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
        <div className="space-y-4 max-w-lg">
          <div className="flex items-center justify-between">
            <label>Email Notifications</label>
            <Switch
              checked={notifications.email}
              onCheckedChange={() => handleNotificationToggle("email")}
            />
          </div>
          <div className="flex items-center justify-between">
            <label>In-App Notifications</label>
            <Switch
              checked={notifications.inApp}
              onCheckedChange={() => handleNotificationToggle("inApp")}
            />
          </div>
          <Button
            onClick={() => alert("Notification preferences saved")}
            className="bg-slate-700 hover:bg-slate-600 text-white mt-2"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </section>
  );
}
