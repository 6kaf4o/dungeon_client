module.exports = class Player {
    constructor(position, health, inventory, id, spritesheet) {
        this.position = position;
        this.id = id;
        this.inventory = inventory;
        this.spritesheet = spritesheet;
        this.h = health;
        this.sprite = { left: 2, right: 3, up: 1, down: 0, global: 4 }
        this.dir;
        this.cursprite = 0;
        this.delta = 0;
        this.size = new Point(50, 70)
        this.iteration = 0;
        this.bullets = 0;
        this.bullet = [];
    }
    update() {
        //--------------------->>> normal <<<----------------------------------------\\
        let moveX = false,
            moveY = false;

        let assignDirection = (direction) => {
            this.dir = direction;
            this.delta += 0.1;

            switch (this.dir) {
                case "up":
                    this.position.y -= this.delta;
                    moveY = true;
                    break;
                case "down":
                    this.position.y += this.delta;
                    moveY = true;
                    break;
                case "left":
                    this.position.x -= this.delta;
                    moveX = true;
                    break;
                case "right":
                    this.position.x += this.delta;
                    moveX = true;
                    break;
            }
        }

        if (isKeyPressed[65]) {
            assignDirection("left");
        } else if (isKeyPressed[68]) {
            assignDirection("right");
        } else moveX = false;

        if (isKeyPressed[87]) {
            assignDirection("up");
        } else if (isKeyPressed[83]) {
            assignDirection("down");
        } else moveY = false;

        let moving = moveX && moveY;

        if (moving || this.delta > 6) {
            if (this.delta > 0) {
                this.delta -= 0.05;
            }
            this.delta /= 1.04;
        }

        //These ifs account for switching sprites
        if (this.delta > 0.1) {
            this.iteration++;
            if (this.iteration % 30 == 0) {
                this.cursprite++;
            }
        } else {
            this.irt = 0;
            this.cursprite = 0;
        }

        if (this.cursprite == this.sprite.global) {
            this.cursprite = 0;
        }
        //--------------------->>> Sprite management <<<----------------------------------------\\
    }
    draw() {
        //--------------------->>> sprite draw <<<----------------------------------------\\

        switch (this.dir) {
            case "up":
                this.spritesheet.draw(new Point(this.cursprite, this.sprite.up), new Point(this.position.x, this.position.y), this.size.x, this.size.y);
                break;
            case "down":
                this.spritesheet.draw(new Point(this.cursprite, this.sprite.up), new Point(this.position.x, this.position.y), this.size.x, this.size.y);
                break;
            case "left":
                this.spritesheet.draw(new Point(this.cursprite, this.sprite.up), new Point(this.position.x, this.position.y), this.size.x, this.size.y);
                break;
            case "right":
                this.spritesheet.draw(new Point(this.cursprite, this.sprite.up), new Point(this.position.x, this.position.y), this.size.x, this.size.y);
                break;
        }

        //--------------------->>> sprite draw <<<----------------------------------------\\


    }
    shoot() {
        let angle = Math.atan2((mouseY - this.position.y), (mouseX - this.position.x));
        this.bullet[this.bullets] = new Magic(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2, Math.cos(angle) * 20, Math.sin(angle) * 20);
        this.bullets++;
    }
}