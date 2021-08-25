const Bullets = require('/weapons/Bullets.js');
const Utility = require('/utilities/Utility.js');
const Geometry = require('/utilities/Geometry.js');
const Player = require('/player/Player.js');
const Point = Geometry.Point;
const Line = Geometry.Line;

class Weapon { // TODO: Abstract class
	constructor(position) {
		this.position=position;
		this.bullets = [];
	}
		
	shoot(shotFrom, shotTo) {
		let dist = Utility.distance(shotFrom, shotTo);
		let deltaX = (shotTo.x - shotFrom.x) / dist * 10;
		let deltaY = (shotTo.y - shotFrom.y) / dist * 10;
		this.bullets.push(new Bullets.PistolAmmo(shotFrom.x, shotFrom.y, deltaX, deltaY, 69));
	}

	update() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].update();
		}		
	}

	draw() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].draw();
		}
	}
}
class BasicGun extends Weapon{
    //class for basicgun - pistol, which is the first Weapon, that everyone will have when plays;
    constructor(position,abletoshoot,cooldown,mousehold){
        super(position);
        this.bullets=[];
        this.abletoshoot=abletoshoot;
        this.cooldown=cooldown;
		this.mousehold=mousehold;
    }
	shoot(shotFrom, shotTo) {
		if(!this.abletoshoot) {return;}
		this.abletoshoot = false;
		let dist = Utility.distance(shotFrom, shotTo);
		let deltaX = (shotTo.x - shotFrom.x) / dist * 10;
		let deltaY = (shotTo.y - shotFrom.y) / dist * 10;
		this.bullets.push(new Bullets.BasicBullet(shotFrom, new Point(deltaX, deltaY), 69));
	}

	update() {
        ++this.cooldown;
	//	console.log(this.abletoshoot,this.cooldown);
        if(this.cooldown%80==0){
            this.abletoshoot=true;
        }
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].update();
		}
	}
	draw() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].draw();
		}
	}
}
class AK47 extends Weapon{
    //class for basicgun - pistol, which is the first Weapon, that everyone will have when plays;
    constructor(position,abletoshoot,cooldown,mousehold){
        super(position);
        this.bullets=[];
        this.abletoshoot=abletoshoot;
        this.cooldown=cooldown;
		this.mousehold=mousehold;
    }
	shoot(shotFrom, shotTo) {
		if(!this.abletoshoot) {return;}
		this.abletoshoot = false;
		let dist = Utility.distance(shotFrom, shotTo);
		let deltaX = (shotTo.x - shotFrom.x) / dist * 10;
		let deltaY = (shotTo.y - shotFrom.y) / dist * 10;
		this.bullets.push(new Bullets.BasicBullet(shotFrom, new Point(deltaX, deltaY), 69));
	}

	update() {
        ++this.cooldown;
	//	console.log(this.abletoshoot,this.cooldown);
        if(this.cooldown%30==0){
            this.abletoshoot=true;
        }
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].update();
		}
	}
	draw() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].draw();
		}
	}
}
module.exports = {
	Weapon: Weapon,
	BasicGun: BasicGun,
	AK47: AK47
}