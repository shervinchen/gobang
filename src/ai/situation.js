import { BOARD_GRIDS_COUNT } from '../constant'
import { CHESS_CROSS_SHAPES, CHESS_CIRCLE_SHAPES } from './chessShape'
import { occurrences } from '../util'

// export function checkChessShape (boardGird) {

// }

export function calculateSingleChessShape (chessType, boardGrids, position) {
  // 找出某个棋格周围四个方向的棋子形成的棋型数量及类型
  // 每个方向分别找 9 个格子
  // 将计算出的结果push进结果数组 并返回
  let chessShapeCount = {
    // 长连：连成五个以上已方棋子
    // LONG_ROW: 0,
    // 连五（长连也算连五的情况，所以不用单独判断长连了）
    FIVE: 0,
    // 活四
    FOUR: 0,
    // 双冲四 （威胁度相当于一个活四）
    DOUBLE_BLOCKED_FOUR: 0,
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

  const { row, col } = position
  // 左右方向
  let leftRightChessShape = ''
  for (let index = row - 4; index <= row + 4; index++) {
    if (index < 0 || index > BOARD_GRIDS_COUNT - 1) {
      continue
    } else {
      leftRightChessShape += boardGrids[index][col].boardGridType
    }
  }

  // 上下
  let upDownChessShape = ''
  for (let index = col - 4; index <= col + 4; index++) {
    if (index < 0 || index > BOARD_GRIDS_COUNT - 1) {
      continue
    } else {
      upDownChessShape += boardGrids[row][index].boardGridType
    }
  }

  // 左上右下
  let leftUpRightDownChessShape = ''
  for (let i = row - 4; i <= row + 4; i++) {
    for (let j = col - 4; j <= col + 4; j++) {
      if (i < 0 || i > BOARD_GRIDS_COUNT - 1 || j < 0 || j > BOARD_GRIDS_COUNT - 1) {
        continue
      } else {
        leftUpRightDownChessShape += boardGrids[i][j].boardGridType
      }
    }
  }

  // 右上左下
  let rightUpLeftDownChessShape = ''
  for (let i = row + 4; i >= row - 4; i--) {
    for (let j = col - 4; j <= col + 4; j++) {
      if (i < 0 || i > BOARD_GRIDS_COUNT - 1 || j < 0 || j > BOARD_GRIDS_COUNT - 1) {
        continue
      } else {
        rightUpLeftDownChessShape += boardGrids[i][j].boardGridType
      }
    }
  }
  
  // console.log(leftRightChessShape, CHESS_CROSS_SHAPES)
  getSingleChessShapeCount(chessShapeCount, leftRightChessShape)
  getSingleChessShapeCount(chessShapeCount, upDownChessShape)
  getSingleChessShapeCount(chessShapeCount, leftUpRightDownChessShape)
  getSingleChessShapeCount(chessShapeCount, rightUpLeftDownChessShape)
  console.log(chessShapeCount)

  return chessShapeCount
}

function getSingleChessShape () {
  
}

function getSingleChessShapeCount (chessShapeCount, chessShape) {
  // 连五
  if (chessShape.indexOf(CHESS_CROSS_SHAPES.FIVE) !== -1) {
    chessShapeCount.FIVE += 1
  }
  if (chessShape.indexOf(CHESS_CROSS_SHAPES.FOUR) !== -1) {
    // 活四
    chessShapeCount.FOUR += 1
  }
  if (x(chessShape, chessShapeCount, 'DOUBLE_BLOCKED_FOUR', chessType)) {
    // 双冲四
    chessShapeCount.DOUBLE_BLOCKED_FOUR += 1
  }
  if (x(chessShape, chessShapeCount, 'BLOCKED_FOUR', chessType)) {
    // 冲四
    chessShapeCount.BLOCKED_FOUR += 1
  }
  if (x(chessShape, chessShapeCount, 'THREE', chessType)) {
    chessShapeCount.THREE += 1
  }
  if (x(chessShape, chessShapeCount, 'BLOCKED_THREE', chessType)) {
    chessShapeCount.BLOCKED_THREE += 1
  }
  if (x(chessShape, chessShapeCount, 'TWO', chessType)) {
    chessShapeCount.TWO += 1
  }
  if (x(chessShape, chessShapeCount, 'BLOCKED_TWO', chessType)) {
    chessShapeCount.BLOCKED_TWO += 1
  }
  if (x(chessShape, chessShapeCount, 'ONE', chessType)) {
    chessShapeCount.ONE += 1
  }
  if (x(chessShape, chessShapeCount, 'BLOCKED_ONE', chessType)) {
    chessShapeCount.BLOCKED_ONE += 1
  }
}

function x (chessShape, chessShapeCount, CHESS_SHAPE, chessType) {
  for (let index = 0; index < CHESS_CROSS_SHAPES[CHESS_SHAPE].length; index++) {
    if (chessShape.indexOf(CHESS_CROSS_SHAPES[CHESS_SHAPE][index]) !== -1) {
      chessShapeCount[CHESS_SHAPE] += 1
      return true
    }
  }
  return false
  // 获取当前有多少个己方棋子
  // const count = y(leftRightChessShape, chessType)
  // const str = CHESS_CROSS_SHAPES[CHESS_SHAPE][index]
  // if (leftRightChessShape.indexOf(str) !== -1) {
  //   chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessShape, str, true)
  //   if (str !== [...str].reverse().join('')) {
  //     if (
  //       leftRightChessShape.indexOf([...str].reverse().join('')) !== -1 &&
  //       chessCount < count
  //     ) {
  //       chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessShape, [...str].reverse().join(''), true)
  //     }
  //   }
  // } else if (leftRightChessShape.indexOf([...str].reverse().join('')) !== -1) {
  //   chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessShape, [...str].reverse().join(''), true)
  //   if ([...str].reverse().join('') !== str) {
  //     if (leftRightChessShape.indexOf(str) !== -1 && chessCount < count) {
  //       chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessShape, str, true)
  //     }
  //   }
  // } else {
  //   continue
  // }

  // if (
  //   CHESS_CROSS_SHAPES[CHESS_SHAPE][index] !==
  //     [...CHESS_CROSS_SHAPES[CHESS_SHAPE][index]].reverse().join('') &&
  //   leftRightChessShape.indexOf(
  //     [...CHESS_CROSS_SHAPES[CHESS_SHAPE][index]].reverse().join('')
  //   ) !== -1
  // ) {
  //   chessShapeCount[CHESS_SHAPE] += 1
  // }
}

function y (leftRightChessShape, chessType) {
  const arr = leftRightChessShape.split('')
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
