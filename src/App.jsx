import { useState, useEffect, useRef } from "react";
import { bgImage, logo, home, away, third } from "./assets";
import { g1, g2, g3, g4, g5, g6 } from "./assets";

// ── KONFIGURASI ─────────────────────────────────────────────────────────────
const CONFIG = {
  brand: "UKM SOCCER 49ers",
  tagline: "Pre-Order Edisi Terbatas",
  whatsappNumber: "62859181970159",
  countdownTarget: new Date("2026-05-11T23:59:59"),
  emailjs: {
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY",
  },
  googleScriptUrl:
    "https://script.google.com/macros/s/AKfycbzyvrdOtN853Y2EImkcrTCik7Lj3QVh_R-ZmpBGZ-pZeKzJqtl3ZfkBjIWz0Kd3PL89Yg/exec",
  imgbbApiKey: "2df15d1feb18ef0df8349d9f03719dc3",
  admin: [
    { nama: "Citra", nomor: "6281235285519", label: "Admin 1" },
    { nama: "Fahmi", nomor: "6285159526990", label: "Admin 2" },
    { nama: "Asep", nomor: "6287765540344", label: "Admin 3" },
  ],
  rekening: [
    {
      bank: "BCA",
      noRek: "1470699767",
      atasNama: "Citra Gisa Tribuana",
      warna: "#005baa",
    },
    {
      bank: "SEA BANK",
      noRek: "901158932710",
      atasNama: "Citra Gisa Tribuana",
      warna: "#f97316",
    },
  ],
};

const PRODUK = [
  {
    id: 1,
    nomor: "01 / HOME SERIES",
    nama: "HOME JERSEY",
    harga: "Rp 170.000",
    specs: [
      "Rhabbit COZY-NET.tech",
      "Pecah Pola",
      "Logo PVC / PMC",
      "Logo Apparel 3D Flock",
    ],
    gambar: home,
    tag: "NEW RELEASE",
    limited: false,
  },
  {
    id: 2,
    nomor: "02 / AWAY SERIES",
    nama: "AWAY JERSEY",
    harga: "Rp 170.000",
    specs: [
      "Rhabbit COZY-NET.tech",
      "Pecah Pola",
      "Logo PVC / PMC",
      "Logo Apparel 3D Flock",
    ],
    gambar: away,
    tag: "NEW RELEASE",
    limited: false,
  },
  {
    id: 3,
    nomor: "03 / THIRD SERIES",
    nama: "THIRD JERSEY",
    harga: "Rp 170.000",
    specs: [
      "Kerah Adidas Polo",
      "Bahan Rabbit",
      "Logo PNC / Polyflex",
      "Pecah Pola",
    ],
    gambar: third,
    tag: "LIMITED",
    limited: true,
  },
];

const GALERI = [g1, g2, g3, g4, g5, g6];
const UKURAN = ["S", "M", "L", "XL", "XXL"];

// ── UTILITAS ─────────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = target - new Date();
      if (diff <= 0) return setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

function pad(n) {
  return String(n ?? 0).padStart(2, "0");
}

// ── LOADER EMAILJS ────────────────────────────────────────────────────────────
function loadEmailJS() {
  return new Promise((resolve) => {
    if (window.emailjs) return resolve(window.emailjs);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => {
      window.emailjs.init(CONFIG.emailjs.publicKey);
      resolve(window.emailjs);
    };
    document.head.appendChild(s);
  });
}

// ── KOMPONEN ──────────────────────────────────────────────────────────────────

function Nav({ scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Tutup dropdown WA kalau klik di luar
  useEffect(() => {
    if (!waOpen) return;
    const handler = (e) => {
      if (!e.target.closest("#nav-wa-menu")) setWaOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [waOpen]);

  // Kunci scroll body saat mobile menu terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const menu = [
    { label: "PRODUK", id: "products" },
    { label: "FILOSOFI", id: "filosofi" },
    { label: "GALERI", id: "galeri" },
    { label: "PANDUAN UKURAN", id: "details" },
    { label: "CARA PESAN", id: "preorder" },
  ];

  const handleScrollTo = (id) => {
    setMenuOpen(false);
    setWaOpen(false);
    setTimeout(() => scrollTo(id), 10);
  };

  const SvgWA = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#4ade80">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-black border-b border-zinc-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="h-10 object-contain flex-shrink-0"
          />

          {/* Menu tengah — desktop only */}
          <div className="hidden md:flex gap-7 text-xs tracking-[0.15em] text-zinc-300 flex-1 justify-center">
            {menu.map((m) => (
              <button
                key={m.id}
                onClick={() => handleScrollTo(m.id)}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Kanan: Hubungi Kami + Pesan Sekarang — desktop only */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <div id="nav-wa-menu" className="relative">
              <button
                onClick={() => setWaOpen((v) => !v)}
                className="flex items-center gap-2 text-xs tracking-[0.15em] text-zinc-300 border border-zinc-700 px-3 py-2 hover:border-zinc-400 hover:text-white transition-colors"
              >
                <SvgWA />
                HUBUNGI KAMI
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: "transform .2s",
                    transform: waOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {waOpen && (
                <div className="absolute top-full right-0 mt-1 w-52 bg-zinc-900 border border-zinc-700 overflow-hidden z-50">
                  <p className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase px-4 py-2 border-b border-zinc-800">
                    Pilih admin
                  </p>
                  {CONFIG.admin.map((adm, i) => (
                    <a
                      key={adm.nomor}
                      href={`https://wa.me/${adm.nomor}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setWaOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors ${i < CONFIG.admin.length - 1 ? "border-b border-zinc-800" : ""}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[9px] font-black">
                          {adm.nama.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-xs font-bold">
                          {adm.nama}
                        </p>
                        <p className="text-zinc-600 text-[10px]">{adm.label}</p>
                      </div>
                      <SvgWA />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleScrollTo("order")}
              className="text-xs tracking-[0.15em] bg-white text-black px-4 py-2 font-bold hover:bg-zinc-200 transition-colors"
            >
              PESAN SEKARANG
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px bg-white transition-all duration-300"
              style={{
                transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-6 h-px bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-px bg-white transition-all duration-300"
              style={{
                transform: menuOpen
                  ? "translateY(-4px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-[72px] flex flex-col overflow-y-auto md:hidden">
          {/* Menu items */}
          <div className="flex flex-col border-b border-zinc-800">
            {menu.map((m) => (
              <button
                key={m.id}
                onClick={() => handleScrollTo(m.id)}
                className="text-left px-6 py-4 text-sm tracking-[0.2em] text-zinc-300 hover:text-white hover:bg-zinc-900 border-b border-zinc-900 transition-colors"
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Hubungi Kami — mobile */}
          <div className="px-6 pt-8 pb-4">
            <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-4">
              Hubungi Kami
            </p>
            <div className="flex flex-col gap-3">
              {CONFIG.admin.map((adm) => (
                <a
                  key={adm.nomor}
                  href={`https://wa.me/${adm.nomor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-3 hover:border-zinc-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-black">
                      {adm.nama.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-xs font-bold">{adm.nama}</p>
                    <p className="text-zinc-600 text-[10px]">{adm.label}</p>
                  </div>
                  <SvgWA />
                </a>
              ))}
            </div>
          </div>

          {/* Pesan Sekarang — mobile */}
          <div className="px-6 pb-10 mt-4">
            <button
              onClick={() => handleScrollTo("order")}
              className="w-full bg-white text-black font-black text-sm tracking-[0.2em] py-4 hover:bg-zinc-200 transition-colors"
            >
              PESAN SEKARANG →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Hero({ scrollTo }) {
  const { d, h, m, s } = useCountdown(CONFIG.countdownTarget);
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute top-0 left-0 w-px h-full bg-zinc-800" />

      <div className="relative z-10 text-center max-w-4xl">
        <p className="text-xs tracking-[0.4em] text-zinc-200 mb-6 uppercase">
          {CONFIG.tagline}
        </p>
        <h1
          className="font-black text-white leading-tight mb-4 select-none"
          style={{
            fontSize: "clamp(1rem, 8vw, 5rem)",
            letterSpacing: "-0.02em",
            fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
          }}
        >
          {CONFIG.brand}
        </h1>
        <div className="w-24 h-px bg-white mx-auto mb-8" />
        <p className="text-zinc-200 text-sm tracking-[0.2em] mb-12 uppercase">
          Waktu Tersisa
        </p>

        <div className="flex justify-center gap-6 mb-14">
          {[
            { label: "HARI", val: d },
            { label: "JAM", val: h },
            { label: "MENIT", val: m },
            { label: "DETIK", val: s },
          ].map(({ label, val }) => (
            <div key={label} className="text-center">
              <div
                className="text-white font-black tabular-nums"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  fontFamily: "'Arial Black', sans-serif",
                  lineHeight: 1,
                }}
              >
                {pad(val)}
              </div>
              <div className="text-white/70 text-xs tracking-[0.3em]">
                {label}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollTo("order")}
          className="group inline-flex items-center gap-3 bg-white text-black font-black text-sm tracking-[0.2em] px-10 py-4 hover:bg-zinc-100 transition-colors"
        >
          PESAN SEKARANG
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-zinc-700 animate-pulse" />
        <span className="text-zinc-700 text-xs tracking-[0.3em]">GULIR</span>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <span className="text-zinc-600 text-xs tracking-[0.3em]">01</span>
          <div className="flex-1 h-px bg-zinc-800" />
          <h2
            className="text-white font-black text-2xl tracking-[0.15em]"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            KOLEKSI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUK.map((p) => (
            <div
              key={p.id}
              className="group relative"
              style={{ transform: "translateZ(0)", isolation: "isolate" }}
            >
              {/* Gambar */}
              <div
                className="relative overflow-hidden bg-zinc-900 aspect-[3/4]"
                style={{ transform: "translateZ(0)", isolation: "isolate" }}
              >
                <img
                  src={p.gambar}
                  alt={p.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  style={{ display: "block" }}
                />
                <span
                  className="absolute top-4 left-4 text-xs tracking-[0.2em] px-3 py-1 font-black"
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    background: p.limited ? "#e85c00" : "#fff",
                    color: p.limited ? "#fff" : "#000",
                  }}
                >
                  {p.tag}
                </span>
              </div>

              {/* Info block */}
              <div className="pt-5 pb-6 border-t-2 border-white">
                {/* Nomor seri */}
                <p className="text-zinc-500 text-[10px] tracking-[0.3em] mb-2 font-normal">
                  {p.nomor}
                </p>

                {/* Nama */}
                <h3
                  className="text-white font-black text-[17px] tracking-[0.12em] mb-4 leading-none"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {p.nama}
                </h3>

                {/* Harga + status */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-white font-black text-base tracking-[0.05em]"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                  >
                    {p.harga}
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                      style={{ background: p.limited ? "#e85c00" : "#22c55e" }}
                    />
                    <span
                      className="text-xs tracking-[0.2em] font-bold"
                      style={{ color: p.limited ? "#e85c00" : "#22c55e" }}
                    >
                      {p.limited ? "TERBATAS" : "TERSEDIA"}
                    </span>
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-zinc-800 mb-4" />

                {/* Spesifikasi */}
                <ul className="flex flex-col gap-2.5">
                  {p.specs.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-zinc-500 tracking-[0.04em] leading-snug"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0 mt-[5px]" />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* Garis dekoratif penutup */}
                <div className="mt-5 h-px bg-zinc-800/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Filosofi() {
  const [cur, setCur] = useState(0);

  const SvgHome = () => (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <g transform="translate(70,70)">
        <circle
          r="62"
          fill="none"
          stroke="#e85c00"
          strokeWidth=".4"
          opacity=".12"
        />
        <circle
          r="52"
          fill="none"
          stroke="#e85c00"
          strokeWidth=".6"
          opacity=".18"
        />
        <line
          x1="0"
          y1="-34"
          x2="0"
          y2="-60"
          stroke="#e85c00"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="34"
          x2="0"
          y2="60"
          stroke="#e85c00"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="34"
          y1="0"
          x2="60"
          y2="0"
          stroke="#e85c00"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="-34"
          y1="0"
          x2="-60"
          y2="0"
          stroke="#e85c00"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="-24"
          x2="42"
          y2="-42"
          stroke="#e85c00"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity=".85"
        />
        <line
          x1="-24"
          y1="-24"
          x2="-42"
          y2="-42"
          stroke="#e85c00"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity=".85"
        />
        <line
          x1="24"
          y1="24"
          x2="42"
          y2="42"
          stroke="#e85c00"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity=".85"
        />
        <line
          x1="-24"
          y1="24"
          x2="-42"
          y2="42"
          stroke="#e85c00"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity=".85"
        />
        <line
          x1="13"
          y1="-32"
          x2="21"
          y2="-52"
          stroke="#e85c00"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".6"
        />
        <line
          x1="-13"
          y1="-32"
          x2="-21"
          y2="-52"
          stroke="#e85c00"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".6"
        />
        <line
          x1="32"
          y1="13"
          x2="52"
          y2="21"
          stroke="#e85c00"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".6"
        />
        <line
          x1="32"
          y1="-13"
          x2="52"
          y2="-21"
          stroke="#e85c00"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".6"
        />
        <line
          x1="-32"
          y1="13"
          x2="-52"
          y2="21"
          stroke="#e85c00"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".6"
        />
        <line
          x1="-32"
          y1="-13"
          x2="-52"
          y2="-21"
          stroke="#e85c00"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".6"
        />
        <line
          x1="13"
          y1="32"
          x2="21"
          y2="52"
          stroke="#e85c00"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".6"
        />
        <line
          x1="-13"
          y1="32"
          x2="-21"
          y2="52"
          stroke="#e85c00"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".6"
        />
        <circle r="24" fill="#1a0a00" stroke="#e85c00" strokeWidth="1.5" />
        <circle r="18" fill="#e85c00" />
        <circle r="10" fill="#c44a00" />
      </g>
    </svg>
  );

  const SvgAway = () => (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <g transform="translate(70,70)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <g key={deg} transform={`rotate(${deg})`} opacity=".95">
            <polygon points="0,-13 -5,-30 5,-30" fill="#8b0000" />
            <polygon
              points="0,-33 -3.5,-50 3.5,-50"
              fill="#8b0000"
              opacity=".6"
            />
          </g>
        ))}
        <circle r="10" fill="#8b0000" />
        <circle r="5" fill="#cc2222" />
      </g>
    </svg>
  );

  const SvgThird = () => (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <g transform="translate(70,70)">
        <circle
          r="60"
          fill="none"
          stroke="#1a7ab5"
          strokeWidth=".4"
          opacity=".15"
        />
        <polygon
          points="0,-28 24.2,-14 24.2,14 0,28 -24.2,14 -24.2,-14"
          fill="none"
          stroke="#1a7ab5"
          strokeWidth="1.8"
        />
        <polygon
          points="0,-44 38.1,-22 38.1,22 0,44 -38.1,22 -38.1,-22"
          fill="none"
          stroke="#1a7ab5"
          strokeWidth="1"
          opacity=".55"
        />
        <polygon
          points="0,-58 50.2,-29 50.2,29 0,58 -50.2,29 -50.2,-29"
          fill="none"
          stroke="#1a7ab5"
          strokeWidth=".6"
          opacity=".25"
        />
        {[
          [0, -28, 0, -44],
          [24.2, -14, 38.1, -22],
          [24.2, 14, 38.1, 22],
          [0, 28, 0, 44],
          [-24.2, 14, -38.1, 22],
          [-24.2, -14, -38.1, -22],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#1a7ab5"
            strokeWidth="1"
            opacity=".6"
          />
        ))}
        {[
          [0, -44, 0, -58],
          [38.1, -22, 50.2, -29],
          [38.1, 22, 50.2, 29],
          [0, 44, 0, 58],
          [-38.1, 22, -50.2, 29],
          [-38.1, -22, -50.2, -29],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#1a7ab5"
            strokeWidth=".7"
            opacity=".35"
          />
        ))}
        {[
          [0, -28],
          [24.2, -14],
          [24.2, 14],
          [0, 28],
          [-24.2, 14],
          [-24.2, -14],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#1a7ab5" />
        ))}
        {[
          [0, -44],
          [38.1, -22],
          [38.1, 22],
          [0, 44],
          [-38.1, 22],
          [-38.1, -22],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="#1a7ab5" opacity=".6" />
        ))}
        <circle r="10" fill="#1a7ab5" />
        <circle r="5" fill="#4aabee" />
      </g>
    </svg>
  );

  const items = [
    {
      tag: "HOME",
      nama: "HOME JERSEY",
      motifLabel: "MOTIF UTAMA",
      motifNama: "Motif Pancaran Sinar",
      tagline: "SANG SURYA",
      subtagline: "PANCARAN SINAR · SANG PENCERAH",
      accent: "#e85c00",
      bg: "#1a0a00",
      filosofi:
        '"Terinspirasi simbol Muhammadiyah, pancaran sinar melambangkan Sang Pencerah — semangat membawa cahaya ilmu, iman, dan amal. Mahasiswa UMJ adalah generasi yang menerangi Jember dan bangsa melalui pendidikan, olahraga, dan kontribusi sosial."',
      Svg: SvgHome,
    },
    {
      tag: "AWAY",
      nama: "AWAY JERSEY",
      motifLabel: "MOTIF UTAMA",
      motifNama: "Dehaasia pugerensis",
      tagline: "WE ARE READY TO SHINE",
      subtagline: "DEHAASIA PUGERENSIS · FLORA LANGKA JEMBER",
      accent: "#8b0000",
      accentLight: "#cc2222",
      bg: "#1a0505",
      filosofi:
        '"Pattern ini merupakan flora langka yang hanya ada di Jember, disusun menyerupai sinar matahari melambangkan pencerahan dan kebenaran, dengan banyak hal positif yang akan lahir."',
      Svg: SvgAway,
    },
    {
      tag: "THIRD · LIMITED",
      nama: "THIRD JERSEY",
      motifLabel: "MOTIF UTAMA",
      motifNama: "Gedung UMJ · Aksara Jawa · Macan Raung",
      tagline: "STRONGER TOGETHER",
      subtagline: "GEDUNG UMJ · AKSARA JAWA · MACAN RAUNG",
      accent: "#1a7ab5",
      accentLight: "#4aabee",
      bg: "#05101a",
      filosofi:
        '"Gedung UMJ berdiri kokoh sebagai simbol ilmu, persatuan, dan arah masa depan. Aksara Jawa merepresentasikan kearifan lokal dan nilai luhur. Macan Raung adalah identitas Jember — tiap individu punya peran, namun akan jauh lebih kuat ketika bersatu dalam satu tujuan."',
      Svg: SvgThird,
    },
  ];

  const p = items[cur];

  return (
    <section
      id="filosofi"
      className="bg-zinc-950 py-24 px-6 border-t border-zinc-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-16">
          <span className="text-zinc-600 text-xs tracking-[0.3em]">02</span>
          <div className="flex-1 h-px bg-zinc-800" />
          <h2
            className="text-white font-black text-2xl tracking-[0.15em]"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            FILOSOFI JERSEY
          </h2>
        </div>

        {/* Flipbook */}
        <div
          key={cur}
          className="border border-zinc-800 grid grid-cols-1 md:grid-cols-2 min-h-[420px]"
          style={{ animation: "fadeIn 0.4s ease" }}
        >
          {/* Visual kiri */}
          <div
            className="flex flex-col items-center justify-center p-10 relative min-h-[320px]"
            style={{ background: p.bg }}
          >
            <span
              className="absolute top-4 left-4 text-xs tracking-[0.3em] px-3 py-1 font-bold text-white"
              style={{
                background: p.accent,
                fontFamily: "'Arial Black', sans-serif",
              }}
            >
              {p.tag}
            </span>
            <p.Svg />
            <p
              className="font-black text-xl text-center leading-tight mt-4"
              style={{
                color: p.accentLight ?? p.accent,
                fontFamily: "'Arial Black', sans-serif",
              }}
            >
              {p.tagline}
            </p>
            <p
              className="text-xs text-center mt-1 tracking-[0.2em]"
              style={{ color: p.accent, opacity: 0.7 }}
            >
              {p.subtagline}
            </p>
          </div>

          {/* Teks kanan */}
          <div className="bg-zinc-950 p-10 flex flex-col justify-center border-l border-zinc-800">
            <p className="text-zinc-600 text-xs tracking-[0.4em] mb-4 uppercase">
              Jersey {cur + 1} of 3 — {p.tag}
            </p>
            <h3
              className="text-white font-black text-2xl leading-tight mb-5"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              {p.nama}
            </h3>
            <div className="w-8 h-px mb-5" style={{ background: p.accent }} />
            <p className="text-zinc-600 text-xs tracking-[0.3em] mb-1 uppercase">
              {p.motifLabel}
            </p>
            <p
              className="font-black text-sm mb-4"
              style={{
                color: p.accentLight ?? p.accent,
                fontFamily: "'Arial Black', sans-serif",
              }}
            >
              {p.motifNama}
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed italic font-serif">
              {p.filosofi}
            </p>
          </div>
        </div>

        {/* Kontrol */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCur((c) => Math.max(0, c - 1))}
            disabled={cur === 0}
            className="text-xs tracking-[0.2em] font-black bg-white text-black px-5 py-2 hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            ← PREV
          </button>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCur(i)}
                  className="h-px transition-all duration-200"
                  style={{
                    width: i === cur ? 28 : 16,
                    background: i === cur ? "#fff" : "#3f3f3f",
                  }}
                />
              ))}
            </div>
            <span className="text-zinc-600 text-xs tracking-[0.2em]">
              {cur + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={() => setCur((c) => Math.min(items.length - 1, c + 1))}
            disabled={cur === items.length - 1}
            className="text-xs tracking-[0.2em] font-black bg-white text-black px-5 py-2 hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            NEXT →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % GALERI.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? GALERI.length - 1 : prev - 1));

  return (
    <section
      id="galeri"
      className="bg-black py-24 px-6 border-t border-zinc-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <span className="text-zinc-600 text-xs tracking-[0.3em]">03</span>
          <div className="flex-1 h-px bg-zinc-800" />
          <h2
            className="text-white font-black text-2xl tracking-[0.15em]"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            GALERI
          </h2>
        </div>

        <div className="relative md:px-10">
          {/* Mobile: 1 gambar full width */}
          <div className="block md:hidden">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={GALERI[index]}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Desktop: 3 gambar */}
          <div className="hidden md:flex gap-4">
            {[0, 1, 2].map((offset) => {
              const i = (index + offset) % GALERI.length;
              return (
                <div
                  key={i}
                  className="w-1/3 flex-shrink-0 aspect-[2/3] overflow-hidden"
                >
                  <img
                    src={GALERI[i]}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              );
            })}
          </div>

          {/* Tombol overlay kiri — di luar gambar di desktop, overlay di mobile */}
          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-white text-xl md:left-0 -left-1"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "0.5px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            aria-label="Sebelumnya"
          >
            ‹
          </button>

          {/* Tombol overlay kanan — di luar gambar di desktop, overlay di mobile */}
          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-white text-xl md:right-0 -right-1"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "0.5px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            aria-label="Berikutnya"
          >
            ›
          </button>

          {/* Dot indicator */}
          <div className="flex justify-center gap-2 mt-5">
            {GALERI.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Foto ${i + 1}`}
                style={{
                  height: "5px",
                  borderRadius: "3px",
                  border: "none",
                  cursor: "pointer",
                  background: i === index ? "#fff" : "#444",
                  width: i === index ? "18px" : "5px",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section
      id="details"
      className="bg-black py-24 px-6 border-t border-zinc-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <span className="text-zinc-600 text-xs tracking-[0.3em]">04</span>
          <div className="flex-1 h-px bg-zinc-800" />
          <h2
            className="text-white font-black text-2xl tracking-[0.15em]"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            PANDUAN UKURAN
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <h3 className="text-zinc-500 text-xs tracking-[0.3em] mb-6 uppercase">
              Tabel Ukuran (cm)
            </h3>
            <div className="border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-3 px-4 text-left text-zinc-500 text-xs tracking-widest font-normal">
                      UKURAN
                    </th>
                    <th className="py-3 px-4 text-center text-zinc-500 text-xs tracking-widest font-normal">
                      DADA
                    </th>
                    <th className="py-3 px-4 text-center text-zinc-500 text-xs tracking-widest font-normal">
                      PANJANG
                    </th>
                    <th className="py-3 px-4 text-center text-zinc-500 text-xs tracking-widest font-normal">
                      LENGAN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { s: "S", dada: 46, panjang: 68, lengan: 23 },
                    { s: "M", dada: 48, panjang: 69, lengan: 24 },
                    { s: "L", dada: 52, panjang: 72, lengan: 25 },
                    { s: "XL", dada: 53, panjang: 75, lengan: 26 },
                    { s: "XXL", dada: 55, panjang: 79, lengan: 27 },
                  ].map((row, i) => (
                    <tr
                      key={row.s}
                      className={`border-b border-zinc-900 last:border-0 ${i % 2 === 0 ? "bg-zinc-950" : "bg-transparent"}`}
                    >
                      <td className="py-3 px-4 text-white font-bold text-xs tracking-widest">
                        {row.s}
                      </td>
                      <td className="py-3 px-4 text-zinc-400 text-xs text-center">
                        {row.dada}
                      </td>
                      <td className="py-3 px-4 text-zinc-400 text-xs text-center">
                        {row.panjang}
                      </td>
                      <td className="py-3 px-4 text-zinc-400 text-xs text-center">
                        {row.lengan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
              Ukuran di atas berdasarkan pengukuran produk jadi. Toleransi 1-2
              cm mungkin terjadi karena proses produksi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreOrderInfo() {
  const langkah = [
    {
      n: "01",
      judul: "Isi Formulir Pesanan",
      desc: "Lengkapi formulir dengan data diri, ukuran, dan jersey pilihan kamu.",
    },
    {
      n: "02",
      judul: "Konfirmasi Pembayaran",
      desc: "Silahkan membayar dengan cara transfer antar bank dan lampirkan bukti transfernya.",
    },
    {
      n: "03",
      judul: "Produksi Dimulai",
      desc: "Kami memproduksi item kamu — setiap produk dibuat per pesanan. 7–14 hari kerja.",
    },
    {
      n: "04",
      judul: "Dikirim ke Kamu",
      desc: "Estimasi pengiriman 2–5 hari setelah produksi selesai. Nomor resi akan diberikan.",
    },
  ];

  return (
    <section
      id="preorder"
      className="bg-zinc-950 py-24 px-6 border-t border-zinc-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <span className="text-zinc-600 text-xs tracking-[0.3em]">05</span>
          <div className="flex-1 h-px bg-zinc-800" />
          <h2
            className="text-white font-black text-2xl tracking-[0.15em]"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            CARA PEMESANAN
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 border border-zinc-800 mb-16">
          {[
            { label: "Batas Pre-Order", val: "15 JUNI 2026" },
            { label: "Waktu Produksi", val: "7–14 HARI" },
            { label: "Estimasi Pengiriman", val: "2–5 HARI" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 py-5 ${
                i < 2
                  ? "border-b sm:border-b-0 sm:border-r border-zinc-800"
                  : ""
              }`}
            >
              <p className="text-zinc-600 text-xs tracking-[0.2em] mb-2 uppercase">
                {stat.label}
              </p>
              <p className="text-white font-black text-sm tracking-wider">
                {stat.val}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {langkah.map((l) => (
            <div key={l.n} className="relative">
              <span
                className="text-zinc-800 font-black text-5xl leading-none select-none"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                {l.n}
              </span>
              <h4 className="text-white font-bold text-sm tracking-wider mt-3 mb-2 uppercase">
                {l.judul}
              </h4>
              <p className="text-zinc-500 text-xs leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-l-2 border-white pl-6">
          <p className="text-zinc-400 text-xs leading-relaxed max-w-xl">
            Pre-order berarti produksi dimulai setelah periode pemesanan
            ditutup. Semua item diproduksi khusus untuk pesanan kamu — tidak ada
            stok sisa, tidak dijual ulang.
          </p>
        </div>
      </div>
    </section>
  );
}

function OrderForm({ onSubmitSuccess }) {
  const [form, setForm] = useState({
    namaLengkap: "",
    whatsapp: "",
    ukuran: "",
    jumlah: 1,
    catatan: "",
    produk: "",
    lenganPanjang: null, // null = belum dipilih, true = ya, false = tidak
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [copied, setCopied] = useState("");
  const [buktiFoto, setBuktiFoto] = useState(null);
  const [buktiPreview, setBuktiPreview] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const resetForm = () => {
    setForm({
      namaLengkap: "",
      whatsapp: "",
      ukuran: "",
      jumlah: 1,
      catatan: "",
      produk: "",
      lenganPanjang: null,
    });
    setErrors({});
    setBuktiFoto(null);
    setBuktiPreview(null);
    setStatus("idle");
  };

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const wajib = ["namaLengkap", "whatsapp", "ukuran", "produk"];
    const errs = {};
    wajib.forEach((k) => {
      if (!form[k]) errs[k] = "Wajib diisi";
    });
    if (form.jumlah < 1) errs.jumlah = "Min 1";
    if (form.lenganPanjang === null) errs.lenganPanjang = "Wajib dipilih";
    return errs;
  };

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBuktiFoto(file);
    setErrors((er) => ({ ...er, buktiFoto: "" }));
    const reader = new FileReader();
    reader.onload = (ev) => setBuktiPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const uploadFoto = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${CONFIG.imgbbApiKey}`,
      { method: "POST", body: fd },
    );
    const json = await res.json();
    if (!json.success) throw new Error("Upload foto gagal");
    return json.data.url;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (!buktiFoto) errs.buktiFoto = "Wajib upload bukti transfer";
    if (Object.keys(errs).length) return setErrors(errs);
    setStatus("sending");

    try {
      const fotoUrl = await uploadFoto(buktiFoto);
      const produkDipilih = PRODUK.find((p) => form.produk.startsWith(p.nama));

      // ✅ FIX: Generate nomorInvoice SEBELUM kirim ke spreadsheet
      // supaya invoice di sheet, WA notif, dan overlay semuanya sama
      const now = new Date();
      const ymd =
        String(now.getFullYear()) +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0");
      const rand = String(Math.floor(Math.random() * 9000) + 1000);
      const nomorInvoice = `INV-${ymd}-${rand}`;

      // ✅ FIX: lenganPanjang dikirim sebagai string agar sinkron dengan
      // dropdown sheet dan fungsi isLenganPanjang() di Apps Script
      const lenganPanjangStr = form.lenganPanjang ? "Ya (+Rp 15.000)" : "Tidak";

      const payload = {
        nomorInvoice, // ✅ wajib ada
        timestamp: now.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
        nama: form.namaLengkap,
        whatsapp: form.whatsapp,
        produk: produkDipilih?.nama ?? form.produk,
        ukuran: form.ukuran,
        jumlah: form.jumlah,
        lenganPanjang: lenganPanjangStr, // ✅ string, bukan boolean
        catatan: form.catatan || "—",
        buktiFoto: fotoUrl,
        // totalHarga tidak perlu dikirim — Apps Script hitung sendiri
      };

      await fetch(CONFIG.googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      setStatus("idle");
      // ✅ FIX: sertakan nomorInvoice & timestamp agar OrderOverlay pakai data yang sama
      onSubmitSuccess(
        { ...form, buktiFoto: fotoUrl, nomorInvoice, submittedAt: now },
        resetForm,
      );
    } catch (e) {
      console.error("Submit error:", e);
      setStatus("error");
      setErrors((er) => ({
        ...er,
        submit: "Gagal mengirim. Cek koneksi dan coba lagi.",
      }));
    }
  };

  const inputClass = (k) =>
    `w-full bg-zinc-900 border ${errors[k] ? "border-red-500" : "border-zinc-800"} text-white text-sm px-4 py-3 focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-700`;

  return (
    <section
      id="order"
      className="bg-black py-24 px-6 border-t border-zinc-900"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <span className="text-zinc-600 text-xs tracking-[0.3em]">06</span>
          <div className="flex-1 h-px bg-zinc-800" />
          <h2
            className="text-white font-black text-2xl tracking-[0.15em]"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            FORM PEMESANAN
          </h2>
        </div>

        <div className="space-y-5">
          {/* Pilih Produk */}
          <div>
            <label className="block text-zinc-500 text-xs tracking-[0.2em] mb-2 uppercase">
              Produk *
            </label>
            <select
              className={inputClass("produk")}
              value={form.produk}
              onChange={(e) => set("produk", e.target.value)}
            >
              <option value="">Pilih produk</option>
              {PRODUK.map((p) => (
                <option key={p.id} value={`${p.nama} — ${p.harga}`}>
                  {p.nama} — {p.harga}
                </option>
              ))}
            </select>
            {errors.produk && (
              <p className="text-red-500 text-xs mt-1">{errors.produk}</p>
            )}
          </div>

          {/* Nama & WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-zinc-500 text-xs tracking-[0.2em] mb-2 uppercase">
                Nama Lengkap *
              </label>
              <input
                className={inputClass("namaLengkap")}
                placeholder="Nama lengkap kamu"
                value={form.namaLengkap}
                onChange={(e) => set("namaLengkap", e.target.value)}
              />
              {errors.namaLengkap && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.namaLengkap}
                </p>
              )}
            </div>
            <div>
              <label className="block text-zinc-500 text-xs tracking-[0.2em] mb-2 uppercase">
                Nomor WhatsApp *
              </label>
              <input
                className={inputClass("whatsapp")}
                placeholder="cth. 08123456789"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
              )}
            </div>
          </div>

          {/* Ukuran & Jumlah */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-zinc-500 text-xs tracking-[0.2em] mb-2 uppercase">
                Ukuran *
              </label>
              <select
                className={inputClass("ukuran")}
                value={form.ukuran}
                onChange={(e) => set("ukuran", e.target.value)}
              >
                <option value="">—</option>
                {UKURAN.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
              {errors.ukuran && (
                <p className="text-red-500 text-xs mt-1">{errors.ukuran}</p>
              )}
            </div>
            <div>
              <label className="block text-zinc-500 text-xs tracking-[0.2em] mb-2 uppercase">
                Jumlah
              </label>
              <input
                type="number"
                min={1}
                max={10}
                className={inputClass("jumlah")}
                value={form.jumlah}
                onChange={(e) => set("jumlah", parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-zinc-500 text-xs tracking-[0.2em] mb-2 uppercase">
              Catatan (Tulis Nameset disini!)
            </label>
            <textarea
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-500 resize-none"
              rows={2}
              placeholder="Format: Nama, No punggung"
              value={form.catatan}
              onChange={(e) => set("catatan", e.target.value)}
            />
          </div>

          {/* Lengan Panjang */}
          <div>
            <label className="block text-zinc-500 text-xs tracking-[0.2em] mb-1 uppercase">
              Lengan Panjang *{" "}
              <span className="text-zinc-600 normal-case tracking-normal font-normal">
                (+Rp 15.000)
              </span>
            </label>
            <p className="text-zinc-600 text-xs mb-3">
              Pilih apakah kamu ingin opsi lengan panjang untuk jersey ini.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: true, label: "YA", desc: "+Rp 15.000" },
                { val: false, label: "TIDAK", desc: "Lengan pendek (default)" },
              ].map(({ val, label, desc }) => {
                const selected = form.lenganPanjang === val;
                const hasError = errors.lenganPanjang;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => set("lenganPanjang", val)}
                    className={`flex flex-col items-start px-4 py-3 border text-left transition-all duration-150 ${
                      selected
                        ? "border-white bg-white/10"
                        : hasError
                          ? "border-red-500 bg-zinc-900"
                          : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                    }`}
                  >
                    <span
                      className={`text-xs font-black tracking-[0.2em] ${selected ? "text-white" : "text-zinc-400"}`}
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                    >
                      {label}
                    </span>
                    <span
                      className={`text-xs mt-0.5 ${selected ? "text-zinc-300" : "text-zinc-600"}`}
                    >
                      {desc}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.lenganPanjang && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lenganPanjang}
              </p>
            )}
          </div>

          {/* Pembayaran */}
          <div className="flex items-center gap-6 mb-4 mt-4">
            <span className="text-zinc-600 text-xs tracking-[0.3em]">07</span>
            <div className="flex-1 h-px bg-zinc-800" />
            <h2 className="text-white font-black text-2xl tracking-[0.15em]">
              PEMBAYARAN
            </h2>
          </div>

          {/* Step 1: Info Rekening */}
          <div className="border border-zinc-800 bg-zinc-900/40 mb-4">
            <div className="px-5 py-3 border-b border-zinc-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-black text-xs font-black flex items-center justify-center flex-shrink-0">
                1
              </span>
              <p className="text-zinc-300 text-xs tracking-[0.15em] uppercase font-bold">
                Transfer ke salah satu rekening
              </p>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {CONFIG.rekening.map((rek) => (
                <div
                  key={rek.bank}
                  className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{ background: rek.warna }}
                    >
                      <span className="text-[9px] font-bold text-white tracking-wide text-center leading-tight">
                        {rek.bank}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold tracking-widest text-sm">
                        {rek.noRek}
                      </p>
                      <p className="text-zinc-500 text-xs mt-0.5">
                        a.n {rek.atasNama}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(rek.noRek);
                      setCopied(rek.bank);
                      setTimeout(() => setCopied(""), 2000);
                    }}
                    className={`text-xs px-3 py-1.5 border transition-all duration-150 ${copied === rek.bank ? "text-emerald-400 border-emerald-700 bg-emerald-950" : "text-zinc-400 border-zinc-700 hover:text-white"}`}
                  >
                    {copied === rek.bank ? "✓ Tersalin" : "Salin"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Ringkasan Pembayaran */}
          {form.produk &&
            (() => {
              const produkDipilih = PRODUK.find((p) =>
                form.produk.startsWith(p.nama),
              );
              const harga = produkDipilih
                ? parseInt(produkDipilih.harga.replace(/[^0-9]/g, ""), 10)
                : 0;
              const tambahanLengan = form.lenganPanjang ? 15000 : 0;
              const hargaSatuan = harga + tambahanLengan;
              const total = hargaSatuan * form.jumlah;
              const fmt = (n) => "Rp " + n.toLocaleString("id-ID");
              return (
                <div className="border border-zinc-700 bg-zinc-900/60 mb-4">
                  <div className="px-5 py-3 border-b border-zinc-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white text-black text-xs font-black flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <p className="text-zinc-300 text-xs tracking-[0.15em] uppercase font-bold">
                      Ringkasan Pembayaran
                    </p>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">
                        {produkDipilih.nama}
                      </span>
                      <span className="text-zinc-400">{fmt(harga)}</span>
                    </div>
                    {form.lenganPanjang && (
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Lengan Panjang</span>
                        <span className="text-zinc-400">+{fmt(15000)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Jumlah</span>
                      <span className="text-zinc-400">{form.jumlah} pcs</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 px-3 py-3 mt-2">
                      <span
                        className="text-white font-black text-xs tracking-[0.2em] uppercase"
                        style={{ fontFamily: "'Arial Black', sans-serif" }}
                      >
                        Total Transfer
                      </span>
                      <span
                        className="text-white font-black text-lg tracking-wider"
                        style={{ fontFamily: "'Arial Black', sans-serif" }}
                      >
                        {fmt(total)}
                      </span>
                    </div>
                    <p className="text-zinc-600 text-xs pt-1">
                      Transfer tepat sesuai nominal di atas, lalu upload bukti
                      di bawah.
                    </p>
                  </div>
                </div>
              );
            })()}

          {/* Step 3: Upload Bukti */}
          <div className="border border-zinc-800 bg-zinc-900/40 mb-6">
            <div className="px-5 py-3 border-b border-zinc-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-black text-xs font-black flex items-center justify-center flex-shrink-0">
                3
              </span>
              <p className="text-zinc-300 text-xs tracking-[0.15em] uppercase font-bold">
                Upload bukti transfer *
              </p>
            </div>
            <div className="p-4">
              {buktiPreview ? (
                <div className="relative">
                  <img
                    src={buktiPreview}
                    alt="Bukti transfer"
                    className="w-full max-h-48 object-contain border border-zinc-700 bg-zinc-950"
                  />
                  <button
                    onClick={() => {
                      setBuktiFoto(null);
                      setBuktiPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 border border-zinc-600 hover:bg-zinc-800 transition-colors"
                  >
                    ✕ Ganti
                  </button>
                </div>
              ) : (
                <label
                  className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed ${errors.buktiFoto ? "border-red-500 bg-red-950/10" : "border-zinc-700 hover:border-zinc-500"} py-10 cursor-pointer transition-colors`}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={errors.buktiFoto ? "#ef4444" : "#71717a"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <div className="text-center">
                    <p
                      className={`text-xs font-bold tracking-[0.15em] uppercase ${errors.buktiFoto ? "text-red-400" : "text-zinc-400"}`}
                    >
                      Tap untuk upload foto
                    </p>
                    <p className="text-zinc-600 text-xs mt-1">
                      JPG, PNG, WEBP maks. 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFotoChange}
                  />
                </label>
              )}
              {errors.buktiFoto && (
                <p className="text-red-500 text-xs mt-2">{errors.buktiFoto}</p>
              )}
            </div>
          </div>

          {/* Error umum */}
          {errors.submit && (
            <div className="border border-red-800 bg-red-950/30 px-4 py-3 mb-4">
              <p className="text-red-400 text-xs">{errors.submit}</p>
            </div>
          )}

          {/* Dialog Konfirmasi Submit */}
          {showConfirm && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
              <div
                className="absolute inset-0 bg-black/80"
                onClick={() => setShowConfirm(false)}
              />
              <div className="relative z-10 bg-zinc-900 border border-zinc-700 w-full max-w-sm p-6">
                <h4
                  className="text-white font-black text-base tracking-[0.15em] mb-2"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  KONFIRMASI PESANAN
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  Pastikan data dan bukti transfer sudah benar. Pesanan yang
                  sudah disubmit tidak dapat dibatalkan.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setShowConfirm(false);
                      handleSubmit();
                    }}
                    className="w-full bg-white text-black font-black text-xs tracking-[0.2em] py-3 hover:bg-zinc-200 transition-colors"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                  >
                    YA, LANJUTKAN →
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="w-full text-zinc-500 text-xs tracking-[0.2em] py-3 hover:text-zinc-300 transition-colors"
                  >
                    ← BATAL, CEK LAGI
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tombol Submit */}
          <div className="pt-2">
            <button
              onClick={() => {
                const errs = validate();
                if (!buktiFoto) errs.buktiFoto = "Wajib upload bukti transfer";
                if (Object.keys(errs).length) return setErrors(errs);
                setShowConfirm(true);
              }}
              disabled={status === "sending"}
              className="w-full bg-white text-black font-black text-sm tracking-[0.2em] py-4 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
            >
              {status === "sending" ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  MENGUPLOAD & MENGIRIM...
                </>
              ) : (
                "SUBMIT PESANAN →"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── INVOICE CARD — komponen khusus untuk di-capture jadi gambar ──────────────
function InvoiceCard({
  data,
  invoiceData,
  hargaSatuan,
  tambahanLengan,
  hargaPerPcs,
  total,
  innerRef,
  logoSrc,
}) {
  const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

  const produkNama = data?.produk || "—";
  const isHome = produkNama.includes("HOME");
  const isAway = produkNama.includes("AWAY");
  const isThird = produkNama.includes("THIRD");
  const produkColor = isHome
    ? "#ffffff"
    : isAway
      ? "#800020"
      : isThird
        ? "#1a56db"
        : "#cc0000";

  const lenganPanjang =
    data?.lenganPanjang === true || data?.lenganPanjang === "Ya (+Rp 15.000)";
  const lenganColor = lenganPanjang ? "#cc0000" : "#444";
  const lenganLabel = lenganPanjang ? "PANJANG" : "STANDAR";

  return (
    <div
      ref={innerRef}
      style={{
        width: 480,
        background: "#0a0a0a",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Red top accent */}
      <div style={{ height: 3, background: "#cc0000" }} />

      {/* Header */}
      <div
        style={{
          background: "#111",
          padding: "22px 28px",
          borderBottom: "0.5px solid #1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {logoSrc && (
            <img
              src={logoSrc}
              alt="Logo"
              style={{ width: 40, height: 40, objectFit: "contain" }}
              crossOrigin="anonymous"
            />
          )}
          <div>
            <p
              style={{
                fontSize: 9,
                letterSpacing: "0.4em",
                color: "#555",
                margin: "0 0 3px",
              }}
            >
              UKM SOCCER 49ERS
            </p>
            <p
              style={{
                fontSize: 10,
                color: "#444",
                margin: 0,
                letterSpacing: "0.15em",
              }}
            >
              PRE-ORDER 2026
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: 11,
              color: "#fff",
              fontWeight: 700,
              margin: "0 0 3px",
              letterSpacing: "0.05em",
            }}
          >
            {invoiceData?.nomorInvoice || "—"}
          </p>
          <p style={{ fontSize: 10, color: "#555", margin: 0 }}>
            {invoiceData?.tgl} · {invoiceData?.jam} WIB
          </p>
        </div>
      </div>

      {/* Detail pemesan */}
      <div
        style={{ padding: "18px 28px", borderBottom: "0.5px solid #1a1a1a" }}
      >
        <p
          style={{
            fontSize: 9,
            color: "#555",
            letterSpacing: "0.25em",
            margin: "0 0 10px",
          }}
        >
          DETAIL PEMESAN
        </p>
        <div style={{ display: "flex", gap: 32 }}>
          <div>
            <p
              style={{
                fontSize: 9,
                color: "#555",
                letterSpacing: "0.15em",
                margin: "0 0 4px",
              }}
            >
              NAMA
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                margin: 0,
              }}
            >
              {data?.namaLengkap || "—"}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 9,
                color: "#555",
                letterSpacing: "0.15em",
                margin: "0 0 4px",
              }}
            >
              WHATSAPP
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                margin: 0,
              }}
            >
              {data?.whatsapp || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Detail pesanan */}
      <div
        style={{ padding: "18px 28px", borderBottom: "0.5px solid #1a1a1a" }}
      >
        <p
          style={{
            fontSize: 9,
            color: "#555",
            letterSpacing: "0.25em",
            margin: "0 0 10px",
          }}
        >
          DETAIL PESANAN
        </p>
        <div
          style={{
            background: "#141414",
            borderLeft: "2px solid #cc0000",
            border: "0.5px solid #222",
            borderLeft: "2px solid #cc0000",
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <p
              style={{
                fontSize: 9,
                color: "#555",
                letterSpacing: "0.2em",
                margin: 0,
              }}
            >
              PRODUK
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {isThird && (
                <span
                  style={{
                    background: "#e85c00",
                    color: "#fff",
                    fontSize: 8,
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    padding: "2px 7px",
                    borderRadius: 2,
                  }}
                >
                  LIMITED
                </span>
              )}
              <span
                style={{
                  fontSize: 11,
                  color: produkColor,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                {produkNama}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <div>
              <p
                style={{
                  fontSize: 9,
                  color: "#555",
                  letterSpacing: "0.15em",
                  margin: "0 0 4px",
                }}
              >
                UKURAN
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#fff",
                  margin: 0,
                  fontFamily: "'Arial Black', Arial, sans-serif",
                }}
              >
                {data?.ukuran || "—"}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: 9,
                  color: "#555",
                  letterSpacing: "0.15em",
                  margin: "0 0 4px",
                }}
              >
                JUMLAH
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#fff",
                  margin: 0,
                  fontFamily: "'Arial Black', Arial, sans-serif",
                }}
              >
                {data?.jumlah || 1} pcs
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: 9,
                  color: "#555",
                  letterSpacing: "0.15em",
                  margin: "0 0 4px",
                }}
              >
                LENGAN
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 900,
                  color: lenganColor,
                  margin: 0,
                  fontFamily: "'Arial Black', Arial, sans-serif",
                }}
              >
                {lenganLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian harga */}
      <div
        style={{ padding: "16px 28px", borderBottom: "0.5px solid #1a1a1a" }}
      >
        <p
          style={{
            fontSize: 9,
            color: "#555",
            letterSpacing: "0.25em",
            margin: "0 0 10px",
          }}
        >
          RINCIAN HARGA
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 12, color: "#888" }}>Harga jersey</span>
          <span style={{ fontSize: 12, color: "#fff" }}>
            {fmt(hargaSatuan)}
          </span>
        </div>
        {tambahanLengan > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, color: "#888" }}>Lengan panjang</span>
            <span style={{ fontSize: 12, color: "#cc0000" }}>
              +{fmt(tambahanLengan)}
            </span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "#888" }}>
            {fmt(hargaPerPcs)} × {data?.jumlah || 1} pcs
          </span>
          <span style={{ fontSize: 12, color: "#fff" }}>{fmt(total)}</span>
        </div>
      </div>

      {/* Total */}
      <div
        style={{
          padding: "16px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "0.5px solid #1a1a1a",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: "0.2em",
            fontFamily: "'Arial Black', Arial, sans-serif",
          }}
        >
          TOTAL PEMBAYARAN
        </span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#fff",
            fontFamily: "'Arial Black', Arial, sans-serif",
          }}
        >
          {fmt(total)}
        </span>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#060606",
          padding: "10px 28px",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "0.5px solid #1a1a1a",
        }}
      >
        <p style={{ fontSize: 9, color: "#333", margin: 0 }}>
          Simpan sebagai bukti pemesanan
        </p>
        <p style={{ fontSize: 9, color: "#333", margin: 0 }}>ukmsoccer49ers</p>
      </div>
    </div>
  );
}

function OrderOverlay({
  status,
  setStatus,
  submittedForm,
  setSubmittedForm,
  onClose,
}) {
  // ✅ FIX: Pakai nomorInvoice & submittedAt dari handleSubmit
  // agar invoice yang tampil di overlay SAMA PERSIS dengan yang masuk ke spreadsheet
  const [invoiceData] = useState(() => {
    const now = submittedForm?.submittedAt
      ? new Date(submittedForm.submittedAt)
      : new Date();
    const tgl = now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const jam = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      tgl,
      jam,
      nomorInvoice: submittedForm?.nomorInvoice || "—",
    };
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const invoiceRef = useRef(null);
  const [invoiceImgUrl, setInvoiceImgUrl] = useState(null);
  const [invoiceBlobUrl, setInvoiceBlobUrl] = useState(null);
  const [capturing, setCapturing] = useState(false);

  const captureAndUpload = async () => {
    if (!invoiceRef.current) return;
    try {
      setCapturing(true);
      const html2canvas = (
        await import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js")
      ).default;
      const canvas = await html2canvas(invoiceRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));

      // Simpan blob URL untuk download langsung tanpa redirect
      const blobUrl = URL.createObjectURL(blob);
      setInvoiceBlobUrl(blobUrl);

      // Upload ke ImgBB untuk dikirim ke WA
      const formData = new FormData();
      formData.append("image", blob, "invoice.png");
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${CONFIG.imgbbApiKey}`,
        { method: "POST", body: formData },
      );
      const json = await res.json();
      const url = json?.data?.url;
      if (url) {
        setInvoiceImgUrl(url);
        await fetch(CONFIG.googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            type: "invoice_image",
            nomorInvoice: submittedForm?.nomorInvoice,
            whatsapp: submittedForm?.whatsapp,
            invoiceImageUrl: url,
          }),
        });
      }
    } catch (err) {
      console.error("Capture error:", err);
    } finally {
      setCapturing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => captureAndUpload(), 800);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup blob URL saat overlay ditutup
  useEffect(() => {
    return () => {
      if (invoiceBlobUrl) URL.revokeObjectURL(invoiceBlobUrl);
    };
  }, [invoiceBlobUrl]);

  const handleDownloadInvoice = () => {
    if (!invoiceBlobUrl) return;
    const a = document.createElement("a");
    a.href = invoiceBlobUrl;
    a.download = `Invoice-${submittedForm?.nomorInvoice || "order"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleTutup = () => {
    onClose?.();
    setStatus(null);
    setSubmittedForm(null);
  };

  const handlePesanLagi = () => {
    setStatus(null);
    setSubmittedForm(null);
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const produkData = PRODUK.find((p) =>
    submittedForm?.produk?.startsWith(p.nama),
  );
  const produkNamaOverlay = submittedForm?.produk || "";
  const produkColor = produkNamaOverlay.includes("HOME")
    ? "#ffffff"
    : produkNamaOverlay.includes("AWAY")
      ? "#800020"
      : produkNamaOverlay.includes("THIRD")
        ? "#1a56db"
        : "#ffffff";
  const hargaSatuan = produkData
    ? parseInt(produkData.harga.replace(/[^0-9]/g, ""), 10)
    : 170000;
  const tambahanLengan = submittedForm?.lenganPanjang ? 15000 : 0;
  const hargaPerPcs = hargaSatuan + tambahanLengan;
  const total = hargaPerPcs * (submittedForm?.jumlah || 1);
  const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      {/* Hidden InvoiceCard khusus untuk di-capture */}
      <div
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <InvoiceCard
          data={submittedForm}
          invoiceData={invoiceData}
          hargaSatuan={hargaSatuan}
          tambahanLengan={tambahanLengan}
          hargaPerPcs={hargaPerPcs}
          total={total}
          innerRef={invoiceRef}
          logoSrc={logo}
        />
      </div>

      <div
        className="w-full max-w-lg my-auto"
        style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
      >
        {/* Invoice card */}
        <div
          className="bg-[#0d0d0d] border border-[#2a2a2a] overflow-hidden"
          style={{ borderRadius: 8 }}
        >
          {/* Header brand */}
          <div className="bg-[#111] px-7 py-5 border-b border-[#222] flex items-start justify-between">
            <div>
              <p
                className="text-[10px] tracking-[0.35em] text-zinc-600 mb-1 font-normal"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                UKM SOCCER
              </p>
              <p className="text-xl font-black text-white tracking-[0.08em] leading-none">
                49ERS
              </p>
              <p
                className="text-[9px] text-zinc-700 tracking-[0.25em] mt-1 font-normal"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                PRE-ORDER 2026
              </p>
            </div>
            <div className="text-right">
              <div
                className="inline-flex items-center gap-1.5 bg-[#0d2e1a] border border-[#1a5c32] px-3 py-1.5 mb-2"
                style={{ borderRadius: 4 }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[10px] font-black text-green-400 tracking-[0.2em]">
                  SUBMITTED
                </span>
              </div>
              <p
                className="text-[10px] text-zinc-600 tracking-[0.1em] font-normal"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {invoiceData.nomorInvoice}
              </p>
              <p
                className="text-[10px] text-zinc-700 tracking-[0.08em] mt-0.5 font-normal"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {invoiceData.tgl} · {invoiceData.jam} WIB
              </p>
            </div>
          </div>

          {/* Detail pemesan */}
          <div className="px-7 py-5 border-b border-[#1e1e1e]">
            <p
              className="text-[9px] tracking-[0.3em] text-zinc-600 mb-3 font-normal"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              DETAIL PEMESAN
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p
                  className="text-[9px] text-zinc-600 tracking-[0.2em] mb-1 font-normal"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  NAMA
                </p>
                <p className="text-sm font-black text-white tracking-wide">
                  {submittedForm?.namaLengkap}
                </p>
              </div>
              <div>
                <p
                  className="text-[9px] text-zinc-600 tracking-[0.2em] mb-1 font-normal"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  WHATSAPP
                </p>
                <p className="text-sm font-black text-white tracking-wide">
                  {submittedForm?.whatsapp}
                </p>
              </div>
            </div>
          </div>

          {/* Detail pesanan */}
          <div className="px-7 py-5 border-b border-[#1e1e1e]">
            <p
              className="text-[9px] tracking-[0.3em] text-zinc-600 mb-3 font-normal"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              DETAIL PESANAN
            </p>
            <div
              className="bg-[#161616] border border-[#222] overflow-hidden"
              style={{ borderRadius: 6 }}
            >
              <div className="px-4 py-3 border-b border-[#1e1e1e] flex items-center justify-between">
                <div>
                  <p
                    className="text-[9px] text-zinc-600 tracking-[0.2em] mb-1 font-normal"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    PRODUK
                  </p>
                  <p
                    className="text-sm font-black tracking-[0.08em]"
                    style={{ color: produkColor }}
                  >
                    {produkData?.nama || submittedForm?.produk}
                  </p>
                </div>
                {produkData?.limited && (
                  <span
                    className="bg-[#e85c00] px-2 py-0.5 text-[9px] font-black text-white tracking-[0.2em]"
                    style={{ borderRadius: 3 }}
                  >
                    LIMITED
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3">
                <div className="px-4 py-3 border-r border-[#1e1e1e]">
                  <p
                    className="text-[9px] text-zinc-600 tracking-[0.2em] mb-1 font-normal"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    UKURAN
                  </p>
                  <p className="text-base font-black text-white">
                    {submittedForm?.ukuran}
                  </p>
                </div>
                <div className="px-4 py-3 border-r border-[#1e1e1e]">
                  <p
                    className="text-[9px] text-zinc-600 tracking-[0.2em] mb-1 font-normal"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    JUMLAH
                  </p>
                  <p className="text-base font-black text-white">
                    {submittedForm?.jumlah} pcs
                  </p>
                </div>
                <div className="px-4 py-3">
                  <p
                    className="text-[9px] text-zinc-600 tracking-[0.2em] mb-1 font-normal"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    LENGAN
                  </p>
                  <p
                    className="text-sm font-black"
                    style={{
                      color: submittedForm?.lenganPanjang ? "#e85c00" : "#555",
                    }}
                  >
                    {submittedForm?.lenganPanjang ? "PANJANG" : "STANDAR"}
                  </p>
                </div>
              </div>
            </div>
            {submittedForm?.catatan && (
              <div
                className="mt-3 px-4 py-3 bg-[#161616] border border-[#222]"
                style={{ borderRadius: 6 }}
              >
                <p
                  className="text-[9px] text-zinc-600 tracking-[0.2em] mb-1 font-normal"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  CATATAN
                </p>
                <p
                  className="text-xs text-zinc-400 font-normal leading-relaxed"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {submittedForm.catatan}
                </p>
              </div>
            )}
          </div>

          {/* Rincian harga */}
          <div className="px-7 py-5 border-b border-[#1e1e1e]">
            <p
              className="text-[9px] tracking-[0.3em] text-zinc-600 mb-3 font-normal"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              RINCIAN HARGA
            </p>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between items-center">
                <span
                  className="text-xs text-zinc-600 tracking-wide font-normal"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Harga jersey
                </span>
                <span className="text-xs font-black text-zinc-400">
                  {fmt(hargaSatuan)}
                </span>
              </div>
              {submittedForm?.lenganPanjang && (
                <div className="flex justify-between items-center">
                  <span
                    className="text-xs text-zinc-600 tracking-wide font-normal"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Lengan panjang
                  </span>
                  <span
                    className="text-xs font-black"
                    style={{ color: "#e85c00" }}
                  >
                    +{fmt(15000)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span
                  className="text-xs text-zinc-600 tracking-wide font-normal"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {fmt(hargaPerPcs)} × {submittedForm?.jumlah} pcs
                </span>
                <span className="text-xs font-black text-zinc-400">
                  {fmt(total)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center bg-[#161616] -mx-7 px-7 py-4 border-t border-[#222]">
              <span className="text-[11px] font-black text-white tracking-[0.25em]">
                TOTAL PEMBAYARAN
              </span>
              <span className="text-xl font-black text-white tracking-wide">
                {fmt(total)}
              </span>
            </div>
          </div>

          {/* Tombol aksi */}
          <div className="px-7 py-5 grid gap-2">
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={handleDownloadInvoice}
                disabled={!invoiceBlobUrl || capturing}
                className="col-span-3 flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.2em] border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-400 transition-colors bg-transparent font-black disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                {capturing
                  ? "MENYIAPKAN INVOICE..."
                  : invoiceBlobUrl
                    ? "⬇ DOWNLOAD INVOICE"
                    : "MEMPROSES INVOICE..."}
              </button>
              <button
                onClick={handlePesanLagi}
                className="col-span-2 font-black text-[10px] tracking-[0.15em] py-3 border border-[#333] text-zinc-500 hover:text-zinc-200 hover:border-zinc-500 transition-colors bg-transparent"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                PESAN LAGI
              </button>
            </div>
            <button
              onClick={handleTutup}
              className="w-full py-2.5 text-[10px] tracking-[0.2em] text-zinc-100 hover:text-zinc-500 transition-colors bg-transparent border-0 font-normal"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              TUTUP &amp; SELESAI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const [waOpen, setWaOpen] = useState(false);

  const SvgWA = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#4ade80">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <footer className="bg-black border-t border-zinc-800 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top section — 3 kolom: Alamat | Brand (tengah) | Hubungi Kami */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Kolom 1 — Alamat */}
          <div className="hidden md:block">
            <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-5">
              Alamat
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed tracking-wide mb-1">
              UKM Soccer 49ers
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed tracking-wide">
              Universitas Muhammadiyah Jember
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed tracking-wide">
              Jl. Karimata No.49, Sumbersari
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed tracking-wide">
              Jember, Jawa Timur 68124
            </p>
            <a
              href="https://maps.google.com/?q=Universitas+Muhammadiyah+Jember"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-600 text-xs mt-4 hover:text-zinc-300 transition-colors tracking-wide"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lihat di Maps
            </a>
          </div>

          {/* Kolom 2 — Brand (tengah) */}
          <div className="flex flex-col items-center text-center">
            <h3
              className="text-white font-black text-xl tracking-[0.2em] mb-3"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              {CONFIG.brand}
            </h3>
            <div className="w-8 h-px bg-white mb-4" />
            <p className="text-zinc-500 text-xs leading-relaxed tracking-wide">
              Pre-order jersey resmi edisi terbatas.
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed tracking-wide">
              Diproduksi khusus — tidak ada stok sisa.
            </p>
          </div>

          {/* Kolom 3 — Hubungi Kami */}
          <div>
            {/* Alamat — hanya tampil di mobile, di atas Hubungi Kami */}
            <div className="md:hidden mb-6 pb-6 border-b border-zinc-800">
              <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-5">
                Alamat
              </p>
              <p className="text-zinc-400 text-xs leading-relaxed tracking-wide mb-1">
                UKM Soccer 49ers
              </p>
              <p className="text-zinc-500 text-xs leading-relaxed tracking-wide">
                Universitas Muhammadiyah Jember
              </p>
              <p className="text-zinc-500 text-xs leading-relaxed tracking-wide">
                Jl. Karimata No.49, Sumbersari
              </p>
              <p className="text-zinc-500 text-xs leading-relaxed tracking-wide">
                Jember, Jawa Timur 68124
              </p>
              <a
                href="https://maps.google.com/?q=Universitas+Muhammadiyah+Jember"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-600 text-xs mt-4 hover:text-zinc-300 transition-colors tracking-wide"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Lihat di Maps
              </a>
            </div>

            <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-5">
              Hubungi Kami
            </p>
            <div className="flex flex-col gap-4">
              {/* WhatsApp dropdown */}
              <div className="relative">
                <button
                  onClick={() => setWaOpen((v) => !v)}
                  className="group w-full flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-3 hover:border-zinc-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-black border border-zinc-700 flex items-center justify-center flex-shrink-0">
                    <SvgWA />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white text-xs font-bold tracking-wider">
                      WhatsApp Admin
                    </p>
                    <p className="text-zinc-600 text-xs mt-0.5">
                      Pilih admin untuk chat
                    </p>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#71717a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200"
                    style={{
                      transform: waOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {waOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-1 bg-zinc-900 border border-zinc-700 overflow-hidden z-10">
                    <p className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase px-4 py-2 border-b border-zinc-800">
                      Pilih admin
                    </p>
                    {CONFIG.admin.map((adm, i) => (
                      <a
                        key={adm.nomor}
                        href={`https://wa.me/${adm.nomor}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setWaOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors ${i < CONFIG.admin.length - 1 ? "border-b border-zinc-800" : ""}`}
                      >
                        <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-black">
                            {adm.nama.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-xs font-bold">
                            {adm.nama}
                          </p>
                          <p className="text-zinc-600 text-[10px]">
                            {adm.label}
                          </p>
                        </div>
                        <SvgWA />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Instagram */}
              <a
                href="https://instagram.com/ukm49ers"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-3 hover:border-zinc-600 transition-colors"
              >
                <div className="w-8 h-8 bg-black border border-zinc-700 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e879f9"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="0.8"
                      fill="#e879f9"
                      stroke="none"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-xs font-bold tracking-wider">
                    @ukm49ers
                  </p>
                  <p className="text-zinc-600 text-xs mt-0.5">
                    Follow untuk update terbaru
                  </p>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#71717a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-900 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-zinc-700 text-xs tracking-[0.15em]">
            © 2026 {CONFIG.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
// ── COMING SOON — set true untuk menonaktifkan website sementara ─────────────
const COMING_SOON = true;

function AdminPicker() {
  const [open, setOpen] = useState(false);
  const WaIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 px-8 py-3 border border-white text-white text-xs font-black tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
        style={{ fontFamily: "'Arial Black', sans-serif" }}
      >
        <WaIcon />
        HUBUNGI KAMI
      </button>
      {open && (
        <div className="flex gap-3">
          {CONFIG.admin.map((a) => (
            <a
              key={a.nomor}
              href={`https://wa.me/${a.nomor}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex flex-col items-center gap-2 px-5 py-4 border border-zinc-800 hover:border-white transition-colors"
            >
              <div className="w-9 h-9 bg-white flex items-center justify-center flex-shrink-0">
                <span
                  className="text-black text-sm font-black"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                >
                  {a.nama.charAt(0).toUpperCase()}
                </span>
              </div>
              <p
                className="text-white text-xs font-bold"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {a.nama}
              </p>
              <p
                className="text-zinc-600 text-[9px] tracking-[0.15em] uppercase"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {a.label}
              </p>
              <WaIcon />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <img src={logo} alt="Logo" className="h-20 mb-8 object-contain" />
      <p className="text-zinc-600 text-xs tracking-[0.4em] mb-3 uppercase">
        UKM Soccer 49ers
      </p>
      <h1
        className="text-white font-black text-4xl md:text-6xl tracking-tight mb-6"
        style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
      >
        PRE-ORDER
        <br />
        DIBUKA SEGERA
      </h1>
      <div className="w-12 h-px bg-zinc-700 mb-6" />
      <p className="text-zinc-500 text-sm max-w-xs mb-2">
        Jersey eksklusif edisi terbatas akan segera tersedia.
      </p>
      <p className="text-orange-500 text-xs font-black tracking-widest mb-2 uppercase">
        ⚡ Kuota terbatas — jangan sampai kehabisan!
      </p>
      <AdminPicker />
    </div>
  );
}

// ── PRE-ORDER CLOSED — tampil otomatis saat countdown habis ──────────────────
function PreOrderClosed() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <img src={logo} alt="Logo" className="h-20 mb-8 object-contain" />
      <p className="text-zinc-600 text-xs tracking-[0.4em] mb-3 uppercase">
        UKM Soccer 49ers
      </p>
      <h1
        className="text-white font-black text-4xl md:text-6xl tracking-tight mb-6"
        style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
      >
        PRE-ORDER
        <br />
        TELAH DITUTUP
      </h1>
      <div className="w-12 h-px bg-zinc-700 mb-6" />
      <p className="text-zinc-500 text-sm max-w-xs mb-2">
        Terima kasih atas antusiasme kalian! Pre-order jersey eksklusif UKM
        Soccer 49ers telah resmi ditutup.
      </p>
      <p className="text-orange-500 text-xs font-black tracking-widest mb-6 uppercase">
        🙏 Sampai jumpa di pre-order berikutnya!
      </p>
      <AdminPicker />
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [overlayStatus, setOverlayStatus] = useState(null); // null | "success" | "editing"
  const [submittedForm, setSubmittedForm] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [resetOrderForm, setResetOrderForm] = useState(null);

  const handleSubmitSuccess = (formData, resetFn) => {
    setSubmittedForm(formData);
    setResetOrderForm(() => resetFn);
    setOverlayStatus("success");
  };

  // ✅ Cek apakah waktu pre-order sudah habis
  const sudahHabis = new Date() >= CONFIG.countdownTarget;

  if (COMING_SOON) return <ComingSoon />;
  if (sudahHabis) return <PreOrderClosed />;

  return (
    <div className="bg-black font-sans antialiased">
      <Nav scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <Products />
      <Filosofi />
      <Gallery />
      <Details />
      <PreOrderInfo />
      <OrderForm onSubmitSuccess={handleSubmitSuccess} />
      <Footer />
      {overlayStatus && submittedForm && (
        <OrderOverlay
          status={overlayStatus}
          setStatus={setOverlayStatus}
          submittedForm={submittedForm}
          setSubmittedForm={setSubmittedForm}
          onClose={() => {
            resetOrderForm?.();
            setResetOrderForm(null);
          }}
        />
      )}
    </div>
  );
}
