import { evaluateAllChessShapes, evaluateSingleChessShapes } from './evaluate'

import { BOARD_GRIDS_COUNT, INFINITY } from '../constant'

import { CHESS_SHAPES_SCORE } from './score'

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

export function minimax (depth, chessType, boardGrids) {
  if (chessType === 1) {
    return max(depth, boardGrids, chessType, chessType)
  } else {
    return min(depth, boardGrids, chessType, 3 - chessType)
  }
}

function max (depth, boardGrids, chessType, firstChessType) {
  let best = -INFINITY
  if (depth <= 0) {
    return { val: evaluateAllChessShapes(firstChessType, boardGrids) }
  }
  let row = -1
  let col = -1
  const legalMoves = generateLegalMoves(boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = chessType
    const val = min(depth - 1, boardGrids, 3 - chessType, firstChessType).val
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    console.log(
      '-----------max------------',
      val,
      legalMoves[index].row,
      legalMoves[index].col
    )
    if (val > best) {
      best = val
      row = legalMoves[index].row
      col = legalMoves[index].col
    }
  }
  return { val: best, row, col }
}

function min (depth, boardGrids, chessType, firstChessType) {
  let best = INFINITY // 注意这里不同于“最大”算法
  if (depth <= 0) {
    return { val: evaluateAllChessShapes(firstChessType, boardGrids) }
  }
  let row = -1
  let col = -1
  const legalMoves = generateLegalMoves(boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = chessType
    const val = max(depth - 1, boardGrids, 3 - chessType, firstChessType).val
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    // console.log('-----------min------------', val, legalMoves[index].row, legalMoves[index].col)
    if (val < best) {
      best = val
      row = legalMoves[index].row
      col = legalMoves[index].col
    }
  }
  return { val: best, row, col }
}

export function negamax (depth, chessType, boardGrids) {
  let best = -INFINITY
  if (depth <= 0) {
    return { val: evaluateAllChessShapes(chessType, boardGrids) }
  }
  let row = -1
  let col = -1

  const legalMoves = generateLegalMoves(boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = chessType
    const val = -negamax(depth - 1, 3 - chessType, boardGrids).val
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    if (val > best) {
      best = val
      row = legalMoves[index].row
      col = legalMoves[index].col
    }
  }
  return { val: best, row, col }
}

export function alphaBeta (depth, alpha, beta, chessType, aiChessType, boardGrids) {
  // || win()
  if (depth === 0) {
    return { val: evaluateAllChessShapes(aiChessType, boardGrids) }
    // return { val: evaluateAllChessShapes(aiChessType, boardGrids) }
  }
  let row = -1
  let col = -1
  const legalMoves = sortLegalMoves(aiChessType, boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][
      legalMoves[index].col
    ].boardGridType = chessType
    const val = -alphaBeta(depth - 1, -beta, -alpha, 3 - chessType, aiChessType, boardGrids)
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
      row = legalMoves[index].row
      col = legalMoves[index].col
      alpha = val
    }
  }
  return { val: alpha, row, col }
}

function sortLegalMoves (aiChessType, boardGrids) {
  // const legalMoves = generateLegalMoves(boardGrids)
  // for (let index = 0; index < legalMoves.length; index++) {
  //   legalMoves[index].score = evaluateSingleChessShapes(chessType, boardGrids, { row: legalMoves[index].row, col: legalMoves[index].col })
  // }
  // return legalMoves.sort((a, b) => {
  //   return b.score - a.score
  // })

  const fives = []
  const fours = []
  const twoblockfours = []
  const twothrees = []
  const blockfour = []
  const threes = []
  const twos = []
  const neighbors = []
  const legalMoves = generateLegalMoves(boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    const aiScore = evaluateSingleChessShapes(aiChessType, boardGrids, { row: legalMoves[index].row, col: legalMoves[index].col })
    const humanScore = evaluateSingleChessShapes(3 - aiChessType, boardGrids, { row: legalMoves[index].row, col: legalMoves[index].col })
    if (aiScore >= CHESS_SHAPES_SCORE.FIVE) {
      return [legalMoves[index]] // 先手直接返回
    } else if (humanScore >= CHESS_SHAPES_SCORE.FIVE) {
      fives.push(legalMoves[index]) // 后手保存当前位置
    } else if (aiScore >= CHESS_SHAPES_SCORE.FOUR) {
      fours.unshift(legalMoves[index])
    } else if (humanScore >= CHESS_SHAPES_SCORE.FOUR) {
      fours.push(legalMoves[index])
    } else if (aiScore >= 2 * CHESS_SHAPES_SCORE.FOUR) {
      twoblockfours.unshift(legalMoves[index])
    } else if (humanScore >= 2 * CHESS_SHAPES_SCORE.FOUR) {
      twoblockfours.push(legalMoves[index])
    } else if (aiScore >= 2 * CHESS_SHAPES_SCORE.THREE) {
      twothrees.unshift(legalMoves[index])
    } else if (humanScore >= 2 * CHESS_SHAPES_SCORE.THREE) {
      twothrees.push(legalMoves[index])
    } else if (aiScore >= CHESS_SHAPES_SCORE.BLOCKED_FOUR) {
      blockfour.unshift(legalMoves[index])
    } else if (humanScore >= CHESS_SHAPES_SCORE.BLOCKED_FOUR) {
      blockfour.push(legalMoves[index])
    } else if (aiScore >= CHESS_SHAPES_SCORE.THREE) {
      threes.unshift(legalMoves[index])
    } else if (humanScore >= CHESS_SHAPES_SCORE.THREE) {
      threes.push(legalMoves[index])
    } else if (aiScore >= CHESS_SHAPES_SCORE.TWO) {
      twos.unshift(legalMoves[index])
    } else if (humanScore >= CHESS_SHAPES_SCORE.TWO) {
      twos.push(legalMoves[index])
    } else {
      neighbors.push(legalMoves[index])
    }
  }
  if (fives.length) {
    return fives
  }
  if (fours.length) {
    return fours
  }
  if (twoblockfours.length) {
    return twoblockfours
  }
  if (twothrees.length) {
    return twothrees
  }
  return [...blockfour, ...threes, ...twos, ...neighbors]
  // .splice(0, 50)
  // return legalMoves
  // if (chessType === 1) {
  //   // MAX层从大到小排序
  //   return legalMoves.sort((a, b) => {
  //     return b.score - a.score
  //   })
  // } else {
  //   // MIN层从小到大排序
  //   return legalMoves.sort((a, b) => {
  //     return a.score - b.score
  //   })
  // }

  // const sortLegalMoves = legalMoves.sort((a, b) => {
  //   return b.score - a.score
  // })
  // return sortLegalMoves.length < 30 ? sortLegalMoves : sortLegalMoves.splice(0, 30)
  // .splice(0, 50)
}

export function generateLegalMoves (boardGrids) {
  const legalMoves = []
  for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      const gridTypes = []
      if (boardGrids[row][col].boardGridType === 0) {
        // 横向各三格
        gridTypes.push(
          row - 1 >= 0 ? boardGrids[row - 1][col].boardGridType : 0
        )
        gridTypes.push(
          row - 2 >= 0 ? boardGrids[row - 2][col].boardGridType : 0
        )
        // gridTypes.push(
        //   row - 3 >= 0 ? boardGrids[row - 3][col].boardGridType : 0
        // )

        gridTypes.push(
          row + 1 < BOARD_GRIDS_COUNT
            ? boardGrids[row + 1][col].boardGridType
            : 0
        )
        gridTypes.push(
          row + 2 < BOARD_GRIDS_COUNT
            ? boardGrids[row + 2][col].boardGridType
            : 0
        )
        // gridTypes.push(
        //   row + 3 < BOARD_GRIDS_COUNT
        //     ? boardGrids[row + 3][col].boardGridType
        //     : 0
        // )

        // 竖向各三格
        gridTypes.push(
          col - 1 >= 0 ? boardGrids[row][col - 1].boardGridType : 0
        )
        gridTypes.push(
          col - 2 >= 0 ? boardGrids[row][col - 2].boardGridType : 0
        )
        // gridTypes.push(
        //   col - 3 >= 0 ? boardGrids[row][col - 3].boardGridType : 0
        // )

        gridTypes.push(
          col + 1 < BOARD_GRIDS_COUNT
            ? boardGrids[row][col + 1].boardGridType
            : 0
        )
        gridTypes.push(
          col + 2 < BOARD_GRIDS_COUNT
            ? boardGrids[row][col + 2].boardGridType
            : 0
        )
        // gridTypes.push(
        //   col + 3 < BOARD_GRIDS_COUNT
        //     ? boardGrids[row][col + 3].boardGridType
        //     : 0
        // )

        // 右斜各三格
        // gridTypes.push(
        //   row - 3 >= 0 && col - 3 >= 0
        //     ? boardGrids[row - 3][col - 3].boardGridType
        //     : 0
        // )
        gridTypes.push(
          row - 2 >= 0 && col - 2 >= 0
            ? boardGrids[row - 2][col - 2].boardGridType
            : 0
        )
        gridTypes.push(
          row - 1 >= 0 && col - 1 >= 0
            ? boardGrids[row - 1][col - 1].boardGridType
            : 0
        )

        gridTypes.push(
          row + 1 < BOARD_GRIDS_COUNT && col + 1 < BOARD_GRIDS_COUNT
            ? boardGrids[row + 1][col + 1].boardGridType
            : 0
        )
        gridTypes.push(
          row + 2 < BOARD_GRIDS_COUNT && col + 2 < BOARD_GRIDS_COUNT
            ? boardGrids[row + 2][col + 2].boardGridType
            : 0
        )
        // gridTypes.push(
        //   row + 3 < BOARD_GRIDS_COUNT && col + 3 < BOARD_GRIDS_COUNT
        //     ? boardGrids[row + 3][col + 3].boardGridType
        //     : 0
        // )

        // 左斜各三格
        // gridTypes.push(
        //   row - 3 >= 0 && col + 3 < BOARD_GRIDS_COUNT
        //     ? boardGrids[row - 3][col + 3].boardGridType
        //     : 0
        // )
        gridTypes.push(
          row - 2 >= 0 && col + 2 < BOARD_GRIDS_COUNT
            ? boardGrids[row - 2][col + 2].boardGridType
            : 0
        )
        gridTypes.push(
          row - 1 >= 0 && col + 1 < BOARD_GRIDS_COUNT
            ? boardGrids[row - 1][col + 1].boardGridType
            : 0
        )

        gridTypes.push(
          row + 1 < BOARD_GRIDS_COUNT && col - 1 >= 0
            ? boardGrids[row + 1][col - 1].boardGridType
            : 0
        )
        gridTypes.push(
          row + 2 < BOARD_GRIDS_COUNT && col - 2 >= 0
            ? boardGrids[row + 2][col - 2].boardGridType
            : 0
        )
        // gridTypes.push(
        //   row + 3 < BOARD_GRIDS_COUNT && col - 3 >= 0
        //     ? boardGrids[row + 3][col - 3].boardGridType
        //     : 0
        // )

        // 马步8个格
        // gridTypes.push(
        //   row - 1 >= 0 && col - 2 >= 0
        //     ? boardGrids[row - 1][col - 2].boardGridType
        //     : 0
        // )
        // gridTypes.push(
        //   row - 2 >= 0 && col - 1 >= 0
        //     ? boardGrids[row - 2][col - 1].boardGridType
        //     : 0
        // )
        // gridTypes.push(
        //   row + 1 < BOARD_GRIDS_COUNT && col - 2 >= 0
        //     ? boardGrids[row + 1][col - 2].boardGridType
        //     : 0
        // )
        // gridTypes.push(
        //   row + 2 < BOARD_GRIDS_COUNT && col - 1 >= 0
        //     ? boardGrids[row + 2][col - 1].boardGridType
        //     : 0
        // )
        // gridTypes.push(
        //   row - 2 >= 0 && col + 1 < BOARD_GRIDS_COUNT
        //     ? boardGrids[row - 2][col + 1].boardGridType
        //     : 0
        // )
        // gridTypes.push(
        //   row - 1 >= 0 && col + 2 < BOARD_GRIDS_COUNT
        //     ? boardGrids[row - 1][col + 2].boardGridType
        //     : 0
        // )
        // gridTypes.push(
        //   row + 2 < BOARD_GRIDS_COUNT && col + 1 < BOARD_GRIDS_COUNT
        //     ? boardGrids[row + 2][col + 1].boardGridType
        //     : 0
        // )
        // gridTypes.push(
        //   row + 1 < BOARD_GRIDS_COUNT && col + 2 < BOARD_GRIDS_COUNT
        //     ? boardGrids[row + 1][col + 2].boardGridType
        //     : 0
        // )

        if (gridTypes.includes(1) || gridTypes.includes(2)) {
          legalMoves.push({
            row,
            col
          })
        }
      }
    }
  }
  return legalMoves
}
