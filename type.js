let speedTypingTestEl = document.getElementById('speedTypingTest');
let timerEl = document.getElementById('timer');
let quoteDisplayEl = document.getElementById('quoteDisplay');
let resultEl = document.getElementById('result');
let quoteInputEl = document.getElementById('quoteInput');
let submitBtnEl = document.getElementById('submitBtn');
let resetBtnEl = document.getElementById('resetBtn');
let spinnerEl = document.getElementById('spinner');

let a = null;

function checkText(count) {
    if (quoteDisplayEl.textContent === quoteInputEl.value) {
        a = true;
        resultEl.textContent = "You typed in " + (parseInt(timerEl.textContent) + parseInt(1)) + " seconds";
    } else {
        a = false;
        resultEl.textContent = "You typed incorrect sentence";
    }
}

function startTimer() {
    let counter = 0;
    let setIntervalId = setInterval(function() {
        timerEl.textContent = counter;
        counter = counter + 1;
        if (a === true) {
            clearInterval(setIntervalId);
        }

    }, 1000);
    return counter;
}

let options = {
    method: "GET"
};

let url = "https://apis.ccbp.in/random-quote";

function info() {
    fetch(url, options)
        .then(function(response) {
            spinnerEl.classList.add('spinner-border');
            return response.json();
        })
        .then(function(jsondata) {
            spinnerEl.classList.remove('spinner-border');
            quoteDisplayEl.textContent = jsondata.content;
            startTimer();
        });
}
info();


submitBtnEl.addEventListener('click', checkText);
resetBtnEl.addEventListener('click', function() {
    a = true;
    info();
    startTimer();
    quoteInputEl.value = "";
});