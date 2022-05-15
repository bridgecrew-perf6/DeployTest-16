const quizPersonalData = document.querySelector(".quiz-personal-data");
const quizBoxes = document.querySelectorAll(".quiz-box");
const inputs = document.querySelectorAll(".quantity");
const quizOptionsLists = document.querySelectorAll(".quiz-options-list");
const submitBtn = document.getElementById('submitBtn');
const instructionsMessage = "Distribua os pontos somando um total de 100";
const warningMessage = "A soma precisa totalizar 100 para prosseguir";
// URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// log(urlParams.get('pesquisa'));

// Number validation event
inputs.forEach((element) => {
  element.addEventListener("input", () => {
    if (element.value > 100) element.value = 100;
  });
});

/**
 * Starts the quiz object.
 */
function startQuiz() {
  let inputs = document.querySelectorAll(
    ".quiz-personal-data-inputs label input"
  );
  let messageElement = document.querySelector(
    ".personal-data-box .quiz-message"
  );

  if (inputs[0].value.length != 0 && inputs[1].value.length != 0) {
    if (isValidEmail(inputs[1].value)) {
      quizBoxes[1].classList.remove("hidden");
      quizBoxes[0].classList.add("hidden");
    } else {
      messageElement.innerHTML = "Digite um e-mail válido.";
    }
  } else {
    messageElement.innerHTML = "Digite o seu nome e-mail corretamente.";
  }
}

function previousQuestion(index) {
  quizBoxes[index].classList.remove("hidden");
  quizBoxes[index + 1].classList.add("hidden");
}

function nextQuestion(index) {
  let checkNumberSum = 0;
  quizOptionsLists[index - 2].querySelectorAll("input.quantity").forEach((e) => {
    checkNumberSum += parseInt(e.value);
  });

  let messageElement = quizOptionsLists[index - 2].nextElementSibling;

  if (checkNumberSum != 100) {
    // Informa
    messageElement.classList.add("alert-warning");
    messageElement.innerHTML = warningMessage;
  } else {
    messageElement.innerHTML = instructionsMessage;
    messageElement.classList.remove("alert-warning");
    // Avança
    quizBoxes[index].classList.remove("hidden");
    quizBoxes[index - 1].classList.add("hidden");
  }
}

/**
 * Creates the ajax request to save the data.
 */
function sendData() {
    // 5 é o último elemento
    let validData = true;

    let checkNumberSum = 0;
    quizOptionsLists[5].querySelectorAll("input.quantity").forEach((e) => {
      checkNumberSum += parseInt(e.value);
    });
  
    let messageElement = quizOptionsLists[5].nextElementSibling;
  
    if (checkNumberSum != 100) {
      // Informa
      validData = false;
      messageElement.classList.add("alert-warning");
      messageElement.innerHTML = warningMessage;
    } else {
      messageElement.innerHTML = instructionsMessage;
      messageElement.classList.remove("alert-warning");
    }

    if(validData) {
        // Enviar

        // Pega os valores textuais
        let formTextInputs = document.querySelectorAll('.form_data');

        // Realiza as somas
        let cla = 0;
        let inovacao = 0;
        let resultado = 0;
        let hierarquica = 0;

        document.querySelectorAll("[data-category='cla']").forEach(element => {
            cla += parseInt(element.value);
        });

        document.querySelectorAll("[data-category='inovacao']").forEach(element => {
            inovacao += parseInt(element.value);
        });

        document.querySelectorAll("[data-category='resultado']").forEach(element => {
            resultado += parseInt(element.value);
        });

        document.querySelectorAll("[data-category='hierarquica']").forEach(element => {
            hierarquica += parseInt(element.value);
        });

        let formData = new FormData();

        // Popula os dados do form manualmente para enviar
        formData.append("pont_cla", cla);
        formData.append("pont_ino", inovacao);
        formData.append("pont_res", resultado);
        formData.append("pont_hie", hierarquica);
        formTextInputs.forEach(element => {
            formData.append(element.name, element.value);
        });
        // Recupera a URL
        formData.append("tipo_pesquisa", urlParams.get('pesquisa'));
        
        // Desativa o botão de enviar (mandar 1 requisição só!)
        submitBtn.disabled = true;

        // Ajax
        let ajax_request = new XMLHttpRequest();

        // Define as ações
        ajax_request.onreadystatechange = function () {
            if (ajax_request.readyState == 4 && ajax_request.status == 200) {
                // Deu certo => Recupera a resposta do backend
                // Se for um json
                // let response = JSON.parse(ajax_request.responseText);
                let response = ajax_request.responseText;
                if(response == "1") {
                  callRoute("/agradecimento");
                }
            }
        }

        // Método e Rota
        ajax_request.open('POST', '/registrar');
        // Enviar
        ajax_request.send(formData);
        
    }

}

// Utils

/**
 * Calls a route inside a javascript code.
 * @param {string} routeString The route to be called
 */
function callRoute(routeString) {
  document.location.href = routeString;
}

function log(string) {
  console.log(string);
}

function stepDownNumberField(buttonElement) {
  // element.parentNode.querySelector("input[type=number]").stepDown();
  let input = buttonElement.parentNode.querySelector("input[type=number]");
  input.stepDown();
  input.focus();

}

function stepUpNumberField(buttonElement) {
  // querySelector.parentNode.querySelector("input[type=number]").stepUp();
  let input = buttonElement.parentNode.querySelector("input[type=number]");
  input.stepUp();
  input.focus();
}

/**
 * Validates a e-mail based in a regular expression.
 * @param {string} email The e-mail field value string.
 * @returns true if e-mail is valid, and false if isn't.
 */
function isValidEmail(email) {
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
