'use strict';

var Ground = function (game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
  this.autoScroll(this.game.AUTOSCROLL_SPEED, 0);
  this.game.physics.arcade.enableBody(this);
  // we don't want the ground's body
  // to be affected by gravity
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function () {
  // write your prefab's specific update code here  
};

module.exports = Ground;
