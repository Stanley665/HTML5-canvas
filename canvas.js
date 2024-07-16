var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight

var c = canvas.getContext('2d');
c.fillRect(100, 100, 200, 200);

function Rect(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // this.c = c;

    this.draw = function(){
        c.fillRect(this.x, this.y, this.w, this.h);
        c.fillStyle = "rgb(0, 100, 0)";
    }
}

var rect = new Rect(window.innerWidth/2, window.innerHeight/2, 100, 100);
rect.draw();

function animate(){
    requestAnimationFrame(animate);
}