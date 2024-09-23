// usePrompt.ts
import React, { useEffect } from "react";
import { UNSAFE_NavigationContext, useLocation, useNavigate } from "react-router-dom";

export function usePrompt(message: string, when: boolean) {
    const navigate = useNavigate();
    const location = useLocation();
    const { navigator } = React.useContext(UNSAFE_NavigationContext);

    useEffect(() => {
        if (!when) return;

        const pushState = navigator.push;
        navigator.push = (path: string, state?: any) => {
            if (window.confirm(message)) {
                pushState(path, state);
            }
        };

        const handlePopState = (event: PopStateEvent) => {
            if (when && !window.confirm(message)) {
                event.preventDefault();
                navigate(location.pathname, { replace: true });
            }
        };

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (when) {
                event.preventDefault();
                event.returnValue = message;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            navigator.push = pushState;
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [message, when, location, navigator, navigate]);
}
