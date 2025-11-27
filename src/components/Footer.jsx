import { Link } from "react-router-dom";
import { FaXTwitter, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa6";

export const Footer = () => {
  const sponsors = [
    { name: "TAG Heuer", color: "#BA0C2F" },
    { name: "Aramco", color: "#00843D" },
    { name: "Heineken", color: "#00A441" },
    { name: "DHL", color: "#FFCC00" },
    { name: "Pirelli", color: "#FDD503" },
    { name: "AWS", color: "#FF9900" },
    { name: "LVMH", color: "#C19A6B" },
    { name: "Lenovo", color: "#E2231A" },
    { name: "Qatar Airways", color: "#5C0A2B" },
    { name: "MSC", color: "#004494" },
    { name: "Crypto.com", color: "#002D74" },
    { name: "Salesforce", color: "#00A1E0" },
  ];

  const techPartners = [
    { name: 'Ferrari', color: '#DC0000' },
    { name: 'Mercedes', color: '#00D2BE' },
    { name: 'Red Bull', color: '#0600EF' },
    { name: 'McLaren', color: '#FF8700' },
    { name: 'Aston Martin', color: '#006F62' },
    { name: 'Alpine', color: '#0090FF' },
    { name: 'Williams', color: '#005AFF' },
    { name: 'Haas', color: '#FFFFFF' },
    { name: 'Petronas', color: '#00D2BE' },
    { name: 'Shell', color: '#FBCE07' },
    { name: 'ExxonMobil', color: '#FF1E32' },
    { name: 'Honda', color: '#E40521' },
    { name: 'Renault', color: '#FFF500' },
    { name: 'Brembo', color: '#ED1C24' },
    { name: 'Alfa Romeo', color: '#900000' },
  ];  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-white text-4xl font-black tracking-tighter">F1</div>
              <div className="h-10 w-px bg-gradient-to-b from-red-600 to-transparent"></div>
              <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">2025</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The official home of Formula 1. Experience the pinnacle of motorsport racing.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/f1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-red-600 flex items-center justify-center transition-all duration-200 group border border-zinc-800 hover:border-red-600"
                aria-label="Twitter/X"
              >
                <FaXTwitter className="text-white text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com/f1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 flex items-center justify-center transition-all duration-200 group border border-zinc-800 hover:border-transparent"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://facebook.com/Formula1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-200 group border border-zinc-800 hover:border-[#1877F2]"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://youtube.com/f1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-red-600 flex items-center justify-center transition-all duration-200 group border border-zinc-800 hover:border-red-600"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white text-xl group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Drivers', path: '/drivers' },
                { name: 'Teams', path: '/teams' },
                { name: 'Standings', path: '/standings' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-red-500 text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-red-500 transition-all duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-4">Information</h3>
            <ul className="space-y-2">
              {['About F1', 'Regulations', 'Calendar', 'News', 'Tickets', 'Hospitality'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-red-500 transition-all duration-200"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">📍</span>
                <span>Formula 1 HQ<br />London, United Kingdom</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">📧</span>
                <a href="mailto:info@formula1.com" className="hover:text-red-500 transition-colors">
                  info@formula1.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">📞</span>
                <a href="tel:+441234567890" className="hover:text-red-500 transition-colors">
                  +44 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Partners Section */}
        <div className="border-t border-zinc-800 pt-12 mb-8">
          <div className="text-center mb-8">
            <h3 className="text-white font-black text-2xl uppercase tracking-wider mb-2">Official Partners</h3>
            <p className="text-gray-400 text-sm">Powering the pinnacle of motorsport</p>
          </div>

          {/* Brand Partners Grid */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <div className="text-gray-600 text-xs uppercase tracking-wider font-bold">Brand Partners</div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="text-white text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight transition-colors cursor-pointer"
                  style={{
                    '--hover-color': sponsor.color
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = sponsor.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  {sponsor.name}
                </div>
              ))}
            </div>
          </div>

          {/* Technology Partners Grid */}
          <div className="pt-8 border-t border-zinc-800/50">
            <div className="text-center mb-6">
              <div className="text-gray-600 text-xs uppercase tracking-wider font-bold">Technology Partners</div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10">
              {techPartners.map((partner, index) => (
                <div
                  key={index}
                  className="text-gray-500 text-lg md:text-xl lg:text-2xl font-semibold transition-colors cursor-pointer"
                  style={{
                    '--hover-color': partner.color
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = partner.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(107 114 128)'}
                >
                  {partner.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-xs text-center sm:text-left">
            © 2025 Formula One World Championship Limited. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Stripe */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
    </footer>
  );
};
