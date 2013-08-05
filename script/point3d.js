function Point3D(x, y, z, params) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.params = params;

	this.colors = {
		r: params.cr | ((Math.random() * 200) | 0),
		g: params.cg | ((Math.random() * 200) | 0),
		b: params.cb | ((Math.random() * 200) | 0),
		a: params.ca | 255
	}
};