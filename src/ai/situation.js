import { BOARD_GRIDS_COUNT } from '../constant'

// export function checkChessShape (boardGird) {
  
// }

export function figureChessShape (chessType, boardGird) {
  let chessShape = 0
  // 找出某个棋格周围任意一方棋子形成的棋型数量及类型
  // 将计算出的结果push进结果数组 并返回
  return {
    // 长连：连成五个或以上已方棋子
    LONG_ROW: 0,
    // 活四
    LIVE_FOUR: 0,
    // 冲四
    RUSH_FOUR: 0,
    // 活三
    LIVE_THREE: 0,
    // 眠三
    SLEEP_THREE: 0,
    // 活二
    LIVE_TWO: 0,
    // 眠二
    SLEEP_TWO: 0,
    // 死四
    DIE_FOUR: 0,
    // 死三
    DIE_THREE: 0,
    // 死二
    DIE_TWO: 0
  }
}

export function figureAllChessShapes (boardGirds) {
  // 当前棋局双方所有棋型数量
  let chessShapes = {
    // 长连：连成五个或以上已方棋子
    LONG_ROW: {
      HUMAN: 0,
      AI: 0
    },
    // 活四
    LIVE_FOUR: {
      HUMAN: 0,
      AI: 0
    },
    // 冲四
    RUSH_FOUR: {
      HUMAN: 0,
      AI: 0
    },
    // 活三
    LIVE_THREE: {
      HUMAN: 0,
      AI: 0
    },
    // 眠三
    SLEEP_THREE: {
      HUMAN: 0,
      AI: 0
    },
    // 活二
    LIVE_TWO: {
      HUMAN: 0,
      AI: 0
    },
    // 眠二
    SLEEP_TWO: {
      HUMAN: 0,
      AI: 0
    },
    // 死四
    DIE_FOUR: {
      HUMAN: 0,
      AI: 0
    },
    // 死三
    DIE_THREE: {
      HUMAN: 0,
      AI: 0
    },
    // 死二
    DIE_TWO: {
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
