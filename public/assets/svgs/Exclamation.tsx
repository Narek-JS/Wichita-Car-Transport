export const Exclamation: React.FC<{ color?: string }> = ({ color = '#FDFDFF' }) => (
    <svg 
        width="18" 
        height="18" 
        viewBox="0 0 18 18" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.875 15H4.125L1.875 17.25V4.5C1.875 3.2625 2.8875 2.25 4.125 2.25H13.875C15.1125 2.25 16.125 3.2625 16.125 4.5V12.75C16.125 13.9875 15.1125 15 13.875 15Z"
            fill={color}
        />
        <path
            d="M8.25 7.5H9.75V11.625H8.25V7.5Z"
            fill={color ? "#FFFFFF" : "#021C41"}
            fillOpacity="0.9"
        />
        <path
            d="M9 6.375C9.41421 6.375 9.75 6.03921 9.75 5.625C9.75 5.21079 9.41421 4.875 9 4.875C8.58579 4.875 8.25 5.21079 8.25 5.625C8.25 6.03921 8.58579 6.375 9 6.375Z"
            fill={color ? "#FFFFFF" : "#021C41"}
            fillOpacity="0.9"
        />
    </svg>
);