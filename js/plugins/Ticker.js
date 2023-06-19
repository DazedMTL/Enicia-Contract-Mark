/* ---------------------------------------------------------------------------*
 * 2021/1/05 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc ティッカープラグイン
 * @target MZ
 * @base TorigoyaMZ_FrameTween
 * @author kido
 * @help
 *   すべて同名のプラグインコマンドがあります
 *
 *   ・スクリプトからの使用      $TM.show('\\I[5]あいうえお');
 *   ・+符号付き VでなくQを使う  $TM.show('\\Q[5]');
 *   ・全部いっきに消す          $TM.clearAll();
 *   ・ログをクリア              $TM.clearAllLog();
 *
 *   ・アイテム・武器・防具のメモ欄
 *   <ticker:あいうえお> : アイテムの説明として入手/消失時に表示されます。ない場合はアイテムの説明の1行目を表示
 *
 * @command show
 * @text
 * @desc
 *
 * @arg text
 *
 * @command clearAll
 * @text
 * @desc
 *
 * @command clearAllLog
 * @text
 * @desc
 *
 * @param displayDuration
 * @text 表示時間
 * @desc 表示時間[frame]
 * @type number
 * @default 180
 *
 * @param fadeDuration
 * @text フェード時間
 * @desc 表示、消去のフェード時間[frame]
 * @type number
 * @default 30
 *
 * @param isBaseTop
 * @text 表示位置(上)
 * @desc 画面の上に表示するか(trueなら上、falseなら下)
 * @default true
 * @type boolean
 *
 * @param yOffset
 * @text yオフセット
 * @desc 画面端からのy位置のオフセット(pixel)
 * @type number
 * @default 0
 *
 * @param xOffset
 * @text xオフセット
 * @desc 画面端からのx位置のオフセット(pixel)
 * @type number
 * @default 0
 *
 * @param slideFromX
 * @text スライドアニメーション開始位置
 * @desc 左から何ピクセルの位置から文章がスライドしていくか
 * @type number
 * @default 100
 *
 * @param slideToX
 * @text スライドアニメーション終了位置
 * @desc 左から何ピクセルの位置に向けて文章がスライドしていくか
 * @type number
 * @default 0
 *
 * @param fixYSpeed
 * @text y位置合わせスピード
 * @desc Tickerが消えたときにy位置を調整するときのアニメーションスピード[pixel/frame]
 * @type number
 * @default 5
 *
 * @param height
 * @text ティッカー高さ
 * @desc ティッカーの高さです[pixel]
 * @type number
 * @default 36
 *
 * @param fontSize
 * @text フォントサイズ
 * @desc フォントサイズです[pixel]
 * @type number
 * @default 28
 *
 * @param iconSize
 * @text アイコンサイズ
 * @desc アイコンサイズです[pixel]
 * @type number
 * @default 32
 *
 * @param backgroundImg
 * @text 背景画像
 * @desc 背景画像
 * @default
 * @type file
 * @dir img/pictures/
 *
 * @param backgroundColor
 * @text 背景色
 * @desc 背景画像を使わない場合、この色で塗りつぶします(r,g,b,a)
 * @default rgba(0, 0, 0, 0.5)
 * @type string
 *
 * @param maxDisplay
 * @text 最大表示個数
 * @desc 表示できる個数です。オーバーすると古いのが消えます
 * @type number
 * @min 1
 * @max 100
 * @default 10
 *
 * @param logEnableSwitch
 * @text ログ機能ONスイッチ
 * @desc ONのとき、tickerが消えなくなります
 * @type switch
 * @default 0
 *
 * @param easingType
 * @text イージング
 * @desc スライドアニメーションのイージングを変えます
 * @default easeOutSine
 * @type select
 * @option linear
 * @option easeInSine
 * @option easeOutSine
 * @option easeInOutSine
 * @option easeInQuad
 * @option easeOutQuad
 * @option easeInOutQuad
 * @option easeInCubic
 * @option easeOutCubic
 * @option easeInOutCubic
 * @option easeInCircular
 * @option easeOutCircular
 * @option easeInOutCircular
 *
 * @param stateAutoEnableSW
 * @text ステート自動表示スイッチ
 * @desc ONの時、ステート変化時に自動的にティッカーを表示します
 * @type switch
 * @default 0
 *
 * @param getAutoEnableSW
 * @text 所持品自動表示スイッチ
 * @desc ONの時、アイテム・武器防具・お金増減時に自動的にティッカーを表示します
 * @type switch
 * @default 0
 *
 * @param enableShowLose
 * @text 消失時表示設定
 * @desc アイテム・武器防具・ゴールド消失時にTickerを表示するか
 * @type boolean
 * @default true
 *
 * @param enableShowRare
 * @text レア表示スイッチ
 * @desc ONの時、アイテム増減時にレア度を表示し、それに応じて色が変わります。
 * @type switch
 * @default 0
 * 
 * @param rareText
 * @text レア表示テキスト
 * @desc レア度のフォーマットです
 * %1がレア度に変換されます
 * @default %1
 * 
 * @param getItemText
 * @text 所持品入手時テキスト
 * @desc アイテム・武器防具を入手したときのテキストです
 * %1がアイコン、%2がアイテム名、%3が個数、%4が説明、%5がレアテキストに変わります。
 * メッセージウィンドウの制御コマンドが使えます。
 * @default %5%1 %2 x %3 GET %4
 *
 * @param loseItemText
 * @text 所持品消失時テキスト
 * @desc アイテム・武器防具を消失した時に表示するテキストです。
 * %1がアイコン、%2がアイテム名、%3が個数、%4が説明、%5がレアテキストに変わります。
 * メッセージウィンドウの制御コマンドが使えます。
 * @default %5%1 %2 x %3 消失 %4
 *
 * @param getGoldText
 * @text お金入手時テキスト
 * @desc お金を入手したときのテキストです
 * %1がアイコン、%2が金額、%3が通貨単位に変わります。
 * メッセージウィンドウの制御コマンドが使えます。
 * @default %1 %2%3入手!
 *
 * @param loseGoldText
 * @text お金消失時テキスト
 * @desc お金をなくしたしたときのテキストです
 * %1がアイコン、%2が金額、%3が通貨単位に変わります。
 * メッセージウィンドウの制御コマンドが使えます。
 * @default %1 %2%3消失!
 *
 * @param goldIcon
 * @text お金アイコン
 * @desc お金入手/消失時に表示するアイコン番号です
 * @default 1
 * @type number
 *
 * @param getItemSE
 * @text 所持品入手時SE
 * @desc アイテム・武器・防具入手時SE
 * @type struct<seSetting>
 *
 * @param loseItemSE
 * @text 所持品消失時SE
 * @desc アイテム・武器・防具消失時SE
 * @type struct<seSetting>
 *
 * @param getGoldSE
 * @text お金入手時SE
 * @desc お金入手時SE
 * @type struct<seSetting>
 *
 * @param loseGoldSE
 * @text お金消失時SE
 * @desc お金消失時SE
 * @type struct<seSetting>
 *
 */

// eslint-disable-next-line spaced-comment
/*~struct~seSetting:
 *
 * @param name
 * @desc ファイル名
 * @default
 * @dir audio/se/
 * @type file
 *
 * @param volume
 * @desc ボリューム
 * @default 90
 * @type number
 *
 * @param pitch
 * @desc ピッチ
 * @default 100
 * @type number
 *
 * @param pan
 * @desc パン
 * @default 0
 * @type number
 */

(() => {
  const rareColors = {
    C: 0,
    UC: 0,
    R: 23,
    SR: 23,
    SSR: 24,
    UR: 31
  };

  const paramStr = PluginManager.parameters('Ticker');
  const param = JSON.parse(JSON.stringify(paramStr, (key, value) => {
    if (value === 'null') return value;
    if (value[0] === '"' && value[value.length - 1] === '"') return value;
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }));

  PluginManager.registerCommand('Ticker', 'show', args => {
    TickerManager.show(args.text);
  });
  PluginManager.registerCommand('Ticker', 'clearAll', args => {
    TickerManager.clearAll();
  });
  PluginManager.registerCommand('Ticker', 'clearAllLog', args => {
    TickerManager.clearAllLog();
  });

  const _Game_System_Initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    // ゲーム内からパラメータを変更したいのでセーブデータに含める
    _Game_System_Initialize.call(this);
    this.setDefaultTickerSetting();
    this.tickerLogs = [];
  };

  Game_System.prototype.setDefaultTickerSetting = function () {
    this.ticker = JsonEx.makeDeepCopy(param);
  };

  class TickerManager {
    static createTickerContainer() {
      // 通常ティッカー用のコンテナ
      if (!SceneManager._scene._tickerContainer) {
        const tc = new TickerContainer(false);
        SceneManager._scene._tickerContainer = tc;
        if (SceneManager._scene instanceof Scene_Battle) {
          //戦闘時はウィンドウの下に表示したい
          SceneManager._scene.addChildAt(tc, this.getWindowLayerIndex());
        } else SceneManager._scene.addChild(tc);
      }
      // ログティッカー表示用のコンテナ
      if (!SceneManager._scene._tickerLogContainer) {
        const tc = new TickerContainer(true);
        SceneManager._scene._tickerLogContainer = tc;
        if (SceneManager._scene instanceof Scene_Battle) {
          //戦闘時はウィンドウの下に表示したい
          SceneManager._scene.addChildAt(tc, this.getWindowLayerIndex());
        } else SceneManager._scene.addChild(tc);
      }
      if (!this.hiddenWindow) {
        this.hiddenWindow = new Window_Hidden();
      }
    }

    static getWindowLayerIndex() {
      var c = SceneManager._scene.children;
      for (var i = 0; i < c.length; i++) {
        if (c[i] instanceof WindowLayer) return i;
      }
      return c.length;
    }

    static show(text) {
      this.createTickerContainer();
      if (this.isLogContainerEnabled()) SceneManager._scene._tickerLogContainer.show(text);
      else SceneManager._scene._tickerContainer.show(text);
    }

    static clearAll() {
      if (SceneManager._scene._tickerContainer) {
        SceneManager._scene._tickerContainer.clearAll();
      }
    }

    static isLogContainerEnabled() {
      return this.isLogEnabled() && (
        SceneManager._scene.constructor === Scene_Map || SceneManager._scene.constructor === Scene_Battle
      );
    }

    static isLogEnabled() {
      return $gameSwitches.value($gameSystem.ticker.logEnableSwitch);
    }

    static needAutoGetDisplay() {
      const sw = $gameSystem.ticker.getAutoEnableSW;
      return sw > 0 && $gameSwitches.value(sw);
    }

    static clearAllLog() {
      if (!$gameParty.inBattle()) $gameSystem.tickerLogs = [];

      if (SceneManager._scene._tickerLogContainer) {
        if ($gameParty.inBattle()) SceneManager._scene._tickerLogContainer.instantLogs = [];
        SceneManager._scene._tickerLogContainer.clearAll();
      }
    }

    static clearOldestLog() {
      if (!$gameParty.inBattle()) $gameSystem.tickerLogs.shift();
      if (SceneManager._scene._tickerLogContainer) {
        if ($gameParty.inBattle()) SceneManager._scene._tickerLogContainer.instantLogs.shift();
        SceneManager._scene._tickerLogContainer.hideOldest();
      }
    }

    static formatGetText(text, strs) {
      text = text.replace('%1', '\\I[' + strs[0] + ']');
      for (let i = 1; i <= strs.length; i++) {
        text = text.replace('%' + (i + 1), strs[i]);
      }
      return text;
    }

    static getItemDescription(item) {
      if (item.meta.ticker) {
        return item.meta.ticker;
      }
      return item.description.replace(/[\r\n]+.*/m, '');
    }

    static showMoneyTicker(value) {
      const t = $gameSystem.ticker;
      const format = value > 0 ? t.getGoldText : t.loseGoldText;
      const se = value > 0 ? t.getGoldSE : t.loseGoldSE;
      if (value < 0 && !$gameSystem.ticker.enableShowLose) return;
      const formated = this.formatGetText(format, [t.goldIcon, Math.abs(value), $dataSystem.currencyUnit]);
      this.show(formated);
      if (se) AudioManager.playSe(se);
    }

    static showItemTicker(item, value) {
      const t = $gameSystem.ticker;
      let format = value > 0 ? t.getItemText : t.loseItemText;
      const se = value > 0 ? t.getItemSE : t.loseItemSE;
      if (value < 0 && !t.enableShowLose) return;
      let rareText = ''
      if (!$gameSwitches.value(t.enableShowRare)) {
        format = format.replace('%5', '');
      } else if (item.meta.rate) {
        rareText = t.rareText.replace('%1', item.meta.rate);
        format = '\\C[' + rareColors[item.meta.rate] + ']' + format;
      }
      const formated = this.formatGetText(format, [
        item.iconIndex, item.name, Math.abs(value), this.getItemDescription(item), rareText
      ]);
      this.show(formated);
      if (se) AudioManager.playSe(se);
    }

    static needStateChangeDisplay() {
      const sw = $gameSystem.ticker.stateAutoEnableSW;
      if (sw !== 0 && !$gameSwitches.value(sw)) return false;

      return !(SceneManager._scene instanceof Scene_Battle) ||
        ($gameTroop && $gameTroop.isEventRunning());
    }
  }
  TickerManager.param = param; // パラメータをデフォルトに戻したいケースのため保持
  window.$TM = TickerManager;

  const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    _Scene_Map_createDisplayObjects.call(this);
    // メニューから戻ったり、ロードしたりしたときにログ用のティッカーを復元する
    if ($gameSystem.tickerLogs.length > 0) {
      TickerManager.createTickerContainer();
      for (const log of $gameSystem.tickerLogs) {
        SceneManager._scene._tickerLogContainer.showFromLog(log);
      }
      SceneManager._scene._tickerLogContainer.alpha = TickerManager.isLogEnabled() ? 1 : 0;
    }
  };

  function TickerContainer(isLogMode) {
    PIXI.Container.call(this);
    this.isLogMode = isLogMode;
    this.instantLogs = []; // マップは$gameSystemに保存するがそれ以外はそのシーンだけ使うのでこちらに保存
  }

  TickerContainer.prototype = Object.create(PIXI.Container.prototype);
  TickerContainer.prototype.constructor = TickerContainer;

  TickerContainer.prototype.update = function () {
    this.displayFade();
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update();
      if (this.children[i].isEndState()) {
        this.removeChildAt(i);
        this.adjustY();
        i--;
      }
    }
  };

  TickerContainer.prototype.displayFade = function () {
    // ログと通常の切替時にフェード入れる
    const duration = 0.1;
    let direction = 1;
    const logEnabled = TickerManager.isLogContainerEnabled();
    if (this.isLogMode && !logEnabled) direction = -1;
    else if (!this.isLogMode && logEnabled) direction = -1;
    this.alpha = (this.alpha + direction * duration).clamp(0, 1);
  };

  TickerContainer.prototype.show = function (text) {
    this.makeTicker(text);
    if (this.isLogMode) {
      // ログモードのとき画面切り替えやセーブに対応するため変換後のテキストを保存する。変換後でないと変数の値が変わる可能性がある
      const logs = $gameParty.inBattle() ? this.instantLogs : $gameSystem.tickerLogs;
      logs.push(TickerManager.hiddenWindow.convertEscapeCharacters(text));
      if (logs.length > $gameSystem.ticker.maxDisplay) {
        logs.shift();
      }
    }
    if (this.countDisplay() > $gameSystem.ticker.maxDisplay) this.clearOldest();
  };

  TickerContainer.prototype.showFromLog = function (text) {
    // ログを復帰するとき。表示アニメーションを飛ばして最初から表示にしたい
    const ticker = this.makeTicker(text);
    ticker.setDisplayMode();
  };

  TickerContainer.prototype.makeTicker = function (text) {
    const ticker = new Ticker(text, this.isLogMode);
    ticker.setY(this.children.length);
    this.addChild(ticker);
    return ticker;
  };

  TickerContainer.prototype.adjustY = function () {
    // y位置直し
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].setToY(i);
    }
  };

  TickerContainer.prototype.clearOldest = function () {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].isShowState()) {
        this.children[i].clear();
        return;
      }
    }
  };

  TickerContainer.prototype.countDisplay = function () {
    return this.children.filter((child) => child.isShowState()).length;
  };

  TickerContainer.prototype.clearAll = function () {
    for (let i = 0; i < this.children.length; i++) this.children[i].clear();
  };

  function Ticker() {
    this.initialize.apply(this, arguments);
  }

  Ticker.prototype = Object.create(PIXI.Container.prototype);
  Ticker.prototype.constructor = Ticker;

  Ticker.prototype.initialize = function (text, isLogMode) {
    PIXI.Container.call(this);
    this.width = Graphics.width;
    this.height = $gameSystem.ticker.height;
    this.frameCount = 0;
    this.tickerState = 'fadein';
    this.x = $gameSystem.ticker.xOffset;
    this.text = text;
    this.isLogMode = isLogMode;
    this.createBackground();
    this.createTextSprite();
    this.alpha = 0;
  };

  Ticker.prototype.createBackground = function () {
    this.backSprite = new Sprite();
    if ($gameSystem.ticker.backgroundImg) {
      this.backSprite.bitmap = ImageManager.loadPicture($gameSystem.ticker.backgroundImg);
    } else {
      this.backSprite.bitmap = new Bitmap(this._width, this._height);
      this.backSprite.bitmap.fillAll($gameSystem.ticker.backgroundColor);
    }
    this.addChild(this.backSprite);
  };

  Ticker.prototype.createTextSprite = function () {
    this.textSprite = new Sprite();
    this.addChild(this.textSprite);
    const w = TickerManager.hiddenWindow;
    w.drawTextEx(this.text, 0, $gameSystem.ticker.height / 2 - $gameSystem.ticker.fontSize / 2, this._width);
    this.textSprite.bitmap = w.contents;
    w.contents = null;
    w.createContents();
  };

  Ticker.prototype.setY = function (index) {
    this.y = $gameSystem.ticker.isBaseTop ? this.height * index + $gameSystem.ticker.yOffset : Graphics.height - this.height * (index + 1) - $gameSystem.ticker.yOffset;
  };

  Ticker.prototype.setToY = function (index) {
    this.toY = $gameSystem.ticker.isBaseTop ? this.height * index + $gameSystem.ticker.yOffset : Graphics.height - this.height * (index + 1) - $gameSystem.ticker.yOffset;
  };

  Ticker.prototype.clear = function () {
    if (!this.isShowState()) return;
    this.tickerState = 'fadeout';
    this.frameCount = 0;
  };

  Ticker.prototype.isShowState = function () {
    return this.tickerState === 'fadein' || this.tickerState === 'display';
  };

  Ticker.prototype.isEndState = function () {
    return this.tickerState === 'end';
  };

  Ticker.prototype.setDisplayMode = function () {
    // アニメなしで表示する（ログのとき画面切り替えしたときとかのため）
    this.alpha = 1;
    this.textSprite.x = $gameSystem.ticker.slideToX;
    this.tickerState = 'display';
  };

  Ticker.prototype.getCovertedText = function () {
    return this.convertEscapeCharacters(this.text);
  };

  Ticker.prototype.update = function () {
    this.children.forEach(function (child) {
      child.update();
    });
    this.frameCount++;
    if (this.toY != null && this.y !== this.toY) {
      if (this.y > this.toY) {
        this.y -= $gameSystem.ticker.fixYSpeed;
        if (this.y < this.toY) this.y = this.toY;
      } else {
        this.y += $gameSystem.ticker.fixYSpeed;
        if (this.y > this.toY) this.y = this.toY;
      }
    }
    let rate;
    switch (this.tickerState) {
      case 'fadein':
        rate = Torigoya.FrameTween.Easing[$gameSystem.ticker.easingType](this.frameCount / $gameSystem.ticker.fadeDuration);
        this.alpha = rate;
        this.textSprite.x = $gameSystem.ticker.slideToX + (1 - rate) * $gameSystem.ticker.slideFromX;
        if (this.frameCount === $gameSystem.ticker.fadeDuration) {
          this.tickerState = 'display';
          this.frameCount = 0;
        }
        break;
      case 'display':
        if (this.frameCount === $gameSystem.ticker.displayDuration) {
          if (this.isLogMode) {
            // ログ表示中は消去にいかない
            return;
          }
          this.tickerState = 'fadeout';
          this.frameCount = 0;
        }
        break;
      case 'fadeout':
        rate = (1 - this.frameCount / $gameSystem.ticker.fadeDuration);
        this.alpha = rate;
        if (this.frameCount === $gameSystem.ticker.fadeDuration) {
          this.tickerState = 'end';
        }
        break;
    }
  };

  // 自動表示-----------------------------------------------------------------

  // Change Gold
  const _Game_Interpreter_command125 = Game_Interpreter.prototype.command125;
  Game_Interpreter.prototype.command125 = function (params) {
    _Game_Interpreter_command125.call(this, params);
    if (TickerManager.needAutoGetDisplay()) {
      const value = this.operateValue(params[0], params[1], params[2]);
      TickerManager.showMoneyTicker(value);
    }
    return true;
  };

  // Change Items
  const _Game_Interpreter_command126 = Game_Interpreter.prototype.command126;
  Game_Interpreter.prototype.command126 = function (params) {
    _Game_Interpreter_command126.call(this, params);
    if (TickerManager.needAutoGetDisplay()) {
      const value = this.operateValue(params[1], params[2], params[3]);
      const item = $dataItems[params[0]];
      TickerManager.showItemTicker(item, value);
    }
    return true;
  };

  // Change Weapons
  const _Game_Interpreter_command127 = Game_Interpreter.prototype.command127;
  Game_Interpreter.prototype.command127 = function (params) {
    _Game_Interpreter_command127.call(this, params);
    if (TickerManager.needAutoGetDisplay()) {
      const value = this.operateValue(params[1], params[2], params[3]);
      const item = $dataWeapons[params[0]];
      TickerManager.showItemTicker(item, value);
    }
    return true;
  };

  // Change Armors
  const _Game_Interpreter_command128 = Game_Interpreter.prototype.command128;
  Game_Interpreter.prototype.command128 = function (params) {
    _Game_Interpreter_command128.call(this, params);
    if (TickerManager.needAutoGetDisplay()) {
      const value = this.operateValue(params[1], params[2], params[3]);
      const item = $dataArmors[params[0]];
      TickerManager.showItemTicker(item, value);
    }
    return true;
  };

  // ステート変化時の自動表示------------------------------------------------------

  const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
  Game_BattlerBase.prototype.addNewState = function (stateId) {
    if (TickerManager.needStateChangeDisplay() && this._states && !this._states.contains(stateId)) {
      const state = $dataStates[stateId];
      if (state.message1) TickerManager.show(state.message1.format(this._name));
    }
    _Game_BattlerBase_addNewState.apply(this, arguments);
  };

  const _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
  Game_BattlerBase.prototype.eraseState = function (stateId) {
    if (TickerManager.needStateChangeDisplay() && this._states && this._states.contains(stateId)) {
      const state = $dataStates[stateId];
      if (state.message4) TickerManager.show(state.message4.format(this._name));
    }
    _Game_BattlerBase_eraseState.apply(this, arguments);
  };

  const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
  Game_BattlerBase.prototype.clearStates = function () {
    if (TickerManager.needStateChangeDisplay() && this._states) {
      this._states.forEach(function (stateId) {
        const state = $dataStates[stateId];
        if (state.message4) TickerManager.show(state.message4.format(this._name));
      }.bind(this));
    }
    _Game_BattlerBase_clearStates.apply(this, arguments);
  };

  // 歩行時のウィンドウでのステート表示を消す
  Game_Actor.prototype.showAddedStates = function () {

  };

  Game_Actor.prototype.showRemovedStates = function () {

  };

  // 戦闘中のバトルログをTickerに流す-------------------------------------
  Scene_Battle.prototype.updateLogWindowVisibility = function () { };

  const _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
  Window_BattleLog.prototype.initialize = function (rect) {
    _Window_BattleLog_initialize.call(this, rect);
    this.visible = false;
  };

  Window_BattleLog.prototype.drawLineText = function (index) {
    TickerManager.show(this._lines[index]);
    this._lines.pop();
  };

  // 文字を描画したbitmapを使いたいためだけのwindow。このwindowは表示されず、TickerManagerに保持される。
  function Window_Hidden() {
    this.initialize.apply(this, arguments);
  }
  Window_Hidden.prototype = Object.create(Window_Base.prototype);
  Window_Hidden.prototype.constructor = Window_Hidden;

  Window_Hidden.prototype.initialize = function () {
    Window.prototype.initialize.call(this);
    this.createContents();
    this.padding = 0;
  };

  Window_Hidden.prototype._createAllParts = function () {
    this._createContentsSprite();
  };

  Window_Hidden.prototype._createContentsSprite = function () {
    this._contentsSprite = new Sprite();
  };

  Window_Hidden.prototype.createContents = function () {
    this.destroyContents();
    this.contents = new Bitmap(Graphics.width, $gameSystem.ticker.height + 12);
    this.resetFontSettings();
  };

  Window_Hidden.prototype.destroyContents = function () {
    if (this.contents) {
      this.contents.destroy();
    }
  };

  // 変数にプラス記号をつけるため
  Window_Hidden.prototype.convertEscapeCharacters = function (text) {
    /* eslint no-control-regex: 0 */
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
      $gameVariables.value(parseInt(p1))
    );
    text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
      $gameVariables.value(parseInt(p1))
    );
    // 符号付き変数
    text = text.replace(/\x1bQ\[(\d+)\]/gi, (_, p1) => {
      const v = $gameVariables.value(parseInt(p1));
      return (v > 0 ? '+' : '') + v;
    });
    text = text.replace(/\x1bN\[(\d+)\]/gi, (_, p1) =>
      this.actorName(parseInt(p1))
    );
    text = text.replace(/\x1bP\[(\d+)\]/gi, (_, p1) =>
      this.partyMemberName(parseInt(p1))
    );
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
  };

  Window_Hidden.prototype.processDrawIcon = function (iconIndex, textState) {
    this.drawIcon(iconIndex, textState.x + 2, $gameSystem.ticker.height / 2 - $gameSystem.ticker.iconSize / 2);
    textState.x += $gameSystem.ticker.iconSize + 4;
  };

  Window_Hidden.prototype.drawIcon = function (iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem('IconSet');
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = iconIndex % 16 * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    const size = $gameSystem.ticker.iconSize;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
  };

  Window_Hidden.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 16;
    this.resetTextColor();
  };

  Window_Hidden.prototype.lineHeight = function () {
    return $gameSystem.ticker.height;
  };

  Window_Hidden.prototype.fittingHeight = function (numLines) {
    return numLines * this.itemHeight();
  };

  Window_Hidden.prototype.itemPadding = function () {
    return 0;
  };

  Window_Hidden.prototype.calcTextHeight = function (textState) {
    const lastFontSize = this.contents.fontSize;
    const lines = textState.text.slice(textState.index).split('\n');
    const textHeight = this.maxFontSizeInLine(lines[0]);
    this.contents.fontSize = lastFontSize;
    return textHeight;
  };

  Window_Hidden.prototype._refreshAllParts = function () { };
  Window_Hidden.prototype._refreshBack = function () { };
  Window_Hidden.prototype._refreshFrame = function () { };
  Window_Hidden.prototype._refreshCursor = function () { };
  Window_Hidden.prototype._refreshArrows = function () { };
  Window_Hidden.prototype._refreshPauseSign = function () { };
  Window_Hidden.prototype.updateTransform = function () { };
})();
