//let us create the global variables
var cardDeck = document.getElementById("card-deck");
console.log(cardDeck);
var cards = document.getElementsByClassName("card");
//the var cards prints in an array and we need to spread the array using ...notation
var arrayOfCards = [...cards];
var openCards = [];
var matchedCardList = [];
var clicks = 0;
var time;
var interval;
var modal = document.getElementById("popup1");
var fail = document.getElementById("popup2")

function shuffle(inputArray) {
    for (var currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
        var tempValue = inputArray[currentIndex];
        var randomIndex = Math.floor(Math.random() * currentIndex); //generate random cards
        inputArray[currentIndex] = inputArray[randomIndex];
        inputArray[randomIndex] = tempValue; //shuffling the cards
    }
    return inputArray;
}

function refreshMe() {
    cardDeck.innerHTML = "";
    var fiveMinutes = 60 * 2,
        display = document.querySelector('.timer');
    startTimer(fiveMinutes, display);
    arrayOfCards = shuffle(arrayOfCards);
    for (var i = 0; i < arrayOfCards.length; i++) {
        cardDeck.appendChild(arrayOfCards[i]);
        arrayOfCards[i].classList.remove("show", "open", "match", "disabled");
        arrayOfCards[i].addEventListener("click", displayCard);
        arrayOfCards[i].addEventListener("click", cardsOpen);
        arrayOfCards[i].querySelector("i").classList.add('hide');
        clicks = 0;
        document.getElementsByClassName("moves")[0].innerHTML = clicks;
        arrayOfCards[i].addEventListener("click", congrats);
        // arrayOfCards[i].addEventListener("click", flashCards);
    }
}
document.body.onload = refreshMe;

function startGame() {
    location.reload();
    refreshMe();

}



function displayCard() {
    this.classList.toggle("show");
    this.classList.toggle("open");
    this.classList.toggle("disabled");
    this.querySelector("i").classList.remove("hide");

}

// function show() {
//     this.querySelector("i").classList.remove("hide");
// }

function cardsOpen() {
    openCards.push(this);
    if (openCards.length == 2) {
        // console.log(openCards[0])
        clicks++;
        document.getElementsByClassName("moves")[0].innerHTML = clicks;

        //console.log(openCards[0].type)
        if (openCards[0].getAttribute("type") == openCards[1].getAttribute("type")) {
            matchedCards(...openCards);
            console.log('matched');
            // openCards = [];
        } else {
            unmatchedCards(...openCards);
            console.log("dont open");
            // openCards = [];
        }
    }
}

function matchedCards(firstCard, secondCard) {
    firstCard.classList.add("match", "disabled", "hide");
    // firstCard.querySelector("i").classList.add("hide");
    secondCard.classList.add("match", "disabled", "hide");
    // secondCard.querySelector("i").classList.add("hide");
    firstCard.classList.remove("show", "open");
    // firstCard.querySelector("i").classList.remove("hide");
    secondCard.classList.remove("show", "open");
    // secondCard.querySelector("i").classList.remove("hide");
    matchedCardList.push(firstCard, secondCard);
    openCards = [];

}

function unmatchedCards(firstCard, secondCard) {
    firstCard.classList.add("unmatched", "open", "show", "disabled");
    // firstCard.querySelector("i").classList.add("hide");
    secondCard.classList.add("unmatched", "open", "show", "disabled");
    // secondCard.querySelector("i").classList.add("hide");
    disabled();
    setTimeout(function() {
        // secondCard.querySelector("i").classList.remove("hide");

        firstCard.classList.remove("unmatched", "open", "show", "disabled");
        // firstCard.querySelector("i").classList.remove("hide");
        secondCard.classList.remove("unmatched", "open", "show", "disabled");
        enabled();
        openCards = [];
    }, 1000);

}

function disabled() {
    arrayOfCards.forEach(function(card) {
        card.classList.add("disabled");



    });
};


function enabled() {
    arrayOfCards.forEach(function(card) {
        card.classList.remove("disabled");
        card.querySelector(":not(.match)").classList.add("hide");
        // document.getElementsByClassName("unmatched").classList.add("hide");
    });
    matchedCardList.forEach(function(card) {
        card.classList.add("disabled");
        card.querySelector(":not(.match)").classList.remove("hide");

    });

};

//congrats
var closeIcon = document.getElementById("close-icon");

function congrats() {
    if (matchedCardList.length == arrayOfCards.length) {
        modal.classList.add("show");
        document.getElementById('totalTime').innerHTML = time;
        clicks;
        document.getElementById('finalMove').innerHTML = clicks;
        console.log("done");
        clearInterval(interval);
    }
    // modal.classList.add("show");
    // document.getElementById('totalTime').innerHTML = time;
    closeIcon.addEventListener("click", closeCongrats);
};

function closeCongrats() {
    modal.classList.remove("show");
    startGame();
}

function playAgain() {
    modal.classList.remove("show");
    startGame();
    // location.reload();
};

//failed
function failedGame() {
    fail.classList.add("show");
    document.getElementById('totalTime').innerHTML = time;
}

function startTimer(duration, display) {
    var timer = 0,
        minutes, seconds;
    interval = setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        time = minutes + ":" + seconds;

        if (++timer > duration) {
            timer = 0;
            clearInterval(interval);
            failedGame();

        }
    }, 1000);
}