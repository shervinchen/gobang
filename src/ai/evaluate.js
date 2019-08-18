import {
  calculateSingleChessShapes,
  calculateAllChessShapes
} from './situation'
import { CHESS_SHAPES_SCORE } from './score'
import { BOARD_SCORES } from '../constant'

/*
  局面评估
  针对当前棋局类型进行评估
*/
// 根据situation.js中计算出的当前棋局下某一方的棋型数量进行打分
export function evaluateSingleChessShapes (chessType, boardGrids, position) {
  const chessShapesCount = calculateSingleChessShapes(
    chessType,
    boardGrids,
    position
  )
  let singleChessShapesScore = 0
  // console.log('---------------', chessShapesCount)
  for (const chessShapeName in chessShapesCount) {
    // console.log('---------', chessShapesCount[chessShapeName])
    if (chessShapesCount.hasOwnProperty(chessShapeName)) {
      singleChessShapesScore =
        singleChessShapesScore +
        chessShapesCount[chessShapeName] * CHESS_SHAPES_SCORE[chessShapeName]
    }
  }
  // return singleChessShapesScore + BOARD_SCORES[position.row][position.col]
  return singleChessShapesScore
}

export function evaluateAllChessShapes (chessType, boardGrids) {
  const chessShapesCount = calculateAllChessShapes(chessType, boardGrids)
  let allChessShapesScore = 0
  for (const chessShapeName in chessShapesCount) {
    const aiScore =
    chessShapesCount[chessShapeName].AI * CHESS_SHAPES_SCORE[chessShapeName]
    const humanScore =
    chessShapesCount[chessShapeName].HUMAN *
    CHESS_SHAPES_SCORE[chessShapeName]
    if (chessShapesCount.hasOwnProperty(chessShapeName)) {
      // console.log('---------------', aiScore, humanScore)
      allChessShapesScore = allChessShapesScore + (aiScore - humanScore)
    }
  }
  // console.log('-------------', chessShapesCount, allChessShapesScore)
  return allChessShapesScore
}

// export default class Evaluate {
//   constructor () {}
// }
