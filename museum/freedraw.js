let canvas = document.getElementById("canvas");
canvas.height = window.innerHeight * 0.7;
canvas.width = window.innerWidth * 0.73;
let ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let prevX = null;
let prevY = null;

let draw = false;

let isDrawing = false;
let circleToggle = false;
let rectToggle = false;

let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach((clr) => {
  clr.addEventListener("click", () => {
    ctx.strokeStyle = clr.dataset.clr;
    ctx.fillStyle = clr.dataset.clr;
  });
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = clr.dataset.clr;
});

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});

function toggleActiveButton(buttonId, toggle) {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  if (toggle == false) {
    document.getElementById(buttonId).classList.add("active");
  }
}

let circleBtn = document.getElementById("circle");
circleBtn.addEventListener("click", () => {
  // toggleActiveButton("circle", circleToggle);
  circleToggle = !circleToggle;
  if (circleToggle) {
    circleBtn.classList.add("active");
  } else {
    circleBtn.classList.remove("active");
  }
});

let rectBtn = document.getElementById("rectangle");
rectBtn.addEventListener("click", () => {
  // toggleActiveButton("rectangle", rectToggle);
  rectToggle = !rectToggle;
  if (rectToggle) {
    rectBtn.classList.add("active");
  } else {
    rectBtn.classList.remove("active");
  }
});

canvas.addEventListener("mousedown", function (e) {
  draw = true;
  if (circleToggle || rectToggle) {
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    isDrawing = true;
  }
});

canvas.addEventListener("mouseup", function (e) {
  draw = false;

  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    endX = e.clientX - rect.left;
    endY = e.clientY - rect.top;

    if (circleToggle) {
      drawCircle(startX, startY, endX, endY);
    } else if (rectToggle) {
      drawRectangle(
        startX,
        startY,
        Math.abs(startX - endX),
        Math.abs(startY - endY)
      );
    }
    isDrawing = false;
  }
});

canvas.addEventListener("mousemove", function (e) {
  if (!circleToggle || !rectToggle) {
    const rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    if (prevX == null || prevY == null || !draw) {
      prevX = mouseX;
      prevY = mouseY;
      return;
    }

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    prevX = mouseX;
    prevY = mouseY;
  }
});

function drawCircle(x1, y1, x2, y2) {
  let radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawRectangle(x, y, width, height) {
  ctx.fillRect(x, y, width, height);
}

function isShapeClosed(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) < 5 && Math.abs(y1 - y2) < 5;
}
