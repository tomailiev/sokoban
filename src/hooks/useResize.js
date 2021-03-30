import { useEffect, useState } from "react";

const useResize = (width) => {
    const initialSize = window.innerWidth < 30 * width ? window.innerWidth / width : 30;
    const [size, setSize] = useState(initialSize);
    useEffect(() => {
        function resize() {
            if (window.innerWidth < 30 * width) {
                setSize(_prev => window.innerWidth / width);
            } else {
                setSize(_prev => 30);
            }
        }
        window.addEventListener('resize', resize)
    }, [width]);

    return [
        size
    ];
}

export default useResize;