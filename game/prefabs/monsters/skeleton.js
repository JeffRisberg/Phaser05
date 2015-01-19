'use strict';

var Skeleton = function (game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, game.stage.height - 150, 'skeleton', frame);
    // initialize your prefab here
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(2, 2);
    this.alive = true;
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.play('left');
    this.game.physics.arcade.enableBody(this);

    this.body.allowGravity = true;
    this.DEFAULT_SPEED_X = -300;
    //this.tint = 0x000000;
};

Skeleton.prototype = Object.create(Phaser.Sprite.prototype);
Skeleton.prototype.constructor = Skeleton;

Skeleton.prototype.update = function () {
    this.body.velocity.x = this.DEFAULT_SPEED_X;
};

module.exports = Skeleton;
