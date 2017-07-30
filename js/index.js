var arr = [],
count = 10, //количество элементов
w,
bbl_i = 0,
bbl_j = 0,
tick = 0, //счетчик
slow = 10, //замедление скорости перебора
c = document.getElementById('c'),
ctx = c.getContext('2d'),
ar=[],//генерируемый массив
ar2=[]//отсортированый массив

var colors = {
  black: '#000',
  red: '#E53935',
  green: '#43A047'
}

function resize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight-300;
  w = c.width / count;
}
resize();
window.addEventListener("resize", resize);

function gen () {
  function Rect (h, col) {
    this.h = h;
    this.col = col;
  }

  for(var i=0; i<count; i++) {
    var h = Math.round(.9*c.height*Math.random()),
    col = colors.black;
    arr.push(new Rect(h, col));
    ar.push(arr[i].h)
  }
  document.getElementById("start").innerHTML=ar
}

//создание прмоугольников
function drawRects () {
  for(var i=0; i<count; i++) {
    var rect = arr[i];
    ctx.fillStyle = rect.col;
    ctx.fillRect(i*w+2, c.height - rect.h , w-1, rect.h);
    ctx.fillText(rect.h, i*w+w/2, c.height - rect.h-3)
    ctx.font= 'normal bold 14px Arial'
    ctx.textAlign = "center"
  }
}

//обмен элементов
function swap(arr, i, j) {
  var t_h = arr[i].h
  arr[i].h = arr[j].h;
  arr[j].h = t_h;
}

// Если ничего нет - возвращаем обычный таймер
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback) {
    window.setTimeout(callback, 1000/60);
  };
})();

function update() {
  if (tick % slow == 9) {
    tick=0
    if (bbl_i < count) {
      if (bbl_j < count-bbl_i-1) {
        //если элементы стоят неправильно происходит обмен
        if (arr[bbl_j].h > arr[bbl_j+1].h) {
          swap(arr, bbl_j, bbl_j+1)
        }
        arr[bbl_j].col = colors.black;
        arr[bbl_j+1].col = colors.red;
        bbl_j++;
      } else {
       arr[bbl_j].col = colors.green;
       bbl_j = 0;
       bbl_i++;
       //вывод сортированного массива
       if (bbl_i==count) {
         for (var i = 0, length = arr.length; i < length; i++) {
           ar2.push(arr[i].h)
         }
         document.getElementById("end").innerHTML=ar2;
         document.getElementById("gen").removeAttribute("disabled");
       }
     }
   }
 }
 tick++;
 ctx.clearRect(0, 0, c.width, c.height);
 drawRects();
 window.requestAnimFrame(update);
}

document.getElementById('sort').onclick = function (){
  update();
  bbl_i = 0
  tick = 0
  slow = 10
  this.setAttribute("disabled", "disabled")
}

document.getElementById('gen').onclick = function (){
  ar=[]
  ar2=[]
  arr=[]
  tick=0
  document.getElementById("start").innerHTML=''
  document.getElementById("end").innerHTML=''
  gen();
  drawRects()
  this.setAttribute("disabled", "disabled")
  document.getElementById("sort").removeAttribute("disabled");
}