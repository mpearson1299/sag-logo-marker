const readline = require('readline');
const fs = require('fs');
const { createSVG } = require('svg-crowbar');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createLogo() {
  rl.question('Enter up to three characters: ', (text) => {
    rl.question('Enter the text color (keyword or hexadecimal number): ', (textColor) => {
      rl.question('Choose a shape (circle, triangle, or square): ', (shape) => {
        rl.question('Enter the shape color (keyword or hexadecimal number): ', (shapeColor) => {
          rl.close();
          const svg = createSVG(text, textColor, shape, shapeColor);
          fs.writeFileSync('logo.svg', svg);
          console.log('Generated logo.svg');
        });
      });
    });
  });
}

function createSVG(text, textColor, shape, shapeColor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <rect x="0" y="0" width="300" height="200" fill="${shapeColor}" />
      ${createShape(shape)}
      <text x="150" y="125" font-size="30" fill="${textColor}" text-anchor="middle">${text}</text>
    </svg>
  `;
  return svg;
}

function createShape(shape) {
  switch (shape) {
    case 'circle':
      return '<circle cx="150" cy="100" r="50" fill="none" stroke-width="2" />';
    case 'triangle':
      return '<polygon points="150,50 100,150 200,150" fill="none" stroke-width="2" />';
    case 'square':
      return '<rect x="100" y="50" width="100" height="100" fill="none" stroke-width="2" />';
    default:
      return '';
  }
}

// Calling the function to create the logo
createLogo();