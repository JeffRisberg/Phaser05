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