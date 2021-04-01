import { auth } from "../../utils/firebase";
import { toast } from 'react-toastify';

function handleLogout(props) {
    auth.signOut().then(() => {
        toast.info('signed out');
        props.history.push('/');
    }).catch((error) => {
        toast.error(error.message);
    });
}

export default handleLogout;