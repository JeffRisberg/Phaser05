'use strict';

//TODO:gravity not working
var Rain = function(game, x, y, frame) {
  Phaser.Particles.Arcade.Emitter.call(this, game, game.world.centerX, 0, 400);
  this.width = game.world.width;
  // emitter.angle = 30; // uncomment to set an angle for the rain.

  this.makeParticles('rain');

  this.minParticleScale = 0.1;
  this.maxParticleScale = 0.5;

  this.setYSpeed(300, 500);
  this.setXSpeed(-5, 5);

  this.minRotation = 0;
  this.maxRotation = 0;

  this.start(false, 1600, 5, 0);
  // initialize your prefab here
//  this.anchor.setTo(0.5, 0.5);
//  this.scale.setTo(2,2);
//  this.alive = true;
//  this.animations.add('left', [0, 1, 2, 3], 10, true);
//  this.animations.play('left');
//  this.game.physics.arcade.enableBody(this);
//  this.body.allowGravity = true;
//  this.DEFAULT_SPEED_X = -300;
//  this.tint = 0x000000;
};

Rain.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
Rain.prototype.constructor = Rain;
//
//Rain.prototype.update = function() {
//  this.body.velocity.x =  this.DEFAULT_SPEED_X;
//};

module.exports = Rain;
