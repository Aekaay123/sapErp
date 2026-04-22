import { useState, useEffect, useCallback, useRef } from "react";
import {
    ShoppingCart, Package, Landmark, TrendingUp, TrendingDown, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity, BarChart3, FileText, Users, CreditCard, Truck, RefreshCw,
    ChevronRight, Zap, Shield, Globe, Layers, CircleDot, Bell, Search, Settings, Database, Server, Cpu, HardDrive, Wifi, ArrowRight, ExternalLink, Calendar, Filter, Download, MoreHorizontal, PieChart, Target, Award, TrendingUp as Trend,
} from "lucide-react";

const INJECTED_CSS = `
  @keyframes dashFadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes dashFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes dashSlideInRight {
    from { opacity: 0; transform: translateX(24px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes dashSlideInLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes dashScaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes dashPulseGlow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  @keyframes dashShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes dashFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes dashGradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes dashProgressFill {
    from { width: 0%; }
  }
  @keyframes dashCountPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @keyframes dashRingDraw {
    from { stroke-dashoffset: var(--ring-circumference); }
  }
  @keyframes dashBorderGlow {
    0%, 100% { border-color: rgba(56, 189, 148, 0.1); }
    50% { border-color: rgba(56, 189, 148, 0.3); }
  }
  @keyframes dashSpinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .dash-animate-fade-in-up {
    animation: dashFadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .dash-animate-fade-in {
    animation: dashFadeIn 0.5s ease-out both;
  }
  .dash-animate-slide-right {
    animation: dashSlideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .dash-animate-slide-left {
    animation: dashSlideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .dash-animate-scale-in {
    animation: dashScaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .dash-pulse-glow {
    animation: dashPulseGlow 2s ease-in-out infinite;
  }
  .dash-shimmer-bg {
    background: linear-gradient(90deg, transparent 0%, rgba(56, 189, 148, 0.06) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: dashShimmer 3s linear infinite;
  }
  .dash-float {
    animation: dashFloat 4s ease-in-out infinite;
  }
  .dash-gradient-shift {
    background-size: 200% 200%;
    animation: dashGradientShift 6s ease infinite;
  }
  .dash-border-glow {
    animation: dashBorderGlow 3s ease-in-out infinite;
  }
  .dash-spin-slow {
    animation: dashSpinSlow 8s linear infinite;
  }

  .dash-card {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dash-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(56, 189, 148, 0.15);
  }

  .dash-item-hover {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dash-item-hover:hover {
    background: rgba(56, 189, 148, 0.08);
    transform: translateX(4px);
  }
  .dash-item-hover:hover .dash-chevron {
    opacity: 1;
    transform: translateX(2px);
  }
  .dash-item-hover:hover .dash-item-icon {
    color: #38bd94;
  }

  .dash-btn-hover {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dash-btn-hover:hover {
    border-color: rgba(56, 189, 148, 0.3);
    background: rgba(56, 189, 148, 0.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  .dash-btn-hover:hover .dash-btn-icon {
    transform: scale(1.1);
  }

  .dash-action-btn {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dash-action-btn:hover {
    border-color: rgba(56, 189, 148, 0.25);
    background: rgba(255, 255, 255, 0.03);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
  .dash-action-btn:hover .dash-action-arrow {
    opacity: 1;
    transform: translateX(3px);
  }
  .dash-action-btn:hover .dash-action-icon-bg {
    transform: scale(1.1);
    background: rgba(56, 189, 148, 0.2);
  }

  .dash-activity:hover {
    background: rgba(255, 255, 255, 0.03);
  }
  .dash-activity:hover .dash-activity-icon {
    transform: scale(1.1);
  }

  .dash-tab {
    transition: all 0.25s ease;
    position: relative;
  }
  .dash-tab::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #38bd94;
    transform: scaleX(0);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 2px 2px 0 0;
  }
  .dash-tab-active::after {
    transform: scaleX(1);
  }
  .dash-tab-active {
    color: #38bd94;
  }

  .dash-status-dot {
    position: relative;
  }
  .dash-status-dot::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1px solid currentColor;
    opacity: 0;
    animation: dashPulseGlow 2s ease-in-out infinite;
  }

  .dash-progress-bar {
    position: relative;
    overflow: hidden;
    border-radius: 9999px;
  }
  .dash-progress-bar::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    animation: dashShimmer 2s linear infinite;
    background-size: 200% 100%;
  }

  .dash-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .dash-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .dash-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  .dash-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 640px) {
    .dash-hide-mobile { display: none !important; }
  }
  @media (min-width: 641px) and (max-width: 1023px) {
    .dash-hide-tablet { display: none !important; }
  }
`;

/* ================================================================
   COLOR CONSTANTS
   ================================================================ */
const COLORS = {
    bg: "#0f1117",
    cardBg: "#161922",
    cardBgHover: "#1a1e2a",
    border: "#232738",
    borderHover: "rgba(56, 189, 148, 0.25)",
    text: "#e8eaed",
    textSecondary: "#8b8fa3",
    textMuted: "#5f6378",
    primary: "#38bd94",
    primaryLight: "rgba(56, 189, 148, 0.12)",
    primaryFaint: "rgba(56, 189, 148, 0.06)",
    secondary: "#1e2130",
    success: "#38bd94",
    successBg: "rgba(56, 189, 148, 0.1)",
    warning: "#e5a54b",
    warningBg: "rgba(229, 165, 75, 0.1)",
    info: "#5b8cef",
    infoBg: "rgba(91, 140, 239, 0.1)",
    error: "#ef5b5b",
    errorBg: "rgba(239, 91, 91, 0.1)",
    sales: "#38bd94",
    purchasing: "#5b8cef",
    finance: "#e5a54b",
};

function AnimatedCounter({ target, duration = 1800, prefix = "", suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime;
                    const animate = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

function Sparkline({ data, color = COLORS.primary, height = 40, width = 120 }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const id = `spark-${color.replace(/[^a-z0-9]/gi, "")}`;

    const points = data
        .map((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((val - min) / range) * (height - 6) - 3;
            return `${x},${y}`;
        })
        .join(" ");

    const areaPoints = `0,${height} ${points} ${width},${height}`;

    return (
        <svg width={width} height={height} style={{ overflow: "visible" }}>
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={areaPoints} fill={`url(#${id})`} />
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 1px 3px ${color}40)` }}
            />
            {/* Dot on last point */}
            {(() => {
                const lastX = width;
                const lastY = height - ((data[data.length - 1] - min) / range) * (height - 6) - 3;
                return (
                    <>
                        <circle cx={lastX} cy={lastY} r="3.5" fill={color} />
                        <circle cx={lastX} cy={lastY} r="6" fill={color} opacity="0.2" className="dash-pulse-glow" />
                    </>
                );
            })()}
        </svg>
    );
}

function PerformanceRing({ value, label, size = 76, strokeWidth = 5, color = COLORS.primary }) {
    const [animVal, setAnimVal] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setAnimVal(value), 200);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    const offset = circumference - (animVal / 100) * circumference;

    return (
        <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ position: "relative", width: size, height: size }}>
                <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={COLORS.border}
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{
                            transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                            filter: `drop-shadow(0 0 4px ${color}50)`,
                        }}
                    />
                </svg>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
                        {animVal}%
                    </span>
                </div>
            </div>
            <span style={{ fontSize: 11, color: COLORS.textSecondary, fontWeight: 500 }}>
                {label}
            </span>
        </div>
    );
}

/* ================================================================
   STAT CARD
   ================================================================ */
function StatCard({ title, value, change, changeType, icon: Icon, sparkData, delay = 0, prefix = "", suffix = "" }) {
    const isUp = changeType === "up";
    const changeColor = isUp ? COLORS.success : COLORS.error;

    return (
        <div
            className="dash-card dash-animate-fade-in-up"
            style={{
                animationDelay: `${delay}ms`,
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div className="dash-shimmer-bg" style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.4s" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: 500, margin: 0 }}>{title}</p>
                    <p style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, margin: "6px 0 0", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
                        {isUp ? (
                            <ArrowUpRight size={14} color={changeColor} />
                        ) : (
                            <ArrowDownRight size={14} color={changeColor} />
                        )}
                        <span style={{ fontSize: 12, fontWeight: 600, color: changeColor }}>{change}</span>
                        <span style={{ fontSize: 11, color: COLORS.textMuted }}>vs last month</span>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                    <div
                        className="dash-btn-icon"
                        style={{
                            background: COLORS.primaryLight,
                            borderRadius: 10,
                            padding: 10,
                            transition: "all 0.3s ease",
                        }}
                    >
                        <Icon size={18} color={COLORS.primary} />
                    </div>
                    <div className="dash-hide-mobile">
                        <Sparkline data={sparkData} color={isUp ? COLORS.success : COLORS.error} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================================================================
   MODULE CARD
   ================================================================ */
function ModuleCard({ title, description, icon: Icon, items, status, progress, color, delay = 0 }) {
    const [animProgress, setAnimProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setAnimProgress(progress), 500 + delay);
        return () => clearTimeout(timer);
    }, [progress, delay]);

    const statusConfig = {
        active: { label: "Active", color: COLORS.success, bg: COLORS.successBg },
        warning: { label: "Attention", color: COLORS.warning, bg: COLORS.warningBg },
        idle: { label: "Idle", color: COLORS.textMuted, bg: "rgba(95, 99, 120, 0.1)" },
    };

    const st = statusConfig[status];

    return (
        <div
            className="dash-card dash-animate-fade-in-up"
            style={{
                animationDelay: `${delay}ms`,
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Top accent */}
            <div style={{ height: 3, background: color, transition: "height 0.4s ease" }} />

            <div style={{ padding: "22px" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                            className="dash-action-icon-bg"
                            style={{
                                background: `${color}18`,
                                borderRadius: 10,
                                padding: 10,
                                transition: "all 0.3s ease",
                            }}
                        >
                            <Icon size={20} color={color} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: 17, fontWeight: 600, color: COLORS.text, margin: 0 }}>{title}</h3>
                            <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "3px 0 0" }}>{description}</p>
                        </div>
                    </div>
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 10,
                            fontWeight: 600,
                            color: st.color,
                            background: st.bg,
                            border: `1px solid ${st.color}25`,
                            borderRadius: 8,
                            padding: "3px 8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        <span
                            className="dash-status-dot"
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: st.color,
                                display: "inline-block",
                            }}
                        />
                        {st.label}
                    </span>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Processing</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{animProgress}%</span>
                    </div>
                    <div
                        className="dash-progress-bar"
                        style={{
                            height: 6,
                            background: COLORS.secondary,
                            borderRadius: 9999,
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: `${animProgress}%`,
                                background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                                borderRadius: 9999,
                                transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                boxShadow: `0 0 8px ${color}40`,
                            }}
                        />
                    </div>
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {items.map((item) => (
                        <div
                            key={item.label}
                            className="dash-item-hover"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderRadius: 10,
                                background: COLORS.secondary,
                                padding: "10px 12px",
                                cursor: "pointer",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <item.icon size={14} className="dash-item-icon" style={{ color: COLORS.textSecondary, transition: "color 0.3s" }} />
                                <span style={{ fontSize: 13, color: COLORS.text }}>{item.label}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>
                                    {item.count.toLocaleString()}
                                </span>
                                <ChevronRight
                                    size={14}
                                    className="dash-chevron"
                                    style={{ color: COLORS.textMuted, opacity: 0, transition: "all 0.3s" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ================================================================
   ACTIVITY ITEM
   ================================================================ */
function ActivityItem({ title, description, time, type, delay = 0 }) {
    const config = {
        success: { icon: CheckCircle2, color: COLORS.success, bg: COLORS.successBg },
        warning: { icon: AlertTriangle, color: COLORS.warning, bg: COLORS.warningBg },
        info: { icon: Activity, color: COLORS.info, bg: COLORS.infoBg },
        error: { icon: AlertTriangle, color: COLORS.error, bg: COLORS.errorBg },
    };
    const { icon: TypeIcon, color, bg } = config[type];

    return (
        <div
            className="dash-activity dash-animate-slide-right"
            style={{
                animationDelay: `${delay}ms`,
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                borderRadius: 10,
                padding: "12px",
                cursor: "pointer",
                transition: "background 0.3s ease",
            }}
        >
            <div
                className="dash-activity-icon"
                style={{
                    background: bg,
                    borderRadius: 10,
                    padding: 8,
                    marginTop: 2,
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                }}
            >
                <TypeIcon size={14} color={color} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {title}
                </p>
                <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "3px 0 0" }}>{description}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: COLORS.textMuted, flexShrink: 0, marginTop: 2 }}>
                <Clock size={11} />
                <span>{time}</span>
            </div>
        </div>
    );
}

/* ================================================================
   QUICK ACTION
   ================================================================ */
function QuickAction({ icon: Icon, label, description, delay = 0 }) {
    return (
        <button
            className="dash-action-btn dash-animate-fade-in-up"
            style={{
                animationDelay: `${delay}ms`,
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
                background: COLORS.cardBg,
                padding: "14px 16px",
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
                color: COLORS.text,
                fontFamily: "inherit",
            }}
        >
            <div
                className="dash-action-icon-bg"
                style={{
                    background: COLORS.primaryLight,
                    borderRadius: 10,
                    padding: 10,
                    transition: "all 0.3s ease",
                    flexShrink: 0,
                }}
            >
                <Icon size={16} color={COLORS.primary} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, margin: 0 }}>{label}</p>
                <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: "2px 0 0" }}>{description}</p>
            </div>
            <ChevronRight
                size={16}
                className="dash-action-arrow"
                style={{ color: COLORS.textMuted, opacity: 0, transition: "all 0.3s ease" }}
            />
        </button>
    );
}

/* ================================================================
   SYSTEM STATUS ITEM
   ================================================================ */
function SystemStatusItem({ label, status, health, icon: Icon, delay = 0 }) {
    const isHealthy = health > 95;
    const dotColor = isHealthy ? COLORS.success : COLORS.warning;
    const statusColor = isHealthy ? COLORS.success : COLORS.warning;
    const statusBg = isHealthy ? COLORS.successBg : COLORS.warningBg;

    return (
        <div
            className="dash-animate-slide-right"
            style={{
                animationDelay: `${delay}ms`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 0",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                    className="dash-pulse-glow"
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: dotColor,
                        boxShadow: `0 0 6px ${dotColor}60`,
                        flexShrink: 0,
                    }}
                />
                <Icon size={14} color={COLORS.textSecondary} className="dash-hide-mobile" />
                <span style={{ fontSize: 13, color: COLORS.text }}>{label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: 500 }}>{health}%</span>
                <span
                    style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: statusColor,
                        background: statusBg,
                        border: `1px solid ${statusColor}25`,
                        borderRadius: 6,
                        padding: "2px 8px",
                    }}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}

/* ================================================================
   MINI BAR CHART
   ================================================================ */
function MiniBarChart({ data, height = 60, barWidth = 8 }) {
    const max = Math.max(...data.map((d) => d.value));
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height }}>
            {data.map((d, i) => {
                const barH = animated ? (d.value / max) * height : 0;
                return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div
                            style={{
                                width: barWidth,
                                height: barH,
                                background: `linear-gradient(180deg, ${d.color}, ${d.color}80)`,
                                borderRadius: 4,
                                transition: `height 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
                                boxShadow: `0 0 6px ${d.color}30`,
                            }}
                        />
                        <span style={{ fontSize: 9, color: COLORS.textMuted }}>{d.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

/* ================================================================
   TOP CUSTOMERS TABLE
   ================================================================ */
function TopCustomersTable({ customers }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Header */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: 12,
                    padding: "0 4px 10px",
                    borderBottom: `1px solid ${COLORS.border}`,
                }}
            >
                <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Customer</span>
                <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Orders</span>
                <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Revenue</span>
            </div>
            {/* Rows */}
            {customers.map((c, i) => (
                <div
                    key={c.name}
                    className="dash-item-hover dash-animate-slide-right"
                    style={{
                        animationDelay: `${(i + 1) * 100}ms`,
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto",
                        gap: 12,
                        padding: "10px 4px",
                        borderBottom: `1px solid ${COLORS.border}20`,
                        cursor: "pointer",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 8,
                                background: `${COLORS.primary}15`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 11,
                                fontWeight: 700,
                                color: COLORS.primary,
                                flexShrink: 0,
                            }}
                        >
                            {c.name.charAt(0)}
                        </div>
                        <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 500 }}>{c.name}</span>
                    </div>
                    <span style={{ fontSize: 13, color: COLORS.textSecondary, textAlign: "right", alignSelf: "center" }}>{c.orders}</span>
                    <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 600, textAlign: "right", alignSelf: "center" }}>${c.revenue.toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
}

/* ================================================================
   MAIN DASHBOARD COMPONENT
   ================================================================ */
const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [greeting, setGreeting] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            );
            const hour = now.getHours();
            if (hour < 12) setGreeting("Good Morning");
            else if (hour < 17) setGreeting("Good Afternoon");
            else setGreeting("Good Evening");
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    // Activity Data
    const allActivities = [
        { title: "Sales Order #SO-2847 processed", description: "Customer: Acme Corp - 24 items, $18,450.00", time: "2m ago", type: "success" },
        { title: "GRPO #GR-1923 requires review", description: "Vendor: Global Supplies - 3 items pending QC", time: "8m ago", type: "warning" },
        { title: "AP Invoice #AP-5612 auto-matched", description: "Vendor: Tech Parts Ltd - $7,230.00 matched", time: "15m ago", type: "info" },
        { title: "Journal Entry #JE-8834 posted", description: "Monthly depreciation - 14 accounts affected", time: "23m ago", type: "success" },
        { title: "Delivery #DL-4471 completed", description: "Customer: Matrix Inc - Shipped via FedEx", time: "34m ago", type: "success" },
        { title: "Payment reconciliation alert", description: "3 unmatched payments detected in batch #RC-112", time: "41m ago", type: "error" },
    ];

    const salesActivities = [
        { title: "Sales Order #SO-2847 processed", description: "Customer: Acme Corp - 24 items, $18,450.00", time: "2m ago", type: "success" },
        { title: "Delivery #DL-4471 completed", description: "Customer: Matrix Inc - Shipped via FedEx", time: "34m ago", type: "success" },
        { title: "AR Invoice #AR-7792 generated", description: "Customer: Nova Dynamics - $32,100.00", time: "1h ago", type: "info" },
    ];

    const purchaseActivities = [
        { title: "GRPO #GR-1923 requires review", description: "Vendor: Global Supplies - 3 items pending QC", time: "8m ago", type: "warning" },
        { title: "AP Invoice #AP-5612 auto-matched", description: "Vendor: Tech Parts Ltd - $7,230.00 matched", time: "15m ago", type: "info" },
        { title: "Purchase Order #PO-3341 approved", description: "Vendor: Steel Works Co - $45,800.00", time: "52m ago", type: "success" },
    ];

    const tabActivities = {
        all: allActivities,
        sales: salesActivities,
        purchase: purchaseActivities,
    };

    const topCustomers = [
        { name: "Acme Corp", orders: 342, revenue: 245800 },
        { name: "Matrix Inc", orders: 287, revenue: 198400 },
        { name: "Nova Dynamics", orders: 234, revenue: 176200 },
        { name: "TechFlow Ltd", orders: 198, revenue: 142600 },
        { name: "Global Systems", orders: 167, revenue: 128900 },
    ];

    const weeklyData = [
        { label: "M", value: 45, color: COLORS.sales },
        { label: "T", value: 62, color: COLORS.sales },
        { label: "W", value: 38, color: COLORS.sales },
        { label: "T", value: 78, color: COLORS.sales },
        { label: "F", value: 56, color: COLORS.sales },
        { label: "S", value: 24, color: COLORS.purchasing },
        { label: "S", value: 12, color: COLORS.purchasing },
    ];

    return (
        <>
            {/* Inject CSS */}
            <style dangerouslySetInnerHTML={{ __html: INJECTED_CSS }} />

            <div
                style={{
                    minHeight: "100vh",
                    background: COLORS.bg,
                    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
                    color: COLORS.text,
                    marginTop: 65
                }}
            >
                {/* ─── HEADER ─── */}
                <header
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 50,
                        borderBottom: `1px solid ${COLORS.border}`,
                        background: `${COLORS.bg}dd`,
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                    }}
                >
                    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px" }}>
                        <div
                            style={{
                                display: "flex",
                                height: 60,
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* Logo */}
                            <div className="dash-animate-slide-left" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div
                                    style={{
                                        background: COLORS.primaryLight,
                                        borderRadius: 10,
                                        padding: 8,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Layers size={20} color={COLORS.primary} />
                                </div>
                                <div>
                                    <h1 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, margin: 0, letterSpacing: "-0.01em" }}>
                                        SAP Operations
                                    </h1>
                                    <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: 0, lineHeight: 1 }}>
                                        Enterprise Automation Panel
                                    </p>
                                </div>
                            </div>

                            {/* Right actions */}
                            <div className="dash-animate-slide-right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <button
                                    onClick={handleRefresh}
                                    className="dash-btn-hover"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        borderRadius: 10,
                                        border: `1px solid ${COLORS.border}`,
                                        background: COLORS.secondary,
                                        padding: "6px 12px",
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: COLORS.textSecondary,
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                    }}
                                >
                                    <RefreshCw
                                        size={13}
                                        style={{
                                            animation: refreshing ? "dashSpinSlow 1s linear infinite" : "none",
                                        }}
                                    />
                                    <span className="dash-hide-mobile">Refresh</span>
                                </button>

                                <div
                                    className="dash-hide-mobile"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        borderRadius: 10,
                                        border: `1px solid ${COLORS.border}`,
                                        background: COLORS.secondary,
                                        padding: "6px 12px",
                                    }}
                                >
                                    <Shield size={13} color={COLORS.success} />
                                    <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.text }}>System Healthy</span>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        borderRadius: 10,
                                        border: `1px solid ${COLORS.border}`,
                                        background: COLORS.secondary,
                                        padding: "6px 12px",
                                    }}
                                >
                                    <Clock size={13} color={COLORS.textSecondary} />
                                    <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.text }}>{currentTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ─── MAIN ─── */}
                <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 16px 48px" }}>

                    {/* ─── WELCOME BANNER ─── */}
                    <div
                        className="dash-animate-fade-in-up dash-border-glow"
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 18,
                            border: `1px solid ${COLORS.border}`,
                            background: COLORS.cardBg,
                            padding: "28px 28px",
                            marginBottom: 24,
                        }}
                    >
                        {/* Background decorations */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(135deg, ${COLORS.primaryFaint} 0%, transparent 50%, ${COLORS.infoBg} 100%)`,
                                pointerEvents: "none",
                            }}
                        />
                        <div
                            className="dash-float"
                            style={{
                                position: "absolute",
                                top: -60,
                                right: -40,
                                width: 200,
                                height: 200,
                                background: `${COLORS.primary}08`,
                                borderRadius: "50%",
                                filter: "blur(40px)",
                                pointerEvents: "none",
                            }}
                        />

                        <div style={{ position: "relative" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 20,
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                        <Globe size={14} color={COLORS.primary} />
                                        <span
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 600,
                                                color: COLORS.primary,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em",
                                            }}
                                        >
                                            {greeting}
                                        </span>
                                    </div>
                                    <h2
                                        style={{
                                            fontSize: "clamp(22px, 4vw, 30px)",
                                            fontWeight: 700,
                                            color: COLORS.text,
                                            margin: 0,
                                            letterSpacing: "-0.02em",
                                            lineHeight: 1.15,
                                        }}
                                    >
                                        SAP Operations Dashboard
                                    </h2>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: COLORS.textSecondary,
                                            margin: "10px 0 0",
                                            maxWidth: 520,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        Monitor and manage your enterprise automation workflows across Sales, Purchasing, and Finance modules.
                                        All systems are operational.
                                    </p>
                                </div>

                                {/* Performance Rings */}
                                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                                    <PerformanceRing value={94} label="Uptime" color={COLORS.success} />
                                    <PerformanceRing value={78} label="Efficiency" color={COLORS.info} />
                                    <PerformanceRing value={86} label="Accuracy" color={COLORS.warning} />
                                    <div className="dash-hide-mobile">
                                        <PerformanceRing value={92} label="SLA Met" color={COLORS.primary} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── STATS GRID ─── */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: 16,
                            marginBottom: 24,
                        }}
                    >
                        <StatCard
                            title="Total Transactions"
                            value={12847}
                            change="+12.5%"
                            changeType="up"
                            icon={BarChart3}
                            sparkData={[30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90]}
                            delay={100}
                        />
                        <StatCard
                            title="Active Orders"
                            value={3428}
                            change="+8.2%"
                            changeType="up"
                            icon={ShoppingCart}
                            sparkData={[20, 35, 30, 40, 25, 45, 35, 50, 45, 55, 50, 60]}
                            delay={200}
                        />
                        <StatCard
                            title="Revenue (USD)"
                            value={842650}
                            change="+23.1%"
                            changeType="up"
                            icon={TrendingUp}
                            sparkData={[40, 50, 45, 60, 55, 70, 65, 80, 75, 85, 90, 95]}
                            prefix="$"
                            delay={300}
                        />
                        <StatCard
                            title="Pending Items"
                            value={156}
                            change="-4.3%"
                            changeType="down"
                            icon={Clock}
                            sparkData={[60, 55, 50, 45, 50, 40, 45, 35, 40, 30, 35, 25]}
                            delay={400}
                        />
                    </div>

                    {/* ─── MODULE CARDS ─── */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: 16,
                            marginBottom: 24,
                        }}
                    >
                        <ModuleCard
                            title="Sales"
                            description="Order-to-cash processing"
                            icon={ShoppingCart}
                            status="active"
                            progress={72}
                            color={COLORS.sales}
                            delay={200}
                            items={[
                                { label: "Sales Orders", count: 1284, icon: FileText },
                                { label: "Deliveries", count: 856, icon: Truck },
                                { label: "AR Invoices", count: 742, icon: CreditCard },
                                { label: "Incoming Payments", count: 618, icon: TrendingUp },
                            ]}
                        />
                        <ModuleCard
                            title="Purchasing"
                            description="Procure-to-pay management"
                            icon={Package}
                            status="warning"
                            progress={58}
                            color={COLORS.purchasing}
                            delay={350}
                            items={[
                                { label: "Purchase Orders", count: 967, icon: FileText },
                                { label: "GRPO", count: 523, icon: Package },
                                { label: "AP Invoices", count: 445, icon: CreditCard },
                                { label: "Vendor Payments", count: 312, icon: TrendingDown },
                            ]}
                        />
                        <ModuleCard
                            title="Finance"
                            description="Reconciliation & reporting"
                            icon={Landmark}
                            status="active"
                            progress={85}
                            color={COLORS.finance}
                            delay={500}
                            items={[
                                { label: "Reconciliation", count: 234, icon: RefreshCw },
                                { label: "Chart of Accounts", count: 1850, icon: Layers },
                                { label: "Journal Entries", count: 3421, icon: FileText },
                                { label: "Financial Reports", count: 89, icon: BarChart3 },
                            ]}
                        />
                    </div>

                    {/* ─── BOTTOM SECTION ─── */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 16,
                        }}
                    >
                        {/* Row: Activity + Sidebar */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: 16,
                            }}
                        >
                            {/* Activity Feed */}
                            <div
                                className="dash-animate-fade-in-up"
                                style={{
                                    animationDelay: "400ms",
                                    background: COLORS.cardBg,
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: 14,
                                    overflow: "hidden",
                                    gridColumn: "span 1",
                                }}
                            >
                                {/* Tabs header */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderBottom: `1px solid ${COLORS.border}`,
                                        padding: "16px 20px 0",
                                    }}
                                >
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, margin: 0 }}>
                                        Recent Activity
                                    </h3>
                                    <div style={{ display: "flex", gap: 0 }}>
                                        {["all", "sales", "purchase"].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`dash-tab ${activeTab === tab ? "dash-tab-active" : ""}`}
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    padding: "8px 14px",
                                                    fontSize: 12,
                                                    fontWeight: 500,
                                                    color: activeTab === tab ? COLORS.primary : COLORS.textSecondary,
                                                    cursor: "pointer",
                                                    fontFamily: "inherit",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {tab === "all" ? "All" : tab === "sales" ? "Sales" : "Purchase"}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Activity list */}
                                <div className="dash-scrollbar" style={{ padding: 10, maxHeight: 400, overflowY: "auto" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        {tabActivities[activeTab].map((a, i) => (
                                            <ActivityItem key={`${activeTab}-${i}`} {...a} delay={(i + 1) * 80} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Quick Actions + System Status */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {/* Quick Actions */}
                                <div
                                    className="dash-animate-fade-in-up"
                                    style={{
                                        animationDelay: "500ms",
                                        background: COLORS.cardBg,
                                        border: `1px solid ${COLORS.border}`,
                                        borderRadius: 14,
                                        padding: 20,
                                    }}
                                >
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, margin: "0 0 14px" }}>
                                        Quick Actions
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        <QuickAction icon={FileText} label="New Sales Order" description="Create a new order entry" delay={550} />
                                        <QuickAction icon={Package} label="Process GRPO" description="Goods receipt from vendor" delay={600} />
                                        <QuickAction icon={RefreshCw} label="Run Reconciliation" description="Match payments & invoices" delay={650} />
                                        <QuickAction icon={Users} label="Manage Partners" description="Customer & vendor records" delay={700} />
                                    </div>
                                </div>

                                {/* System Status */}
                                <div
                                    className="dash-animate-fade-in-up"
                                    style={{
                                        animationDelay: "600ms",
                                        background: COLORS.cardBg,
                                        border: `1px solid ${COLORS.border}`,
                                        borderRadius: 14,
                                        padding: 20,
                                    }}
                                >
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, margin: "0 0 12px" }}>
                                        System Status
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                        <SystemStatusItem label="API Gateway" status="Operational" health={99.9} icon={Globe} delay={100} />
                                        <SystemStatusItem label="Database Cluster" status="Operational" health={99.8} icon={Database} delay={200} />
                                        <SystemStatusItem label="Batch Processor" status="Degraded" health={87.2} icon={Cpu} delay={300} />
                                        <SystemStatusItem label="Report Engine" status="Operational" health={99.5} icon={Server} delay={400} />
                                        <SystemStatusItem label="Storage Layer" status="Operational" health={99.7} icon={HardDrive} delay={500} />
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 16,
                                            paddingTop: 14,
                                            borderTop: `1px solid ${COLORS.border}`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span style={{ fontSize: 12, color: COLORS.textMuted }}>Last sync: 2 minutes ago</span>
                                        <button
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                fontSize: 12,
                                                fontWeight: 500,
                                                color: COLORS.primary,
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                fontFamily: "inherit",
                                                transition: "opacity 0.2s",
                                            }}
                                        >
                                            <Zap size={12} />
                                            View details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row: Weekly Overview + Top Customers */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: 16,
                            }}
                        >
                            {/* Weekly Transactions */}
                            <div
                                className="dash-animate-fade-in-up"
                                style={{
                                    animationDelay: "700ms",
                                    background: COLORS.cardBg,
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: 14,
                                    padding: 20,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                    <div>
                                        <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, margin: 0 }}>Weekly Overview</h3>
                                        <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "4px 0 0" }}>Transaction volume by day</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: 3, background: COLORS.sales }} />
                                            <span style={{ fontSize: 11, color: COLORS.textSecondary }}>Weekday</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: 3, background: COLORS.purchasing }} />
                                            <span style={{ fontSize: 11, color: COLORS.textSecondary }}>Weekend</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <MiniBarChart data={weeklyData} height={100} barWidth={20} />
                                </div>

                                {/* Summary row */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: 12,
                                        marginTop: 20,
                                        paddingTop: 16,
                                        borderTop: `1px solid ${COLORS.border}`,
                                    }}
                                >
                                    {[
                                        { label: "Total", value: "315", icon: Target },
                                        { label: "Avg/Day", value: "45", icon: BarChart3 },
                                        { label: "Peak", value: "78", icon: Award },
                                    ].map((s) => (
                                        <div key={s.label} style={{ textAlign: "center" }}>
                                            <s.icon size={14} color={COLORS.textMuted} style={{ margin: "0 auto 6px" }} />
                                            <p style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: 0 }}>{s.value}</p>
                                            <p style={{ fontSize: 11, color: COLORS.textSecondary, margin: "2px 0 0" }}>{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Customers */}
                            <div
                                className="dash-animate-fade-in-up"
                                style={{
                                    animationDelay: "800ms",
                                    background: COLORS.cardBg,
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: 14,
                                    padding: 20,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                                    <div>
                                        <h3 style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, margin: 0 }}>Top Customers</h3>
                                        <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "4px 0 0" }}>By revenue this quarter</p>
                                    </div>
                                    <button
                                        className="dash-btn-hover"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                            borderRadius: 8,
                                            border: `1px solid ${COLORS.border}`,
                                            background: COLORS.secondary,
                                            padding: "5px 10px",
                                            fontSize: 11,
                                            fontWeight: 500,
                                            color: COLORS.textSecondary,
                                            cursor: "pointer",
                                            fontFamily: "inherit",
                                        }}
                                    >
                                        <ExternalLink size={11} />
                                        View all
                                    </button>
                                </div>
                                <TopCustomersTable customers={topCustomers} />
                            </div>
                        </div>
                    </div>
                </main>

                {/* ─── FOOTER ─── */}
                <footer
                    className="dash-animate-fade-in"
                    style={{
                        borderTop: `1px solid ${COLORS.border}`,
                        padding: "16px 0",
                        animationDelay: "900ms",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1280,
                            margin: "0 auto",
                            padding: "0 16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 8,
                        }}
                    >
                        <span style={{ fontSize: 12, color: COLORS.textMuted }}>
                            SAP B1 Operations Dashboard v2.4.1
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 12, color: COLORS.textMuted }}>Connected to SAP B1 10.0</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Wifi size={12} color={COLORS.success} />
                                <span style={{ fontSize: 12, color: COLORS.success, fontWeight: 500 }}>Live</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div >
        </>
    );
};

export default Dashboard;
