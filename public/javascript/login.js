const errorEl = document.querySelector('#err-message')

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        try { 
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
                errorEl.textContent = 'Invalide Email or Password'
            }
            
        } catch (error) {
            console.log(error)
        }   
    }
}

function errorHandling() {
    errorEl.textContent = ' '
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#password-login').addEventListener('focus', errorHandling);