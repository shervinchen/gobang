import {
  INFINITY
} from '../constant'
import {
  evaluateAllChessShapes
} from './evaluate'
import {
  calculateAllChessShapes
} from './situation'
import {
  generateMoves
} from './generate'
import {
  CHESS_SHAPES_SCORE
} from './score'
import {
  CONFIG
} from './config'

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

// export function minimax(depth, boardGrids, aiChessType) {
//   let best = -INFINITY
//   const legalMoves = sortLegalMoves(aiChessType, boardGrids)
//   let bestPoints = []

//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = aiChessType // 尝试下一个子
//     const val = min(depth - 1, INFINITY, best > -INFINITY ? best : -INFINITY, boardGrids, aiChessType) // 找最大值
//     // 如果跟之前的一个好，则把当前位子加入待选位子
//     if (val === best) {
//       bestPoints.push({
//         row: legalMoves[index].row,
//         col: legalMoves[index].col
//       })
//     }
//     // 找到一个更好的分，就把以前存的位子全部清除
//     if (val > best) {
//       best = val
//       bestPoints = []
//       bestPoints.push({
//         row: legalMoves[index].row,
//         col: legalMoves[index].col
//       })
//     }
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0 // 记得把尝试下的子移除
//   }
//   // 在分数最高的几个位置中随机选择一个
//   return bestPoints[Math.floor(bestPoints.length * Math.random())]
// }

// function min(depth, alpha, beta, boardGrids, aiChessType) {
//   if (depth <= 0 || win(boardGrids, aiChessType)) {
//     return evaluateAllChessShapes(aiChessType, boardGrids) // 重点来了，评价函数，这个函数返回的是对当前局势的估分。
//   }
//   let best = INFINITY
//   const legalMoves = sortLegalMoves(aiChessType, boardGrids)
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = 3 - aiChessType
//     const val = max(depth - 1, best < alpha ? best : alpha, beta, boardGrids, aiChessType)
//     console.log(val)
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//     if (val < best) {
//       best = val
//     }
//     // AB剪枝
//     if (val < beta) {
//       break
//     }
//   }
//   return best
// }

// function max(depth, alpha, beta, boardGrids, aiChessType) {
//   if (depth <= 0 || win(boardGrids, aiChessType)) {
//     return evaluateAllChessShapes(aiChessType, boardGrids) // 重点来了，评价函数，这个函数返回的是对当前局势的估分。
//   }
//   let best = -INFINITY
//   const legalMoves = sortLegalMoves(aiChessType, boardGrids)
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = aiChessType
//     const val = min(depth - 1, alpha, best > beta ? best : beta, boardGrids, aiChessType)
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//     if (val > best) {
//       best = val
//     }
//     // AB 剪枝
//     if (val > alpha) {
//       break
//     }
//   }
//   return best
// }

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

// function win(boardGrids, aiChessType) {
  // const chessShapesCount = calculateAllChessShapes(aiChessType, boardGrids)
  // return chessShapesCount.FIVE.AI !== 0 || chessShapesCount.FIVE.HUMAN !== 0
// }

// let resultStep = 0

// function r(depth, alpha, beta, chessType, aiChessType, step, boardGrids, playerSteps) {
//   // || win()
//   // || allChessShapesScore >= CHESS_SHAPES_SCORE.FIVE || allChessShapesScore <= -CHESS_SHAPES_SCORE.FIVE
//   const allChessShapesScore = evaluateAllChessShapes(aiChessType, chessType, boardGrids)
//   if (depth === 0 || allChessShapesScore >= CHESS_SHAPES_SCORE.FOUR || allChessShapesScore <= -CHESS_SHAPES_SCORE.FOUR) {
//     return {
//       val: allChessShapesScore,
//       step
//     }
//   }
//   let best = {
//     val: -INFINITY,
//     step
//   }
//   const legalMoves = generateMoves(chessType, aiChessType, boardGrids, playerSteps)
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = chessType
//     let v = r(depth - 1, -beta, -alpha, 3 - chessType, aiChessType, step + 1, boardGrids, playerSteps)
//     v.val = -v.val
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//     // console.log(
//     //   '-----------------------',
//     //   val,
//     //   step,
//     //   legalMoves[index].row,
//     //   legalMoves[index].col
//     // )
//     if (v.val > best.val) {
//       best = v
//     }
//     alpha = Math.max(best.val, alpha)
//     if (v.val >= beta) {
//       v.val = INFINITY - 1
//       return v
//     }
//   }

//   return best
// }

// function search(depth, alpha, beta, chessType, aiChessType, boardGrids, playerSteps, legalMoves, startTime) {
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = chessType
//     // resultStep = 0
//     // alpha = -INFINITY
//     const result = r(depth - 1, -beta, -alpha, 3 - chessType, aiChessType, 1, boardGrids, playerSteps)
//     result.val = -result.val
//     alpha = Math.max(alpha, result.val)
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//     legalMoves[index].val = result.val
//     legalMoves[index].step = result.step
//     // 超时判定
//     if ((+new Date()) - startTime > 100 * 1000) {
//       console.log('timeout...')
//       break // 超时，退出循环
//     }
//     // if (result.val > alpha) {
//     //   alpha = result.val
//     // }
//   }
//   return alpha
// }

// export function alphaBeta (depth, alpha, beta, chessType, aiChessType, boardGrids, playerSteps) {
//   // || win()
//   // || allChessShapesScore >= CHESS_SHAPES_SCORE.FIVE || allChessShapesScore <= -CHESS_SHAPES_SCORE.FIVE
//   // const allChessShapesScore = evaluateAllChessShapes(aiChessType, chessType, boardGrids)
//   // // 超时判定
//   // if ((+ new Date()) - startTime > CONFIG.TIME_LIMIT * 1000) {
//   //   console.log('timeout...')
//   //   isTimeOut = true
//   //   return -INFINITY // 超时，退出循环
//   // }
//   if (depth === 0) {
//     // resultStep = step
//     return { val: evaluateAllChessShapes(aiChessType, chessType, boardGrids) }
//   }
//   // 最佳位置
//   let row = null
//   let col = null
//   const legalMoves = generateMoves(chessType, aiChessType, boardGrids, playerSteps)
//   for (let index = 0; index < legalMoves.length; index++) {
//     boardGrids[legalMoves[index].row][
//       legalMoves[index].col
//     ].boardGridType = chessType
//     const val = -alphaBeta(depth - 1, -beta, -alpha, 3 - chessType, aiChessType, boardGrids, playerSteps).val
//     boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
//     // console.log(
//     //   '-----------------------',
//     //   val,
//     //   legalMoves[index].row,
//     //   legalMoves[index].col
//     // )
//     if (val >= beta) {
//       // resultStep = step
//       return { val: beta }
//     }
//     if (val > alpha) {
//       alpha = val
//       // if (depth === maxDepth) {
//         // 只保存第一个最高分数的位置 忽略后面分数相同的位置
//         row = legalMoves[index].row
//         col = legalMoves[index].col
//         // console.log('searching', depth, bestMove)
//       // }
//     }
//   }

//   return { val: alpha, row, col }
// }



// 最佳位置
let bestMove = null
function alphaBeta(depth, maxDepth, alpha, beta, chessType, aiChessType, boardGrids, playerSteps, startTime, zobrist) {
  // || win()
  // || allChessShapesScore >= CHESS_SHAPES_SCORE.FIVE || allChessShapesScore <= -CHESS_SHAPES_SCORE.FIVE
  // const allChessShapesScore = evaluateAllChessShapes(aiChessType, chessType, boardGrids)
  // 超时判定
  if ((+new Date()) - startTime > CONFIG.TIME_LIMIT * 1000) {
    console.log('timeout...')
    isTimeOut = true
    return { val: chessType === aiChessType ? -INFINITY : INFINITY } // 超时，退出循环
  }
  // 使用置换表中的缓存
  const cache = Cache[zobrist.code]
  if (cache) {
    if(cache.depth >= depth) { // 如果缓存中的结果搜索深度不比当前小，则结果完全可用
      // 记得clone，因为这个分数会在搜索过程中被修改，会使缓存中的值不正确
      return { val: cache.val }
    }
  }
  if (depth === 0) {
    return { val: evaluateAllChessShapes(aiChessType, chessType, boardGrids)}
  }
  let best = { val: -INFINITY }
  let legalMoves = generateMoves(chessType, aiChessType, boardGrids, playerSteps)
  if (depth === maxDepth) {
    // 先搜索上一次最好的点
    legalMoves = historyMove.concat(legalMoves)
  }
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = chessType
    zobrist.go(legalMoves[index].row, legalMoves[index].col, aiChessType, chessType)
    const result = alphaBeta(depth - 1, maxDepth, -beta, -alpha, 3 - chessType, aiChessType, boardGrids, playerSteps, startTime, zobrist)
    result.val = -result.val
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    zobrist.go(legalMoves[index].row, legalMoves[index].col, aiChessType, chessType)
    // console.log(
    //   '-----------------------',
    //   val,
    //   legalMoves[index].row,
    //   legalMoves[index].col
    // )
    if (result.val >= beta) {
      return { val: beta, abcut: 1 }
    }
    if (result.val > alpha) {
      alpha = result.val
      best = result
      if (depth === maxDepth) {
        // 只保存第一个最高分数的位置 忽略后面分数相同的位置
        bestMove = {
          row: legalMoves[index].row,
          col: legalMoves[index].col
        }
        historyMove = [bestMove]
        console.log('searching', depth, bestMove)
      }
    }
  }

  setCache(depth, best, zobrist)

  return best
}

function setCache(depth, result, zobrist) {
  if (result.abcut) return false // 被剪枝的不要缓存哦，因为分数是一个极值
  // 记得clone，因为score在搜索的时候可能会被改的，这里要clone一个新的
  const obj = {
    depth,
    val: result.val
  }
  Cache[zobrist.code] = obj
}

// 超时标识
let isTimeOut = false
let historyMove = []
let Cache = {}
export function searchAll(chessType, aiChessType, boardGrids, playerSteps, zobrist) {
  isTimeOut = false
  const startTime = (+new Date())
  Cache = {}
  let bestVal = 0
  for (let depth = 2; depth <= CONFIG.MAX_DEPTH; depth += 2) {
    // let best = { val: -INFINITY }
    bestVal = alphaBeta(depth, depth, -INFINITY, INFINITY, chessType, aiChessType, boardGrids, playerSteps, startTime, zobrist).val
    // 如果任意一方已经胜利 退出循环
    if (bestVal > CHESS_SHAPES_SCORE.FIVE || bestVal < -CHESS_SHAPES_SCORE.FIVE) {
      break
    }
    // 超时判定
    if ((+new Date()) - startTime > CONFIG.TIME_LIMIT * 1000) {
      console.log('timeout...')
      break // 超时，退出循环
    }
    console.log(bestVal)
  }
  historyMove = []
  console.log('search end', (+new Date()) - startTime, bestMove)
  return bestMove
}

// resultStep = step

// best = search(index, -INFINITY, INFINITY, chessType, aiChessType, boardGrids, playerSteps, legalMoves, startTime)
// console.log('迭代了', index, best)
// if (best >= CHESS_SHAPES_SCORE.FOUR) {
//   break
// }
// let row = null
// let col = null
// bestVal = 

// legalMoves.sort((a, b) => {
//   if (a.val === b.val) {
//     // 大于零是优势，尽快获胜，因此取步数短的
//     // 小于0是劣势，尽量拖延，因此取步数长的
//     if (a.val >= 0) {
//       if (a.step !== b.step) return a.step - b.step
//       else return b.val - a.val // 否则 选取当前分最高的（直接评分)
//     } else {
//       if (a.step !== b.step) return b.step - a.step
//       else return b.val - a.val // 否则 选取当前分最高的（直接评分)
//     }
//   } else return (b.val - a.val)
// })
// console.log(legalMoves)

// 如果跟之前的一个好，则把当前位子加入待选位子
// if (depth === d) {
//   if (val === alpha) {
//     bestPositions.push({ row: legalMoves[index].row, col: legalMoves[index].col })
//   }
// }
// 找到更好的分后 就把以前存的位置全部清除  只保存最新的位置
// if (depth === d) {
// bestPositions = []
// bestPositions.push({ row: legalMoves[index].row, col: legalMoves[index].col })
// }