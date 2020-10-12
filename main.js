var cnvs = document.getElementById("canvas");
let ctx = cnvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeDown = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fontGr.png";
pipeUp.src = "img/pipeUp.png";
pipeDown.src = "img/pipeDown.png";

let gap = 90;

document.addEventListener("keydown", Jump);

function Jump(e) {
  posY -= 30;
}

let pipe = [];
pipe[0] = {
  x: cnvs.width,
  y: 0,
};
let score = 0;

let posX = 10;
let posY = 150;

let gravitation = 1;

function drawElements() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);

    pipe[i].x--;
    if (pipe[i].x == 140) {
      pipe.push({
        x: cnvs.width,
        y: Math.floor(Math.random() * pipeUp.height - pipeUp.height),
      });
    }

    if (
      (posX + bird.width >= pipe[i].x &&
        posX <= pipe[i].x + pipeUp.width &&
        (posY <= pipe[i].y + pipeUp.height ||
          posY + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      posY + bird.height >= cnvs.height - fg.height
    ) {
      location.reload(); // Перезагрузка страницы
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(bird, posX, posY);
  ctx.drawImage(fg, 0, cnvs.height - fg.height + 7);

  posY += gravitation;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText(name + " Score: " + score, 10, cnvs.height);

  requestAnimationFrame(drawElements);
}

pipeDown.onload = drawElements;
