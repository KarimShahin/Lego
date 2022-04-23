import { Navigate, useLocation } from "react-router-dom";

function RequireUserAuth({ children }) {
	// let auth = useAuth();
	let token = localStorage.getItem("token");
	let location = useLocation();

	if (token) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/home" state={{ from: location }} replace />;
	}

	return children;
}
export default RequireUserAuth;
