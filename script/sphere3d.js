var RADIAN = Math.PI / 180;

function Sphere3D(stage, points, radius, focus) {
	this.stage = document.getElementById(stage).getContext('2d');

	this.config = {
		numPoints:		points,
		numRadius:		radius,
		numFocus:		focus
	};

	this.sphere = {
		points:			[],
		theta:			0
	};

	this.initialize();
};

Sphere3D.prototype.initialize = function() {
	var self = this;
	var t1, t2; // Create theta's
	var xx, yy, zz; // Coordinates..
	var color = {};

	this.stage.canvas.style.display = '';

	for(var i = 0; i < this.config.numPoints; i++) {
		t1 = 360 * Math.random() * RADIAN;
		t2 = (180 * Math.random() - 90) * RADIAN;
		xx = this.config.numRadius * Math.cos(t2) * Math.sin(t1);
		yy = this.config.numRadius * Math.sin(t2);
		zz = this.config.numRadius * Math.cos(t2) * Math.cos(t1);

		//color = {cr: 255};
		color = {cr: 100, cg: 0, cb: 200};
		this.sphere.points[i] = new Point3D(xx, yy, zz, color);
	}

	(function loop() {
		self.draw();
		setTimeout(loop, 1000 / 60); // Quick Timer, TODO: Replace with requestanimframe from gamelib.js
	})();
};

Sphere3D.prototype.draw = function() {
	var c = this.stage,
		w = this.stage.canvas.width,
		h = this.stage.canvas.height,
		p = null, xx, yy, zz, ss,
		cx= w / 2,
		cy= h / 2;

	//console.log(a);

	c.globalCompositeOperation = "source-over";
	c.fillStyle = "#000000";
	c.clearRect(0, 0, w, h);
	c.globalCompositeOperation = "lighter";

	var b = this.stage.getImageData(0, 0, w, h),
		a = b.data;

	for(var i = 0; i < this.config.numPoints; i++) {
		p = this.sphere.points[i];

		xx = p.x * Math.cos(this.sphere.theta * RADIAN) + p.y * Math.sin(this.sphere.theta * RADIAN) * Math.sin(this.sphere.theta * RADIAN) - p.z * Math.sin(this.sphere.theta * RADIAN) * Math.cos(this.sphere.theta * RADIAN);
		yy = p.y * Math.cos(this.sphere.theta * RADIAN) + p.z * Math.sin(this.sphere.theta * RADIAN); // <-- Not sure this is right...
		zz = p.x * Math.sin(this.sphere.theta * RADIAN) - p.y * Math.sin(this.sphere.theta * RADIAN) * Math.cos(this.sphere.theta * RADIAN) + p.z * Math.cos(this.sphere.theta * RADIAN) * Math.cos(this.sphere.theta * RADIAN);

		ss = this.config.numFocus * 1.5 / (this.config.numFocus - zz);
		xx = ((xx * ss) | 0) + cx;
		yy = ((yy * ss) | 0) * (-1) + cy;

		//console.log(ss);
		
		if(xx >= 0 && yy >= 0 && xx < w && yy < h) {
			j = (yy * w + xx) * 4;
			a[j + 0] = p.colors.r;	// Red
			a[j + 1] = p.colors.g;	// Green
			a[j + 2] = p.colors.b;	// Blue
			a[j + 3] = p.colors.a; // Alpha
		}
	}

	c.putImageData(b, 0, 0);
	this.sphere.theta++;


};