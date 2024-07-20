var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// var colors = ['#014040',
//     '#02735E',
//     '#03A678',
//     "#F27405",
//     "#731702"
// ];

var colors = ['#04D939',
    '#03A63C',
    '#027333',
    "#025939",
    "#012340"
];

var radius = 10;
var numRectsWidth = 100;
var numRectsHeight = 100;
var w = canvas.width/numRectsWidth;
var h = canvas.height/numRectsHeight;
var mouseD = h*radius

var mouse = {
    x: undefined, 
    y: undefined
};

var prev = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event){
    prev.x = mouse.x;
    prev.y = mouse.y;
    mouse.x = event.x;
    mouse.y = event.y;
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i = 0; i < numRectsWidth; i++){
        for(var j = 0; j < numRectsHeight; j++){
            rectMap[i][j].update();
        }
    }
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Rect(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = colors[Math.floor(Math.random()*(colors.length-2))];
    this.shade = 1;
    this.m = 1;

    this.draw = function(){
        c.fillStyle = this.c;

        c.fillRect(this.x, this.y-((this.m-1)*this.h), this.w, this.h*this.m);
    }

    this.update = function(){
        if(mouseD>Math.sqrt((mouse.x-this.x)*(mouse.x-this.x)+(mouse.y-this.y)*(mouse.y-this.y))){
            this.shade*=-1;
            
            this.draw();
            if(this.shade>0){
                this.c = colors[Math.floor(Math.random()*(colors.length-2))];
            }else{
                this.c = colors[3+Math.floor(Math.random()*(colors.length-3))];
            }
        }else{
            this.draw();
        }
        
    }
}

var rectMap = [];

for(var i = 0; i < numRectsWidth; i++){
    rectMap.push([]);
    for(var j = 0; j < numRectsHeight; j++){
        rectMap[i].push(new Rect(i*w, j*h, w, h));
    }
}

function init(){
    w = canvas.width/numRectsWidth;
    h = canvas.height/numRectsHeight;
    mouseD = w*radius;
    for(var i = 0; i < numRectsWidth; i++){
        rectMap.push([]);
        for(var j = 0; j < numRectsHeight; j++){
            rectMap[i][j].x = i*w
            rectMap[i][j].y = j*h
            rectMap[i][j].w = w
            rectMap[i][j].h = h
            rectMap[i][j].draw();
        }
    }
}

var rectList = [];

function animate(){
    requestAnimationFrame(animate);
    for(var i = 0; i < numRectsWidth; i++){
        for(var j = 0; j < numRectsHeight; j++){
            var rect = rectMap[i][j];
            if(mouseD>Math.sqrt((mouse.x-rect.x)*(mouse.x-rect.x)+(mouse.y-rect.y)*(mouse.y-rect.y))){
                if(rect.m<5) rect.m+=0.2;
                rectList.push(rect);
            }else{
                if(rect.m>1){
                    rect.m-=0.2;
                }
            }
        }
    }
    rectList.sort((a, b) => (mouse.x-a.x)*(mouse.x-a.x)+(mouse.y-a.y)*(mouse.y-a.y)-(mouse.x-b.x)*(mouse.x-b.x)+(mouse.y-b.y)*(mouse.y-b.y));
    for(var i = 0; i < numRectsWidth; i++){
        for(var j = 0; j < numRectsHeight; j++){
            rectMap[i][j].draw();
        }
    }
}

init();
animate();