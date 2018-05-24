import Model from './Model';
import View from './View';


let Controller, [
        loss,
        target,
        targetCoordinate
    ] = [];

export default Controller = {
    shotsNumber: 0,

    shotResult (coordinate) {
        if (document.querySelector(`[data-coordinate='${coordinate}']`)) {
            loss = Model.shot(coordinate);

            if (loss.status === 3) {
                View.showShip(loss.coordinate, loss.color);
                View.displayMessage('Флотилия из 3-х кораблей уничтожена!');

                if (Model.destroyedShips === Model.numberOfShips) {
                    View.displayMessage('Вы уничтожили все корабли!');
                    View.displayGameResult(Math.round(Model.numberOfShips * Model.shipSize * 1000 / this.shotsNumber));
                }
            } else if (loss.status === 1) {
                View.showShip(loss.coordinate, loss.color);
                View.displayMessage('Попадание');
            } else if (!loss.status && loss.coordinate) {
                View.showAsteroid(loss.coordinate);
                View.displayMessage('Промах');
            }

            this.shotsNumber++;
            View.soundShot();
        }
    },

    shot (e) {
        e = e || window.event;
        target = e.target;
        targetCoordinate = target.getAttribute('data-coordinate');

        if (!target.getAttribute('data-shot') && targetCoordinate) {
            Controller.shotResult(targetCoordinate);
        }
    }
};
