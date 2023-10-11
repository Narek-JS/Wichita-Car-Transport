export const QuoteButtonIcon: React.FC<{ rotate?: number }> = ({ rotate = 0 }) => (
    <svg style={{rotate: `${rotate}deg`}} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_396_2491)">
            <circle cx="15" cy="15" r="15" fill="#DDC00C"/>
            <path d="M22 11L14.6957 19L8 11" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_396_2491">
                <rect width="30" height="30" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);
