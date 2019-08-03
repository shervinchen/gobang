import {
  BOARD_GRID_DEFAULT_SIZE,
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
      gameBoard.getBoardGrid().boardGridSize - BOARD_GRID_DEFAULT_SIZE
    )
  }

  showSceneEle () {
    document.querySelector('#scene').style.display = 'block'
  }

  drawSceneEle (gameBoard, resizeCount) {
    const elements = document.querySelectorAll('.element')
    const infoEle = document.querySelector('.info')
    elements.forEach(element => {
      element.style.width = `${gameBoard.getBoardGrid().boardGridSize}px`
      element.style.height = `${gameBoard.getBoardGrid().boardGridSize}px`
      element.style.lineHeight = `${gameBoard.getBoardGrid().boardGridSize}px`
      element.style.fontSize = `${gameBoard.getBoardGrid().boardGridSize}px`
    })
    infoEle.style.lineHeight = `${gameBoard.getBoardGrid().boardGridSize}px`
    infoEle.style.fontSize = `${parseInt(getComputedStyle(infoEle).fontSize) +
      resizeCount / 2}px`
  }

  resizeCanvas (
    gameBoard,
    resizeCount,
    gameCanvas
  ) {
    // 计算新的棋格大小
    const newBoardGridSize = gameBoard.getBoardGrid().boardGridSize + resizeCount
    // 重新设置棋格大小
    gameBoard.setBoardGridsSize(newBoardGridSize)
    // 重新获取棋盘大小
    const boardSize = gameBoard.getBoardSize(gameBoard.getBoardGrid().boardGridSize)
    // 重新设置画布大小
    gameCanvas.setCanvasSize(boardSize)
    // 重新绘制场景元素
    this.drawSceneEle(gameBoard, resizeCount)
    // 重新绘制棋格与棋子
    gameBoard.redrawBoardGrids(
      gameCanvas.context
    )
  }
}
