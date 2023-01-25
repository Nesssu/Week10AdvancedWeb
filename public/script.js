
const registerSubmit = document.getElementById("submit-input");

if (registerSubmit !== null)
{
    registerSubmit.addEventListener("click", () =>
    {
        const email = document.getElementById("email-input").value;
        const password = document.getElementById("password-input").value;

        const body = {
            email,
            password
        };

        fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(window.location.assign('http://localhost:3000/login.html'));
    })
}