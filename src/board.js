import { drawRoundedRect } from './util'

/**
 * 棋盘类
 */

// 棋盘每行、每列格子数
const BOARD_GRID_COUNT = 15

// 棋盘格子间隙
const BOARD_GRID_GAP = 1

export default class Board {
  /**
   * 定义棋盘属性
   * @param {Number} boardGridSize 棋盘格子大小
   * @constructor
   */
  constructor (boardGridSize) {
    this.boardGridSize = boardGridSize
  }

  // initBoard(ctx) {
  //   this.drawBoard(ctx)
  // }

  /**
   * 绘制棋盘
   */
  drawBoard(ctx) {
    // for (let row = 0; row < BOARD_GRID_COUNT; row++) {
    //   for (let col = 0; col < BOARD_GRID_COUNT; col++) {
      drawRoundedRect(ctx)
      // }
    // }
  }
  

  setBoardSize (boardGridSize) {
    this.boardGridSize = boardGridSize
  }

  getBoardSize () {
    return this.boardGridSize * BOARD_GRID_COUNT + BOARD_GRID_GAP * (BOARD_GRID_COUNT - 1)
  }

}
