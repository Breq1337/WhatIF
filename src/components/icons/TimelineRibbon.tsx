export function TimelineRibbonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20 Q50 10, 100 20 T200 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
      {[20, 60, 100, 140, 180].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={20}
          r={i === 0 ? 5 : 4}
          fill="currentColor"
          fillOpacity={i === 0 ? 0.8 : 0.25}
        />
      ))}
    </svg>
  );
}
