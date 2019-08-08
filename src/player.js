import { figureChessShape } from './ai/situation'

/*
  玩家
  定义玩家相关属性，支持人机、人人对战
*/
export default class Player {
  constructor (playerType, playerChessType, playerStatus) {
    // 玩家类型
    this.playerType = playerType
    // 玩家所选棋子
    this.playerChessType = playerChessType
    // 玩家状态
    this.playerStatus = playerStatus
  }

  // setPlayerChess (playerChess) {
  //   this.playerChess = playerChess
  // }

  generatePlayerChess (boardGird, ctx) {
    boardGird.setBoardGridChess(this.playerChessType, ctx)
    this.checkPlayerStatus(boardGird)
  }

  checkPlayerStatus (boardGrid) {
    // 判断当前玩家是否胜利
    // 判断当前玩家的棋子形成的棋型是否连成长连
    if (figureChessShape(this.playerChessType, boardGrid).LONG_ROW !== 0) {
      
    }
    // 如果当前玩家取得胜利 游戏结束
    if (this.playerStatus) {
      this.gameStatus = false
      if (this.playerType === PLAYER_TYPE_HUMAN) {
        // 如果是人类玩家
        // 绘制 you win 文字
      } else if (this.playerType === PLAYER_TYPE_AI) {
        // 如果AI玩家
        // 绘制 you lose 文字
      } else {
        return null
      }
    }
  }

  // generateNextStep(row, col) {}
}
