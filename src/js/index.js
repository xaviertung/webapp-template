import '../css/index.less';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.lineJoin = 'round';
context.lineWidth = 30;

context.font='24px Helvetica';
context.fillText('Hello, World!', 175, 200);

// context.strokeStyle='goldenrod';
// context.strokeRect(75, 100, 200, 200);
context.beginPath();
context.strokeStyle='goldenrod';
context.rect(75, 100, 200, 200);
context.stroke();



// context.fillStyle='rgba(0, 0, 255, 0.5)';
// context.fillRect(325, 100, 200, 200);
context.beginPath();
context.fillStyle='rgba(0, 0, 255, 0.5)';
context.rect(325, 100, 200, 200);
context.fill();
context.stroke();

context.beginPath();
context.strokeStyle='lightgreen';
context.fillStyle='lightgreen';
context.arc(200, 200, 100, 0, 5 / 6 * Math.PI, false);
context.closePath();
context.stroke();
context.fill();





context.canvas.onmousedown = e => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
}








