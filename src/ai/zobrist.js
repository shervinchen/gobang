import { BOARD_GRIDS_COUNT } from "../constant";
// import { Random } from "random-js";

// var z = new Zobrist();
// z.init();

export default class Zobrist {
  constructor(size) {
    this.size = size || BOARD_GRIDS_COUNT;
    const Random = require("random-js");
    this.random = new Random.Random(Random.MersenneTwister19937.autoSeed());
  }

  init() {
    this.com = [];
    this.hum = [];
    for (let i = 0; i < this.size * this.size; i++) {
      this.com.push(this._rand());
      this.hum.push(this._rand());
    }

    this.code = this._rand();
  }

  _rand() {
    return this.random.integer(1, 1000000000); //再多一位就溢出了。。
  }

  go(x, y, aiChessType, chessType) {
    // console.log(aiChessType, chessType)
    const index = this.size * x + y;
    this.code ^= chessType == aiChessType ? this.com[index] : this.hum[index];
    return this.code;
  }
}
