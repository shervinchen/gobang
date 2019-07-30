/*
  AI
  结合搜索、评估后的结果，得出下回合棋子位置
*/
export default class AI {
  constructor () {
    
  }

  getNextStep () {
    // return {row: , col: }
    // const { row, col } = this.getNextStep()
    const row = Math.round(Math.random() * 14)
    const col = Math.round(Math.random() * 14)
    return {row, col}
  }
}
