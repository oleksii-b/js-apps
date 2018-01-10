(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controller = function (document) {
    var _ref = [],
        loss = _ref[0],
        target = _ref[1],
        targetCoordinate = _ref[2];


    return {
        // Количество выстрелов
        shotsNumber: 0,

        shotResult: function shotResult(coordinate) {
            if (document.querySelector('[data-coordinate="' + coordinate + '"]')) {
                loss = _Model2.default.shot(coordinate);

                if (loss.status === 3) {
                    _View2.default.showShip(loss.coordinate, loss.color);
                    _View2.default.displayMessage("Флотилия из 3-х кораблей уничтожена!");

                    if (_Model2.default.destroyedShips === _Model2.default.numberOfShips) {
                        _View2.default.displayMessage("Вы уничтожили все корабли!");
                        _View2.default.displayGameResult(Math.round(_Model2.default.numberOfShips * _Model2.default.shipSize * 1000 / this.shotsNumber));
                    }
                } else if (loss.status === 1) {
                    _View2.default.showShip(loss.coordinate, loss.color);
                    _View2.default.displayMessage("Попадание");
                } else if (!loss.status && loss.coordinate) {
                    _View2.default.showAsteroid(loss.coordinate);
                    _View2.default.displayMessage("Промах");
                }

                this.shotsNumber++;
                _View2.default.soundShot();
            }
        },
        shot: function shot(e) {
            e = e || window.event;
            target = e.target;
            targetCoordinate = target.getAttribute("data-coordinate");

            if (!target.getAttribute("data-shot") && targetCoordinate) {
                Controller.shotResult(targetCoordinate);
            }
        }
    };
}(document);

exports.default = Controller;

},{"./Model":2,"./View":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
    var Spaceship = function Spaceship() {
        _classCallCheck(this, Spaceship);

        color = color === "red" ? "blue" : "red";
        this.color = color;
        this.damage = [];
        this.position = [];
    };

    ;

    var _ref = ["A".codePointAt(), []],
        initCharCode = _ref[0],
        spaceships = _ref[1];
    var _ref2 = [],
        color = _ref2[0],
        colNumber = _ref2[1],
        damagedPosition = _ref2[2],
        location = _ref2[3],
        rowNumber = _ref2[4],
        position = _ref2[5],
        shipPosition = _ref2[6],
        spaceship = _ref2[7];


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
        get createShipPosition() {
            location = Math.floor(Math.random() * 2), shipPosition = [];

            if (location === 1) {
                // horizontal
                rowNumber = Math.floor(Math.random() * this.spaceSize);
                colNumber = Math.ceil(Math.random() * (this.spaceSize - this.shipSize + 1));
            } else {
                // vertical
                rowNumber = Math.floor(Math.random() * (this.spaceSize - this.shipSize + 1));
                colNumber = Math.ceil(Math.random() * this.spaceSize);
            }

            for (var i = 0; i < this.shipSize; i++) {
                if (location === 1) {
                    shipPosition.push(String.fromCodePoint(initCharCode + rowNumber) + ("" + (colNumber + i)));
                } else {
                    shipPosition.push(String.fromCodePoint(initCharCode + rowNumber + i) + ("" + colNumber));
                }
            }

            return shipPosition;
        },

        // Проверка, полностью ли подбиты три корабля
        checkDestroyedShip: function checkDestroyedShip(ship) {
            for (var i = 0; i < this.shipSize; i++) {
                if (!ship.damage[i]) {
                    return false;
                }
            }

            return true;
        },


        // Проверка, не имеют ли созданные корабли одинаковые позиции
        checkRepeatsPosition: function checkRepeatsPosition(spaceships, position) {
            for (var i = 0; i < this.numberOfShips; i++) {
                for (var j = 0; j < this.shipSize; j++) {
                    if (spaceships[i].position.indexOf(position[j]) >= 0) {
                        return true;
                    }
                }
            }

            return false;
        },


        // Генерирование будущего корабля и его позиции, проверка на незанятость данной позиции
        // и последующее добавление этой позиции в массив флотилий
        createSpaceships: function createSpaceships() {
            for (var i = 0; i < this.numberOfShips; i++) {
                spaceships.push(new Spaceship());
            }

            for (var _i = 0; _i < this.numberOfShips; _i++) {
                do {
                    position = this.createShipPosition;
                } while (this.checkRepeatsPosition(spaceships, position));

                spaceships[_i].position = position;
            }

            this.spaceships = spaceships;
        },


        // Выстрел и проверка на попадание
        shot: function shot(coordinate) {
            for (var i = 0; i < this.numberOfShips; i++) {
                spaceship = this.spaceships[i];
                damagedPosition = spaceship.position.indexOf(coordinate);

                if (damagedPosition >= 0) {
                    spaceship.damage[damagedPosition] = "loss";
                    color = spaceship.color;

                    if (this.checkDestroyedShip(spaceship)) {
                        this.destroyedShips++;

                        return {
                            coordinate: coordinate,
                            color: color,
                            status: 3
                        };
                    }

                    return {
                        coordinate: coordinate,
                        color: color,
                        status: 1
                    };
                }
            }

            return {
                coordinate: coordinate
            };
        }
    };
}();

exports.default = Model;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var View = function (document) {
    var audio = document.getElementById("shotSound");
    var gameArea = document.getElementById("gameArea");
    var gameResultInner = document.getElementById("gameResultInner");
    var message = document.getElementById("userMessage");
    var messageFontSize = getComputedStyle(message).fontSize;

    var _ref = [],
        gameResultCurrentOpacity = _ref[0],
        increaseMessageFontSize = _ref[1],
        messageCurrentFontSize = _ref[2],
        ship = _ref[3];


    return {
        // Создание игрового поля
        createGameArea: function createGameArea(spaceSize) {
            var initCharCode = "A".codePointAt();

            var _ref2 = ["", ""],
                gameAreaBody = _ref2[0],
                gameAreaHead = _ref2[1],
                horizontalCoordinate = _ref2[2];


            for (var i = 0; i < spaceSize;) {
                horizontalCoordinate = String.fromCodePoint(initCharCode + i);
                gameAreaHead += "<td class=\"game-area__vertical-coordinate\">" + ++i + "</td>";
                gameAreaBody += "<tr><td class=\"game-area__horizontal-coordinate\">" + horizontalCoordinate + "</td>";

                for (var _i = 0; _i < spaceSize;) {
                    gameAreaBody += "<td class=\"game-area-cell\" data-coordinate=\"" + horizontalCoordinate + ++_i + "\"></td>";
                }

                gameAreaBody += "</tr>";
            }

            gameArea.innerHTML = "<thead><tr><td></td>" + gameAreaHead + "</tr></thead><tbody>" + gameAreaBody + "</tbody>";
        },


        // Отображаение счета игрока на странице
        displayGameResult: function displayGameResult(count) {
            gameResultCurrentOpacity = gameResultInner.style.opacity = 0;
            message.style.display = "none";
            gameArea.className += " game-area--disable";
            document.getElementById("gameResult").className += " game-result--visible";
            document.getElementById("userCount").innerHTML = count;

            var increaseGameResultOpacity = setInterval(function () {
                if (gameResultCurrentOpacity / 100 < 1) {
                    gameResultCurrentOpacity += 10;
                    gameResultInner.style.opacity = gameResultCurrentOpacity / 100;
                } else {
                    clearInterval(increaseGameResultOpacity);
                }
            }, 100 / 3);
        },


        // Отображаение сообщения на странице
        displayMessage: function displayMessage(messageText) {
            messageCurrentFontSize = message.style.fontSize = 0;
            message.innerHTML = messageText;

            increaseMessageFontSize = setInterval(function () {
                if (messageCurrentFontSize < parseInt(messageFontSize, 10)) {
                    messageCurrentFontSize++;
                    userMessage.style.fontSize = messageCurrentFontSize + "px";
                } else {
                    clearInterval(increaseMessageFontSize);
                }
            }, 5);
        },


        // Пометка ячейки игрового поля после выполениния по ней первого выстрела
        setShootedStatus: function setShootedStatus(gameAreaCell) {
            gameAreaCell.setAttribute("data-shot", "true");
            gameAreaCell.className += " game-area-cell--shooted";
        },


        // Отображаение корабля (синого или красного) в игровом поле
        showShip: function showShip(coordinate, color) {
            ship = document.querySelector("[data-coordinate=\"" + coordinate + "\"]");

            this.setShootedStatus(ship);

            if (color === "red") {
                ship.className += " ship-red";
            } else if (color === "blue") {
                ship.className += " ship-blue";
            }
        },


        // Отображаение астероида в случае промаха
        showAsteroid: function showAsteroid(coordinate) {
            var gameAreaCell = document.querySelector("[data-coordinate=\"" + coordinate + "\"]");

            this.setShootedStatus(gameAreaCell);
            gameAreaCell.className += " asteroid";
        },


        // Звук выстрела
        soundShot: function soundShot() {
            audio.pause();
            audio.currentTime = 0;

            setTimeout(function () {
                return audio.play();
            }, 20);
        }
    };
}(document);

exports.default = View;

},{}],4:[function(require,module,exports){
'use strict';

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

var _Controller = require('./Controller');

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpaceRangers = {
    init: function init() {
        this.control();
        this.events();
    },
    control: function control() {
        _Model2.default.createSpaceships();
        _View2.default.createGameArea(_Model2.default.spaceSize);
    },
    events: function events() {
        document.getElementById("startNewRound").addEventListener("click", function () {
            return location.reload();
        }, false);
        document.getElementById("gameArea").addEventListener("click", function (e) {
            return _Controller2.default.shot(e);
        }, false);
    }
};

SpaceRangers.init();

},{"./Controller":1,"./Model":2,"./View":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcQ29udHJvbGxlci5qcyIsImpzXFxNb2RlbC5qcyIsImpzXFxWaWV3LmpzIiwianNcXGFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sYUFBYyxvQkFBWTtBQUFBLGVBQ1csRUFEWDtBQUFBLFFBQ3ZCLElBRHVCO0FBQUEsUUFDakIsTUFEaUI7QUFBQSxRQUNULGdCQURTOzs7QUFHNUIsV0FBTztBQUNIO0FBQ0EscUJBQWEsQ0FGVjs7QUFJSCxrQkFKRyxzQkFJUyxVQUpULEVBSXFCO0FBQ3BCLGdCQUFJLFNBQVMsYUFBVCx3QkFBNEMsVUFBNUMsUUFBSixFQUFpRTtBQUM3RCx1QkFBTyxnQkFBTSxJQUFOLENBQVcsVUFBWCxDQUFQOztBQUVBLG9CQUFJLEtBQUssTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNuQixtQ0FBSyxRQUFMLENBQWMsS0FBSyxVQUFuQixFQUErQixLQUFLLEtBQXBDO0FBQ0EsbUNBQUssY0FBTCxDQUFvQixzQ0FBcEI7O0FBRUEsd0JBQUksZ0JBQU0sY0FBTixLQUF5QixnQkFBTSxhQUFuQyxFQUFrRDtBQUM5Qyx1Q0FBSyxjQUFMLENBQW9CLDRCQUFwQjtBQUNBLHVDQUFLLGlCQUFMLENBQXVCLEtBQUssS0FBTCxDQUFXLGdCQUFNLGFBQU4sR0FBc0IsZ0JBQU0sUUFBNUIsR0FBdUMsSUFBdkMsR0FBOEMsS0FBSyxXQUE5RCxDQUF2QjtBQUNIO0FBQ0osaUJBUkQsTUFRTyxJQUFJLEtBQUssTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUMxQixtQ0FBSyxRQUFMLENBQWMsS0FBSyxVQUFuQixFQUErQixLQUFLLEtBQXBDO0FBQ0EsbUNBQUssY0FBTCxDQUFvQixXQUFwQjtBQUNILGlCQUhNLE1BR0EsSUFBSSxDQUFDLEtBQUssTUFBTixJQUFnQixLQUFLLFVBQXpCLEVBQXFD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LElBQU4sRUFBTjtBQUFBLGFBQVgsRUFBK0IsRUFBL0I7QUFDSDtBQXhGRSxLQUFQO0FBMEZILENBbkdZLENBbUdWLFFBbkdVLENBQWI7O2tCQXFHZSxJOzs7OztBQ3JHZjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sZUFBZTtBQUNqQixRQURpQixrQkFDVDtBQUNKLGFBQUssT0FBTDtBQUNBLGFBQUssTUFBTDtBQUNILEtBSmdCO0FBTWpCLFdBTmlCLHFCQU1OO0FBQ1Asd0JBQU0sZ0JBQU47QUFDQSx1QkFBSyxjQUFMLENBQW9CLGdCQUFNLFNBQTFCO0FBQ0gsS0FUZ0I7QUFXakIsVUFYaUIsb0JBV1A7QUFDTixpQkFBUyxjQUFULENBQXdCLGVBQXhCLEVBQXlDLGdCQUF6QyxDQUEwRCxPQUExRCxFQUFtRTtBQUFBLG1CQUFNLFNBQVMsTUFBVCxFQUFOO0FBQUEsU0FBbkUsRUFBNEYsS0FBNUY7QUFDQSxpQkFBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RDtBQUFBLG1CQUFLLHFCQUFXLElBQVgsQ0FBZ0IsQ0FBaEIsQ0FBTDtBQUFBLFNBQTlELEVBQXVGLEtBQXZGO0FBQ0g7QUFkZ0IsQ0FBckI7O0FBaUJBLGFBQWEsSUFBYiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi9Nb2RlbCc7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldyc7XHJcblxyXG5jb25zdCBDb250cm9sbGVyID0gKGRvY3VtZW50ID0+IHtcclxuICAgIGxldCBbbG9zcywgdGFyZ2V0LCB0YXJnZXRDb29yZGluYXRlXSA9IFtdO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0LLRi9GB0YLRgNC10LvQvtCyXHJcbiAgICAgICAgc2hvdHNOdW1iZXI6IDAsXHJcblxyXG4gICAgICAgIHNob3RSZXN1bHQgKGNvb3JkaW5hdGUpIHtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNvb3JkaW5hdGU9XCIke2Nvb3JkaW5hdGV9XCJdYCkpIHtcclxuICAgICAgICAgICAgICAgIGxvc3MgPSBNb2RlbC5zaG90KGNvb3JkaW5hdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb3NzLnN0YXR1cyA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIFZpZXcuc2hvd1NoaXAobG9zcy5jb29yZGluYXRlLCBsb3NzLmNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBWaWV3LmRpc3BsYXlNZXNzYWdlKFwi0KTQu9C+0YLQuNC70LjRjyDQuNC3IDMt0YUg0LrQvtGA0LDQsdC70LXQuSDRg9C90LjRh9GC0L7QttC10L3QsCFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNb2RlbC5kZXN0cm95ZWRTaGlwcyA9PT0gTW9kZWwubnVtYmVyT2ZTaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWaWV3LmRpc3BsYXlNZXNzYWdlKFwi0JLRiyDRg9C90LjRh9GC0L7QttC40LvQuCDQstGB0LUg0LrQvtGA0LDQsdC70LghXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWaWV3LmRpc3BsYXlHYW1lUmVzdWx0KE1hdGgucm91bmQoTW9kZWwubnVtYmVyT2ZTaGlwcyAqIE1vZGVsLnNoaXBTaXplICogMTAwMCAvIHRoaXMuc2hvdHNOdW1iZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvc3Muc3RhdHVzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmlldy5zaG93U2hpcChsb3NzLmNvb3JkaW5hdGUsIGxvc3MuY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIFZpZXcuZGlzcGxheU1lc3NhZ2UoXCLQn9C+0L/QsNC00LDQvdC40LVcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFsb3NzLnN0YXR1cyAmJiBsb3NzLmNvb3JkaW5hdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBWaWV3LnNob3dBc3Rlcm9pZChsb3NzLmNvb3JkaW5hdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFZpZXcuZGlzcGxheU1lc3NhZ2UoXCLQn9GA0L7QvNCw0YVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG90c051bWJlcisrO1xyXG4gICAgICAgICAgICAgICAgVmlldy5zb3VuZFNob3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3QgKGUpIHtcclxuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgdGFyZ2V0Q29vcmRpbmF0ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkaW5hdGVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNob3RcIikgJiYgdGFyZ2V0Q29vcmRpbmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgQ29udHJvbGxlci5zaG90UmVzdWx0KHRhcmdldENvb3JkaW5hdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KShkb2N1bWVudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCJjb25zdCBNb2RlbCA9ICgoKSA9PiB7XHJcbiAgICBjbGFzcyBTcGFjZXNoaXAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICAgICAgY29sb3IgPSAoY29sb3IgPT09IFwicmVkXCIpID8gXCJibHVlXCIgOiBcInJlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IFtpbml0Q2hhckNvZGUsIHNwYWNlc2hpcHNdID0gW1wiQVwiLmNvZGVQb2ludEF0KCksIFtdXTtcclxuXHJcbiAgICBsZXQgW2NvbG9yLCBjb2xOdW1iZXIsIGRhbWFnZWRQb3NpdGlvbiwgbG9jYXRpb24sIHJvd051bWJlciwgcG9zaXRpb24sIHNoaXBQb3NpdGlvbiwgc3BhY2VzaGlwXSA9IFtdO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8g0KDQsNC30LzQtdGAINC60LDRgNGC0YtcclxuICAgICAgICBzcGFjZVNpemU6IDgsXHJcblxyXG4gICAgICAgIC8vINCa0L7Quy3QstC+INGE0LvQvtGC0LjQu9C40LlcclxuICAgICAgICBudW1iZXJPZlNoaXBzOiA2LFxyXG5cclxuICAgICAgICAvLyDQoNCw0LfQvNC10YDRiyDRhNC70L7RgtC40LvQuNC4XHJcbiAgICAgICAgc2hpcFNpemU6IDMsXHJcblxyXG4gICAgICAgIC8vINCj0L3QuNGH0YLQvtC20LXQvdC90YvQtSDRhNC70L7RgtC40LvQuNC4XHJcbiAgICAgICAgZGVzdHJveWVkU2hpcHM6IDAsXHJcblxyXG4gICAgICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0L/QvtC30LjRhtC40Lgg0LrQvtGA0LDQsdC70Y8gKNCy0LXRgNGC0LjQutCw0LvRjNC90L7QuSDQuNC70Lgg0LPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90L7QuSAtINGB0LvRg9GH0LDQudC90YvQvCDQvtCx0YDQsNC30L7QvClcclxuICAgICAgICBnZXQgY3JlYXRlU2hpcFBvc2l0aW9uICgpIHtcclxuICAgICAgICAgICAgbG9jYXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSxcclxuICAgICAgICAgICAgc2hpcFBvc2l0aW9uID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24gPT09IDEpIHsgLy8gaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgcm93TnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5zcGFjZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgY29sTnVtYmVyID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAodGhpcy5zcGFjZVNpemUgLSB0aGlzLnNoaXBTaXplICsgMSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbFxyXG4gICAgICAgICAgICAgICAgcm93TnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMuc3BhY2VTaXplIC0gdGhpcy5zaGlwU2l6ZSArIDEpKTtcclxuICAgICAgICAgICAgICAgIGNvbE51bWJlciA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogdGhpcy5zcGFjZVNpemUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcFNpemU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBvc2l0aW9uLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoaW5pdENoYXJDb2RlICsgcm93TnVtYmVyKSArIGAke2NvbE51bWJlciArIGl9YCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbi5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KGluaXRDaGFyQ29kZSArIHJvd051bWJlciArIGkpICsgYCR7Y29sTnVtYmVyfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2hpcFBvc2l0aW9uO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vINCf0YDQvtCy0LXRgNC60LAsINC/0L7Qu9C90L7RgdGC0YzRjiDQu9C4INC/0L7QtNCx0LjRgtGLINGC0YDQuCDQutC+0YDQsNCx0LvRj1xyXG4gICAgICAgIGNoZWNrRGVzdHJveWVkU2hpcCAoc2hpcCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcFNpemU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwLmRhbWFnZVtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g0J/RgNC+0LLQtdGA0LrQsCwg0L3QtSDQuNC80LXRjtGCINC70Lgg0YHQvtC30LTQsNC90L3Ri9C1INC60L7RgNCw0LHQu9C4INC+0LTQuNC90LDQutC+0LLRi9C1INC/0L7Qt9C40YbQuNC4XHJcbiAgICAgICAgY2hlY2tSZXBlYXRzUG9zaXRpb24gKHNwYWNlc2hpcHMsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZlNoaXBzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5zaGlwU2l6ZTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwYWNlc2hpcHNbaV0ucG9zaXRpb24uaW5kZXhPZihwb3NpdGlvbltqXSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDQk9C10L3QtdGA0LjRgNC+0LLQsNC90LjQtSDQsdGD0LTRg9GJ0LXQs9C+INC60L7RgNCw0LHQu9GPINC4INC10LPQviDQv9C+0LfQuNGG0LjQuCwg0L/RgNC+0LLQtdGA0LrQsCDQvdCwINC90LXQt9Cw0L3Rj9GC0L7RgdGC0Ywg0LTQsNC90L3QvtC5INC/0L7Qt9C40YbQuNC4XHJcbiAgICAgICAgLy8g0Lgg0L/QvtGB0LvQtdC00YPRjtGJ0LXQtSDQtNC+0LHQsNCy0LvQtdC90LjQtSDRjdGC0L7QuSDQv9C+0LfQuNGG0LjQuCDQsiDQvNCw0YHRgdC40LIg0YTQu9C+0YLQuNC70LjQuVxyXG4gICAgICAgIGNyZWF0ZVNwYWNlc2hpcHMgKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZTaGlwczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZXNoaXBzLnB1c2gobmV3IFNwYWNlc2hpcCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZlNoaXBzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuY3JlYXRlU2hpcFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAodGhpcy5jaGVja1JlcGVhdHNQb3NpdGlvbihzcGFjZXNoaXBzLCBwb3NpdGlvbikpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNwYWNlc2hpcHNbaV0ucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zcGFjZXNoaXBzID0gc3BhY2VzaGlwcztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDQktGL0YHRgtGA0LXQuyDQuCDQv9GA0L7QstC10YDQutCwINC90LAg0L/QvtC/0LDQtNCw0L3QuNC1XHJcbiAgICAgICAgc2hvdCAoY29vcmRpbmF0ZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZTaGlwczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZXNoaXAgPSB0aGlzLnNwYWNlc2hpcHNbaV07XHJcbiAgICAgICAgICAgICAgICBkYW1hZ2VkUG9zaXRpb24gPSBzcGFjZXNoaXAucG9zaXRpb24uaW5kZXhPZihjb29yZGluYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGFtYWdlZFBvc2l0aW9uID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZXNoaXAuZGFtYWdlW2RhbWFnZWRQb3NpdGlvbl0gPSBcImxvc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9IHNwYWNlc2hpcC5jb2xvcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tEZXN0cm95ZWRTaGlwKHNwYWNlc2hpcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95ZWRTaGlwcysrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcbiIsImNvbnN0IFZpZXcgPSAoZG9jdW1lbnQgPT4ge1xyXG4gICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3RTb3VuZFwiKTtcclxuICAgIGNvbnN0IGdhbWVBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lQXJlYVwiKTtcclxuICAgIGNvbnN0IGdhbWVSZXN1bHRJbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZVJlc3VsdElubmVyXCIpO1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlck1lc3NhZ2VcIik7XHJcbiAgICBjb25zdCBtZXNzYWdlRm9udFNpemUgPSBnZXRDb21wdXRlZFN0eWxlKG1lc3NhZ2UpLmZvbnRTaXplO1xyXG5cclxuICAgIGxldCBbZ2FtZVJlc3VsdEN1cnJlbnRPcGFjaXR5LCBpbmNyZWFzZU1lc3NhZ2VGb250U2l6ZSwgbWVzc2FnZUN1cnJlbnRGb250U2l6ZSwgc2hpcF0gPSBbXTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0LjQs9GA0L7QstC+0LPQviDQv9C+0LvRj1xyXG4gICAgICAgIGNyZWF0ZUdhbWVBcmVhIChzcGFjZVNpemUpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5pdENoYXJDb2RlID0gXCJBXCIuY29kZVBvaW50QXQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBbZ2FtZUFyZWFCb2R5LCBnYW1lQXJlYUhlYWQsIGhvcml6b250YWxDb29yZGluYXRlXSA9IFtcIlwiLCBcIlwiXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BhY2VTaXplOykge1xyXG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbENvb3JkaW5hdGUgPSBTdHJpbmcuZnJvbUNvZGVQb2ludChpbml0Q2hhckNvZGUgKyBpKTtcclxuICAgICAgICAgICAgICAgIGdhbWVBcmVhSGVhZCArPSBgPHRkIGNsYXNzPVwiZ2FtZS1hcmVhX192ZXJ0aWNhbC1jb29yZGluYXRlXCI+JHsrK2l9PC90ZD5gO1xyXG4gICAgICAgICAgICAgICAgZ2FtZUFyZWFCb2R5ICs9IGA8dHI+PHRkIGNsYXNzPVwiZ2FtZS1hcmVhX19ob3Jpem9udGFsLWNvb3JkaW5hdGVcIj4ke2hvcml6b250YWxDb29yZGluYXRlfTwvdGQ+YDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwYWNlU2l6ZTspIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lQXJlYUJvZHkgKz0gYDx0ZCBjbGFzcz1cImdhbWUtYXJlYS1jZWxsXCIgZGF0YS1jb29yZGluYXRlPVwiJHtob3Jpem9udGFsQ29vcmRpbmF0ZX0keysraX1cIj48L3RkPmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZ2FtZUFyZWFCb2R5ICs9IGA8L3RyPmA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdhbWVBcmVhLmlubmVySFRNTCA9IGA8dGhlYWQ+PHRyPjx0ZD48L3RkPiR7Z2FtZUFyZWFIZWFkfTwvdHI+PC90aGVhZD48dGJvZHk+JHtnYW1lQXJlYUJvZHl9PC90Ym9keT5gO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vINCe0YLQvtCx0YDQsNC20LDQtdC90LjQtSDRgdGH0LXRgtCwINC40LPRgNC+0LrQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuICAgICAgICBkaXNwbGF5R2FtZVJlc3VsdCAoY291bnQpIHtcclxuICAgICAgICAgICAgZ2FtZVJlc3VsdEN1cnJlbnRPcGFjaXR5ID0gZ2FtZVJlc3VsdElubmVyLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBtZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZ2FtZUFyZWEuY2xhc3NOYW1lICs9IFwiIGdhbWUtYXJlYS0tZGlzYWJsZVwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVSZXN1bHRcIikuY2xhc3NOYW1lICs9IFwiIGdhbWUtcmVzdWx0LS12aXNpYmxlXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckNvdW50XCIpLmlubmVySFRNTCA9IGNvdW50O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaW5jcmVhc2VHYW1lUmVzdWx0T3BhY2l0eSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lUmVzdWx0Q3VycmVudE9wYWNpdHkgLyAxMDAgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVJlc3VsdEN1cnJlbnRPcGFjaXR5ICs9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZXN1bHRJbm5lci5zdHlsZS5vcGFjaXR5ID0gZ2FtZVJlc3VsdEN1cnJlbnRPcGFjaXR5IC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGluY3JlYXNlR2FtZVJlc3VsdE9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDAgLyAzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDQntGC0L7QsdGA0LDQttCw0LXQvdC40LUg0YHQvtC+0LHRidC10L3QuNGPINC90LAg0YHRgtGA0LDQvdC40YbQtVxyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlIChtZXNzYWdlVGV4dCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlQ3VycmVudEZvbnRTaXplID0gbWVzc2FnZS5zdHlsZS5mb250U2l6ZSA9IDA7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gbWVzc2FnZVRleHQ7XHJcblxyXG4gICAgICAgICAgICBpbmNyZWFzZU1lc3NhZ2VGb250U2l6ZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlQ3VycmVudEZvbnRTaXplIDwgcGFyc2VJbnQobWVzc2FnZUZvbnRTaXplLCAxMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlQ3VycmVudEZvbnRTaXplKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlck1lc3NhZ2Uuc3R5bGUuZm9udFNpemUgPSBgJHttZXNzYWdlQ3VycmVudEZvbnRTaXplfXB4YDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbmNyZWFzZU1lc3NhZ2VGb250U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vINCf0L7QvNC10YLQutCwINGP0YfQtdC50LrQuCDQuNCz0YDQvtCy0L7Qs9C+INC/0L7Qu9GPINC/0L7RgdC70LUg0LLRi9C/0L7Qu9C10L3QuNC90LjRjyDQv9C+INC90LXQuSDQv9C10YDQstC+0LPQviDQstGL0YHRgtGA0LXQu9CwXHJcbiAgICAgICAgc2V0U2hvb3RlZFN0YXR1cyAoZ2FtZUFyZWFDZWxsKSB7XHJcbiAgICAgICAgICAgIGdhbWVBcmVhQ2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNob3RcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICBnYW1lQXJlYUNlbGwuY2xhc3NOYW1lICs9IFwiIGdhbWUtYXJlYS1jZWxsLS1zaG9vdGVkXCI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g0J7RgtC+0LHRgNCw0LbQsNC10L3QuNC1INC60L7RgNCw0LHQu9GPICjRgdC40L3QvtCz0L4g0LjQu9C4INC60YDQsNGB0L3QvtCz0L4pINCyINC40LPRgNC+0LLQvtC8INC/0L7Qu9C1XHJcbiAgICAgICAgc2hvd1NoaXAgKGNvb3JkaW5hdGUsIGNvbG9yKSB7XHJcbiAgICAgICAgICAgIHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yZGluYXRlPVwiJHtjb29yZGluYXRlfVwiXWApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTaG9vdGVkU3RhdHVzKHNoaXApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbG9yID09PSBcInJlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzaGlwLmNsYXNzTmFtZSArPSBcIiBzaGlwLXJlZFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbG9yID09PSBcImJsdWVcIikge1xyXG4gICAgICAgICAgICAgICAgc2hpcC5jbGFzc05hbWUgKz0gXCIgc2hpcC1ibHVlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDQntGC0L7QsdGA0LDQttCw0LXQvdC40LUg0LDRgdGC0LXRgNC+0LjQtNCwINCyINGB0LvRg9GH0LDQtSDQv9GA0L7QvNCw0YXQsFxyXG4gICAgICAgIHNob3dBc3Rlcm9pZCAoY29vcmRpbmF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBnYW1lQXJlYUNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jb29yZGluYXRlPVwiJHtjb29yZGluYXRlfVwiXWApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTaG9vdGVkU3RhdHVzKGdhbWVBcmVhQ2VsbCk7XHJcbiAgICAgICAgICAgIGdhbWVBcmVhQ2VsbC5jbGFzc05hbWUgKz0gXCIgYXN0ZXJvaWRcIjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDQl9Cy0YPQuiDQstGL0YHRgtGA0LXQu9CwXHJcbiAgICAgICAgc291bmRTaG90ICgpIHtcclxuICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhdWRpby5wbGF5KCksIDIwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKGRvY3VtZW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XHJcbiIsImltcG9ydCBNb2RlbCBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9Db250cm9sbGVyJztcclxuXHJcbmNvbnN0IFNwYWNlUmFuZ2VycyA9IHtcclxuICAgIGluaXQgKCkge1xyXG4gICAgICAgIHRoaXMuY29udHJvbCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRyb2wgKCkge1xyXG4gICAgICAgIE1vZGVsLmNyZWF0ZVNwYWNlc2hpcHMoKTtcclxuICAgICAgICBWaWV3LmNyZWF0ZUdhbWVBcmVhKE1vZGVsLnNwYWNlU2l6ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGV2ZW50cyAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydE5ld1JvdW5kXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKSwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZUFyZWFcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gQ29udHJvbGxlci5zaG90KGUpLCBmYWxzZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5TcGFjZVJhbmdlcnMuaW5pdCgpO1xyXG4iXX0=
