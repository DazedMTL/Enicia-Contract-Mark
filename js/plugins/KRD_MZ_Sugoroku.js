/*:
 * @target MZ
 * @plugindesc すごろくプラグイン。
 * @author くろうど（kuroudo119）
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * 
 * @param cmnSugoroku
 * @text すごろくコモン開始位置
 * @desc このプラグインで使用するコモンイベントの開始位置（6個以上使用する）
 * @default 1
 * @type common_event
 * 
 * @param swSugoroku
 * @text すごろくスイッチ開始位置
 * @desc このプラグインで使用するスイッチの開始位置
 * @default 1
 * @type switch
 * 
 * @param arrowImg
 * @text 矢印画像指定
 * @desc 右向きの画像を配置してください
 * @default
 * @type file
 * @dir img/system
 * 
 * @param enableSW
 * @text 矢印有効化スイッチ
 * @desc ONの時表示されます
 * @type switch
 * @default 0
 * 
 * @command KRD_setPlayerStep
 * @text プレイヤー歩数指定
 * @desc プレイヤーが移動する歩数を指定します。
 * @arg varStep
 * @text 歩数変数
 * @desc 移動する歩数の値が入っている変数
 * @type variable
 * 
 * @command KRD_setPlayerStepValue
 * @text プレイヤー歩数指定（値）
 * @desc プレイヤーが移動する歩数の値を指定します。
 * @arg step
 * @text 歩数
 * @desc 移動する歩数の値
 * @type number
 * 
 * @command setRegions
 * @text リージョン自動設定
 * @desc リージョンを自動設定します。
 * 
 * @command lookAround
 * @text 見渡す
 * @desc 見渡します
 * 
 * @help
 * KRD_MZ_Sugoroku.js
 * すごろくプラグインです。
 * (c) 2020 kuroudo119
 * 
 * このプラグインはMITライセンスです。
 * https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE
 * 
 * ver.1 (2020/11/14) 1st Release.
 * ver.2 (2020/11/15) 「すごろくコモン開始位置」を変更した。
 * ver.3 (2020/11/17) 「ライバル初期化」にパラメータを追加した。
 * ver.4 (2020/11/19) ライバルのマイナス移動を可能にした。
 * ver.5 (2021/10/29) 改変 kido
 * 
 * 【プラグインパラメータ】
 * 「すごろくコモン開始位置」で指定したコモンイベントから
 * 連続したコモンイベントを使用します。
 * それぞれに応じたイベントを作成して下さい。
 *   0:プレイヤー移動処理（プラグイン内では使用しません）
 *   1:未使用
 *   2:未使用
 *   3:未使用
 *   4:未使用
 *   5:プレイヤーがマスに止まった時のイベント
 *       リージョン0番のすごろくイベントです。
 *       ゴールイベントとしてお使い下さい。
 *   6:以降リージョン番号に対応するすごろくイベント
 * 
 * 「すごろくスイッチ開始位置」から1個のスイッチを使用します。
 * 必要に応じてイベントコマンドからON／OFFして下さい。
 *   0:すごろくスイッチ(開始時にONにしてください)
 * 
 * 
 * 「プレイヤー歩数指定」と「プレイヤー歩数指定（値）」は
 * プレイヤーの移動に使用します。
 * 変数を使用するか、直接値を指定するかの違いです。
 * 
 * 
 * 【マップに関する設定】
 * 移動に使用するタイルセットに地形タグを設定してください。
 * 
 * 地形タグ : 移動する方向
 *       1 : 下 ↓
 *       2 : 左 ←
 *       3 : 右 →
 *       4 : 上 ↑
 * 
 * 止まった時に発生するコモンイベントの番号と
 * 対応するリージョンIDをマップに設定してください。
 * 「すごろくイベントのコモンイベント番号 ＋ リージョン番号」が
 * 「止まった時に発生するコモンイベントの番号」となります。
 * 
 * 【すごろくの開始について】
 * 各種スイッチや変数を初期化して下さい。
 * そして、「プレイヤー移動処理」を用意して実行して下さい。
 * 
 * 【プレイヤー移動処理】
 * プラグインコマンド「プレイヤー歩数指定」を使用して、
 * プレイヤーが移動する歩数（マスの数）を設定してください。
 * 
 * これにより、マスに設定された地形タグに従って移動できるようになります。
 * そして、止まったマスのリージョンIDを元に算出されたコモンイベントを実行します。
 * 
 * 
 * 
 */

(function () {
  'use strict';

  const PLUGIN_NAME = "KRD_MZ_Sugoroku";
  const PARAM = PluginManager.parameters(PLUGIN_NAME);
  const CMN_SUGOROKU = Number(PARAM["cmnSugoroku"]) || 1;
  const cmnSugorokuEvent = CMN_SUGOROKU + 5;
  const SW_SUGOROKU = Number(PARAM["swSugoroku"]) || 1;

  const tileToRegion = {
    516: 43,  //残り時間+
    517: 44,  //残り時間-
    518: 45,  //ゲームオーバー
    519: 35,  //情報？家
    520: 2,  //財宝
    521: 4,  //トラップ
    522: 6,  //ハプニング
    523: 8,  //レア財宝
    524: 38,  //レアスキル
    525: 37,  //スキル
    526: 36,  //本
    527: 29,  //本
    528: 3,  //キャンプ
    529: 5,  //エンカウント
    530: 11, //ボス
    531: 7,  //ショップ
    //532: 7,  //鍵
    //533: 7,  //鍵
    534: 15,  //ダイス+
    536: 12, //ハート
    538: 1,  //何もなし
    539: 25,  //グッド固有
    540: 39,  //採掘
    541: 40,  //レア採掘
    //544: 14, //歩数移動
    545: 9,  //採取
    547: 14,  //ランダム移動
    548: 10,  //採取
    549: 24,  //グッドランダム
    550: 26,  //バッドランダム
    552: 1,   //一方通行。何もなし
    553: 1,   //一方通行。何もなし
    554: 1,   //一方通行。何もなし
    555: 1,   //一方通行。何もなし
    560: 30,  //会話グッド
    561: 31,  //会話バッド  
    562: 32,  //会話？
    568: 18,  //ネクストマップ
    569: 18,  //ネクストマップ
    570: 18,  //ネクストマップ
    571: 18,  //ネクストマップ
  };

  PluginManager.registerCommand(PLUGIN_NAME, "KRD_setPlayerStep", args => {
    const varStep = Number(args.varStep) || 1;
    $gamePlayer.setStep($gameVariables.value(varStep));
  });

  PluginManager.registerCommand(PLUGIN_NAME, "KRD_setPlayerStepValue", args => {
    const step = Number(args.step) || 1;
    $gamePlayer.setStep(step);
  });

  PluginManager.registerCommand(PLUGIN_NAME, "setRegions", args => {
    $gameMap.isSugoroku = true;
  });
  PluginManager.registerCommand(PLUGIN_NAME, "lookAround", function (args) {
    $gameMap.startLookAround();
    this.setWaitMode('lookAround');
  });

  const _updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function () {
    if (this._waitMode == 'lookAround') {
      let waiting = $gameMap.lookAround;
      if (!waiting) this._waitMode = '';
      return waiting;
    } else {
      return _updateWaitMode.call(this);
    }
  };

  Game_Player.prototype.setStep = function (step = null) {
    this._step = step;
  };

  const _executeMove = Game_Player.prototype.executeMove;
  Game_Player.prototype.executeMove = function (direction) {
    if (!$gameSwitches.value(SW_SUGOROKU)) {
      _executeMove.call(this, direction);
      return;
    }
    if (this._step === null) return;
    if (this.canSugorokuMove(direction)) {
      this.moveStraight(direction);
    }
  };

  Game_Player.prototype.canSugorokuMove = function (direction) {
    let tag = $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y);
    if (tag > 0 && tag * 2 != direction) return false;  //一通
    if (this.getBackDirection(this.direction()) == direction) return false; //逆走防止
    if (!this.canPass(this.x, this.y, direction)) return false; //向き変更防止

    //1マス先の地形タグをチェック(逆流防止)
    let x = $gameMap.roundXWithDirection(this._x, direction);
    let y = $gameMap.roundYWithDirection(this._y, direction);
    tag = $gameMap.terrainTag(x, y);
    if (tag > 0 && tag * 2 == this.getBackDirection(direction)) return false;
    return true;
  };

  Game_Player.prototype.getBackDirection = function (dir) {
    if (dir == 2) return 8;
    else if (dir == 4) return 6;
    else if (dir == 6) return 4;
    return 2;
  };

  const _increaseSteps = Game_Player.prototype.increaseSteps;
  Game_Player.prototype.increaseSteps = function () {
    _increaseSteps.call(this);
    if (this._step === null) return;
    this._step--;
    if (this._step === 0) {
      this.checkRegion();
      this._step = null;
    }
  };

  Game_Player.prototype.checkRegion = function () {
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    const region = $gameMap.regionId(x, y);
    $gameTemp.reserveCommonEvent(cmnSugorokuEvent + region);
  };

  //--------------------------------------------------------------------
  //リージョン自動設定
  const _setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _setup.call(this, mapId);
    this.isSugoroku = false;
  };

  const _regionId = Game_Map.prototype.regionId;
  Game_Map.prototype.regionId = function (x, y) {
    let region = _regionId.call(this, x, y);
    if (this.isSugoroku) {
      if (region > 0) return region;
      let tileId = this.tileId(x, y, 3);
      if (tileId == 0) return region;
      let convertedRegion = tileToRegion[tileId];
      if (convertedRegion) return convertedRegion;
    }
    return region;

  };

  //-----------------------------------------------
  //移動可能方向矢印表示

  const _createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
  Sprite_Character.prototype.createHalfBodySprites = function () {
    _createHalfBodySprites.call(this);
    if (!$gameSwitches.value(SW_SUGOROKU)) return;
    if (this._character == $gamePlayer && !this.directionSprites) {
      this.directionSprites = {};
      for (let i = 0; i < 4; i++) {
        let s = new Sprite(ImageManager.loadSystem(PARAM.arrowImg));
        s.anchor.set(0.5);
        if (i == 0) {
          //右向き
          s.x = 30;
          s.y = -16;
          this.directionSprites[6] = s;
        } else if (i == 1) {
          //下向き
          s.angle = 90;
          s.y = 10;
          this.directionSprites[2] = s;
        } else if (i == 2) {
          //左向き
          s.angle = 180;
          s.x = -30;
          s.y = -20;
          this.directionSprites[4] = s;
        } else if (i == 3) {
          //上向き
          s.angle = 270;
          s.y = -60;
          this.directionSprites[8] = s;
        }
        this.addChild(s);
      }
    }
  };

  const _updateVisibility = Sprite_Character.prototype.updateVisibility;
  Sprite_Character.prototype.updateVisibility = function () {
    _updateVisibility.call(this);
    if (!this.directionSprites) return;

    let visible = true;
    if (this.isEmptyCharacter() || this._character.isTransparent()) {
      visible = false;
    }
    if (!$gameSwitches.value(parseInt(PARAM.enableSW))) {
      visible = false;
    }

    for (let s in this.directionSprites) {
      this.directionSprites[s].visible = visible;
    }
    if (!$gamePlayer.canSugorokuMove(2)) this.directionSprites[2].visible = false;
    if (!$gamePlayer.canSugorokuMove(4)) this.directionSprites[4].visible = false;
    if (!$gamePlayer.canSugorokuMove(6)) this.directionSprites[6].visible = false;
    if (!$gamePlayer.canSugorokuMove(8)) this.directionSprites[8].visible = false;

  };

  //------------------------------------------------------------
  //見渡す
  Game_Map.prototype.startLookAround = function () {
    $gameTemp.savedDisplayX = this._displayX;
    $gameTemp.savedDisplayY = this._displayY;
    $gameTemp.touchInputX = TouchInput.x;
    $gameTemp.touchInputY = TouchInput.y;
    this.lookAround = true;
  };

  const _GameMap_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function (sceneActive) {
    _GameMap_update.call(this, sceneActive);
    if (!this.lookAround) return;
    if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered() || TouchInput.isCancelled()) {
      $gamePlayer.center();
      this._displayX = $gameTemp.savedDisplayX;
      this._displayY = $gameTemp.savedDisplayY;
      this.lookAround = false;
      return;
    }
    let dx = TouchInput.x - $gameTemp.touchInputX;
    let dy = TouchInput.y - $gameTemp.touchInputY;
    $gameTemp.touchInputX = TouchInput.x;
    $gameTemp.touchInputY = TouchInput.y;
    if ((dx != 0 || dy != 0) && Math.abs(dx) < 50 && Math.abs(dy) < 50) {
      this._displayX += dx / 10;
      this._displayY += dy / 10;
      return;
    }

    let x = Input._signX();
    let y = Input._signY();
    this._displayX += x / 2;
    this._displayY += y / 2;
  };


}());
