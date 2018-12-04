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
    const count = 170;
    for(let x = 0; x < count; x++){
      for(let y = 0; y < count; y ++){
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push({
          color: random.noise2D(u, v),//random.pick(palette),
          radius:  .04,
          rotation: random.noise2D(u, v),//Math.abs(random.gaussian() * .02),
          position: [ u, v ]
        });
      }
    }
    return points;
  };

  /*  NOISE NOISE NOISE  */
  // v = noise2D(u, y) V value between -1 and 1 and slowly varies with coordinates
  /*
  const v = noise2D(x, y); now is between -1 and 1
  const n = v * .5 + .5;  map to 0..1
  const L = Math.floor(n * 100);
  const hsl = `hsl(0, 0%, ${L}%)`;
  */

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const margin = width * .12;

    points.forEach( data => {
      const {
        color,
        radius,
        rotation,
        position
      } = data;
      const [ u, v ]= position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      const n = color * .5 + .5;
      const L = Math.floor(n * 100);
      const hsl = `hsl(25, 100%, ${L}%)`;

      //context.beginPath();
      context.save();
      context.fillStyle = hsl;
      context.font =  '80px Arial' ;
      context.translate(x,y);
      context.rotate(rotation * 2);
      context.fillText( ' – ', 0, 0);

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
