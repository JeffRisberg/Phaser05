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
