import {
  BOARD_GRIDS_COUNT,
} from '../constant'

import { evaluateSingleChessShapes } from './evaluate'

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

    // let row = Math.round(Math.random() * 14)
    // let col = Math.round(Math.random() * 14)
    // while (gameBoard.boardGrids[row][col].boardGridType !== 0) {
    //   row = Math.round(Math.random() * 14)
    //   col = Math.round(Math.random() * 14)
    // }
    // return {row, col}

    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        // console.log(evaluateSingleChessShapes(2, gameBoard.boardGrids, {row, col}))
        gameBoard.boardGrids[row][col].singleChessShapesScore = evaluateSingleChessShapes(2, gameBoard.boardGrids, {row, col})
      }
    }
    
  }
}
