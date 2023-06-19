/* ---------------------------------------------------------------------------*
 * 2021/11/01 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc バトル用のステータスウィンドウを表示する
 * @target MZ
 * @author kido
 * @help
 * プラグインコマンドから表示したり非表示したりするよ
 *
 * @command show
 * @text 表示する
 * 
 * @command hide
 * @text 非表示にする
 */

(() => {

  const pluginName = 'ShowBattleStatus';


  PluginManager.registerCommand(pluginName, 'show', function (args) {
    let scene = SceneManager._scene;
    scene.showBattleStatus();
  });
  PluginManager.registerCommand(pluginName, 'hide', function (args) {
    let scene = SceneManager._scene;
    scene.hideBattleStatus();
  });

  const _createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _createAllWindows.call(this);
    if ($gameSystem.isShowBattleStatus) {
      this.showBattleStatus();
    }
  };

  Scene_Map.prototype.showBattleStatus = function () {
    if (!this._battleStatusWindow) {
      let bsw = new Window_BattleStatus(new Rectangle(0, 512, 624, 254));
      bsw.openness = 255;
      this._battleStatusWindow = bsw;
      this._windowLayer.addChildAt(bsw, 0);
    }
    this._battleStatusWindow.show();
    $gameSystem.isShowBattleStatus = true;
  };

  Scene_Map.prototype.hideBattleStatus = function () {
    if (this._battleStatusWindow) this._battleStatusWindow.hide();
    $gameSystem.isShowBattleStatus = false;
  };

})();