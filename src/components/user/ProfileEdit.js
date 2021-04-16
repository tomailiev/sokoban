import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";

const ProfileEdit = ({save, cancel}) => {
    const { user } = useContext(UserContext);
    const [nameValue, setNameValue] = useState(user.displayName);


    return (
        <div>
            <input type="text" id="displayName" defaultValue={nameValue} onChange={(e) => setNameValue(e.target.value)} />
            <button type="button" className="button-square" onClick={() => save(nameValue)}>Save</button>
            <button type="button" className="button-square" onClick={cancel}>Cancel</button>
        </div>
    );
}

export default ProfileEdit;