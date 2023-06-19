/* ---------------------------------------------------------------------------*
 * 2022/02/21 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc 成長関係プラグイン
 * @target MZ
 * @author kido
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help
 * レベルアップ画面を表示するにはプラグインコマンドを呼んでください
 * 
 * スクリプトでアクターに経験値を加える
 * $gameActors.actor(1).changeExp(30);
 * パーティ全体に経験値を加える
 * $gameParty.changeExp(30);
 * レベルポイントをリセットする
 * $gameParty.members()[0].resetManualLevelUp()
 * 
 * 所持ポイントを変更する
 * $gameActors.actor(1).levelPoint = 3;
 * 
 * @param levelUpSW
 * @text レベルアップ時にONになるスイッチ
 * @desc レベルアップ時にONになるスイッチ
 * @type switch
 * @default 0
 * 
 * @param paramUpSW
 * @text パラメータアップ時にONになるスイッチ
 * @desc パラメータアップ時にONになるスイッチ
 * @type switch
 * @default 0
 * 
 * @param paramUpMax
 * @text アップ可能上限
 * @desc パラメータアップ可能な上限値
 * @type number
 * @default 10
 * 
 * 
 * @command showScene
 * @text レベルアップ画面表示
 * @desc レベルアップ画面を表示します
 */

(() => {
  const script = document.currentScript;
  const params = PluginManagerEx.createParameter(script);

  const helps = [
    'Level: By increasing the level, HP and SP increase and you \nobtain Parameter Points.',
    'Strength: Affects the power of [Strength Check] weapons and skills.\nIt affects the success rate of escape checks. It also affects the \nmaximum HP.',
    'Dexterity: Affects the power of [Dexterity Check] weapons and skills.\nIt affects the success rate of evasion, escape, and lockpicking checks. \nIt also affects the maximum SP.',
    'Mental: Affects the power of [Mental Check] weapons and skills.\nIt affects the success rate of resistance checks. \nIt also affects the maximum HP and SP.',
    'Luck: Affects the evasion rate of status abnormalities. \nThe average value influences the rarity rate of treasure boxes.\nIt also affects the results of collection checks and certain event checks.'
  ];
  const yesNo = ['Yes', 'No'];
  const confirmText = "Do you want to allocate points to the \nparameter? Note that it's not possible to \nreallocate them later.";

  PluginManagerEx.registerCommand(script, "showScene", function (args) {
    SceneManager.push(Scene_LevelUp);
  });

  const _gameActorSetup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function (actorId) {
    _gameActorSetup.call(this, actorId);
    this.levelPoint = 0;
    this.tmpExp = 0;
  };

  Game_Actor.prototype.changeExp = function (exp, show) {
    this.tmpExp += exp;
    this.refresh();
  };

  Game_Actor.prototype.gainExp = function (exp) {
    this.changeExp(exp, this.shouldDisplayLevelUp());
  };

  Game_Actor.prototype.nextRequiredExpAlter = function () {
    return this.nextLevelExp() - this.currentLevelExp();
  };

  Game_Actor.prototype.changeLevel = function (level, show) {
    level = level.clamp(1, this.maxLevel());
    while (!this.isMaxLevel() && level != this._level) {
      this.levelUp();
    }
    while (level != this._level) {
      this.levelDown();
    }
  };

  Game_Interpreter.prototype.command315 = function (params) {
    const value = this.operateValue(params[2], params[3], params[4]);
    this.iterateActorEx(params[0], params[1], actor => {
      actor.changeExp(value, params[5]);
    });
    return true;
  };

  Game_Actor.prototype.changeClass = function (classId, keepExp) {
    if (!keepExp) {
      this.tmpExp = 0;
      this._level = 1;
    }
    this._classId = classId;
    this._exp[this._classId] = 0;
    this.refresh();
  };

  Game_Actor.prototype.paramBasePlusExcludeEquip = function (paramId) {
    let value = Game_Battler.prototype.paramPlus.call(this, paramId);

    return this.paramBase(paramId) + value;
  };

  Game_Party.prototype.changeExp = function (exp) {
    let actors = this.allMembers();
    for (let actor of actors) actor.changeExp(exp);
  };

  const _levelUp = Game_Actor.prototype.levelUp;
  Game_Actor.prototype.levelUp = function () {
    _levelUp.call(this);
    this.levelPoint++;
  };

  Game_Actor.prototype.resetManualLevelUp = function () {
    this.clearParamPlus();
    this.levelPoint = this._level - 1;
    if (this.actor().meta.userchara) this.levelPoint += 3;
  };

  function Scene_LevelUp() {
    this.initialize(...arguments);
  }

  Scene_LevelUp.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_LevelUp.prototype.constructor = Scene_LevelUp;

  Scene_LevelUp.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_LevelUp.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createActorWindow();
    this.createLevelUpWindow();
    this.createConfirmWindow();
    this._actorWindow.select(0);
  };

  Scene_LevelUp.prototype.helpWindowRect = function () {
    const wx = 0;
    const wy = Graphics.boxHeight - this.calcWindowHeight(2, true);
    const ww = 700
    const wh = this.calcWindowHeight(2, true);
    return new Rectangle(wx, wy, ww, wh);
  };


  Scene_LevelUp.prototype.createActorWindow = function () {
    this._actorWindow = new Window_ActorList(0, 0, 300);
    this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
    this._actorWindow.setHandler("cancel", this.popScene.bind(this));
    this._actorWindow.activate();
    this._actorWindow.refresh();
    this.addWindow(this._actorWindow);
  };


  Scene_LevelUp.prototype.createLevelUpWindow = function () {
    this._levelUpWindow = new Window_LevelUp(new Rectangle(this._actorWindow.width, 0, 400, Graphics.boxHeight - this._helpWindow.height));
    this._levelUpWindow.setHandler("ok", this.onLevelUpOk.bind(this));
    this._levelUpWindow.setHandler("cancel", () => {
      this._actorWindow.activate();
      this._levelUpWindow.deselect();
    });
    this._levelUpWindow.refresh();
    this._levelUpWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._levelUpWindow);

    this._actorWindow.setLevelUpWindow(this._levelUpWindow);
  };

  Scene_LevelUp.prototype.createConfirmWindow = function () {
    let width = 470, height = 250;
    this._confirmWindow = new Window_StatusUpConfirm(new Rectangle(
      Graphics.boxWidth / 2 - width / 2, Graphics.boxHeight / 2 - height / 2, width, height
    ));
    this._confirmWindow.setHandler("yes", this.onOkConfirmWindow.bind(this));
    this._confirmWindow.setHandler("no", this.onCancelConfirmWindow.bind(this));
    this._confirmWindow.setHandler("cancel", this.onCancelConfirmWindow.bind(this));
    this._confirmWindow.hide();
    this.addChild(this._confirmWindow);
  };

  Scene_LevelUp.prototype.onActorOk = function () {
    this._levelUpWindow.activate();
    this._levelUpWindow.select(0);
  };

  Scene_LevelUp.prototype.onLevelUpOk = function () {
    const index = this._levelUpWindow.index();
    const actor = this._actorWindow.item();
    if (index == 0) {
      $gameSwitches.setValue(params.levelUpSW, true);
      actor.tmpExp -= actor.nextRequiredExpAlter();
      actor.levelUp();
      this._levelUpWindow.activate();
      this._levelUpWindow.refresh();
    } else {
      this._confirmWindow.setParamName(TextManager.param([2, 6, 4, 7][index - 1]));
      this._confirmWindow.show();
      this._confirmWindow.activate();
      this._confirmWindow.select(0);
    }
  };

  Scene_LevelUp.prototype.findStandPictureMember = function () {
    if (!this._actorWindow) return [];
    return [this._actorWindow.item()];
  };

  Scene_LevelUp.prototype.onOkConfirmWindow = function () {
    const index = this._levelUpWindow.index();
    const actor = this._actorWindow.item();
    $gameSwitches.setValue(params.paramUpSW, true);
    actor.levelPoint--;
    actor.addParam([2, 6, 4, 7][index - 1], 1);
    this._confirmWindow.hide();
    this._levelUpWindow.activate();
    this._levelUpWindow.refresh();
  };

  Scene_LevelUp.prototype.onCancelConfirmWindow = function () {
    this._confirmWindow.hide();
    this._levelUpWindow.activate();
    this._levelUpWindow.refresh();
  };

  window.Scene_LevelUp = Scene_LevelUp;

  //----------------------------------------------------------------------
  function Window_ActorList() {
    this.initialize(...arguments);
  }

  Window_ActorList.prototype = Object.create(Window_Selectable.prototype);
  Window_ActorList.prototype.constructor = Window_ActorList;

  Window_ActorList.prototype.initialize = function (x, y, width) {
    Window_Selectable.prototype.initialize.call(this, new Rectangle(x, y, width, this.fittingHeight(3)));
  };


  Window_ActorList.prototype.maxItems = function () {
    return $gameParty.size();
  };

  Window_ActorList.prototype.item = function () {
    return $gameParty.members()[this.index()];
  };

  Window_ActorList.prototype.setLevelUpWindow = function (luw) {
    this._levelUpWindow = luw;
  };

  Window_ActorList.prototype.drawItem = function (index) {
    let actor = $gameParty.members()[index];
    const rect = this.itemRectWithPadding(index);
    this.drawText(actor.name(), rect.x, rect.y, rect.width);
  };

  Window_ActorList.prototype.select = function (index) {
    Window_Selectable.prototype.select.call(this, index);
    if (this._levelUpWindow) {
      this._levelUpWindow.setActor(this.item());
      this._levelUpWindow.refresh();
    }
  };

  //----------------------------------------------------------------------
  function Window_LevelUp() {
    this.initialize(...arguments);
  }

  Window_LevelUp.prototype = Object.create(Window_Selectable.prototype);
  Window_LevelUp.prototype.constructor = Window_LevelUp;

  Window_LevelUp.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
  };

  Window_LevelUp.prototype.maxItems = function () {
    return 5;
  };

  Window_LevelUp.prototype.setActor = function (actor) {
    this._actor = actor;
    this.refresh();
  }

  Window_LevelUp.prototype.isItemEnabled = function (index) {
    if (index == 0) {
      return this.hasEnoughExp();
    } else {
      let paramId = [2, 6, 4, 7][index - 1];
      if (this._actor._paramPlus[paramId] >= params.paramUpMax) return false;
      return this._actor.levelPoint > 0;
    }
  };

  Window_LevelUp.prototype.isCurrentItemEnabled = function () {
    return this.isItemEnabled(this.index());
  };

  Window_LevelUp.prototype.hasEnoughExp = function () {
    return this._actor.tmpExp >= this._actor.nextRequiredExpAlter() && !this._actor.isMaxLevel();
  };

  Window_LevelUp.prototype.drawAllItems = function () {
    Window_Selectable.prototype.drawAllItems.call(this);
    if (!this._actor) return;
    this.resetTextColor();
    this.changePaintOpacity(true);
    const exp = TextManager.expA;
    let str = 'Current ' + exp + '(' + this._actor.tmpExp + ')' + ' / ';
    if (!this._actor.isMaxLevel()) str += 'Required ' + exp + '(' + this._actor.nextRequiredExpAlter() + ')';
    else str += 'Required ' + exp + '(-)';
    this.drawText(str, this.itemPadding() + this.colSpacing() / 2, 0, this.innerWidth);
    this.drawText('Remaining Points(' + this._actor.levelPoint + ')', this.itemPadding() + this.colSpacing() / 2, this.itemHeight() * 2 + this.rowSpacing() / 2, this.innerWidth);


    this.drawText('Current Status', this.itemPadding() + this.colSpacing() / 2, this.itemHeight() * 7 + this.rowSpacing() / 2, this.innerWidth);
    this.drawStatusParams();
  };

  Window_LevelUp.prototype.drawItem = function (index) {
    if (!this._actor) return;

    const rect = this.itemRectWithPadding(index);
    this.changePaintOpacity(this.isItemEnabled(index));
    if (index == 0) {
      this.drawLevelUp(rect.x, rect.y);
    } else {
      const params = [2, 6, 4, 7];
      this.drawParamUp(rect.x, rect.y, index);
    }
  };

  Window_LevelUp.prototype.drawLevelUp = function (x, y) {
    const paramX = this.paramX();
    const paramWidth = this.paramWidth();
    const rightArrowWidth = this.rightArrowWidth();
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.level, x, y, this.innerWidth);
    this.resetTextColor();
    this.drawText(this._actor.level, paramX - rightArrowWidth, y, paramWidth, 'right');

    if (!this._actor.isMaxLevel()) this.drawRightArrow(paramX + paramWidth, y);
    if (this.hasEnoughExp()) {
      this.changeTextColor(ColorManager.paramchangeTextColor(1));
      this.drawText(this._actor.level + 1, paramX + paramWidth + rightArrowWidth, y, paramWidth, 'right');
    }
  };

  Window_LevelUp.prototype.drawParamUp = function (x, y, index) {
    let paramId = [2, 6, 4, 7][index - 1];
    const paramX = this.paramX();
    const paramWidth = this.paramWidth();
    const rightArrowWidth = this.rightArrowWidth();
    this.drawParamName(x, y, paramId);
    this.drawCurrentParam(paramX - rightArrowWidth, y, paramId);
    this.drawRightArrow(paramX + paramWidth, y);
    if (this._actor.levelPoint > 0 && this.isItemEnabled(index)) {
      this.drawNewParam(paramX + paramWidth + rightArrowWidth, y, paramId);
    } else if (this._actor._paramPlus[paramId] >= params.paramUpMax) {
      this.changeTextColor(ColorManager.deathColor());
      this.drawText('MAX', paramX + paramWidth + rightArrowWidth, y, this.paramWidth(), 'right')
      this.resetTextColor();
    }
  };

  Window_LevelUp.prototype.drawParamName = function (x, y, paramId) {
    const width = this.paramX() - this.itemPadding() * 2;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.param(paramId), x, y, width);
  };

  Window_LevelUp.prototype.drawCurrentParam = function (x, y, paramId) {
    const paramWidth = this.paramWidth();
    this.resetTextColor();
    this.drawText(this._actor.paramBasePlusExcludeEquip(paramId), x, y, paramWidth, "right");
  };

  Window_LevelUp.prototype.drawRightArrow = function (x, y) {
    const rightArrowWidth = this.rightArrowWidth();
    this.changeTextColor(ColorManager.systemColor());
    this.drawText("\u2192", x, y, rightArrowWidth, "center");
  };

  Window_LevelUp.prototype.drawNewParam = function (x, y, paramId) {
    const paramWidth = this.paramWidth();
    const newValueBase = this._actor.paramBasePlusExcludeEquip(paramId) + 1;
    this.changeTextColor(ColorManager.paramchangeTextColor(1));
    this.drawText(newValueBase, x, y, paramWidth, "right");
  };

  Window_LevelUp.prototype.drawStatusParams = function () {
    const params = [0, 1, 2, 6, 4, 7, 3];
    for (let i = 0; i < params.length; i++) {
      const y = this.itemHeight() * 8 + i * 36;
      this.drawParamName(this.itemPadding(), y, params[i]);

      const paramWidth = this.paramWidth();
      this.resetTextColor();
      let value;
      if (i == 0) value = this._actor.paramBasePlusExcludeEquip(0) + this._actor._level * 5 + this._actor.paramBasePlusExcludeEquip(2) * 4 + this._actor.paramBasePlusExcludeEquip(4) * 2;
      else if (i == 1) value = this._actor.paramBasePlusExcludeEquip(1) + this._actor._level * 3 + this._actor.paramBasePlusExcludeEquip(4) * 2 + this._actor.paramBasePlusExcludeEquip(6);
      else value = this._actor.paramBasePlusExcludeEquip(params[i]);
      this.drawText(value + '(' + this._actor.param(params[i]) + ')',
        160, y, 100, "right");
    }
  };

  Window_LevelUp.prototype.rightArrowWidth = function () {
    return 32;
  };

  Window_LevelUp.prototype.paramWidth = function () {
    return 48;
  };

  Window_LevelUp.prototype.paramX = function () {
    const itemPadding = this.itemPadding();
    const rightArrowWidth = this.rightArrowWidth();
    const paramWidth = this.paramWidth();
    return this.innerWidth - itemPadding - paramWidth * 2 - rightArrowWidth;
  };

  Window_LevelUp.prototype.itemRect = function (index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    let row = Math.floor(index / maxCols);
    if (index == 0) row += 1;
    else row += 2;
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
  };

  Window_LevelUp.prototype.updateHelp = function () {
    if (this.index() < 0) return;
    this._helpWindow.clear();
    this._helpWindow.setText(helps[this.index()]);
  };


  //----------------------------------------------------------------------
  function Window_ActorExp() {
    this.initialize(...arguments);
  }

  Window_ActorExp.prototype = Object.create(Window_Selectable.prototype);
  Window_ActorExp.prototype.constructor = Window_ActorExp;

  Window_ActorExp.prototype.initialize = function (rect, actor, useExp) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._useExp = useExp;
    this._actor = actor;
    this.refresh();
  };

  Window_ActorExp.prototype.colSpacing = function () {
    return 0;
  };

  Window_ActorExp.prototype.refresh = function () {
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();
    this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y, width);
  };

  Window_ActorExp.prototype.value = function () {
    if (this._useExp) return this._actor.tmpExp;
    else return $gameParty.gold()
  };

  Window_ActorExp.prototype.currencyUnit = function () {
    if (this._useExp) return TextManager.expA;
    else return TextManager.currencyUnit;
  };

  Window_ActorExp.prototype.open = function () {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
  };

  //---------------------------------------------------
  function Window_StatusUpConfirm() {
    this.initialize(...arguments);
  }

  Window_StatusUpConfirm.prototype = Object.create(Window_Command.prototype);
  Window_StatusUpConfirm.prototype.constructor = Window_StatusUpConfirm;

  Window_StatusUpConfirm.prototype.setParamName = function (paramName) {
    this.paramName = paramName;
    this.refresh();
  };

  Window_StatusUpConfirm.prototype.makeCommandList = function () {
    this.addCommand(yesNo[0], 'yes');
    this.addCommand(yesNo[1], 'no');
  };

  Window_StatusUpConfirm.prototype.itemTextAlign = function () {
    return "left";
  };

  Window_StatusUpConfirm.prototype.drawAllItems = function () {
    this.drawTextEx(this.paramName + ': ' + confirmText, 20, 20);
    Window_Selectable.prototype.drawAllItems.call(this);
  };

  Window_StatusUpConfirm.prototype.itemRect = function (index) {
    let rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += 120;
    return rect;
  };


})();