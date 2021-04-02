import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { auth } from '../../utils/firebase';
import { toast } from 'react-toastify';
import validations from '../../utils/validators';

function Login({ history }) {
    const { isLoadingUser } = useContext(UserContext);
    const [isInvalid, setIsInvalid] = useState({ email: null, password: null })

    function handleRegisterFormSubmit(e) {
        e.preventDefault();
        const { email, password, } = e.target;
        if (isInvalid.email || isInvalid.password) {
            toast.warn('Please correct the red fields');
            return;
        }
        auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
            .then((userCredential) => {
                const loggedInUser = userCredential.user;
                [email, password].forEach(x => x.value = '');
                toast.success(`Welcome ${loggedInUser.displayName || loggedInUser.email}`);
                history.push('/');
            })
            .catch((e) => {
                toast.error(e.message);
            });
    }

    function validateOnBlur(e) {
        const element = e.target
        const errors = validations[element.id](element.value);
        if (errors) {
            setIsInvalid(prev => ({ ...prev, [element.id]: errors[0] }));
        }
    }

    function removeInvalidOnFocus(e) {
        const element = e.target;
        setIsInvalid(prev => ({ ...prev, [element.id]: null }));
    }

    return (
        <div className="form-wrapper container responsive-container">
            <h2>Login</h2>
            {isLoadingUser
                ? <div>Loading...</div>
                : <form onSubmit={handleRegisterFormSubmit}>
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input className={isInvalid.email && 'invalid'} type="email" id="email" onBlur={validateOnBlur} onFocus={removeInvalidOnFocus} />
                        {isInvalid.email && <p className="validation-error">{isInvalid.email}</p>}
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <input className={isInvalid.password && 'invalid'} type="password" id="password" onBlur={validateOnBlur} onFocus={removeInvalidOnFocus} />
                        {isInvalid.password && <p className="validation-error">{isInvalid.password}</p>}
                    </div>
                    <div className="form-field">
                        <input type="submit" value="Login" className="button-square" />
                    </div>
                </form>
            }
        </div>
    )
}


export default Login;