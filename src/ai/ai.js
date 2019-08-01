/*
  AI
  结合搜索、评估后的结果，得出下回合棋子位置
*/
export default class AI {
  constructor () {
    
  }

  getNextStep (gameBoard) {
    // return {row: , col: }
    // const { row, col } = this.getNextStep()
    let row = Math.round(Math.random() * 14)
    let col = Math.round(Math.random() * 14)
    while (gameBoard.boardGrids[row][col].boardGridType !== -1) {
      row = Math.round(Math.random() * 14)
      col = Math.round(Math.random() * 14)
    }
    return {row, col}
  }
}
