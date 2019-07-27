import { radiusRect } from './util'

/**
 * 棋盘类
 */

// 棋盘每行、每列格子数
const BOARD_GRID_COUNT = 15

// 棋盘格子圆角弧度
const BOARD_GRID_RADIUS = 4

// 棋盘格子颜色
const BOARD_GRID_COLOR = '#34495e'

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
  drawBoard (ctx) {
    for (let row = 0; row < BOARD_GRID_COUNT; row++) {
      for (let col = 0; col < BOARD_GRID_COUNT; col++) {
        this.drawRoundedRect(
          row * (this.boardGridSize + BOARD_GRID_GAP),
          col * (this.boardGridSize + BOARD_GRID_GAP),
          this.boardGridSize,
          this.boardGridSize,
          BOARD_GRID_RADIUS,
          ctx
        )
      }
    }
  }

  drawRoundedRect (left, top, width, height, r, ctx) {
    radiusRect(left, top, width, height, r, ctx)
    ctx.fillStyle = BOARD_GRID_COLOR
    ctx.fill()
  }

  setBoardSize (boardGridSize) {
    this.boardGridSize = boardGridSize
  }

  getBoardSize () {
    return (
      this.boardGridSize * BOARD_GRID_COUNT +
      BOARD_GRID_GAP * (BOARD_GRID_COUNT - 1)
    )
  }
}
