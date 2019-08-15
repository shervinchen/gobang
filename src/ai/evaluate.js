import { calculateSingleChessShapes } from './situation'
import { CHESS_SHAPES_SCORE } from './score'

/*
  局面评估
  针对当前棋局类型进行评估
*/
// 根据situation.js中计算出的当前棋局下某一方的棋型数量进行打分
export function evaluateSingleChessShapes (chessType, boardGrids, position) {
  const chessShapesCount = calculateSingleChessShapes(chessType, boardGrids, position)
  let singleChessShapesScore = 0
  console.log(chessShapesCount)
  for (const chessShapeName in chessShapesCount) {
    console.log('---------', chessShapesCount[chessShapeName])
    if (chessShapesCount.hasOwnProperty(chessShapeName)) {
      singleChessShapesScore = singleChessShapesScore + chessShapesCount[chessShapeName] * CHESS_SHAPES_SCORE[chessShapeName]
    }
  }
  return singleChessShapesScore
}

export function evaluateAllChessShapes () {
  
}

// export default class Evaluate {
//   constructor () {}
// }
