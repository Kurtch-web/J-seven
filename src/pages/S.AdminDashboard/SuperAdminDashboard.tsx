import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 px-6 py-8 fixed h-full border-r border-slate-700">
        <div className="text-3xl font-bold mb-10">
          <span className="text-orange-500 font-playfair">Civil</span>
          <span className="text-blue-400 font-playfair">Quote</span>
        </div>
        <nav className="space-y-4 text-sm font-manrope">
          <Link to="#" className="hover:text-orange-400 block">Dashboard</Link>
          <Link to="#" className="hover:text-orange-400 block">Add Material</Link>
          <Link to="#" className="hover:text-orange-400 block">Inventory</Link>
          <Link to="#" className="hover:text-orange-400 block">Manage Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <h1 className="text-xl font-bold">Super Admin Dashboard</h1>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </header>

        <main className="p-10">
          <h2 className="text-2xl font-semibold mb-2">Welcome, Super Admin</h2>
          <p className="text-slate-300">You have full access to the system including user management.</p>
        </main>
      </div>
    </div>
  );
}
