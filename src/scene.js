import {
  BOARD_GRID_DEFAULT_SIZE,
  BOARD_GRIDS_COUNT,
  BOARD_GRIDS_GAP,
  SCREEN_WIDTH_RANGE,
  BOARD_GRID_RESIZE_COUNT,
  BOARD_GRID_CHESS_DEFAULT_SIZE,
  BOARD_GRID_CHESS_DEFAULT_LINEWIDTH
} from './constant'

/**
 * 游戏场景类
 */
export default class Scene {
  constructor () {
    // 控制选择棋子、loading等信息的显示
    // 游戏结束后显示“You win/lose! Click ‘图标’ to restart” 以及重新开始按钮图标（用刷新的图标）
    // this.listenScene()
  }

  initScene (gameBoard) {
    // 显示场景元素
    this.showSceneEle()
    this.drawSceneEle(
      gameBoard,
      gameBoard.boardGrids[0][0].boardGridSize - BOARD_GRID_DEFAULT_SIZE
    )
  }

  showSceneEle () {
    document.querySelector('#scene').style.display = 'block'
  }

  drawSceneEle (newBoardGridSize, resizeCount) {
    const elements = document.querySelectorAll('.element')
    const infoEle = document.querySelector('.info')
    elements.forEach(element => {
      element.style.width = `${newBoardGridSize}px`
      element.style.height = `${newBoardGridSize}px`
      element.style.lineHeight = `${newBoardGridSize}px`
      element.style.fontSize = `${newBoardGridSize}px`
    })
    infoEle.style.lineHeight = `${newBoardGridSize}px`
    infoEle.style.fontSize = `${parseInt(getComputedStyle(infoEle).fontSize) +
      resizeCount / 2}px`
  }

  resizeScene (
    gameBoard,
    resizeCount,
    gameCanvas
  ) {
    // 计算新的棋格大小
    const newBoardGridSize = gameBoard.boardGrids[0][0].boardGridSize + resizeCount
    // 重新获取棋盘大小
    const boardSize = gameBoard.getBoardSize(newBoardGridSize)
    // 重新设置画布大小
    gameCanvas.setCanvasSize(boardSize)
    // 重新绘制场景元素
    this.drawSceneEle(newBoardGridSize, resizeCount)
    // 重设棋格与棋子
    this.resizeBoardGrid(gameBoard, newBoardGridSize, gameCanvas)
  }

  resizeBoardGrid (gameBoard, newBoardGridSize, gameCanvas) {
    const { chessSize, chessLineWidth } = this.calculateBoardGridChessProperty(newBoardGridSize)
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        // 重新设置棋格大小
        const boardGrid = gameBoard.boardGrids[row][col]
        boardGrid.setBoardGridSize(newBoardGridSize)
        // 重新设置棋格位置
        boardGrid.setBoardGridPosition(
          row * (newBoardGridSize + BOARD_GRIDS_GAP),
          col * (newBoardGridSize + BOARD_GRIDS_GAP)
        )
        // 重新绘制棋格与棋子
        boardGrid.redrawBoardGrid(gameCanvas.context)
        boardGrid.redrawBoardGridChess(
          chessSize, chessLineWidth,
          gameCanvas.context
        )
      }
    }
  }

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
