const View = (document => {
    const audio = document.getElementById("shotSound");
    const gameArea = document.getElementById("gameArea");
    const gameResultInner = document.getElementById("gameResultInner");
    const message = document.getElementById("userMessage");
    const messageFontSize = getComputedStyle(message).fontSize;

    let [gameResultCurrentOpacity, increaseMessageFontSize, messageCurrentFontSize, ship] = [];

    return {
        // Создание игрового поля
        createGameArea (spaceSize) {
            const initCharCode = "A".codePointAt();

            let [gameAreaBody, gameAreaHead, horizontalCoordinate] = ["", ""];

            for (let i = 0; i < spaceSize;) {
                horizontalCoordinate = String.fromCodePoint(initCharCode + i);
                gameAreaHead += `<td class="game-area__vertical-coordinate">${++i}</td>`;
                gameAreaBody += `<tr><td class="game-area__horizontal-coordinate">${horizontalCoordinate}</td>`;

                for (let i = 0; i < spaceSize;) {
                    gameAreaBody += `<td class="game-area-cell" data-coordinate="${horizontalCoordinate}${++i}"></td>`;
                }

                gameAreaBody += `</tr>`;
            }

            gameArea.innerHTML = `<thead><tr><td></td>${gameAreaHead}</tr></thead><tbody>${gameAreaBody}</tbody>`;
        },

        // Отображаение счета игрока на странице
        displayGameResult (count) {
            gameResultCurrentOpacity = gameResultInner.style.opacity = 0;
            message.style.display = "none";
            gameArea.className += " game-area--disable";
            document.getElementById("gameResult").className += " game-result--visible";
            document.getElementById("userCount").innerHTML = count;

            const increaseGameResultOpacity = setInterval(() => {
                if (gameResultCurrentOpacity / 100 < 1) {
                    gameResultCurrentOpacity += 10;
                    gameResultInner.style.opacity = gameResultCurrentOpacity / 100;
                } else {
                    clearInterval(increaseGameResultOpacity);
                }
            }, 100 / 3);
        },

        // Отображаение сообщения на странице
        displayMessage (messageText) {
            messageCurrentFontSize = message.style.fontSize = 0;
            message.innerHTML = messageText;

            increaseMessageFontSize = setInterval(() => {
                if (messageCurrentFontSize < parseInt(messageFontSize, 10)) {
                    messageCurrentFontSize++;
                    userMessage.style.fontSize = `${messageCurrentFontSize}px`;
                } else {
                    clearInterval(increaseMessageFontSize);
                }
            }, 5);
        },

        // Пометка ячейки игрового поля после выполениния по ней первого выстрела
        setShootedStatus (gameAreaCell) {
            gameAreaCell.setAttribute("data-shot", "true");
            gameAreaCell.className += " game-area-cell--shooted";
        },

        // Отображаение корабля (синого или красного) в игровом поле
        showShip (coordinate, color) {
            ship = document.querySelector(`[data-coordinate="${coordinate}"]`);

            this.setShootedStatus(ship);

            if (color === "red") {
                ship.className += " ship-red";
            } else if (color === "blue") {
                ship.className += " ship-blue";
            }
        },

        // Отображаение астероида в случае промаха
        showAsteroid (coordinate) {
            const gameAreaCell = document.querySelector(`[data-coordinate="${coordinate}"]`);

            this.setShootedStatus(gameAreaCell);
            gameAreaCell.className += " asteroid";
        },

        // Звук выстрела
        soundShot () {
            audio.pause();
            audio.currentTime = 0;

            setTimeout(() => audio.play(), 20);
        }
    }
})(document);

export default View;
