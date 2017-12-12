var lightParticles = [];
var numberOfParticles = 800;
var sitemap;
var poleLights = [];
var flowerBedLights = [];
var gr;
var windField;
var lastAngleUpdatedTimer;

// light json file load
var poleLightJSON;

function preload(){
	sitemap = loadImage("./data/images/sitemap.png");
	poleLightJSON = loadJSON("./data/json/pole.json");
	flowerBedsJSON = loadJSON("./data/json/flowerPot.json");
}

function setup() {
	var canvas = createCanvas(1920, 840);	
	// put canvas in 'p5Container'
	canvas.parent('p5Container');
	// print(poleLightJSON.poles.length);

	windField = new WindField(105);
	windField.setAngle(random(180, 360));	
	lastAngleUpdatedTimer = millis();

	// load pole lights json data
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

	// load flowerbed lights json data;
	for(var i=0; i<flowerBedsJSON.flowerBeds.length; i++){
		var tPos = createVector(flowerBedsJSON.flowerBeds[i].x, flowerBedsJSON.flowerBeds[i].y);
		flowerBedLights.push(new Light(
			flowerBedsJSON.flowerBeds[i].ID,
			tPos,
			2,
			0,
			140));
		flowerBedLights[i].setColor(71, 200, 242, 100);
	}

	// generate particles to random position 
	for(var i=0; i<numberOfParticles; i++){
		var tPos = createVector(random(width), random(height));
		lightParticles.push(new LightParticle(tPos, random(0.5, 0.9), random(0.1, 0.2)));
	}
	print(poleLights.length);
	gr = createVector(0, 2);
}

function draw() {
	image(sitemap, 0, 0);

	if (millis() - lastAngleUpdatedTimer > 30 * 1000) {
		windField.setAngle(random(180, 360));
		lastAngleUpdatedTimer = millis();
	}

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

	// draw flowerBed lights
	for(var i=0; i<flowerBedLights.length; i++){
		flowerBedLights[i].draw();
	}

	// animate particles
	for(var i=0; i<lightParticles.length; i++)		{
		lightParticles[i].follow(windField);
		// lightParticles[i].applyForce(gr);
		lightParticles[i].run(false);
		lightParticles[i].draw(false);
	}

	push();
	fill(255);
	text(frameRate(), mouseX, mouseY);
	pop();
}


