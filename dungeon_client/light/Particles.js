//creating crucial variables
var particles=[], numberOfParticles=3, particleStats=[], pickedParticleType;
 particleStats[0]={x:500, y:500, colour:"orange", size:30, speedOfDecay:2.5, speed:5, minimumSize:10};
//creating the class of particles
class ParticleEffect{
	//giving particles starting numbers
	constructor(particleSpawnPointX, particleSpawnPointY, colour, size, speedOfDecay, speed, minimumSize) {
		this.particleSpawnPointX=particleSpawnPointX;
		this.particleSpawnPointY=particleSpawnPointY;
		this.x=this.particleSpawnPointX;
		this.y=this.particleSpawnPointY;
		this.colour=colour;
		this.size=size;
		this.speedOfDecay=speedOfDecay;
		this.speed=speed;
		this.dx=Math.random()*this.speed;
		this.dy=Math.random()*this.speed;
		this.size=Math.floor(Math.random()*this.size/4)+this.size;
		if(Math.random()>0.5) this.dx=-this.dx;
		if(Math.random()>0.5) this.dy=-this.dy;
		this.minimumSize=minimumSize;
	}
	//changing numbers of particles
	update() {
		this.x+=this.dx;
		this.y+=this.dy;
		if(this.size>0) this.size-=this.speedOfDecay;
	}
	//drawing the god damn shits
	draw() {
		context.fillStyle=this.colour;
		context.fillRect(this.x, this.y, this.size, this.size);
	}
};
//generates particles in a copy paste-able manner
function generateParticles(pickedParticleType) {
	//example on how to generate particles
		for(let m=0; m<numberOfParticles; m++) {
			pickedParticleType=0
			particles.length++
			particles[particles.length-1]=new ParticleEffect(particleStats[pickedParticleType].x, particleStats[pickedParticleType].y, particleStats[pickedParticleType].colour, particleStats[pickedParticleType].size, particleStats[pickedParticleType].speedOfDecay, particleStats[pickedParticleType].speed, particleStats[pickedParticleType].minimumSize)	
		};
		for(let ip=0; ip<particles.length; ip++) {
			if(particles[ip].size<particles[ip].minimumSize) {
				let a1=particles[ip]
				particles[ip]=particles[particles.length-1]
				particles[particles.length]=a1
				particles.pop()
			};
		};
	for(let i=0; i<particles.length; i++) {
		particles[i].update()
	}
};
//an example on how to generate particles
function update() {
	generateParticles(0);
}
////draws the particles so it you dont forget it when you merge the files
function draw() {
	for(let i=0; i<particles.length; i++) {
		particles[i].draw();
	}
};
