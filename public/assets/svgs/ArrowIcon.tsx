interface Iprops {
    rotate?: number;
    color?: string;
};

export const ArrowIcon: React.FC<Iprops> = ({ rotate = 0, color='#DDC00C' }) => (
    <i>
        <svg style={{transform: `rotate(${rotate}deg)`, transition: "all .3s" }} width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.4999 24L24.4999 20L20.4999 16" stroke='#DDC00C' strokeWidth="1.59599" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="1.995" y="1" width="38" height="38" rx="19" stroke='#DDC00C' strokeWidth="2"/>
        </svg>
    </i>
);