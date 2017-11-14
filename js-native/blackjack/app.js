var Blackjack = (function (document) {
    'use strict';

    var aceCount,
        currentCard,
        dealerCards,
        dealerTotal,
        newCard,
        playerCards,
        playerTotal,
        randomCard,
        roundIsOver = false, // flag
        sum;

    return {
        deck: [6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'].map(function (card) {
            return {
                card: card,
                count: 4
            }
        }),

        getCard: function () {
            if (!this.deck.length) {
                return null;
            }

            randomCard = Math.floor(Math.random() * this.deck.length);
            currentCard = this.deck[randomCard];

            if (!(--currentCard.count)) {
                this.deck.splice(randomCard, 1);
            }

            return currentCard.card;
        },

        getTotal: function (cards) {
            sum = 0;
            aceCount = 0;

            for (var i = 0; i < cards.length; i++) {
                switch (cards[i]) {
                    case 'J':
                    case 'Q':
                    case 'K':
                        sum += 10;
                        break;
                    case 'A':
                        aceCount++;
                        break;
                    default:
                        sum += cards[i];
                }
            }

            while (aceCount > 0) {
                if (sum > 10) {
                    ++sum;
                } else {
                    sum += 11;
                }

                --aceCount;
            }

            return sum;
        },

        getResult: function () {
            this.viewCurrentStage();
            dealerTotal = this.getTotal(dealerCards);
            playerTotal = this.getTotal(playerCards);

            if (playerTotal > 21) {
                this.viewResult('You lost');
                return;
            } else if (playerTotal === 21) {
                this.viewResult('Black Jack!');
                return;
            }

            if (roundIsOver) {
                if (dealerTotal > 21 || dealerTotal < playerTotal) {
                    this.viewResult('You win!');
                } else if (dealerTotal > playerTotal) {
                    this.viewResult('You lost');
                } else if (dealerTotal === playerTotal) {
                    this.viewResult('Stay');
                }
            }
        },

        viewResult: function (result) {
            var newRound = document.getElementById('newRound'),
                playerOptions = document.getElementsByClassName('js-player-option'),
                refreshButton = document.createElement('button');

            refreshButton.innerHTML = 'New Round >';
            refreshButton.addEventListener('click', function () {
                location.reload();
            }, false);

            for (var i = 0; i < playerOptions.length; i++) {
                playerOptions[i].setAttribute('disabled', 'disabled');
            }

            document.getElementById('result').innerHTML = 'Round result: <b>' + result + '</b>';
            newRound.appendChild(refreshButton);
        },

        viewCurrentStage: function () {
            document.getElementById('dealerCards').innerHTML = dealerCards.join(', ');
            document.getElementById('playerCards').innerHTML = playerCards.join(', ');
            document.getElementById('dealerSum').innerHTML = this.getTotal(dealerCards);
            document.getElementById('playerSum').innerHTML = this.getTotal(playerCards);
        },

        hit: function () {
            if (!roundIsOver) {
                newCard = this.getCard();

                if (newCard) {
                    playerCards.push(newCard);
                    this.getResult();
                } else {
                    roundIsOver = true;
                    this.getResult();
                }
            }
        },

        stand: function () {
            if (!roundIsOver) {
                newCard = this.getCard();

                while (newCard && this.getTotal(dealerCards) < 17) {
                    dealerCards.push(newCard);
                    newCard = this.getCard();
                }

                roundIsOver = true;
                this.getResult();
            }
        },

        init: function () {
            dealerCards = [this.getCard()];
            playerCards = [this.getCard(), this.getCard()];
            this.getResult();

            document.getElementById('hit').addEventListener('click', this.hit.bind(this), false);
            document.getElementById('stand').addEventListener('click', this.stand.bind(this), false);
        }
    };
})(document);

document.onreadystatechange = function () {
    document.readyState === 'complete' && Blackjack.init();
};
