import { radiusRect } from './util'

// 棋格圆角弧度
const BOARD_GRID_RADIUS = 4

// 棋格颜色
const BOARD_GRID_COLOR = '#34495e'

/**
 * 棋格类
 */
export default class BoardGrid {
  constructor (boardGridX, boardGridY, boardGridType, boardGridSize) {
    // 定义棋格大小
    this.boardGridSize = boardGridSize
    this.boardGridX = boardGridX
    this.boardGridY = boardGridY
    // 棋格类型
    this.boardGridType = boardGridType
  }

  setBoardGridSize (boardGridSize) {
    this.boardGridSize = boardGridSize
  }

  initBoardGrid (x, y) {
    const type = this.boardGridType.BOARD_GRID_TYPE_DEFAULT
    // 棋格坐标
    return {
      boardGridX: x,
      boardGridY: y,
      boardGridType: type
    }
  }

  /**
   * 绘制棋格
   */
  drawBoardGrid (left, top, ctx) {
    this.drawRoundedRect(
      left,
      top,
      BOARD_GRID_RADIUS,
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
