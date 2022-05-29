class Controls{
    constructor(){
        this.left = false;
        this.right = false;

        this.#addKeyboardListeners();
    }

    #addKeyboardListeners(){
        document.addEventListener("keydown", (event)=>{
            if(event.key == "ArrowLeft"){
                this.left = true;
            }
            if(event.key == "ArrowRight"){
                this.right = true;
            }
        });

        document.addEventListener("keyup", (event)=>{
            if(event.key == "ArrowLeft"){
                this.left = false;
            }
            if(event.key == "ArrowRight"){
                this.right = false;
            }
        });
    }
}

export {Controls};