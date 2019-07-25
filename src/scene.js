/**
 * 游戏场景类
 */
export default class Scene {
  constructor() {
    // 控制选择棋子、loading等信息的显示
    // 游戏结束后显示“You win/lose! Click ‘图标’ to restart” 以及重新开始按钮图标（用刷新的图标）
  }

  drawScene() {
    this.drawSceneChess()
    this.drawSceneInfo()
  }

  drawSceneChess() {}

  drawSceneInfo() {}
}
