(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":15,"./states/gameover":16,"./states/menu":17,"./states/play":18,"./states/preload":19}],2:[function(require,module,exports){
'use strict';
var Bullet = require('../prefabs/bullet');

function BulletGroup(game, parent){
  Phaser.Group.call(this, game, parent);
  // Define constants
  this.SHOT_DELAY = 100; // milliseconds (10 bullets/second)
  this.BULLET_SPEED = 500; // pixels/second
  this.NUMBER_OF_BULLETS = 10;
  //init bullets
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

BulletGroup.prototype.shot = function(x,y){
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    var bullet = this.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    bullet.reset(x, y);

    bullet.body.velocity.x = this.BULLET_SPEED;
    bullet.body.velocity.y = 0;
};

module.exports = BulletGroup;
},{"../prefabs/bullet":6}],3:[function(require,module,exports){
'use strict';

function InputManager(game){
  this.game = game;
  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);
}

InputManager.prototype.leftInputIsActive = function () {
  var isActive = false;

  isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
  isActive |= (this.game.input.activePointer.isDown &&
    this.game.input.activePointer.x < this.game.width / 4);

  return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
InputManager.prototype.rightInputIsActive = function () {
  var isActive = false;

  isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
  isActive |= (this.game.input.activePointer.isDown &&
    this.game.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

  return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
InputManager.prototype.downInputIsActive = function () {
  var isActive = false;

  isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
//  isActive |= (this.game.input.activePointer.isDown &&
//    this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

  return isActive;
};


// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
// http://gamemechanicexplorer.com/#platformer-4

InputManager.prototype.upInputIsActive = function (duration) {
  var isActive = false;
  isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.UP);
//  isActive = this.input.keyboard.justPressed(Phaser.Keyboard.UP,duration);
  isActive |= (this.game.input.activePointer.justPressed(duration + 1000 / 60) &&
    this.game.input.activePointer.x > this.game.width / 4 &&
    this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);
  return isActive;
};

//https://github.com/photonstorm/phaser/issues/81
InputManager.prototype.shotInputIsActive = function (duration) {
  //somewhere during initialization:
  var isActive = false;
  var keyReset = false;
  if (this.game.input.keyboard.justPressed(Phaser.Keyboard.ONE) ) {
    keyReset = true;
    isActive = true;
    console.log("is down 1");
  }

  if (this.game.input.keyboard.justReleased(Phaser.Keyboard.ONE)) {
    keyReset = false;
    isActive = false;
  }
  return isActive;
};

module.exports = InputManager;
},{}],4:[function(require,module,exports){
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
   'stone':Stone
  },
  NUMBER_OF_MONSTERS = 10;
/**
 * This is a manager that managers group of monsters and the spawn;
 * @param game
 * @constructor
 */
function MonsterManager(game) {
  this.game = game;
  this.group = {};
  //monster always spawn from the right of the screen;
  this.resetX = this.game.stage.width;

  this.initOneGroup('bat',this.game.stage.height/2);
  this.initOneGroup('spider',this.game.stage.height);
  this.initOneGroup('skeleton',this.game.stage.height);
  this.initOneGroup('stone',this.game.stage.height);

}

MonsterManager.prototype.initOneGroup = function(key,initY){
  this.group[key] = this.game.add.group();
  for (var i = 0; i < NUMBER_OF_MONSTERS; i++) {
    var Monster = MONSTER_MAP[key];
    var monster = new Monster(this.game, this.resetX, initY);
    this.group[key].add(monster);
    monster.kill();
  }
};
MonsterManager.prototype.addOneMonster = function(key,resetX, resetY){
  console.log(key);

  var monster =  this.group[key].getFirstDead();
  if(!monster) {
    var Monster = MONSTER_MAP[key];
    monster = new Monster(this.game, this.resetX, resetY);
    this.group[key].add(monster);
  }
  console.log(monster);
  monster.revive();
  monster.reset(resetX,resetY);
  monster.checkWorldBounds = true;
  monster.outOfBoundsKill = true;
};

MonsterManager.prototype.autoSpawn = function(){
  this.game.time.events.loop(4000, this.addOneMonster, this,'bat',this.resetX,   this.game.stage.height/2);
  this.game.time.events.loop(3000, this.addOneMonster, this,'spider',  this.resetX,this.game.stage.height/2);
  this.game.time.events.loop(3000, this.addOneMonster, this,'skeleton',  this.resetX,this.game.stage.height-150);
  this.game.time.events.loop(3000, this.addOneMonster, this,'stone',  this.resetX,this.game.stage.height-130);

};


module.exports = MonsterManager;

},{"../prefabs/monsters/bat":9,"../prefabs/monsters/skeleton":10,"../prefabs/monsters/spider":11,"../prefabs/obstacles/stone":12}],5:[function(require,module,exports){
'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);
  // initialize your prefab here
  this.state = 'bird';
  this.scale.setTo(2,2);
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
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {};
Bird.prototype.reset = function() {
  this.body.velocity.y = 0;
  this.body.velocity.x = this.DEFAULT_SPEED_X;
  this.angle = 0;
};

Bird.prototype.up = function() {
  this.body.velocity.y = - this.MOVE_SPEED_Y;
  this.angle =  -this.tweekAngle * this.dir;
};

Bird.prototype.down = function() {
  this.body.velocity.y = + this.MOVE_SPEED_Y;
  this.angle =  this.tweekAngle * this.dir;
};

Bird.prototype.left = function() {
   this.body.velocity.x = - this.MOVE_SPEED_X;
   this.dir = -1;
   this.scale.x = Math.abs(this.scale.x)* this.dir; //flip to the left
   this.angle = 0;
};

Bird.prototype.right = function() {
  this.body.velocity.x = + this.MOVE_SPEED_X;
  this.dir = 1;
  this.scale.x = Math.abs(this.scale.x)* this.dir; //flip to the left
  this.angle = 0;
};

module.exports = Bird;

},{}],6:[function(require,module,exports){
'use strict';

var Bullet = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'fire');
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
};

module.exports = Bullet;

},{}],7:[function(require,module,exports){
'use strict';


var Ground = function (game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground2');
  this.autoScroll(this.game.AUTOSCROLL_SPEED, 0);
  this.game.physics.arcade.enableBody(this);
  // we don't want the ground's body
  // to be affected by gravity
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function () {
  // write your prefab's specific update code here  
};


module.exports = Ground;

},{}],8:[function(require,module,exports){
'use strict';

var Mario = function (game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'mario', frame);
  this.state = 'human';
  this.scale.setTo(2, 2);
  this.game.physics.arcade.enableBody(this);
  this.body.bounce.y = 0.1;
  this.body.gravity.y = 3000;
  this.body.collideWorldBounds = true;
  // add some animations
  this.animations.add('walk', [1, 2, 3, 4], 10, true);  // (key, framesarray, fps,repeat)
  this.animations.add('duck', [11], 0, true);
  this.animations.add('duckwalk', [10, 11, 12], 3, true);
//  this.defaultVelocityX = -30;
  this.MOVE_SPEED_X = 300;
  this.MOVE_SPEED_Y = 1000;
  this.DEFAULT_SPEED_X = -30;
};

Mario.prototype = Object.create(Phaser.Sprite.prototype);
Mario.prototype.constructor = Mario;
Mario.prototype.update = function () {
};
Mario.prototype.reset = function () {
  this.body.velocity.x = this.DEFAULT_SPEED_X;
  this.animations.play('walk');
};

////jump
Mario.prototype.up = function () {
//  console.log('up')
  //only jum when Mario is on the floor
  if (this.body.touching.down) {
    console.log('touching down');
    this.loadTexture('mario', 5);
    this.body.velocity.y = - this. MOVE_SPEED_Y;
  }
};
//
Mario.prototype.down = function () {
  this.animations.play('duckwalk');
};
Mario.prototype.left = function () {
  this.animations.play('walk');
  this.body.velocity.x = - this.MOVE_SPEED_X;
  this.scale.x = Math.abs(this.scale.x) * -1; //flip to the left
};
Mario.prototype.right = function () {
  this.animations.play('walk');
  this.body.velocity.x = + this.MOVE_SPEED_X;
  this.scale.x = Math.abs(this.scale.x); //facing default direction, flip to the right
};

module.exports = Mario;

},{}],9:[function(require,module,exports){
'use strict';

//bat or spider
var Bat = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game,x,y,'bat', frame);
  // initialize your prefab here
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(2,2);
  this.alive = true;
  this.animations.add('default', [4], 10, true);
  this.animations.play('default');
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.DEFAULT_SPEED_X = this.game.AUTOSCROLL_SPEED;
   //http://examples.phaser.io/_site/view_full.html?d=animation&f=starling+atlas.js&t=starling%20atlas
  this.game.add.tween(this).to({ y: this.y -200}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  this.tint = 0x000000;

};

Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.prototype.constructor = Bat;

Bat.prototype.update = function() {
  this.body.velocity.x =  this.DEFAULT_SPEED_X;
};

module.exports = Bat;

},{}],10:[function(require,module,exports){
'use strict';
/**
 *
 * @param game
 * @param x
 * @param y
 * @param frame
 * @constructor
 */
//TODO:gravity not working
var Skeleton = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game,x,game.stage.height -150, 'bat', frame);
  // initialize your prefab here
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(2,2);
  this.alive = true;
  this.animations.add('left', [0, 1, 2, 3], 10, true);
  this.animations.play('left');
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.DEFAULT_SPEED_X = -300;
  this.tint = 0x000000;
};

Skeleton.prototype = Object.create(Phaser.Sprite.prototype);
Skeleton.prototype.constructor = Skeleton;

Skeleton.prototype.update = function() {
  this.body.velocity.x =  this.DEFAULT_SPEED_X;
};

module.exports = Skeleton;

},{}],11:[function(require,module,exports){
'use strict';

var Bat = function(game, x, y,frame) {
  Phaser.Sprite.call(this, game,x,y,'bat', frame);
  // initialize your prefab here
  this.scale.setTo(2,2);
  this.anchor.setTo(0.5, 0.5);
  this.alive = true;
  this.animations.add('default', [4], 10, true);
  this.animations.play('default');
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.DEFAULT_SPEED_X = this.game.AUTOSCROLL_SPEED;
  this.game.add.tween(this.scale).to({ x: 4, y: 4}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  this.tint = 0x000000;

};

Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.prototype.constructor = Bat;

Bat.prototype.update = function() {
  this.body.velocity.x =  this.DEFAULT_SPEED_X;
};

module.exports = Bat;

},{}],12:[function(require,module,exports){
'use strict';

//TODO: gravity does not work
var Stone = function(game, x, y) {
  Phaser.Sprite.call(this, game,x,y,'stone');
  // initialize your prefab here
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.4,0.4);
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.DEFAULT_SPEED_X = this.game.AUTOSCROLL_SPEED;
//  this.tint = 0x000000;

};

Stone.prototype = Object.create(Phaser.Sprite.prototype);
Stone.prototype.constructor = Stone;

Stone.prototype.update = function() {
  this.body.velocity.x =  this.DEFAULT_SPEED_X;
};

module.exports = Stone;

},{}],13:[function(require,module,exports){
'use strict';

//TODO:gravity not working
var Rain = function(game, x, y, frame) {
  Phaser.Particles.Arcade.Emitter.call(this, game, game.world.centerX, 0, 400);
  this.width = game.world.width;
  // emitter.angle = 30; // uncomment to set an angle for the rain.

  this.makeParticles('rain');

  this.minParticleScale = 0.1;
  this.maxParticleScale = 0.5;

  this.setYSpeed(300, 500);
  this.setXSpeed(-5, 5);

  this.minRotation = 0;
  this.maxRotation = 0;

  this.start(false, 1600, 5, 0);
  // initialize your prefab here
//  this.anchor.setTo(0.5, 0.5);
//  this.scale.setTo(2,2);
//  this.alive = true;
//  this.animations.add('left', [0, 1, 2, 3], 10, true);
//  this.animations.play('left');
//  this.game.physics.arcade.enableBody(this);
//  this.body.allowGravity = true;
//  this.DEFAULT_SPEED_X = -300;
//  this.tint = 0x000000;
};

Rain.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
Rain.prototype.constructor = Rain;
//
//Rain.prototype.update = function() {
//  this.body.velocity.x =  this.DEFAULT_SPEED_X;
//};

module.exports = Rain;

},{}],14:[function(require,module,exports){
'use strict';
var Bird = require('../prefabs/bird');
var Mario = require('../prefabs/mario');

var Player = {
  state:['human','bird'],
  init: function(game, state, x, y){
    this.game = game;
    x = x ||100;
    y = y || this.game.world.height - 350;
    if (state =='human') {
      this.player = new Mario(this.game,x,y);
    }else{
      this.player = new Bird(this.game,x,y);
    }
    this.game.add.existing(this.player);
    return this.player;
  },
  switch: function(state){
//    var self = this;
//    if (state =='human'){
//      return  new Mario(self.game, 32, self.game.world.height - 350);
////      return self.player;
//    }
//    return new Bird(this.game, 100, this.game.height / 2);
////    var trans = {
//      "human": function(){
////        self.player.destroy();
//        self.player = new Mario(self.game, 32, self.game.world.height - 350);
//         return self.player;
//
//      },
//      "bird": function(){
////        self.player.destroy();
//        self.player = new Bird(this.game, 100, self.game.height / 2);
//        return self.player;
//      }
//    };
//    return trans[state]();

  }
};

module.exports = Player;
},{"../prefabs/bird":5,"../prefabs/mario":8}],15:[function(require,module,exports){
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function () {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function () {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],16:[function(require,module,exports){
'use strict';
function GameOver() {
}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],17:[function(require,module,exports){
'use strict';
function Menu() {
}

Menu.prototype = {
  preload: function () {

  },
  create: function () {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.startBtn = this.game.add.button(this.game.width / 2, this.game.world.centerY, 'btn-game-start', this.startGame, this, 1, 0, 2);
    // this.startButton = this.game.add.button(this.game.width/2, 300, 'btn-game-start', this.startClick, this);
    this.startBtn.anchor.setTo(0.5, 0.5);

    // this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'btnStart');
    // this.sprite.anchor.setTo(0.5, 0.5);
    // this.startButton =  this.game.add.button(this.world.centerX-100, this.world.centerY, 'button-start', this.startGame, this, 1, 0, 2);
    // var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    // this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    // this.sprite.anchor.setTo(0.5, 0.5);

    // this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    // this.titleText.anchor.setTo(0.5, 0.5);

    // this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    // this.instructionsText.anchor.setTo(0.5, 0.5);

    // this.sprite.angle = -20;
    // this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function () {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  },
  startGame: function () {
    // start button click handler
    // start the 'play' state
    this.game.state.start('play');
  }
};

module.exports = Menu;

},{}],18:[function(require,module,exports){
'use strict';
var Ground = require('../prefabs/ground');
var Player = require('../prefabs/player');
var Rain = require('../prefabs/particles/rain')
var BulletGroup = require('../managers/bulletGroup');
var InputManager = require('../managers/inputManager');
var MonsterManager = require('../managers/monsterManager');
function Play() {
}
Play.prototype = {
  create: function () {
    this.game.AUTOSCROLL_SPEED = -200;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('background').height, 'background');
    this.background.autoScroll(this.game.AUTOSCROLL_SPEED, 0);
    this.ground = new Ground(this.game, 0, this.game.stage.height - 100, this.game.stage.width, 100);
    this.game.add.existing(this.ground);
    //TODO: this seems like affect the FPS, pay attention
//    this.rain = new Rain(this.game);
//    this.game.add.existing(this.rain);
    //game objects
    this.player = Player.init(this.game, 'bird');
    this.bulletGroup = new BulletGroup(this.game);
    this.monsterManager = new MonsterManager(this.game);
    this.monsterManager.autoSpawn();
//    MonsterManager.create();
//    this.monsterGroup = new MonsterGroup(this.game);
//    this.game.time.events.loop(3000, this.monsterManager.addOneMonster);

    //keys
    this.key2 = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.key2.onDown.add(this.heroSwitch, this);

    this.inputManager = new InputManager(this.game);

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
},{"../managers/bulletGroup":2,"../managers/inputManager":3,"../managers/monsterManager":4,"../prefabs/ground":7,"../prefabs/particles/rain":13,"../prefabs/player":14}],19:[function(require,module,exports){
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function () {
    this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    //Load Image
    this.load.spritesheet('btn-game-start', 'assets/btn/btn-game-start.png', 401, 143);
    this.load.image('ground2', 'assets/background/ground2.png');
    this.load.image('background', 'assets/background/background.png');

    this.load.spritesheet('bird', 'assets/character/bird.png', 34, 24, 3);
    this.load.spritesheet('mario', 'assets/character/mariospritesheet-small.png',50,50);
    this.load.image('fire', 'assets/misc/fireball.png',40,30);
    this.load.spritesheet('bat', 'assets/character/dude.png', 32, 48);
    this.load.image('stone', 'assets/misc/stone.png',40,30);
    //particles
    this.game.load.spritesheet('rain', 'assets/particles/rain.png', 17, 17);

  },
  create: function () {
    this.asset.cropEnabled = false;
  },
  update: function () {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function () {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1]);
