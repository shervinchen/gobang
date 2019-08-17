import { evaluateAllChessShapes } from './evaluate'

import { BOARD_GRIDS_COUNT, INFINITY } from '../constant'

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

export function minimax (depth, aiChessType, boardGrids) {
  if (aiChessType === 2) {
    return max(depth, boardGrids)
  } else {
    return min(depth, boardGrids)
  }
}

function max (depth, boardGrids) {
  let best = -INFINITY
  if (depth <= 0) {
    return evaluateAllChessShapes(2, boardGrids)
  }
  let row = -1
  let col = -1
  const legalMoves = generateLegalMoves(boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 2
    const val = min(depth - 1, boardGrids)
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    console.log(val, legalMoves[index].row, legalMoves[index].col)
    if (val > best) {
      best = val
      row = legalMoves[index].row
      col = legalMoves[index].col
    }
  }
  // while (MovesLeft()) {
  //   MakeNextMove()
  //   val = Min(depth - 1)
  //   UnmakeMove()
  //   if (val > best) {
  //     best = val
  //   }
  // }
  return { val: best, row, col }
}

function min (depth, boardGrids) {
  let best = INFINITY // 注意这里不同于“最大”算法
  if (depth <= 0) {
    return evaluateAllChessShapes(2, boardGrids)
  }
  const legalMoves = generateLegalMoves(boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 1
    const val = max(depth - 1, boardGrids).val
    boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    if (val < best) {
      best = val
    }
  }
  // generateLegalMoves()
  // while (MovesLeft()) {
  //   MakeNextMove()
  //   val = Max(depth - 1)
  //   UnmakeMove()
  //   if (val < best) {
  //     // 注意这里不同于“最大”算法
  //     best = val
  //   }
  // }
  return best
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
        gridTypes.push(
          row - 3 >= 0 ? boardGrids[row - 3][col].boardGridType : 0
        )

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
        gridTypes.push(
          row + 3 < BOARD_GRIDS_COUNT
            ? boardGrids[row + 3][col].boardGridType
            : 0
        )

        // 竖向各三格
        gridTypes.push(
          col - 1 >= 0 ? boardGrids[row][col - 1].boardGridType : 0
        )
        gridTypes.push(
          col - 2 >= 0 ? boardGrids[row][col - 2].boardGridType : 0
        )
        gridTypes.push(
          col - 3 >= 0 ? boardGrids[row][col - 3].boardGridType : 0
        )

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
        gridTypes.push(
          col + 3 < BOARD_GRIDS_COUNT
            ? boardGrids[row][col + 3].boardGridType
            : 0
        )

        // 右斜各三格
        gridTypes.push(
          row - 3 >= 0 && col - 3 >= 0
            ? boardGrids[row - 3][col - 3].boardGridType
            : 0
        )
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
        gridTypes.push(
          row + 3 < BOARD_GRIDS_COUNT && col + 3 < BOARD_GRIDS_COUNT
            ? boardGrids[row + 3][col + 3].boardGridType
            : 0
        )

        // 左斜各三格
        gridTypes.push(
          row - 3 >= 0 && col + 3 < BOARD_GRIDS_COUNT
            ? boardGrids[row - 3][col + 3].boardGridType
            : 0
        )
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
        gridTypes.push(
          row + 3 < BOARD_GRIDS_COUNT && col - 3 >= 0
            ? boardGrids[row + 3][col - 3].boardGridType
            : 0
        )

        // 马步8个格
        gridTypes.push(
          row - 1 >= 0 && col - 2 >= 0
            ? boardGrids[row - 1][col - 2].boardGridType
            : 0
        )
        gridTypes.push(
          row - 2 >= 0 && col - 1 >= 0
            ? boardGrids[row - 2][col - 1].boardGridType
            : 0
        )
        gridTypes.push(
          row + 1 < BOARD_GRIDS_COUNT && col - 2 >= 0
            ? boardGrids[row + 1][col - 2].boardGridType
            : 0
        )
        gridTypes.push(
          row + 2 < BOARD_GRIDS_COUNT && col - 1 >= 0
            ? boardGrids[row + 2][col - 1].boardGridType
            : 0
        )
        gridTypes.push(
          row - 2 >= 0 && col + 1 < BOARD_GRIDS_COUNT
            ? boardGrids[row - 2][col + 1].boardGridType
            : 0
        )
        gridTypes.push(
          row - 1 >= 0 && col + 2 < BOARD_GRIDS_COUNT
            ? boardGrids[row - 1][col + 2].boardGridType
            : 0
        )
        gridTypes.push(
          row + 2 < BOARD_GRIDS_COUNT && col + 1 < BOARD_GRIDS_COUNT
            ? boardGrids[row + 2][col + 1].boardGridType
            : 0
        )
        gridTypes.push(
          row + 1 < BOARD_GRIDS_COUNT && col + 2 < BOARD_GRIDS_COUNT
            ? boardGrids[row + 1][col + 2].boardGridType
            : 0
        )

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
