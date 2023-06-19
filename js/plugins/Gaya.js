/* ---------------------------------------------------------------------------*
 * 2023/01/07 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc ガヤプラグイン
 * @target MZ
 * @base PluginCommonBase
 * @author kido
 * @help
 * 
 * @param randomAngle
 * @text ランダム角度
 * @desc 
 * @default 15
 * 
 * @param animY
 * @text アニメーションy移動
 * @desc 表示するときに移動する量
 * @default 10
 * 
 * @param easingType
 * @text アニメーション緩急
 * @desc 
 * @default easeInOutSine
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
 * @param fontFace
 * @text フォント
 * @desc 
 * @default
 * 
 * @param x
 * @text 表示範囲x
 * 
 * @param y
 * @text 表示範囲y
 * 
 * @param width
 * @text 表示範囲幅
 * 
 * @param height
 * @text 表示範囲高さ
 * 
 * @param pWidth
 * @text プレイヤー周囲表示除外幅
 * @desc 100ならプレイヤーの左右100px除外
 * 
 * @param pHeight
 * @text プレイヤー周囲表示除外高さ
 * @desc 100ならプレイヤーの上下100px除外
 * 
 * @param playerExceptSW
 * @text プレイヤー周囲表示除外スイッチ
 * @type switch
 * 
 * @param verticalSW
 * @text 縦書きスイッチ
 * @type switch
 * 
 * @command show
 * @text 表示
 *
 * @arg text
 * @text テキスト
 * @type multiline_string
 *
 * @arg fontSize
 * @text フォントサイズ
 * 
 * @arg duration
 * @text 表示時間[frame]
 * 
 * @arg fadeDuration
 * @text フェード時間[frame]
 * 
 * 
 * @command hide
 * @text 一括消去
 */


(() => {
  const script = document.currentScript;
  const params = PluginManagerEx.createParameter(script);

  PluginManagerEx.registerCommand(script, 'show', function (args) {
    let scene = SceneManager._scene;
    if (!scene.gayaContainer) {
      scene.gayaContainer = new GayaContainer();
      for (var i = 0; i < scene.children.length; i++) {
        if (scene.children[i] instanceof WindowLayer) {
          scene.addChildAt(scene.gayaContainer, i);
          break;
        }
      }
    }
    scene.gayaContainer.showText(args);
  });

  PluginManagerEx.registerCommand(script, 'hide', function (args) {
    let scene = SceneManager._scene;
    if (scene.gayaContainer) scene.gayaContainer.hideAll();
  });

  function GayaContainer() {
    PIXI.Container.call(this);
    this.windowHidden = new Window_Hidden();
  }

  GayaContainer.prototype = Object.create(PIXI.Container.prototype);
  GayaContainer.prototype.constructor = GayaContainer;

  GayaContainer.prototype.update = function () {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].update();
      if (this.children[i].state == 'finish') {
        this.removeChildAt(i);
        i--;
      }
    }
  };

  GayaContainer.prototype.showText = function (param) {
    this.windowHidden.makeBitmap(param);
    let sprite = new Sprite_Gaya(param);
    this.addChild(sprite);
    sprite.start(this.windowHidden.contents);
  };

  GayaContainer.prototype.hideAll = function () {
    this.removeChildren();
  };

  function Sprite_Gaya(param) {
    this.param = param;
    this.initialize(...arguments);
  }

  Sprite_Gaya.prototype = Object.create(Sprite.prototype);
  Sprite_Gaya.prototype.constructor = Sprite_Gaya;

  Sprite_Gaya.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.count = 0;
    this.state = 'fadein';
    this.angle = Math.randomInt(params.randomAngle);
    if (Math.randomInt(2) == 0) this.angle = -this.angle;
    this.opacity = 0;
  };

  Sprite_Gaya.prototype.start = function (bitmap) {
    this.bitmap = bitmap;
    let px = $gamePlayer.screenX(), py = $gamePlayer.screenY();
    for (var i = 0; i < 100; i++) {
      let randomX = Math.randomInt(params.width - bitmap.width);
      this.x = params.x + randomX;
      let randomY = Math.randomInt(params.height - bitmap.height);
      this.y = this.originY = params.y + randomY;
      if ($gameSwitches.value(params.playerExceptSW)) {
        if (this.x + bitmap.width < px - params.pWidth || this.x > px + params.pWidth || this.y + bitmap.height < py - params.pHeight || this.y > py + params.pHeight) break;
      } else {
        break;
      }
    }
  };

  Sprite_Gaya.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.count++;
    if (this.state == 'fadein') {
      this.opacity = this.count / this.param.fadeDuration * 255;
      this.y = this.originY + params.animY - Torigoya.FrameTween.Easing[params.easingType](this.count / this.param.fadeDuration) * params.animY;
      if (this.count == this.param.fadeDuration) {
        this.state = 'display';
        this.count = 0;
      }
    } else if (this.state == 'display') {
      if (this.count == this.param.duration) {
        this.state = 'fadeout';
        this.count = 0;
      }
    } else if (this.state == 'fadeout') {
      this.opacity = (1 - this.count / this.param.fadeDuration) * 255;
      if (this.count == this.param.fadeDuration) {
        this.state = 'finish';
      }
    }
  };

  function Window_Hidden() {
    this.initialize.apply(this, arguments);
  }
  Window_Hidden.prototype = Object.create(Window_Base.prototype);
  Window_Hidden.prototype.constructor = Window_Hidden;

  Window_Hidden.prototype.initialize = function () {
    Window.prototype.initialize.call(this);
    this.padding = 0;
    this.fontSize = 0;
    this.fontFace = params.fontFace ? params.fontFace : $gameSystem.mainFontFace();
    this.contents = new Bitmap(100, 100);
  };

  Window_Hidden.prototype.makeBitmap = function (param) {
    this.fontSize = param.fontSize;
    this.text = param.text;
    this.createContents();
    this.drawTextEx(this.text, 0, 0, this.contents.width);
  };

  Window_Hidden.prototype._createAllParts = function () {
    this._createContentsSprite();
  };

  Window_Hidden.prototype._createContentsSprite = function () {
    this._contentsSprite = new Sprite();
  };

  Window_Hidden.prototype.createContents = function () {
    if (!this.text) return;
    const size = this.textSizeEx(this.text)
    this.resetFontSettings();
    this.contents = new Bitmap(size.width, size.height);
  };

  Window_Hidden.prototype.destroyContents = function () {
    if (this.contents) {
      this.contents.destroy();
    }
  };

  Window_Hidden.prototype.processCharacter = function (textState) {
    const c = textState.text[textState.index++];
    if (c.charCodeAt(0) < 0x20) {
      this.flushTextState(textState);
      this.processControlCharacter(textState, c);
    } else {
      textState.buffer += c;
      if ($gameSwitches.value(params.verticalSW)) {
        this.flushTextState(textState);
        this.processNewLine(textState);
      }
    }
  };


  Window_Hidden.prototype.drawIcon = function (iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem('IconSet');
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = iconIndex % 16 * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    const size = this.fontSize;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
  };

  Window_Hidden.prototype.resetFontSettings = function () {
    this.contents.fontFace = this.fontFace;
    this.contents.fontSize = this.fontSize;
    this.resetTextColor();
  };

  Window_Hidden.prototype.lineHeight = function () {
    return this.contents.fontSize;
  };

  Window_Hidden.prototype.fittingHeight = function (numLines) {
    return numLines * this.itemHeight();
  };

  Window_Hidden.prototype.itemPadding = function () {
    return 0;
  };

  Window_Hidden.prototype.calcTextHeight = function (textState) {
    const lineSpacing = this.lineHeight() - this.contents.fontSize;
    const lastFontSize = this.contents.fontSize;
    const lines = textState.text.slice(textState.index).split("\n");
    const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
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
