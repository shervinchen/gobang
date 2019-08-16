import { evaluateAllChessShapes } from './evaluate'

import {
  BOARD_GRIDS_COUNT,
} from '../constant'

/*
  搜索
  定义搜索树相关结构，遍历当前棋局所有位置
*/
// export default class Search {
//   constructor () {}
// }

export function minimax(depth, boardGrids, chessType, aiChessType) {
  let f
  let t
  if (depth === 0) {
    return evaluateAllChessShapes(chessType, boardGrids)
  }
  if (chessType === aiChessType) {
    f = -999999999
  } else {
    f = 999999999
  }
  for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      if (boardGrids[row][col].boardGridType === 0) {
        boardGrids[row][col].boardGridType = 3 - chessType
        t = minimax(depth - 1, boardGrids, 3 - chessType, aiChessType)
        if (t > f && chessType === aiChessType) {
          f = t
        }
        if (t < f && chessType !== aiChessType) {
          f = t
        }
        boardGrids[row][col].boardGridType = 0
      }
    }
  }
  return f
}