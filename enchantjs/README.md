enchantjs

===

# tutorial


## ライブラリとかダウンロード
<pre>
$ mkdir -p project_name/js
$ git clone https://github.com/uei/enchant.js-builds.git
$ cd enchant.js-builds
$ cp build/enchant.min.js {{project}}/js
$ cp -r images/ {{project}}

$ vim index.html
</pre>


```
<!doctype html>
<html><head><script src="js/enchant.js"></script></head>
  <body style="margin:0; padding: 0;">
    <script>
    enchant(); // initialize
    var game = new Core(320, 320); // game stage
    game.preload('images/chara1.png'); // preload image
    game.fps = 20;

    game.onload = function(){
        var bear = new Sprite(32, 32);
        bear.image = game.assets['images/chara1.png'];
        game.rootScene.addChild(bear);
        bear.frame = [6, 6, 7, 7];   // select sprite frame

        bear.tl.moveBy(288, 0, 90)   // move right
            .scaleTo(-1, 1, 10)      // turn left
            .moveBy(-288, 0, 90)     // move left
            .scaleTo(1, 1, 10)       // turn right
            .loop();                 // loop it
    };

    game.start(); // start your game!
</script>
</body>
</html>
```

