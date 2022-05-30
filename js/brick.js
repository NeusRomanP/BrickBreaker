class Brick{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(context){
        context.beginPath();
        context.rect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        
        context.fillStyle = this.color;
        context.fill();
    }
}

export {Brick};