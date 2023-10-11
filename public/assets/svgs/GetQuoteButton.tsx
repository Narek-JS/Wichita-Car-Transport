export const GetQuoteButton: React.FC<{ rotate?: number }> = ({ rotate }) => (
    <svg
        style={{transform: `rotate(${rotate}deg)`, transition: "all .3s" }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_98_3250)">
            <circle cx="20" cy="20" r="20" transform="rotate(90 20 20)" fill="#DDC00C" />
            <path d="M33 15L19.9565 30L8 15" stroke="#FDFDFF" strokeWidth="3" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_98_3250">
                <rect width="40" height="40" fill="white" transform="translate(40) rotate(90)" />
            </clipPath>
        </defs>
    </svg>
)