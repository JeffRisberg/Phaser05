'use strict';
var Ground = require('../prefabs/ground');
var Player = require('../prefabs/player');
var Rain = require('../prefabs/particles/rain')
var BulletGroup = require('../managers/bulletGroup');
var InputManager = require('../managers/inputManager');
var MonsterManager = require('../managers/monsterManager');

function Play() {
    this.score = 0;
    this.scoreText;
    this.energy = 25;
    this.energyText;
}

Play.prototype = {
    create: function () {
        var backgroundName = 'background1';

        this.game.AUTOSCROLL_SPEED = -200;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.background = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage(backgroundName).height, backgroundName);
        this.background.autoScroll(this.game.AUTOSCROLL_SPEED, 0);
        this.ground = new Ground(this.game, 0, this.game.stage.height - 100, this.game.stage.width, 100);
        this.game.add.existing(this.ground);

        //game objects
        this.player = Player.init(this.game, 'bird');
        this.bulletGroup = new BulletGroup(this.game);
        this.monsterManager = new MonsterManager(this.game);
        this.monsterManager.autoSpawn();

        //keys
        this.key2 = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.key2.onDown.add(this.heroSwitch, this);

        this.inputManager = new InputManager(this.game);

        this.scoreText = this.game.add.text(20, 20, "Score: " + this.score,
            { font: "35px Arial", fill: "#000" });
        this.energyText = this.game.add.text(this.game.world.width - 320, 20, "Energy: " + this.energy,
            { font: "35px Arial", fill: "#000" });
    },

    heroSwitch: function () {
        var pos = this.player.position;
        var state = this.player.state;

        this.player.destroy();
        if (state == 'human') {
            this.player = Player.init(this.game, 'bird', pos.x, pos.y);
        } else {
            //if the bird flys really slow, it gonna place player below the ground if we don't do minus 100 on y;
            this.player = Player.init(this.game, 'human', pos.x, pos.y - 100);
        }
    },

    update: function () {
        this.game.physics.arcade.collide(this.player, this.ground);

        if (this.inputManager.leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.left();
        } else if (this.inputManager.rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.right();
        } else {
            this.player.reset();
        }
        if (this.inputManager.upInputIsActive()) {
            // Jump when the player is touching the ground and the up arrow is pressed
            this.player.up();
        } else if (this.inputManager.downInputIsActive()) {
            // Jump when the player is touching the ground and the up arrow is pressed
            this.player.down();
        }

        if (this.inputManager.shotInputIsActive()) {
            console.log('shot pressed');
            this.bulletGroup.shot(this.player.x, this.player.y);
        }
    },

    clickListener: function () {
        this.game.state.start('gameover');
    }
};

module.exports = Play;
