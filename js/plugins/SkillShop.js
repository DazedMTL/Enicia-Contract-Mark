/* ---------------------------------------------------------------------------*
 * 2022/02/21 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc スキルショッププラグイン
 * @target MZ
 * @author kido
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help
 * ショップ画面を開く前にプラグインコマンドで対象アクターと経験値で買うか設定します。
 * その後ショップ画面を開くとスキルショップになります。
 * 
 * アイテムに習得スキルを設定し、メモ欄に経験値の値段<SkillExp:n>を設定します
 * 
 * @param moneyGetSE
 * @text お金で買ったときのSE
 * @desc お金で買ったときのSE
 * @dir audio/se/
 * @type file
 * 
 * @param expGetSE
 * @text 経験値で買ったときのSE
 * @desc 経験値で買ったときのSE
 * @dir audio/se/
 * @type file
 * 
 * @command setSkillShop
 * @text スキルショップ画面設定
 * @desc スキルショップ画面の設定をします。このあとのショップコマンドがスキルショップになります
 * 
 * @arg actorId
 * @text アクター番号
 * @desc 対象のアクターを指定します
 * @type actor
 * @default 1
 * 
 * @arg useExp
 * @text 経験値で買う
 * @desc 経験値で買う場合はtrueに
 * @type boolean
 * @default false
 * 
 */

(() => {

  const script = document.currentScript;
  const params = PluginManagerEx.createParameter(script);

  PluginManagerEx.registerCommand(script, 'setSkillShop', function (args) {
    $gameTemp.skillShop = args;
  });

  const _command302 = Game_Interpreter.prototype.command302
  Game_Interpreter.prototype.command302 = function (params) {
    if ($gameTemp.skillShop) {
      if (!$gameSwitches.value(109)) {
        var goods = [params];
        while (this.nextEventCode() === 605) {
          this._index++;
          goods.push(this.currentCommand().parameters);
        }
      } else {
        console.log($gameVariables.value(455))
        var goods = $gameVariables.value(455)
      }
      SceneManager.push(Scene_SkillShop);
      SceneManager.prepareNextScene(goods, $gameActors.actor($gameTemp.skillShop.actorId), $gameTemp.skillShop.useExp);
      $gameTemp.skillShop = null;
      return true;
    }
    _command302.call(this, params);
    return true;
  };

  function getItemSkillId(item) {
    return item.effects.find((e) => e.code == 43).dataId;
  }

  function Scene_SkillShop() {
    this.initialize(...arguments);
  }

  Scene_SkillShop.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_SkillShop.prototype.constructor = Scene_SkillShop;

  Scene_SkillShop.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_SkillShop.prototype.prepare = function (goods, actor, useExp) {
    this._goods = goods;
    this._actor = actor;
    this._useExp = useExp;
    this._item = null;
  };

  Scene_SkillShop.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createStatusWindow();
    this.createBuyWindow();
  };

  Scene_SkillShop.prototype.updateActor = function () {
  };

  Scene_SkillShop.prototype.createGoldWindow = function () {
    const rect = this.goldWindowRect();
    this._goldWindow = new Window_GoldExp(rect, this._actor, this._useExp);
    this.addWindow(this._goldWindow);
  };

  Scene_SkillShop.prototype.goldWindowRect = function () {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = Graphics.boxWidth - ww;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_SkillShop.prototype.createCommandWindow = function () {
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_SkillShopCommand(rect);
    this._commandWindow.y = this.mainAreaTop();
    this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
    this._commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_SkillShop.prototype.commandWindowRect = function () {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = this._goldWindow.x;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_SkillShop.prototype.createStatusWindow = function () {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_SkillShopStatus(rect, this._actor);
    this.addWindow(this._statusWindow);
  };

  Scene_SkillShop.prototype.statusWindowRect = function () {
    const ww = this.statusWidth();
    const wh = this.mainAreaHeight() - this._commandWindow.height;
    const wx = Graphics.boxWidth - ww;
    const wy = this._commandWindow.y + this._commandWindow.height;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_SkillShop.prototype.createBuyWindow = function () {
    const rect = this.buyWindowRect();
    this._buyWindow = new Window_SkillShopBuy(rect);
    this._buyWindow.setupGoods(this._goods, this._useExp, this._actor);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
    this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
    this._buyWindow.setMoney(this.money());
    this.addWindow(this._buyWindow);
  };

  Scene_SkillShop.prototype.buyWindowRect = function () {
    const wx = 0;
    const wy = this._statusWindow.y;
    const ww = Graphics.boxWidth - this.statusWidth();
    const wh = this._statusWindow.height;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_SkillShop.prototype.statusWidth = function () {
    return 352;
  };

  Scene_SkillShop.prototype.commandBuy = function () {
    this._buyWindow.activate();
    this._buyWindow.select(0);
  };

  Scene_SkillShop.prototype.onBuyOk = function () {
    this._item = this._buyWindow.item();
    let se = { volume: 90, pitch: 100 };
    if (this._useExp) {
      this._actor.tmpExp -= this.buyingPrice();
      se.name = params.expGetSE;
      AudioManager.playSe(se);
    } else {
      $gameParty.loseGold(this.buyingPrice());
      se.name = params.moneyGetSE;
      AudioManager.playSe(se);
    }
    this._actor.learnSkill(getItemSkillId(this._item));
    this._buyWindow.refresh();
    this._goldWindow.refresh();
    this._statusWindow.refresh();
    this._buyWindow.setMoney(this.money());
    this._buyWindow.activate();
  };

  Scene_SkillShop.prototype.onBuyCancel = function () {
    this._commandWindow.activate();
    this._statusWindow.setItem(null);
    this._helpWindow.clear();
    this._buyWindow.deselect();
  };


  Scene_SkillShop.prototype.money = function () {
    return this._goldWindow.value();
  };

  Scene_SkillShop.prototype.buyingPrice = function () {
    return this._buyWindow.price(this._item);
  };

  //----------------------------------------------------------------------
  function Window_SkillShopBuy() {
    this.initialize(...arguments);
  }

  Window_SkillShopBuy.prototype = Object.create(Window_ShopBuy.prototype);
  Window_SkillShopBuy.prototype.constructor = Window_SkillShopBuy;

  Window_SkillShopBuy.prototype.initialize = function (rect) {
    Window_ShopBuy.prototype.initialize.call(this, rect);
  };

  Window_SkillShopBuy.prototype.setupGoods = function (shopGoods, useExp, actor) {
    this._shopGoods = shopGoods;
    this._useExp = useExp;
    this._actor = actor;
    this.refresh();
  };

  Window_SkillShopBuy.prototype.price = function (item) {
    if (this._useExp) return item.meta.SkillExp;
    else return item.price;
  };

  Window_SkillShopBuy.prototype.isEnabled = function (item) {
    var levelFlag = true
    if (item.meta.learnLV && this._actor.level < Number(item.meta.learnLV)) levelFlag = false
    return (
      item && this.price(item) <= this._money && !this._actor.isLearnedSkill(getItemSkillId(item)) && levelFlag
    );
  };

  Window_SkillShopBuy.prototype.makeItemList = function () {
    this._data = [];
    for (const goods of this._shopGoods) {
      const item = this.goodsToItem(goods);
      if (item) {
        this._data.push(item);
      }
    }
  };

  Window_SkillShopBuy.prototype.drawItem = function (index) {
    const item = this.itemAt(index);
    const price = this.price(item);
    const rect = this.itemLineRect(index);
    const priceWidth = this.priceWidth();
    const priceX = rect.x + rect.width - priceWidth;
    const nameWidth = rect.width - priceWidth;
    this.changePaintOpacity(this.isEnabled(item));
    var replace = SH_replaceItemText(item)
    this.drawItemName(replace, rect.x, rect.y, nameWidth);
    if (this._actor.isLearnedSkill(getItemSkillId(item))) {
      this.drawText('Learned', priceX, rect.y, priceWidth, "right");
    } else {
      this.drawText(price, priceX, rect.y, priceWidth, "right");
    }
    this.changePaintOpacity(true);
  };

  //----------------------------------------------------------------------

  function Window_SkillShopStatus() {
    this.initialize(...arguments);
  }

  Window_SkillShopStatus.prototype = Object.create(Window_Base.prototype);
  Window_SkillShopStatus.prototype.constructor = Window_SkillShopStatus;

  Window_SkillShopStatus.prototype.initialize = function (rect, actor) {
    Window_Base.prototype.initialize.call(this, rect);
    this._actor = actor;
    this.refresh();
  };

  Window_SkillShopStatus.prototype.refresh = function () {
    this.contents.clear();
    const x = this.itemPadding();
    this.drawText(this._actor.name(), x, 0, this.innerWidth);
    if (this._item) {
      if (this._actor.isLearnedSkill(getItemSkillId(this._item))) this.drawText('Learned', x, this.lineHeight(), this.innerWidth)
    }
  };

  Window_SkillShopStatus.prototype.setItem = function (item) {
    this._item = item;
    this.refresh();
  };


  //----------------------------------------------------------------------
  function Window_SkillShopCommand() {
    this.initialize(...arguments);
  }

  Window_SkillShopCommand.prototype = Object.create(Window_HorzCommand.prototype);
  Window_SkillShopCommand.prototype.constructor = Window_SkillShopCommand;

  Window_SkillShopCommand.prototype.initialize = function (rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
  };

  Window_SkillShopCommand.prototype.maxCols = function () {
    return 2;
  };

  Window_SkillShopCommand.prototype.makeCommandList = function () {
    this.addCommand('Buy', "buy");
    this.addCommand(TextManager.cancel, "cancel");
  };

  //----------------------------------------------------------------------
  function Window_GoldExp() {
    this.initialize(...arguments);
  }

  Window_GoldExp.prototype = Object.create(Window_Selectable.prototype);
  Window_GoldExp.prototype.constructor = Window_GoldExp;

  Window_GoldExp.prototype.initialize = function (rect, actor, useExp) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._useExp = useExp;
    this._actor = actor;
    this.refresh();
  };

  Window_GoldExp.prototype.colSpacing = function () {
    return 0;
  };

  Window_GoldExp.prototype.refresh = function () {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y, width);
  };

  Window_GoldExp.prototype.value = function () {
    if (this._useExp) return this._actor.tmpExp;
    else return $gameParty.gold()
  };

  Window_GoldExp.prototype.currencyUnit = function () {
    if (this._useExp) return TextManager.expA;
    else return TextManager.currencyUnit;
  };

  Window_GoldExp.prototype.open = function () {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
  };



})();