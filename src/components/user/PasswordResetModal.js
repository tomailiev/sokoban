import { useState } from 'react';
import { toast } from 'react-toastify';
import BeatLoader from 'react-spinners/BeatLoader';
import { auth } from '../../utils/firebase';
import validations from '../../utils/validators';
import './PasswordResetModal.css';

const PasswordResetModal = ({ close }) => {
    const [emailValue, setEmailValue] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    function sendResetEmail(email) {
        if (validations.email(email)) {
            toast.warn('Please enter a valid email');
            return;
        }
        setHasSubmitted(true);
        auth.sendPasswordResetEmail(email).then(function () {
            setHasSubmitted(false);
            toast.success('Password reset email sent to ' + email)
            close();
        }).catch(function (error) {
            setHasSubmitted(false);
            toast.error(error.message);
        });
    }
    return (
        <div className="modal">
            <div className="container responsive-container modal-content card">
                <span className="close" onClick={() => close()}>&times;</span>
                <div className="card-header">
                    <h3>Password reset</h3>
                </div>
                <div className="card-body">
                    <label style={{ paddingBottom: 5 }} htmlFor="email">Enter email: </label>
                    <input id="email" type="email" placeholder="your@email.here" defaultValue={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                </div>
                <div className="card-footer">
                    {hasSubmitted
                        ? <BeatLoader size={29} margin={2} color={'orange'} />
                        : <button disabled={!emailValue} type="button" className="button-square" onClick={(e) => sendResetEmail(emailValue)}>Send
                        </button>}
                </div>
            </div>
        </div>
    )
}

export default PasswordResetModal;