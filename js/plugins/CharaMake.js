/* ---------------------------------------------------------------------------*
 * 2023/01/09 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc キャラメイクプラグイン
 * @target MZ
 * @base PluginCommonBase
 * @author kido
 * @help
 * 
 * 
 * @command show
 * @text 表示
 *
 */


(() => {
  const script = document.currentScript;
  const params = PluginManagerEx.createParameter(script);

  const nameInputIndex = 0, nicknameInputIndex = 1, faceSelectIndex = 2, genderSelectIndex = 3,
    tribeSelectIndex = 4, classSelectIndex = 5, personalitySelectIndex = 6, positionSelectIndex = 7, skillSelectIndex = 8, flagSelectIndex = 9;

  const makes = [
    { v: 'Name', h: '' },
    { v: 'Title', h: 'Specific race/occupation/title, etc. (input freely)' },
    { v: 'Face', h: '' },
    { v: 'Gender', h: '' },
    { v: 'Tribe', h: '' },
    { v: 'Class', h: '' },
    { v: 'Character', h: '' },
    { v: 'Position', h: '' },
    { v: 'Initial Skill', h: '' },
    { v: 'Special', h: 'Gender can only be changed if the character is male and the race is human.' },
    { v: 'Complete', h: '' }
  ];
  const genders = [
    { v: 'Male', h: 'The character will be treated as male.\nEvents may occur depending on the characters race and personality.' },
    { v: 'Female', h: 'The character will be treated as female.' },
    { v: 'Genderless', h: 'The character will be treated as genderless.' },
    { v: 'Trap', h: 'The character will be treated as a male crossdresser.' },
    { v: 'Other', h: 'The character will be treated as having a non-standard gender.' }
  ];
  const tribes = [
    { v: 'Human', h: 'This is a general term that includes races such as Humans or Faeries, \nas well as any intelligent humanoid or monster species that \nhave a human-like appearance.' },
    { v: 'Animal/Monster', h: 'This refers to animals, monsters, and other non-humanoid creatures.' },
    { v: 'Other', h: 'Feel free to include robots, insects, and any other type of character.' }
  ];
  const classes = [
    { v: 'Warrior', h: 'This type primarily acquires warrior-type skills.' },
    { v: 'Ranger', h: 'This type primarily acquires exploration-type skills.' },
    { v: 'Magician', h: 'This type primarily acquires magic skills.' },
    { v: 'Civilian', h: 'This type does not learn combat-related skills and is weak in battle.' },
    { v: 'Animal/Monster', h: 'This type can acquire skills that are different from Human types.' }
  ];
  const personalities = [//2:筋力,4,精神,6:技量,7:幸運
    { v: 'Cheerful', h: 'Strength +1 Spirit -1', status: { 2: 1, 4: -1 } },
    { v: 'Rough', h: 'Strength +1 Skill -1', status: { 2: 1, 6: -1 } },
    { v: 'Calm', h: 'Spirit +1 Strength -1', status: { 4: 1, 2: -1 } },
    { v: 'Timid', h: 'Spirit +1 Skill -1', status: { 4: 1, 6: -1 } },
    { v: 'Cautious', h: 'Skill +1 Spirit -1', status: { 6: 1, 4: -1 } },
    { v: 'Delicate', h: 'Skill +1 Strength -1', status: { 6: 1, 2: -1 } },
    { v: 'Lucky', h: 'Fortune +1', status: { 7: 1 } },
  ];
  const positions = [
    { v: 'Vanguard', h: 'Target Chance: High' },
    { v: 'Center', h: 'Target Chance: Medium' },
    { v: 'Rearguard', h: 'Target Chance: Small' },
  ];
  let skills = [];
  const flags = [
    { v: 'Erotic Flag: On', h: 'During exploration, the character may engage in sexual activities with Enicia.' },
    { v: 'Erotic Flag: Off', h: '' }
  ];
  const makeItems = [null, null, null, genders, tribes, classes, personalities, positions, skills, flags];

  PluginManagerEx.registerCommand(script, 'show', function (args) {
    SceneManager.push(Scene_CharaMake);
  });

  function canEditEroFlag() {
    return $gameTemp.making[genderSelectIndex] == 0 && $gameTemp.making[tribeSelectIndex] == 0;
  }

  function Scene_CharaMake() {
    this.initialize(...arguments);
  }

  Scene_CharaMake.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_CharaMake.prototype.constructor = Scene_CharaMake;

  Scene_CharaMake.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    if (!$gameTemp.making) {
      $gameTemp.making = ['', '', '', 0, 0, 0, 0, 0, 0, 0];
    }
    this.makeSkillList();
    this.actor = $gameActors.actor($gameVariables.value(951));
    this.calcStatus();
  };

  Scene_CharaMake.prototype.makeSkillList = function () {
    skills.splice(0);
    for (let skill of $dataSkills) {
      if (!skill || !skill.meta.nativeSkill) continue;
      skills.push({
        id: skill.id,
        v: skill.name,
        h: skill.description,
        status: skill.passive ? skill.passive.object().params : [0, 0, 0, 0, 0, 0, 0, 0]
      });
    }
  };

  Scene_CharaMake.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCharaMakeListWindow();
    this.createCharaMakeSelectWindow();
    this.createCharaMakeStatusWindow();
  };

  Scene_CharaMake.prototype.createCharaMakeListWindow = function () {
    this.charaMakeListWindow = new Window_CharaMakeList(new Rectangle(0, 0, 400, Graphics.boxHeight - this.helpWindow.height));
    this.charaMakeListWindow.activate();
    this.charaMakeListWindow.refresh();
    this.charaMakeListWindow.setHandler("ok", this.onCharaMakeListOk.bind(this));
    this.charaMakeListWindow.setHelpWindow(this.helpWindow);
    this.addChild(this.charaMakeListWindow);
  };

  Scene_CharaMake.prototype.createHelpWindow = function () {
    let h = this.calcWindowHeight(2, false);
    this.helpWindow = new Window_Help(new Rectangle(0, Graphics.boxHeight - h, 800, h));
    this.addChild(this.helpWindow);
  };

  Scene_CharaMake.prototype.createCharaMakeSelectWindow = function () {
    this.charaMakeSelectWindow = new Window_CharaMakeSelect(
      new Rectangle(this.charaMakeListWindow.width, 0, 400, Graphics.boxHeight - this.helpWindow.height)
    );
    this.charaMakeSelectWindow.refresh();
    this.charaMakeSelectWindow.setHandler("ok", this.onCharaMakeSelectOk.bind(this));
    this.charaMakeSelectWindow.setHandler("cancel", this.onCharaMakeSelectCancel.bind(this));
    this.charaMakeSelectWindow.setHelpWindow(this.helpWindow);
    this.addChild(this.charaMakeSelectWindow);

    this.charaMakeListWindow.setSelectWindow(this.charaMakeSelectWindow);
  };

  Scene_CharaMake.prototype.createCharaMakeStatusWindow = function () {
    this.statusWindow = new Window_CharaMakeStatus(new Rectangle(
      this.charaMakeSelectWindow.x + this.charaMakeSelectWindow.width, 0, 300, Graphics.boxHeight
    ));
    this.statusWindow.setActor(this.actor);
    this.addChild(this.statusWindow);

    this.charaMakeSelectWindow.setStatusWindow(this.statusWindow);
    this.charaMakeSelectWindow.setActor(this.calcedActor);
  };

  Scene_CharaMake.prototype.onCharaMakeListOk = function () {
    const index = this.charaMakeListWindow.index();
    if (index == nameInputIndex) {
      SceneManager.push(Scene_Name)
      SceneManager.prepareNextScene($gameVariables.value(951), 8)
    } else if (index == nicknameInputIndex) {
      $gameTemp.setNickname = true;
      SceneManager.push(Scene_Name)
      SceneManager.prepareNextScene($gameVariables.value(951), 8)
    } else if (index == faceSelectIndex) {
      SceneManager.push(Scene_FaceSelect)
    } else if (index == makes.length - 1) {
      this.finish();
    } else {
      this.charaMakeSelectWindow.activate();
      this.charaMakeSelectWindow.setCurrent($gameTemp.making[index]);
    }
  };

  Scene_CharaMake.prototype.onCharaMakeSelectOk = function () {
    const index = this.charaMakeListWindow.index();
    $gameTemp.making[index] = this.charaMakeSelectWindow.index();
    this.calcStatus();
    this.charaMakeSelectWindow.setActor(this.calcedActor);

    this.charaMakeListWindow.activate();
    this.charaMakeListWindow.refresh();
    this.charaMakeSelectWindow.deselect();
    this.helpWindow.setText('');
    this.statusWindow.setTempActor(null);
  };

  Scene_CharaMake.prototype.onCharaMakeSelectCancel = function () {
    this.charaMakeListWindow.activate();
    this.charaMakeSelectWindow.deselect();
    this.helpWindow.setText('');
    this.statusWindow.setTempActor(null);
  };

  Scene_CharaMake.prototype.finish = function () {
    var actorId = $gameVariables.value(951);
    var makeFlag = actorId + 830;
    $gameSwitches.setValue(makeFlag, true);

    let status = personalities[$gameTemp.making[personalitySelectIndex]].status;
    for (let s in status) {
      this.actor.addParam(s, status[s])
    }

    this.actor.setProfile("作成済み");
    this.actor.levelPoint = 3;//ボーナスポイント
    this.actor.learnSkill($gameTemp.making[genderSelectIndex] + 501);//性別
    this.actor.learnSkill($gameTemp.making[tribeSelectIndex] + 507);//種族
    this.actor.changeClass($gameTemp.making[classSelectIndex] + 11, false);
    this.actor.learnSkill($gameTemp.making[positionSelectIndex] + 511);//ポジション
    this.actor.learnSkill(skills[$gameTemp.making[skillSelectIndex]].id);//ボーナススキル
    if (canEditEroFlag() && $gameTemp.making[flagSelectIndex] == 0) {
      this.actor.learnSkill(519);
    }
    this.actor.recoverAll();
    $gameTemp.making = null;
    Window_CharaMakeList.lastIndex = null;
    SceneManager.pop();
  };

  Scene_CharaMake.prototype.calcStatus = function () {
    this.calcedActor = JsonEx.makeDeepCopy(this.actor);
    for (let i = 0; i < $gameTemp.making.length; i++) {
      if (!makeItems[i]) continue;
      let status = makeItems[i][$gameTemp.making[i]].status;
      if (!status) continue;
      for (let s in status) {
        this.calcedActor.addParam(s, status[s]);
      }
    }
  };

  window.Scene_CharaMake = Scene_CharaMake;

  //---------------------------------------------------
  {

    function Window_CharaMakeList() {
      this.initialize(...arguments);
    }

    Window_CharaMakeList.prototype = Object.create(Window_Selectable.prototype);
    Window_CharaMakeList.prototype.constructor = Window_CharaMakeList;

    Window_CharaMakeList.prototype.initialize = function (rect) {
      Window_Selectable.prototype.initialize.call(this, rect);
      this.actor = $gameActors.actor($gameVariables.value(951));
      if (Window_CharaMakeList.lastIndex) {
        this.select(Window_CharaMakeList.lastIndex);
        Window_CharaMakeList.lastIndex = null;
      } else {
        this.select(0);
      }
    };

    Window_CharaMakeList.prototype.maxItems = function () {
      return makes.length;
    };

    Window_CharaMakeList.prototype.setHelpWindow = function (h) {
      this.helpWindow = h;
    };

    Window_CharaMakeList.prototype.setSelectWindow = function (s) {
      this.selectWindow = s;
    };

    Window_CharaMakeList.prototype.isCurrentItemEnabled = function () {
      return this.isItemEnabled(this.index());
    };

    Window_CharaMakeList.prototype.isItemEnabled = function (index) {
      if (index == faceSelectIndex && !Utils.isNwjs()) return false;
      if (index == flagSelectIndex && !canEditEroFlag()) return false;
      return true;
    };

    Window_CharaMakeList.prototype.select = function (index) {
      Window_Selectable.prototype.select.call(this, index);
      if (this.selectWindow) this.selectWindow.setItems(makeItems[index]);
      if (this.helpWindow) this.helpWindow.setText(makes[index].h);
    };

    Window_CharaMakeList.prototype.drawItem = function (index) {
      this.changePaintOpacity(this.isItemEnabled(index));
      const rect = this.itemLineRect(index);
      const itemWidth = 150, margin = 30;
      this.drawText(makes[index].v, rect.x, rect.y, itemWidth, rect.height);
      if (index == faceSelectIndex || index == makes.length - 1 ||
        (index == flagSelectIndex && !canEditEroFlag())) {
        return;  //顔、フラグ選択不可、完了
      }
      let text;
      if (index == nameInputIndex) text = this.actor.name();
      else if (index == nicknameInputIndex) text = this.actor.nickname();
      else text = makeItems[index][$gameTemp.making[index]].v;
      this.drawText(text, rect.x + itemWidth + margin, rect.y, rect.width - itemWidth - margin, rect.height);
    };


    Window_CharaMakeList.prototype.itemRect = function (index) {
      let rect = Window_Selectable.prototype.itemRect.call(this, index);
      if (index == makes.length - 1) rect.y += this.itemHeight();
      return rect;
    };

    Window_CharaMakeList.prototype.processOk = function () {
      Window_CharaMakeList.lastIndex = this.index();
      Window_Selectable.prototype.processOk.call(this);
    };
  }
  //---------------------------------------------------

  function Window_CharaMakeSelect() {
    this.initialize(...arguments);
  }

  Window_CharaMakeSelect.prototype = Object.create(Window_Selectable.prototype);
  Window_CharaMakeSelect.prototype.constructor = Window_CharaMakeSelect;

  Window_CharaMakeSelect.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
  };

  Window_CharaMakeSelect.prototype.setStatusWindow = function (statusWindow) {
    this.statusWindow = statusWindow;
  };

  Window_CharaMakeSelect.prototype.setActor = function (actor) {
    this.actor = actor;
    this.statusWindow.setActor(actor);
    this.refresh();
  };

  Window_CharaMakeSelect.prototype.setCurrent = function (index) {
    this.prevIndex = index;
    this.select(index);
  };

  Window_CharaMakeSelect.prototype.setItems = function (items) {
    this.items = items;
    this.refresh();
  };

  Window_CharaMakeSelect.prototype.maxItems = function () {
    return this.items ? this.items.length : 0;
  };

  Window_CharaMakeSelect.prototype.setHelpWindow = function (h) {
    this.helpWindow = h;
  };

  Window_CharaMakeSelect.prototype.select = function (index) {
    Window_Selectable.prototype.select.call(this, index);
    if (!this.helpWindow || index < 0) return;
    this.helpWindow.setText(this.items[index].h);
    if (this.items[index].status) {
      if (this.prevIndex != index) {
        let tmpActor = JsonEx.makeDeepCopy(this.actor);
        for (let s in this.items[index].status) {
          tmpActor.addParam(s, this.items[index].status[s]);
        }
        for (let s in this.items[this.prevIndex].status) {
          tmpActor.addParam(s, -this.items[this.prevIndex].status[s]);
        }
        this.statusWindow.setTempActor(tmpActor);
      } else {
        this.statusWindow.setTempActor(null);
      }
    }

  };

  Window_CharaMakeSelect.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    this.drawText(this.items[index].v, rect.x, rect.y, rect.width, rect.height);
  };

  //---------------------------------------------------

  function Window_CharaMakeStatus() {
    this.initialize(...arguments);
  }

  Window_CharaMakeStatus.prototype = Object.create(Window_EquipStatus.prototype);
  Window_CharaMakeStatus.prototype.constructor = Window_CharaMakeStatus;

  Window_CharaMakeStatus.prototype.refresh = function () {
    this.contents.clear();
    if (this._actor) {
      if (this.face) this.removeChild(this.face);
      this.face = new Sprite_Face();
      this.face.setActor(this._actor);
      this.face.x = 20;
      this.face.y = 20;
      this.addChild(this.face);
      this.drawAllParams();
    }
  };

  Window_CharaMakeStatus.prototype.drawAllParams = function () {
    const params = [0, 1, 2, 6, 4, 7, 3];
    for (let i = 0; i < params.length; i++) {
      const x = this.itemPadding();
      const y = this.paramY(i);
      this.drawItem(x, y, params[i]);
    }
  };

  Window_CharaMakeStatus.prototype.paramY = function (index) {
    const faceHeight = 144;
    return faceHeight + Math.floor(this.lineHeight() * (index + 1.5));
  };


  Window_CharaMakeStatus.prototype.drawItem = function (x, y, paramId) {
    const paramX = this.paramX();
    const paramWidth = this.paramWidth();
    const rightArrowWidth = this.rightArrowWidth();
    this.drawParamName(x, y, paramId);
    if (this._actor) {
      this.drawCurrentParam(paramX, y, paramId);
    }
    this.drawRightArrow(paramX + paramWidth, y);
    if (this._tempActor) {
      this.drawNewParam(paramX + paramWidth + rightArrowWidth, y, paramId);
    }
  };

  Window_CharaMakeStatus.prototype.drawParamName = function (x, y, paramId) {
    const width = this.paramX() - this.itemPadding() * 2;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.param(paramId), x, y, width);
  };

  Window_CharaMakeStatus.prototype.drawCurrentParam = function (x, y, paramId) {
    const paramWidth = this.paramWidth();
    this.resetTextColor();
    this.drawText(this._actor.param(paramId), x, y, paramWidth, "right");
  };

  Window_CharaMakeStatus.prototype.drawNewParam = function (x, y, paramId) {
    const paramWidth = this.paramWidth();
    const newValue = this._tempActor.param(paramId);
    const diffvalue = newValue - this._actor.param(paramId);
    this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
    this.drawText(newValue, x, y, paramWidth, "right");
  };

  Window_CharaMakeStatus.prototype.paramY = function (index) {
    const faceHeight = ImageManager.faceHeight;
    return faceHeight + Math.floor(this.lineHeight() * (index + 1.5));
  };

  //------------------------------------------------------------
  const _setup = Window_NameEdit.prototype.setup;
  Window_NameEdit.prototype.setup = function (actor, maxLength) {
    _setup.call(this, actor, maxLength);

    if ($gameTemp.setNickname) {
      this._name = actor.nickname().slice(0, this._maxLength);
      this._index = this._name.length;
      this._defaultName = this._name;
    }
  };

  const _onInputOk = Scene_Name.prototype.onInputOk;
  Scene_Name.prototype.onInputOk = function () {
    if ($gameTemp.setNickname) {
      $gameTemp.setNickname = false;
      this._actor.setNickname(this._editWindow.name());
      this.popScene();
      return;
    }
    _onInputOk.call(this);
  };


})();
