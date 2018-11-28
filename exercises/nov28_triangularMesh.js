const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  // const createGrid = () => {
  //   const points = [];
  //   const count = 30;
  //   for(let x = 0; x < count; x++){
  //     for(let y = 0; y < count; y ++){
  //       const u = x / (count - 1);
  //       const v = y / (count - 1);
  //       points.push( [ u, v ] );
  //     }
  //   }
  //   return points;
  // };
  // const points = createGrid();

  return ({ context, width, height }) => {

    let line;
    const lines = [];
    const gap = width / 7;
    let dot;
    const odd = false;

    for( let y = gap / 2; y < height; y += gap){
      //odd = !odd;
      line = [];
      for(let x = gap / 2; x < width; x += gap){
        dot = {x: x + (odd ? gap/2 : 0), y: y};
        line.push(dot);
        context.beginPath();
         context.arc(dot.x, dot.y, 10, 0, 2 * Math.PI, true);
         context.fill();
      }
      lines.push(line);
    }
    //console.log(lines);

    // context.fillStyle = 'white';
    // context.fillRect(0, 0, width, height);
    //
    // points.forEach( => {
    //
    //
    //   context.beginPath();
    //   context.arc(x,y, 20, 0, Math.PI * 2, true);
    //   context.fillStyle = 'purple';
    //   context.fill();
    // });

  };
};

canvasSketch(sketch, settings);
