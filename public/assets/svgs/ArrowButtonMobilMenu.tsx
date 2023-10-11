export const ArrowButtonMobilMenu: React.FC<{ rotate?: number }> = ({ rotate }) => {
    return (
        <svg 
            style={{transform: `rotate(${rotate}deg)`, transition: "all .3s" }} 
            width="20" 
            height="15" 
            viewBox="0 0 20 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18 1L9.65217 13L2 0.999999"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
};