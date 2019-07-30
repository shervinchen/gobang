import BoardGrid from './boardGird'
import {
  BOARD_GRIDS_COUNT,
  BOARD_GRIDS_GAP,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_TYPE_CIRCLE,
  BOARD_GRID_TYPE_CROSS,
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
  constructor () {}

  initBoard (boardGridSize, ctx) {
    // 初始化棋格状态
    this.boardGrids = this.initBoardGrids(boardGridSize, ctx)
    console.log(this.boardGrids)
  }

  /**
   * 初始化棋格状态
   */
  initBoardGrids (boardGridSize, ctx) {
    const grids = []
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      grids[row] = []
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        // 创建棋格
        grids[row][col] = new BoardGrid(
          row * (boardGridSize + BOARD_GRIDS_GAP),
          col * (boardGridSize + BOARD_GRIDS_GAP),
          boardGridSize,
          BOARD_GRID_TYPE_DEFAULT,
          BOARD_GRID_RADIUS
        )
        // 绘制棋格
        grids[row][col].drawBoardGrid(ctx)
      }
    }
    return grids
  }

  drawBoardGrids (ctx) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        this.boardGrids[row][col].setBoardGridPosition(
          row * (this.boardGrids[row][col].boardGridSize + BOARD_GRIDS_GAP),
          col * (this.boardGrids[row][col].boardGridSize + BOARD_GRIDS_GAP)
        )
        this.boardGrids[row][col].drawBoardGrid(ctx)
      }
    }
  }

  drawBoardGridsChess (playerChess, aiChess, chessSize, chessLineWidth, ctx) {

    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        if (
          this.boardGrids[row][col].boardGridType !== BOARD_GRID_TYPE_DEFAULT
        ) {
          if (this.boardGrids[row][col].boardGridType === playerChess.chessType) {
            this.boardGrids[row][col].setBoardGridChessProperty(playerChess, chessSize, chessLineWidth)
            this.boardGrids[row][col].drawBoardGridChess(
              playerChess,
              ctx
            )
          } else if (this.boardGrids[row][col].boardGridType === aiChess.chessType) {
            this.boardGrids[row][col].setBoardGridChessProperty(aiChess, chessSize, chessLineWidth)
            this.boardGrids[row][col].drawBoardGridChess(
              aiChess,
              ctx
            )
          } else {
            continue
          }
        } else {
          continue
        }
      }
    }
  }

  setBoardGridsSize (boardGridSize) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        this.boardGrids[row][col].setBoardGridSize(boardGridSize)
      }
    }
  }

  getBoardGridSize () {
    return this.boardGrids[0][0].boardGridSize
  }

  getBoardSize (boardGridSize) {
    return (
      boardGridSize * BOARD_GRIDS_COUNT +
      BOARD_GRIDS_GAP * (BOARD_GRIDS_COUNT - 1)
    )
  }
}
