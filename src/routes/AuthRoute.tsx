// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn, selectToken } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import type { PrivateRouteProps } from '../types/props';

export default function AuthRoute({
    session,
    redirectTo,
    children,
}: PrivateRouteProps) {
    return !session ? children : <Navigate to={redirectTo} />;
}
