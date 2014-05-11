// forked from phi's "template - tmlib.js 0.1.7" http://jsdo.it/phi/m68l
/*
 * tmlib.js 0.2.0
 */

/*
 * contant
 */
var SCREEN_WIDTH    = 640;              // スクリーン幅
var SCREEN_HEIGHT   = 1136;             // スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // スクリーン高さの半分

var BOX_WIDTH = 60;
var BOX_HEIGHT = 50;
var GROUND_HEIGHT = 100;

var FONT_FAMILY = "'Helvetica' 'Meiryo' sans-serif";

/**
 * リソースの読み込み
 */
var static_image = {
    "title_image":"image/PP_penpen500.jpg",
};

// 処理前に必要な処理
tm.preload(function() {

});

/*
 * main
 */
tm.main(function() {
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();
    app.background = "rgba(113, 197, 207, 1.0)";
    app.replaceScene(MainScene());

    app.run();
});

/*
 * main scene
 */

tm.define("MainScene", {
    superClass: "tm.app.Scene",

    dy: 0,
    counter: 0,
    wait: 60,
    lives: true,
    move: false,

    init: function() {
        this.superInit();

        // ペンギン生成
        this.penguin = penguin(SCREEN_CENTER_X*3/5,SCREEN_HEIGHT-GROUND_HEIGHT-BOX_HEIGHT).addChildTo(this);
        this.penguin.renderRoundRectangle();

        // ground
        var footer = tm.display.RectangleShape(SCREEN_WIDTH,GROUND_HEIGHT,{
            fillStyle: "rgba(221,216,148,1.0)",
            strokeStyle: "rgba(0,0,0,0.0)",
            lineWidth: "0"
        }).setPosition(SCREEN_CENTER_X,SCREEN_HEIGHT-GROUND_HEIGHT/2).addChildTo(this);

        // groundbar
        this.groundbar = groundBar(SCREEN_CENTER_X,SCREEN_HEIGHT-GROUND_HEIGHT).addChildTo(this);

        // text
        var label = tm.display.Label("ペンギンダッシュ").setPosition(SCREEN_CENTER_X, 25)
        .setAlign("center").setBaseline("middle").setFillStyle("rgb(50,50,50)")
        .setFontSize(50).setFontFamily(FONT_FAMILY).addChildTo(this);

    },
    update: function(app) {
        if( this.move || this.jump ){
          this.penguin.y += this.dy;
          this.dy += 1;
        }
        // クリックしたらジャンプさせる
        if (app.pointing.getPointingStart() == true) {
          this.penguin.y -= 50;
        }

        // 初期のヘッダー画像に達したら0に戻す
        if(SCREEN_HEIGHT-GROUND_HEIGHT-BOX_HEIGHT <= this.penguin.y){
          this.dy = 0;
        }

    },
    // タッチ開始
    onpointingstart: function(e) {
        if( this.lives ){
          this.move = true;
        }

        if( this.move ){
            if(this.penguin.y>0) this.dy = 2;
        }else{
            //game reset
            if( this.wait < 0 ){
                this.app.replaceScene(MainScene());
            }
        }
    },

});


/*
 * penguin
 */
tm.define("penguin",{
    superClass: "tm.display.RoundRectangleShape",

    live: true,
    counter: 0,

    init: function(x,y){
        this.superInit( BOX_WIDTH, BOX_HEIGHT,{
            fillStyle: "rgba(210,190,39,1.0)",
            strokeStyle: "rgba(0,0,0,1.0)",
            lineWidth: "3"
        });
        this.setPosition(x,y);
        this.counter = 0;
    },
});


/*
 * ground bar
 */
tm.define("groundBar", {
    superClass: "tm.display.RectangleShape",

    posX: 0,
    posY: 0,
    dx: 0,
    move: false,

    init: function(x, y) {
        this.posX = x;
        this.posY = y;

        this.superInit(SCREEN_WIDTH+130,40,{
            fillStyle: "rgba(152,227,83,1.0)",
            strokeStyle: "rgba(0,0,0,1.0)",
            lineWidth: "5"
        });
        this.setPosition(this.posX, this.posY);

        for( var i=0; i<13; i++){
            tm.display.TriangleShape(43,43,{
                fillStyle: "rgba(115,189,50,1.0)",
                strokeStyle: "rgba(0,0,0,0.0)",
                lineWidth: "0"
            }).setPosition((60*i)-SCREEN_CENTER_X, 3).addChildTo(this);
        }
        this.move = true;
    },
    update: function(){
        if( this.move ){
            this.dx -= 5;
            if(this.dx < -60) this.dx = 0;
            this.setPosition(this.posX+this.dx,this.posY);
        }
    },
    stop: function(){ this.move = false; },
    play: function(){ this.move = true; },
    pause: function(){ this.move = !this.move; }
});
