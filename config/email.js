const emailjs = require('@emailjs/nodejs')

emailjs.init({
    publicKey: "D5YKnF1inI5XKf0WEm6-S",
    privateKey: process.env.EMAILJS_API_KEY,
});

module.exports = emailjs;