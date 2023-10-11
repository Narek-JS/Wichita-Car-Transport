interface Iprops {
    rotate?: number;
    color?: string;
};

export const ArrowDynamic: React.FC<Iprops> = ({ rotate = 0, color='#005379' }) => (
    <svg
        style={{transform: `rotate(${rotate}deg)`, transition: "all .3s" }}
        width="16"
        height="11"
        viewBox="0 0 16 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14 1L7.73913 9L2 0.999999"
            stroke={color}
            strokeWidth="3"
            strokeLinejoin="round"
        />
    </svg>
);