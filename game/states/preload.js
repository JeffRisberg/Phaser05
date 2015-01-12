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
    //Load Image
    this.load.spritesheet('btn-game-start', 'assets/btn/btn-game-start.png', 401, 143);
    this.load.image('ground2', 'assets/background/ground2.png');
    this.load.image('background', 'assets/background/background.png');

    this.load.spritesheet('bird', 'assets/character/bird.png', 34, 24, 3);
    this.load.spritesheet('mario', 'assets/character/mariospritesheet-small.png',50,50);
    this.load.image('fire', 'assets/misc/fireball.png',40,30);
    this.load.spritesheet('bat', 'assets/character/dude.png', 32, 48);
    this.load.image('stone', 'assets/misc/stone.png',40,30);
    //particles
    this.game.load.spritesheet('rain', 'assets/particles/rain.png', 17, 17);

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
