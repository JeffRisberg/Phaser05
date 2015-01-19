'use strict';

function Menu() {
}

Menu.prototype = {
    preload: function () {
    },

    create: function () {
        this.game.input.keyboard.createCursorKeys();
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menu');

        this.game.add.button(580, 200, 'btn-game-start', this.startGame, this, 1, 0, 2);
    },

    update: function () {
    },

    startGame: function () {
        this.game.state.start('play');
    }
};

module.exports = Menu;
