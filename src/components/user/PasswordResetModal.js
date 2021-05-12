import { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../utils/firebase';
import validations from '../../utils/validators';
import './PasswordResetModal.css';

const PasswordResetModal = ({ close }) => {
    const [emailValue, setEmailValue] = useState('')

    function sendResetEmail(email) {
        if (validations.email(email)) {
            toast.warn('Please enter a valid email');
            return;
        }
        auth.sendPasswordResetEmail(email).then(function () {
            toast.success('Password reset email sent to ' + email)
            close();
        }).catch(function (error) {
            toast.error(error.message);
        });
    }
    return (
        <div className="modal">
            <div className="container responsive-container modal-content">
                <span className="close" onClick={() => close()}>&times;</span>
                <input type="email" placeholder="your@email.here" defaultValue={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                <button disabled={!emailValue} type="button" className="button-square" onClick={(e) => sendResetEmail(emailValue)}>Send</button>
            </div>
        </div>
    )
}

export default PasswordResetModal;