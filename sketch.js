var numberOfParticles = 800;
var sitemap;

var lightParticles = [];
var poleLights = [];
var flowerBedLights = [];
var dmxAddressBook = [];
var gr;
var windField;
var oscilMonitor;

var lastAngleUpdatedTimer;

// light json file load
var poleLightJSON;

function preload(){
	sitemap = loadImage("./data/images/sitemap.png");
	poleLightJSON = loadJSON("./data/json/pole.json");
	flowerBedsJSON = loadJSON("./data/json/flowerPot.json");
	dmxAddressJSON = loadJSON("./data/json/dmxAddresses.json");
}

function setup() {
	var canvas = createCanvas(1920, 840);	
	// put canvas in 'p5Container'
	canvas.parent('p5Container');
	// print(poleLightJSON.poles.length);

	windField = new WindField(50);
	oscilMonitor = new OscilMonitor();
	oscilMonitor.setup();
	windField.setAngle(random(180, 360));	
	lastAngleUpdatedTimer = millis();

	oscilMonitor.setFreq(random(20, 300));
	oscilMonitor.setParamA(random(2,4));
	oscilMonitor.setParamB(random(1,5));

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
			1,
			100));
		flowerBedLights[i].setColor(71, 200, 242, 100);
	}

	// load controllable address book
	for(var i=0; i<dmxAddressJSON.root.flowerPot.length; i++){
		var tAddresses = [];
		for(var j=0; j<dmxAddressJSON.root.flowerPot[i].addr.length; j++){
			tAddresses.push(dmxAddressJSON.root.flowerPot[i].addr[j]);
		}
		dmxAddressBook.push(tAddresses);
	}

	// generate particles to random position 
	for(var i=0; i<numberOfParticles; i++){
		var tPos = createVector(random(width), random(height));
		lightParticles.push(new LightParticle(tPos, random(0.3, 0.7), random(0.2, 0.3)));
	}
	print(poleLights.length);
	gr = createVector(0, 2);
}

function draw() {
	image(sitemap, 0, 0);
	windField.update();
	oscilMonitor.updateBuffer();

	if (millis() - lastAngleUpdatedTimer > 30 * 1000) {
		windField.setAngle(random(180, 270));
		print("wind changed!");

		this.oscilMonitor.setFreq(random(20, 100));

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

	for(var i=0; i<this.dmxAddressBook.length; i++){
		for(var j=0; j<this.dmxAddressBook[i].length;j++){
			for(var k=0; k<this.flowerBedLights.length; k++){ 
				if(this.dmxAddressBook[i][j] == this.flowerBedLights[k].ID)	{
					// print(this.flowerBedLights[k]);
					// print(
					// 	this.oscilMonitor.getFlowerBedValue(int(map(k, 0, this.flowerBedLights.length, 1, width)), 0, 1, 0, 255)
					// );
					this.flowerBedLights[k].setAlpha(
						map(this.oscilMonitor.getFlowerBedValue(int(map(k, 0, this.flowerBedLights.length, 1, width))), 0, 1, 0, 140));
				}
			}
		}
	}

	// for(int i=0; i<lightController.flowerPots.size(); i++){
	// 	lightController.onFlowerPotWithAddress(i+1, bDMXIDCheck);
	// 	lightController.flowerPots[i]->setAlpha(ofMap(oscilMonitor.getFlowerBedValue((int)ofMap(i, 0, lightController.flowerPots.size(), 1, 1920)), 0, 1, flowerMinAlpha, flowerMaxAlpha));
	// 	for(int j=0; j<lightController.dmxFlowerPot[i].size(); j++){
	// 		string tID = lightController.dmxFlowerPot[i][j];
	// 		tID.erase(0, 1);
	// 		int k = ofToInt(tID);
	// 		lightController.previewFlowerPots[k]->setAlpha(ofMap(oscilMonitor.getFlowerBedValue((int)ofMap(i, 0, lightController.previewFlowerPots.size(), 1, 1920)), 0, 1, flowerMinAlpha, flowerMaxAlpha));
	// 	}
	// }

	// animate particles
	for(var i=0; i<lightParticles.length; i++)		{
		lightParticles[i].follow(windField);
		// lightParticles[i].applyForce(gr);
		lightParticles[i].run(false);
		lightParticles[i].draw(false);
	}

	

	push();
	fill(255);
	text(windField.windAngle, mouseX, mouseY);
	pop();

	// oscilMonitor.draw(height-80);
}


