// frontend/src/layouts/PortalWrapper.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";


const PortalWrapper = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const el = useRef(null);

    useEffect(() => {
        el.current = document.createElement("div");
        document.body.appendChild(el.current);
        setMounted(true);
        return () => {
            if (el.current) document.body.removeChild(el.current);
        };
    }, []);

    return mounted && el.current ? createPortal(children, el.current) : null;
}

export default PortalWrapper;