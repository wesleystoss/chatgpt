const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");
inputQuestion.addEventListener("keypress", (e) => { 
    if(inputQuestion.value && e.key === "Enter")
    sendQuestion();

});

const OPEN_API_KEY = "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";

function sendQuestion(){
    var sQuestion = inputQuestion.value;
    if(sQuestion == "" || sQuestion == " "){
        //alert("Vazio")
    }else{
        var botHtml = ``
        var getDiv = document.getElementById("historicoChat");
        const userHtml = `
            <div class="boxResponse user">
                <div class="chatResponse user mb-3">
                    <span class="user">${sQuestion}</span>
                </div>
                <div>
                    <span class="chatBotIcon" style="margin-left: 10px; margin-right: 0px">:<i class="bi bi-person"></i></span>
                </div>
            </div>`
        getDiv.innerHTML += userHtml;
        inputQuestion.value = "";

        var resultVerificarBase = verificarBase(sQuestion)

        if(resultVerificarBase != false){
            botHtml = `
                <div class="boxResponse bot">
                    <div>
                        <span class="chatBotIcon"><i class="bi bi-robot"></i>:</span>
                    </div>
                    <div class="chatResponse bot mb-3 float-start">
                        <span class="" id="result">${resultVerificarBase}</span>
                    </div>
                </div>`
            getDiv.innerHTML += botHtml;
        }else{
            /* Faz acionamento da API */
        fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + OPEN_API_KEY,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: sQuestion,
                max_tokens: 2048,
                temperature: 0.5,
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.error?.message){
                botHtml = `
                <div class="boxResponse bot">
                    <div>
                        <span class="chatBotIcon"><i class="bi bi-robot"></i>:</span>
                    </div>
                    <div class="chatResponse bot mb-3 float-start">
                        <span class="errorMessageApi" id="result">Erro: ${json.error.message}</span>
                    </div>
                </div>`
            getDiv.innerHTML += botHtml;
            }else if(json.choices?.[0].text){
                botHtml = `
                    <div class="boxResponse bot">
                        <div>
                            <span class="chatBotIcon"><i class="bi bi-robot"></i>:</span>
                        </div>
                        <div class="chatResponse bot mb-3 float-start">
                            <span class="" id="result"> ${json.choices?.[0].text}</span>
                        </div>
                    </div>`
            getDiv.innerHTML += botHtml;
            }
        })
        }        
    }
    
}

function ocultarChat() {
    window.parent.document.getElementById('chatButton expand').style.display = 'none';
}

function verificarBase(inputText){
    var chatResponse = false;

    switch(true) {
        case inputText.includes("Olá") || inputText.includes("Tudo bem?"):
            chatResponse = chatResponseSaudacao();
            break;
        case inputText.includes("Até mais") || inputText.includes("Tchau"):
            chatResponse = chatResponseEncerramento();
            break;
        case inputText.includes("Att") || inputText.includes("att") || inputText.includes("atualização"):
            chatResponse = chatResponseAtualização();
            break;
    }

    return chatResponse
}

function chatResponseSaudacao(){
    var chatResponseFixed = "Olá! Como posso ajudá-lo(a)?"
    return chatResponseFixed;
}

function chatResponseEncerramento(){
    var chatResponseFixed = "Se precisar de ajuda novamente, é só me chamar"
    return chatResponseFixed;
}

function chatResponseAtualização(){
    var chatResponseFixed = "Última atualização em 01/05/2023 - 16:35"
    return chatResponseFixed;
}
