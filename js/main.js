import { Ball } from "./ball.js";
import { Player } from "./player.js";
import { Brick } from "./brick.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
const restart = document.getElementById("restart");
const game_over = document.getElementById("gameover");
const you_won = document.getElementById("winner");

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

canvas.height = 500;
canvas.width = 600;

const ball = new Ball (250, 300, 3, 3, 15, "blue");

const player = new Player(250, 450, 100, 15, 'red');

let bricks = [];

restart.addEventListener("click", ()=>{
    
    game_over.style.display = "none";

    player.x = 250;
    ball.x = 250;
    ball.y = 300;
    ball.vx = 3;
    ball.vy = 3;

    for(let rows = 0; rows < brickColumnCount; rows++){
        for(let columns = 0; columns < brickRowCount; columns++){
            bricks[columns][rows].color = "brown";
        }
    }

})


for(let rows = 0; rows < brickRowCount; rows++){
    let columnsArray = [];
    for(let columns = 0; columns < brickColumnCount; columns++){
        let posX = columns == 0 ? 0 : columnsArray[columns-1].x + columnsArray[columns-1].width;
        let posY = rows == 0 ? 0 : bricks[rows-1][0].y + bricks[rows-1][0].height;
        console.log(posX);
        columnsArray.push(new Brick(posX+brickOffsetLeft, posY + brickOffsetTop, brickWidth, brickHeight, 'brown'));
    }
    bricks.push(columnsArray);
}

animate();

function animate(){
    player.update();
    canvas.width = 600;
    ball.draw(context);
    player.draw(context);

    for(let rows = 0; rows < brickColumnCount; rows++){
        for(let columns = 0; columns < brickRowCount; columns++){
            bricks[columns][rows].draw(context);
        }
    }

    onCollisionWithPlayer();
    onCollisionWithBrick();
    gameOver();
    win();

    requestAnimationFrame(animate);
}

function onCollisionWithPlayer(){
    let collisionLeft = ball.x + ball.vx +10 > player.x;
    let collisionRight = ball.x + ball.vx -10 < player.x + player.width;
    let collisionTop = ball.y + ball.vy + 10 > player.y;
    let collisionBottom = ball.y + ball.vy -10 < player.y + player.height;
    if(collisionTop && collisionBottom && collisionLeft && collisionRight){
        

        let deviation;
        let playerCenter = player.width/2;
        //console.log("pos", ball.x - player.x);
        if(playerCenter > (ball.x - player.x)){
            deviation = -((playerCenter - (ball.x - player.x))*(3)/100);
        }else{
            deviation = (((ball.x - player.x) - playerCenter)*(3)/100);
        }
        
        
        ball.vy = -ball.vy;
        ball.vx = deviation;
        //console.log("hola", ball.vx);
    }
}

function onCollisionWithBrick(){

    for(let rows = 0; rows < brickColumnCount; rows++){
        for(let columns = 0; columns < brickRowCount; columns++){
            let brick = bricks[columns][rows];
            let collisionLeft = ball.x + ball.vx +10 > brick.x;
            let collisionRight = ball.x + ball.vx -10 < brick.x + brick.width;
            let collisionTop = ball.y + ball.vy + 10 > brick.y;
            let collisionBottom = ball.y + ball.vy -10 < brick.y + brick.height;
            if(collisionTop && collisionBottom && collisionLeft && collisionRight && brick.color!="transparent"){
                let deviation;
                let brickCenter = brick.width/2;
                //console.log("pos", ball.x - player.x);
                if(brickCenter > (ball.x - brick.x)){
                    deviation = -((brickCenter - (ball.x - brick.x))*(3)/100);
                }else{
                    deviation = (((ball.x - brick.x) - brickCenter)*(3)/100);
                }
                
                ball.vy = -ball.vy;
                ball.vx = deviation;
                bricks[columns][rows].color = "transparent";
                //console.log("hola", ball.vx);
            }
        }
    }
}

function gameOver(){
    if(ball.y + ball.vy > canvas.height -10){
        game_over.style.display = "block";
        ball.x = 250;
        ball.y = 300;
        ball.vx = 0;
        ball.vy = 0;
        player.x = 250;
    }
}

function win(){
    let winner = true;
    for(let rows = 0; rows < brickColumnCount; rows++){
        for(let columns = 0; columns < brickRowCount; columns++){
            if(bricks[columns][rows].color != "transparent"){
                winner = false;
            }
        }
    }

    if(winner){
        you_won.style.display = "block";
        ball.x = 250;
        ball.y = 300;
        ball.vx = 0;
        ball.vy = 0;
        player.x = 250;
    }else{
        you_won.style.display = "none";
    }
}