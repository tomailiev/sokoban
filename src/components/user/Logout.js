import { auth } from "../../utils/firebase";

function handleLogout({ history }) {
    auth.signOut().then(() => {
        history.push('/');
    }).catch((error) => {
        console.error(error)
    });
}

export default handleLogout;