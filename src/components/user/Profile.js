import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { auth } from "../../utils/firebase";
import ProfileDisplay from "./ProfileDisplay";
import ProfileEdit from "./ProfileEdit";

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const { user, setUser } = useContext(UserContext);

    function toggleEditAndSave(e) {
        const fbUser = auth.currentUser;
        fbUser.updateProfile({
            displayName: e
        })
            .then(() => {
                setUser(prev => ({ ...prev, displayName: e }))
                setIsEditing(prev => !prev);
            })
            .catch(({code, message}) => console.log(message));
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