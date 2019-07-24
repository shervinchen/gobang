import Chess from './chess'
import Board from './board'
import Canvas from './canvas'
import Player from './player'

/**
 * 游戏主体控制类
 * 初始化棋盘、棋子，定义游戏相关属性、方法
 */
export default class Game {
  constructor () {
    // 是否开始游戏
    this.isGameStart = false
    // 是否结束游戏
    this.isGameEnd = false
  }

  createGame () {
    console.log('game start')
    // 初始化游戏
    this.initGame()
    // 监听游戏事件
    this.listenGame()
    // 选择棋子类型
    // this.selectChess()
  }

  initGame () {
    // 创建画布
    this.canvas = new Canvas()
    // 创建棋盘
    this.board = new Board()
    // 创建棋子
    this.chess = new Chess(0, 0, 0)
    // 初始化画布
    canvas.initCanvas()
    // 初始化棋盘
    board.initBoard()
    // 初始化棋子
    chess.initChess()
  }

  listenGame () {
    if (!this.isGameStart) {
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
    } else {
      
    }
    if (this.isGameStart && !this.isGameEnd) {
      this.board.listenBoard()
    }
  }

  startGame () {}
}
