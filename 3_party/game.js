atom.input.bind(atom.key.LEFT_ARROW,'left');
game = Object.create(Game.prototype);
game.update = function(dt){
  if(atom.input.pressed('left')){
    return console.log("プレイヤーは左への移動を開始");
  } else if(atom.input.down('left')){
    return console.log("プレイヤーはまだ左への移動中");
  }
};

game.draw = function(){
  atom.context.fillStyle = 'black';
  return atom.context.fillRect(0,0,atom.width,atom.height);
};

window.onblur = function(){
  return game.stop();
};

window.onfocus = function(){
  return game.run();
};
game.run();

