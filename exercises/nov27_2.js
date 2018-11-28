const canvasSketch = require('canvas-sketch');
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = ({ width, height }) => {

  let lines = [];
  const steps = 5;
  const count = 20;
  const spacing = Math.min(width, height) * .05;
  const radius = Math.min(width, height) * .25;

  for(let j = 0; j < count; j++){
    const r = radius + j * spacing;
    const circle = [];
    for(let i = 0; i < steps; i++){
      const t = i / Math.max(1, steps - 1);
      const angle = Math.PI * 2 * t;
      circle.push([width / 2 + Math.cos(angle) * r, height / 2 + Math.sin(angle) * r]);
    }
    lines.push(circle);
  }

    const margin = 1.0;
    const box = [margin, margin, width - margin, height - margin];
    lines = clipPolylinesToBox(lines, box);

    return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);
