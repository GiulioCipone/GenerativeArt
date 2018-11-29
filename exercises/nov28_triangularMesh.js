const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

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
    let odd = false;

    for( let y = gap / 2; y < height; y += gap){
      odd = !odd;
      line = [];
      for(let x = gap / 4; x < width; x += gap){
        dot = {x: x + (Math.random()*.8 - .4) * gap  + (odd ? gap/2 : 0),
      y: y + (Math.random()*.8 - .4) * gap};  // (odd ? gap/2 : 0) this means: IF odd is true gap/2 ELSE zero
        line.push(dot);
        context.beginPath();
         context.arc(dot.x, dot.y, 10, 0, 2 * Math.PI, true);
         context.fill();
      }
      lines.push(line);
    }
    //random.setSeed(512);
    //random.setSeed(523);
    const palette = random.pick(palettes); //pick a random palette
    const coloursRGB = [];

    for(let i = 0; i <= palette.length; i ++){
      const hex = palette[i];
      const hexToRgb = (hex) => {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
          } : null;
      }
      coloursRGB.push();
    }

/*  Make a funciton that turn hex color isnto rgba
    const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}*/



    const drawTriangle = (pointA, pointB, pointC) => {
      context.beginPath();
      context.moveTo(pointA.x, pointA.y);
      context.lineTo(pointB.x, pointB.y);
      context.lineTo(pointC.x, pointC.y);
      context.lineTo(pointA.x, pointA.y);
      context.closePath();
      context.fillStyle =
      context.fill();
      context.stroke();
    }

    let dotLine;
    for(let y = 0; y < lines.length - 1; y++){
      odd = !odd;
      dotLine = [];
      for(let i = 0; i < lines[y].length; i++) {
      dotLine.push(odd ? lines[y][i] : lines[y+1][i]);
      dotLine.push(odd ? lines[y+1][i] : lines[y][i]);
    }
    for(let i = 0; i < dotLine.length - 2; i++) {
      drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2]);
    }
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
