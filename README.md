# 🏎️ F1 2025 Website

A modern, fully responsive Formula 1 website built with React, featuring immersive driver profiles, team information, championship standings, and the complete 2025 race calendar.

## 🎨 Features

- **Immersive Driver Profiles** - Full-screen sections for all 20 F1 drivers grouped by team
- **Constructor Teams** - Detailed team information with visual textures and animations
- **Live Standings** - Championship standings for both drivers and constructors
- **Race Calendar** - Complete 2025 F1 schedule with 24 races across 5 continents
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dynamic Sticky Header** - Shrinks on scroll with mobile hamburger menu
- **Auto-rotating Carousels** - Smooth driver and team showcases on homepage
- **Infinite Scrolling Partners** - Brand partners and tech partners with opposite scroll directions
- **Background Music Player** - Floating music player with volume control
- **F1-Inspired Theme** - Official Formula1 fonts, red accents, diagonal patterns, and gradient effects

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3
- **Animations:** GSAP 3
- **Routing:** React Router 7
- **Deployment:** Vercel
- **Version Control:** Git + GitHub (Private Repository)

## 🤖 AI Development

This project was developed with the assistance of:
- **Claude Sonnet 4.5** - Primary AI assistant for architecture, features, and implementation
- **Google Gemini 3** - Additional AI support for optimization and refinement

## 📁 Project Structure

```
src/
├── features/
│   ├── home/           # Homepage with hero, next race, carousels
│   ├── drivers/        # Driver profiles and listings
│   ├── teams/          # Constructor teams information
│   ├── standings/      # Championship standings tables
│   └── schedule/       # 2025 race calendar
├── components/
│   ├── header.jsx      # Dynamic navigation with mobile menu
│   ├── Footer.jsx      # Sponsors, links, and infinite scrolling
│   └── MusicPlayer.jsx # Floating background music player
├── pages/
│   ├── index.jsx       # Main routing container
│   └── NotFound.jsx    # 404 error page
└── assets/             # JSON data for drivers, teams, standings
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/JeraldPascual/formula-mockeup.git

# Navigate to project directory
cd formula-mockeup

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Features Detail

### Dynamic Header
- Fixed positioning that sticks to the top
- Shrinks on scroll for better content visibility
- Mobile-responsive hamburger menu
- Active route highlighting

### Driver Profiles
- Full-screen immersive sections
- Grouped by constructor teams
- Gradient overlays with team colors
- Giant background driver numbers

### Team Carousels
- Multi-layer textures (diagonal stripes, dots, hexagons)
- Auto-rotation with manual controls
- Stops on user interaction
- Responsive scaling

### Infinite Scrolling Partners
- **Brand Partners:** Scroll left to right (Rolex, Aramco, Heineken, DHL, Pirelli, AWS)
- **Tech Partners:** Scroll right to left (Teams, Engine suppliers, etc.)
- Gradient text with brand colors
- Pause on hover
- Fade edges for seamless effect

### Race Calendar
- Highlights current/next Grand Prix
- Status badges (Completed, Race Day, Next Up)
- Full circuit information
- Season statistics

## 🎨 Design Philosophy

The website follows the official Formula 1 design language:
- **Colors:** Black background, red accents (#DC2626), white text
- **Typography:** Official Formula1 font family with 5 variants
- **Patterns:** Diagonal stripes, hexagonal grids, gradient overlays
- **Animations:** Smooth GSAP transitions, infinite scrolls, hover effects

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** 1024px - 1280px
- **Large Desktop:** > 1280px

## 🌐 Deployment

Deployed on Vercel with automatic deployments from the main branch.

**Live Site:** https://formula-mockup-adkemkmj3-jeraldpascual15s-projects.vercel.app

## 📄 License

This is a personal project for educational and portfolio purposes.

## 👨‍💻 Developer

**Jerald Pascual**
- GitHub: [@JeraldPascual](https://github.com/JeraldPascual)

---

*Built with ❤️ and AI assistance from Claude Sonnet 4.5 and Google Gemini 3*
