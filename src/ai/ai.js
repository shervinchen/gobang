/*
  AI
  结合搜索、评估后的结果，得出下回合棋子位置
*/
export default class AI {
  constructor (aiChess) {
    this.aiChess = aiChess
  }

  generateAIChess (gameBoard, ctx) {
    // return {row: , col: }
    // const { row, col } = this.getNextStep()
    const row = Math.round(Math.random() * 14)
    const col = Math.round(Math.random() * 14)
    gameBoard.boardGrids[row][col].drawBoardGridChess(this.aiChess, ctx)
  }
}
