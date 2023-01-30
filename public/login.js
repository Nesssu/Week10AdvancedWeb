if (document.readyState !== "loading")
{
    initializeCode();
}
else
{
    document.addEventListener("DOMContentLoaded", () =>
    {
        initializeCode();
    });
}
  
const initializeCode = () =>
{
    document.getElementById("login-form").addEventListener("submit", onLogin);
}

const onLogin = (event) =>
{
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch('/api/user/login', 
    {
        method: "POST",
        body: formData
    })
    .then((response) => response.json())
    .then((data) =>
        {
            if (data.token)
            {
                localStorage.setItem('auth_token', data.token);
                window.location.assign("/");
            }
        })
}
