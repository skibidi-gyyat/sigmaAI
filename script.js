const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB9IL9RmoI3miJUr80yL6D11dUE-TctKr0";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getResponse(prompt, container) {
    let Requestoption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [{ "parts": [{ "text": prompt }] }]
        })
    };

    let loadingMessage = document.createElement("div");
    loadingMessage.setAttribute("id", "loading");
    loadingMessage.innerHTML = `<img src="images/ai.png" id="ai_pfp">
                                <div id="loading_dots">
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                                </div>`;
    container.append(loadingMessage);

    try {
        let Api_response = await fetch(Api_Url, Requestoption);
        let data = await Api_response.json();
        container.removeChild(loadingMessage);
        createMessage(data.candidates[0].content.parts[0].text, container, "ai_response");
    } catch (error) {
        container.removeChild(loadingMessage);
        createMessage("Something went wrong. :(", "ai_response");
        alert(error);
    }
}

const prompt_field = document.querySelector("#prompt_box");
const send_button = document.querySelector("#send_button");
const container = document.querySelector("#chat_box");

prompt_field.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        send_button.click();
    }
});

send_button.addEventListener("click", function () {
    let prompt = prompt_field.value.trim();
    prompt_field.value = '';
    createMessage(prompt, container, "user_prompt");

    if (prompt == '') {
        createMessage("Stupid Ass Nigga write something!", container, "ai_response");
    }
    else if(prompt=="Who is sigma male?"){
        createMessage("Bishwas Ghimire is sigma male.", container, "ai_response");
    }
    else if(prompt=="sigma male" || prompt=="Sigma male"){
       createMessage("You mean Bishwas Ghimire, right?", container, "ai_response"); 
    }
    else {
        getResponse(prompt, container);
    }
});

async function createMessage(data, container, id) {
    let userMessage = document.createElement("div");
    userMessage.setAttribute("id", `${id}`);

    if (id === "user_prompt") {
        userMessage.innerHTML = `<p>${data}</p><img src="images/user.png" alt="">`;
        container.append(userMessage);
    } else {
        userMessage.innerHTML = `<img src="images/ai.png" alt=""><p id="ai_p"></p>`;
        container.append(userMessage);
        let ai_paragraph = document.querySelector("#ai_p");

        for (let i = 0; i < data.length; i++) {
            ai_paragraph.textContent += data[i];
            await sleep(10);
        }
        ai_paragraph.removeAttribute("id");
    }
}
