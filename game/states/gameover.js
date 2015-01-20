'use strict';
var Ground = require('../prefabs/ground');

function GameOver() {
}

GameOver.prototype = {
    preload: function () {
    },

    create: function () {
        var styleH1 = { font: '65px Arial', fill: '#000000', align: 'center'};
        var styleH2 = { font: '40px Arial', fill: '#000000', align: 'center'};

        this.background = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('background').height, 'background');
        this.ground = new Ground(this.game, 0, this.game.stage.height - 100, this.game.stage.width, 100);
        this.ground.autoScroll(0, 0);
        this.game.add.existing(this.ground);

        this.titleText = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', styleH1);
        this.titleText.anchor.setTo(0.5, 0.5);

        this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', styleH2);
        this.instructionText.anchor.setTo(0.5, 0.5);
    },

    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('play');
        }
    }
};

module.exports = GameOver;
