export function BalanceScaleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 5 L40 35 M20 15 L40 35 L60 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.4"
      />
      <line x1="20" y1="15" x2="20" y2="45" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="60" y1="15" x2="60" y2="45" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="20" cy="48" r="6" fill="currentColor" fillOpacity="0.2" />
      <circle cx="60" cy="48" r="6" fill="currentColor" fillOpacity="0.2" />
      <circle cx="40" cy="35" r="3" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}
