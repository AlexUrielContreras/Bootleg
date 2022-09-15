async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();


    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText)
        }
    }
};

function customError() {
    
    const pwInput = document.querySelector('#password-signup')
    const validityState = pwInput.validity

    console.log(validityState)

    if (validityState.tooShort && !validityState.valid) {
        pwInput.setCustomValidity('Password must be 5 - 25 characters long');
    } else {
        pwInput.setCustomValidity('')
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('#password-signup').addEventListener('input', customError);