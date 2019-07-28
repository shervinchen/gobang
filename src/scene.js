import Board from './board'
import { BOARD_GRID_DEFAULT_SIZE,
  BOARD_GRID_RESIZE_COUNT,
  BOARD_GRID_MIN_SIZE,
  BOARD_GRID_MAX_SIZE,
  SCREEN_WIDTH_RANGE } from './constant'

/**
 * 游戏场景类
 */
export default class Scene {
  constructor () {
    // 控制选择棋子、loading等信息的显示
    // 游戏结束后显示“You win/lose! Click ‘图标’ to restart” 以及重新开始按钮图标（用刷新的图标）
    // this.listenScene()

    // 创建棋盘
    this.gameBoard = new Board(this.calculateBoardGridSize())
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

  initScene (gameCanvas) {
    console.log(gameCanvas)
    // 设置画布
    this.setCanvas(gameCanvas)
    // 初始化棋盘
    this.gameBoard.initBoard(gameCanvas.context)
    // 显示场景元素
    this.showSceneEle()
    this.drawSceneEle(this.gameBoard.getBoardGridSize() - BOARD_GRID_DEFAULT_SIZE)
  }

  setCanvas (gameCanvas) {
    // 获取棋盘大小
    const boardSize = this.gameBoard.getBoardSize()
    // 设置画布大小
    gameCanvas.setCanvasSize(boardSize)
  }

  showSceneEle () {
    document.querySelector('#scene').style.display = 'block'
  }

  drawSceneEle (resizeCount) {
    const elements = document.querySelectorAll('.element')
    const infoEle = document.querySelector('.info')
    elements.forEach(element => {
      element.style.width = `${this.gameBoard.getBoardGridSize()}px`
      element.style.height = `${this.gameBoard.getBoardGridSize()}px`
      element.style.lineHeight = `${this.gameBoard.getBoardGridSize()}px`
      element.style.fontSize = `${this.gameBoard.getBoardGridSize()}px`
    })
    infoEle.style.lineHeight = `${this.gameBoard.getBoardGridSize()}px`
    infoEle.style.fontSize = `${parseInt(getComputedStyle(infoEle).fontSize) +
      resizeCount / 2}px`
  }

  /**
   * 添加场景监听器
   */
  addSceneListener (gameCanvas, gameHumanPlayer) {
    // 添加选择棋子监听器
    // this.addSceneChessListener()
    // 添加缩放棋盘监听器
    this.addSceneResizeListener(gameCanvas)
    // 添加棋盘监听器
    this.gameBoard.addBoardListener(gameCanvas, gameHumanPlayer)
    // let play = new Player()
  }

  addSceneChessListener () {
    document.querySelector('#circle').addEventListener('click', () => {
      // this.initPlayer()
    })
    document.querySelector('#cross').addEventListener('click', () => {
      // this.initPlayer()
    })
  }

  addSceneResizeListener (gameCanvas) {
    document.querySelector('#zoomout').addEventListener(
      'click',
      event => {
        if (this.gameBoard.getBoardGridSize() < BOARD_GRID_MAX_SIZE) {
          this.resizeCanvas(BOARD_GRID_RESIZE_COUNT, gameCanvas)
        }
      },
      false
    )
    document.querySelector('#zoomin').addEventListener(
      'click',
      event => {
        if (this.gameBoard.getBoardGridSize() > BOARD_GRID_MIN_SIZE) {
          this.resizeCanvas(-BOARD_GRID_RESIZE_COUNT, gameCanvas)
        }
      },
      false
    )
  }

  resizeCanvas (resizeCount, gameCanvas) {
    // 计算新的棋格大小
    const newBoardGridSize = this.gameBoard.getBoardGridSize() + resizeCount
    // 设置棋格大小
    this.gameBoard.setBoardGridSize(newBoardGridSize)
    // 重新设置画布大小
    this.setCanvas(gameCanvas)
    // 重新绘制场景元素
    this.drawSceneEle(resizeCount)
    // 重新绘制棋格
    this.gameBoard.drawBoardGrids(gameCanvas.context)
    // 重新绘制棋子
  }
}
