import { auth } from "../../utils/firebase";

const Logout = ({ history }) => {

    function handleLogout() {
        auth.signOut().then(() => {
            history.push('/');
        }).catch((error) => {
            console.error(error)
        });
    }

    return <button onClick={handleLogout}>Logout</button>
}

export default Logout