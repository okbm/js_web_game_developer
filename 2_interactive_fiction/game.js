game.things = (function(){
  var items = {
    bat:{
      name: 'bat',
      effects:{
        'player_inventory': {
          messege:"<p>バットを拾い上げました！</p>",
          object: "addItem",
          subject: "deleteItem"
        },
        'dino':{
          messege:"<p>バットで恐竜をぶったたいた。</p><p>恐竜は怒っています！</p>",
          subject:'deleteItem'
        },
        'empty':{
          messege:"<p>バットを置きました</p>",
          object: "addItem",
          subject: "deleteItem"
        }
      }
    },
    'dino':{
      name:'dino',
      effects:{
        'player_inventory':{
          messege:"<p>恐竜は動かせません</p>"
        }
      }
    }
  };

  var get = function(name){
    console.log('item:' + this.items[name]);
    return this.items[name];
  };

  var dropItemInto = function(itemNode, target){
    var sourceContext = itemNode.parentElement.parentElement.id;;
    if(sourceContext !== target){
      var item = itemNode.firstChild.id;
      var itemObject = this.get(item);

      if(target === 'player_inventory'){
        var effects = itemObject.effects[target];
      } else if(game.slide.getInventory(target)){
        var effects = itemObject.effects[game.slide.getInventory(target)];
      }else{
        var effects = itemObject.effects['empty'];
      }

      var targetObject;

      if(!!effects.object === true){
        if(target==="player_inventory"){
          targetObject = game.player_inventory;
        } else {
          targetObject = game.slide;
        };
        console.log(itemObject);
        targetObject[effects.object](itemObject);
      };
      if(!!effects.subject === true){
        if(sourceContext === "player_inventory"){
          var sourceObject = game.player_inventory;
        } else {
          var sourceObject = game.slide;
        }
        sourceObject[effects.subject](itemObject);
      };

      if(!!effects.messege === true){
        game.slide.setText(effects.messege);
      };

      game.screen.draw();
    };
  };

  return{
      items:items,
      get:get,
      dropItemInto:dropItemInto
  }
})();



