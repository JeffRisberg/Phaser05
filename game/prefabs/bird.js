'use strict';

var Bird = function (game, x, y, frame) { // Extends Phaser.Sprite
    Phaser.Sprite.call(this, game, x, y, 'bird', frame);

    this.state = 'bird';
    this.scale.setTo(2, 2);

    // Add and play animations
    this.animations.add('flap');
    this.animations.play('flap', 12, true);

    // Super and animations setup here
    this.game.physics.arcade.enableBody(this);
    this.checkWorldBounds = true;
    this.body.collideWorldBounds = true;
    this.body.checkCollision.left = false;
    this.outOfBoundsKill = true;
    this.body.allowGravity = true;
    this.tweekAngle = 20;
    this.dir = 1;
    this.DEFAULT_SPEED_X = -30;
    this.MOVE_SPEED_X = 500;
    this.MOVE_SPEED_Y = 800;
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function () {
};

Bird.prototype.reset = function () {
    this.body.velocity.y = 0;
    this.body.velocity.x = this.DEFAULT_SPEED_X;
    this.angle = 0;
};

Bird.prototype.moveUp = function () {
    this.body.velocity.y = -this.MOVE_SPEED_Y;
    this.angle = -this.tweekAngle * this.dir;
};

Bird.prototype.moveDown = function () {
    this.body.velocity.y = +this.MOVE_SPEED_Y;
    this.angle = this.tweekAngle * this.dir;
};

Bird.prototype.moveLeft = function () {
    this.body.velocity.x = -this.MOVE_SPEED_X;
    this.dir = -1;
    this.scale.x = Math.abs(this.scale.x) * this.dir; //flip to the left
    this.angle = 0;
};

Bird.prototype.moveRight = function () {
    this.body.velocity.x = +this.MOVE_SPEED_X;
    this.dir = 1;
    this.scale.x = Math.abs(this.scale.x) * this.dir; //flip to the right
    this.angle = 0;
};

module.exports = Bird;
