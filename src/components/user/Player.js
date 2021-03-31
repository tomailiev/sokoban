import Profile from "./Profile";
import UploadLevel from "./UploadLevel";
import UserScores from "./UserScores";

function Player() {
    return (
        <>
            <Profile />
            <UserScores />
            <UploadLevel />
        </>
    );
}

export default Player;