const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const palette = random.pick(palettes);
  const createGrid = () => {
    const points = [];
    const count = 30;
    for(let x = 0; x < count; x++){
      for(let y = 0; y < count; y ++){
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push({
          color: 'black',//random.pick(palette),
          radius: Math.abs(random.gaussian() * .02),
          position: [ u, v ]
        });
      }
    }
    return points;
  };

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const margin = width * .12;

    points.forEach( data => {
      const {
        color,
        radius,
        position
      } = data;
      const [ u, v ]= position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      //context.beginPath();
      context.fillStyle = color;
      context.font = ` ${radius * width}px "Georgia" `;
      context.fillText( 'Alice',x, y);
    });
  };
};

canvasSketch(sketch, settings);
