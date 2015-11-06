'use strict';

var Bird = function (game, x, y, frame) { // Extends Phaser.Sprite
    Phaser.Sprite.call(this, game, x, y, 'bird', frame);

    this.state = 'bird';
    this.scale.setTo(2, 2);

    // add and play animations
    this.animations.add('flap');
    this.animations.play('flap', 12, true);

    /* super and animations setup here */
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

    //var cursors = this.game.input.keyboard.createCursorKeys();
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

Bird.prototype.up = function () {
    this.body.velocity.y = -this.MOVE_SPEED_Y;
    this.angle = -this.tweekAngle * this.dir;
};

Bird.prototype.down = function () {
    this.body.velocity.y = +this.MOVE_SPEED_Y;
    this.angle = this.tweekAngle * this.dir;
};

Bird.prototype.left = function () {
    this.body.velocity.x = -this.MOVE_SPEED_X;
    this.dir = -1;
    this.scale.x = Math.abs(this.scale.x) * this.dir; //flip to the left
    this.angle = 0;
};

Bird.prototype.right = function () {
    this.body.velocity.x = +this.MOVE_SPEED_X;
    this.dir = 1;
    this.scale.x = Math.abs(this.scale.x) * this.dir; //flip to the right
    this.angle = 0;
};

module.exports = Bird;
