/*
  玩家
  定义玩家相关属性，支持人机、人人对战
*/
export default class Player {
  constructor (chessType) {
    // 玩家类型
    // this.playerType = playerType
    // 玩家所选棋子
    this.chessType = chessType
  }

  setPlayerChessType (chessType) {
    this.chessType = chessType
  }

  generatePlayerChess (boardGird, boardGridSize, gameChess, ctx) {
    boardGird.drawBoardGridChess(this.chessType, boardGridSize, gameChess, ctx)
  }

  // generateNextStep(row, col) {}
}
