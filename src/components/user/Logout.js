import { auth } from "../../utils/firebase";

const Logout = () => {

    function handleLogout() {
        auth.signOut().then(() => {
            console.log('signed out');
        }).catch((error) => {
            console.error(error)
        });
    }

    return <button onClick={handleLogout}>Logout</button>
}

export default Logout