const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const count = 20;

  const createGrid = () => { //function to create a grid of points
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count-1) ;
        const v = y / (count - 1);
        points.push([ u, v ]);
      }
    }
    return points;  //this is what the function does: when called it will return points
  };

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(([ u, v ]) => {
      const x = u * width;
      const y = v * height;

      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2);
      context.fillStyle = 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
