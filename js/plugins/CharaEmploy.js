/* ---------------------------------------------------------------------------*
 * 2023/01/09 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc カスタム冒険者雇用プラグイン
 * @target MZ
 * @base PluginCommonBase
 * @author kido
 * @help
 *
 * @param addPartySE
 * @desc 加入時SE
 * @default
 * @dir audio/se/
 * @type file
 * 
 * @param removePartySE
 * @desc 脱退時SE
 * @default
 * @dir audio/se/
 * @type file
 * 
 * @param makeSE
 * @desc キャラ作成時SE
 * @default
 * @dir audio/se/
 * @type file 
 * 
 * @param resetSE
 * @desc リセット時SE
 * @default
 * @dir audio/se/
 * @type file 
 * 
 * @command show
 * @text 表示
 *
 */


(() => {
  const script = document.currentScript;
  const params = PluginManagerEx.createParameter(script);

  const categories = ['Hire', 'Registration (Create)', 'Registration (Delete)', 'Cancel'];
  const yesNo = ['Yes', 'No'];
  const confirmMessage = 'All registered characters will be reset. \nAre you sure you want to proceed?';
  const includedParty = '(Already Registered)';
  const partyText = 'Current Members';
  const makedConfirmMessage = '%1 has been registered.';

  PluginManagerEx.registerCommand(script, 'show', function (args) {
    SceneManager.push(Scene_CharaEmploy);
  });

  function playSe(name) {
    AudioManager.playSe({
      name: name,
      volume: 90,
      pitch: 100,
      pan: 0
    });
  }

  function Scene_CharaEmploy() {
    this.initialize(...arguments);
  }

  Scene_CharaEmploy.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_CharaEmploy.prototype.constructor = Scene_CharaEmploy;

  Scene_CharaEmploy.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };


  Scene_CharaEmploy.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createPartyWindow();
    this.createCharaListWindow();
    this.createStatusWindow();
    this.createResetConfirmWindow();
    this.createMadeConfirmWindow();

    if (Scene_CharaEmploy.prevIndex != null) {
      let actor = $gameActors.actor($gameVariables.value(951));
      playSe(params.makeSE);
      this.madeConfirmWindow.showText(actor.name());
      this.commandWindow.deactivate();
      this.commandWindow.select(1);
      this.charaListWindow.select(Scene_CharaEmploy.prevIndex);
      Scene_CharaEmploy.prevIndex = null;
    } else {
      this.commandWindow.activate();
      this.commandWindow.select(0);
    }
  };

  Scene_CharaEmploy.prototype.createCommandWindow = function () {
    this.commandWindow = new Window_EmployCategory(new Rectangle(0, 0, 300, 400));
    this.commandWindow.setHandler("employ", this.onEmploy.bind(this));
    this.commandWindow.setHandler("make", this.onMake.bind(this));
    this.commandWindow.setHandler("reset", this.onReset.bind(this));
    this.commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addChild(this.commandWindow);
  };

  Scene_CharaEmploy.prototype.createPartyWindow = function () {
    this.partyWindow = new Window_Party(new Rectangle(
      0, this.commandWindow.height, this.commandWindow.width, Graphics.boxHeight - this.commandWindow.height)
    );
    this.partyWindow.refresh();
    this.addChild(this.partyWindow);
  };

  Scene_CharaEmploy.prototype.createCharaListWindow = function () {
    this.charaListWindow = new Window_CharaList(new Rectangle(
      this.commandWindow.width, 0, 370, Graphics.boxHeight)
    );
    this.charaListWindow.setHandler("ok", this.onOkCharaWindow.bind(this));
    this.charaListWindow.setHandler("cancel", this.onCancelCharaWindow.bind(this));
    this.addChild(this.charaListWindow);
    this.commandWindow.setCharaListWindow(this.charaListWindow);
  };

  Scene_CharaEmploy.prototype.createStatusWindow = function () {
    this.statusWindow = new Window_CharaStatus(new Rectangle(
      this.charaListWindow.x + this.charaListWindow.width, 0, 300, Graphics.boxHeight)
    );
    this.addChild(this.statusWindow);
    this.charaListWindow.setStatusWindow(this.statusWindow);
  };

  Scene_CharaEmploy.prototype.createResetConfirmWindow = function () {
    let width = 450, height = 250;
    this.confirmWindow = new Window_ResetConfirm(new Rectangle(
      Graphics.boxWidth / 2 - width / 2, Graphics.boxHeight / 2 - height / 2, width, height
    ));
    this.confirmWindow.setHandler("yes", this.onOkConfirmWindow.bind(this));
    this.confirmWindow.setHandler("no", this.onCancelConfirmWindow.bind(this));
    this.confirmWindow.setHandler("cancel", this.onCancelConfirmWindow.bind(this));
    this.confirmWindow.hide();
    this.addChild(this.confirmWindow);
  };

  Scene_CharaEmploy.prototype.createMadeConfirmWindow = function () {
    let width = 600, height = 150;
    this.madeConfirmWindow = new Window_MadeConfirm(new Rectangle(
      Graphics.boxWidth / 2 - width / 2, Graphics.boxHeight / 2 - height / 2, width, height
    ));
    this.madeConfirmWindow.setCallback(() => {
      this.charaListWindow.activate();
    });
    this.madeConfirmWindow.hide();
    this.addChild(this.madeConfirmWindow);
  };

  Scene_CharaEmploy.prototype.onEmploy = function () {
    this.charaListWindow.activate();
    this.charaListWindow.select(0);
  };

  Scene_CharaEmploy.prototype.onMake = function () {
    this.charaListWindow.activate();
    this.charaListWindow.select(0);
  };

  Scene_CharaEmploy.prototype.onReset = function () {
    this.charaListWindow.activate();
    this.charaListWindow.select(0);
  };

  Scene_CharaEmploy.prototype.onOkCharaWindow = function () {
    if (this.charaListWindow.mode == 'employ') {
      let actor = this.charaListWindow.currentActor();
      if ($gameParty.members().includes(actor)) {
        $gameParty.removeActor(actor.actorId());
        playSe(params.removePartySE);
      } else {
        $gameParty.addActor(actor.actorId());
        playSe(params.addPartySE);
      }
      this.charaListWindow.activate();
      this.charaListWindow.refresh();
      this.partyWindow.refresh();
    } else if (this.charaListWindow.mode == 'make') {
      $gameVariables.setValue(951, this.charaListWindow.currentActor().actorId());
      Scene_CharaEmploy.prevIndex = this.charaListWindow.index();
      SceneManager.push(Scene_CharaMake);
    } else if (this.charaListWindow.mode == 'reset') {
      this.confirmWindow.show();
      this.confirmWindow.activate();
      this.confirmWindow.select(0);
    }
  };

  Scene_CharaEmploy.prototype.onCancelCharaWindow = function () {
    this.commandWindow.activate();
    this.charaListWindow.deselect();
    this.statusWindow.setActor(null);
  };

  Scene_CharaEmploy.prototype.onOkConfirmWindow = function () {
    this.confirmWindow.hide();
    this.charaListWindow.activate();
    let actor = this.charaListWindow.currentActor();
    actor.setup(actor.actorId());
    var makeFlag = actor.actorId() + 830;
    $gameSwitches.setValue(makeFlag, false);
    $gameParty.removeActor(actor.actorId());
    this.charaListWindow.refresh();
    this.partyWindow.refresh();
    this.statusWindow.setActor(null);
    playSe(params.resetSE);
  };

  Scene_CharaEmploy.prototype.onCancelConfirmWindow = function () {
    this.confirmWindow.hide();
    this.charaListWindow.activate();
  };

  window.Scene_CharaEmploy = Scene_CharaEmploy;

  //---------------------------------------------------
  function Window_EmployCategory() {
    this.initialize(...arguments);
  }

  Window_EmployCategory.prototype = Object.create(Window_Command.prototype);
  Window_EmployCategory.prototype.constructor = Window_EmployCategory;

  Window_EmployCategory.prototype.makeCommandList = function () {
    this.addCommand(categories[0], 'employ');
    this.addCommand(categories[1], 'make');
    this.addCommand(categories[2], 'reset');
    this.addCommand(categories[3], 'cancel');
  };

  Window_EmployCategory.prototype.itemTextAlign = function () {
    return "left";
  };

  Window_EmployCategory.prototype.setCharaListWindow = function (c) {
    this.charaListWindow = c;
  };

  Window_EmployCategory.prototype.select = function (index) {
    Window_Selectable.prototype.select.call(this, index);
    if (this.charaListWindow) this.charaListWindow.setMode(this.currentSymbol());
  };

  //---------------------------------------------------
  function Window_Party() {
    this.initialize(...arguments);
  }

  Window_Party.prototype = Object.create(Window_Base.prototype);
  Window_Party.prototype.constructor = Window_Party;

  Window_Party.prototype.refresh = function () {
    this.contents.clear();
    let x = 20, y = 60;
    let members = $gameParty.members();
    let numStr = '(' + members.length + '/' + 3 + ')';
    if (members.length == 3) numStr = '\\C[10]' + numStr;
    this.drawTextEx(partyText + numStr, x, 10);
    this.resetFontSettings();
    for (var i = 0; i < members.length; i++) {
      this.drawText(members[i].name(), x, y + i * this.lineHeight(), this.width);
    }
  };
  //---------------------------------------------------
  function Window_CharaList() {
    this.initialize(...arguments);
  }

  Window_CharaList.prototype = Object.create(Window_Selectable.prototype);
  Window_CharaList.prototype.constructor = Window_CharaList;

  Window_CharaList.prototype.setStatusWindow = function (s) {
    this.statusWindow = s;
  };

  Window_CharaList.prototype.setMode = function (mode) {
    this.mode = mode;
    this.refresh();
  };

  Window_CharaList.prototype.currentActor = function () {
    return $gameActors.actor(151 + this.index());
  };

  Window_CharaList.prototype.actor = function (index) {
    return $gameActors.actor(151 + index);
  };

  Window_CharaList.prototype.isCurrentItemEnabled = function () {
    return this.isItemEnabled(this.index());
  };

  Window_CharaList.prototype.isItemEnabled = function (index) {
    let actor = this.actor(index);
    let made = $gameSwitches.value(actor.actorId() + 830);
    if (this.mode == 'employ' && !made) return false;
    else if (this.mode == 'make' && made) return false;
    else if (this.mode == 'reset' && !made) return false;

    if (this.mode == 'employ') {
      if ($gameParty.members().length == 3 && !$gameParty.members().includes(actor)) return false;
    }
    return true;
  };

  Window_CharaList.prototype.maxItems = function () {
    return 10;
  };

  Window_CharaList.prototype.select = function (index) {
    Window_Selectable.prototype.select.call(this, index);
    if (this.statusWindow) this.statusWindow.setActor(this.actor(index));
  };

  Window_CharaList.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isItemEnabled(index));

    if ($gameParty.members().includes(this.actor(index))) {
      if (this.mode == 'employ') this.changePaintOpacity(true);
      this.drawText(includedParty, rect.x, rect.y, rect.width, 'right');
      if (this.mode == 'employ') this.changePaintOpacity(false);
    }

    this.drawText(this.actor(index).name(), rect.x, rect.y, rect.width);
  };

  Window_CharaList.prototype.playOkSound = function () {
    if (this.mode == 'employ') return;
    SoundManager.playOk();
  };

  //---------------------------------------------------
  function Window_ResetConfirm() {
    this.initialize(...arguments);
  }

  Window_ResetConfirm.prototype = Object.create(Window_Command.prototype);
  Window_ResetConfirm.prototype.constructor = Window_ResetConfirm;

  Window_ResetConfirm.prototype.makeCommandList = function () {
    this.addCommand(yesNo[0], 'yes');
    this.addCommand(yesNo[1], 'no');
  };

  Window_ResetConfirm.prototype.itemTextAlign = function () {
    return "left";
  };

  Window_ResetConfirm.prototype.drawAllItems = function () {
    this.drawTextEx(confirmMessage, 20, 20);
    Window_Selectable.prototype.drawAllItems.call(this);
  };

  Window_ResetConfirm.prototype.itemRect = function (index) {
    let rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.y += 120;
    return rect;
  };

  //---------------------------------------------------
  function Window_MadeConfirm() {
    this.initialize(...arguments);
  }

  Window_MadeConfirm.prototype = Object.create(Window_Base.prototype);
  Window_MadeConfirm.prototype.constructor = Window_MadeConfirm;



  Window_MadeConfirm.prototype.setCallback = function (c) {
    this.callback = c;
  };

  Window_MadeConfirm.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (!this.visible || this.isClosing() || this.isOpening() || this.isClosed()) return;
    if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
      this.close();
      this.callback();
    }
  };

  Window_MadeConfirm.prototype.showText = function (name) {
    this.show();
    this._openness = 0;
    this.open();
    let text = makedConfirmMessage.replace('%1', name);
    let size = this.textSizeEx(text);
    this.width = size.width + 60;
    this.createContents();
    this.drawText(text, 20, 45, this.width);
  };


  //---------------------------------------------------
  function Window_CharaStatus() {
    this.initialize(...arguments);
  }

  Window_CharaStatus.prototype = Object.create(Window_EquipStatus.prototype);
  Window_CharaStatus.prototype.constructor = Window_CharaStatus;

  Window_CharaStatus.prototype.refresh = function () {
    this.contents.clear();
    if (this.face) {
      this.removeChild(this.face);
      this.face = null;
    }
    if (this._actor && $gameSwitches.value(830 + this._actor.actorId())) {
      this.face = new Sprite_Face();
      this.face.setActor(this._actor);
      this.face.x = 20;
      this.face.y = 20;
      this.addChild(this.face);
      this.drawAllParams();
    }
  };

  Window_CharaStatus.prototype.drawAllParams = function () {
    const params = [0, 1, 2, 6, 4, 7, 3];
    for (let i = 0; i < params.length; i++) {
      const x = this.itemPadding();
      const y = this.paramY(i);
      this.drawItem(x, y, params[i]);
    }
  };

  Window_CharaStatus.prototype.paramY = function (index) {
    const faceHeight = 144;
    return faceHeight + Math.floor(this.lineHeight() * (index + 1.5));
  };


  Window_CharaStatus.prototype.drawItem = function (x, y, paramId) {
    const paramX = this.paramX();
    this.drawParamName(x, y, paramId);
    if (this._actor) {
      this.drawCurrentParam(paramX, y, paramId);
    }
  };

  Window_CharaStatus.prototype.drawParamName = function (x, y, paramId) {
    const width = this.paramX() - this.itemPadding() * 2;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.param(paramId), x, y, width);
  };

  Window_CharaStatus.prototype.drawCurrentParam = function (x, y, paramId) {
    const paramWidth = this.paramWidth();
    this.resetTextColor();
    this.drawText(this._actor.param(paramId), x, y, paramWidth, "right");
  };

  Window_CharaStatus.prototype.paramY = function (index) {
    const faceHeight = ImageManager.faceHeight;
    return faceHeight + Math.floor(this.lineHeight() * (index + 1.5));
  };


})();
