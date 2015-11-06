'use strict';

var Bird = require('../prefabs/bird');

var Player = {
    state: ['bird'],
    init: function (game, state, y) {
        this.game = game;
        var x = 100;
        y = y || this.game.world.height - 350;

        this.player = new Bird(this.game, x, y);
        this.game.add.existing(this.player);

        return this.player;
    }
};

module.exports = Player;