
const registerSubmit = document.getElementById("register-submit");

if (registerSubmit !== null)
{
    registerSubmit.addEventListener("click", () =>
    {
        const registerEmail = document.getElementById("register-email").value;
        const registerPassword = document.getElementById("register-password").value;

        const registerBody = {
            'email': registerEmail,
            'password': registerPassword
        };

        fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerBody)
        })
        .then(response => response)
        .then(window.location.assign('http://localhost:3000/login.html'));
    })
}


const loginSubmit = document.getElementById("login-submit");

if (loginSubmit !== null)
{
    loginSubmit.addEventListener("click", () =>
    {
        const loginEmail = document.getElementById("login-email").value;
        const loginPassword = document.getElementById("login-password").value;

        const loginBody = {
            'email': loginEmail,
            'password': loginPassword
        };

        fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody)
        })
        .then(response => console.log(response))
        .then(window.location.assign('http://localhost:3000/'));
    });
}

