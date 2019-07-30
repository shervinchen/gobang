/*
  玩家
  定义玩家相关属性，支持人机、人人对战
*/
export default class Player {
  constructor (playerChess) {
    // 玩家类型
    // this.playerType = playerType
    // 玩家所选棋子
    this.playerChess = playerChess
  }

  // setPlayerChess (playerChess) {
  //   this.playerChess = playerChess
  // }

  generatePlayerChess (boardGird, ctx) {
    boardGird.drawBoardGridChess(this.playerChess, ctx)
  }

  // generateNextStep(row, col) {}
}
