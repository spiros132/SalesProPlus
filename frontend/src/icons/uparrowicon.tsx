export default function UpArrowIcon({
    size
}: {
    readonly size: number
}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
        width={size || "50px"} 
        height={size || "50px"} 
        viewBox="0 0 24 24" 
        fill="none">
            <path d="M12 20L12 4M12 4L18 10M12 4L6 10" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}