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
        method: "POST",
        headers: {
            "authorization": "Bearer " + token
        }
    })
    .then(response => response.text())
    .then(page =>
    {
        content.innerHTML = page;
        const input = document.getElementById("add-item");
        if (input !== null)
        {
            input.addEventListener("keypress", (e) =>
            {
                if (e.key === "Enter") {
                    let newItem = {
                        items: [input.value]
                    };
                    fetch('/api/todos', {
                        method: "POST",
                        body: JSON.stringify(newItem),
                        headers: {
                            "authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => response.text())
                    .then(data => {window.location.reload()})
                    input.value = "";
                }
            });
        }
        const items = document.getElementById("items");
        fetch('/api/todos/list', {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token
            }
        })
        .then(response => response.text())
        .then(page =>
            {
                if (page != "Unauthorized")
                {
                    items.innerHTML = page;
                }
            })
    });
}

const logout = () =>
{
    localStorage.removeItem('auth_token');
    window.location.href="/";
}