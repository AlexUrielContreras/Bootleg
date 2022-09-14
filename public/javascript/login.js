const errorEl = document.querySelector('#err-message')

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(email);
    console.log(password);
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            errorEl.textContent = 'Invalid Email or Password'
        }
    }
}


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);