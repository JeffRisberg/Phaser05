'use strict';

var Stone = function (game, x, y) { // Extends Phaser.Sprite
    Phaser.Sprite.call(this, game, x, y, 'stone');

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.4, 0.4);
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = true;
    this.DEFAULT_SPEED_X = this.game.AUTOSCROLL_SPEED;
};

Stone.prototype = Object.create(Phaser.Sprite.prototype);
Stone.prototype.constructor = Stone;

Stone.prototype.update = function () {
    this.body.velocity.x = this.DEFAULT_SPEED_X;
};

module.exports = Stone;
