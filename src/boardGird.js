import { drawRadiusRect, window2Canvas } from './util'
import { BOARD_GRID_COLOR } from './constant'

/**
 * 棋格类
 *
 * @export
 * @class BoardGrid
 */
export default class BoardGrid {
  /**
   * 构造方法
   *
   * @param {Number} boardGridX 棋格左上角横坐标
   * @param {Number} boardGridY 棋格左上角纵坐标
   * @param {Number} boardGridSize 棋格大小
   * @param {Number} boardGridType 棋格类型
   * @param {Number} boardGridRadius 棋格圆角半径
   * @memberof BoardGrid
   */
  constructor (
    boardGridX,
    boardGridY,
    boardGridSize,
    boardGridType,
    boardGridRadius
  ) {
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
   *
   * @param {Number} clientX
   * @param {Number} clientY
   * @param {Object} gameCanvas
   * @returns
   * @memberof BoardGrid
   */
  isInBoardGird (clientX, clientY, gameCanvas) {
    // event.offsetX,event.offsetY等API在采用dpr适配方案以后，计算出的值有错误，所以弃用此API，采用新方法计算
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
   *
   * @param {Object} ctx 画布内容对象
   * @memberof BoardGrid
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
   * 绘制棋格上的棋子
   *
   * @param {Number} chessType 棋子类型
   * @param {Object} gameChess 棋子对象
   * @param {Object} ctx 画布内容对象
   * @memberof BoardGrid
   */
  drawBoardGridChess (gameChess, ctx) {
    gameChess.drawChess(
      this.boardGridX,
      this.boardGridY,
      this.boardGridSize,
      ctx
    )
    this.boardGridType = gameChess.chessType
  }

  setBoardGridChess (gameChess, chessSize, chessLineWidth) {
    // 重新设置棋子属性
    gameChess.setChessSize(
      chessSize
    )
    gameChess.setChessLineWidth(
      chessLineWidth
    )
  }
}
