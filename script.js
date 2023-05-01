const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");
inputQuestion.addEventListener("keypress", (e) => { 
    if(inputQuestion.value && e.key === "Enter")
    sendQuestion();

});

const OPEN_API_KEY = "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";

function sendQuestion(){
    var sQuestion = inputQuestion.value;
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
/*
    botHtml = `
        <div class="container bg-secondary chatResponse bot mb-3">
            <span class="chatBotIcon"><i class="bi bi-robot"></i>:</span>
            <span class="" id="result">Resposta qualquer</span>
        </div>`
    getDiv.innerHTML += botHtml;
*/
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


       
/*



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
            if (result.value) result.value += "\n";

            if(json.error?.message) {
                result.value += `Error: ${json.error.message}`;
            }else if (json.choices?.[0].text){
                var text = json.choices[0].text || "Sem resposta";

                result.value += "Chat GPT: " + text;                 
            }

            result.scrollTop = result.scrollHeight;
        })

        .catch((error) => console.error("Error: ", error))
        .finally(() => {
            inputQuestion.value = "";
            inputQuestion.disabled = false;
            inputQuestion.focus();
        });

    if(result.value) result.value+= "\n\n\n";

    result.value += `Eu: ${sQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;

    result.scrollTop = result.scrollHeight;
*/
}