//Selectors
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const pauseButton = document.getElementById('pause-button');
const textInput = document.getElementById('text');
const speedInput = document.getElementById('speed');
const utterance = new SpeechSynthesisUtterance(text);
utterance.addEventListener('end', () => {
    textInput.disabled = false;
})
utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex;
})
let currentCharacter;

//Event Listeners
playButton.addEventListener('click', () => {
    playText(textInput.value);
})

pauseButton.addEventListener('click', pauseText);

stopButton.addEventListener('click', stopText);

speedInput.addEventListener('input', () => {
    stopText();
    playText(utterance.text.substring(currentCharacter));
})


//Functions
function playText(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume();
    }
    utterance.text = text;
    utterance.rate = speedInput.value || 1;
    textInput.disabled = true;
    speechSynthesis.speak(utterance);
}

function pauseText() {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
    }
}

function stopText() {
    speechSynthesis.resume();
    speechSynthesis.cancel();
}