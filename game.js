let emperors = [];
let numGuesses = 0;
let answer;

fetch("emperors.json")
    .then(response => response.json())
    .then(data => {
        emperors = data;
        loadEmperors(emperors);
    });

function loadEmperors(emperors) {
    answer = emperors[Math.floor(Math.random() * emperors.length)];

    const guessBox = document.getElementById("guessBox");
    guessBox.addEventListener('input', (e) => {
        updateGuessOptions(e.target.value);
    });
}

function updateGuessOptions(guess) {
    guess = guess.toLowerCase();

    const guessOptions = document.getElementById("guessOptions");
    guessOptions.replaceChildren();

    if (guess == "") {
        guessOptions.style.display = 'none';
    }
    else {
        guessOptions.style.display = 'flex';

        for (const emperor of emperors) {
            if (emperor.name.toLowerCase().includes(guess)) {
                const guessOption = document.createElement('div');
                guessOption.textContent = emperor.name;
                guessOption.classList.add("guessOption")

                guessOption.addEventListener('click', (event) => {
                    submitGuess(emperor);
                })

                guessOptions.appendChild(guessOption);
            }
        }  
    }
}

function submitGuess(emperor) {

    // Clear the guess field first
    const guessBox = document.getElementById("guessBox");
    const guessOptions = document.getElementById("guessOptions");
    guessBox.value = "";
    guessOptions.style.display = "none";

    // Now log the guess, displaying the results
    // ts is coded so badly lmao i need go to back to apcsp
    const resultsContainer = document.getElementById("resultsContainer");
    const newGuess = document.createElement('div');
    newGuess.classList.add("resultRow");
    newGuess.classList.add("guess");
    resultsContainer.appendChild(newGuess);

    for (const [prop, val] of Object.entries(emperor)) {

        const newCell = document.createElement('div');
        newCell.classList.add("resultCell");
        newGuess.appendChild(newCell);

        // simple check
        if (prop == "name" || prop == "birthplace") {
            if (val == answer[prop]) { newCell.textContent = val + " ✅"; }
            else { newCell.textContent = val + " ❌"; }
        }

        // value check
        // ok noww the age ascension thingy should actually be removed
        else if (prop == "deathYear" || prop == "yearsRuled") {
            if (val == answer[prop]) { newCell.textContent = val + " ✅"; }
            else if (val < answer[prop]) { newCell.textContent = val + " ⬆️"; }
            else if (val > answer[prop]) { newCell.textContent = val + " ⬇️"; }
        }

        // groups check
        else if (prop == "groups") {
            for (let i = 0; i < val.length; i++) {
                const groupText = document.createElement('span');
                if (answer.groups.includes(val[i])) { groupText.textContent = val[i] + " ✅"; }
                else { groupText.textContent = val[i] + " ❌"; }
                newCell.appendChild(groupText);

                if (i + 1 != val.length) {
                    newCell.appendChild(document.createElement('br'));
                }
            }
        }

    }

    numGuesses++;
    if (emperor == answer) {
        toggleWinPopup();
    }
    else if (numGuesses == 6) {
        toggleLosePopup();
    }

}


// popups n stuff 
const aboutPopupBackground = document.getElementById("aboutPopup");
const settingsPopupBackground = document.getElementById("settingsPopup");
const aboutButton = document.getElementById("aboutButton");
const settingsButton = document.getElementById("settingsButton");

aboutPopupBackground.style.display = "none";
settingsPopupBackground.style.display = "none";

function toggleAboutPopup() {
    aboutPopupBackground.style.display = (aboutPopupBackground.style.display == "none") ? "flex" : "none";
}

function toggleSettingsPopup() {
    settingsPopupBackground.style.display = (settingsPopupBackground.style.display == "none") ? "flex" : "none";
}

aboutButton.addEventListener('click', toggleAboutPopup);
settingsButton.addEventListener('click', toggleSettingsPopup);
aboutPopupBackground.addEventListener('click', toggleAboutPopup);
settingsPopupBackground.addEventListener('click', toggleSettingsPopup);

// win/lose

const winPopupBackground = document.getElementById("winPopup");
const losePopupBackground = document.getElementById("losePopup");

winPopupBackground.style.display = "none";
losePopupBackground.style.display = "none";

function toggleWinPopup() {
    winPopupBackground.style.display = (winPopupBackground.style.display == "none") ? "flex" : "none";
}

function toggleLosePopup() {
    losePopupBackground.style.display = (losePopupBackground.style.display == "none") ? "flex" : "none";
}

winPopupBackground.addEventListener('click', () => { location.reload(); })
losePopupBackground.addEventListener('click', () => { location.reload(); })