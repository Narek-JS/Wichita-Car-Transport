import { LINKS } from "@/constants/links";
import Link from "next/link";

export const BingIcon: React.FC = () => (
  <Link
    aria-label={LINKS.to_bing.ariaLabel}
    target="_blank"
    href={LINKS.to_bing.url}
  >
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_411_1572)">
        <circle cx="20" cy="20" r="20" fill="#008373" />
        <path
          d="M12.5045 10L16.7875 11.405V25.4667L22.8195 22.2167L19.8629 20.9208L17.996 16.5875L27.5 19.7025V24.2317L16.7875 30L12.5 27.775V10H12.5045Z"
          fill="white" 
        />
      </g>
      <defs>
        <clipPath id="clip0_411_1572">
          <rect
            width="40"
            height="40"
            fill="white" 
          />
        </clipPath>
      </defs>
    </svg>
  </Link>
)