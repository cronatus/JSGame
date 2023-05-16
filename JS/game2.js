/**
 * Created by Mark on 14/02/2016.
 */



var myGamePiece;
var counter = 0;



function startGame() {
    myGamePiece = new component(30, 30, "img/guardDown/sprGuardCaptainDown0.png", 10, 120, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth - 30;
        this.canvas.height = window.innerHeight - 75;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function move(dir) {


    if (dir == "up") {
        myGamePiece.speedY = -1;
        counter = counter++;

        switch(counter){
            case 0:
                myGamePiece.image.src = "img/guardUp/sprGuardCaptainUp0.png"
                break;
            case 1:
                myGamePiece.image.src = "img/guardUp/sprGuardCaptainUp1.png"
                break;
            case 2:
                myGamePiece.image.src = "img/guardUp/sprGuardCaptainUp2.png"
                break;
            case 3:
                myGamePiece.image.src = "img/guardUp/sprGuardCaptainUp3.png"
                counter = 0;
                break;
        }

    }
    if (dir == "down") {
        myGamePiece.speedY = 1;
        myGamePiece.image.src = "img/guardDown/sprGuardCaptainDown0.png"
    }
    if (dir == "left") {
        myGamePiece.speedX = -1;
        myGamePiece.image.src = "img/guardLeft/sprGuardCaptainLeft0.png"
    }
    if (dir == "right") {
        myGamePiece.speedX = 1;
        myGamePiece.image.src = "img/guardRight/sprGuardCaptainRight0.png"
    }
}

function clearmove() {
    myGamePiece.image.src = "img/guardDown/sprGuardCaptainDown0.png";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

$('#canvas').on("swipeleft", function(){

    myGamePiece.speedX = -1;
    myGameArea.update();
})

$('#canvas').on('vmousedown', function(){

    myGamePiece.x = 200;
    myGamePiece.y = 200;
})