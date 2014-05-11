// forked from phi's "template - tmlib.js 0.1.7" http://jsdo.it/phi/m68l
/*
 * tmlib.js 0.2.0
 */

/*
 * contant
 */
var SCREEN_WIDTH    = 640;              // スクリーン幅
var SCREEN_HEIGHT   = 1136;              // スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // スクリーン高さの半分

/**
 * リソースの読み込み
 */
var static_image = {
    "title_image":"image/PP_penpen500.jpg",
};

tm.preload(function() {

});

var UI_DATA = {
    LABELS: {
        children: [{
            type: "Label",
            name: "timeLabel",
            x: 100,
            y: 120,
            width: SCREEN_WIDTH,
            fillStyle: "red",
            text: "残り時間",
            fontSize: 20,
            align: "left"
        }]
    }
};

/*
 * main
 */
tm.main(function() {
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();

    /*
    http://jsdo.it/phi/meny
    ↑オリジナルローディング

    var loading = tm.app.LoadingScene({
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        nextScene: TitleScene,
    });
    */

    var loading = tm.ui.LoadingScene({
      assets: static_image,
    });

    loading.onload = function() {
      app.replaceScene(TitleScene());
    };

    // シーン切り替え
    app.replaceScene(loading);
    app.run();
});

/**
 * TitleScene
 */
tm.define("TitleScene", {
    superClass : "tm.app.TitleScene",

    init : function() {
        this.superInit({
            title :  "たいとる",
            width :  SCREEN_WIDTH,
            height : SCREEN_HEIGHT
        });

        var bug = tm.app.Sprite("title_image");
        bug.setPosition(320, 500);
        this.addChild(bug);

        // 画面(シーンの描画箇所)をタッチした時の動作
        this.addEventListener("pointingend", function(e) {
            e.app.replaceScene(MainScene());
        });
    },
});

/*
 * main scene
 */

tm.define("MainScene", {
    superClass: "tm.app.Scene",

    init: function() {
        this.superInit();

        // ラベルの表示（ToDo:時間を動的にしないとだめ)
        this.fromJSON(UI_DATA.LABELS);

        // 画面(シーンの描画箇所)をタッチした時の動作
        this.addEventListener("pointingend", function(e) {
            e.app.replaceScene(EndScene());
        });

    },
    // 右に動かす処理を入れてく感じ
    update: function(app) {

    },
});


/**
 * EndScene
 */
var RESULT_PARAM = {
    score: 256,
    msg:      "【チュートリアル】",
    hashtags: ["テストテスト"],
    url:      "http://okbm.github.io/",
    width:    SCREEN_WIDTH,
    height:   SCREEN_HEIGHT,
    related:  "tmlib.js Tutorial testcording",
};

tm.define("EndScene", {
    // ResultSceneを使って作るとTweet付きのシーンになる
    superClass : "tm.app.ResultScene",

    init : function() {
        this.superInit(RESULT_PARAM);
    },

    // Backボタンを押したらTitleSceneに戻る
    onnextscene: function (e) {
        e.target.app.replaceScene(TitleScene());
    },
});

