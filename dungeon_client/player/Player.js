const Sheet = require('/utilities/Sheet.js');
const Gamestate = require('/framework/State.js');
const Weapons = require('/weapons/Weapon.js');
const Utility = require('/utilities/Utility.js');
const Geometry = require('/utilities/Geometry.js');
const Point = Geometry.Point;

module.exports = class Player{
    constructor(position, health, inventory, id){
        this.position = position;
        this.id = id;
        this.inventory = inventory;
        this.delta = 0;
        // TODO wtf who wrote this code 
        // Author : Vladi...
        this.spritesheet = new Sheet('./images/bruh.png', 
                        {rows:4, columns:4, width:408, height:611});

        this.health = health;
        this.maxHealth = health;
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
    }
    update(walls){
        let movx = false , movy = false

        if (Gamestate.isKeyPressed[65]) {
            // All collision detections done before movement to prevent getting stuck 
            if (!Utility.boxWallsColliding(
                new Point((this.position.x - this.size.x / 2) - this.delta, 
                this.position.y - this.size.y / 2), 
            this.size.x, this.size.y, walls)) {
                this.dir = "left"
                this.position.x -= this.delta
                movx = true
                this.delta += 0.1
            }
        } else if (Gamestate.isKeyPressed[68]) {
            if (!Utility.boxWallsColliding(
                new Point((this.position.x - this.size.x / 2) + this.delta,
                this.position.y - this.size.y / 2), 
            this.size.x, this.size.y, walls)) {
                this.dir = "right"
                this.position.x += this.delta
                movx = true
                this.delta += 0.1
            }
        } else {
            movx = false
        }

        if (Gamestate.isKeyPressed[87]) {
            if (!Utility.boxWallsColliding(
                new Point(this.position.x - this.size.x / 2,
                (this.position.y - this.size.y / 2) - this.delta), 
            this.size.x, this.size.y, walls)) {
                this.dir = "up"
                this.position.y -= this.delta
                movy = true
                this.delta += 0.1
            }
        } else if (Gamestate.isKeyPressed[83]) {
            if (!Utility.boxWallsColliding(
                new Point(this.position.x - this.size.x / 2, 
                (this.position.y - this.size.y / 2) + this.delta), 
            this.size.x, this.size.y, walls)) {
                this.dir = "down"
                this.position.y += this.delta
                movy = true
                this.delta += 0.1
            }
        } else {

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

        this.inventory.update();
    }
    draw(){
        //--------------------->>> sprite draw <<<----------------------------------------\\

        switch(this.dir){
            case "up" :                         
                Gamestate.context.drawImage(this.spritesheet.image , this.cursprite*this.spritesheet.w/this.spritesheet.x , this.sprite.up*this.spritesheet.h/this.spritesheet.y , this.spritesheet.w/this.spritesheet.x , this.spritesheet.h/this.spritesheet.y , this.position.x - this.size.x/2 , this.position.y - this.size.x/2, this.size.x , this.size.y)
                break;
            case "down" : 
                // this.curimg = this.sprite.down[this.cursprite]
                Gamestate.context.drawImage(this.spritesheet.image , this.cursprite*this.spritesheet.w/this.spritesheet.x , this.sprite.down*this.spritesheet.h/this.spritesheet.y , this.spritesheet.w/this.spritesheet.x , this.spritesheet.h/this.spritesheet.y , this.position.x - this.size.x/2, this.position.y - this.size.x/2, this.size.x , this.size.y)
                break;
            case "left" : 
                // this.curimg = this.sprite.left[this.cursprite]                        
                Gamestate.context.drawImage(this.spritesheet.image , this.cursprite*this.spritesheet.w/this.spritesheet.x , this.sprite.left*this.spritesheet.h/this.spritesheet.y , this.spritesheet.w/this.spritesheet.x , this.spritesheet.h/this.spritesheet.y , this.position.x - this.size.x/2, this.position.y - this.size.x/2, this.size.x , this.size.y)
                break;
            case "right" : 
                // this.curimg = this.sprite.right[this.cursprite]
                Gamestate.context.drawImage(this.spritesheet.image , this.cursprite*this.spritesheet.w/this.spritesheet.x , this.sprite.right*this.spritesheet.h/this.spritesheet.y , this.spritesheet.w/this.spritesheet.x , this.spritesheet.h/this.spritesheet.y , this.position.x - this.size.x/2, this.position.y - this.size.x/2, this.size.x , this.size.y)
                break;
        }
        Gamestate.context.fillStyle = 'blue';
        Gamestate.context.fillRect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);
        let healthBarSize = this.size.x * this.maxHealth / 50;
        Gamestate.context.fillStyle = 'red';
        Gamestate.context.fillRect(this.position.x - healthBarSize / 2, this.position.y - this.size.y / 2 - this.size.y / 10, healthBarSize, this.size.y / 20);
        Gamestate.context.fillStyle = 'green';
        Gamestate.context.fillRect(this.position.x - healthBarSize / 2, this.position.y - this.size.y / 2 - this.size.y / 10, healthBarSize / this.maxHealth * this.health, this.size.y / 20);
        //--------------------->>> sprite draw <<<----------------------------------------\\

        this.inventory.draw();
    }

    startUsing() {
        this.inventory.startUsing();
    }

    stopUsing() {
        this.inventory.stopUsing();
    }
}
