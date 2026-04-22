// Header.js
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../Context/SessionContext";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

/* ───────────────────── Animation Variants ───────────────────── */
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const fadeSlideDown = { hidden: { opacity: 0, y: -18 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };
const navLinkVariant = { hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 20 } } };

/* ───────────── Sub-Components ───────────── */

function PulsingDot({ color = "bg-emerald-400" }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-60`} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  const formatted = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const dateStr = time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }} className="hidden lg:flex flex-col items-end">
      <span className="text-xs tracking-widest text-slate-400 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{dateStr}</span>
      <span className="text-sm font-semibold tabular-nums text-slate-200" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{formatted}</span>
    </motion.div>
  );
}

function StatusPill() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 22 }} className="hidden md:flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm">
      <PulsingDot />
      <span className="text-xs font-medium text-emerald-300 tracking-wide">System Online</span>
    </motion.div>
  );
}

function NavLink({ label }) {
  return (
    <motion.a variants={navLinkVariant} href="#" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="relative px-1 py-1 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white group">
      <span className="relative z-10">{label}</span>
      <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
      <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-4 origin-center scale-x-0 rounded-full bg-cyan-400/10 blur-md transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </motion.a>
  );
}

function MobileMenuButton({ open, toggle }) {
  return (
    <motion.button onClick={toggle} whileTap={{ scale: 0.9 }} className="md:hidden flex flex-col items-center justify-center gap-[5px] p-2 rounded-lg hover:bg-slate-800/60 transition-colors" aria-label="Toggle menu">
      <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-[2px] w-5 rounded-full bg-slate-300 origin-center transition-colors" />
      <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="block h-[2px] w-5 rounded-full bg-slate-300 origin-center" />
      <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-[2px] w-5 rounded-full bg-slate-300 origin-center transition-colors" />
    </motion.button>
  );
}

function LogoutButton({ onClick }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} className="group relative overflow-hidden rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-shadow hover:shadow-red-500/30 cursor-pointer ">
      <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-300 group-hover:from-red-600 group-hover:to-rose-700" />
      <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
      <span className="relative flex items-center gap-2">Logout</span>
    </motion.button>
  );
}

function Logo() {
  return (
    <motion.div variants={fadeSlideDown} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 cursor-pointer select-none">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
        <span className="text-[11px] font-black leading-none tracking-tighter">SAP</span>
      </div>
      <div className="hidden sm:flex flex-col leading-tight">
        <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Business One</span>
        <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-slate-500">Operations Hub</span>
      </div>
    </motion.div>
  );
}

function MobileMenu({ links, onLogout }) {
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden md:hidden border-t border-slate-700/50">
      <motion.nav variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-1 px-4 py-4">
        {links.map((link) => <motion.a key={link} variants={navLinkVariant} href="#" className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/70 hover:text-white hover:pl-5">{link}</motion.a>)}
        <motion.div variants={navLinkVariant} className="mt-2 border-t border-slate-700/40">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2"><PulsingDot /><span className="text-xs text-emerald-300">System Online</span></div>
            <button onClick={onLogout} className="rounded-lg bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-red-600 hover:to-rose-700 transition-all cursor-pointer">Logout</button>
          </div>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}

/* ────────────────────── MAIN HEADER ────────────────────── */
export function Header() {
  const { session, setSession } = useContext(SessionContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    if (!session) return;
    try {
      await axios.post("http://localhost:4000/api/logout", { session });
      setSession("");
      navigate("/");
    } catch (error) { console.error(error); }
  };

  const navLinks = ["Dashboard", "Items", "Partners", "Reports"];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 25 }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-slate-900/85 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] border-b border-slate-700/40" : "bg-slate-900/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-b border-slate-700/20"}`}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex h-16 items-center justify-between">
            <Logo />
            {session && <motion.nav variants={staggerContainer} initial="hidden" animate="show" className="hidden md:flex items-center gap-7">{navLinks.map(link => <NavLink key={link} label={link} />)}</motion.nav>}
            <motion.div variants={fadeSlideDown} className="flex items-center gap-4">
              {session && <>
                <LiveClock />
                <StatusPill />
                <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-slate-600/50 text-xs font-bold text-cyan-300 uppercase cursor-pointer hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">AD</div>
                <div className="hidden sm:block h-6 w-px bg-slate-700/60" />
                <div className="hidden md:block"><LogoutButton onClick={handleLogout} /></div>
                <MobileMenuButton open={mobileOpen} toggle={() => setMobileOpen(!mobileOpen)} />
              </>}
            </motion.div>
          </motion.div>
        </div>
        <AnimatePresence>{session && mobileOpen && <MobileMenu links={navLinks} onLogout={handleLogout} />}</AnimatePresence>
      </motion.header>
    </>
  );
}