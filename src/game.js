import Canvas from './canvas'
import Scene from './scene'
import Player from './player'
import Chess from './chess'

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
    this.gameScene.addSceneListener(this.gameCanvas)
  }

  initGame () {
    // 初始化场景
    this.gameScene.initScene(this.gameCanvas)
    // 初始化棋子
    this.gameChess.initChess()
  }

  startGame () {}
}
