function OscilMonitor(){
    this.flowerBedBuffer = [];
    this.targetFlowerBedBuffer = [];
    this.freq1 = [];
    this.freq2 = [];
    this.requency = 20;
    this.targetFrequency = 10;
    this.tParamA = 0.1;
    this.tParamB = 0.2;;
    this.paramA = 0.3;
    this.paramB = 0.5;

    this.setup = function(){
        for(var i=0; i<width; i++){
            this.targetFlowerBedBuffer.push(float(0.0));
            this.flowerBedBuffer.push(float(0.0));
            this.freq1.push(float(0.0));
            this.freq2.push(float(0.0));
        }
        // print(this.targetFlowerBedBuffer);
    };

    this.getFlowerBedValue = function(index){  return this.flowerBedBuffer[index]; }
       
    this.setFreq = function(freq)   {   this.frequency = freq; };
    this.setParamA = function(a)    {   this.tParamA = a; };
    this.setParamB = function(b)    {   this.tParamB = b; };

    this.updateBuffer = function(){
        this.paramA += (this.tParamA - this.paramA) * 0.02;
        this.paramB += (this.tParamB - this.paramB) * 0.01;

        for(var i=0; i<width; i++){
            this.freq1[i] = sin(millis() / map(this.frequency, 10, 200, 150, 1000) / map(this.frequency, 10, 200, 2, 6) + radians(i*100/this.frequency/this.paramA))/2 + 0.5;
            this.freq2[i] = sin(millis()/map(this.frequency, 10, 20, 10, 1000, true) + radians(i*100/this.frequency/this.paramB))/2+0.5;

            this.targetFlowerBedBuffer[i] = (this.freq1[i] + this.freq2[i]) / 2;

            this.flowerBedBuffer[i] += (this.targetFlowerBedBuffer[i] - this.flowerBedBuffer[i]) * 0.2;
        }
    };

    this.draw = function(y){
        push();
        translate(0, y);

        fill('#FFFFFF');
        // print("draw");
        text("hello");

        stroke(255, 50);
        noFill();
        beginShape(LINES);
        strokeWeight(2);
        for(var i=0; i<width; i++)  vertex(i, map(this.freq1[i], 0, 1, 20, 0, true));
        endShape();

        beginShape(LINES);
        for(var i=0; i<width; i++)  vertex(i, map(this.freq2[i], 0, 1, 20, 0, true));
        endShape();

        stroke('#00FFFF');
        strokeWeight(3);
        beginShape(LINES);
        for(var i=0; i<width; i++)  vertex(i, map(this.flowerBedBuffer[i], 0, 1, 20, 0, true));
        endShape();

        pop();
    };
}