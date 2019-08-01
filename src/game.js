import Canvas from './canvas'
import Scene from './scene'
import Board from './board'
import Player from './player'
import AI from './ai/ai'
import { checkChessShape } from './ai/situation'
import Chess from './chess'
import {
  CHESS_TYPE_CROSS,
  CHESS_TYPE_CIRCLE,
  BOARD_GRIDS_COUNT,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_MIN_SIZE,
  BOARD_GRID_RESIZE_COUNT,
  BOARD_GRID_MAX_SIZE,
  PLAYER_TYPE_HUMAN,
  PLAYER_TYPE_AI
} from './constant'

/**
 * 游戏主体控制类
 * 初始化棋盘、棋子，定义游戏相关属性、方法
 * 本五子棋采用无禁手的原始规则（Free-style），规则具体细节可参考wiki
 */
export default class Game {
  constructor () {
    // 创建画布
    this.gameCanvas = new Canvas()
    // 创建场景
    this.gameScene = new Scene()
    // 创建棋盘
    this.gameBoard = new Board()
    // 创建AI
    this.gameAI = new AI()
  }

  initGame () {
    // 游戏状态
    this.gameStatus = true
    // 初始化游戏画布
    this.initGameCanvas()
    // 初始化游戏棋盘
    this.initGameBoard()
    // 是否开始游戏
    // this.isGameStart = false
    // 是否结束游戏
    // this.isGameEnd = false
  }

  initGamePlayer (humanPlayerChess) {
    // 获取AI玩家棋子
    const aiPlayerChess = this.initGameAIPlayerChess(humanPlayerChess.chessType)
    // 创建人类玩家
    this.gameHumanPlayer = new Player(
      PLAYER_TYPE_HUMAN,
      humanPlayerChess,
      false
    )
    // 创建AI玩家 默认AI为 circle 棋子
    this.gameAIPlayer = new Player(PLAYER_TYPE_AI, aiPlayerChess, false)
  }

  createGame () {
    console.log('game start')
    const humanPlayerChess = this.initGameHumanPlayerChess(CHESS_TYPE_CROSS)
    // 初始化游戏玩家 默认人类玩家为 cross 棋子
    this.initGamePlayer(humanPlayerChess)
    // 初始化游戏
    this.initGame()
    // 初始化游戏场景
    this.initGameScene()
    // 添加场景监听器
    this.addGameSceneListener()
    // 添加棋盘监听器
    this.addBoardListener()
  }

  initGameScene () {
    // 初始化场景
    this.gameScene.initScene(this.gameBoard)
  }

  initGameCanvas () {
    // console.log(gameBoard)
    const boardGridSize = this.gameScene.calculateScene().boardGridSize
    // 获取棋盘大小
    const boardSize = this.gameBoard.getBoardSize(boardGridSize)
    // 设置画布大小
    this.gameCanvas.setCanvasSize(boardSize)
  }

  initGameBoard () {
    const boardGridSize = this.gameScene.calculateScene().boardGridSize
    this.gameBoard.initBoard(boardGridSize, this.gameCanvas.context)
  }

  initGameChess (chessType) {
    // 计算场景各元素尺寸样式
    const { chessSize, chessLineWidth } = this.gameScene.calculateScene()
    // 创建对应类型的棋子
    return new Chess(chessType, chessSize, chessLineWidth)
  }

  initGameHumanPlayerChess (humanPlayerChessType) {
    return this.initGameChess(humanPlayerChessType)
  }

  initGameAIPlayerChess (humanPlayerChessType) {
    // 根据人类玩家棋子类型判断AI玩家棋子类型
    let aiPlayerChess = null
    if (humanPlayerChessType === CHESS_TYPE_CROSS) {
      aiPlayerChess = this.initGameChess(CHESS_TYPE_CIRCLE)
    } else if (humanPlayerChessType === CHESS_TYPE_CIRCLE) {
      aiPlayerChess = this.initGameChess(CHESS_TYPE_CROSS)
    } else {
      return null
    }
    return aiPlayerChess
  }

  /**
   * 添加场景监听器
   */
  addGameSceneListener () {
    // 添加选择棋子监听器
    this.addGameSceneChessListener()
    // 添加缩放棋盘监听器
    this.addGameSceneResizeListener()
  }

  addGameSceneChessListener () {
    this.addGameSceneChessCrossListener()
    this.addGameSceneChessCircleListener()
  }

  addGameSceneChessCrossListener () {
    document.querySelector('#cross').addEventListener(
      'click',
      () => {
        this.initGamePlayer(this.initGameHumanPlayerChess(CHESS_TYPE_CROSS))
        this.initGame()
      },
      false
    )
  }

  addGameSceneChessCircleListener () {
    document.querySelector('#circle').addEventListener(
      'click',
      () => {
        this.initGamePlayer(this.initGameHumanPlayerChess(CHESS_TYPE_CIRCLE))
        this.initGame()
        this.generateGameAIPlayerChess(this.getGameAIFistStep())
      },
      false
    )
  }

  getGameAIFistStep () {
    // AI玩家先手，默认让AI落子到中心位置 （以后换成花月、浦月等固定开局，从开局库读取）
    const row = (BOARD_GRIDS_COUNT - 1) / 2
    const col = (BOARD_GRIDS_COUNT - 1) / 2
    return this.gameBoard.boardGrids[row][
      col
    ]
  }

  addGameSceneResizeListener () {
    this.addGameSceneZoomOutListener()
    this.addGameSceneZoomInListener()
  }

  addGameSceneZoomOutListener () {
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
  }

  addGameSceneZoomInListener () {
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
        const boardGrid = this.gameBoard.boardGrids[row][col]
        if (
          boardGrid.isInBoardGird(event.clientX, event.clientY, this.gameCanvas)
        ) {
          if (boardGrid.boardGridType !== BOARD_GRID_TYPE_DEFAULT) {
            return
          }
          this.generateGameHumanPlayerChess(boardGrid)
          // 如果未结束 调用AI类 获取AI计算后的落棋位置
          this.generateGameAIPlayerChess(this.getGameAINextStep())
          return
        }
      }
    }
  }

  getGameAINextStep () {
    // 调用AI模块获取下一步的棋格位置
    const { row, col } = this.gameAI.getNextStep(this.gameBoard)
    return this.gameBoard.boardGrids[row][col]
  }

  generateGameHumanPlayerChess (boardGrid) {
    this.gameHumanPlayer.generatePlayerChess(boardGrid, this.gameCanvas.context)
    this.checkGamePlayerStatus(this.gameHumanPlayer, boardGrid)
  }

  generateGameAIPlayerChess (boardGrid) {
    this.gameAIPlayer.generatePlayerChess(boardGrid, this.gameCanvas.context)
    this.checkGamePlayerStatus(this.gameAIPlayer, boardGrid)
  }

  checkGamePlayerStatus (gamePlayer, boardGrid) {
    // 判断当前玩家是否胜利
    this.checkGameStatus(boardGrid)
    // 如果当前玩家取得胜利 游戏结束
    if (gamePlayer.playerStatus) {
      this.gameStatus = false
      if (gamePlayer.playerType === PLAYER_TYPE_HUMAN) {
        // 如果是人类玩家
        // 绘制 you win 文字
      } else if (gamePlayer.playerType === PLAYER_TYPE_AI) {
        // 如果AI玩家
        // 绘制 you lose 文字
      } else {
        return null
      }
    }
  }

  checkGameStatus (boardGrid) {
    // 判断当前玩家的棋子形成的棋型是否连成长连
    this.gameBoard.checkChessShape(boardGrid)
  }

  startGame () {}
}
