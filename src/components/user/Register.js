import { auth } from '../../utils/firebase';
import { createUser } from '../../services/user.service';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import validations from '../../utils/validators';
function Register({ history }) {

    const { isLoadingUser } = useContext(UserContext);
    const [isInvalid, setIsInvalid] = useState({ email: null, password: null, repeatPassword: null });

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

    function handleRegisterFormSubmit(e) {
        e.preventDefault();
        const { email, name, password, repeatPassword } = e.target;
        if (password.value !== repeatPassword.value) { 
            setIsInvalid(prev => ({ ...prev, repeatPassword: 'Passwords don\'t match' }));
            return;
        }
        if (isInvalid.email || isInvalid.password || isInvalid.repeatPassword) {
            toast.warn('Please correct the red fields');
            return;
        }
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
                toast.success(`Welcome ${name.value || email.value}`);
                [email, name, password, repeatPassword].forEach(x => x.value = '');
                history.push('/');
            })
            .catch((e) => {
                toast.error(e.message);
            });
    }

    return (
        <div className="form-wrapper container responsive-container">
            <h2>Register</h2>
            {isLoadingUser
                ? <div>Loading user</div>
                : <form onSubmit={handleRegisterFormSubmit}>
                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input className={isInvalid.email && 'invalid'} type="email" id="email" onBlur={validateOnBlur} onFocus={removeInvalidOnFocus} />                        {isInvalid.email && <p className="validation-error">{isInvalid.email}</p>}
                    </div>
                    <div className="form-field">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <input className={isInvalid.password && 'invalid'} type="password" id="password" onBlur={validateOnBlur} onFocus={removeInvalidOnFocus} />
                        {isInvalid.password && <p className="validation-error">{isInvalid.password}</p>}
                    </div>
                    <div className="form-field">
                        <label htmlFor="rePassword">Confirm Passsword:</label>
                        <input className={isInvalid.repeatPassword && 'invalid'} type="password" id="repeatPassword" onBlur={validateOnBlur} onFocus={removeInvalidOnFocus} />
                        {isInvalid.repeatPassword && <p className="validation-error">{isInvalid.repeatPassword}</p>}
                    </div>
                    <div className="form-field">
                        <input className="button-square" type="submit" value="Register" />
                    </div>
                </form>
            }
        </div>
    )
}


export default Register;