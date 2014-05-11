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

/*
 * main
 */
tm.main(function() {
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();

    // シーン切り替え
    app.replaceScene(TitleScene());
    app.run();
});

/**
 * TitleScene
 */
tm.define("TitleScene", {
    superClass : "tm.app.TitleScene",

    init : function() {
        this.superInit({
            title :  "チュートリアル",
            width :  SCREEN_WIDTH,
            height : SCREEN_HEIGHT
        });
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
        this.star = tm.display.StarShape().addChildTo(this);
        var label = tm.display.Label("tmlib.js のテンプレートだよ♪");
        label.setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);
        label.setAlign("center").setBaseline("middle");
        this.addChild(label);
    },
    update: function(app) {
        var p = app.pointing;
        this.star.x = p.x;
        this.star.y = p.y;

        if (p.getPointing()) {
            this.star.rotation += 32;
        }
        // 画面(シーンの描画箇所)をタッチした時の動作
        this.addEventListener("pointingend", function(e) {
            e.app.replaceScene(EndScene());
        });
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

