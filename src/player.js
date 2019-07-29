// import AI from './ai/ai'

/*
  玩家
  定义玩家相关属性，支持人机、人人对战
*/
export default class Player {
  constructor (playerChessType) {
    // 玩家所选棋子
    this.playerChessType = playerChessType
  }

  setPlayerChessType (playerChessType) {
    this.playerChessType = playerChessType
  }

  generatePlayerChess (boardGird, gameChess) {
    boardGird.drawBoardGridChess(this.playerChessType, gameChess)
  }

  // generateNextStep(row, col) {}
}
