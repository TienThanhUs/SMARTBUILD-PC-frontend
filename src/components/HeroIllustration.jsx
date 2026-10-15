// 3D Isometric Illustration of PC Hardware (GPU, Motherboard, Circuit Traces & Neon Accents)
export function HeroIllustration({ className = '' }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* Ambient background glows */}
      <div className="absolute -right-8 -top-8 size-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-10 right-20 size-64 rounded-full bg-blue-300/15 blur-2xl" />

      <svg
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="pcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="metalShroud" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="accentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <linearGradient id="goldPins" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="fanBlade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
          </linearGradient>

          <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- BACKGROUND ISOMETRIC MOTHERBOARD PCB GRID --- */}
        <g opacity="0.65">
          {/* Mainboard substrate */}
          <polygon
            points="240,40 500,140 330,370 70,270"
            fill="url(#pcbGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Circuit Lines on Motherboard */}
          <path
            d="M 160,190 L 220,160 L 300,190 L 360,165 L 430,195"
            stroke="#38bdf8"
            strokeWidth="1.75"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 120,230 L 190,200 L 250,225 L 320,195"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 280,110 L 320,125 L 320,170"
            stroke="#93c5fd"
            strokeWidth="1.25"
            opacity="0.5"
          />
          <path
            d="M 370,120 L 410,135 L 410,180"
            stroke="#38bdf8"
            strokeWidth="1.25"
            opacity="0.5"
          />

          {/* SMT Chips on board */}
          <polygon points="260,130 290,142 275,160 245,148" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
          <polygon points="340,150 370,162 355,180 325,168" fill="#1e293b" stroke="#60a5fa" strokeWidth="1" />
          <polygon points="190,165 210,173 200,185 180,177" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />

          {/* RAM DIMM Slots (Isometric) */}
          <g transform="translate(10, -5)" opacity="0.75">
            <polygon points="380,80 430,100 422,112 372,92" fill="#1e293b" stroke="#60a5fa" strokeWidth="1" />
            <polygon points="395,86 445,106 437,118 387,98" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            {/* Glowing RGB line on RAM */}
            <path d="M 383,82 L 428,100" stroke="url(#accentGlow)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 398,88 L 443,106" stroke="url(#accentGlow)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* --- FLOATING 3D GRAPHICS CARD (GPU) --- */}
        <g transform="translate(15, 10)">
          {/* GPU Backplate / Shadow */}
          <polygon
            points="110,210 370,100 440,190 180,300"
            fill="#030712"
            opacity="0.4"
            transform="translate(10, 25)"
          />

          {/* PCIe Connector with Gold Pins */}
          <polygon
            points="140,248 200,222 205,232 145,258"
            fill="url(#goldPins)"
            stroke="#f59e0b"
            strokeWidth="0.75"
          />

          {/* GPU Main Body / Heatsink Base (Isometric Box) */}
          {/* Top Face */}
          <polygon
            points="110,180 380,70 450,150 180,260"
            fill="url(#metalShroud)"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />

          {/* Front / Side Face */}
          <polygon
            points="180,260 450,150 450,185 180,295"
            fill="#0f172a"
            stroke="#1e3a8a"
            strokeWidth="1"
          />

          {/* Left / Bottom Face */}
          <polygon
            points="110,180 180,260 180,295 110,215"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* Glowing RGB Light Strip along GPU Edge */}
          <path
            d="M 180,260 L 450,150"
            stroke="url(#accentGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#neonBlur)"
          />

          {/* Heat Pipes (Metallic tubes across) */}
          <path
            d="M 195,275 L 435,178"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 195,283 L 435,186"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Dual Axial Cooling Fans on Top Face */}
          {/* Fan 1 (Left) */}
          <g transform="translate(230, 195) rotate(-22)">
            <ellipse cx="0" cy="0" rx="42" ry="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
            {/* Blades */}
            <path d="M -8,-6 C -18,-18 -26,-12 -28,-4" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 8,6 C 18,18 26,12 28,4" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M -6,8 C -14,18 -8,24 0,22" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 6,-8 C 14,-18 8,-24 0,-22" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="4" fill="#38bdf8" />
          </g>

          {/* Fan 2 (Right) */}
          <g transform="translate(330, 145) rotate(-22)">
            <ellipse cx="0" cy="0" rx="42" ry="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
            {/* Blades */}
            <path d="M -8,-6 C -18,-18 -26,-12 -28,-4" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 8,6 C 18,18 26,12 28,4" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M -6,8 C -14,18 -8,24 0,22" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 6,-8 C 14,-18 8,-24 0,-22" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="4" fill="#38bdf8" />
          </g>

          {/* Sleek GPU Brand Text / Badge */}
          <text
            x="200"
            y="290"
            fill="#38bdf8"
            fontSize="9"
            fontWeight="700"
            letterSpacing="2"
            opacity="0.9"
            transform="rotate(-22 200 290)"
          >
            RTX · SMARTBUILD AI
          </text>
        </g>

        {/* --- FLOATING HOLOGRAPHIC TECH ELEMENTS --- */}
        {/* Floating CPU Die */}
        <g transform="translate(60, 90)">
          <polygon points="40,20 70,35 50,55 20,40" fill="#0284c7" opacity="0.4" stroke="#38bdf8" strokeWidth="1.25" />
          <polygon points="35,16 65,31 45,51 15,36" fill="#38bdf8" opacity="0.6" stroke="#e0f2fe" strokeWidth="1" />
          <circle cx="40" cy="33" r="3" fill="#ffffff" />
        </g>

        {/* Floating AI Data Nodes */}
        <g opacity="0.8">
          <circle cx="460" cy="80" r="3" fill="#38bdf8" />
          <circle cx="485" cy="115" r="2.5" fill="#a855f7" />
          <circle cx="110" cy="120" r="2.5" fill="#60a5fa" />
          <circle cx="280" cy="330" r="3" fill="#38bdf8" />
          <line x1="460" y1="80" x2="485" y2="115" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}
