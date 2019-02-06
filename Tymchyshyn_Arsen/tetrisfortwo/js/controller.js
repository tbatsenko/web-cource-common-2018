document.body.onkeydown = function (e) {
  var keys = { //Клавиши
    37: 'left1',
    65: 'left2', //a
    39: 'right1', //Стрелки влево и вправо
    40: 'down1',
    32: 'down', //Вниз - пробелом или стрелкой вниз
    38: 'rotate1', //Вращение- стрелкой вверх
    27: 'escape', //Пауза по клавише Esc
    68: 'right2', //d
    83: 'down2', //s
    87: 'rotate2' //w
  };
  if (typeof(keys[e.keyCode])!=='undefined') { //Если код клавиши допустимый,
    keyPress (keys[e.keyCode]); //Передать его обработчику
    render(); //и перерисовать стакан
  }
};