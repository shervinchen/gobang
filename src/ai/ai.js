import {
  BOARD_GRIDS_COUNT,
  INFINITY
} from '../constant'

import { evaluateSingleChessShapes, evaluateAllChessShapes } from './evaluate'

import { negamax, minimax, alphaBeta, generateLegalMoves } from './search'

/*
  AI
  结合搜索、评估后的结果，得出下回合棋子位置
*/
export default class AI {
  constructor () {}

  getNextStep (chessType, gameBoard) {
    // return {row: , col: }
    // const { row, col } = this.getNextStep()

    // let row = Math.round(Math.random() * 14)
    // let col = Math.round(Math.random() * 14)
    // while (gameBoard.boardGrids[row][col].boardGridType !== 0) {
    //   row = Math.round(Math.random() * 14)
    //   col = Math.round(Math.random() * 14)
    // }
    // return {row, col}

    // const board_scores = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ]
    // let arr = []
    // for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    //   for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
    //     // const old = gameBoard.boardGrids[row][col].boardGridType
    //     if (gameBoard.boardGrids[row][col].boardGridType === 0) {
    //       gameBoard.boardGrids[row][col].boardGridType = 2
    //       // console.log(evaluateSingleChessShapes(2, gameBoard.boardGrids, {row, col}))
    //       arr.push({ score: evaluateSingleChessShapes(2, gameBoard.boardGrids, { row, col }) + board_scores[row][col], row, col })
    //       gameBoard.boardGrids[row][col].boardGridType = 0
    //     } else {
    //       arr.push(0)
    //     }
    //   }
    // }
    // arr.sort((a, b) => {
    //   return b.score - a.score
    // })
    // console.log(arr)
    // return { row: arr[0].row, col: arr[0].col }

    // console.log(getLegalMoves(gameBoard.boardGrids))
    // const board_scores = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ]
    // let arr = []
    // for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    //   for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
    //     if (gameBoard.boardGrids[row][col].boardGridType === 0) {
    //       gameBoard.boardGrids[row][col].boardGridType = 2
    //       arr.push({ score: evaluateAllChessShapes(2, gameBoard.boardGrids) + board_scores[row][col], row, col })
    //       gameBoard.boardGrids[row][col].boardGridType = 0
    //     } else {
    //       arr.push({ score: -1, row, col })
    //       // arr.push(0)
    //     }
    //   }
    // }
    // arr.sort((a, b) => {
    //   return b.score - a.score
    // })
    // console.log(arr)
    // return { row: arr[0].row, col: arr[0].col }

    // let arr = []
    // const legalMoves = generateLegalMoves(gameBoard.boardGrids)
    // for (let index = 0; index < legalMoves.length; index++) {
    //   gameBoard.boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 2
    //   arr.push({ score: minimax(1, 2, gameBoard.boardGrids), row: legalMoves[index].row, col: legalMoves[index].col })
    //   gameBoard.boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    // }
    // arr.sort((a, b) => {
    //   return b.score - a.score
    // })
    // console.log(arr)
    // return { row: arr[0].row, col: arr[0].col }

    // const { row, col } = minimax(1, chessType, gameBoard.boardGrids)
    // const { row, col } = negamax(2, chessType, gameBoard.boardGrids)

    // const { row, col } = alphaBeta(4, -INFINITY, INFINITY, chessType, chessType, gameBoard.boardGrids)

    const { row, col } = minimax(5, gameBoard.boardGrids, chessType)
    return { row, col }
  }
}
