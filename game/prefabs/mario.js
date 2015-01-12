'use strict';

var Mario = function (game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'mario', frame);
  this.state = 'human';
  this.scale.setTo(2, 2);
  this.game.physics.arcade.enableBody(this);
  this.body.bounce.y = 0.1;
  this.body.gravity.y = 3000;
  this.body.collideWorldBounds = true;
  // add some animations
  this.animations.add('walk', [1, 2, 3, 4], 10, true);  // (key, framesarray, fps,repeat)
  this.animations.add('duck', [11], 0, true);
  this.animations.add('duckwalk', [10, 11, 12], 3, true);
//  this.defaultVelocityX = -30;
  this.MOVE_SPEED_X = 300;
  this.MOVE_SPEED_Y = 1000;
  this.DEFAULT_SPEED_X = -30;
};

Mario.prototype = Object.create(Phaser.Sprite.prototype);
Mario.prototype.constructor = Mario;
Mario.prototype.update = function () {
};
Mario.prototype.reset = function () {
  this.body.velocity.x = this.DEFAULT_SPEED_X;
  this.animations.play('walk');
};

////jump
Mario.prototype.up = function () {
//  console.log('up')
  //only jum when Mario is on the floor
  if (this.body.touching.down) {
    console.log('touching down');
    this.loadTexture('mario', 5);
    this.body.velocity.y = - this. MOVE_SPEED_Y;
  }
};
//
Mario.prototype.down = function () {
  this.animations.play('duckwalk');
};
Mario.prototype.left = function () {
  this.animations.play('walk');
  this.body.velocity.x = - this.MOVE_SPEED_X;
  this.scale.x = Math.abs(this.scale.x) * -1; //flip to the left
};
Mario.prototype.right = function () {
  this.animations.play('walk');
  this.body.velocity.x = + this.MOVE_SPEED_X;
  this.scale.x = Math.abs(this.scale.x); //facing default direction, flip to the right
};

module.exports = Mario;
