var particles=[];
class Particle{	
	constructor(minX, maxX, minY, maxY, colour, size, speedOfDecay, speed, minimumSize) {
		this.minX=minX;
		this.maxX=maxX;
		this.minY=minY;
		this.maxY=maxY;
		this.x=this.minX+=Math.floor(Math.random()*this.maxX);
		this.y=this.minY+=Math.floor(Math.random()*this.maxY);
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
    static update() {
		for(let i=0; i<particles.length; i++) {
			particles[i].x+=particles[i].dx;
			particles[i].y+=particles[i].dy;
			if(particles[i].size>0) particles[i].size-=particles[i].speedOfDecay;
			if(particles[i].size<particles[i].minimumSize) {
				let a1=particles[i]
				particles[i]=particles[particles.length-1]
				particles[particles.length]=a1
				particles.pop()
			};
		};
	};
	static drawParticles() {
for(let i=0; i<particles.length; i++) {
		context.fillStyle=particles[i].colour;
		context.fillRect(particles[i].x, particles[i].y, particles[i].size, particles[i].size);
		console.log(particles[i].x, particles[i].y, particles[i].size, particles[i].size)
		}
	} 
};
 function generateParticles(numberOfParticles, minx, maxx, miny, maxy, colour, size, speedDecay, speed, minimumSize) {
	for(let i=0; i<numberOfParticles; i++) {
		particles[i]=new Particle(minx, maxx, miny, maxy, colour, size, speedDecay, speed, minimumSize);
	};
};
//examples on how to use the functions
//generateParticles(6, 500, 600, 500, 0, "orange", 30, 2.5, 5, 5);
//Particle.update();
//Particle.drawParticles()
