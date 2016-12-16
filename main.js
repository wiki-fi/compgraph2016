function init() {
  console.info("initialized"); //console.log,info,error,warn,debug
  var canvas = document.getElementById("game");
  var c = canvas.getContext("2d");
  var rotationAngle = 0;
  var frameNum = 0;
  c. translate(500, 500);
  var imgrot = 0;
  
  var images = [
  {
    img: document.getElementById("img1"),
	
	//тоже траектория
	speed : 0.015,
	rotationAngle: 0,
	
	//описываем траекторию, эти данные не меняются
	type: "circle",
	speedM: 0.01,
	xCenter: -500,
	yСenter: -500,
	r: 0,
	
	currentAngle: 0
  },
  {
    img: document.getElementById("img4"),
	
	//тоже траектория
	speed : 0.046,
	rotationAngle: 0,
	
	//описываем траекторию, эти данные не меняются
	type: "circle",
	speedM: -0.02,
	xCenter: -500,
	yСenter: -500,
	r: 300,
	
	currentAngle: 0
  },
  {
    img: document.getElementById("img5"),
	
	//тоже траектория
	speed : -0.3,
	rotationAngle: 0,
	
	//описываем траекторию, эти данные не меняются
	type: "circle",
	speedM: -0.07,
	xCenter: -500,
	yСenter: -500,
	r: -550,
	
	currentAngle: -243
  },
  {
    img: document.getElementById("img6"),
	
	speed: -0.04,
	rotationAngle: 0,
	
	//описываем траекторию, это не меняется
	type: "forward-back",
	speedM : 1 / 100, //за 100 шагов доходит от 0 до 1. За 100 кадров
	x1: -300,
	y1: -300,
	x2: -400,
	y2: 400,
	
	//текущее положение
	pathProgress: 0, //изменяется от 0 до 1
	direction: 1  //1 вперед, -1 назад
  },
  {
    img: document.getElementById("img2"),
	
	speed: 0.02,
	rotationAngle: 0,
	
	//описываем траекторию, это не меняется
	type: "forward-back",
	speedM : 1 / 100, //за 100 шагов доходит от 0 до 1. За 100 кадров
	x1: 300,
	y1: -300,
	x2: 400,
	y2: 400,
	
	//текущее положение
	pathProgress: 0, //изменяется от 0 до 1
	direction: 1  //1 вперед, -1 назад
  }
  /*{
    img: document.getElementById("img3"),
	
	speed: 0.08,
	rotationAngle: 0,
	
	//описываем траекторию, это не меняется
	type: "star",
	speedM : 1 / 100, //за 100 шагов доходит от 0 до 1. За 100 кадров
	xCenter: 0,
	yCenter: 0,
	r: 200,
	
	//текущее положение
	pathProgress: 0 //изменяется от 0 до 1
  }*/
  ];
 
  function drawImage(img, x0, y0, rotation) {
	c.save();
	c.translate(x0, y0);
	c.rotate(rotation);
    c.drawImage(img, -img.width / 2, -img.height / 2);	
    c.restore();
  }
  
  function draw() {
	//сдвинуть каждую фигуру в зависимости от ее траектории и от ее текущего положения
	//В цикле перебираем все фигуры из массива images, в зависимости от типа движения по-разному
	//ее сдвигаем. После сдвига рисуем.
	
	for (var i = 0; i < images.length; i++) {
	    var img = images[i];
		img.rotationAngle += images[i].speed;
		
		if (img.type == "circle") {
			//сдвинуть
		    img.currentAngle += images[i].speedM;
			
			//нарисовать
			drawImage(images[i].img, 
	          img.r * Math.cos(img.currentAngle), 
			  img.r * Math.sin(img.currentAngle), 
			  img.rotationAngle				
		    );
		}
		
		if (img.type == "forward-back") {
		    //сдвинуть
			if (img.direction == 1){
				img.pathProgress += 0.01;
				if (img.pathProgress >= 1)
					img.direction = -1;
			} else {
				img.pathProgress -= 0.01;
				if (img.pathProgress <= 0)
					img.direction = 1;
			}
			
			//нарисовать			
			drawImage(img.img, 
				img.x1 - (img.x2 + img.x1) * img.pathProgress,
				img.y1 + (img.y2 - img.y1) * img.pathProgress, 
				img.rotationAngle
			);
		}
		
		if (img.type == "star") {
			if (img.pathProgress >= 0 && img.pathProgress <= 0.2)
				img.pathProgress += 0.01;
			if (img.pathProgress >= 0.2 && img.pathProgress <= 0.4)
				img.pathProgress += 0.01;
            if (img.pathProgress >= 0.4 && img.pathProgress <= 0.6)
				img.pathProgress += 0.01;
            if (img.pathProgress >= 0.6 && img.pathProgress <= 0.8)
				img.pathProgress += 0.01;		
			if (img.pathProgress >= 0.8 && img.pathProgress <= 1)
				img.pathProgress += 0.01;	
			if (img.pathProgress == 1) 
                img.pathProgress = 0;			
					
			drawImage(img.img, 
				img.xCenter + (img.r * Math.cos(Math.PI * img.pathProgress) - img.r * Math.cos(Math.PI * (img.pathProgress - 0.1))),
				img.yCenter + (img.r * Math.sin(Math.PI * img.pathProgress) -  img.r * Math.cos(Math.PI * (img.pathProgress - 0.1))), 
				img.rotationAngle
			);	
	
		}
		
    }		
	//drawImage(images[1].img, images[1].x0, images[1].y0, images[1].speed * rotationAngle + Math.PI / 15);
	
	
	requestAnimationFrame(draw);
  }
  
  requestAnimationFrame(draw);
}