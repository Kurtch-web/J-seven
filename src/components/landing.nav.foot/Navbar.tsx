import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import jsevenLogo from "@/assets/images/jseven.png";

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
                className="h-7 sm:h-9 lg:h-10 w-auto object-contain"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-playfair font-bold">
                <span className="text-orange-500">J</span>
                <span className="text-blue-400">SEVEN</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav (shows only on lg and above) */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
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
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-500 font-manrope md:px-4 md:py-2 lg:px-5 lg:py-2.5"
              >
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                size="sm"
                className="bg-orange-600 text-white hover:bg-orange-500 font-manrope md:px-4 md:py-2 lg:px-5 lg:py-2.5"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-white hover:text-blue-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 space-y-2 bg-slate-900/90 backdrop-blur-md shadow-md border-t border-white/10">
          <a href="#features" className="block text-white hover:text-blue-300">
            Features
          </a>
          <a href="#about" className="block text-white hover:text-blue-300">
            About
          </a>
          <a href="#contact" className="block text-white hover:text-blue-300">
            Contact
          </a>

          {/* Shop in mobile view */}
          <Link to="/shop" className="block text-white hover:text-orange-400">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Shop</span>
            </div>
          </Link>

          <div className="flex gap-2 mt-2">
            <Link to="/login" className="w-full">
              <Button
                size="sm"
                className="w-full bg-orange-600 text-white hover:bg-orange-500"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button
                size="sm"
                className="w-full bg-blue-600 text-white hover:bg-blue-500"
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
