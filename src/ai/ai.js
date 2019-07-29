/*
  AI
  结合搜索、评估后的结果，得出下回合棋子位置
*/
export default class AI {
  constructor (chessType) {
    this.chessType = chessType
  }

  generateAIChess (gameBoard, boardGridSize, gameChess, ctx) {
    // return {row: , col: }
    // const { row, col } = this.getNextStep()
    const row = Math.round(Math.random() * 14)
    const col = Math.round(Math.random() * 14)
    gameBoard.boardGrids[row][col].drawBoardGridChess(this.chessType, boardGridSize, gameChess, ctx)
  }
}
