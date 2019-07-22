// 导入游戏模块
import Game from './game.js'

// css引入  canvas用js动态加载

(() => {
    // 开始游戏
    const game = new Game();
    game.start();
})();
