'use strict';

window.onload = function () {
    var game = new Phaser.Game("100", "100", Phaser.AUTO, 'Phaser05');

    // Game States
    game.state.add('preload', require('./states/preload'));
    game.state.add('menu', require('./states/menu'));
    game.state.add('play', require('./states/play'));
    game.state.add('gameover', require('./states/gameover'));

    game.state.start('preload');
};