import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedIn } = useAuth();

    // 로그인 상태가 아니면 로그인 페이지로 리디렉션
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


export default ProtectedRoute;