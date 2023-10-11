interface Iprops {
    rotate?: number;
    type?: 'add' | 'minuse'
};

export const AddIcon: React.FC<Iprops> = ({ rotate = 0, type = 'add' }) => (
    <svg
        style={{transform: `rotate(${rotate}deg)`, transition: "all .3s" }} 
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        { type === 'minuse' ? ( 
                <path
                    d="M0 7.71429H18V10.2857H0V7.71429Z"
                    fill="#005379"
                    fillOpacity="0.8"
                />
            ) : (
                <path
                    d="M7.71441 18V10.2857H0.00012207V7.71429H7.71441V0H10.2858V7.71429H18.0001V10.2857H10.2858V18H7.71441Z"
                    fill="#005379"
                    fillOpacity="0.8"
                />
            )
        }
    </svg>
);