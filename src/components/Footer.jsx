import { Link } from "react-router-dom";

export const Footer = () => {
  const sponsors = [
    {
      name: "Rolex",
      category: "Timing Partner",
      gradient: "from-amber-400 to-yellow-600"
    },
    {
      name: "Aramco",
      category: "Global Partner",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      name: "Heineken",
      category: "Official Beer",
      gradient: "from-green-500 to-green-700"
    },
    {
      name: "DHL",
      category: "Logistics Partner",
      gradient: "from-yellow-400 to-red-600"
    },
    {
      name: "Pirelli",
      category: "Tyre Partner",
      gradient: "from-yellow-400 to-yellow-600"
    },
    {
      name: "AWS",
      category: "Cloud Partner",
      gradient: "from-orange-400 to-orange-600"
    },
  ];

  // Additional tech partners for infinite scroll
  const techPartners = [
    'Ferrari', 'Mercedes', 'Red Bull Racing', 'McLaren', 'Aston Martin',
    'Alpine', 'Williams', 'Alfa Romeo', 'Haas', 'RB',
    'Petronas', 'Shell', 'ExxonMobil', 'Honda', 'Renault', 'Brembo'
  ];

  return (
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
              {['twitter', 'instagram', 'facebook', 'youtube'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-red-600 flex items-center justify-center transition-all duration-200 group"
                  aria-label={social}
                >
                  <span className="text-white text-sm group-hover:scale-110 transition-transform">
                    {social === 'twitter' && '𝕏'}
                    {social === 'instagram' && '📷'}
                    {social === 'facebook' && '👍'}
                    {social === 'youtube' && '▶️'}
                  </span>
                </a>
              ))}
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

          {/* Brand sponsors infinite scroll - Left to Right */}
          <div className="mb-8 overflow-hidden">
            <div className="text-center mb-4">
              <div className="text-gray-600 text-xs uppercase tracking-wider font-bold">Brand Partners</div>
            </div>

            <div className="relative">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>

              {/* Scrolling animation - Left to Right */}
              <div className="flex animate-scroll-reverse">
                {/* First set of sponsors */}
                {sponsors.map((sponsor, index) => (
                  <span
                    key={`${sponsor.name}-1-${index}`}
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight bg-gradient-to-r ${sponsor.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap px-8 md:px-12 lg:px-16 flex-shrink-0`}
                  >
                    {sponsor.name}
                  </span>
                ))}
                {/* Duplicate set for seamless loop */}
                {sponsors.map((sponsor, index) => (
                  <span
                    key={`${sponsor.name}-2-${index}`}
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight bg-gradient-to-r ${sponsor.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap px-8 md:px-12 lg:px-16 flex-shrink-0`}
                  >
                    {sponsor.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tech partners infinite scroll - Right to Left */}
          <div className="pt-8 border-t border-zinc-800/50 overflow-hidden">
            <div className="text-center mb-4">
              <div className="text-gray-600 text-xs uppercase tracking-wider font-bold">Technology Partners</div>
            </div>

            <div className="relative">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>

              {/* Scrolling animation - Right to Left */}
              <div className="flex animate-scroll">
                {/* First set of partners */}
                {techPartners.map((partner, index) => (
                  <span
                    key={`${partner}-1-${index}`}
                    className="text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold hover:text-red-500 transition-colors cursor-pointer whitespace-nowrap px-6 md:px-8 lg:px-12 flex-shrink-0"
                  >
                    {partner}
                  </span>
                ))}
                {/* Duplicate set for seamless loop */}
                {techPartners.map((partner, index) => (
                  <span
                    key={`${partner}-2-${index}`}
                    className="text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold hover:text-red-500 transition-colors cursor-pointer whitespace-nowrap px-6 md:px-8 lg:px-12 flex-shrink-0"
                  >
                    {partner}
                  </span>
                ))}
              </div>
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
