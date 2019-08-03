import BoardGrid from './boardGird'
import Chess from './chess'
import {
  BOARD_GRIDS_COUNT,
  BOARD_GRIDS_GAP,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_RADIUS,
  BOARD_GRID_CHESS_DEFAULT_SIZE,
  BOARD_GRID_RESIZE_COUNT,
  BOARD_GRID_CHESS_DEFAULT_LINEWIDTH,
  SCREEN_WIDTH_RANGE,
  BOARD_GRID_DEFAULT_SIZE
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
  constructor () {
    this.boardSize = this.getBoardSize(this.calculateBoardGridProperty())
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
    // 计算场景各元素尺寸样式
    const boardGridSize = this.calculateBoardGridProperty()
    const {
      chessSize,
      chessLineWidth
    } = this.calculateBoardGridChessProperty(
      boardGridSize
    )
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
          new Chess(BOARD_GRID_TYPE_DEFAULT, chessSize, chessLineWidth),
          BOARD_GRID_RADIUS
        )
        // 绘制棋格
        grids[row][col].drawBoardGrid(ctx)
      }
    }
    return grids
  }

  resetBoardGrids (ctx) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        this.boardGrids[row][col].boardGridType = BOARD_GRID_TYPE_DEFAULT
        this.boardGrids[row][col].boardGridChess.chessType = BOARD_GRID_TYPE_DEFAULT
        this.boardGrids[row][col].drawBoardGrid(ctx)
      }
    }
  }

  redrawBoardGrids (
    ctx
  ) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        this.boardGrids[row][col].setBoardGridPosition(
          row * (this.boardGrids[row][col].boardGridSize + BOARD_GRIDS_GAP),
          col * (this.boardGrids[row][col].boardGridSize + BOARD_GRIDS_GAP)
        )
        this.boardGrids[row][col].drawBoardGrid(ctx)
        this.drawBoardChess(
          this.boardGrids[row][col],
          ctx
        )
      }
    }
  }

  drawBoardChess (
    boardGird,
    ctx
  ) {
    if (boardGird.boardGridChess !== -1) {
      const { chessSize, chessLineWidth } = this.calculateBoardGridChessProperty(boardGird.boardGridSize)
      boardGird.setBoardGridChess(chessSize, chessLineWidth)
      boardGird.drawBoardGridChess(ctx)
    }
  }

  setBoardGridsSize (boardGridSize) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        this.boardGrids[row][col].setBoardGridSize(boardGridSize)
      }
    }
  }

  getBoardGrid () {
    return this.boardGrids[0][0]
  }

  getBoardSize (boardGridSize) {
    return (
      boardGridSize * BOARD_GRIDS_COUNT +
      BOARD_GRIDS_GAP * (BOARD_GRIDS_COUNT - 1)
    )
  }

  // calculateBoardProperty () {
  //   const boardGridSize = this.calculateBoardGridProperty()
  //   return boardGridSize
  // }

  calculateBoardGridProperty () {
    // 计算游戏棋格相关属性
    let boardGridSize = BOARD_GRID_DEFAULT_SIZE
    // 根据当前屏幕宽度来动态适配棋格大小
    const clientWidth = document.body.clientWidth
    const sizes = [
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT,
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT,
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 2,
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 3,
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 4
    ]
    for (let i = 0; i < sizes.length; i++) {
      if (clientWidth < SCREEN_WIDTH_RANGE[i]) {
        boardGridSize = sizes[i]
      }
    }
    return boardGridSize
  }

  calculateBoardGridChessProperty (boardGridSize) {
    let chessLineWidth = BOARD_GRID_CHESS_DEFAULT_LINEWIDTH
    const percentSize = BOARD_GRID_CHESS_DEFAULT_SIZE / BOARD_GRID_DEFAULT_SIZE
    // 让棋子半径为偶数，防止绘制出现bug
    let chessSize = Math.round(boardGridSize * percentSize)
    chessSize = chessSize % 2 === 0 ? chessSize : chessSize - 1
    // 根据当前棋格大小获取棋子线宽
    if (boardGridSize < BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT) {
      chessLineWidth = BOARD_GRID_CHESS_DEFAULT_LINEWIDTH - 1
    } else {
      chessLineWidth = BOARD_GRID_CHESS_DEFAULT_LINEWIDTH
    }
    return {
      chessSize,
      chessLineWidth
    }
  }
}
