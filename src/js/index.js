import '../css/index.less';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.lineJoin = 'round';
// context.lineWidth = 30;

context.font='24px Helvetica';
context.fillText('Hello, World!', 175, 200);

// context.strokeStyle='goldenrod';
// context.strokeRect(75, 100, 200, 200);
// context.beginPath();
// context.strokeStyle='goldenrod';
// context.rect(75, 100, 200, 200);
// context.stroke();



// context.fillStyle='rgba(0, 0, 255, 0.5)';
// context.fillRect(325, 100, 200, 200);
// context.beginPath();
// context.fillStyle='rgba(0, 0, 255, 0.5)';
// context.rect(325, 100, 200, 200);
// context.fill();
// context.stroke();

// context.beginPath();
// context.strokeStyle='lightgreen';
// context.fillStyle='lightgreen';
// context.arc(200, 200, 100, 0, 5 / 6 * Math.PI, false);
// context.closePath();
// context.stroke();
// context.fill();


function drawTwoArcs() {
  context.beginPath();
  context.strokeStyle='gray';
  context.fillStyle='lightgreen';
  context.arc(300, 190, 150, 0, Math.PI * 2, false);
  context.arc(300, 190, 100, 0, Math.PI * 2, true);

  context.fill();
  context.stroke();
}

// drawTwoArcs();

function drawGrid(stepX, stepY) {
  
  context.strokeStyle='black';

  for(let i = stepX + 0.5; i < canvas.width; i += stepX) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
    
    
  }

  for(let i = stepY + 0.5; i < canvas.height; i += stepY) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
    


  }
  
  
}

drawGrid(10, 10);


// context.canvas.onmousedown = e => {
//   context.clearRect(0, 0, canvas.width, canvas.height);
  
// }








