import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { auth } from '../../utils/firebase';
import { toast } from 'react-toastify';

function Login({ history }) {
    const { isLoadingUser } = useContext(UserContext);

    function handleRegisterFormSubmit(e) {
        e.preventDefault();
        const { email, password, } = e.target;
        if (!email.value || !password.value) { return; }
        auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
            .then((userCredential) => {
                const loggedInUser = userCredential.user;
                toast.success(`Welcome ${loggedInUser.displayName || loggedInUser.email}`);
                history.push('/');
            })
            .catch((e) => {
                toast.error(e.message);
            });
    }

    return (
        <div>
            {isLoadingUser
                ? <div>Loading user</div>
                : <form onSubmit={handleRegisterFormSubmit}>
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
            }
        </div>
    )
}


export default Login;