import { auth } from '../../utils/firebase';

function Login() {

    function handleRegisterFormSubmit(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.message);
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
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" />
                </div>
                <div className="form-field">
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}


export default Login;