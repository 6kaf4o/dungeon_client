const Bullets = require('/weapons/Bullets.js');
const Utility = require('/utilities/Utility.js');
const Geometry = require('/utilities/Geometry.js');
const Player = require('/player/Player.js');
const Point = Geometry.Point;
const Line = Geometry.Line;
const Gamestate = require('/framework/State.js');

class Weapons { // TODO: Abstract class
	constructor(owner, reloadRate) {
		this.bullets = [];
		this.owner = owner;
		this.cooldown = 0;
		this.reloadRate = reloadRate;
		this.alreadyShot = true;
	}
		
	startUsing() {}
	stopUsing() {}

	equip(newOwner) {this.owner = owner;}
	unequip() {}

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

class BasicGun extends Weapons{
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
	constructor(owner,reloadRate) {
		super(owner, reloadRate);
		this.sprite = new Image();
		this.sprite.src = '../production/images/pistol.png';

	}

	startUsing() {
		this.alreadyShot = false;
	}
	stopUsing() {}

	update() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].update();
		}	
		this.cooldown--;

		if(this.cooldown > 0) {return;}

		if(!this.alreadyShot) {
			let shotFrom = this.owner.position;
			let shotTo = Gamestate.mousePosition;
			let dist = Utility.distance(shotFrom, shotTo);
			let deltaX = (shotTo.x - shotFrom.x) / dist * 5;
			let deltaY = (shotTo.y - shotFrom.y) / dist * 5;
			this.bullets.push(new Bullets.BasicBullet(
			new Point(shotFrom.x, shotFrom.y), 
			new Point(deltaX, deltaY), 69));
			this.cooldown = this.reloadRate;
			this.alreadyShot = true;
		}
	}

	draw() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].draw();
		}
	}
}


class AK47 extends Weapons{
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
	constructor(owner,reloadRate) {
		super(owner, reloadRate);
	}

	startUsing() {
		this.alreadyShot = false;
	}
	stopUsing() {
		this.alreadyShot=true; 
	}
	update() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].update();
		}	

		this.cooldown --;
		if(this.cooldown > 0) {return;}

		if(!this.alreadyShot) {
			let shotFrom = this.owner.position;
			let shotTo = Gamestate.mousePosition;
			if(this.alreadyShot==false){
				let dist = Utility.distance(shotFrom, shotTo);
				let deltaX = (shotTo.x - shotFrom.x) / dist * 5;
				let deltaY = (shotTo.y - shotFrom.y) / dist * 5;
				this.bullets.push(new Bullets.BasicBullet(
				new Point(shotFrom.x, shotFrom.y), 
				new Point(deltaX, deltaY), 69));
				this.cooldown = this.reloadRate;
			}
		}
	
	} 

	draw() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].draw();
		}
	}
}
class Shotgun extends Weapons{
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
	constructor(owner,reloadRate) {
		super(owner, reloadRate);
	}

	startUsing() {
		this.alreadyShot = false;
	}
	stopUsing() {
		this.alreadyShot=true; 
	}
	update() { 	
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].update();
		}

		this.cooldown--;	

		if(this.cooldown > 0) {return;}

		if(!this.alreadyShot) {
			let shotFrom = this.owner.position;
			let shotTo = Gamestate.mousePosition;			
			let dist = Utility.distance(shotFrom, shotTo);
			let speed = []
			for(let i = 0; i < 7; i++){
				speed[i] = Math.random()*3+3;
			}
			let deltaX = (shotTo.x - shotFrom.x) / dist * speed[1];
			let deltaY = (shotTo.y - shotFrom.y) / dist * speed[1];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX, deltaY), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[2];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[2];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX+0.15, deltaY+0.15), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[3];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[3];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX-0.15, deltaY-0.15), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[4];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[4];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX+0.30, deltaY+0.30), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[5];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[5];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX-0.30, deltaY-0.30), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[6];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[6];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX-0.45, deltaY-0.45), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[0];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[0];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX+0.45, deltaY+0.45), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[0];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[0];

			this.cooldown = this.reloadRate;
		}		
	}

	draw() {
		for(let i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].draw();
		}
	}
}
module.exports = {
	Weapons: Weapons,
	BasicGun: BasicGun,
	AK47: AK47,
	Shotgun: Shotgun
};