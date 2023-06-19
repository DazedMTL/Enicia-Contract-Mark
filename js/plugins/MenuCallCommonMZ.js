//=============================================================================
// MenuCallCommonMZ.js
//=============================================================================

// -----------------------------

// (C)のん Twitter : non_non_cha
//"MenuCallCommon.js"　https://www.dropbox.com/sh/08ko2xo7leab7ob/AAAOYt1nOi82K0d5QORqL3Zpa?dl=0

// (C)2015-2017 Triacontane
//"CharacterFreeze.js" https://github.com/triacontane/RPGMakerMV/blob/master/CharacterFreeze.js

// (C)senami. Twitter : https://twitter.com/senamirai_tkool

// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// -----------------------------
// Version
// 2020/09/03　初版
// -----------------------------


/*:
 * @target MZ
 * @plugindesc メニュー開閉の代わりにコモンイベント実装するプラグイン
 * @author のん、トリアコンタン(加筆修正：senami.）
 * 
 * @help MenuCallCommonMZ.js
 * のんちゃ様の「MenuCallCommon」、
 * トリアコンタン様の「CharacterFreeze」プラグインの一部を統合し
 * MZ用に改変したプラグインです。
 * 
 * ・メニュー画面の代わりに特定のコモンイベントを実行します。
 * ・特定のスイッチをON/OFFすることで自作メニューを作成する補助となります。
 * （閉じたい時→スイッチON、それ以外→スイッチOFF）
 * ・開閉中、イベント/プレイヤーの動きを停止させるスイッチがあります
 * （停止させたい時→スイッチON、それ以外→スイッチOFF）
 * 
 * プラグインコマンドはありません。
 * 
 * @command menucommon
 * @text コモンイベントの選択
 * @desc メニュー開閉時のコモンイベントを指定します。
 *
 * @param CommonEventOpen
 * @type common_event
 * @default 1
 * @text 開くコモンイベント番号
 * @desc 開くためのコモンイベントです
 * 
 * @param CommonEventClose
 * @type common_event
 * @default 1
 * @text 閉じるコモンイベント番号
 * @desc 閉じるためのコモンイベントです
 * 
 * @param CommonEventSwitch
 * @type switch
 * @default 1
 * @text 開閉管理のスイッチ番号
 * @desc 開閉を管理するスイッチ番号（スイッチをONにすると閉じるコモンイベントを発生させます）
 * 
 * @param EventMoveOk
 * @type switch
 * @default 1
 * @text イベントの自律移動禁止
 * @desc プレイヤー、イベントの行動を禁止にします（スイッチをONにするとイベント・プレイヤーが自律行動しなくなります）

 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 * 
 */


(() => {

  //=============================================================================
  // パラメータ
  //=============================================================================
  const pluginName = 'MenuCallCommonMZ';
  const parameters = PluginManager.parameters(pluginName);
  const CommonEventOpen = Number(parameters['CommonEventOpen'] || 1);
  const CommonEventClose = Number(parameters['CommonEventClose']||1);
  const CommonEventSwitch = Number(parameters['CommonEventSwitch']||1);
  const EventMoveOk = Number(parameters['EventMoveOk']||1);

  //=============================================================================
  // メニューの代わりにコモンイベント（MenuCallCommon.jsより）
  //=============================================================================

Scene_Map.prototype.updateCallMenu = function() {
  if (this.isMenuEnabled()) {
      if (this.isMenuCalled()) {
          this.menuCalling = true;
      }
      if (this.menuCalling && !$gamePlayer.isMoving()) {
        if(!$gameSwitches._data[CommonEventSwitch] == true){
          $gameTemp.reserveCommonEvent(CommonEventOpen);
          this.menuCalling = false;
        }else if(!$gameSwitches._data[CommonEventSwitch] == false){
          $gameTemp.reserveCommonEvent(CommonEventClose);
          this.menuCalling = false;
        }
      }
      
  } else {
      this.menuCalling = false;
  }
};
  //=============================================================================
  // イベントの動きを停止（CharacterFreeze.jsより）
  //=============================================================================

    let _Game_Map_update      = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update.apply(this, arguments);
    };

    Game_Map.prototype.isFreeze = function() {
        return $gameSwitches.value(EventMoveOk);
    };

    Game_CharacterBase.prototype.isFreeze = function() {
        return $gameMap.isFreeze();
    };

    let _Game_CharacterBase_update      = Game_CharacterBase.prototype.update;
    Game_CharacterBase.prototype.update = function() {
        if (this.isFreeze()) return;
        _Game_CharacterBase_update.apply(this, arguments);
    };

    let _Game_Player_canMove      = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        return !this.isFreeze() && _Game_Player_canMove.apply(this, arguments);
    };
  
})();

