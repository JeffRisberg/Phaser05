'use strict';

//TODO: gravity does not work
var Stone = function(game, x, y) {
  Phaser.Sprite.call(this, game,x,y,'stone');
  // initialize your prefab here
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.4,0.4);
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.DEFAULT_SPEED_X = this.game.AUTOSCROLL_SPEED;
//  this.tint = 0x000000;

};

Stone.prototype = Object.create(Phaser.Sprite.prototype);
Stone.prototype.constructor = Stone;

Stone.prototype.update = function() {
  this.body.velocity.x =  this.DEFAULT_SPEED_X;
};

module.exports = Stone;
