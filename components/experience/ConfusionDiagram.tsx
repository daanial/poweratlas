import type { JSX } from "react";

/**
 * Small schematic illustration of each confusion card's `visualHintFa` metaphor.
 * Decorative (aria-hidden) — the text caption still carries the real content
 * for screen readers. Same thin-line, CSS-variable style as
 * ConstitutionBuilder's MiniInstitutionDiagram and PowerFingerprint's radial chart.
 */

const LINE = "var(--line-strong)";
const FAINT = "var(--line)";
const POWER = "var(--power)";
const MUTED = "var(--muted)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 100 56"
      className="h-14 w-full max-w-[13rem] opacity-80"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Horizontal spectrum with a marker — used for the two "range, not binary" cards. */
function Spectrum({ markerX }: { markerX: number }) {
  return (
    <Frame>
      <line x1="10" y1="28" x2="90" y2="28" stroke={LINE} strokeWidth={2} />
      <circle cx={10} cy={28} r={3} fill={FAINT} />
      <circle cx={90} cy={28} r={3} fill={FAINT} />
      <circle cx={markerX} cy={28} r={5} fill={POWER} />
    </Frame>
  );
}

const NETWORK_NODES = [
  [30, 12],
  [70, 12],
  [18, 40],
  [82, 40],
] as const;

const DIAGRAMS: Record<string, () => JSX.Element> = {
  "republic-not-democracy": () => (
    <Frame>
      <rect x={12} y={8} width={12} height={40} rx={2} fill="none" stroke={LINE} strokeWidth={1.5} />
      <rect x={76} y={8} width={12} height={40} rx={2} fill="none" stroke={LINE} strokeWidth={1.5} />
      <line x1="28" y1="28" x2="72" y2="28" stroke={FAINT} strokeWidth={1.5} strokeDasharray="3 4" />
      <text x="50" y="24" textAnchor="middle" fontSize="11" fill={MUTED}>
        ×
      </text>
    </Frame>
  ),

  "monarchy-not-dictatorship": () => <Spectrum markerX={26} />,

  "election-not-democracy": () => (
    <Frame>
      {NETWORK_NODES.map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={50} y2={28} stroke={FAINT} strokeWidth={1} />
      ))}
      {NETWORK_NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill="none" stroke={LINE} strokeWidth={1.2} />
      ))}
      <rect x={44} y={21} width={12} height={14} rx={1.5} fill="none" stroke={POWER} strokeWidth={1.5} />
      <line x1={46} y1={26} x2={54} y2={26} stroke={POWER} strokeWidth={1.2} />
    </Frame>
  ),

  "constitution-not-constraint": () => (
    <Frame>
      <rect x={10} y={10} width={22} height={30} rx={1.5} fill="none" stroke={LINE} strokeWidth={1.3} />
      {[16, 21, 26, 31].map((y) => (
        <line key={y} x1={14} y1={y} x2={28} y2={y} stroke={FAINT} strokeWidth={1} />
      ))}
      <text x="50" y="22" textAnchor="middle" fontSize="10" fill={MUTED}>
        ؟
      </text>
      <line x1="36" y1="26" x2="64" y2="26" stroke={FAINT} strokeWidth={1.2} strokeDasharray="3 3" />
      <polygon points="68,10 68,40 88,25" fill="none" stroke={POWER} strokeWidth={1.5} strokeLinejoin="round" />
    </Frame>
  ),

  "parliament-not-people": () => (
    <Frame>
      <circle cx={20} cy={36} r={6} fill="none" stroke={LINE} strokeWidth={1.3} />
      <circle cx={50} cy={30} r={10} fill="none" stroke={LINE} strokeWidth={1.3} />
      <circle cx={82} cy={22} r={15} fill="none" stroke={POWER} strokeWidth={1.5} />
    </Frame>
  ),

  "president-not-strongest": () => (
    <Frame>
      <rect x={34} y={8} width={32} height={12} rx={3} fill="none" stroke={FAINT} strokeWidth={1.3} strokeDasharray="2 3" />
      <text x="50" y="17" textAnchor="middle" fontSize="6" fill={MUTED}>
        عنوان
      </text>
      <circle cx={22} cy={42} r={6} fill="none" stroke={LINE} strokeWidth={1.3} />
      <circle cx={78} cy={42} r={9} fill={POWER} opacity={0.85} />
      <line x1="28" y1="42" x2="69" y2="42" stroke={POWER} strokeWidth={1.5} />
    </Frame>
  ),

  "federal-not-weak": () => (
    <Frame>
      <circle cx={38} cy={28} r={19} fill="none" stroke={LINE} strokeWidth={1.4} />
      <circle cx={62} cy={28} r={19} fill="none" stroke={LINE} strokeWidth={1.4} />
      <ellipse cx={50} cy={28} rx={9} ry={16} fill={POWER} opacity={0.25} />
    </Frame>
  ),

  "referendum-not-direct-democracy": () => (
    <Frame>
      <circle cx={18} cy={28} r={6} fill={POWER} opacity={0.8} />
      {[
        [70, 16],
        [90, 16],
        [70, 28],
        [90, 28],
        [70, 40],
        [90, 40],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="none" stroke={LINE} strokeWidth={1.1} />
      ))}
      <line x1="70" y1="16" x2="70" y2="40" stroke={FAINT} strokeWidth={1} />
      <line x1="90" y1="16" x2="90" y2="40" stroke={FAINT} strokeWidth={1} />
      <line x1="70" y1="16" x2="90" y2="16" stroke={FAINT} strokeWidth={1} />
      <line x1="70" y1="28" x2="90" y2="28" stroke={FAINT} strokeWidth={1} />
      <line x1="70" y1="40" x2="90" y2="40" stroke={FAINT} strokeWidth={1} />
    </Frame>
  ),

  "ruling-party-not-one-party-state": () => <Spectrum markerX={68} />,

  "coup-not-only-military": () => (
    <Frame>
      <defs>
        <marker id="confusion-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={POWER} />
        </marker>
      </defs>
      <circle cx={50} cy={30} r={20} fill="none" stroke={LINE} strokeWidth={1.4} />
      <line x1="12" y1="50" x2="34" y2="34" stroke={POWER} strokeWidth={1.8} markerEnd="url(#confusion-arrow)" />
      <circle cx={58} cy={12} r={4} fill={POWER} />
      <path
        d="M 58 12 C 74 14, 74 30, 60 34"
        fill="none"
        stroke={POWER}
        strokeWidth={1.6}
        strokeDasharray="1 3.5"
      />
    </Frame>
  ),

  "lobbying-not-corruption": () => (
    <Frame>
      <circle cx={14} cy={28} r={5} fill="none" stroke={LINE} strokeWidth={1.3} />
      <circle cx={86} cy={28} r={5} fill="none" stroke={LINE} strokeWidth={1.3} />
      <line x1="20" y1="20" x2="80" y2="20" stroke={POWER} strokeWidth={1.6} />
      <line x1="20" y1="36" x2="80" y2="36" stroke={FAINT} strokeWidth={1.4} strokeDasharray="1 3" />
    </Frame>
  ),

  "boycott-not-apathy": () => (
    <Frame>
      <rect x={14} y={16} width={22} height={16} rx={2} fill="none" stroke={POWER} strokeWidth={1.5} />
      <path d="M 20 24 l 4 4 l 8 -8" fill="none" stroke={POWER} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={64} y={16} width={22} height={16} rx={2} fill="none" stroke={FAINT} strokeWidth={1.3} strokeDasharray="2 3" opacity={0.6} />
    </Frame>
  ),
};

export function ConfusionDiagram({ id }: { id: string }) {
  const Diagram = DIAGRAMS[id];
  if (!Diagram) return null;
  return <Diagram />;
}
