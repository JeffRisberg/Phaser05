'use strict';

var Bullet = require('../prefabs/bullet');

function BulletGroup(game, parent) { // Extends Phaser.Group
    Phaser.Group.call(this, game, parent);

    this.SHOT_DELAY = 100; // milliseconds (10 bullets/second)
    this.BULLET_SPEED = 500; // pixels/second
    this.NUMBER_OF_BULLETS = 10;

    for (var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
        // Create each bullet and add it to the group.
        var bullet = new Bullet(this.game, 0, 0);
        this.add(bullet);
        // Set its initial state to "dead".
        bullet.kill();
    }
}

BulletGroup.prototype = Object.create(Phaser.Group.prototype);
BulletGroup.prototype.constructor = BulletGroup;

BulletGroup.prototype.shoot = function (x, y, dir) {
    // Enforce a short delay between shots by recording the time that each bullet is shot
    // and testing if the amount of time since the last shot is more than the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    var bullet = this.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet.  This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the specified position.
    bullet.reset(x, y);

    // Give the bullet velocity based on which way we are facing
    bullet.body.velocity.x = dir * this.BULLET_SPEED;
    bullet.body.velocity.y = 0;
};

module.exports = BulletGroup;