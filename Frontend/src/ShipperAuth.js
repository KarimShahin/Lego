import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function RequireShipperAuth({ children }) {
    // let auth = useAuth();
    let token = localStorage.getItem("token");
    let location = useLocation();

    if (!token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    let decode = jwt_decode(token);
    if (decode.role !== "shipper") {
        return <Navigate to="/not-found" state={{ from: location }} replace />;
    }

    return children;
}
export default RequireShipperAuth;
