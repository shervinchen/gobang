import { INFINITY } from '../constant'
import { evaluateAllChessShapes } from './evaluate'
import { calculateAllChessShapes } from './situation'
import { generateMoves } from './generate'

/*
  搜索
  定义搜索树相关结构，遍历当前棋局所有位置
*/
// export default class Search {
//   constructor () {}
// }

// export function minimax (depth, boardGrids, chessType, aiChessType) {
//   let f
//   let t
//   if (depth === 0) {
//     return evaluateAllChessShapes(chessType, boardGrids)
//   }
//   if (chessType === aiChessType) {
//     f = -INFINITY
//   } else {
//     f = INFINITY
//   }
//   const legalMoves = getLegalMoves(boardGrids)
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType =
//       3 - chessType
//     t = minimax(depth - 1, boardGrids, 3 - chessType, aiChessType)
//     if (t > f && chessType === aiChessType) {
//       f = t
//     }
//     if (t < f && chessType !== aiChessType) {
//       f = t
//     }
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//   }
//   return f
// }

export function minimax (depth, boardGrids, aiChessType) {
  let best = -INFINITY
  const legalMoves = sortLegalMoves(aiChessType, boardGrids)
  let bestPoints = []

  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = aiChessType // 尝试下一个子
    const val = min(depth - 1, INFINITY, best > -INFINITY ? best : -INFINITY, boardGrids, aiChessType) // 找最大值
    // 如果跟之前的一个好，则把当前位子加入待选位子
    if (val === best) {
      bestPoints.push({ row: legalMoves[index].row, col: legalMoves[index].col })
    }
    // 找到一个更好的分，就把以前存的位子全部清除
    if (val > best) {
      best = val
      bestPoints = []
      bestPoints.push({ row: legalMoves[index].row, col: legalMoves[index].col })
    }
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0 // 记得把尝试下的子移除
  }
  // 在分数最高的几个位置中随机选择一个
  return bestPoints[Math.floor(bestPoints.length * Math.random())]
}

function min (depth, alpha, beta, boardGrids, aiChessType) {
  if (depth <= 0 || win(boardGrids, aiChessType)) {
    return evaluateAllChessShapes(aiChessType, boardGrids)// 重点来了，评价函数，这个函数返回的是对当前局势的估分。
  }
  let best = INFINITY
  const legalMoves = sortLegalMoves(aiChessType, boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = 3 - aiChessType
    const val = max(depth - 1, best < alpha ? best : alpha, beta, boardGrids, aiChessType)
    console.log(val)
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    if (val < best) {
      best = val
    }
    // AB剪枝
    if (val < beta) {
      break
    }
  }
  return best
}

function max (depth, alpha, beta, boardGrids, aiChessType) {
  if (depth <= 0 || win(boardGrids, aiChessType)) {
    return evaluateAllChessShapes(aiChessType, boardGrids)// 重点来了，评价函数，这个函数返回的是对当前局势的估分。
  }
  let best = -INFINITY
  const legalMoves = sortLegalMoves(aiChessType, boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = aiChessType
    const val = min(depth - 1, alpha, best > beta ? best : beta, boardGrids, aiChessType)
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    if (val > best) {
      best = val
    }
    // AB 剪枝
    if (val > alpha) {
      break
    }
  }
  return best
}

function win (boardGrids, aiChessType) {
  const chessShapesCount = calculateAllChessShapes(aiChessType, boardGrids)
  return chessShapesCount.FIVE.AI !== 0 || chessShapesCount.FIVE.HUMAN !== 0
}

// export function minimax (depth, chessType, boardGrids) {
//   if (chessType === 1) {
//     return max(depth, boardGrids, chessType, chessType)
//   } else {
//     return min(depth, boardGrids, chessType, 3 - chessType)
//   }
// }

// function max (depth, boardGrids, chessType, firstChessType) {
//   let best = -INFINITY
//   if (depth <= 0) {
//     return { val: evaluateAllChessShapes(firstChessType, boardGrids) }
//   }
//   let row = -1
//   let col = -1
//   const legalMoves = generateLegalMoves(boardGrids)
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = chessType
//     const val = min(depth - 1, boardGrids, 3 - chessType, firstChessType).val
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//     console.log(
//       '-----------max------------',
//       val,
//       legalMoves[index].row,
//       legalMoves[index].col
//     )
//     if (val > best) {
//       best = val
//       row = legalMoves[index].row
//       col = legalMoves[index].col
//     }
//   }
//   return { val: best, row, col }
// }

// function min (depth, boardGrids, chessType, firstChessType) {
//   let best = INFINITY // 注意这里不同于“最大”算法
//   if (depth <= 0) {
//     return { val: evaluateAllChessShapes(firstChessType, boardGrids) }
//   }
//   let row = -1
//   let col = -1
//   const legalMoves = generateLegalMoves(boardGrids)
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = chessType
//     const val = max(depth - 1, boardGrids, 3 - chessType, firstChessType).val
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//     // console.log('-----------min------------', val, legalMoves[index].row, legalMoves[index].col)
//     if (val < best) {
//       best = val
//       row = legalMoves[index].row
//       col = legalMoves[index].col
//     }
//   }
//   return { val: best, row, col }
// }

// export function negamax (depth, chessType, boardGrids) {
//   let best = -INFINITY
//   if (depth <= 0) {
//     return { val: evaluateAllChessShapes(chessType, boardGrids) }
//   }
//   let row = -1
//   let col = -1

//   const legalMoves = generateLegalMoves(boardGrids)
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = chessType
//     const val = -negamax(depth - 1, 3 - chessType, boardGrids).val
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//     if (val > best) {
//       best = val
//       row = legalMoves[index].row
//       col = legalMoves[index].col
//     }
//   }
//   return { val: best, row, col }
// }

export function alphaBeta (depth, alpha, beta, chessType, aiChessType, boardGrids, playerSteps) {
  // || win()
  if (depth === 0) {
    return { val: evaluateAllChessShapes(aiChessType, boardGrids) }
  }
  let row = -1
  let col = -1
  const legalMoves = generateMoves(chessType, aiChessType, boardGrids, playerSteps)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = chessType
    const val = -alphaBeta(depth - 1, -beta, -alpha, 3 - chessType, aiChessType, boardGrids, playerSteps)
      .val
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    console.log(
      '-----------------------',
      val,
      legalMoves[index].row,
      legalMoves[index].col
    )
    if (val >= beta) {
      return { val: beta }
    }
    if (val > alpha) {
      alpha = val
      row = legalMoves[index].row
      col = legalMoves[index].col
    }
  }
  return { val: alpha, row, col }
}