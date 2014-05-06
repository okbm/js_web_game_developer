var inventoryObject = (function(){
  var inventory = {};

  // アイテムを着脱できるitemableクラスを設定した要素を集める
  var itemables = document.getElementsByClassName("itemable");
  // 集めた要素（NodeList）をループ処理
  // console.log(itemables.length); //４個
  // itemable.idはplayer_inventoryと1、2、3
  // これによりinventoryには、値に空の配列を持つプロパティとしてplayer_inventoryや1が割り当てられる
  [].forEach.call(itemables, function(itemable) {
    inventory[itemable.id] = [];
  });
  // console.log(inventory["player_inventory"]);
  
  // アイテムであるitemクラスを設定した要素を集める
  var items = document.getElementsByClassName("item");
  // console.log(items.length); // １個
  [].forEach.call(items, function(item) {
    // itemは<img src="bat.png" alt="bat" class="item" id="bat">
    // その親の親の親は<div id="1">など
    var greatGrandpa = item.parentElement.parentElement.parentElement;
    // <div id="1">の場合には、inventory["1"]配列に"bat"が追加される
    inventory[greatGrandpa.id].push(item.id);
  });
  // console.log(inventory["1"]);
  
  // inventorySectionはドラッグ先のid値、newItemは追加する要素のid値
  var add = function(inventorySection, newItem){
    // 画面下部のバットをインベントリーにドラッグする場合には、
    // inventory["player_inventory"]配列にbatが追加される
    inventory[inventorySection].push(newItem);
    // console.log(inventory["player_inventory"]);
    return inventory;
  }
  
  // inventorySectionはドラッグ元のid値、itemToDeleteは削除する要素のid値
  var remove = function(inventorySection, itemToDelete){
    // inventory下の対象配列を調べて、一致したidを削除する
    for (var i = 0; i < inventory[inventorySection].length; i++){
      if (inventory[inventorySection][i] == itemToDelete){
        inventory[inventorySection].splice(i, 1);
      }
    }
    return inventory;
  }
  return {
    get : function(){
            return inventory;
          },
    add : add,
    remove : remove
  }
})();

