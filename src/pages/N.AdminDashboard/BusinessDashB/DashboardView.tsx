import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Bell,
  Headphones,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import QuickOverview from "./QuickOverview";
import SearchMaterials from "./SearchMaterials";
import RecentNotifications from "./RecentNotifications";
import ActivityTimeline from "./ActivityTimeline";
import QuickActions from "./QuickActions";

import MyStore from "../MyStore/MyStore";
import MaterialsManager from "../MaterialsManagement/MaterialsManager";
import QuotationTool from "../Quotation";
import AccountSettings from "../AccountSettings/AccountSettings";
import ClientManagement from "../Clients/ClientManagement";
import SupplierManagement from "../Suppliers/SupplierManagement";

export default function DashboardView() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Notifications state
  const [unreadCount, setUnreadCount] = useState(3);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // New: track if Account Settings dropdown is open
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleLogout = () => navigate("/");

  const sectionTitles: Record<string, string> = {
    dashboard: "Business Dashboard",
    store: "My Store",
    quotation: "Quotation Tool",
    clients: "Client Management",
    suppliers: "Supplier Management",
    materials: "Materials Management",

    // new account sub-sections
    "settings-profile": "User Profile",
    "settings-security": "Security & Authentication",
    "settings-notifications": "Notifications & Communication",
    "settings-transactions": "Transaction History",
    "settings-danger": "Danger Zone",
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white font-manrope">
      {/* Topbar */}
      <header className="relative w-full bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={22} />
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/jseven.png"
              alt="JSEVEN Logo"
              className="h-8 w-auto object-contain sm:h-10"
            />
            <span className="text-xl sm:text-2xl font-playfair font-bold">
              <span className="text-orange-500">J</span>
              <span className="text-blue-400">SEVEN</span>
            </span>
          </div>

          {/* Section Title */}
          <span className="text-white text-base font-normal ml-4 hidden sm:inline font-manrope">
            {sectionTitles[activeSection] || ""}
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          {/* ✅ Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen((prev) => !prev)}
              className="relative p-2 hover:bg-slate-700 rounded-full"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 z-20">
                <h4 className="font-semibold mb-2">Notifications</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>📦 New order placed</li>
                  <li>✅ Your material listing was approved</li>
                  <li>💬 You have a new quotation request</li>
                </ul>
                <button
                  className="mt-3 text-xs text-blue-400 hover:underline"
                  onClick={() => {
                    setUnreadCount(0);
                    setNotificationsOpen(false);
                  }}
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>

          {/* Chat Support */}
          <button
            onClick={() => alert("Opening support chat...")}
            className="p-2 hover:bg-slate-700 rounded-full"
          >
            <Headphones size={20} />
          </button>

          {/* Logout */}
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`bg-slate-800 px-6 py-8 border-r border-slate-700 w-64 transition-all duration-200 md:relative z-30
          ${
            sidebarOpen
              ? "absolute top-0 left-0 h-full block"
              : "hidden md:block"
          }`}
        >
          {/* Profile */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">
                ADM
              </div>
              <div>
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-slate-400">Supplier</p>
              </div>
            </div>
            <div className="border-t border-slate-600 mt-6 pt-6"></div>
          </div>

          {/* Navigation */}
          <nav className="space-y-6 text-sm font-bold">
            <button
              onClick={() => setActiveSection("dashboard")}
              className="hover:text-orange-400 block w-full text-left"
            >
              Business Dashboard
            </button>
            <button
              onClick={() => setActiveSection("store")}
              className="hover:text-orange-400 block w-full text-left"
            >
              My Store
            </button>
            <button
              onClick={() => setActiveSection("quotation")}
              className="hover:text-orange-400 block w-full text-left"
            >
              Quotation Tool
            </button>
            <button
              onClick={() => setActiveSection("clients")}
              className="hover:text-orange-400 block w-full text-left"
            >
              Client Management
            </button>
            <button
              onClick={() => setActiveSection("suppliers")}
              className="hover:text-orange-400 block w-full text-left"
            >
              Supplier Management
            </button>
            <button
              onClick={() => setActiveSection("materials")}
              className="hover:text-orange-400 block w-full text-left"
            >
              Materials Management
            </button>

            {/* Account Settings dropdown */}
            <div>
              <button
                onClick={() => setAccountMenuOpen((prev) => !prev)}
                className="flex items-center justify-between w-full hover:text-orange-400"
              >
                Account Settings
                {accountMenuOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {accountMenuOpen && (
                <div className="ml-4 mt-2 space-y-2 text-slate-300">
                  <button
                    onClick={() => setActiveSection("settings-profile")}
                    className="block w-full text-left hover:text-orange-400"
                  >
                    User Profile
                  </button>
                  <button
                    onClick={() => setActiveSection("settings-security")}
                    className="block w-full text-left hover:text-orange-400"
                  >
                    Security & Authentication
                  </button>
                  <button
                    onClick={() => setActiveSection("settings-notifications")}
                    className="block w-full text-left hover:text-orange-400"
                  >
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveSection("settings-transactions")}
                    className="block w-full text-left hover:text-orange-400"
                  >
                    Transaction History
                  </button>
                  <button
                    onClick={() => setActiveSection("settings-danger")}
                    className="block w-full text-left hover:text-red-400"
                  >
                    Account Termination
                  </button>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          {activeSection === "dashboard" && (
            <>
              <QuickOverview />
              <QuickActions onSelect={(section) => setActiveSection(section)} />
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Updates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800 rounded-lg p-4 max-h-[300px] overflow-y-auto border border-slate-700">
                    <RecentNotifications />
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4 max-h-[300px] overflow-y-auto border border-slate-700">
                    <ActivityTimeline />
                  </div>
                </div>
              </section>
              <SearchMaterials />
            </>
          )}

          {activeSection === "store" && (
            <MyStore onBack={() => setActiveSection("dashboard")} />
          )}
          {activeSection === "materials" && <MaterialsManager />}
          {activeSection === "quotation" && <QuotationTool />}
          {activeSection === "clients" && <ClientManagement />}
          {activeSection === "suppliers" && <SupplierManagement />}

          {/* Account Settings sections */}
          {activeSection.startsWith("settings") && (
            <AccountSettings section={activeSection} />
          )}
        </main>
      </div>
    </div>
  );
}
