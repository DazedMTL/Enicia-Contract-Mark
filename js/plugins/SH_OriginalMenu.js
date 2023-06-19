


//立ち絵幅




//ヘルプウィンドウを縮める
Scene_MenuBase.prototype.helpWindowRect2 = function() {
  const wx = 0;
  const wy = this.helpAreaTop();
  const ww = Graphics.boxWidth - standarea();
  const wh = this.helpAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_MenuBase.prototype.createHelpWindow2 = function() {
  const rect = this.helpWindowRect2();
  this._helpWindow = new Window_Help(rect);
  this.addWindow(this._helpWindow);
};

Scene_Equip.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow2();
  this.createStatusWindow();
  this.createCommandWindow();
  this.createSlotWindow();
  this.createItemWindow();
  this.refreshActor();
};


Scene_Equip.prototype.executeEquipChange = function() {//装備変更チェック
  const actor = this.actor();
  const slotId = this._slotWindow.index();
  const item = this._itemWindow.item();
  actor.changeEquip(slotId, item);
  console.log("装備変更")
};





//フォントサイズ
Window_Base.prototype.makeFontBigger = function() {
    if (this.contents.fontSize <= 96) {
        this.contents.fontSize += 6;
    }
};

Window_Base.prototype.makeFontSmaller = function() {
    if (this.contents.fontSize >= 24) {
        this.contents.fontSize -= 6;
    }
};



//メッセージウィンドウの幅
Scene_Message.prototype.messageWindowRect = function() {
  const ww = Graphics.boxWidth - standarea();
  const wh = this.calcWindowHeight(4, false) + 8;
  const wx = 0;
  const wy = 0;
  return new Rectangle(wx, wy, ww, wh);
};


Scene_Battle.prototype.statusWindowRect = function() {
  const extra = 10;
  const ww = (Graphics.boxWidth - standarea()) - 192　- 200;
  const wh = this.windowAreaHeight() + extra;
  const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
  const wy = Graphics.boxHeight - wh + extra - 4;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.partyCommandWindowRect = function() {
  const ww = 192;
  const wh = this.windowAreaHeight();
  const wx = Graphics.boxWidth - ww - 544;//ここで調整
  const wy = Graphics.boxHeight - wh;
  return new Rectangle(wx, wy, ww, wh);
};


Scene_Battle.prototype.actorCommandWindowRect = function() {
  const ww = 192;
  const wh = this.windowAreaHeight();
  const wx = Graphics.boxWidth - ww - 544;//ここで調整
  const wy = Graphics.boxHeight - wh;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.windowAreaHeight = function() {
  return this.calcWindowHeight(5, true);
};

//バトル画面のウィンドウ表示全般
Scene_Battle.prototype.createAllWindows = function() {
  this.createLogWindow();
  this.createStatusWindow();
  this.createPartyCommandWindow();
  this.createActorCommandWindow();
  this.createHelpWindow();
  this.createSkillWindow();
  this.createItemWindow();
  this.createActorWindow();
  this.createEnemyWindow();
  Scene_Message.prototype.createAllWindows.call(this);
};



Window_BattleStatus.prototype.drawItem = function(index) {
  this.drawItemImage(index);
  this.drawItemStatus(index);
};

Window_BattleStatus.prototype.drawItemImage = function(index) {
  const actor = this.actor(index);
  const rect = this.faceRect(index);
  this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
};

Window_BattleStatus.prototype.drawItemStatus = function(index) {
  const actor = this.actor(index);
  const rect = this.itemRectWithPadding(index);
  const nameX = this.nameX(rect);
  const nameY = this.nameY(rect);
  const stateIconX = this.stateIconX(rect);
  const stateIconY = this.stateIconY(rect);
  const basicGaugesX = this.basicGaugesX(rect);
  const basicGaugesY = this.basicGaugesY(rect);
  this.placeTimeGauge(actor, nameX, nameY);
  this.placeActorName(actor, nameX, nameY);
  this.placeStateIcon(actor, stateIconX, stateIconY);
  this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
};


Window_BattleStatus.prototype.faceRect = function(index) {
  const rect = this.itemRect(index);
  rect.pad(-1);
  rect.height = this.nameY(rect) + this.gaugeLineHeight() / 2 - rect.y;
  return rect;
};