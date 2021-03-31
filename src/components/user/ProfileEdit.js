import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";

const ProfileEdit = ({save, cancel}) => {
    const { user, setUser } = useContext(UserContext);
    const [nameValue, setNameValue] = useState(user.displayName);


    return (
        <div>
            <input type="text" id="displayName" defaultValue={nameValue} onChange={(e) => setNameValue(e.target.value)} />
            <button type="button" onClick={() => save(nameValue)}>Save</button>
            <button type="button" onClick={cancel}>Cancel</button>
        </div>
    );
}

export default ProfileEdit;