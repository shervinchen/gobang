import BoardGrid from './boardGird'
import {
  BOARD_GRIDS_COUNT,
  BOARD_GRIDS_GAP,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_RADIUS
} from './constant'

/**
 * 棋盘类
 */
export default class Board {
  /**
   * 定义棋盘属性
   * @param {Number} boardGridSize 棋格大小
   * @constructor
   */
  constructor (boardGridSize) {
    // 定义棋格大小
    this.boardGridSize = boardGridSize
  }

  initBoard (ctx) {
    // 初始化棋格状态
    this.boardGrids = this.initBoardGrids(ctx)
    console.log(this.boardGrids)
  }

  /**
   * 初始化棋格状态
   */
  initBoardGrids (ctx) {
    const grids = []
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      grids[row] = []
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        // 创建棋格
        grids[row][col] = new BoardGrid(
          row * (this.boardGridSize + BOARD_GRIDS_GAP),
          col * (this.boardGridSize + BOARD_GRIDS_GAP),
          BOARD_GRID_TYPE_DEFAULT,
          BOARD_GRID_RADIUS
        )
        // 绘制棋格
        grids[row][col].drawBoardGrid(grids[row][col], this.boardGridSize, ctx)
      }
    }
    return grids
  }

  drawBoardGrids (ctx) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        this.setBoardGridPosition(
          this.boardGrids[row][col],
          row * (this.boardGridSize + BOARD_GRIDS_GAP),
          col * (this.boardGridSize + BOARD_GRIDS_GAP)
        )
        this.boardGrids[row][col].drawBoardGrid(
          this.boardGrids[row][col],
          this.boardGridSize,
          ctx
        )
      }
    }
  }

  setBoardGridPosition (boardGrid, x, y) {
    boardGrid.boardGridX = x
    boardGrid.boardGridY = y
  }

  setBoardGridSize (boardGridSize) {
    this.boardGridSize = boardGridSize
  }

  getBoardGridSize () {
    return this.boardGridSize
  }

  getBoardSize () {
    return (
      this.boardGridSize * BOARD_GRIDS_COUNT +
      BOARD_GRIDS_GAP * (BOARD_GRIDS_COUNT - 1)
    )
  }
}
