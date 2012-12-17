# JS-CanvasParallax

Parallax scrolling is a technique that gives the illusion of depth to a 2D application. The library implement a parallax effect in a HTML5 canvas element.

### How to call the library

	var canvasParallax = new CanvasParallax(obj);

### Object passed to the script

The only elements needed are the canvas element (in realtity what is interesting is the context), his dimension and the layers applied to the background. Nota: the images have to be pre-loaded or you have to explicitly define dimensions.
`velocity` is the multiplied factor of the scroll whenever the parallax effect is applied.

	{
		canvas: {
			width: INTEGER,
			height: INTEGER,
			context: 2D-CONTEXT
		},
		layers: [
			{image: IMAGE, offset: {x: INTEGER,y: INTEGER}},
			{image: IMAGE, offset: {x: INTEGER,y: INTEGER}},
			...
		],
		velocity: {x: INTEGER, y: INTEGER}
	}

Order of the layers is important: the first layer is the farthest, the last one is the nearest to the observer. If you want to obtain a parallax effect, a farther layer has to be composed by a smaller image.

### Start the Parallax Effect

To start the movement of the layers you have to use the `start` method. The `x`, `y` coordinates are the relative position of the watcher in the moment he start to move.

	canvasParallax.start({x: INTEGER, y: INTEGER});

### Draw the Parallax Effect
The `x`, `y` coordinates are the relative position of the watcher in the moment of the rendering.

	canvasParallax.draw({x: INTEGER, y: INTEGER});

### Stop the Parallax Effect

Simply:

	canvasParallax.stop();

## Anchor Graphics Elements to Layers

What if you want to add dynamic graphics elements in the canvas and this elements have to be relative to a layer?
In the drawing method you can add an array of element for each layer. Every element is composed by the canvas image you want to add and his `x`, `y` relative position to the choosen layer.
Here the code:

	canvasParallax.draw({x: INTEGER, y: INTEGER}, [
		[
			{x: INTEGER, y: INTEGER, image: IMAGE},
			...
		],
		[],
		...
	]);

See the attached example: an animated sun is added to a parallax backgroud.