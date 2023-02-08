const wordList = [
    {
        word: "python",
        hint: "programming language"
    },
    {
        word: "guitar",
        hint: "a musical instrument"
    },
    {
        word: "aim",
        hint: "a purpose or intention"
    },
    {
        word: "venus",
        hint: "planet of our solar system"
    },
    {
        word: "gold",
        hint: "a yellow precious metal"
    },
    {
        word: "ebay",
        hint: "online shopping site"
    },
    {
        word: "golang",
        hint: "programming language"
    },
    {
        word: "coding",
        hint: "related to programming"
    },
    {
        word: "matrix",
        hint: "science fiction movie"
    },
    {
        word: "bugs",
        hint: "related to programming"
    },
    {
        word: "avatar",
        hint: "epic science fiction film"
    },
    {
        word: "gif",
        hint: "a file format for image"
    },
    {
        word: "mental",
        hint: "related to the mind"
    },
    {
        word: "map",
        hint: "diagram represent of an area"
    },
    {
        word: "island",
        hint: "land surrounded by water"
    },
    {
        word: "hockey",
        hint: "a famous outdoor game"
    },
    {
        word: "chess",
        hint: "related to a indoor game"
    },
    {
        word: "viber",
        hint: "a social media app"
    },
    {
        word: "github",
        hint: "code hosting platform"
    },
    {
        word: "png",
        hint: "a image file format"
    },
    {
        word: "silver",
        hint: "precious greyish-white metal"
    },
    {
        word: "mobile",
        hint: "an electronic device"
    },
    {
        word: "gpu",
        hint: "computer component"
    },
    {
        word: "java",
        hint: "programming language"
    },
    {
        word: "google",
        hint: "famous search engine"
    },
    {
        word: "venice",
        hint: "famous city of waters"
    },
    {
        word: "excel",
        hint: "microsoft product for windows"
    },
    {
        word: "mysql",
        hint: "a relational database system"
    },
    {
        word: "india",
        hint: "developing country name"
    },
    {
        word: "flute",
        hint: "a musical instrument"
    },
    {
        word: "crypto",
        hint: "related to cryptocurrency"
    },
    {
        word: "tesla",
        hint: "unit of magnetic flux density"
    },
    {
        word: "mars",
        hint: "planet of our solar system"
    },
    {
        word: "proxy",
        hint: "related to server application"
    },
    {
        word: "email",
        hint: "related to exchanging message"
    },
    {
        word: "html",
        hint: "markup language for the web"
    },
    {
        word: "air",
        hint: "related to a gas"
    },
    {
        word: "idea",
        hint: "a thought or suggestion"
    },
    {
        word: "server",
        hint: "related to computer or system"
    },
    {
        word: "svg",
        hint: "a vector image format"
    },
    {
        word: "jpeg",
        hint: "a image file format"
    },
    {
        word: "search",
        hint: "act to find something"
    },
    {
        word: "key",
        hint: "small piece of metal"
    },
    {
        word: "egypt",
        hint: "a country name"
    },
    {
        word: "joker",
        hint: "psychological thriller film"
    },
    {
        word: "dubai",
        hint: "developed country name"
    },
    {
        word: "photo",
        hint: "representation of person or scene"
    },
    {
        word: "nile",
        hint: "largest river in the world"
    },
    {
        word: "rain",
        hint: "related to a water"
    },
]

const resetBtn = document.querySelector(".btn"),
inputs = document.querySelector(".content .inputs"),
wordHint = document.querySelector(".details .hint span"),
guessesLeft = document.querySelector(".details .guesses-left span"),
wrongLetters = document.querySelector(".details .wrong-letter span"),
typingInput = document.querySelector(".content .typing-input");

let word,totalGuess,incorrects = [], corrects = [];

// function to generate the random word
const randomWord = ()=>{
    let ranObj = wordList[Math.floor(Math.random()*wordList.length)]
    word = ranObj.word;
    totalGuess = word.length >= 5 ? 8 : 6;
    incorrects = [];
    corrects = [];
    wordHint.innerText = ranObj.hint;
    guessesLeft.innerText = totalGuess;
    wrongLetters.innerText = incorrects;

    let html = "";
    for(let i=0;i<word.length;i++){
        html += `<input type="text" disabled>`
        inputs.innerHTML = html;
    }
}
// event listen on reset btn
resetBtn.addEventListener("click",()=>{
    resetBtn.innerHTML = "Resetting Game...";
    setTimeout(() => {
        randomWord();
        resetBtn.innerHTML = "Reset Game";
    }, 500);
})

// function to initialize the game
const initgame = (e)=>{
    let inputKey = e.target.value;
    if(inputKey.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${inputKey}`) && !corrects.includes(inputKey)){
        
        if(word.includes(inputKey)){    // if user input letter  found in the word
            for(let i=0;i<word.length;i++){
                if(word[i] === inputKey){
                    corrects.push(inputKey);
                    inputs.querySelectorAll("input")[i].value = inputKey;
                }
            }
        }else{
            totalGuess--;
            incorrects.push(` ${inputKey}`);
        }
        guessesLeft.innerText = totalGuess;
        wrongLetters.innerText = incorrects;
    }
    typingInput.value = "";
    setTimeout(() => {
        
        if(corrects.length === word.length){    // if user guesses the word correctly
            alert(`Hurray! You found the word ${word.toUpperCase()}`);
            randomWord();
        } else if(totalGuess < 1){
            alert("Game Over! You Don't have remaining guesses");
            for(let i=0;i<word.length;i++){
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            
        }
    }, 200);
}

typingInput.addEventListener("input",initgame); // initializing the game after listening event on input
document.addEventListener("keydown",()=> typingInput.focus())   // keydown event listen on document

randomWord();
