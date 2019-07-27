import Canvas from './canvas'
import Scene from './scene'
import Player from './player'
import Chess from './chess'
import Board from './board'

/**
 * 游戏主体控制类
 * 初始化棋盘、棋子，定义游戏相关属性、方法
 */
export default class Game {
  constructor () {
    // 创建画布
    this.gameCanvas = new Canvas()
    // 创建场景
    this.gameScene = new Scene()
    // 创建棋盘
    this.gameBoard = new Board()
    // 创建棋子
    this.gameChess = new Chess(0, 0, 0)
    // 是否开始游戏
    // this.isGameStart = false
    // 是否结束游戏
    // this.isGameEnd = false
  }

  createGame () {
    console.log('game start')
    // 初始化游戏
    this.initGame()
    // 监听游戏事件
    this.listenGame()
  }

  initGame () {
    // 获取棋盘大小
    const boardSize = this.gameBoard.getBoardSize()
    // 设置画布大小
    this.gameCanvas.setCanvasSize(boardSize)
    // 初始化场景
    // this.scene.drawScene()
    // 初始化棋盘
    this.gameBoard.initBoard(this.gameCanvas.context)
    // 初始化棋子
    this.gameChess.initChess()
  }

  listenGame () {
    // 监听场景事件
    // this.listenScene()
    // 监听棋盘事件
    this.gameBoard.listenBoard(this.gameCanvas.canvas)
  }

  /**
   * 监听场景
   */
  listenScene () {
    // 选择棋子类型
    // this.selectChess()
    // let play = new Player()
    document.querySelector('#circle').addEventListener(
      'click',
      () => {
        // this.initPlayer()
      },
      false
    )
    document.querySelector('#cross').addEventListener('click', () => {
      // this.initPlayer()
    })
  }

  startGame () {}
}
