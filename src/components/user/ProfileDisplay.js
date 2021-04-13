import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const ProfileDisplay = ({ edit }) => {
    const { user } = useContext(UserContext);

    return (
        <>
            <p>
                User name: {user.displayName || '[No name]'}
            </p>
            <button className="button-square" onClick={edit}>Edit</button>
        </>
    )
}

export default ProfileDisplay;