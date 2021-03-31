import { auth } from '../../utils/firebase';
import { createUser } from '../../services/user.service';

function Register({ history }) {

    function handleRegisterFormSubmit(e) {
        e.preventDefault();
        const { email, name, password, rePassword } = e.target;
        if ((!email.value || !password.value)
            || password.value !== rePassword.value) { return; }
        auth.createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                if (userCredential && name.value) {
                    return (Promise.all([
                        createUser(userCredential.user.uid),
                        userCredential.user.updateProfile({ displayName: name.value })
                    ]));
                } else {
                    return createUser(userCredential.user.uid);
                }
            })
            .then(() => {
                [email, name, password, rePassword].forEach(x => x.value = '');
                history.push('/');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div>
            <form onSubmit={handleRegisterFormSubmit}>
                <div className="form-field">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" />
                </div>
                <div className="form-field">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" />
                </div>
                <div className="form-field">
                    <label htmlFor="rePassword">Confirm Passsword:</label>
                    <input type="password" id="rePassword" />
                </div>
                <div className="form-field">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    )
}


export default Register;