import * as React from 'react'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children, authorize = null, unauthorized: Unauthorized = null }) => {
    const { state: { user } } = useAuth();
    const [authorized, setAuthorized] = React.useState(null);

    React.useEffect(() => {
        if (authorize) {
            const authorizedRoles = authorize.split(',');
            const { role } = user;
            const isAuthorized = authorizedRoles.includes(role);

            setAuthorized(isAuthorized)
        } else {
            setAuthorized(null)
        }
    }, [authorize])

    if (authorized == null) return null;

    if (authorized == false) return Unauthorized;

    return children;
};

export default PrivateRoute
