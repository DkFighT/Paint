var page = document.getElementById('page');
var pageX = page.clientWidth;
var pageY = page.clientHeight;
var canvas = document.getElementById('field');
canvas.setAttribute('width', `${pageX}px`);
canvas.setAttribute('height', `${pageY}px`)
var ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(0, 0);

var brush_size = document.getElementById('size');
var colors = document.getElementsByClassName('color');

function setColor(t){
    for (let i = 0; i < colors.length; i++){
        colors[i].style.boxShadow = 'none';
    }
    t.style.boxShadow = '0px 0px 0px 2px #000';
    ctx.beginPath();
    ctx.strokeStyle = `${t.style.backgroundColor}`;
    ctx.fillStyle = `${t.style.backgroundColor}`;
}

function clearField(){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function filling(){
    ctx.fill();
}

function changeBrushSize(){
    if (brush_size.value == '1'){
        ctx.lineWidth = 1;
    }
    if (brush_size.value == '3'){
        ctx.lineWidth = 3;
    }
    if (brush_size.value == '5'){
        ctx.lineWidth = 5;
    }
    if (brush_size.value == '8'){
        ctx.lineWidth = 8;
    }
}

function getPos(x, y){
    ctx.lineTo(x, y);
    ctx.stroke();
}
function newPos(x, y){
    ctx.beginPath();
    ctx.moveTo(x, y);
}
canvas.addEventListener('mousemove', (event) => {
    let x = event.clientX;
    let y = event.clientY - 100;
    if(event.which === 1){
        getPos(x, y);
    }
    changeBrushSize();
});
canvas.addEventListener('mousedown', (event) => {
    let x = event.clientX;
    let y = event.clientY - 100;
    newPos(x, y);
})



var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
disableScroll();
