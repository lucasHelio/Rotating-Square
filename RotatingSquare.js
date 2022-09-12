"use strict";
 var vertices = new Float32Array([
     -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
 ]);

 var numPoints = vertices.length / 2;
 var w;
 var h;
 function mapToViewport(x, y, n = 5) {
     return [((x + n / 2) * w) / n, ((-y + n / 2) * h) / n];
 }

 function getVertex(i) {
     let j = (i % numPoints) * 2;
     return [vertices[j], vertices[j + 1]];
 }
 function draw(ctx,vertice) {
     let vertexIndex = vertice
     ctx.fillStyle = "rgba(0, 204, 204, 1)";
     ctx.rect(0, 0, w, h);
     ctx.fill();
     let [x, y] = mapToViewport(...getVertex(vertexIndex));
     ctx.translate(x,y);
     
   
     ctx.rotate(-2*Math.PI/180);
     ctx.translate(-x,-y);
     ctx.beginPath();
     
     for (let i = 0; i < numPoints; i++) {
      if (i == 3 || i == 4) continue;
      let [x, y] = mapToViewport(...getVertex(i).map((v) => v ));
      if (i == 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
  }
    ctx.closePath();

    


    ctx.strokeStyle = "gray";
    ctx.lineWidth = 10;
    ctx.stroke();
    
    switch(vertice){
    case 4:
        ctx.fillStyle = "red";
        break;
    case 3:
        ctx.fillStyle = "green";
        break;
    case 5:
        ctx.fillStyle = "blue";
        break;
    case 1:
        ctx.fillStyle = "white";
        break;
    }
    ctx.fill();

    ctx.beginPath();
    [x, y] = mapToViewport(...getVertex(1));
    ctx.fillStyle = 'white';
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    [x, y] = mapToViewport(...getVertex(3));
    ctx.fillStyle = 'green';
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    [x, y] = mapToViewport(...getVertex(4));
    ctx.fillStyle = 'red';
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    [x, y] = mapToViewport(...getVertex(5));
    ctx.fillStyle = 'blue';
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();

 }

 function mainEntrance() {
     var canvasElement = document.querySelector("#theCanvas");
     var ctx = canvasElement.getContext("2d");
     let vertice = 4
     w = canvasElement.width;
     h = canvasElement.height;
     document.addEventListener("keydown", (event) => {
        console.log(event.key);
        //AJUSTAR AS TECLAS DO TECLADO
        switch (event.key) {
          case "r":
            vertice = 4;
            break;
          case "g":
            vertice = 3;
            break;
          case "b":
            vertice = 5;
            break;
          case "w":
            vertice = 1;
            break;
        }
      });
     var runanimation = (() => {
        
         return () => {
             draw(ctx,vertice);
             requestAnimationFrame(runanimation);
         };
     })();
     runanimation();
 }