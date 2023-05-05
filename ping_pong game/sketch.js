let p_l;
let p_r;

let score1 = 0;
let score2 = 0;

let ball;

function setup(){
    createCanvas(400,400);
    rectMode(CENTER);
    p_l = new Peddle(10);
    p_r = new Peddle(390);
    ball= new Ball();
}
function keyPressed(){
    if (keyCode ==UP_ARROW){
        p_r.change_dir(-1);
    }
    if (keyCode ==DOWN_ARROW){
        p_r.change_dir(1);
    }


    if (keyCode ==65){
        p_l.change_dir(-2);
    }
    if (keyCode ==90){
        p_l.change_dir(2);
    }
}
function draw(){
    background(220);
    textSize(10);
    text("player 1",30,30);
    text(score1, 35,15)
    text("player 2",350,30);
    text(score2, 355,15)
    p_l.show();
    p_r.show();
    p_l.move();
    p_l.update();
    p_r.move();
    p_r.update();

    ball.show();
    ball.move();
    ball.update();
    if (ball.x >= width ){
        score1 ++;
        ball.reset();
    }
    if (ball.x <= 0){
        score2++
        ball.reset();
    }
    // collision
    if (ball.x>=380 && ball.y <=(p_r.y+50 ) && ball.y >=(p_r.y-50 )){
        ball.vx *= -1;
    }

    if (ball.x<=20 && ball.y <=(p_l.y+50 ) && ball.y >=(p_l.y-50 )){
        ball.vx *= -1;
    }
}