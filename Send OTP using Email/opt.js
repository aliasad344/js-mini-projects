// opt.js

function generateOTP() {
    const chars = '0123456789';
    let otp = '';
    const length = 4;
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        otp += chars[randomIndex];
    }

    return otp;
}

module.exports = generateOTP; // Export the function itself, not as an object
