function validateEmail(input = '') {
    const errors = [];

    if (!input) {
        errors.push("Please enter a valid email.");
    }
    if (!input.includes('@') || !input.includes('.') || input.endsWith('@') || input.endsWith('.')) {
        errors.push("Email address is invalid.");
    }

    return errors.length
        ? errors
        : null;
}

function validatePassword(input = '') {
    const errors = [];

    if (!input) {
        errors.push("Please enter a password.");
    }
    if (input.length < 6) {
        errors.push("Password should be at least 6 characters long.");
    }

    return errors.length
        ? errors
        : null;
}

const validations = {
    email: validateEmail,
    password: validatePassword,
    repeatPassword: validatePassword
};

export default validations;