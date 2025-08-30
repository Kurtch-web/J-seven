import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import jsevenLogo from "/jseven.png"; // ✅ make sure it's in public/

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-800/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand with logo + text */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={jsevenLogo}
                alt="JSEVEN Logo"
                className="h-8 w-auto object-contain sm:h-10"
              />
              <span className="text-lg sm:text-2xl font-playfair font-bold tracking-tight">
                <span className="text-orange-500">J</span>
                <span className="text-blue-400">SEVEN</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-white hover:text-orange-400 font-manrope"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-white hover:text-orange-400 font-manrope"
            >
              About
            </a>
            <a
              href="#how"
              className="text-white hover:text-orange-400 font-manrope"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="text-white hover:text-orange-400 font-manrope"
            >
              Contact
            </a>

            {/* Shop Icon */}
            <Link to="/shop" className="text-white hover:text-orange-400">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            <Link to="/login">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-500 font-manrope"
              >
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                size="lg"
                className="bg-orange-600 text-white hover:bg-orange-500 font-manrope"
              >
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
        <div className="md:hidden px-6 pt-6 pb-8 space-y-4 bg-slate-900/95 backdrop-blur-md shadow-lg border-t border-white/10 text-center">
          <a
            href="#features"
            className="block text-sm text-white hover:text-orange-400"
          >
            Features
          </a>
          <a
            href="#about"
            className="block text-sm text-white hover:text-orange-400"
          >
            About
          </a>
          <a
            href="#how"
            className="block text-sm text-white hover:text-orange-400"
          >
            How It Works
          </a>
          <a
            href="#contact"
            className="block text-sm text-white hover:text-orange-400"
          >
            Contact
          </a>

          {/* Shop in mobile view */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-white hover:text-orange-400"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Shop</span>
          </Link>

          {/* Login/Signup buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <Link to="/login" className="w-full">
              <Button
                size="sm"
                className="w-full bg-blue-600 text-white hover:bg-blue-500"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button
                size="sm"
                className="w-full bg-orange-600 text-white hover:bg-orange-500"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
