(function () {

    var cardsFaces = ['🐼', '🐨', '🦀', '🐻', '🐵', '🦃', '🐼', '🐨', '🦀', '🐻', '🐵', '🦃'];

    var cards = {};

    const numberOfCards = 12;

    function Card(id, cardInput, cardFace) {
        this.id = id;
        this.cardInput = cardInput;
        this.cardFace = cardFace;
    }

    var firstCard = null;
    var secondCard = null;

    var gameStarted = false;

    var secondsCounter = 59;

    var counter = null;
    var pairCounter = 0;
    var gameTimer = document.querySelector('#gameTimer');

    function timerTick() {
        gameTimer.innerHTML = (secondsCounter > 9 ? "00:" : "00:0") + secondsCounter;
        if (secondsCounter === 0) {
            clearInterval(counter);
            showTryAgainForm();
        }
        else
            secondsCounter--;
    }

    function showTryAgainForm() {
        let tryAgainSection = document.querySelector('#tryAgainSection');
        tryAgainSection.style.display = 'block';
    }

    var playAgainSection = document.querySelector('.playAgainSection');

    var playAgainButton = document.querySelector('.playAgainFormPlayAgainButton');

    playAgainButton.addEventListener('mousedown', function (event) {
        event.target.style.boxShadow = 'inset 2px 1px 8px #2f2f2f';
    });

    playAgainButton.addEventListener('mouseup', function (event) {
        event.target.style.boxShadow = '1px 1px 1px #2f2f2f';
        playAgainSection.style.display = 'none';
        restart();
    });

    var tryAgainSection = document.querySelector('.tryAgainSection');

    var tryAgainButton = document.querySelector('.tryAgainFormButton');

    tryAgainButton.addEventListener('mousedown', function (event) {
        event.target.style.boxShadow = 'inset 2px 1px 8px #2f2f2f';
    });

    tryAgainButton.addEventListener('mouseup', function (event) {
        event.target.style.boxShadow = 'inset 1px 1px 1px #2f2f2f';
        tryAgainSection.style.display = 'none';
        restart();
    });

    function restart() {

        cardsFaces.sort(function (a, b) {
            return 0.5 - Math.random();
        });

        let i = 0;

        for (let cardId in cards) {
            cards[cardId].cardInput.checked = false;
            cards[cardId].cardInput.disabled = false;
            cards[cardId].cardInput.setAttribute('value', cardsFaces[i]);
            cards[cardId].cardFace.innerHTML = cardsFaces[i];
            cards[cardId].cardFace.classList.remove('not_paired_card');
            cards[cardId].cardFace.classList.remove('paired_card');
            i++;
        }

        gameTimer.innerHTML = "00:60";
        secondsCounter = 59;
        gameStarted = false;
        firstCard = null;
        secondCard = null;
        pairCounter = 0;
    }

    function start() {
        cardsFaces.sort(function (a, b) {
            return 0.5 - Math.random();
        });

        document.querySelector('.grid').addEventListener('click', function (e) {
            if (e.target.type === 'checkbox') {
                console.log("click");
                if (!gameStarted) {
                    gameStarted = true;
                    counter = setInterval(timerTick, 1000);
                }
                if (firstCard != null) {
                    if (secondCard != null) {
                        firstCard.cardInput.checked = false;
                        secondCard.cardInput.checked = false;
                        firstCard.cardFace.classList.remove('not_paired_card');
                        secondCard.cardFace.classList.remove('not_paired_card');
                        if ((e.target.id !== firstCard.id) && (e.target.id !== secondCard.id))
                            firstCard = cards[e.target.id];
                        else
                            firstCard = null;
                        secondCard = null;
                    }
                    else if (e.target.id === firstCard.id) {
                        firstCard = null;
                    }
                    else if (firstCard.cardInput.value === e.target.value) {
                        firstCard.cardFace.classList.add('paired_card');
                        cards[e.target.id].cardFace.classList.add('paired_card');
                        e.target.disabled = true;
                        firstCard.cardInput.disabled = true;
                        firstCard = null;
                        pairCounter++;
                        if (pairCounter === 6) {
                            clearInterval(counter);
                            playAgainSection.style.display = 'block';
                        }
                    }
                    else {
                        secondCard = cards[e.target.id];
                        firstCard.cardFace.classList.add('not_paired_card');
                        secondCard.cardFace.classList.add('not_paired_card');
                    }
                }
                else firstCard = cards[e.target.id];
            }
        });

        for (let i = 1; i <= numberOfCards; i++) {
            let cardInput = document.querySelector('#c' + i);
            let cardFace = document.querySelector('label[for="c' + i + '"] > .card_face');
            cardInput.setAttribute('value', cardsFaces[i - 1]);
            cardFace.innerHTML = cardsFaces[i - 1];
            cards['c' + i] = new Card('c' + i, cardInput, cardFace);
        }
    }

    start();

})();