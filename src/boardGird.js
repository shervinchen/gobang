import { drawRadiusRect, window2Canvas } from './util'
import { BOARD_GRID_COLOR } from './constant'

/**
 * 棋格类
 */
export default class BoardGrid {
  constructor (boardGridX, boardGridY, boardGridType, boardGridRadius) {
    // 棋格坐标
    this.boardGridX = boardGridX
    this.boardGridY = boardGridY
    // 棋格类型
    this.boardGridType = boardGridType
    // 棋格圆角弧度
    this.boardGridRadius = boardGridRadius
  }

  /**
   * 判断点击的点是否在棋格内
   */
  isInBoardGird (clientX, clientY, boardGrid, boardGridSize, gameCanvas) {
    const { x, y } = window2Canvas(gameCanvas.canvas, clientX, clientY)
    drawRadiusRect(
      boardGrid.boardGridX,
      boardGrid.boardGridY,
      boardGridSize,
      boardGridSize,
      boardGrid.boardGridRadius,
      gameCanvas.context
    )
    return gameCanvas.context.isPointInPath(x, y)
  }

  /**
   * 绘制棋格
   */
  drawBoardGrid (boardGrid, boardGridSize, ctx) {
    drawRadiusRect(
      boardGrid.boardGridX,
      boardGrid.boardGridY,
      boardGridSize,
      boardGridSize,
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
  drawBoardGridChess (chessType, boardGridSize, gameChess, ctx) {
    // let boardGridX =
    gameChess.drawChess(
      this.boardGridX,
      this.boardGridY,
      boardGridSize,
      chessType,
      ctx
    )
    this.boardGridType = chessType
  }
}
