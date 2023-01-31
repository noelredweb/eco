const randomstring = require("randomstring");

function generateNewPassword() {
    const password = randomstring.generate({
        length: 8,
        charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
    });

    // Check if password meets the rules
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()]/.test(password) || password.length < 6 || password.length > 12) {
        return generateNewPassword();
    }

    return password;
}

module.exports = {
    generateNewPassword
}