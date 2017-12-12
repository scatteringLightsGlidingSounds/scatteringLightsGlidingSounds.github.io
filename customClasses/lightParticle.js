/**************************** LightParticle Class *********************** */
function LightParticle(pos, ms, mf){
    this.maxSpeed = ms;
    this.maxForce = mf;

    this.pos = pos;
	this.acc = createVector(0,0);
	this.vel = createVector(0,0);
    this.r = 3;
	

	// this.LightParticle = function(pos, ms, mf){
	// 	this.pos.set(pos);
	// 	this.maxSpeed = ms;
	// 	this.maxForce = mf;
	// };

	this.run = function(bDebug){
		this.update();
		this.borders();
		this.draw(bDebug);
	};

    this.update = function(bDebug){
        this.vel.add(this.acc);
	    this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }


    this.follow = function(flow){
		var desired = flow.lookup(this.pos);
		desired.mult(this.maxSpeed);
        
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
		
		this.applyForce(steer);
	};

    this.applyForce = function(force){
		this.acc.add(force);
	};

	this.draw = function(bDebug){
		push();
		translate(this.pos.x, this.pos.y);
		fill("#AAAAAA");
		noStroke();
		ellipse(0, 0, 6, 6);
		pop();
		// print("hehe");
	};

	this.borders = function(){
		if(this.pos.x < -this.r)    this.pos.x = width + this.r;
		if(this.pos.x > width + this.r)     this.pos.x = -this.r;
		if(this.pos.y < -this.r){
			this.pos.y = height + this.r;
			this.pos.x = this.pos.x + random(-50, 50);
		}

		if(this.pos.y > height + this.r){
			this.pos.y = -this.r;
			this.pos.x = this.pos.x + random(-50, 50);
		}
	};

	this.setMaxSpeed = function(ms){
		this.maxSpeed = ms;
	};

	this.setMaxForce = function(mf){
		this.maxForce = mf;
	};
}