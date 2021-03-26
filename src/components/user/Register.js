import { auth } from '../../utils/firebase';

function Register() {

    function handleRegisterFormSubmit(e) {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(e.target.email.value, e.target.password.value)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
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
                    <label htmlFor="re-password">Confirm Passsword:</label>
                    <input type="password" id="re-password" />
                </div>
                <div className="form-field">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    )
}


export default Register;