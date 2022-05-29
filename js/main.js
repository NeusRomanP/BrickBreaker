import { Ball } from "./ball.js";
import { Player } from "./player.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

canvas.height = 500;
canvas.width = 600;

const ball = new Ball (250, 100, 3, 3, 15, "blue");

const player = new Player(250, 450, 100, 15, 'red');

animate();

function animate(){
    player.update();
    canvas.width = 600;
    ball.draw(context);
    player.draw(context);

    onCollisionWithPlayer();

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
            deviation = -((playerCenter -(ball.x - player.x))*(3)/100);
        }else{
            deviation = (((ball.x - player.x)- playerCenter)*(3)/100);
        }
        
        
        ball.vy = -ball.vy;
        ball.vx = deviation;
        //console.log("hola", ball.vx);
    }
}

function gameOver(){
    if(ball.y + ball.vy > canvas.height -10){
        alert("Game Over");
        ball.x = 250;
        ball.y = 100;
        ball.vx = 3;
        ball.vy = 3;
        player.x = 250;
    }
}