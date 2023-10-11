interface Iprops {
    rotate?: number
};

export const Polygon: React.FC<Iprops> = ({ rotate = 0 })  => (
    <i>
        <svg style={{transform: `rotate(${rotate}deg)`, transition: "all .3s" }} width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.6603 3L13 18L4.33975 3L21.6603 3Z" stroke="#EB0505" strokeWidth="5" strokeLinecap="round"/>
        </svg>
    </i>
);


