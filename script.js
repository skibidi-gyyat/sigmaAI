const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB9IL9RmoI3miJUr80yL6D11dUE-TctKr0";



async function getResponse(prompt,container){

    let Requestoption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents": [{
              "parts":[{"text":prompt}]
              }]
             })
    
    }
    try{
    let Api_response=await fetch(Api_Url,Requestoption);
    console.log(Api_response);
    let data=await Api_response.json();
    createMessage(data.candidates[0].content.parts[0].text,container,"ai_response")

    console.log(`AI:${data.candidates[0].content.parts[0].text}`);
    }
    catch(error){
        alert(error);
    }
    
    
}

const prompt_field=document.querySelector("#prompt_box");
const send_button=document.querySelector("#send_button");
const container=document.querySelector("#chat_box");

let ai_chat=""

send_button.addEventListener("click",function(){
    let prompt=prompt_field.value.trim();
    prompt_field.value='';
    createMessage(prompt,container,"user_prompt")
    console.log(`User:${prompt}`);
    if(prompt==''){
        createMessage("stupid Nigga write something.",container,"ai_response")
    }
    
    else if (prompt=="Who is sigma male?"){
        createMessage("Bishwas Ghimire is the ultimate sigma!",container,"ai_response")
    }
    else if(prompt=="Who is the NPC of the century?"){
        createMessage("Ashis Joshi is the  Npc of the century!",container,"ai_response")
    }
    else if(prompt=="Which is the worse school in the world?"){
        createMessage("Viswa Niketan",container,"ai_response")
    }
    else{
        getResponse(prompt,container)}
    

})

function createMessage(data,container,id){
    let userMessage=document.createElement("div");
    userMessage.setAttribute("id",`${id}`)

    if (id==="user_prompt"){
    userMessage.innerHTML=`<p>${data}</p><img src="images/user.png" alt="">`
    }
    else{
        userMessage.innerHTML=`<img src="images/ai.png" alt=""><p>${data}</p>`
    }
    container.append(userMessage)
}
