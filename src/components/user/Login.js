import SquareLoader from 'react-spinners/SquareLoader';
import { useContext, useState } from 'react';
import { auth } from '../../utils/firebase';
import { toast } from 'react-toastify';
import validations from '../../utils/validators';
import LoadingContext from '../../contexts/LoadingContext';

function Login({ history }) {
    const { isLoading } = useContext(LoadingContext);
    const [isInvalid, setIsInvalid] = useState({ email: null, password: null });
    const [hasSubmitted, setHasSubmitted] = useState(false);

    function handleRegisterFormSubmit(e) {
        e.preventDefault();
        const { email, password, } = e.target;
        if (isInvalid.email || isInvalid.password) {
            toast.warn('Please correct the fields above');
            return;
        }
        setHasSubmitted(true);
        auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
            .then((userCredential) => {
                setHasSubmitted(false);
                const loggedInUser = userCredential.user;
                [email, password].forEach(x => x.value = '');
                toast.success(`Welcome ${loggedInUser.displayName || loggedInUser.email}`);
                history.push('/');
            })
            .catch((e) => {
                setHasSubmitted(false);
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
            {!isLoading &&
                <form onSubmit={handleRegisterFormSubmit}>
                    <div className="form-field">
                        {/* <label htmlFor="email">Email:</label> */}
                        <input placeholder="Email" className={isInvalid.email && 'invalid'} type="email" id="email" onBlur={validateOnBlur} onFocus={removeInvalidOnFocus} />
                        {isInvalid.email && <p className="validation-error">{isInvalid.email}</p>}
                    </div>
                    <div className="form-field">
                        {/* <label htmlFor="password">Password:</label> */}
                        <input placeholder="Password" className={isInvalid.password && 'invalid'} type="password" id="password" onBlur={validateOnBlur} onFocus={removeInvalidOnFocus} />
                        {isInvalid.password && <p className="validation-error">{isInvalid.password}</p>}
                    </div>
                    <div className="form-field">
                        {hasSubmitted
                            ? <SquareLoader color="coral" size={50} />
                            : <input type="submit" value="Login" className="button-square" />}
                    </div>
                </form>
            }
        </div>
    )
}

export default Login;