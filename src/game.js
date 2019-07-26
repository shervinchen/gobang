import Canvas from './canvas'
import Scene from './scene'
import Player from './player'
import Chess from './chess'
import Board from './board'

// 棋盘格子大小
const BOARD_GRID_SIZE = 30

/**
 * 游戏主体控制类
 * 初始化棋盘、棋子，定义游戏相关属性、方法
 */
export default class Game {
  constructor () {
    // 创建画布
    this.canvas = new Canvas()
    // 创建场景
    this.scene = new Scene()
    // 创建棋盘
    this.board = new Board(BOARD_GRID_SIZE)
    // 创建棋子
    this.chess = new Chess(0, 0, 0)
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
    let boardSize = this.board.getBoardSize()
    // 设置画布大小
    this.canvas.setCanvasSize(boardSize)
    // 初始化场景
    // this.scene.drawScene()
    // 绘制棋盘
    this.board.drawBoard(this.canvas.context)
    // 初始化棋子
    this.chess.initChess()
  }

  listenGame () {
    // 监听场景事件
    // this.listenScene()
    // 监听棋盘事件
    // this.listenBoard()
  }

  /**
   * 监听场景
   */
  listenScene() {
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

  /**
   * 监听棋盘
   */
  listenBoard() {
    document.querySelector('#board').addEventListener('click', () => {

    })
  }

  startGame () {}
}
