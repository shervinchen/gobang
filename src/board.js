import BoardGrid from './boardGird'
import Chess from './chess'
import {
  BOARD_GRIDS_COUNT,
  BOARD_GRIDS_GAP,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_RADIUS
} from './constant'

/**
 * 棋盘类
 *
 * @export
 * @class Board
 */
export default class Board {
  /**
   * 定义棋盘属性
   * @constructor
   */
  // constructor () {}

  /**
   * 初始化棋格状态
   */
  initBoardGrids (boardGridSize, chessSize, chessLineWidth, ctx) {
    this.boardGrids = []
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      this.boardGrids[row] = []
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        // 创建棋格
        this.boardGrids[row][col] = new BoardGrid(
          row * (boardGridSize + BOARD_GRIDS_GAP),
          col * (boardGridSize + BOARD_GRIDS_GAP),
          boardGridSize,
          BOARD_GRID_TYPE_DEFAULT,
          new Chess(BOARD_GRID_TYPE_DEFAULT, chessSize, chessLineWidth),
          BOARD_GRID_RADIUS
        )
        // 绘制棋格
        this.boardGrids[row][col].drawBoardGrid(ctx)
      }
    }
  }

  resetBoardGrids (ctx) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        this.boardGrids[row][col].boardGridType = BOARD_GRID_TYPE_DEFAULT
        this.boardGrids[row][
          col
        ].boardGridChess.chessType = BOARD_GRID_TYPE_DEFAULT
        this.boardGrids[row][col].drawBoardGrid(ctx)
      }
    }
  }

  getBoardSize (boardGridSize) {
    return (
      boardGridSize * BOARD_GRIDS_COUNT +
      BOARD_GRIDS_GAP * (BOARD_GRIDS_COUNT - 1)
    )
  }
}
