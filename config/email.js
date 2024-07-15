const emailjs = require('@emailjs/nodejs')

emailjs.init({
    publicKey: 'CnSnGIZkhr_Urul33',
    privateKey: process.env.EMAILJS_API_KEY,
});

module.exports = emailjs;