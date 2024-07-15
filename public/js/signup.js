// Handle signing up to the application
const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Error signing up.');
        }
    }
};

const welcomeMail = async (event) => {
    try {
        event.preventDefault();

        () => {
            email.js.init('CnSnGIZkhr_Urul33');
        }

        let params = {
            name: document.querySelector('#username-signup').value.trim()
        }

        let serviceID = 'service_0d96fi5';
        let templateID = 'welcome_form';

        const res = await emailjs.send(serviceID, templateID, params)
        console.log(res)
    }
    catch (err) {
        console.error(err)
    }
}

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler, welcomeMail);