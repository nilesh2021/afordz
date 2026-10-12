function IconShell({ children, className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.5 16.5L21 21" />
    </>
  ),
  document: (
    <>
      <path d="M7 3.5h7l4 4V20.5H7z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M9.5 12.5h5M9.5 15.5h5" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a5.5 5.5 0 0 0-3.2 9.9c.7.6 1.2 1.4 1.2 2.3v.3h4v-.3c0-.9.5-1.7 1.2-2.3A5.5 5.5 0 0 0 12 3z" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M10 5.5h4M11 18.5h2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.3 2.3 4.7-5" />
    </>
  ),
  list: (
    <>
      <path d="M9 7h10M9 12h10M9 17h10" />
      <circle cx="5" cy="7" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="17" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.8-3 2.7-4.5 5.5-4.5S13.7 16 14.5 19" />
      <circle cx="16.5" cy="8.5" r="2.4" />
      <path d="M15 14.2c2 .4 3.4 1.7 4 4.3" />
    </>
  ),
  map: (
    <>
      <path d="M4 7.5l5-2.5 6 2.5 5-2.5v12l-5 2.5-6-2.5-5 2.5z" />
      <path d="M9 5v12M15 7.5v12" />
    </>
  ),
};

export function LessonIcon({ name, className = "size-5" }) {
  const paths = PATHS[name];
  if (!paths) return null;
  return <IconShell className={className}>{paths}</IconShell>;
}
