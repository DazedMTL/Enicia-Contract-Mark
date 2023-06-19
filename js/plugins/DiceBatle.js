/* ---------------------------------------------------------------------------*
 * 2021/11/01 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc サイコロバトル
 * @target MZ
 * @author kido
 * @help
 * 
 * 
 * @param escapeNeedDiceVar
 * @text 逃走に必要なダイス値を保存する変数
 * @desc 逃走に必要なダイス値を保存する変数を指定
 * @default 0
 * @type variable
 * 
 * @param playerCriticalSE
 * @text プレイヤーのクリティカル時のSE
 * @desc プレイヤーのクリティカル時のSE
 * @type file
 * @dir audio/se
 * 
 * @param enemyCriticalSE
 * @text エネミーのクリティカル時のSE
 * @desc エネミーのクリティカル時のSE
 * @type file
 * @dir audio/se
 * 
 * @param stateIconNum
 * @text ステートアイコンの最大数
 * @desc ステートアイコンを何個最大並べるか
 * @default 4
 * @type number
 * 
 * @param escapeDiceNum
 * @text 逃走時のダイス数
 * @desc 逃走時に振るダイス数です
 * @default 1
 * @type number
 * 
 * @param showCalcSW
 * @text 計算式の表示スイッチ
 * @desc スイッチがONのときに計算式を表示
 * @default 925
 * @type switch
 * 
 */

(() => {

  var params = PluginManager.parameters('DiceBatle');

  params.escapeNeedDiceVar = Number(params.escapeNeedDiceVar);
  params.stateIconNum = Number(params.stateIconNum);
  params.showCalcSW = Number(params.showCalcSW);
  params.escapeDiceNum = Number(params.escapeDiceNum);

  let paramToStr = {};

  function bufStr(v) {
    return v > 0 ? 'Buff' : 'Debuff';
  }
  function isShowCalc() {
    return $gameSwitches.value(params.showCalcSW);
  }

  const _scene_Battle_initialize = Scene_Battle.prototype.initialize;
  Scene_Battle.prototype.initialize = function () {
    _scene_Battle_initialize.call(this);
    paramToStr = {
      Atk: TextManager.param(2),
      Mat: TextManager.param(4),
      Agi: TextManager.param(6),
      Luk: TextManager.param(7),
      Def: TextManager.param(3),
    };
  };

  const _createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function () {
    _createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('escape', this.commandEscape.bind(this));
  };

  const _scene_battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _scene_battle_update.call(this);
    this.updateDice();
  };

  Scene_Battle.prototype.updateDice = function () {
    if (!BattleManager.isActionDice() && !BattleManager.isEscapeDice()) return;
    if (TouchInput.isTriggered() || Input.isTriggered('ok')) {
      $gameScreen.stopDiceRoll();
      this.stopDiceRoll();
    }
  };

  //パーティコマンド消す
  Scene_Battle.prototype.startPartyCommandSelection = function () {
    this.selectNextCommand();
  };

  Scene_Battle.prototype.commandEscape = function () {
    this._logWindow.addText('Escape Target: ' + $gameVariables.value(params.escapeNeedDiceVar));
    BattleManager.startEscapeDiceRoll();
    this.closeCommandWindows();
  };

  Scene_Battle.prototype.updateStatusWindowPosition = function () { };

  BattleManager.startAction = function () {
    const subject = this._subject;
    if (subject instanceof Game_Actor) $gameScreen.eraseDice(); //敵ターンの場合はダイス残しておきたい
    const action = subject.currentAction();
    const targets = action.makeTargets();
    this._phase = 'actionDice';
    this._action = action;
    this._targets = targets;
    subject.cancelMotionRefresh();
    this._logWindow.startActionBeforeDice(subject, action, targets);
    let detail = action.getDiceDetail();
    let dice = detail.isNormalItem ? 0 : detail.dice;
    if (subject instanceof Game_Actor) {
      if (dice == 0) {
        $gameScreen.cheatDiceResult(0);
        this.stopActionDiceRoll();
      } else {
        PluginManager.callCommand($gameTroop._interpreter, 'SH_PlaySEMZ', 'PlaySE', { seid: 'Dice', sevolume: 'default', });
        $gameScreen.startDiceRoll(dice);
      }
    } else {
      subject.dice = $gameScreen.getInstantDiceResult(dice);
      this.stopActionDiceRoll();
    }
  };

  Scene_Battle.prototype.stopDiceRoll = function () {
    PluginManager.callCommand($gameTroop._interpreter, 'SH_PlaySEMZ', 'PlaySE', { seid: 'DiceStop', sevolume: 'default', });
    if (BattleManager.isEscapeDice()) {
      BattleManager.stopEscapeDiceRoll();
      BattleManager.processEscape();
    } else {
      BattleManager.stopActionDiceRoll();
    }
  };
  BattleManager.startEscapeDiceRoll = function () {
    $gameScreen.eraseDice();
    this._phase = 'escapeDice';
    this._inputting = false;
    $gameScreen.startDiceRoll(params.escapeDiceNum);
    PluginManager.callCommand($gameTroop._interpreter, 'SH_PlaySEMZ', 'PlaySE', { seid: 'Dice', sevolume: 'default', });
  };

  BattleManager.stopEscapeDiceRoll = function () {
    this._phase = 'input';
    this._inputting = true;
  };

  BattleManager.stopActionDiceRoll = function () {
    this._phase = 'action';
    this._subject.useItem(this._action.item());
    this._action.applyGlobal();
    this._logWindow.startActionAfterDice(this._subject, this._action, this._targets);
  };

  BattleManager.processEscape = function () {
    $gameParty.performEscape();
    SoundManager.playEscape();
    const need = $gameVariables.value(params.escapeNeedDiceVar);
    const dice = $gameScreen.getDiceResult();
    const addType = this._currentActor.getStatesBuf('Agi');
    const value = dice + this._currentActor.agi + addType;
    const success = this._preemptive || value >= need;
    if (isShowCalc()) {
      let str = 'Rolled: ' + params.escapeDiceNum + 'd6(' + dice + ') + ' + paramToStr.Agi + '(' + this._currentActor.agi + ')';
      if (addType != 0) str += ' + ' + paramToStr.Agi + bufStr(addType) + '(' + addType + ')';
      this._logWindow.displayText(str + ' = ' + value);
    }
    if (success) {
      this.onEscapeSuccess();
    } else {
      this.onEscapeFailure();
    }
    return success;
  };


  BattleManager.onEscapeFailure = function () {
    $gameParty.onEscapeFailure();
    this.displayEscapeFailureMessage();
    this._currentActor.failedEscape = true;
    this._currentActor.clearActions();
    this.selectNextActor();
  };

  BattleManager.displayEscapeSuccessMessage = function () {
    $gameMessage.add('Success!');
    $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
  };

  BattleManager.displayEscapeFailureMessage = function () {
    this._logWindow.pushWait(30);
    this._logWindow.displayText('Failure!');
  };

  BattleManager.isActionDice = function () {
    return this._phase === 'actionDice';
  };
  BattleManager.isEscapeDice = function () {
    return this._phase === 'escapeDice';
  };

  Game_Actor.prototype.onEscapeFailure = function () {
    if (BattleManager.isTpb()) {
      this.applyTpbPenalty();
    }
    this.requestMotionRefresh();
  };

  Game_Action.prototype.getDiceDetail = function () {
    let detail = {
      dice: 0,
      diceResult: $gameScreen.getDiceResult(),
      critical: 99,
      unique: 0,
      addUnique: 0,
      addType: 0,
      addBuf: 0,
      addWeaponType: { name: '', value: 0 },
      addElementType: { name: '', value: 0 },
      fold: 1,
      penetrate: false,
      type: null,
      isAttack: true,
      weakPoint: false,
      noDamage: false,
      halfResistance: '',
      hpRecover: false,
      affects: [],
      isMissed: false,
      isCritical: false,
      absAim: false,
      isDefEnable: function () {
        //この時点で確定せず、あと計算なので関数にしている
        return !this.isCritical && !this.weakPoint && !this.noDamage && !this.hpRecover && !this.penetrate;
      },
      isNormalItem: this.isItem() && this.item().damage.type != 1,  // ダメージ系はダイス計算対象でそれ以外は通常アイテムとして処理する
      isDamageItem: this.isItem() && this.item().damage.type == 1,
    };
    const subject = this.subject();
    const weapon = (subject instanceof Game_Actor) && !this.isItem() ? subject.weapons()[0] : null;
    const skill = this.item();
    if (subject instanceof Game_Enemy) {
      let enemy = subject.enemy();
      detail.dice = Number(enemy.meta.Dice);
      if (enemy.meta.Critical) detail.critical = Number(enemy.meta.Critical);
      if (enemy.meta.Unique) detail.unique = Number(enemy.meta.Unique);
    } else if (!this.isItem()) {
      if (weapon) {
        detail.dice = Number(weapon.meta.Dice);
        if (weapon.meta.Critical) detail.critical = Number(weapon.meta.Critical);
        if (weapon.meta.Unique) detail.unique = Number(weapon.meta.Unique);
        if (weapon.meta.Type) detail.type = weapon.meta.Type;
        if (weapon.meta.Fold) detail.fold = Number(weapon.meta.Fold)
        if (weapon.meta.Penetrate) detail.penetrate = weapon.meta.Penetrate
        if (skill.damage.elementId == -1) {
          let weaponTypeDamages = subject.getWeaponTypeAddDamage();
          if (weaponTypeDamages[weapon.wtypeId]) {
            detail.addWeaponType.name = $dataSystem.weaponTypes[weapon.wtypeId];
            detail.addWeaponType.value = weaponTypeDamages[weapon.wtypeId];
          }
        }
      } else {
        detail.dice = 1;
        detail.type = 'Atk';
      }
    }

    if (skill.meta.Dice) detail.dice = Number(skill.meta.Dice);
    // 0で上書きする可能性があるので、undefined判定
    if (skill.meta.Critical !== undefined) detail.critical = Number(skill.meta.Critical);
    if (skill.meta.Unique !== undefined) {
      detail.unique = Number(skill.meta.Unique);
      detail.isAttack = false; //スキル固定値と表示するため
    }
    if (skill.meta.Type) detail.type = skill.meta.Type;

    if (skill.meta.AddDice) detail.dice += Number(skill.meta.AddDice);
    if (skill.meta.AddCritical) detail.critical += Number(skill.meta.AddCritical);
    if (skill.meta.AddUnique) detail.addUnique = Number(skill.meta.AddUnique);
    if (skill.meta.Fold) detail.fold = Number(skill.meta.Fold);
    if (skill.meta.Penetrate) detail.penetrate = skill.meta.Penetrate;
    if ((subject instanceof Game_Actor) && skill.damage.elementId != -1 && !this.isItem()) {
      let elementTypeDamages = subject.getElementAddDamage();
      if (elementTypeDamages[skill.damage.elementId]) {
        detail.addElementType.name = $dataSystem.elements[skill.damage.elementId];
        detail.addElementType.value = elementTypeDamages[skill.damage.elementId];
      }
    }

    if (detail.type == 'Atk') detail.addType = subject.atk;
    else if (detail.type == 'Mat') detail.addType = subject.mat;
    else if (detail.type == 'Agi') detail.addType = subject.agi;

    if (detail.type) detail.addBuf = subject.getStatesBuf(detail.type);


    //必中チェック
    if (subject.getStatesFlag('AbsAim')) detail.absAim = true;
    if (skill.meta.AbsAim) detail.absAim = true;
    if (skill.damage.elementId == -1 && weapon && weapon.meta.AbsAim) detail.absAim = true;

    detail.isMissed = !detail.absAim && detail.dice != 0 && detail.diceResult <= (detail.dice + subject.getStatesBuf('Blind'));
    detail.isCritical = detail.diceResult >= detail.critical;
    if (detail.dice == 0) detail.diceResult = 0;  //メニューでアイテム使用時など前回のダイス結果が残っている可能性がある
    //console.log(detail);
    return detail;
  };

  const _gameAction_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    const detail = this.getDiceDetail();
    if (detail.isNormalItem) { //アイテム使用時
      _gameAction_apply.call(this, target);
      return;
    }
    const result = target.result();
    this.subject().clearResult();
    result.clear();
    result.diceDetail = detail;
    result.used = this.testApply(target);
    result.missed = detail.isMissed;  //ファンブル
    result.evaded = false;
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
    if (result.isHit()) {
      if (this.item().damage.type > 0) {
        result.critical = detail.isCritical;
        this.checkElementRate(target);
        const value = this.makeDiceDamageValue(target);
        this.executeDamage(target, value);
      }
      for (const effect of this.item().effects) {
        this.applyItemEffect(target, effect);
      }
      this.applyItemUserEffect(target);
    }
    this.updateLastTarget(target);
  };

  Game_Action.prototype.checkElementRate = function (target) {
    let detail = target.result().diceDetail;
    const elementRate = this.calcElementRate(target);
    if (elementRate > 1) {
      detail.weakPoint = true;
    } else if (elementRate == 0) {
      detail.noDamage = true;
    } else if (elementRate > 0 && elementRate < 1) {
      detail.halfDamage = this.getElementName(target);
    }
  }

  Game_Action.prototype.getElementName = function (target) {
    let elementId;
    if (this.item().damage.elementId < 0) {
      //武器の属性を見る場合
      let elements = this.subject().attackElements();
      elementId = elements[0];
      for (let i = 0; i < elements.length; i++) {
        if (target.elementRate(elementId) < target.elementRate(elements[i])) {
          elementId = elementId[i];
        }
      }
    } else {
      elementId = this.item().damage.elementId;
    }
    return $dataSystem.elements[elementId];
  };

  Game_Action.prototype.makeDiceDamageValue = function (target) {
    let detail = target.result().diceDetail;
    const item = this.item();
    //回復チェック
    const sign = [3, 4].includes(item.damage.type) ? -1 : 1;
    detail.hpRecover = sign == -1;

    //クリティカルチェック
    let multi = 1;
    if (detail.isCritical || detail.weakPoint) {
      multi = 2;
      if (target instanceof Game_Enemy) AudioManager.playSe({ name: params['playerCriticalSE'], 'volume': 90, 'pitch': 100 });
      else AudioManager.playSe({ name: params['enemyCriticalSE'], 'volume': 90, 'pitch': 100 });
    }

    let baseValue = detail.diceResult * multi + detail.unique + detail.addUnique + detail.addWeaponType.value + detail.addElementType.value + detail.addType * detail.fold + detail.addBuf;

    //Def計算
    detail.defBuf = target.getStatesBuf('Def'); // ここで保存しておかないとガード中に死亡すると表示時のときに消えてしまっている
    if (detail.isDefEnable()) baseValue -= Math.max(target.def + detail.defBuf, 0);
    if (detail.noDamage) baseValue = 0;
    if (detail.halfDamage) baseValue /= 2;

    let value = Math.max(baseValue, 0) * sign;

    value = Math.round(value);
    detail.calcResult = value;
    return value;
  };

  const _gameAction_itemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
  Game_Action.prototype.itemEffectAddNormalState = function (target, effect) {
    let detail = target.result().diceDetail;
    if (!detail) {  //アイテム使用時
      _gameAction_itemEffectAddNormalState.call(this, target, effect);
      return;
    }
    //複数ステート付与される可能性があることを考慮する
    let affect = {
      name: $dataStates[effect.dataId].name
    }

    if (target.stateRate(effect.dataId) == 0) {
      //完全耐性
      affect.success = false;
      affect.no = true;
    } else {
      if (this.isCertainHit()) {
        affect.success = true;
        affect.certain = true;
      } else {
        detail.calcResult = detail.diceResult + detail.unique + detail.addUnique + detail.addType * detail.fold + detail.addBuf;
        affect.success = detail.calcResult > target.luk * 2 + target.getStatesBuf('Luk');
      }
    }
    detail.affects.push(affect);
    if (affect.success) {
      target.addState(effect.dataId);
      this.makeSuccess(target);
    }

  };

  //行動順の計算式変更
  Game_Action.prototype.speed = function () {
    const agi = this.subject().agi;
    let speed = Math.randomInt(6) + 1 + agi * 2;  //1d6 + agi * 2
    if (this.item()) {
      speed += this.item().speed;
      if (this.item().damage.elementId == -1) speed += this.subject().attackSpeed();
    }
    return speed;
  };

  Window_BattleLog.prototype.startActionBeforeDice = function (subject, action, targets) {
    const item = action.item();
    this.push('performActionStart', subject, action);
    this.push('performAction', subject, action);
    this.displayAction(subject, item);
  };

  Window_BattleLog.prototype.startActionAfterDice = function (subject, action, targets) {
    const item = action.item();
    this.push('showAnimation', subject, targets.clone(), item.animationId);
  };

  Window_BattleLog.prototype.setWaitCount = function (waitCount) {
    this._waitCount = waitCount;
  };

  Window_BattleLog.prototype.pushWait = function (waitCount) {
    this.push('setWaitCount', waitCount);
  };

  Window_BattleLog.prototype.displayText = function (text) {
    this.push('addText', text);
  };

  Window_BattleLog.prototype.calcResultToArray = function (detail) {
    let items = [];
    let str = '';
    if (detail.dice > 0) str = detail.dice + 'd6(' + detail.diceResult + ')';
    if (detail.isCritical || detail.weakPoint) str += ' * 2';
    if (str) items.push(str);

    if (detail.addType) {
      let str = paramToStr[detail.type] + '(' + detail.addType;
      if (detail.fold != 1) str += ' * ' + detail.fold;
      items.push(str + ')');
    } if (detail.unique) {
      if (detail.isDamageItem) items.push('Item Fixed Value(' + detail.unique + ')');
      else if (detail.isAttack) items.push('Weapon Fixed Value(' + detail.unique + ')');
      else items.push('Skill Fixed Value(' + detail.unique + ')');
    }
    if (detail.addUnique) items.push('Skill Modified Value(' + detail.addUnique + ')');
    if (detail.addBuf) {
      items.push(paramToStr[detail.type] + bufStr(detail.addBuf) + '(' + detail.addBuf + ')');
    }
    if (detail.addWeaponType.value > 0) items.push('Weapon Modifier[' + detail.addWeaponType.name + '](' + detail.addWeaponType.value + ')');
    if (detail.addElementType.value > 0) items.push('Attribute Modifier[' + detail.addElementType.name + '](' + detail.addElementType.value + ')');
    return items;
  };

  const _window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
  Window_BattleLog.prototype.displayActionResults = function (subject, target) {
    const result = target.result();
    const detail = result.diceDetail;
    if (!detail) {  //アイテム使用時
      _window_BattleLog_displayActionResults.call(this, subject, target);
      return;
    }
    if (!result.used) return;
    this.push('pushBaseLine');
    if (BattleManager._action.item().damage.type > 0 && !result.missed) {

      if (detail.absAim && detail.dice != 0) this.push('addText', 'Guaranteed Hit!');

      if (detail.weakPoint) this.push('addText', 'Weakpoint Hit!');
      else this.displayCritical(target);

      let items = this.calcResultToArray(detail);

      let str = items.join(' + ');

      if (detail.isDefEnable()) {
        str += ' - ' + paramToStr.Def + '(' + target.def + ')';
        if (detail.defBuf) {
          str += ' - ' + paramToStr.Def + bufStr(detail.defBuf) + '(' + detail.defBuf + ')';
        }
      } else if (detail.noDamage) str += ' - Immune(100)';
      else if (detail.penetrate) str += ' ' + paramToStr.Def + 'Ignored';

      str = '\\c[8][' + str + ']';
      if (isShowCalc()) {
        this.push('addText', str);
      }
      if (detail.halfDamage) {
        this.push('addText', detail.halfDamage + 'Resistance Halved');
      }
    }

    this.push('popupDamage', target);
    this.push('popupDamage', subject);
    this.displayDamage(target);
    this.displayAffectedStatus(target);
    this.displayFailure(target);
    this.push('waitForNewLine');
    this.push('popBaseLine');
  };

  const _window_BattleLog_displayAffectedStatus = Window_BattleLog.prototype.displayAffectedStatus;
  Window_BattleLog.prototype.displayAffectedStatus = function (target) {
    let detail = target.result().diceDetail;
    if (!detail) {  //アイテム使用時
      _window_BattleLog_displayAffectedStatus.call(this, target);
      return;
    }

    if (detail.affects.length > 0) {
      for (let affect of detail.affects) {
        if (affect.no) this.push('addText', affect.name + 'Immune');
      }
      if (detail.affects.some(d => !d.no && !d.certain)) {
        let str = 'Target: ';
        str += paramToStr.Luk + '(' + target.luk + ') * 2';
        let lukBuf = target.getStatesBuf('Luk');
        if (lukBuf) {
          str += ' - ' + paramToStr.Luk + bufStr(lukBuf) + '(' + lukBuf + ')';
        }

        str += ' = ' + (target.luk * 2 + lukBuf);

        let items = this.calcResultToArray(detail);
        str += ' Target: ' + items.join(' + ');
        str += ' = ' + detail.calcResult;

        str = '\\c[8][' + str + ']';
        if (isShowCalc()) this.push('addText', str);

        const toEnemy = target instanceof Game_Enemy;
        let result = '';
        let affected = detail.affects.some(d => d.success)
        if (toEnemy) result = affected ? 'Success' : 'Failure';
        else result = affected ? 'Evasion Failure' : 'Evasion Success';

        this.push('addText', result);
      }
    }


    if (target.result().isStatusAffected()) {
      this.push('pushBaseLine');
      this.displayChangedStates(target);
      this.displayChangedBuffs(target);
      this.push('waitForNewLine');
      this.push('popBaseLine');
    }
  };

  const _displayMiss = Window_BattleLog.prototype.displayMiss;
  Window_BattleLog.prototype.displayMiss = function (target) {
    this.push('addText', 'Fumble!');
    _displayMiss.call(this, target);
  };


  //回復のときは表示逆に(回復にクリティカルがある場合用）
  Window_BattleLog.prototype.displayCritical = function (target) {
    if (target.result().critical) {
      const isRecover = target.result().diceDetail.hpRecover;
      if (target.isActor() && !isRecover) {
        this.push('addText', TextManager.criticalToActor);
      } else {
        this.push('addText', TextManager.criticalToEnemy);
      }
    }
  };


  //逃走フラグおろし
  const _makeActions = Game_Actor.prototype.makeActions;
  Game_Actor.prototype.makeActions = function () {
    _makeActions.call(this);
    this.failedEscape = false;
  };

  //逃走失敗してたらキャンセルで戻せないように
  const _canInput = Game_Actor.prototype.canInput;
  Game_Actor.prototype.canInput = function () {
    if (this.failedEscape) return false;
    return _canInput.call(this);
  };

  //ステートのメモ欄に記載したバフを取得
  Game_BattlerBase.prototype.getStatesBuf = function (type) {
    const states = this.states();
    let value = 0;
    for (let state of states) {
      if (state.meta[type]) value += Number(state.meta[type]);
    }
    return value;
  };

  //ステートのメモ欄に記載したフラグを取得
  Game_BattlerBase.prototype.getStatesFlag = function (type) {
    const states = this.states();
    for (let state of states) {
      if (state.meta[type]) return true;
    }
    return false;
  };

  //パッシブスキルの武器タイプ一致時補正値を取得
  Game_Actor.prototype.getWeaponTypeAddDamage = function () {
    const skills = this.skills();
    let value = {};
    for (let skill of skills) {
      if (skill.meta.addWeponDamage) {
        let damages = JSON.parse(skill.meta.addWeponDamage);
        for (let i = 0; i < damages.length; i += 2) {
          if (!value[damages[i]]) value[damages[i]] = 0;
          value[damages[i]] += damages[i + 1];
        }
      }
    }
    return value;
  };

  //装備、スキル、ステートの属性補正値を取得
  Game_Actor.prototype.getElementAddDamage = function () {
    let items = this.skills();
    items = items.concat(this.states());
    items = items.concat(this.equips());
    let value = {};
    for (let item of items) {
      if (item && item.meta.addElement) {
        let damages = JSON.parse(item.meta.addElement);
        for (let i = 0; i < damages.length; i += 2) {
          if (!value[damages[i]]) value[damages[i]] = 0;
          value[damages[i]] += damages[i + 1];
        }
      }
    }
    return value;
  };

  //逃走をアクターのコマンドに
  Window_ActorCommand.prototype.makeCommandList = function () {
    if (this._actor) {
      this.addAttackCommand();
      this.addSkillCommands();
      this.addItemCommand();
      this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
    }
  };

  //スキルのみ
  Window_ActorCommand.prototype.addSkillCommands = function () {
    const skillTypes = this._actor.skillTypes();
    for (const stypeId of skillTypes) {
      if (stypeId != 2) continue;
      const name = $dataSystem.skillTypes[stypeId];
      this.addCommand(name, 'skill', true, stypeId);
    }
  };

  //----------------------------------------------------------------------------
  const _battleStatusInitialize = Window_BattleStatus.prototype.initialize;
  Window_BattleStatus.prototype.initialize = function (rect) {
    this._faceSprites = {};
    _battleStatusInitialize.call(this, rect);
  };

  Window_BattleStatus.prototype.maxCols = function () {
    return 3;
  };

  const _Window_BattleStatus_update = Window_BattleStatus.prototype.update;
  Window_BattleStatus.prototype.update = function () {
    //ステートの状態を監視して、変わっていたら再描画を促す
    _Window_BattleStatus_update.call(this);
    let icons = '';
    for (var i = 0; i < $gameParty.members().length; i++) {
      icons += i;
      icons += $gameParty.members()[i].allIcons().join(',');
    }
    if (this.stateIconStrs != icons) {
      this.stateIconStrs = icons;

      this.refresh();
    }
    for (const sprite of Object.values(this._faceSprites)) {
      sprite.visible = this.isOpen();
    }
  };

  Window_BattleStatus.prototype.drawItemImage = function (index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);
    this.placeActorFace(actor, rect.x + 32, rect.y + 100);
  };

  Window_BattleStatus.prototype.placeActorFace = function (actor, x, y) {
    const key = 'face' + actor.actorId();
    let sprite;
    if (this._faceSprites[key]) sprite = this._faceSprites[key];
    else {
      sprite = new Sprite_Face();
      this.addChildAt(sprite, 1);
    }
    sprite.x = x;
    sprite.y = y;
    sprite.setActor(actor);
    sprite.show();
    this._faceSprites[key] = sprite;
  };

  Window_BattleStatus.prototype.drawItemStatus = function (index) {
    const actor = this.actor(index);
    const rect = this.itemRectWithPadding(index);
    const x = rect.x;
    let y = 5;
    this.placeActorName(actor, x, y);
    y += 24;
    this.placeGauge(actor, 'hp', x, y);
    y += this.gaugeLineHeight();
    this.placeGauge(actor, 'mp', x, y);
    y += this.gaugeLineHeight() + 4;
    let paramIds = [2, 4, 6, 7, 3];
    let paramNames = ['Atk', 'Mat', 'Agi', 'Luk', 'Def'];
    let fontSize = 18;
    for (let i = 0; i < paramIds.length; i++) {
      let id = paramIds[i];
      this.contents.fontSize = fontSize;
      this.drawText(TextManager.param(id), rect.x, y, rect.width, 'left');
      let buf = actor.getStatesBuf(paramNames[i]);
      let value = actor.param(id);
      if (buf) {
        const sign = buf > 0 ? '+' : '';
        value += '(' + sign + buf + ')';
      }
      this.drawText(value, rect.x, y, rect.width, 'right');
      y += fontSize + 4;
    }
    //パラメータで指定したアイコンの数以上だったら、デフォのくるくるアイコンに
    if (actor.allIcons().length > params.stateIconNum) {
      this.placeStateIcon(actor, x + 15, y + 25);
    } else {
      this.drawActorIcons(actor, x, y + 8);
    }
  };

  Window_BattleStatus.prototype.drawActorIcons = function (actor, x, y) {
    const iconWidth = ImageManager.iconWidth;
    const icons = actor.allIcons();
    let iconX = x;
    for (const icon of icons) {
      this.drawIcon(icon, iconX, y + 2);
      iconX += iconWidth + 4;
    }

    const key = 'actor%1-stateIcon'.format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.visible = false;
  };

  Window_BattleStatus.prototype.placeStateIcon = function (actor, x, y) {
    const key = 'actor%1-stateIcon'.format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
    sprite.visible = true;
  };
  //----------------------------------------------------------------------------
  function Sprite_Face() {
    this.initialize(...arguments);
  }

  Sprite_Face.prototype = Object.create(Sprite.prototype);
  Sprite_Face.prototype.constructor = Sprite_Face;

  Sprite_Face.prototype.setActor = function (actor) {
    this.actor = actor;
    this.loadBitmap();
  };

  Sprite_Face.prototype.loadBitmap = function () {
    this.bitmap = ImageManager.loadFace(this.actor.faceName());
    this.setFrame(ImageManager.faceWidth * (this.actor.faceIndex() % 4),
      ImageManager.faceHeight * Math.floor(this.actor.faceIndex() / 4),
      ImageManager.faceWidth, ImageManager.faceHeight);
  };

  window.Sprite_Face = Sprite_Face;

})();