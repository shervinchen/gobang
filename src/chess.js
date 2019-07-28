/**
 * 棋子类
 */
export default class Chess {
  /**
   * 定义棋子位置、棋子类型等属性
   * @param {Number} chessRow 棋子所在行数
   * @param {Number} chessCol 棋子所在列数
   * @param {Number} chessType 棋子类型
   * @constructor
   */
  constructor (chessRow, chessCol, chessType) {
    this.chessRow = chessRow
    this.chessCol = chessCol
    this.chessType = chessType
  }

  // initChess () {
  //   this.drawChess()
  // }
  
}
