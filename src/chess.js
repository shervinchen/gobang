import { drawCircle, drawCross } from './util'
import {
  CHESS_CIRCLE_COLOR,
  CHESS_CROSS_COLOR,
  CHESS_CROSS_LINECAP,
  DRAW_CHESS_FUNC,
} from './constant'

/**
 * 棋子类
 */
export default class Chess {
  // /**
  //  * 定义棋子位置、棋子类型等属性
  //  * @param {Number} chessType 棋子类型
  //  * @constructor
  //  */
  // constructor (chessRow, chessCol, chessType) {
  //   this.chessRow = chessRow
  //   this.chessCol = chessCol
  //   this.chessType = chessType
  // }

  constructor (chessType, chessSize, chessLineWidth) {
    this.chessType = chessType
    this.chessSize = chessSize
    this.chessLineWidth = chessLineWidth
  }

  setChessSize (chessSize) {
    this.chessSize = chessSize
  }

  setChessLineWidth (chessLineWidth) {
    this.chessLineWidth = chessLineWidth
  }

  drawChess (boardGirdX, boardGridY, boardGridSize, ctx) {
    this[DRAW_CHESS_FUNC[this.chessType]](boardGirdX, boardGridY, boardGridSize, ctx)
  }

  [DRAW_CHESS_FUNC.CIRCLE] (boardGirdX, boardGridY, boardGridSize, ctx) {
    const x = boardGirdX + boardGridSize / 2
    const y = boardGridY + boardGridSize / 2
    drawCircle(x, y, this.chessSize / 2, ctx)
    ctx.lineWidth = this.chessLineWidth
    ctx.strokeStyle = CHESS_CIRCLE_COLOR
    ctx.stroke()
  }

  [DRAW_CHESS_FUNC.CROSS] (boardGirdX, boardGridY, boardGridSize, ctx) {
    const x = boardGirdX + boardGridSize / 2
    const y = boardGridY + boardGridSize / 2
    drawCross(
      x,
      y,
      this.chessSize,
      this.chessLineWidth,
      CHESS_CROSS_COLOR,
      CHESS_CROSS_LINECAP,
      ctx
    )
  }

  // initChess () {
  //   this.drawChess()
  // }
}
