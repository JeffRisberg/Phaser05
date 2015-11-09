'use strict';
var Ground = require('../prefabs/ground');
var Player = require('../prefabs/player');
var BulletGroup = require('../managers/bulletGroup');
var InputManager = require('../managers/inputManager');
var MonsterManager = require('../managers/monsterManager');

function Play() {
    this.score;
    this.scoreText;
    this.energy;
    this.energyText;
    this.fx;
}

Play.prototype = {
    create: function () {

        this.score = 0;
        this.energy = 25;

        this.game.AUTOSCROLL_SPEED = -200;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('background').height, 'background');
        this.background.autoScroll(this.game.AUTOSCROLL_SPEED, 0);
        this.ground = new Ground(this.game, 0, this.game.stage.height - 100, this.game.stage.width, 100);
        this.game.add.existing(this.ground);

        this.player = Player.init(this.game, 'bird');
        this.bulletGroup = new BulletGroup(this.game);
        this.monsterManager = new MonsterManager(this.game);
        this.monsterManager.autoSpawn();

        this.scoreText = this.game.add.text(20, 20, "Score: " + this.score,
            { font: "35px Arial", fill: "#000" });
        this.energyText = this.game.add.text(this.game.world.width - 205, 20, "Energy: " + this.energy,
            { font: "35px Arial", fill: "#000" });

        this.inputManager = new InputManager(this.game);

        this.fx = this.game.add.audio('sfx');
        this.fx.addMarker('alien death', 1, 1.0);
        this.fx.addMarker('numkey', 9, 0.1);
        this.fx.addMarker('ping', 10, 1.0);
        this.fx.addMarker('shot', 17, 1.0);
    },

    update: function () {
        this.game.physics.arcade.overlap(this.bulletGroup, this.monsterManager.groups["bat"], this.bulletHitBaddie, null, this);
        this.game.physics.arcade.overlap(this.bulletGroup, this.monsterManager.groups["spider"], this.bulletHitBaddie, null, this);
        this.game.physics.arcade.overlap(this.bulletGroup, this.monsterManager.groups["skeleton"], this.bulletHitBaddie, null, this);
        this.game.physics.arcade.overlap(this.bulletGroup, this.monsterManager.groups["stone"], this.bulletHitStone, null, this);

        this.game.physics.arcade.overlap(this.player, this.monsterManager.groups["bat"], this.playerHitBaddie, null, this);
        this.game.physics.arcade.overlap(this.player, this.monsterManager.groups["spider"], this.playerHitBaddie, null, this);
        this.game.physics.arcade.overlap(this.player, this.monsterManager.groups["skeleton"], this.playerHitBaddie, null, this);
        this.game.physics.arcade.overlap(this.player, this.monsterManager.groups["stone"], this.playerHitBaddie, null, this);

        this.game.physics.arcade.collide(this.player, this.ground);

        if (this.inputManager.leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.moveLeft();
        } else if (this.inputManager.rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.moveRight();
        } else {
            this.player.reset();
        }

        if (this.inputManager.upInputIsActive()) {
            // Jump when the player is touching the ground and the up arrow is pressed
            this.player.moveUp();
        } else if (this.inputManager.downInputIsActive()) {
            // Jump when the player is touching the ground and the up arrow is pressed
            this.player.moveDown();
        }

        if (this.inputManager.shootInputIsActive()) {
            var xPlayerCenter = this.player.x + this.player.width;
            var yPlayerCenter = this.player.y + this.player.height/2;
            this.bulletGroup.shoot(xPlayerCenter, yPlayerCenter, this.player.dir);
            this.fx.play("shot");
        }
    },

    bulletHitBaddie: function (bullet, baddie) {
        bullet.kill();
        baddie.kill();
        this.score++;
        this.scoreText.text = 'Score: ' + this.score;
        this.fx.play("numkey");
    },

    bulletHitStone: function (bullet, stone) {
        bullet.kill();
        this.fx.play("ping");
    },

    playerHitBaddie: function (player, baddie) {
        baddie.kill();
        this.energy--;
        this.energyText.text = 'Energy: ' + this.energy;

        if (this.energy < 1) {
            player.alive = false;
            this.game.state.start('gameover');
        }
        this.fx.play("alien death");
    }
};

module.exports = Play;
