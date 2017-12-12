var lightParticles = [];
var numberOfParticles = 1500;
var sitemap;
var poleLights = [];

var gr;

// light json file load
var poleLightJSON;

function preload(){
	sitemap = loadImage("./data/images/sitemap.png");
	poleLightJSON = loadJSON("./data/json/pole.json");
}

function setup() {
	var canvas = createCanvas(1920, 840);	
	// put canvas in 'p5Container'
	canvas.parent('p5Container');
	print(poleLightJSON.poles.length);
	
	for(var i=0; i<poleLightJSON.poles.length; i++){
		var tPos = createVector(poleLightJSON.poles[i].x, poleLightJSON.poles[i].y);
		poleLights.push(new Light(
			poleLightJSON.poles[i].ID, 
			tPos,
			1,
			1,
			255));
		poleLights[i].setColor(74, 205, 240, 100);
	}

	// generate particles to random position 
	for(var i=0; i<numberOfParticles; i++){
		var tPos = createVector(random(width), random(height));
		lightParticles.push(new LightParticle(tPos, 3, 2));
	}
	print(poleLights.length);
	gr = createVector(0, 2);
}

function draw() {
	image(sitemap, 0, 0);

	// checking particle touching poles
	for(var i=0; i<poleLights.length; i++){
		for(var j=0; j<lightParticles.length; j++){
			if(dist(poleLights[i].pos.x, poleLights[i].pos.y, lightParticles[j].pos.x, lightParticles[j].pos.y) < 10){
				poleLights[i].isOn = true;
			} 
		}
		
		// test with mouse
		// if(dist(mouseX, mouseY, poleLights[i].pos.x, poleLights[i].pos.y)< 15){
		// 	poleLights[i].isOn = true;
		// }

		// pole light glowing
		poleLights[i].update(false);
		poleLights[i].draw();
	}


	for(var i=0; i<lightParticles.length; i++)		{
		lightParticles[i].applyForce(gr);
		lightParticles[i].run(false);
		lightParticles[i].draw(false);
	}

// 	for(var i=0; i<poleLights.length; i++)			{
// 		poleLights[i].update();
// 		poleLights[i].draw();
// 	}
}


