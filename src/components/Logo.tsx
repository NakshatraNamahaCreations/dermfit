export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="Dermfit">
      <rect width="40" height="40" rx="12" className="fill-brand-700" />
      <path
        d="M13 27V13h5.4c4.3 0 7.1 2.7 7.1 7s-2.8 7-7.1 7H13Z"
        className="fill-white"
      />
      <circle cx="27.5" cy="14" r="2.6" className="fill-sand-300" />
    </svg>
  );
}
