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
    const token = localStorage.getItem('auth_token');
    if (token !== null)
    {
        fetch('http://localhost:3000/', {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token
            }
        });
    }
}
