/* ---------------------------------------------------------------------------*
 * 2023/01/05 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc 魚釣りプラグイン
 * @target MZ
 * @base PluginCommonBase
 * @author kido
 * @help
 * パラメータ各種はPluguinCommonBaseをベースにしているので\V[10]など指定可能です
 * 
 * ゲージの重ね順は以下です
 * バー > フレーム > 大成功 > 成功 > ゲージ
 *  
 * 
 * @command start
 * @text スタート
 * @desc
 *
 * @arg itemId
 * @text アイテムID
 * @desc \V[10]のようにアイテムIDを格納した変数を指定可
 *
 * @command destroy
 * @text 表示消す
 * @desc ゲージ等の表示を消します
 *
 * @param frameX
 * @text フレーム座標X
 * @desc
 * @default 100
 * @type number
 * 
 * @param frameY
 * @text フレーム座標Y
 * @desc
 * @default 100
 * @type number
 *  
 * @param frameImg
 * @text フレームの画像指定
 * @desc
 * @default
 * @type file
 * @dir img/system
 * 
 * @param gaugeX
 * @text ゲージ座標X
 * @desc
 * @default 10
 * @type number
 * 
 * @param gaugeY
 * @text ゲージ座標Y
 * @desc
 * @default 10
 * @type number
 * 
 * @param gaugeImg
 * @text ゲージの画像指定
 * @desc このゲージ内をバーが動きます
 * @default
 * @type file
 * @dir img/system
 * 
 * @param successImg
 * @text 成功の画像指定
 * @desc 
 * @default
 * @type file
 * @dir img/system
 * 
 * @param bigSuccessImg
 * @text 大成功の画像指定
 * @desc 
 * @default
 * @type file
 * @dir img/system
 * 
 * @param barImg
 * @text バー画像指定
 * @desc
 * @default
 * @type file
 * @dir img/system
 * 
 * @param duration
 * @text ゲージ速度
 * @desc 何フレームで端から端まで移動するか
 * @default 90
 * @type number
 * 
 * @param autoEnableSW
 * @text オート実行有効化スイッチ
 * @desc ONの時、自動的に魚釣りをします
 * @type switch
 * @default 0
 *
 * @param randomEnableSW
 * @text 成功位置ランダム有効化スイッチ
 * @desc ONの時、成功の位置がランダムになります
 * @type switch
 * @default 0
 * 
 * @param resultVar
 * @text 釣り結果格納変数
 * @desc 0:失敗 1:成功 2:大成功 が格納されます
 * @type variable
 * 
 * @param bigSuccessGaugeWidthRate
 * @text 大成功の幅割合
 * @desc 成功に大してどのくらいの割合か
 * @default 0.2
 * @type 
 * 
 * @param easingType
 * @text 緩急
 * @desc 緩急をつけられます
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
 */


(() => {
  const script = document.currentScript;
  const param = PluginManagerEx.createParameter(script);

  PluginManagerEx.registerCommand(script, 'start', function (args) {
    let item = $dataItems[args.itemId];
    let scene = SceneManager._scene;
    scene.fishingContainer = new FishingContainer(item);
    scene.addChild(scene.fishingContainer);
    this.setWaitMode('fishing');
  });

  PluginManagerEx.registerCommand(script, 'destroy', function (args) {
    let scene = SceneManager._scene;
    scene.removeChild(scene.fishingContainer);
    scene.fishingContainer = null;
  });

  const _updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function () {
    if (this._waitMode == 'fishing') {
      let waiting = SceneManager._scene.fishingContainer.isFishing;
      if (!waiting) this._waitMode = '';
      return waiting;
    } else {
      return _updateWaitMode.call(this);
    }
  };

  function FishingContainer(item) {
    this.successRate = parseInt(item.meta.fishGauge) / 100;
    this.isFishing = true;
    this.isBmpLoaded = false;
    this.barBmp = ImageManager.loadSystem(param.barImg);
    this.frameBmp = ImageManager.loadSystem(param.frameImg);
    this.gaugeBmp = ImageManager.loadSystem(param.gaugeImg);
    this.successBmp = ImageManager.loadSystem(param.successImg);
    this.bigSuccessBmp = ImageManager.loadSystem(param.bigSuccessImg);
    this.count = 0;
    this.dir = 1;
    this.isAuto = $gameSwitches.value(param.autoEnableSW);
    PIXI.Container.call(this);
  }

  FishingContainer.prototype = Object.create(PIXI.Container.prototype);
  FishingContainer.prototype.constructor = FishingContainer;

  FishingContainer.prototype.update = function () {
    if (!this.isBmpLoaded) {
      this.isBmpLoaded = this.barBmp.isReady() && this.frameBmp.isReady() && this.gaugeBmp.isReady() && this.successBmp.isReady() && this.bigSuccessBmp.isReady();
      if (this.isBmpLoaded) this.makeGauge();
      return;
    }
    if (!this.isFishing) return;
    if (!this.isAuto && (Input.isTriggered("ok") || TouchInput.isTriggered())) {
      this.endFishing();
      return;
    }
    this.moveBar();
  };

  FishingContainer.prototype.moveBar = function () {
    this.count++;
    let rateTmp = Torigoya.FrameTween.Easing[param.easingType](this.count / param.duration);
    let rate = this.dir == 1 ? rateTmp : 1 - rateTmp;
    this.barSprite.x = this.gaugeSprite.x + (this.gaugeSprite.width - this.barSprite.width) * rate;
    if (rateTmp >= 1) {
      this.count = 0;
      this.dir *= -1;
    }
    if (this.isAuto) {
      if ((this.isFitSuccess() && this.getResult() == 1) || (this.dir == -1 && this.getResult() == 1)) { //後半はfitしないケースがあった場合の念のため
        this.endFishing();
      }
    }
  };

  FishingContainer.prototype.makeGauge = function () {
    this.gaugeSprite = new Sprite(this.gaugeBmp);
    this.gaugeSprite.x = param.gaugeX;
    this.gaugeSprite.y = param.gaugeY;
    this.addChild(this.gaugeSprite);

    this.successSprite = new Sprite(this.successBmp);
    this.successSprite.scale.x = this.gaugeBmp.width * this.successRate / this.successSprite.width;
    let successX;
    if ($gameSwitches.value(param.randomEnableSW)) {
      let w = this.successSprite.width * this.successSprite.scale.x;
      successX = Math.randomInt(this.gaugeSprite.width - w);
      this.successSprite.x = successX;
    } else {
      this.successSprite.x = this.gaugeSprite.width / 2 - this.successSprite.width * this.successSprite.scale.x / 2;
    }
    this.gaugeSprite.addChild(this.successSprite);

    this.bSuccessSprite = new Sprite(this.bigSuccessBmp);
    this.bSuccessSprite.scale.x = this.gaugeBmp.width * this.successRate * param.bigSuccessGaugeWidthRate / this.bSuccessSprite.width;
    if ($gameSwitches.value(param.randomEnableSW)) {
      this.bSuccessSprite.x = successX + this.successSprite.width * this.successSprite.scale.x / 2 - this.bSuccessSprite.width * this.bSuccessSprite.scale.x / 2;
    } else {
      this.bSuccessSprite.x = this.gaugeSprite.width / 2 - this.bSuccessSprite.width * this.bSuccessSprite.scale.x / 2;
    }
    this.gaugeSprite.addChild(this.bSuccessSprite);

    let frameSprite = new Sprite(this.frameBmp);
    frameSprite.x = param.frameX;
    frameSprite.y = param.frameY;
    this.addChild(frameSprite);

    this.barSprite = new Sprite(this.barBmp);
    this.barSprite.x = this.gaugeSprite.x;
    this.barSprite.y = frameSprite.y - (this.barBmp.height - this.frameBmp.height) / 2;
    this.addChild(this.barSprite);
  };

  FishingContainer.prototype.endFishing = function () {
    this.isFishing = false;
    $gameVariables.setValue(param.resultVar, this.getResult());
  };

  FishingContainer.prototype.getResult = function () {
    const barX = this.barSprite.x, barW = this.barSprite.width;
    const sX = this.successSprite.getGlobalPosition().x, sW = this.successSprite.width * this.successSprite.scale.x;
    const bsX = this.bSuccessSprite.getGlobalPosition().x, bsW = this.bSuccessSprite.width * this.bSuccessSprite.scale.x;
    let result = 0;
    if (barX + barW >= bsX && barX <= bsX + bsW) result = 2;
    else if (barX + barW >= sX && barX <= sX + sW) result = 1;
    return result;
  };

  FishingContainer.prototype.isFitSuccess = function () {
    const barX = this.barSprite.x, barW = this.barSprite.width;
    const w = this.successSprite.width * this.successSprite.scale.x;
    const sX = this.successSprite.getGlobalPosition().x + w / 5, sW = this.successSprite.width * this.successSprite.scale.x - w / 5;
    return barX + barW >= sX && barX <= sX + sW;
  };

})();
