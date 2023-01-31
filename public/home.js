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
    const content = document.getElementById("content");
    
    fetch('/', {
        method: "GET",
        headers: {
            "authorization": "Bearer " + token
        }
    })
    .then(response => response.text())
    .then(page =>
        {
            console.log(page);
            content.innerHTML = page
        })
}

const logout = () =>
{
    localStorage.removeItem('auth_token');
    window.location.href="/";
}