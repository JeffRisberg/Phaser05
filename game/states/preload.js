'use strict';

function Preload() {
    this.asset = null;
    this.ready = false;
}

Preload.prototype = {
    preload: function () {
        this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);

        this.load.spritesheet('btn-game-start', 'assets/btn/btn-game-start.png', 401, 143);

        this.load.image('ground', 'assets/background/ground.png');
        this.load.image('background1', 'assets/background/background1.png');
        this.load.image('background2', 'assets/background/background2.png');

        this.load.spritesheet('bird', 'assets/character/bird.png', 34, 24, 3);
        this.load.image('bat', 'assets/character/bat.png');
        this.load.image('spider', 'assets/character/spider.png');
        this.load.image('skeleton', 'assets/character/skeleton.png');

        this.load.image('stone', 'assets/misc/stone.png', 40, 30);
        this.load.image('fire', 'assets/misc/fireball.png', 40, 30);
    },

    create: function () {
        this.asset.cropEnabled = false;
    },

    update: function () {
        if (!!this.ready) {
            this.game.state.start('menu');
        }
    },

    onLoadComplete: function () {
        this.ready = true;
    }
};

module.exports = Preload;
