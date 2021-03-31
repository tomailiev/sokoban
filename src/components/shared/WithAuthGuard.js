import { useContext } from "react"
import { Redirect, Route } from "react-router"
import UserContext from "../../contexts/UserContext"

const WithAuthGuard = ({ component: Component, shouldAuth, ...rest }) => {
    const {user} = useContext(UserContext);

    return (
        <Route {...rest} render={(props) => (
            shouldAuth === !!user.id
                ? <Component {...props} />
                : <Redirect to={shouldAuth ? '/login' : '/'} />
        )} />
    );
}

export default WithAuthGuard;