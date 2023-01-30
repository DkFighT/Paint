var page = document.getElementById('page');
var pageX = page.clientWidth;
var pageY = page.clientHeight;
var canvas = document.getElementById('field');
canvas.setAttribute('width', `${pageX}px`);
canvas.setAttribute('height', `${pageY}px`)
var ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.beginPath();
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    cPush();
}
function filling(){
    ctx.fill();
    cPush();
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
canvas.addEventListener('mouseup', (event)=>{
    cPush();
})

var cPushArray = new Array();
var cStep = -1;
	
function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(canvas.toDataURL("image/png"));
    console.log('saved!');
}

function cUndo() {
    if (cStep > 0) {
        cStep--;
        let canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = () => { ctx.drawImage(canvasPic, 0, 0); }
        console.log('undo');
    }
}

function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        let canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = () => { ctx.drawImage(canvasPic, 0, 0); }
        console.log('redo');
    }
}

let hor_flag = false;
let vert_flag = false;
function rotate_hor(){
    if(!hor_flag){
        canvas.style.transform = 'rotateX(180deg)';
        hor_flag = true;
    }
    else{
        canvas.style.transform = 'rotateX(0deg)';
        hor_flag = false;
    } 
}
function rotate_vert(){
    if(!vert_flag){
        canvas.style.transform = 'rotateY(180deg)';
        vert_flag = true;
    }
    else{
        canvas.style.transform = 'rotateY(0deg)';
        vert_flag = false;
    } 
}

// let scale_active = true;
// function check_scale_active(){
//     if(scale_active){
//         plus_scale();
//         scale_active = false;
//     }
//     else{
//         plus_scale();
//         scale_active = true;
//     }
// }
// function plus_scale(){
//         window.addEventListener('mousemove', function abc(event) {
//             let x = event.clientX;
//             let y = event.clientY - 100;
//             check_mouse_position(x, y);
//             if(!scale_active){
//                 window.removeEventListener('mousemove', abc);
//                 canvas.style.transform = 'scale(1)';
//             } 
//         });
// }   


function check_mouse_position(x, y){
    if(x < canvas.width / 3 && y < canvas.height / 3){
        canvas.style.transformOrigin = 'top left';
        canvas.style.transform = 'scale(2)';
    }
    else if(x > canvas.width / 3 && x < canvas.width - canvas.width / 3 && y < canvas.height / 3){
        canvas.style.transformOrigin = 'top';
        canvas.style.transform = 'scale(2)';
    }
    else if(x < canvas.width && x > canvas.width - canvas.width / 3 && y < canvas.height / 3){
        canvas.style.transformOrigin = 'top right';
        canvas.style.transform = 'scale(2)';
    }
    else if(x < canvas.width / 3 && y < canvas.height - canvas.height / 3){
        canvas.style.transformOrigin = 'left';
        canvas.style.transform = 'scale(2)';
    }
    else if(x > canvas.width / 3 && x < canvas.width - canvas.width / 3 && y < canvas.height - canvas.height / 3){
        canvas.style.transformOrigin = 'center';
        canvas.style.transform = 'scale(2)';
    }
    else if(x < canvas.width && x > canvas.width - canvas.width / 3 && y < canvas.height - canvas.height / 3){
        canvas.style.transformOrigin = 'right';
        canvas.style.transform = 'scale(2)';
    }
    else if(x < canvas.width / 3 && y < canvas.height){
        canvas.style.transformOrigin = 'bottom left';
        canvas.style.transform = 'scale(2)';
    }
    else if(x > canvas.width / 3 && x < canvas.width - canvas.width / 3 && y < canvas.height){
        canvas.style.transformOrigin = 'bottom';
        canvas.style.transform = 'scale(2)';
    }
    else if(x < canvas.width && x > canvas.width - canvas.width / 3 && y < canvas.height){
        canvas.style.transformOrigin = 'bottom right';
        canvas.style.transform = 'scale(2)';
    }
}
