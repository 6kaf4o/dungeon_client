const Bullets = require('/weapons/Bullets.js');
const Utility = require('/utilities/Utility.js');
const Geometry = require('/utilities/Geometry.js');
const Player = require('/player/Player.js');
const Point = Geometry.Point;
const Size = Geometry.Size;
const Line = Geometry.Line;
const Gamestate = require('/framework/State.js');
const Maze = require('/utilities/Maze.js');
const { context, mousePosition } = require('../framework/State');
class Weapons { // TODO: Abstract class
	constructor(owner, reloadRate,ammo) {
		this.bullets = [];
		this.owner = owner;
		this.cooldown = 0;
		this.reloadRate = reloadRate;
		this.alreadyShot = true;
		this.ammo=ammo;
		this.maxAmmo = ammo;
	}

	startUsing() {
		this.alreadyShot = false;
	}

	stopUsing() {
		this.alreadyShot = true;
	}

	equip(newOwner) { this.owner = newOwner; }
	unequip() { }

	update() {
		for (let i in this.bullets) {
			this.bullets[i].update();
			if (Utility.boxWallsColliding(this.bullets[i].position, 10, 10, Maze.walls)) {
				this.bullets[i] = this.bullets[this.bullets.length - 1];
				this.bullets.pop();
				--i;
			}
		}
		this.cooldown--;
		if(Gamestate.isKeyPressed[32]){
			this.cooldown = 500;
			this.ammo=this.maxAmmo;
		}
		if (this.cooldown > 0) return;
		this.inferiorUpdate();
		
	}

	draw() {
		for (let i of this.bullets) i.draw();
	}

	/**
	 * @param {Point} position 
	 * @param {Size} size 
	 */
	drawImg(position, size) {
		if (this.owner) {
			Gamestate.context.save();
			Gamestate.context.translate(this.owner.position.x, this.owner.position.y);
			Gamestate.context.rotate(Math.atan2(Gamestate.mousePosition.y - this.owner.position.y, Gamestate.mousePosition.x - this.owner.position.x));
			Gamestate.context.drawImage(this.sprite, -size.width / 2.5, -size.height / 2.5, size.width, size.height);
			Gamestate.context.restore();
		} else Gamestate.context.drawImage(this.sprite, position.x, position.y, size.x, size.y);
	}
}

class BasicGun extends Weapons{
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
	constructor(owner,reloadRate,ammo) {
		super(owner, reloadRate,ammo);
		this.sprite = new Image();
		this.sprite.src = '../production/images/pistol.png';

	}

	stopUsing() {}

	inferiorUpdate() {
	//	console.log(this.ammo);
		if(this.ammo>0){
			if(!this.alreadyShot) {
				let shotFrom = this.owner.position;
				let shotTo = Gamestate.mousePosition;
				let dist = Utility.distance(shotFrom, shotTo);
				let deltaX = (shotTo.x - shotFrom.x) / dist * 6;
				let deltaY = (shotTo.y - shotFrom.y) / dist * 6;
				this.bullets.push(new Bullets.BasicBullet(
				new Point(shotFrom.x, shotFrom.y), 
				new Point(deltaX, deltaY), 69));
				this.cooldown = this.reloadRate;
				this.alreadyShot = true;
				this.ammo--;
				console.log(this.ammo);
			}
		}
	}
}


class AK47 extends Weapons{
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
	constructor(owner,reloadRate,ammo) {
		super(owner, reloadRate,ammo);
		this.sprite = new Image();
		this.sprite.src = '../production/images/assaultRifle.png';
	}
	inferiorUpdate() {
	if(Gamestate.isKeyPressed[32]){
		this.cooldown = 600;
		this.ammo=60;
	}
		if(this.ammo>0){
		if(!this.alreadyShot) {
			let shotFrom = this.owner.position;
			let shotTo = Gamestate.mousePosition;
			if (this.alreadyShot == false) {
				let dist = Utility.distance(shotFrom, shotTo);
				let deltaX = (shotTo.x - shotFrom.x) / dist * 6;
				let deltaY = (shotTo.y - shotFrom.y) / dist * 6;
				this.bullets.push(new Bullets.BasicBullet(
					new Point(shotFrom.x, shotFrom.y),
					new Point(deltaX, deltaY), 69));
				this.cooldown = this.reloadRate;
				this.ammo--;
				console.log(this.ammo);
			}
		}
	}
//	console.log(this.ammo);
	} 

	}
class Shotgun extends Weapons{
    //class for basicgun - pistol, which is the first Weapons, that everyone will have when plays;
	constructor(owner,reloadRate,ammo) {
		super(owner, reloadRate,ammo);
		this.sprite = new Image();
		this.sprite.src = '../production/images/shotgun.png';
	}
	inferiorUpdate() { 	
	if(Gamestate.isKeyPressed[32]){
		this.cooldown = 700;
		this.ammo=8;
	}
		if(this.ammo>0){
		if(!this.alreadyShot) {
			let shotFrom = this.owner.position;
			let shotTo = Gamestate.mousePosition;
			let dist = Utility.distance(shotFrom, shotTo);
			let speed = []
			for (let i = 0; i < 7; i++) {
				speed[i] = Math.random() * 3 + 3;
			}
			let deltaX = (shotTo.x - shotFrom.x) / dist * speed[1];
			let deltaY = (shotTo.y - shotFrom.y) / dist * speed[1];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX, deltaY), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[2];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[2];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX + 0.15, deltaY + 0.15), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[3];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[3];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX - 0.15, deltaY - 0.15), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[4];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[4];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX + 0.30, deltaY + 0.30), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[5];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[5];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX - 0.30, deltaY - 0.30), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[6];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[6];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX - 0.45, deltaY - 0.45), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[0];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[0];
			this.bullets.push(new Bullets.BasicBullet(new Point(shotFrom.x, shotFrom.y), new Point(deltaX + 0.45, deltaY + 0.45), 69));
			deltaX = (shotTo.x - shotFrom.x) / dist * speed[0];
			deltaY = (shotTo.y - shotFrom.y) / dist * speed[0];
			this.ammo--;
			console.log(this.ammo);
			this.cooldown = this.reloadRate;
		}	
	}	
	}
}
module.exports = {
	Weapons: Weapons,
	BasicGun: BasicGun,
	AK47: AK47,
	Shotgun: Shotgun
};