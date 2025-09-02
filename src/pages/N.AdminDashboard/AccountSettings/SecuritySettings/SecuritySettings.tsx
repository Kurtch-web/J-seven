import PasswordChangeForm from "./PasswordChangeForm";
import TwoFactorSetup from "./TwoFactorSetup";
import RecoveryCodes from "./RecoveryCodes";
import ActiveSessions from "./ActiveSessions";
import LoginActivity from "./LoginActivity";
import SecurityAlerts from "./SecurityAlerts";

export default function SecuritySettings() {
  return (
    <div className="flex justify-center">
      <section className="w-full max-w-5xl font-manrope text-white space-y-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Security & Authentication
        </h2>

        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Password */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Password Management</h3>
            <PasswordChangeForm />
          </div>

          {/* Two-Factor Auth */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">
              Two-Factor Authentication
            </h3>
            <TwoFactorSetup />
          </div>

          {/* Recovery Codes */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Recovery Codes</h3>
            <RecoveryCodes />
          </div>

          {/* Active Sessions */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
            <ActiveSessions />
          </div>

          {/* Login Activity */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">
              Recent Login Activity
            </h3>
            <LoginActivity />
          </div>

          {/* Security Alerts */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Security Alerts</h3>
            <SecurityAlerts />
          </div>
        </div>
      </section>
    </div>
  );
}
