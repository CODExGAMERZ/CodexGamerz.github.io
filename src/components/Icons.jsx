import React from 'react';

// Unified SVG container props
const defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.8',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  style: { width: '24px', height: '24px' }
};

export function CodeScopeIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="m19 19-3.5-3.5" />
    </svg>
  );
}

export function ScaffoldIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M21 12H3" />
      <path d="M12 3v18" />
      <path d="m7.5 7.5 9 9" />
      <path d="m16.5 7.5-9 9" />
    </svg>
  );
}

export function MindIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <path d="M12 6v12" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
    </svg>
  );
}

export function PrismIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export function SightIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M3 3v18h18" />
      <path d="m18.7 8-5.1 5.2-2.8-2.7-4.8 4.8" />
      <circle cx="18.7" cy="8" r="1" />
    </svg>
  );
}

export function ChatbotIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M9 14h6" />
    </svg>
  );
}

export function BrainIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M9.5 2a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-4.12 2.5 2.5 0 0 1 0-4.88 2.5 2.5 0 0 1 0-4.12A2.5 2.5 0 0 1 9.5 2z" />
      <path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-4.12 2.5 2.5 0 0 0 0-4.88 2.5 2.5 0 0 0 0-4.12A2.5 2.5 0 0 0 14.5 2z" />
    </svg>
  );
}

export function AdvisorIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 20v-4" />
      <path d="M17 20v-4" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </svg>
  );
}

export function CompilerIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}

export function TerminalIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="m7 8 3 3-3 3" />
      <path d="M13 13h4" />
    </svg>
  );
}

export function VoltIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function CryptoIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <path d="M12 6v12" />
      <path d="m10 8 4 2-4 2 4 2" />
    </svg>
  );
}

export function StopwatchIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 5V2" />
      <path d="M9 2h6" />
      <path d="M12 9v4l2.5 2.5" />
    </svg>
  );
}

export function NotesIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export function MovieIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
      <path d="M7 2v20" />
      <path d="M17 2v20" />
      <path d="M2 12h20" />
      <path d="M2 7h5" />
      <path d="M2 17h5" />
      <path d="M17 17h5" />
      <path d="M17 7h5" />
    </svg>
  );
}

export function QrIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 9h6v6H9z" />
    </svg>
  );
}

// Interest & about Icons
export function CpuIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </svg>
  );
}

export function LayersIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="m12 2 10 5-10 5L2 7l10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

export function ZapIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function ReportIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function ShieldIcon(props) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

