import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Headphones } from "lucide-react";

import QuickOverview from "./QuickOverview";
import SearchMaterials from "./SearchMaterials";
import RecentNotifications from "./RecentNotifications";
import ActivityTimeline from "./ActivityTimeline";
import MyStore from "./MyStore";
import MaterialsManager from "./MaterialsManager";
import QuotationTool from "./Quotation";
import AccountSettings from "./AccountSettings";

export default function DashboardView() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // Initial unread notifications
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => navigate("/");

  const sectionTitles: Record<string, string> = {
    dashboard: "Business Dashboard",
    store: "My Store",
    materials: "Manage Materials",
    quotation: "Quotation Tool",
    settings: "Account Settings",
  };

  const handleNotificationsClick = () => {
    setNotificationsOpen((prev) => !prev);
    if (!notificationsOpen) {
      setUnreadCount(0); // Mark as read when opened
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white font-manrope">
      {/* Topbar */}
      <header className="relative w-full bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-4 text-2xl font-bold">
            <span className="text-orange-500 font-playfair">JSEVEN</span>
            <span className="text-white text-base font-normal ml-4 hidden sm:inline font-manrope">
              {sectionTitles[activeSection] || ""}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={handleNotificationsClick}
              className="relative p-2 hover:bg-slate-700 rounded-full"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 z-20">
                <h4 className="font-semibold mb-2">Notifications</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>📦 New order placed</li>
                  <li>✅ Your material listing was approved</li>
                  <li>💬 You have a new quotation request</li>
                </ul>
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
          <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`bg-slate-800 px-6 py-8 border-r border-slate-700 w-64 transition-all duration-200 md:relative z-30
          ${sidebarOpen ? "absolute top-0 left-0 h-full block" : "hidden md:block"}`}
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
          <nav className="space-y-8 text-sm font-bold">
            <button onClick={() => setActiveSection("dashboard")} className="hover:text-orange-400 block w-full text-left">
              Business Dashboard
            </button>
            <button onClick={() => setActiveSection("store")} className="hover:text-orange-400 block w-full text-left">
              My Store
            </button>
            <button onClick={() => setActiveSection("materials")} className="hover:text-orange-400 block w-full text-left">
              Materials
            </button>
            <button onClick={() => setActiveSection("quotation")} className="hover:text-orange-400 block w-full text-left">
              Quotation Tool
            </button>
            <button onClick={() => setActiveSection("settings")} className="hover:text-orange-400 block w-full text-left">
              Account Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          {activeSection === "dashboard" && (
            <>
              <QuickOverview />

              {/* Notifications + Timeline */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-white">Updates</h2>
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

          {activeSection === "store" && <MyStore onBack={() => setActiveSection("dashboard")} />}
          {activeSection === "materials" && <MaterialsManager />}
          {activeSection === "quotation" && <QuotationTool />}
          {activeSection === "settings" && <AccountSettings />}
        </main>
      </div>
    </div>
  );
}
