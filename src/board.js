import BoardGrid from './boardGird'

/**
 * 棋盘类
 */

// 每行、每列棋格数
const BOARD_GRIDS_COUNT = 15

// 棋格间隙
const BOARD_GRIDS_GAP = 1

// 棋格类型
const BOARD_GRID_TYPE_DEFAULT = -1
const BOARD_GRID_TYPE_CIRCLE = 0
const BOARD_GRID_TYPE_CROSS = 1

// 棋格圆角弧度
const BOARD_GRID_RADIUS = 4

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

  /**
   * 监听棋盘
   */
  addBoardListener (gameCanvas) {
    gameCanvas.canvas.addEventListener(
      'click',
      event => {
        this.onClickBoard(gameCanvas, event)
      },
      false
    )
  }

  onClickBoard (gameCanvas, event) {
    console.log(gameCanvas, event)
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        if (
          this.boardGrids[row][col].isInBoardGird(
            event.offsetX,
            event.offsetY,
            this.boardGrids[row][col],
            this.boardGridSize,
            gameCanvas.context
          )
        ) {
          if (
            this.boardGrids[row][col].boardGridType !== BOARD_GRID_TYPE_DEFAULT
          ) {
            return
          }
          console.log(row, col)
        }
      }
    }
  }

  getBoardSize () {
    return (
      this.boardGridSize * BOARD_GRIDS_COUNT +
      BOARD_GRIDS_GAP * (BOARD_GRIDS_COUNT - 1)
    )
  }
}
