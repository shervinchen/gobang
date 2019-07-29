import { BOARD_GRID_DEFAULT_SIZE,
  BOARD_GRID_CHESS_DEFAULT_SIZE,
  BOARD_GRID_RESIZE_COUNT,
  SCREEN_WIDTH_RANGE } from './constant'

/**
 * 游戏场景类
 */
export default class Scene {
  constructor () {
    // 控制选择棋子、loading等信息的显示
    // 游戏结束后显示“You win/lose! Click ‘图标’ to restart” 以及重新开始按钮图标（用刷新的图标）
    // this.listenScene()
  }

  calculateBoardGridSize () {
    let boardGridSize = BOARD_GRID_DEFAULT_SIZE
    // 根据当前屏幕宽度来动态适配棋格大小
    const clientWidth = document.body.clientWidth
    if (clientWidth > SCREEN_WIDTH_RANGE[1] - 1 && clientWidth < SCREEN_WIDTH_RANGE[0]) {
      boardGridSize = BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT
    } else if (clientWidth > SCREEN_WIDTH_RANGE[2] - 1 && clientWidth < SCREEN_WIDTH_RANGE[1]) {
      boardGridSize = BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 2
    } else if (clientWidth > SCREEN_WIDTH_RANGE[3] - 1 && clientWidth < SCREEN_WIDTH_RANGE[2]) {
      boardGridSize = BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 3
    } else if (clientWidth < SCREEN_WIDTH_RANGE[3]) {
      boardGridSize = BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 4
    } else {
      boardGridSize = BOARD_GRID_DEFAULT_SIZE
    }
    return boardGridSize
  }

  calculateBoardGridChessSize (gameBoard) {
    return gameBoard.getBoardGridSize() - (BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_CHESS_DEFAULT_SIZE)
  }

  initScene (gameBoard, gameCanvas) {
    // 设置画布
    this.setCanvas(gameBoard, gameCanvas)
    // 初始化棋盘
    gameBoard.initBoard(gameCanvas.context)
    // 显示场景元素
    this.showSceneEle()
    this.drawSceneEle(gameBoard, gameBoard.getBoardGridSize() - BOARD_GRID_DEFAULT_SIZE)
  }

  setCanvas (gameBoard, gameCanvas) {
    // console.log(gameBoard)
    // 获取棋盘大小
    const boardSize = gameBoard.getBoardSize()
    // 设置画布大小
    gameCanvas.setCanvasSize(boardSize)
  }

  showSceneEle () {
    document.querySelector('#scene').style.display = 'block'
  }

  drawSceneEle (gameBoard, resizeCount) {
    const elements = document.querySelectorAll('.element')
    const infoEle = document.querySelector('.info')
    elements.forEach(element => {
      element.style.width = `${gameBoard.getBoardGridSize()}px`
      element.style.height = `${gameBoard.getBoardGridSize()}px`
      element.style.lineHeight = `${gameBoard.getBoardGridSize()}px`
      element.style.fontSize = `${gameBoard.getBoardGridSize()}px`
    })
    infoEle.style.lineHeight = `${gameBoard.getBoardGridSize()}px`
    infoEle.style.fontSize = `${parseInt(getComputedStyle(infoEle).fontSize) +
      resizeCount / 2}px`
  }

  resizeCanvas (gameBoard, resizeCount, gameCanvas) {
    // 计算新的棋格大小
    const newBoardGridSize = gameBoard.getBoardGridSize() + resizeCount
    // 设置棋格大小
    gameBoard.setBoardGridSize(newBoardGridSize)
    // 重新设置画布大小
    this.setCanvas(gameBoard, gameCanvas)
    // 重新绘制场景元素
    this.drawSceneEle(gameBoard, resizeCount)
    // 重新绘制棋格
    gameBoard.drawBoardGrids(gameCanvas.context)
    // 重新绘制棋子
  }
}
