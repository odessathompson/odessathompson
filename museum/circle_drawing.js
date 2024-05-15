document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", function (e) {
    startX = e.offsetX;
    startY = e.offsetY;
    isDrawing = true;
  });

  canvas.addEventListener("mouseup", function (e) {
    if (isDrawing) {
      drawCircle(startX, startY, e.offsetX, e.offsetY);
      isDrawing = false;
    }
  });

  function drawCircle(x1, y1, x2, y2) {
    let radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
});
