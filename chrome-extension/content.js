function addButton(div) {
    const button = document.createElement("button");
    button.textContent = "Is this Ai?";
    button.classList.add("show-text-button");
    button.style.marginTop = "5px";
    button.style.marginBottom = "5px";
    button.style.padding = "10px 20px";
    button.style.display = "flex";
    button.style.justifyContent = "center"; // horizontal centering
    button.style.alignItems = "center"; // vertical centering


    button.addEventListener("click", async () => {
        const postText = div.innerText;
        button.disabled = true;
        button.innerText = "Analyzing...";

        const response = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: postText })
        })

        const result = await response.json();
        console.log(result)

        const resultDiv = document.createElement("div");
        resultDiv.style.fontWeight = "bold";         
        resultDiv.style.textDecoration = "underline"; 
        resultDiv.style.padding = "10px"; 
        resultDiv.innerText = result.message;
        div.replaceChild(resultDiv, button);
    });
    

    div.append(button);
}


const observer = new MutationObserver(() => {
    Array.from(document.querySelectorAll('div[id$="-post-rtjson-content"]'))
        .filter(div => !div.hasAttribute("data-mutated"))
        .forEach(div => {
            div.setAttribute("data-mutated", "true")
            addButton(div);
        })
});

observer.observe(document.body, { subtree: true, childList: true });