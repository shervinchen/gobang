import BoardGrid from './boardGird'

/**
 * 棋盘类
 */

// 每行、每列棋格数
const BOARD_GRIDS_COUNT = 15

// 棋格间隙
const BOARD_GRIDS_GAP = 1

// 棋格大小
const BOARD_GRIDS_SIZE = 30

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
  constructor () {}

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
          row * (BOARD_GRIDS_SIZE + BOARD_GRIDS_GAP),
          col * (BOARD_GRIDS_SIZE + BOARD_GRIDS_GAP),
          BOARD_GRID_TYPE_DEFAULT,
          BOARD_GRIDS_SIZE,
          BOARD_GRID_RADIUS
        )
        // 绘制棋格
        grids[row][col].drawBoardGrid(
          row * (BOARD_GRIDS_SIZE + BOARD_GRIDS_GAP),
          col * (BOARD_GRIDS_SIZE + BOARD_GRIDS_GAP),
          ctx
        )
      }
    }
    return grids
  }

  /**
   * 监听棋盘
   */
  listenBoard (gameCanvas) {
    gameCanvas.canvas.addEventListener('click', (e) => {
      console.log(e)
      for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
        for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
          if (gameCanvas.isInPath(e.offsetX, e.offsetY, this.boardGrids[row][col])) {
            if (this.boardGrids[row][col].boardGridType !== BOARD_GRID_TYPE_DEFAULT) {
              return
            }
            console.log(row, col)
          }
        }
      }
    })
  }

  getBoardSize () {
    return (
      BOARD_GRIDS_SIZE * BOARD_GRIDS_COUNT +
      BOARD_GRIDS_GAP * (BOARD_GRIDS_COUNT - 1)
    )
  }
}
