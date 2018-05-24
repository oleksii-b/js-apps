class Spaceship {
    constructor () {
        color = (color === 'red') ? 'blue' : 'red';
        this.color = color;
        this.damage = [];
        this.position = [];
    }
};

const [initCharCode, spaceships] = ['A'.codePointAt(), []];

let Model, [
        color,
        colNumber,
        damagedPosition,
        location,
        rowNumber,
        position,
        shipPosition,
        spaceship
    ] = [];

export default Model = {
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
                spaceship.damage[damagedPosition] = 'loss';
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
};
