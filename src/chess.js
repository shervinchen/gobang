/**
 * 棋子类
 */
export default class Chess {
  /**
   * 定义棋子位置、棋子类型等属性
   * @param {Number} chessX 棋子所在位置的横坐标
   * @param {Number} chessY 棋子所在位置的纵坐标
   * @param {Number} chessType 棋子类型
   * @constructor
   */
  constructor (chessX, chessY, chessType) {
    this.chessX = chessX
    this.chessY = chessY
    this.chessType = chessType
  }

  /**
   * 绘制棋子
   */
  drawChess () {

  }

  
}
