const paths: Record<string, React.ReactNode> = {
  // Hair
  roots: (
    <>
      <path d="M12 20V9" />
      <path d="M8.5 20c0-4 1.4-7.4 3.5-9.6 2.1 2.2 3.5 5.6 3.5 9.6" />
      <path d="M7 5.5c1.8-1.6 3.6-2.2 5-2.2s3.2.6 5 2.2" />
    </>
  ),
  growth: (
    <>
      <path d="M12 21V8" />
      <path d="M12 12c0-2.8 2-5 4.8-5.4C16.6 9.4 14.6 12 12 12z" />
      <path d="M12 15.5c0-2.4-1.7-4.4-4.2-4.8.2 2.6 1.9 4.8 4.2 4.8z" />
    </>
  ),
  thickness: <path d="M6 20c0-6 1.4-11 4-14M12 20c0-6.5 1.4-11.5 4-14.5M18 20c0-5 1-9 2.4-11.6" />,
  scalp: (
    <>
      <path d="M12 3.5 5 6.4v4.8c0 4.2 2.9 8.1 7 9.3 4.1-1.2 7-5.1 7-9.3V6.4z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
  // Skin
  calm: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M8.6 13.6a4.6 4.6 0 0 0 6.8 0" />
      <path d="M9.4 9.6v.1M14.6 9.6v.1" />
    </>
  ),
  tone: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6a8.4 8.4 0 0 1 0 16.8z" fill="currentColor" stroke="none" opacity="0.35" />
    </>
  ),
  marks: (
    <>
      <path d="M12 3.4c3.7 4.1 5.6 7 5.6 9.7A5.6 5.6 0 0 1 12 18.7a5.6 5.6 0 0 1-5.6-5.6c0-2.7 1.9-5.6 5.6-9.7z" />
      <path d="M9.6 13.4a2.4 2.4 0 0 0 2.4 2.3" />
    </>
  ),
  barrier: (
    <>
      <path d="M12 3.5 5 6.4v4.8c0 4.2 2.9 8.1 7 9.3 4.1-1.2 7-5.1 7-9.3V6.4z" />
      <path d="M9.2 11.8h5.6M12 9v5.6" />
    </>
  ),
};

export default function BannerIcon({ name }: { name: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
