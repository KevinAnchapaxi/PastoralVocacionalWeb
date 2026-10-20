/** Iconos de línea (2px) en currentColor, según la iconografía del manual (p. 7). */
const PATHS = {
  cross: <path d="M12 3v18M6 8h12" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5M15 18c0-2 2-3.5 4-3.5s3 1.5 3 3.5" />
    </>
  ),
  net: <path d="M4 4l16 16M20 4L4 20M4 12h16M12 4v16" />,
  boat: <path d="M3 15h18l-2 4H5zM7 15V8h6l4 7M13 8V5" />,
  star: <path d="M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  hand: (
    <path d="M7 11V5a1.5 1.5 0 0 1 3 0v5M10 10V4a1.5 1.5 0 0 1 3 0v6M13 10V5a1.5 1.5 0 0 1 3 0v8M16 12a1.5 1.5 0 0 1 3 0v3a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-4a1.5 1.5 0 0 1 3 0" />
  ),
  pray: <path d="M12 3v7M9 10h6M8 21l4-9 4 9M6 21h12" />,
  church: <path d="M12 2v5M9.5 4.5h5M4 21V12l8-5 8 5v9zM10 21v-5h4v5" />,
  star5: <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z" />,
};

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 24,
  filled = false,
  className,
}: {
  name: IconName;
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        flexShrink: 0,
        fill: filled ? "currentColor" : "none",
        stroke: filled ? "none" : "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    >
      {PATHS[name]}
    </svg>
  );
}
