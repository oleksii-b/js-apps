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

const Model = (() => {
    class Spaceship {
        constructor () {
            color = (color === "red") ? "blue" : "red";
            this.color = color;
            this.damage = [];
            this.position = [];
        }
    };

    const [initCharCode, spaceships] = ["A".codePointAt(), []];

    let [color, colNumber, damagedPosition, location, rowNumber, position, shipPosition, spaceship] = [];

    return {
        // Размер карты
        spaceSize: 8,

        // Кол-во флотилий
        numberOfShips: 6,

        // Размеры флотилии
        shipSize: 3,

        // Уничтоженные флотилии
        destroyedShips: 0,

        // Создание позиции корабля (вертикальной или горизонтальной - случайным образом)
        get createShipPosition () {
            location = Math.floor(Math.random() * 2),
            shipPosition = [];

            if (location === 1) { // horizontal
                rowNumber = Math.floor(Math.random() * this.spaceSize);
                colNumber = Math.ceil(Math.random() * (this.spaceSize - this.shipSize + 1));
            } else { // vertical
                rowNumber = Math.floor(Math.random() * (this.spaceSize - this.shipSize + 1));
                colNumber = Math.ceil(Math.random() * this.spaceSize);
            }

            for (let i = 0; i < this.shipSize; i++) {
                if (location === 1) {
                    shipPosition.push(String.fromCodePoint(initCharCode + rowNumber) + `${colNumber + i}`);
                } else {
                    shipPosition.push(String.fromCodePoint(initCharCode + rowNumber + i) + `${colNumber}`);
                }
            }

            return shipPosition;
        },

        // Проверка, полностью ли подбиты три корабля
        checkDestroyedShip (ship) {
            for (let i = 0; i < this.shipSize; i++) {
                if (!ship.damage[i]) {
                    return false;
                }
            }

            return true;
        },

        // Проверка, не имеют ли созданные корабли одинаковые позиции
        checkRepeatsPosition (spaceships, position) {
            for (let i = 0; i < this.numberOfShips; i++) {
                for (let j = 0; j < this.shipSize; j++) {
                    if (spaceships[i].position.indexOf(position[j]) >= 0) {
                        return true;
                    }
                }
            }

            return false;
        },

        // Генерирование будущего корабля и его позиции, проверка на незанятость данной позиции
        // и последующее добавление этой позиции в массив флотилий
        createSpaceships () {
            for (let i = 0; i < this.numberOfShips; i++) {
                spaceships.push(new Spaceship);
            }

            for (let i = 0; i < this.numberOfShips; i++) {
                do {
                    position = this.createShipPosition;
                } while (this.checkRepeatsPosition(spaceships, position));

                spaceships[i].position = position;
            }

            this.spaceships = spaceships;
        },

        // Выстрел и проверка на попадание
        shot (coordinate) {
            for (let i = 0; i < this.numberOfShips; i++) {
                spaceship = this.spaceships[i];
                damagedPosition = spaceship.position.indexOf(coordinate);

                if (damagedPosition >= 0) {
                    spaceship.damage[damagedPosition] = "loss";
                    color = spaceship.color;

                    if (this.checkDestroyedShip(spaceship)) {
                        this.destroyedShips++;

                        return {
                            coordinate,
                            color,
                            status: 3
                        }
                    }

                    return {
                        coordinate,
                        color,
                        status: 1
                    }
                }
            }

            return {
                coordinate
            }
        }
    }
})();

const Controller = (document => {
    let [loss, target, targetCoordinate] = [];

    return {
        // Количество выстрелов
        shotsNumber: 0,

        shotResult (coordinate) {
            if (document.querySelector(`[data-coordinate="${coordinate}"]`)) {
                loss = Model.shot(coordinate);

                if (loss.status === 3) {
                    View.showShip(loss.coordinate, loss.color);
                    View.displayMessage("Флотилия из 3-х кораблей уничтожена!");

                    if (Model.destroyedShips === Model.numberOfShips) {
                        View.displayMessage("Вы уничтожили все корабли!");
                        View.displayGameResult(Math.round(Model.numberOfShips * Model.shipSize * 1000 / this.shotsNumber));
                    }
                } else if (loss.status === 1) {
                    View.showShip(loss.coordinate, loss.color);
                    View.displayMessage("Попадание");
                } else if (!loss.status && loss.coordinate) {
                    View.showAsteroid(loss.coordinate);
                    View.displayMessage("Промах");
                }

                this.shotsNumber++;
                View.soundShot();
            }
        },

        shot (e) {
            e = e || window.event;
            target = e.target;
            targetCoordinate = target.getAttribute("data-coordinate");

            if (!target.getAttribute("data-shot") && targetCoordinate) {
                Controller.shotResult(targetCoordinate);
            }
        }
    }
})(document);

(document => {
    const SpaceRangers = {
        init () {
            this.control();
            this.event();
        },

        control () {
            Model.createSpaceships();
            View.createGameArea(Model.spaceSize);
        },

        event () {
            document.getElementById("startNewRound").addEventListener("click", () => location.reload(), false);
            document.getElementById("gameArea").addEventListener("click", e => Controller.shot(e), false);
        }
    };

    SpaceRangers.init();
})(document);
