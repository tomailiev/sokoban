import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { auth } from "../../utils/firebase";
import ProfileDisplay from "./ProfileDisplay";
import ProfileEdit from "./ProfileEdit";
import { toast } from 'react-toastify';

function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);

    function toggleEditAndSave(e) {
        const fbUser = auth.currentUser;
        fbUser.updateProfile({
            displayName: e
        })
            .then(() => {
                setUser(prev => ({ ...prev, displayName: e }))
                setIsEditing(prev => !prev);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    function cancelChanges() {
        setIsEditing(prev => !prev);
    }

    return (
        <section>
            <h2>My Info</h2>
            <article>Email: {user.email}</article>
            {isEditing
                ? <ProfileEdit save={toggleEditAndSave} cancel={cancelChanges} />
                : <ProfileDisplay edit={() => setIsEditing(true)} />}
        </section>
    )

}

export default Profile;