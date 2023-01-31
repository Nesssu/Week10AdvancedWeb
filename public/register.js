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
    document.getElementById("register-form").addEventListener("submit", onRegister);
}

const onRegister = (event) =>
{
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch('/api/user/register', 
    {
        method: "POST",
        body: formData
    })
    .then((response) => response.json())
    .then((data) =>
        {
            if (data.message)
            {
                document.getElementById("register-error").innerText = data.message;
            }
            else
            {
                window.location.href="/login.html";
            }
        })
}