class Ball{
    constructor(x, y, vx, vy, radius, color){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2, true);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        if(this.y + this.vy > 500 || this.y + this.vy < 0){
            this.vy = -this.vy;
        }

        if(this.x + this.vx > 600 || this.x + this.vx < 0){
            this.vx = -this.vx;
        }
    }
}

export {Ball};