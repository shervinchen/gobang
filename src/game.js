import Canvas from './canvas'
import Scene from './scene'
import Board from './board'
import Player from './player'
import AI from './ai/ai'
import Chess from './chess'
import {
  CHESS_TYPE_CROSS,
  CHESS_TYPE_CIRCLE,
  BOARD_GRIDS_COUNT,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_MIN_SIZE,
  BOARD_GRID_RESIZE_COUNT,
  BOARD_GRID_MAX_SIZE
} from './constant'

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
    // 计算场景各元素尺寸样式
    const {
      chessSize,
      chessLineWidth
    } = this.gameScene.calculateScene()
    // 创建棋盘
    this.gameBoard = new Board()
    // 创建人类玩家 默认玩家为 cross 棋子
    this.gameHumanPlayer = new Player(new Chess(CHESS_TYPE_CROSS, chessSize, chessLineWidth))
    // 创建AI玩家 默认AI为 circle 棋子
    this.gameAIPlayer = new Player(new Chess(CHESS_TYPE_CIRCLE, chessSize, chessLineWidth))
    // 创建AI
    this.gameAI = new AI()
    // 创建棋子
    // this.gameChess = new Chess(chessSize, chessLineWidth)
    // 是否开始游戏
    // this.isGameStart = false
    // 是否结束游戏
    // this.isGameEnd = false
  }

  createGame () {
    console.log('game start')
    // 初始化游戏
    this.initGame()
    // 添加场景监听器
    this.addSceneListener()
    // 添加棋盘监听器
    this.addBoardListener()
  }

  /**
   * 添加场景监听器
   */
  addSceneListener () {
    // 添加选择棋子监听器
    // this.addSceneChessListener()
    // 添加缩放棋盘监听器
    this.addSceneResizeListener()
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

  addSceneResizeListener () {
    document.querySelector('#zoomout').addEventListener(
      'click',
      event => {
        if (this.gameBoard.getBoardGridSize() <= BOARD_GRID_MAX_SIZE) {
          this.gameScene.resizeCanvas(
            this.gameBoard,
            this.gameHumanPlayer.playerChess,
            this.gameAIPlayer.playerChess,
            BOARD_GRID_RESIZE_COUNT,
            this.gameCanvas
          )
        }
      },
      false
    )
    document.querySelector('#zoomin').addEventListener(
      'click',
      event => {
        if (this.gameBoard.getBoardGridSize() >= BOARD_GRID_MIN_SIZE) {
          this.gameScene.resizeCanvas(
            this.gameBoard,
            this.gameHumanPlayer.playerChess,
            this.gameAIPlayer.playerChess,
            -BOARD_GRID_RESIZE_COUNT,
            this.gameCanvas
          )
        }
      },
      false
    )
  }

  /**
   * 监听棋盘
   */
  addBoardListener () {
    this.gameCanvas.canvas.addEventListener(
      'click',
      event => {
        this.onClickBoard(event)
      },
      false
    )
  }

  onClickBoard (event) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        if (
          this.gameBoard.boardGrids[row][col].isInBoardGird(
            event.clientX,
            event.clientY,
            this.gameCanvas
          )
        ) {
          // console.log(event.offsetX,
          //   event.offsetY)
          if (
            this.gameBoard.boardGrids[row][col].boardGridType !==
            BOARD_GRID_TYPE_DEFAULT
          ) {
            return
          }
          this.gameHumanPlayer.generatePlayerChess(
            this.gameBoard.boardGrids[row][col],
            this.gameCanvas.context
          )
          // 判断玩家是否连成五子或五子以上
          // 如果玩家取得胜利 游戏结束
          
          // 如果未结束 调用AI类 获取AI计算后的落棋位置
          this.gameAIPlayer.generatePlayerChess(
            this.gameBoard.boardGrids[this.gameAI.getNextStep().row][this.gameAI.getNextStep().col],
            this.gameCanvas.context)
          console.log(row, col)
          return
        }
      }
    }
  }

  initGame () {
    // 初始化场景
    this.gameScene.initScene(this.gameBoard, this.gameCanvas)
    // 初始化棋子
    // this.gameChess.initChess()
  }

  startGame () {}
}
