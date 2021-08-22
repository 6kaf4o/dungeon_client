
class Point{
    constructor(x,y){
        this.x = x,
        this.y = y;
    }
}
class Player extends Point{
    constructor(x,y,health,keys,sa,id){
        super(x,y)
        this.id = id;
        this.delta = 0;
        this.spritesheet = new Image()
        this.spritesheet.src = "bruh.png"
        this.h = health;
        this.k = keys;
        this.a = sa;
        
        this.sprite = {
            left:[],
            right:[],
            up:[],
            down:[],
            global:4
        }

        this.dir = "up";
        this.cursprite = 0;
        
        for(let i = 0 ; i < this.sprite.global ; i ++){
            this.sprite.left = 2
            this.sprite.up = 1
            this.sprite.down = 0
            this.sprite.right = 3
        }

        this.curimg
        this.size = {
            x:50,
            y:70
        }

        this.colorscheme = {
            r:Math.random()*255,
            g:Math.random()*255,
            b:Math.random()*255,
            rainbow : false
        }

        this.itr = 0;
        this.bullets = 0;
        this.bullet = [];
    }
    logic(){
            //--------------------->>> normal <<<----------------------------------------\\
        let movx = false , movy = false

            if(isKeyPressed[65]){

                this.dir = "left"
                this.x -= this.delta
                movx = true
                this.delta += 0.1
            }else if(isKeyPressed[68]){

                this.dir = "right"
                this.x += this.delta
                movx = true
                this.delta += 0.1
            }else {

                movx = false
            }

            if(isKeyPressed[87]){

                this.dir = "up"
                this.y -= this.delta
                movy = true
                this.delta += 0.1
            }else if(isKeyPressed[83]){

                this.dir = "down"
                this.y += this.delta
                movy = true
                this.delta += 0.1
            }else{

                movy = false
            }

            if((!movx && !movy)|| this.delta > 6){
                if(this.delta > 0){
                    this.delta -= 0.05
                }
                this.delta /= 1.04
            }
            
            if(this.delta > 0.1){
                this.itr++
                if(this.itr%30 == 0){
                    this.cursprite ++;
                }
            }else{
                this.irt = 0;
                this.cursprite = 0;
            }
            
            if(this.cursprite == this.sprite.global){
                this.cursprite = 0;
            }
        //--------------------->>> Sprite management <<<----------------------------------------\\
    }
    draw(){
        //--------------------->>> sprite draw <<<----------------------------------------\\
        
            // console.log(this.curimg , this.dir)
                switch(this.dir){
                    case "up" : 
                        
            context.drawImage(this.spritesheet , this.cursprite*1600/4 , this.sprite.up*2400/4 , 1600/4 , 2400/4 , this.x , this.y, this.size.x , this.size.y)
                        break;
                    case "down" : 
                        // this.curimg = this.sprite.down[this.cursprite]
            context.drawImage(this.spritesheet , this.cursprite*1600/4 , this.sprite.down*2400/4 , 1600/4 , 2400/4 , this.x , this.y, this.size.x , this.size.y)
                        break;
                    case "left" : 
                        // this.curimg = this.sprite.left[this.cursprite]
                        
            context.drawImage(this.spritesheet , this.cursprite*1600/4 , this.sprite.left*2400/4 , 1600/4 , 2400/4 , this.x , this.y, this.size.x , this.size.y)
                        break;
                    case "right" : 
                        // this.curimg = this.sprite.right[this.cursprite]
                        
            context.drawImage(this.spritesheet , this.cursprite*1600/4 , this.sprite.right*2400/4 , 1600/4 , 2400/4 , this.x , this.y, this.size.x , this.size.y)
                        break;
                }

        //--------------------->>> sprite draw <<<----------------------------------------\\


    }
    shoot(){
        let angle = Math.atan2((mouseY-this.y) , (mouseX-this.x))
        this.bullet[this.bullets] = new Magic(this.x+this.size.x/2,this.y+this.size.y/2 , Math.cos(angle)*20 , Math.sin(angle) * 20)
        this.bullets ++ 
    }
}