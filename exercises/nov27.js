const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () =>{
    const count = 5;
    const points = [];

    for(let x = 0; x < count; x++){
      for(let y = 0; y < count; y++){
        let u = x / (count-1);
        let v = y / (count-1);
        points.push([u,v]);
      }
    }
    return points;
  };

  const points = createGrid();
  console.log(points);

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(([ u,v ]) =>{
      const x = u * width;
      const y = v * height;

      context.beginPath();
      context.arc(x,y, 100, 0, Math.PI * 2, false);
      context.fillStyle= "black";
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
