import { BOARD_GRIDS_COUNT } from '../constant'
import CHESS_SHAPES from './chessShape'
import { occurrences } from '../util'

// export function checkChessShape (boardGird) {

// }

export function calculateChessShape (chessType, boardGrids, position) {
  let chessShapeCount = {
    // 长连：连成五个以上已方棋子
    // LONG_ROW: 0,
    // 连五（长连也算连五的情况，所以不用单独判断长连了）
    FIVE: 0,
    // 活四
    FOUR: 0,
    // 冲四
    BLOCKED_FOUR: 0,
    // 活三
    THREE: 0,
    // 眠三
    BLOCKED_THREE: 0,
    // 活二
    TWO: 0,
    // 眠二
    BLOCKED_TWO: 0,
    // 活一
    ONE: 0,
    // 眠一
    BLOCKED_ONE: 0
  }
  // 找出某个棋格周围四个方向的棋子形成的棋型数量及类型
  // 每个方向分别找 9 个格子
  // 将计算出的结果push进结果数组 并返回

  const { row, col } = position
  let leftRightChessType = ''
  // 左右方向
  for (let index = row - 4; index <= row + 4; index++) {
    if (index < 0 || index > BOARD_GRIDS_COUNT - 1) {
      continue
    } else {
      leftRightChessType += boardGrids[index][col].boardGridType
    }
  }
  // console.log(leftRightChessType, CHESS_SHAPES)
  if (leftRightChessType.indexOf(CHESS_SHAPES.FIVE) !== -1) {
    chessShapeCount.FIVE += 1
  }

  if (leftRightChessType.indexOf(CHESS_SHAPES.FOUR) !== -1) {
    chessShapeCount.FOUR += 1
  }

  x(leftRightChessType, chessShapeCount, 'BLOCKED_FOUR', 4, chessType)
  x(leftRightChessType, chessShapeCount, 'THREE', 3, chessType)
  x(leftRightChessType, chessShapeCount, 'BLOCKED_THREE', 3, chessType)
  x(leftRightChessType, chessShapeCount, 'TWO', 2, chessType)
  x(leftRightChessType, chessShapeCount, 'BLOCKED_TWO', 2, chessType)
  x(leftRightChessType, chessShapeCount, 'ONE', 1, chessType)
  x(leftRightChessType, chessShapeCount, 'BLOCKED_ONE', 1, chessType)

  console.log(chessShapeCount)

  return chessShapeCount
}

function x (
  leftRightChessType,
  chessShapeCount,
  CHESS_SHAPE,
  chessCount,
  chessType
) {
  for (let index = 0; index < CHESS_SHAPES[CHESS_SHAPE].length; index++) {
    // 获取当前有多少个己方棋子
    const count = y(leftRightChessType, chessType)
    const str = CHESS_SHAPES[CHESS_SHAPE][index]
    if (leftRightChessType.indexOf(str) !== -1) {
      chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessType, str, true)
      if (str !== [...str].reverse().join('')) {
        if (
          leftRightChessType.indexOf([...str].reverse().join('')) !== -1 &&
          chessCount < count
        ) {
          chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessType, [...str].reverse().join(''), true)
        }
      }
    } else if (leftRightChessType.indexOf([...str].reverse().join('')) !== -1) {
      chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessType, [...str].reverse().join(''), true)
      if ([...str].reverse().join('') !== str) {
        if (leftRightChessType.indexOf(str) !== -1 && chessCount < count) {
          chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessType, str, true)
        }
      }
    } else {
      continue
    }
    // if (
    //   CHESS_SHAPES[CHESS_SHAPE][index] !==
    //     [...CHESS_SHAPES[CHESS_SHAPE][index]].reverse().join('') &&
    //   leftRightChessType.indexOf(
    //     [...CHESS_SHAPES[CHESS_SHAPE][index]].reverse().join('')
    //   ) !== -1
    // ) {
    //   chessShapeCount[CHESS_SHAPE] += 1
    // }
  }
}

function y (leftRightChessType, chessType) {
  const arr = leftRightChessType.split('')
  let count = 0
  for (let index = 0; index < arr.length; index++) {
    if (parseInt(arr[index]) === chessType) {
      count++
    }
  }
  return count
}

export function calculateAllChessShape (boardGirds) {
  // 当前棋局双方所有棋型数量
  let chessShapes = {
    // 长连：连成五个或以上已方棋子
    // LONG_ROW: {
    //   HUMAN: 0,
    //   AI: 0
    // },
    // 连五
    FIVE: {
      HUMAN: 0,
      AI: 0
    },
    // 活四
    FOUR: {
      HUMAN: 0,
      AI: 0
    },
    // 冲四
    BLOCKED_FOUR: {
      HUMAN: 0,
      AI: 0
    },
    // 活三
    THREE: {
      HUMAN: 0,
      AI: 0
    },
    // 眠三
    BLOCKED_THREE: {
      HUMAN: 0,
      AI: 0
    },
    // 活二
    TWO: {
      HUMAN: 0,
      AI: 0
    },
    // 眠二
    BLOCKED_TWO: {
      HUMAN: 0,
      AI: 0
    },
    // 活一
    ONE: {
      HUMAN: 0,
      AI: 0
    },
    // 眠一
    BLOCKED_ONE: {
      HUMAN: 0,
      AI: 0
    }
  }
  // 分别判断当前棋局下人类与AI棋子形成的棋型数量
  for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      // this.boardGrids[row][col]
    }
  }

  return chessShapes
}
