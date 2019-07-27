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
export function radiusRect (left, top, width, height, r, ctx) {
  const pi = Math.PI
  ctx.beginPath()
  ctx.arc(left + r, top + r, r, -pi, -pi / 2)
  ctx.arc(left + width - r, top + r, r, -pi / 2, 0)
  ctx.arc(left + width - r, top + height - r, r, 0, pi / 2)
  ctx.arc(left + r, top + height - r, r, pi / 2, pi)
  ctx.closePath()
}
