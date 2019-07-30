import { drawRadiusRect, window2Canvas } from './util'
import { BOARD_GRID_COLOR } from './constant'

/**
 * 棋格类
 */
export default class BoardGrid {
  constructor (boardGridX, boardGridY, boardGridSize, boardGridType, boardGridRadius) {
    // 棋格坐标
    this.boardGridX = boardGridX
    this.boardGridY = boardGridY
    // 定义棋格大小
    this.boardGridSize = boardGridSize
    // 棋格类型
    this.boardGridType = boardGridType
    // 棋格圆角弧度
    this.boardGridRadius = boardGridRadius
  }

  setBoardGridPosition (x, y) {
    this.boardGridX = x
    this.boardGridY = y
  }

  setBoardGridSize (boardGridSize) {
    this.boardGridSize = boardGridSize
  }

  /**
   * 判断点击的点是否在棋格内
   */
  isInBoardGird (clientX, clientY, gameCanvas) {
    const { x, y } = window2Canvas(gameCanvas.canvas, clientX, clientY)
    drawRadiusRect(
      this.boardGridX,
      this.boardGridY,
      this.boardGridSize,
      this.boardGridSize,
      this.boardGridRadius,
      gameCanvas.context
    )
    return gameCanvas.context.isPointInPath(x, y)
  }

  /**
   * 绘制棋格
   */
  drawBoardGrid (ctx) {
    drawRadiusRect(
      this.boardGridX,
      this.boardGridY,
      this.boardGridSize,
      this.boardGridSize,
      this.boardGridRadius,
      ctx
    )
    ctx.fillStyle = BOARD_GRID_COLOR
    ctx.fill()
  }

  /**
   * 绘制填充圆角矩形
   */
  // drawRoundedRect (left, top, r, boardGridSize, ctx) {}

  // getBoardGridX (boardGridRow) {
  //   return
  // }

  /**
   * 绘制棋格上的棋子
   */
  drawBoardGridChess (chessType, gameChess, ctx) {
    // let boardGridX =
    gameChess.drawChess(
      this.boardGridX,
      this.boardGridY,
      this.boardGridSize,
      chessType,
      ctx
    )
    this.boardGridType = chessType
  }
}
