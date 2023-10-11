export const LocationIcon: React.FC<{ color?: string }> = ({ color = '#DDC00C'}) => (
    <svg
        width="22"
        height="28"
        viewBox="0 0 22 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_145_8621)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill={color}
                d="M0 10.5C0 15.2797 6.65156 23.7891 9.64219 27.3C10.3469 28.1367 11.6531 28.1367 12.3578 27.3C15.2969 23.7891 22 15.2797 22 10.5C22 4.70094 17.0729 0 11 0C4.92479 0 0 4.70094 0 10.5ZM11 15.4C14.4715 15.4 17.2857 12.8927 17.2857 9.79995C17.2857 6.70716 14.4715 4.19995 11 4.19995C7.5285 4.19995 4.71429 6.70716 4.71429 9.79995C4.71429 12.8927 7.5285 15.4 11 15.4Z"
            />
        </g>
        <defs>
            <clipPath id="clip0_145_8621">
                <rect width="22" height="28" fill={color}/>
            </clipPath>
        </defs>
    </svg>
)
