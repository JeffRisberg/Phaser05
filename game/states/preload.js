'use strict';

function Preload() {
    this.asset = null;
    this.ready = false;
}

Preload.prototype = {
    preload: function () {
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

        this.load.image('menu', 'assets/background/menu.png');
        this.load.spritesheet('btn-game-start', 'assets/btn/btn-game-start.png', 401, 143);

        this.load.image('ground', 'assets/background/ground.png');
        this.load.image('background', 'assets/background/background.png');

        this.load.spritesheet('bird', 'assets/character/bird.png', 34, 24, 3);
        this.load.image('bat', 'assets/character/bat.png');
        this.load.image('spider', 'assets/character/spider.png');
        this.load.image('skeleton', 'assets/character/skeleton.png');

        this.load.image('stone', 'assets/misc/stone.png', 40, 30);
        this.load.image('fire', 'assets/misc/fireball.png', 40, 30);

        this.load.audio('sfx', 'assets/audio/fx_mixdown.ogg');
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
