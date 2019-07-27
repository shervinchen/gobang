import { radiusRect } from './util'

/**
 * 画布类
 */
export default class Canvas {
  /**
   * 获取画布相关属性
   * @constructor
   */
  constructor () {
    // 获得canvas元素
    this.canvas = document.getElementById('canvas')
    // 获得context对象
    this.context = this.canvas.getContext('2d')
  }

  /**
   * 设置画布大小
   * @param {Number} boardSize 棋盘大小
   */
  setCanvasSize (boardSize) {
    this.canvas.width = boardSize
    this.canvas.height = boardSize
  }

  /**
   * 获取画布宽高
   */
  getCanvasSize () {
    return {
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight
    }
  }

  // 判断点是否在路径内
  isInPath (x, y, boardGrid) {
    radiusRect(
      boardGrid.boardGridX,
      boardGrid.boardGridY,
      boardGrid.boardGridSize,
      boardGrid.boardGridSize,
      boardGrid.boardGridRadius,
      this.context
    )
    return this.context.isPointInPath(x, y)
  }
}
