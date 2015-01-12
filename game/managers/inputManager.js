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