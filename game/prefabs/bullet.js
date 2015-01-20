'use strict';

var Bullet = function (game, x, y, frame) { // Extends Phaser.Sprite
    Phaser.Sprite.call(this, game, x, y, 'fire');
    this.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
};

module.exports = Bullet;
