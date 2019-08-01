import '../constant'

// 定义棋型数量
const CHESS_SHAPE_SCORE = {
  LONG_ROW: 0, // 长连：连成五个或以上已方棋子
  LIVE_FOUR: 0, // 活四
  RUSH_FOUR: 0, // 冲四
  LIVE_THREE: 0, // 活三
  SLEEP_THREE: 0, // 眠三
  LIVE_TWO: 0, // 活二
  SLEEP_TWO: 0, // 眠二
  DIE_FOUR: 0, // 死四
  DIE_THREE: 0, // 死三
  DIE_TWO: 0 // 死二
}

export function checkChessShape (boardGird) {
  // 判断某一个棋格的棋子周围形成的棋型数量
}

export function checkAllChessShapes (boardGirds) {
  // 分别判断当前棋局下人类与AI棋子形成的棋型数量
  for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      // this.boardGrids[row][col]
    }
  }
}
