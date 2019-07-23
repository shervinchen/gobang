// 导入游戏模块
import Game from './game.js'

// css文件可以直接引入
import '../style/index.css'
// canvas标签可以动态加载

(() => {
    // 开始游戏
    const game = new Game();
    game.start();
})();
