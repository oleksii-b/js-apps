import Model from './Model';
import View from './View';
import Controller from './Controller';

const SpaceRangers = {
    init () {
        this.control();
        this.events();
    },

    control () {
        Model.createSpaceships();
        View.createGameArea(Model.spaceSize);
    },

    events () {
        document.getElementById("startNewRound").addEventListener("click", () => location.reload(), false);
        document.getElementById("gameArea").addEventListener("click", e => Controller.shot(e), false);
    }
};

SpaceRangers.init();
