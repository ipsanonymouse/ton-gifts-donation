export function TonLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60C0 93.1371 26.8629 120 60 120Z"
        fill="url(#paint0_linear_1_2)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.4085 35.9844H80.5915L75.5319 43.4894H44.4681L39.4085 35.9844ZM44.4681 43.4894L60 84.0156L75.5319 43.4894H44.4681Z"
        fill="white"
      />
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="60" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0098EA" />
          <stop offset="1" stopColor="#0057B7" />
        </linearGradient>
      </defs>
    </svg>
  )
}
