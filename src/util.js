/**
 * 绘制圆角矩形
 *
 * @export
 * @param {Number} left 矩形左上角横坐标
 * @param {Number} top 矩形左上角纵坐标
 * @param {Number} width 矩形宽度
 * @param {Number} height 矩形高度
 * @param {Number} r 矩形圆角半径
 * @param {Object} ctx 画布对象
 */
export function drawRadiusRect (left, top, width, height, r, ctx) {
  const pi = Math.PI
  ctx.beginPath()
  ctx.arc(left + r, top + r, r, -pi, -pi / 2)
  ctx.arc(left + width - r, top + r, r, -pi / 2, 0)
  ctx.arc(left + width - r, top + height - r, r, 0, pi / 2)
  ctx.arc(left + r, top + height - r, r, pi / 2, pi)
  ctx.closePath()
}

export function drawCircle (x, y, r, ctx) {
  // var offset = 1;
  const pi = Math.PI
  ctx.beginPath();
  ctx.arc(x, y, r, 0, pi * 2, true);
  ctx.closePath();
}

export function drawCross (x, y, size, width, color, ctx) {
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - size / 2, y - size / 2);
  ctx.lineTo(x + size / 2, y + size / 2);
  ctx.lineCap = "round";
  ctx.stroke()
  ctx.closePath()
  
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y - size / 2);
  ctx.lineTo(x - size / 2, y + size / 2);
  ctx.lineCap = "round";
  ctx.stroke()
  ctx.closePath()
}