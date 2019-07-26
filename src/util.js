export function radiusRect(left, top, width, height, r, ctx) {
  const pi = Math.PI;
  ctx.beginPath();
  ctx.arc(left + r, top + r, r, - pi, -pi / 2);
  ctx.arc(left + width - r, top + r, r, -pi / 2, 0);
  ctx.arc(left + width - r, top + height - r, r, 0, pi / 2);
  ctx.arc(left + r, top + height - r, r, pi / 2, pi);
  ctx.closePath();
}

