const paths: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      d="M14.5 8.5h2V5.8h-2.2c-2.2 0-3.5 1.3-3.5 3.5v1.6H9v2.7h1.8V21h2.9v-7.4h2.1l.4-2.7h-2.5V9.6c0-.7.3-1.1.8-1.1z"
      fill="currentColor"
    />
  ),
  whatsapp: (
    <>
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.4 20.6l4.1-1.1A8.8 8.8 0 1 0 12 3.2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 8.1c-.2-.5-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3c-.3.3-.9.8-.9 2s.9 2.3 1 2.5c.1.2 1.7 2.7 4.2 3.7 2.1.8 2.5.7 2.9.6.5 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.7 1c-.1.2-.3.2-.5.1a6.9 6.9 0 0 1-3.4-3c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5l-.5-1.5z"
        fill="currentColor"
      />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.6 10.4V17M7.6 7.4v.1M11.4 17v-3.6c0-1.1.9-2 2-2s2 .9 2 2V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
};

export default function SocialIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {paths[name.toLowerCase()] ?? paths.instagram}
    </svg>
  );
}
