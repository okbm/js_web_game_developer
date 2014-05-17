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

// 障害物周り
var BLOCK_NUM = 3;
var SPACE_HEIGHT = 50;
var SPACE_WIDTH = 200;
var PIPE_WIDTH = 50;
var PIPE_HEIGHT = 400;
var START_X = SCREEN_WIDTH+PIPE_WIDTH/2;
var BLOCK_HEIGHT_MAX = 80;
var BLOCK_HEIGHT_MIN = 20;
var SCROLL_SPEAD = 5;

// other
var PENGUIN_JUMP = 50;
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

        // 障害物作成
        this.block = new Array(BLOCK_NUM);
        for( var i=0; i<BLOCK_NUM; i++){
          this.block[i] = createBlock().addChildTo(this);
        }

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

          ++this.counter;

          // クリックしたらジャンプさせる
          if (app.pointing.getPointingStart() == true) {
            this.penguin.y -= PENGUIN_JUMP;
          }

          // 初期のヘッダー画像に達したら0に戻す
          if(SCREEN_HEIGHT-GROUND_HEIGHT-BOX_HEIGHT <= this.penguin.y){
            this.dy = 0;
          }

          // 障害物を設置する
          var block_interval = (PIPE_WIDTH+SPACE_WIDTH)/SCROLL_SPEAD;
          for( var i=0; i<BLOCK_NUM; i++ ){
            var st = (this.counter - block_interval*i)%(block_interval*BLOCK_NUM);
            if( st === 0 ){
                var y = SCREEN_HEIGHT - BLOCK_HEIGHT_MIN + (BLOCK_HEIGHT_MAX)*Math.random();
                this.block[i].reset(y).play();
            }
          }
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

/*
 * createBlock
 */
tm.define("createBlock", {
    superClass: "tm.display.RectangleShape",

    posX: START_X,
    posY: SCREEN_CENTER_Y,
    dx: SCROLL_SPEAD,

    move: false,

    init: function(y) {
        this.superInit(PIPE_WIDTH,PIPE_HEIGHT,{
            fillStyle: "rgba(116,191,46,1.0)",
            strokeStyle: "rgba(0,0,0,1.0)",
            lineWidth: "5"
        });
        this.setPosition(this.posX, this.posY);
    },

    update: function(){
        if( this.move && (this.posX > - PIPE_WIDTH/2) ){
            this.posX -= this.dx;
            this.setPosition(this.posX, this.posY);
        }
    },

    reset: function(y){
        this.posX = START_X;
        this.posY = y;

        this.setPosition(this.posX, this.posY);

        return this;
    },

    stop: function(){ this.move = false; },
    play: function(){ this.move = true; },
    pause: function(){ this.move = !this.move; }
});
