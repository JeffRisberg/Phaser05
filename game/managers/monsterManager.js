'use strict';
var Bat = require('../prefabs/monsters/bat'),
    Skeleton = require('../prefabs/monsters/skeleton'),
    Spider = require('../prefabs/monsters/spider'),
    Stone = require('../prefabs/obstacles/stone');
//private variables
var MONSTER_MAP = {
        'bat': Bat,
        'skeleton': Skeleton,
        'spider': Spider,
        'stone': Stone
    },
    NUMBER_OF_MONSTERS = 10;

/**
 * This is a manager that manages group of monsters by spawning new ones.
 * @param game
 * @constructor
 */
function MonsterManager(game) {
    this.game = game;
    this.groups = {};

    //monster always spawn from the right of the screen;
    this.resetX = this.game.stage.width;

    this.initOneGroup('bat', this.game.stage.height / 2);
    this.initOneGroup('spider', this.game.stage.height);
    this.initOneGroup('skeleton', this.game.stage.height);
    this.initOneGroup('stone', this.game.stage.height);
}

MonsterManager.prototype.initOneGroup = function (key, initY) {
    this.groups[key] = this.game.add.group();
    for (var i = 0; i < NUMBER_OF_MONSTERS; i++) {
        var Monster = MONSTER_MAP[key];
        var monster = new Monster(this.game, this.resetX, initY);
        this.groups[key].add(monster);
        monster.kill();
    }
};

MonsterManager.prototype.addOneMonster = function (key, resetX, resetY) {
    console.log(key);

    var monster = this.groups[key].getFirstDead();
    if (!monster) {
        var Monster = MONSTER_MAP[key];
        monster = new Monster(this.game, this.resetX, resetY);
        this.groups[key].add(monster);
    }
    console.log(monster);
    monster.revive();
    monster.reset(resetX, resetY);
    monster.checkWorldBounds = true;
    monster.outOfBoundsKill = true;
};

MonsterManager.prototype.autoSpawn = function () {
    this.game.time.events.loop(4000, this.addOneMonster, this, 'bat', this.resetX, this.game.stage.height / 2);
    this.game.time.events.loop(3000, this.addOneMonster, this, 'spider', this.resetX, this.game.stage.height / 2);
    this.game.time.events.loop(3000, this.addOneMonster, this, 'skeleton', this.resetX, this.game.stage.height - 150);
    this.game.time.events.loop(3000, this.addOneMonster, this, 'stone', this.resetX, this.game.stage.height - 130);
};

module.exports = MonsterManager;
