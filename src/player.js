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

  generatePlayerChess (boardGrids, position, ctx, playerSteps, gameAI, aiChessType) {
    boardGrids[position.row][position.col].setBoardGridChess(this.playerChessType, ctx)
    // gameAI.zobrist.go(position.row, position.col, aiChessType, this.playerChessType)
    playerSteps.push(boardGrids[position.row][position.col])
  }

  // generateNextStep(row, col) {}
}
