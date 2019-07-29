import { drawCircle, drawCross } from "./util";
import { CHESS_CIRCLE_COLOR, CHESS_CROSS_COLOR, CHESS_TYPE_CROSS, CHESS_TYPE_CIRCLE } from './constant'

/**
 * 棋子类
 */
export default class Chess {
  // /**
  //  * 定义棋子位置、棋子类型等属性
  //  * @param {Number} chessRow 棋子所在行数
  //  * @param {Number} chessCol 棋子所在列数
  //  * @param {Number} chessType 棋子类型
  //  * @constructor
  //  */
  // constructor (chessRow, chessCol, chessType) {
  //   this.chessRow = chessRow
  //   this.chessCol = chessCol
  //   this.chessType = chessType
  // }

  constructor (chessSize, chessLineWidth) {
    this.chessSize = chessSize
    this.chessLineWidth = chessLineWidth
  }

  setChessSize (chessSize) {
    this.chessSize = chessSize
  }

  setChessLineWidth (chessLineWidth) {
    this.chessLineWidth = chessLineWidth
  }

  drawChess (boardGirdX, boardGridY, boardGridSize, playerChessType, ctx) {
    if (playerChessType === CHESS_TYPE_CROSS) {
      this.drawCrossChess(boardGirdX, boardGridY, boardGridSize, ctx)
    } else if (playerChessType === CHESS_TYPE_CIRCLE) {
      this.drawCircleChess(boardGirdX, boardGridY, boardGridSize, ctx)
    } else {
      return
    }
    console.log(boardGirdX, boardGridY, playerChessType, this.chessSize)
  }

  drawCircleChess (boardGirdX, boardGridY, boardGridSize, ctx) {
    const x = boardGirdX + boardGridSize / 2
    const y = boardGridY + boardGridSize / 2
    drawCircle(x, y, this.chessSize / 2, ctx)
    ctx.lineWidth = this.chessLineWidth
    ctx.strokeStyle = CHESS_CIRCLE_COLOR
    ctx.stroke()
  }

  drawCrossChess (boardGirdX, boardGridY, boardGridSize, ctx) {
    const x = boardGirdX + boardGridSize / 2
    const y = boardGridY + boardGridSize / 2
    drawCross(x, y, this.chessSize, this.chessLineWidth, CHESS_CROSS_COLOR, ctx)
  }

  // initChess () {
  //   this.drawChess()
  // }
  
}
