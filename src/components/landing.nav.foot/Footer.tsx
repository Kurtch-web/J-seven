import { Building2, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-6">
              <Building2 className="h-8 w-8 text-orange-500 mr-3" />
              <span className="text-2xl font-semibold font-playfair text-orange-500">J</span>
              <span className="text-2xl font-semibold font-playfair text-blue-400">SEVEN</span>
            </div>
            <p className="text-gray-400 mb-6 font-manrope">
              Streamlines supply management and quotation generation for construction businesses—fast, reliable, and intuitive.
            </p>
            <div className="flex space-x-4">
              {["f", "t", "in"].map((label, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                >
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="font-manrope">
            <h3 className="text-lg font-extrabold mb-6">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white">Quotation Tool</a></li>
              <li><a href="#" className="hover:text-white">Inventory System</a></li>
              <li><a href="#" className="hover:text-white">User Dashboard</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="font-manrope">
            <h3 className="text-lg font-extrabold mb-6">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="font-manrope">
            <h3 className="text-lg font-extrabold mb-6">Contact</h3>
            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3" />
                <span>support@jseven.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3" />
                <span>+63 912 345 6789</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-1" />
                <span>
                  456 Builder’s Lane<br />
                  Makati City, PH 1212
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-400 text-sm font-manrope">
          <p>
            &copy; 2025 <span className="text-orange-500">J</span>
            <span className="text-blue-400">SEVEN</span>. All rights reserved. |{" "}
            <a href="#" className="hover:text-white">Privacy Policy</a> |{" "}
            <a href="#" className="hover:text-white">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
