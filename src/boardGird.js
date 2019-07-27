import { radiusRect } from './util'

// 棋格颜色
const BOARD_GRID_COLOR = '#34495e'

/**
 * 棋格类
 */
export default class BoardGrid {
  constructor (boardGridX, boardGridY, boardGridType, boardGridSize, boardGridRadius) {
    // 定义棋格大小
    this.boardGridSize = boardGridSize
    // 棋格坐标
    this.boardGridX = boardGridX
    this.boardGridY = boardGridY
    // 棋格类型
    this.boardGridType = boardGridType
    // 棋格圆角弧度
    this.boardGridRadius = boardGridRadius
  }

  setBoardGridSize (boardGridSize) {
    this.boardGridSize = boardGridSize
  }

  /**
   * 绘制棋格
   */
  drawBoardGrid (left, top, ctx) {
    this.drawRoundedRect(
      left,
      top,
      this.boardGridRadius,
      ctx
    )
  }

  /**
   * 绘制填充圆角矩形
   */
  drawRoundedRect (left, top, r, ctx) {
    radiusRect(left, top, this.boardGridSize, this.boardGridSize, r, ctx)
    ctx.fillStyle = BOARD_GRID_COLOR
    ctx.fill()
  }
}
