CanvasParallax = (function(){

	var C = function(object) {
		this.ctx = object.canvas.context;
		this.object = object;
		this.delta = {x: 0, y: 0};
		var ls = this.object.layers;
		for (var i = 0; i < ls.length; i += 1) {
			this.object.layers[i].parallax = {
				x: object.velocity.x * (ls[i].image.width-object.canvas.width) / (ls[ls.length-1].image.width-object.canvas.width),
				y: object.velocity.y * (ls[i].image.height-object.canvas.height) / (ls[ls.length-1].image.height-object.canvas.height)
			}
		}
	};

	C.prototype={
		start: function(mouse) {
			this.mouseStart = mouse;
		},
		stop: function() {
			this.mouseStart = null;
			var l = this.object.layers;
			for (var i = l.length - 1; i>=0; i -= 1) {
				l[i].offset = {
					x: this.getPosition(l[i]).x,
					y: this.getPosition(l[i]).y
				};
			}
		},
		getDelta: function(mouse) {
			var delta;
			if (this.mouseStart)
				delta = {
					x: mouse.x - this.mouseStart.x,
					y: mouse.y - this.mouseStart.y
				};
			else
				delta = {x: 0, y: 0};
			return delta;
		},
		getPosition: function(layer) {
			var pos ={
				x: layer.offset.x + layer.parallax.x * this.delta.x,
				y: layer.offset.y + layer.parallax.y * this.delta.y
			};
			return pos;
		},
		cutEdges: function(c) {
			if (c.dx < 0) {
				c.Width = c.Width + c.dx;
				c.sx = -c.dx;
				c.dx = 0;
			}
			if (c.dy < 0) {
				c.sy = -c.dy;
				c.Height = c.Height + c.dy;
				c.dy = 0;
			}
			if (c.dx + c.Width > this.object.canvas.width) {
				c.Width = this.object.canvas.width - c.dx;
			}
			if (c.dy + c.Height > this.object.canvas.height) {
				c.Height = this.object.canvas.height - c.dy;
			}
			return c;
		},
		draw: function(mouse,elements) {
			this.delta = this.getDelta(mouse);
			var l = this.object.layers;
			var i = l.length - 1;
			if (l[0].image.width>this.object.canvas.width && this.getPosition(l[i]).x>0)
				this.delta.x = -l[i].offset.x/l[i].parallax.x;
			if (l[0].image.width>this.object.canvas.width && this.getPosition(l[i]).x<this.object.canvas.width-l[i].image.width)
				this.delta.x = (this.object.canvas.width-l[i].image.width-l[i].offset.x)/l[i].parallax.x;
			if (l[0].image.height>this.object.canvas.height && this.getPosition(l[0]).y>0)
				this.delta.y = -l[0].offset.y/l[0].parallax.y;
			if (l[0].image.height>this.object.canvas.height && this.getPosition(l[i]).y<this.object.canvas.height-l[i].image.height)
				this.delta.y = (this.object.canvas.height-l[i].image.height-l[i].offset.y)/l[i].parallax.y;
			for (var i = 0; i < l.length; i += 1) {
				var c = {
					sx: 0,
					sy: 0,
					dx: Math.round(this.getPosition(l[i]).x),
					dy: Math.round(this.getPosition(l[i]).y),
					Width: l[i].image.width,
					Height: l[i].image.height,
				}
				var dx = c.dx;
				var dy = c.dy;
				c = this.cutEdges(c);
				this.ctx.drawImage(l[i].image, c.sx, c.sy, c.Width, c.Height, c.dx, c.dy, c.Width, c.Height);
				if (elements && elements[i]) {
					for (var j = 0; j < elements[i].length; j += 1) {
						var e = elements[i][j];
						this.ctx.drawImage(e.image, 0, 0, e.image.width, e.image.height, dx+e.x, dy+e.y, e.image.width, e.image.height);
					}
				}
			}
		}
		
	};

	return C;

}());