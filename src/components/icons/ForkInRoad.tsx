export function ForkInRoadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 10 L60 50 M60 50 L20 78 M60 50 L100 78"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <circle cx="60" cy="50" r="4" fill="currentColor" fillOpacity="0.6" />
      <circle cx="20" cy="78" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="100" cy="78" r="3" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}
