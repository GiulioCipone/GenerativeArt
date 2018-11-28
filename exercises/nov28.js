const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const palette = random.pick(palettes).slice(0,3);
  //console.log(palette);

  const createGrid = () => {
    const points = [];
    const count = 30;
    for(let x = 0; x < count; x++){
      for(let y = 0; y < count; y ++){
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push({
          color: random.pick(palette),
          radius: Math.abs(random.gaussian() *.018),
          position: [ u, v ]
        });
      }
    }
    return points;
  };

  random.setSeed(512);
  const points = createGrid().filter( () => random.value() > .5 );
  //console.log(points);

  const numbString = [1,2,3,4,5,6,7,8,9,0];
  const numero = random.shuffle(numbString.slice(0,4));
  console.log(numero);


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const margin = width * .12;

    points.forEach(data => {
      const {
        color,
        radius,
        position
      } = data;
      const [ u, v ] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x,y, radius * width, 0, Math.PI * 2, true);
      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
