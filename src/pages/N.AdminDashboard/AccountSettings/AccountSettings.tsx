import UserInfo from "./UserInfo";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings/SecuritySettings";
import TransactionHistory from "./TransactionHistory";
import AccountTermination from "./AccountTermination";

interface AccountSettingsProps {
  section: string;
}

export default function AccountSettings({ section }: AccountSettingsProps) {
  return (
    <section className="font-manrope text-white space-y-12">
      {/* User Profile */}
      {section === "settings-profile" && <UserInfo />}

      {/* Security & Authentication */}
      {section === "settings-security" && <SecuritySettings />}

      {/* Notifications */}
      {section === "settings-notifications" && <NotificationSettings />}

      {/* Transaction History */}
      {section === "settings-transactions" && <TransactionHistory />}

      {/* Danger Zone */}
      {section === "settings-danger" && <AccountTermination />}
    </section>
  );
}
