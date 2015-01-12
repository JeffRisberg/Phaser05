'use strict';

var Bat = function(game, x, y,frame) {
  Phaser.Sprite.call(this, game,x,y,'bat', frame);
  // initialize your prefab here
  this.scale.setTo(2,2);
  this.anchor.setTo(0.5, 0.5);
  this.alive = true;
  this.animations.add('default', [4], 10, true);
  this.animations.play('default');
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.DEFAULT_SPEED_X = this.game.AUTOSCROLL_SPEED;
  this.game.add.tween(this.scale).to({ x: 4, y: 4}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  this.tint = 0x000000;

};

Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.prototype.constructor = Bat;

Bat.prototype.update = function() {
  this.body.velocity.x =  this.DEFAULT_SPEED_X;
};

module.exports = Bat;
