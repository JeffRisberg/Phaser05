'use strict';

var Skeleton = function (game, x, y, frame) { // Extends Phaser.Sprite
    Phaser.Sprite.call(this, game, x, game.stage.height - 150, 'skeleton', frame);

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(2, 2);
    this.alive = true;
    this.animations.add('default');
    this.animations.play('default', true);
    this.game.physics.arcade.enableBody(this);

    this.body.allowGravity = true;
    this.DEFAULT_SPEED_X = -300;
};

Skeleton.prototype = Object.create(Phaser.Sprite.prototype);
Skeleton.prototype.constructor = Skeleton;

Skeleton.prototype.update = function () {
    this.body.velocity.x = this.DEFAULT_SPEED_X;
};

module.exports = Skeleton;
