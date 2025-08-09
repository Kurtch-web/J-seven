import { Building2, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-800/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-orange-500 mr-3" />
            <span className="text-2xl text-orange-500 font-playfair font-bold">J</span>
            <span className="text-2xl text-blue-400 font-playfair font-bold">SEVEN</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white hover:text-orange-400 font-manrope">Features</a>
            <a href="#about" className="text-white hover:text-orange-400 font-manrope">About</a>
            <a href="#how" className="text-white hover:text-orange-400 font-manrope">How It Works</a>
            <a href="#contact" className="text-white hover:text-orange-400 font-manrope">Contact</a>

            {/* Shop Icon */}
            <Link to="/shop" className="text-white hover:text-orange-400">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            <Link to="/login">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-500 font-manrope">
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button size="lg" className="bg-orange-600 text-white hover:bg-orange-500 font-manrope">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-white hover:text-blue-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-slate/70 backdrop-blur-md shadow-md border-t border-white/10">
          <a href="#features" className="block text-white hover:text-blue-300">Features</a>
          <a href="#about" className="block text-white hover:text-blue-300">About</a>
          <a href="#contact" className="block text-white hover:text-blue-300">Contact</a>

          {/* Shop in mobile view */}
          <Link to="/shop" className="block text-white hover:text-orange-400">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Shop</span>
            </div>
          </Link>

          <div className="flex gap-2 mt-2">
            <Link to="/login" className="w-full">
              <Button size="sm" className="w-full bg-orange-500 text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-500">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
