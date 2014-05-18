enchant(); // initialize
var game = new Game(320, 320); // game stage
game.preload('images/chara1.png'); // preload image
game.fps = 20;

game.score = 0;

game.onload = function(){

    // 背景周り
    bg = new Sprite(640, 320);
    bg.backgroundColor = "skyblue"; //"#4abafa"

    game.rootScene.addChild(bg);

    bg.addEventListener('enterframe', function() {
        // バックグラウンド左方向にスクロールする
        this.x -= 2;
        if (this.x < -320) this.x = 0;
    });


    var bear = new Sprite(32, 32);
    bear.x = 100;
    bear.y = 200;
    bear.image = game.assets['images/chara1.png'];
    bear.frame = [6, 6, 7, 7];   // select sprite frame
    game.rootScene.addChild(bear);

    var sprite = new Sprite(32, 32);
    var surface = new Surface(32, 32);
    var c = surface.context;
    c.fillStyle = "rgb(255, 0, 0)";
    c.beginPath();
    c.arc(16, 16, 16, 0, Math.PI*2, true);  // 円を描画
    c.fill();
    sprite.image = surface; // Surface を画像として登録
    game.rootScene.addChild(sprite);

};

game.start(); // start your game!
