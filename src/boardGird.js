import { radiusRect } from './util'
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
  isInBoardGird (x, y, boardGrid, boardGridSize, ctx) {
    radiusRect(
      boardGrid.boardGridX,
      boardGrid.boardGridY,
      boardGridSize,
      boardGridSize,
      boardGrid.boardGridRadius,
      ctx
    )
    return ctx.isPointInPath(x, y)
  }

  /**
   * 绘制棋格
   */
  drawBoardGrid (boardGrid, boardGridSize, ctx) {
    this.drawRoundedRect(
      boardGrid.boardGridX,
      boardGrid.boardGridY,
      this.boardGridRadius,
      boardGridSize,
      ctx
    )
  }

  /**
   * 绘制填充圆角矩形
   */
  drawRoundedRect (left, top, r, boardGridSize, ctx) {
    radiusRect(left, top, boardGridSize, boardGridSize, r, ctx)
    ctx.fillStyle = BOARD_GRID_COLOR
    ctx.fill()
  }

  // getBoardGridX (boardGridRow) {
  //   return 
  // }

  /**
   * 绘制棋格上的棋子
   */
  drawBoardGridChess (playerChessType, gameChess) {
    // let boardGridX = 
    gameChess.drawChess(this.boardGridX, this.boardGridY, playerChessType)
  }
}
