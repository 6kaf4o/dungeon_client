const Bullets = require('/weapons/Bullets.js');
const Utility = require('/utilities/Utility.js');

module.exports = class Weapon { // TODO: Abstract class
	constructor() {
		this.bullets = [];
	}
		
	shoot(shotFrom, shotTo) {
		let dist = Utility.distance(shotFrom, shotTo);
		let deltaX = (shotTo.x - shotFrom.x) / dist * 10;
		let deltaY = (shotTo.y - shotFrom.y) / dist * 10;
		this.bullets.push(new Bullets.Fireball(shotFrom.x, shotFrom.y, deltaX, deltaY, 69));
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