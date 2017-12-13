function Light(ID, pos, type, minAlpha, maxAlpha){
    this.isOn = false;
    this.isActivated = false;
    var lastActivatedTimer = millis();

	this.ID = ID;
	this.pos = pos;
	this.type = type;
	this.minAlpha = minAlpha;
	this.maxAlpha = maxAlpha;


    this.getPosition = function(){
        return this.pos;
    };

    this.setColor = function(r, g, b, a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    };

    this.setAlpha = function(a){
        this.a = a;
    };

    this.setMinAlpha = function(minAlpha){
        this.minAlpha = minAlpha;
    };

	this.setMaxAlpha = function(maxAlpha){
        this.maxAlpha = maxAlpha;
    };

    this.update = function(bDebugOn){
        // if(dist(mouseX, mouseY, this.pos.x, this.pos.y ) < 5)	bMouseOn = true;
        // else                                					bMouseOn = false;

		if(this.isOn && this.type == 1){
			if(!this.isActivated){
				this.lastActivatedTimer = millis();
				this.isActivated = true;
			}
		}

		if(this.isActivated && this.type == 1 && !this.bDebugOn){
			if(millis() - this.lastActivatedTimer < 1500){
				this.setAlpha(map(millis() - this.lastActivatedTimer, 0, 1500, this.minAlpha, this.maxAlpha, true));
			} else if (millis() - this.lastActivatedTimer < 3000){
				this.setAlpha(map(millis() - this.lastActivatedTimer, 1501, 3000, this.maxAlpha, this.minAlpha, true));
			} else {
				this.isActivated = false;
				this.isOn = false;
				this.setAlpha(this.minAlpha);
			}
		}

		if(!this.isActivated && this.type == 1 && !this.bDebugOn){
			this.setAlpha(minAlpha);
		}
    };

	this.draw = function(){
		push();
		translate(this.pos.x, this.pos.y);

		if(this.type == 1){		// pole
			push();
			// fill(this.r,this.g,this.b,this.a);
			fill(74, 205, 240, this.a);
			noStroke();
			ellipse(0, 0, 10, 10);
			// print("h");
			pop();
		} else if (this.type == 2){	// previewFlowerPots
			push();
			noFill();
			stroke(71, 200, 242, this.a);

			if(this.isOn)	ellipse(0, 0, 6, 6);
			ellipse(0, 0, 6, 6);
			pop();
		} else if(this.tyupe == 3){
			push();
			if(this.isOn)	fill(r,g,b,a);
			else			fill(0);
			noStroke();
			ellipse(0, 0, 6, 6);

			strokeWidth(1);
			stroke(255);
			ellipse(0, 0, 5, 5);
			pop();
		}
		pop();
	};
}