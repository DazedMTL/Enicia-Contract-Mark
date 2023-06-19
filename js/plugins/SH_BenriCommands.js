/*:
 * @target MZ
 * @plugindesc 便利コマンド集
 * @author しもや
 * @help
 * 色んな処理や便利な関数まとめ
 * @command CallRandom
 * @text ランダム数値呼び出し
 * @desc ランダムの数値を呼び出します。
 * @arg rmin
 * @type number
 * @default 1
 * @text ランダム最小値
 * @desc ランダムの最小値を指定します。
 * @arg rmax
 * @type number
 * @default 6
 * @text ランダム最大値
 * @desc ランダムの最大値を指定します。
 * 
 * @command Heal
 * @text 回復総合
 * @desc 回復処理をします。
 * 
 * @arg HP
 * @type number
 * @default 9999
 * @text HP回復量
 * @desc HPの回復量を指定してください。
 * @min -9999
 * @max 9999
 * 
 * @arg MP
 * @type number
 * @default 9999
 * @text MP回復量
 * @desc MPの回復量を指定してください。
 * @min -9999
 * @max 9999
 * 
 * @arg state
 * @type combo
 * @option no
 * @option normal
 * @option all
 * @value 
 * @default なし
 * @text 解除するステート
 * @desc 解除するステートのグループ、または番号を入力してください。
 * 
 * @arg actor
 * @type actor
 * @default 1
 * @text 対象アクター
 * @desc 対象のアクターを選択してください。(なしの場合全体)
 * 
 * 
 * @command AddDay
 * @text 日数経過
 * @desc 日数経過の処理をします。
 * 
 * @arg addday
 * @text 経過日数
 * @desc 経過する日数
 * @default 1
 * @type number
 * 
 *  @command HitArrow
 * @text 矢の命中処理
 * @desc 矢の命中時の処理をします。
 * 
 * 
 * @command DisplayPic
 * @text ピクチャ表示
 * @desc ピクチャを表示します。
 * @arg picname
 * @text ピクチャ名
 * @desc ピクチャ名
 * @type file
 * @dir img/pictures
 * 
 * @arg pictype
 * @text ピクチャタイプ
 * @desc ピクチャタイプ
 * @type combo
 * @option EVENT
 * @option CUTIN
 * @option EROEVENT
 * @option ANIME
 * @default EVENT
 * 
 * @command EroCutIn
 * @text カットイン表示
 * @desc カットインを構成し表示します。
 * @arg cutinName
 * @text カットイン名
 * @desc カットイン名
 * @type string 
 * 
 * @command EraceEroCutin
 * @text エロカットイン消去
 * @desc エロカットインを消去します。
 * 
 * @command EracePic
 * @text ピクチャ消去
 * @desc ピクチャを消去します。
 * @arg pictype
 * @text ピクチャタイプ
 * @desc ピクチャタイプ
 * @type combo
 * @option EVENT
 * @option CUTIN
 * @option EROEVENT
 * @default EVENT
 * 

 * @command EroHistoryDirect
 * @text エロ履歴入力
 * @desc 履歴を追加
 * @arg message
 * @type string
 * 
 * text アイコンのタイプ
 * @desc 入力
 * @arg type
 * @type string
 * 
 * @command ChoiceEnemyGroup
 * @text 敵の選択
 * @desc 敵の番号をセルフ変数に入力します。
 * @arg egroup
 * @text 敵グループ
 * @desc 敵グループ番号を入力します。
 * @default 1
 * @type troop
 * 
 * 
 * @command ClothChange
 * @text 衣装変更
 * @desc 衣装変更
 * @arg itemid
 * @type armor
 * @arg actorid
 * @type number
 * 
 * @command HeadChange
 * @text 頭変更
 * @desc 頭変更
 * @arg itemid
 * @type armor
 * @arg actorid
 * @type number
 * 
 * 
 * 
 * @command ChangePurpose
 * @text 目的更新
 * @desc 目的更新
 * @arg purpose
 * @text テキスト
 * @desc テキスト
 * @type multiline_string
 * 
 * @command addQuestItem
 * @text 必要アイテムを配列に追加
 * @desc 必要アイテムを配列に追加
 * @arg itemId
 * @text アイテムを指定
 * @desc アイテムを指定
 * @type item
 * @arg itemNum
 * @text 個数を指定
 * @desc 個数を指定
 * @type number
 * 
 * @command addQuestMoney
 * @text 必要お金を配列に追加
 * @desc 必要お金を配列に追加
 * @arg itemNum
 * @text 金額を指定（直接）
 * @desc 金額を指定（直接）
 * @type number
 * @arg itemVar
 * @text 金額を指定（変数）
 * @desc 金額を指定（変数）
 * @type variable
 * 
 * 
 *  @command treasureBox
 * @text アイテム入手の処理
 * @desc アイテム入手の処理
 * @arg boxrank
 * @type select
 * @option common
 * @option rare
 * @option legend
 * @option value
 * @text 宝箱のランク
 * @desc ランクが高いほどレア率が上がる。valueの場合変数831
 * @default common
 * @arg table
 * @text レアテーブル
 * @desc どこまでのレアが出るか。1(R) 2(SR) 3(SSR) 4(UR)まで。\v[]で変数指定(832)
 * @type string
 * @default 1
 * @arg tag
 * @text 出現アイテムタグ
 * @desc どのタグのアイテムが出るか。配列形式。"value"が含まれる場合変数833を参照
 * @type string[]
 * @arg gettime
 * @text 入手回数
 * @desc 入手回数。\v[]で変数指定(834)
 * @default 1
 * @type string
 * @arg only
 * @text 余剰の中身指定(通常はTresure)通常、中身を固定したい時に使う。
 * @desc 空欄でデフォルト、valueの場合変数835
 * @type string
 * 
 * @param CallRandomVar
 * @text 変数
 * @desc ランダム値を返す変数を指定
 * @default 5
 * @type number
 * 
 * @param staterangenormalmin
 * @text 通常ステートの範囲(min)
 * @desc 回復コマンドで解除する通常ステートの範囲
 * @default 1
 * @type number
 * 
 * @param staterangenormalmax
 * @text 通常ステートの範囲(max)
 * @desc 回復コマンドで解除する通常ステートの範囲
 * @default 60
 * @type number
 * 
 * 
 * @param daysvar
 * @text ゲーム日数
 * @desc 日数の変数を指定してください。
 * @default 26
 * @type variable
 * 
 * 
 * @param weekvar
 * @text 曜日の変数
 * @desc 曜日の変数を指定してください。
 * @default 27
 * @type variable
 * 
 * 
 * 
 */



(() => {
  'use strict';
  const pluginName = "SH_BenriCommands";
  PluginManager.registerCommand(pluginName, "CallRandom", function (args) {
    var parameters = PluginManager.parameters('SH_BenriCommands');
    var RandomMax = Number(args.rmax) + 1
    var RandomMin = Number(args.rmin)
    var ReturnVar = Number(parameters['CallRandomVar'])
    var ReturnRandom = Math.floor(Math.random() * (RandomMax - RandomMin) + RandomMin);
    $gameVariables._data[ReturnVar] = ReturnRandom
    //console.log("CallRandom" + ReturnRandom)
  });


  PluginManager.registerCommand(pluginName, "Heal", function (args) {
    var parameters = PluginManager.parameters('SH_BenriCommands');
    var actornum = Number(args.actor)
    var healHP = Number(args.HP)
    var healMP = Number(args.MP)
    var healState = args.state
    var statemin = 0
    var statemax = 0

    //HP,MP
    if (actornum == 0) {
      $gameParty.members().forEach(function (actor) {
        this.changeHp(actor, healHP, false);
        actor.gainMp(healMP)
      }.bind(this));
    } else {
      this.changeHp($gameActors.actor(actornum), 9999, false)
      $gameActors.actor(actornum).gainMp(healMP)
    }

    //state
    if (healState == "no") {
      //処理なし
    } else if (healState = "normal") {

      statemin = Number(parameters.staterangenormalmin)
      statemax = Number(parameters.staterangenormalmax)
      //console.log(statemax)
    } else if (healState == "all") {
      statemin = 1
      statemax = 999
    } else {
      statemin = Number(healState)
      statemax = Number(healState)
    }

    if (healState == "no") {
      //処理なし
    } else {
      for (var i = statemin; i <= statemax; i++) {
        if (actornum == 0) {
          $gameParty.members().forEach(function (actor) {
            actor.removeState(i);
          });
        } else {
          $gameActors.actor(actornum).removeState(i)
        }
      }
    }
  });


  PluginManager.registerCommand(pluginName, "AddDay", function (args) {
    var parameters = PluginManager.parameters('SH_BenriCommands');
    var AddDay = Number(args.addday)
    var Week = Number(parameters.weekvar)
    var TotalDays = Number(parameters.daysvar)

    $gameVariables._data[TotalDays] = $gameVariables.value(TotalDays) + AddDay
    $gameVariables._data[Week] = $gameVariables.value(Week) + AddDay

    while ($gameVariables.value(Week) >= 7) {
      $gameVariables._data[Week] = $gameVariables.value(Week) - 7
    }
  });

  ///////////////////////////////////目的更新
  PluginManager.registerCommand(pluginName, "ChangePurpose", function (args) {
    var text = args.purpose

    //text = text.replace(/\\/g, '\x1b');
    //text = text.replace(/\x1b\x1b/g, '\\');;
    //console.log(text)
    { $TM.show('The Objective has been updated.') }
    $gameVariables._data[159] = text
  });



  //////////////////////////////ピクチャ
  PluginManager.registerCommand(pluginName, "DisplayPic", function (args) {
    SH_DspPic(args)

  });




  //////////////////////////////ピクチャ
  PluginManager.registerCommand(pluginName, "EroCutIn", function (args) {
    //カットインけす処理
    eraseEroCutin()


    var cutinName = args.cutinName
    var cutinData = $dataUniques.erocutin[cutinName]
    var cutinNum = EroCutinNum()
    var PicNumBase = cutinNum[0]//スプライト名に使用
    var actorId = 1//一応アクター指定用
    var point = 0;//左上　使わない？
    var picX = 400
    var picY = 140
    var picZ = 8
    var actorFileName = zeroPadding(actorId, 2)
    var filePath = "CUT/"//階層
    var fileNameA = "actor" + actorFileName + "_cut_" + cutinData.type + "_"//ファイル名前半を構成

    //データ指定用
    var clothTag = SH_getClothTag(actorId)
    var body = cutinData.body;
    var cloth = body ? clothTag[0] : null
    var socks = cutinData.socks;
    var Under = cutinData.Under;
    var leg = 1 //素体決定
    var legSlotID = LegSlotNum()//装備ID
    //ソックス関連
    if (cutinData.socks != "off" && $gameActors._data[1]._equips[legSlotID]._itemId >= 1) {
      var socksId = $gameActors._data[1]._equips[legSlotID]._itemId >= 1 ? $gameActors._data[1]._equips[legSlotID]._itemId : 0
      if ($dataArmors[socksId].meta.socksPicId) {
        socks = $dataArmors[socksId].meta.socksPicId
        leg = $dataArmors[socksId].meta.leg
      }
      if ($dataArmors[socksId].meta["invisible"]) {
        socks = null
        leg = 1
      }
    } else {
      socks = null
    }
    if (body) body = leg//食い込み判定1のとき
    //下着表示しない衣装の時
    if (Under != "off") { Under = clothTag[2] } else { Under = null }

    //配列
    let array = []
    array.push({ fileName: "cut_back_02", blend: 0 })
    if (cutinData.backman) array.push({ num: cutinData.backman, fileHeader: "Man_back_", blend: 0 })
    if (cutinData.backhair) array.push({ num: cutinData.backhair, fileHeader: "Backhair_", blend: 0 })
    if (body) array.push({ num: body, fileHeader: "Body_", blend: 0 })
    if (cutinData.face) array.push({ num: cutinData.face, fileHeader: "Face_", blend: 0 })
    if (cutinData.sweat) array.push({ num: cutinData.sweat, fileHeader: "Sweat_", blend: 0 })
    if (cutinData.lovejuice) array.push({ num: cutinData.lovejuice, fileHeader: "Lovejuice_", blend: 0 })
    if (Under) array.push({ num: Under, fileHeader: "Under_", blend: 0 })
    if (socks) array.push({ num: socks, fileHeader: "Socks_", blend: 0 })
    if (cloth) array.push({ num: cloth, fileHeader: "Cloth_", blend: 0 })
    if (cutinData.semen) array.push({ num: cutinData.semen, fileHeader: "Semen_", blend: 0 })
    if (cutinData.man) array.push({ num: cutinData.man, fileHeader: "Man_", blend: 0 })
    if (cutinData.breath) array.push({ num: cutinData.breath, fileHeader: "Breath_", blend: 0 })
    if (cutinData.effect) array.push({ num: "1", fileHeader: "Effect_", blend: 2 })
    array.push({ fileName: "cut_frame", blend: 0 })


    //表示処理
    var picNum = PicNumBase
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        if (array[i].num) {//通常のカットインファイル名生成
          var fileNameB = array[i].fileHeader + zeroPadding(array[i].num, 4)//ファイル番号
          var fileName = filePath + fileNameA + fileNameB;
        } else if (array[i].fileName) {//ファイルネーム直接指定
          var fileName = filePath + array[i].fileName
        } else {
          console.error("カットインファイル指定不備")
        }
        SH_cutinSprite(picNum, fileName, picX, picY, picZ, array[i].blend)
      }
      picNum += 1
    }

  });


  function SH_cutinSprite(picnum, fileName, x, y, z, blend) {//スプライトの表示処理カットイン用
    var ext = ".png_"
    if ($gameTemp.isPlaytest()) ext = ".png"
    SH_FileCheck("img/pictures/" + fileName + ext) ? $gameScreen.showPicture(picnum, fileName, 0, x, y, 100, 100, 255, blend) : null
  }


  // function SH_cutinSprite(picnum,fileName,x,y,z,blend){//スプライトの表示処理カットイン用
  //   var sprite = new Sprite( ImageManager.loadPicture(fileName) );
  //   SceneManager._scene._spriteset._tilemap.addChild(sprite); sprite.x =x; sprite.y = y; sprite.z = z;sprite.blendMode = blend;
  //   var sceneName = "cutin" + picnum
  //   SceneManager._scene[sceneName] = sprite
  //   //console.log(sceneName)
  // }

  function EroCutinNum() {
    var min = 75
    var max = 90
    var array = [min, max]
    return array
  }


  //////////////////////////////エロカットイン消去
  PluginManager.registerCommand(pluginName, "EraceEroCutin", function (args) {
    eraseEroCutin()
  });

  function eraseEroCutin() {
    var cutinNum = EroCutinNum()
    var min = cutinNum[0]
    var max = cutinNum[1] + 1
    for (var picnum = min; picnum < max; picnum++) {
      if ($gameScreen.picture(picnum)) $gameScreen.erasePicture(picnum)
    }
  }

  // //////////////////////////////エロカットイン消去スプライト
  // PluginManager.registerCommand(pluginName, "EraceEroCutin", function(args){
  //   eraseEroCutin()
  // });

  // function eraseEroCutin(){
  //   for (var picnum = 0; picnum < 30; picnum++) {
  //     // 値が 0 から 29 まで計 30 回実行される
  //     var sceneName = "cutin" + picnum
  //     if(SceneManager._scene[sceneName]) {//既に表示がある場合消す処理//シーン名変更
  //       SceneManager._scene._spriteset._tilemap.removeChild(SceneManager._scene[sceneName])
  //       SceneManager._scene[sceneName] = null;//シーン名変更
  //     }
  //   }
  // }





  //////////////////////////////ピクチャ消去
  PluginManager.registerCommand(pluginName, "EracePic", function (args) {

    SH_EracePic(args)


  });






  ///////////////////////////////////射撃関連
  PluginManager.registerCommand(pluginName, "HitArrow", function (args) {
    var evtObj = $gameMap.eventsXy(this.character(0).x, this.character(0).y);
    console.log(evtObj)
    //console.log(evtObj[0]._characterName)
    //Enemyタグを入れ忘れると当たらないので注意
    for (var i = 0; i < evtObj.length; i++) {
      //if($dataMap.events[evtObj[i]._eventId].meta.Enemy !== void(0) && !$gameMap.event(evtObj[i]._eventId).isTransparent()){  
      if ($dataMap.events[evtObj[i]._eventId].meta.Enemy !== void (0) && evtObj[i]._characterName) {
        $gameSelfSwitches.setVariableValue([$gameMap.mapId(), evtObj[i]._eventId, 1], 1);
        var character = this.character(evtObj[i]._eventId)
        $gameTemp.requestAnimation([character], $gameVariables.value(271))
        this.controlSelfVariable(1, 0, 1, false);//矢の変数。番号によりエフェクト変えたい
      }
    }
  });


  PluginManager.registerCommand(pluginName, "ChoiceEnemyGroup", function (args) {
    var Egroup = args.egroup
    this.controlSelfVariable(20, 0, Egroup, false);
    console.log(Egroup)
  });



  PluginManager.registerCommand(pluginName, "EroHistoryDirect", function (args) {
    var message = args.message
    var iconnum = 0
    var colornum = 0
    if (args.type) { var Type = args.type }
    if (Type == 'Quest' || Type == 'quest') { iconnum = 193; }
    else if (Type == 'Ero') { iconnum = 84; colornum = 27 }
    else if (Type == 'Meet') { iconnum = 658; }
    else if (Type == 'Bread') { iconnum = 266; }
    else if (Type == 'Crab') { iconnum = 722; }
    else if (Type == 'GoodEvent') { iconnum = 182; }

    var icon = `\\i[${iconnum}]`
    var color = `\\c[${colornum}]`
    message = icon + color + message
    erohistory(message)
  });

  PluginManager.registerCommand(pluginName, "ClothChange", function (args) {
    var actorId = Number(args.actorid)
    var ClothSlot = ClothSlotNum()
    var ClothId = Number(args.itemid)
    sh_equipchangearmor(actorId, ClothSlot, ClothId)
  });

  PluginManager.registerCommand(pluginName, "HeadChange", function (args) {
    var actorId = Number(args.actorid)
    var HeadSlot = HeadSlotNum()
    var ClothId = Number(args.itemid)
    sh_equipchangearmor(actorId, HeadSlot, ClothId)
  });

  PluginManager.registerCommand(pluginName, "addQuestItem", function (args) {
    //必要クエストアイテムを配列に追加
    var value = 14
    var itemId = Number(args.itemId)
    var itemType = Number(args.itemType)
    var itemNum = Number(args.itemNum)
    if (Array.isArray($gameVariables.value(value))) {
    } else {
      $gameVariables._data[value] = []
    }
    $gameVariables._data[value].push([itemId, itemNum, itemType]);

  });

  PluginManager.registerCommand(pluginName, "addQuestMoney", function (args) {
    //必要クエストアイテムを配列に追加
    var value = 14
    var itemId = 99
    var itemType = 99
    var itemNum = 0
    if (args.itemVar || args.itemVar >= 1) {
      itemNum = ($gameVariables.value(Number(args.itemVar)))
    } else {
      itemNum = Number(args.itemNum)
    }
    if (Array.isArray($gameVariables.value(value))) {
    } else {
      $gameVariables._data[value] = []
    }
    $gameVariables._data[value].push([itemId, itemNum, itemType]);

  });

  PluginManager.registerCommand(pluginName, "treasureBox", function (args) {

    var tag = args.tag
    if (tag.match("value")) {
      tag = $gameVariables.value(833)
      if (tag == 0) tag = ["Treasure"]
    }

    var rank = args.boxrank
    if (rank == "value") {
      rank = $gameVariables.value(831)
      if (rank == 0) rank = "common"
    }

    var gettime = ConvertCC(args.gettime)
    if (gettime == 0) gettime = 1

    var table = ConvertCC(args.table)
    if (table == 0) table = 1

    var remainder = null
    if (args.only) remainder = args.only
    if (remainder == "value") {
      remainder = $gameVariables.value(835)
      if (remainder == "") remainder = "Treasure"
    }


    while (gettime >= 1) {
      var treasure = SH_treasureRandom(tag, remainder)
      SH_getItemGachaRandom(treasure[1], treasure[0], table, rank)
      gettime -= 1
    }
    $gameVariables._data[831] = 0
    $gameVariables._data[832] = 0
    $gameVariables._data[833] = 0
    $gameVariables._data[834] = 0
    $gameVariables._data[835] = 0

    //console.log(treasure[1],treasure[0],table,rank)


  });








})();
//----------------------------------------------プラグインここまで

//戦闘中アニメーション速度
Sprite_Animation.prototype.updateEffectGeometry = function () {
  const scale = this._animation.scale / 100;
  const r = Math.PI / 180;
  const rx = this._animation.rotation.x * r;
  const ry = this._animation.rotation.y * r;
  const rz = this._animation.rotation.z * r;
  if (this._handle) {
    this._handle.setLocation(0, 0, 0);
    this._handle.setRotation(rx, ry, rz);
    this._handle.setScale(scale, scale, scale);
    this._handle.setSpeed(this._animation.speed / 50);
  }
};



// Common Event ログ表示
Game_Interpreter.prototype.command117 = function (params) {

  const commonEvent = $dataCommonEvents[params[0]];
  if (commonEvent) {
    //console.log(commonEvent)
    $gameVariables._data[786] = params[0]//実行コモン番号
    const eventId = this.isOnCurrentMap() ? this._eventId : 0;
    this.setupChild(commonEvent.list, eventId);
    if (commonEvent.name.match(/【削除】/) || commonEvent.name.match(/Deleted/)) {
      console.error('削除済みコモン実行')
    }
  }
  return true;
};


//戦闘中メッセージ速度
Window_BattleLog.prototype.messageSpeed = function () {
  return 10;
};

//レベルアップの処理(ティッカー実行)
Game_Actor.prototype.displayLevelUp = function (newSkills) {
  const text = TextManager.levelUp.format(
    this._name,
    TextManager.level,
    this._level
  );
  //$gameMessage.newPage();
  //$gameMessage.add(text);
  $TM.show(text);
  for (const skill of newSkills) {
    $TM.show(TextManager.obtainSkill.format(skill.name));
  }
};

//制御文字を変数に変換
function ConvertCC(args) {
  if (args.match(/\\v/) || args.match(/\\V/)) {
    //argsに\vを含む場合の処理
    array = args.match(/[0-9]+\.?[0-9]*/g);
    for (var i = 0; i < array.length; i++) {
      args = Number(array);
      var argsreturn = $gameVariables.value(args);
    }
  } else {
    argsreturn = args
  }
  return argsreturn
}

function ConvertCC2(args) {
  if (args.match(/\v/) || args.match(/\V/)) {
    //argsに\vを含む場合の処理
    array = args.match(/[0-9]+\.?[0-9]*/g);
    for (var i = 0; i < array.length; i++) {
      args = Number(array);
      var argsreturn = $gameVariables.value(args);
    }
  } else {
    argsreturn = args
  }
  return argsreturn
}

//バトルログにスキルアイコン表示
Window_BattleLog.prototype.displayAction = function (subject, item) {
  const numMethods = this._methods.length;
  if (DataManager.isSkill(item)) {
    var Skillicon = $dataSkills[item.id].iconIndex;
    //オブジェクトからの取り出し方を理解
    this.displayItemMessage('\\i[' + Skillicon + ']' + item.message1, subject, item);
    this.displayItemMessage(item.message2, subject, item);
  } else {
    this.displayItemMessage(TextManager.useItem, subject, item);
  }
  if (this._methods.length === numMethods) {
    this.push("wait");
  }
};


(function () {
  'use strict';
  var metaTagPrefix = 'ENL';

  var getMetaValue = function (object, name) {
    var metaTagName = metaTagPrefix + (name ? name : '');
    return object.meta.hasOwnProperty(metaTagName) ? object.meta[metaTagName] : undefined;
  };

  var getMetaValues = function (object, names) {
    if (!Array.isArray(names)) return getMetaValue(object, names);
    for (var i = 0, n = names.length; i < n; i++) {
      var value = getMetaValue(object, names[i]);
      if (value !== undefined) return value;
    }
    return undefined;
  };

  //=============================================================================
  // Game_Event
  //  イベントロックを無効にします。
  //=============================================================================
  var _Game_Event_lock = Game_Event.prototype.lock;
  Game_Event.prototype.lock = function () {
    _Game_Event_lock.apply(this, arguments);
    var disableLock = getMetaValues(this.event(), ['ロック無効', 'DisableLock']);
    if (disableLock) {
      this.setDirection(this._prelockDirection);
    }
  };
})();



///////////////////////////同じ場所に場所移動した時の処理です。
// Transfer Player
Game_Interpreter.prototype.command201 = function (params) {
  if ($gameParty.inBattle() || $gameMessage.isBusy()) {
    return false;
  }
  let mapId, x, y;
  let nowmapId = $gameMap.mapId()
  //ライトの処理

  //console.log(params)

  if (params[0] === 0) {
    // Direct designation
    mapId = params[1];
    x = params[2];
    y = params[3];
  } else {
    // Designation with variables
    mapId = $gameVariables.value(params[1]);
    x = $gameVariables.value(params[2]);
    y = $gameVariables.value(params[3]);
  }
  if (params[0] === 0 & params[1] == nowmapId && !$gameSwitches.value(37)) {
    //同じマップ内を移動する際、中継マップに移動し、本来の移動先を変数に代入
    mapId = 9;
    x = 5;
    y = 5;
    $gameSwitches._data[35] = true;//中継フラグ
    $gameVariables._data[316] = params[1];
    $gameVariables._data[317] = params[2];
    $gameVariables._data[318] = params[3];
    //console.log("中継")
  }
  if (params[0] === 1 && $gameVariables.value(params[1]) == nowmapId && !$gameSwitches.value(37)) {
    //同じマップ内を移動する際、中継マップに移動し、本来の移動先を変数に代入　移動先が変数指定の時
    mapId = 9;
    x = 5;
    y = 5;
    $gameSwitches._data[35] = true;//中継フラグ
    $gameVariables._data[316] = $gameVariables.value(params[1]);
    $gameVariables._data[317] = $gameVariables.value(params[2]);
    $gameVariables._data[318] = $gameVariables.value(params[3]);
    //console.log("中継")

  }
  $gameSwitches.setValue(37, false)//通常場所移動フラグ
  $gamePlayer.reserveTransfer(mapId, x, y, params[4], params[5]);
  this.setWaitMode("transfer");
  return true;
};


//恐らくマップ移動時の処理
Game_Map.prototype.setup = function (mapId) {
  if (!$dataMap) {
    throw new Error("The map data is not available");
  }
  this._mapId = mapId;
  this._tilesetId = $dataMap.tilesetId;
  if ($dataMap.meta["ALWAYSLIGHT"] || $dataMap.meta["ALWAYSLIGHT_COLOR"]) {
    $gameSwitches._data[31] = true;
  }
  this._displayX = 0;
  this._displayY = 0;
  this.refereshVehicles();
  this.setupEvents();
  this.setupScroll();
  this.setupParallax();
  this.setupBattleback();
  this._needsRefresh = false;
};


//移動時変数加算テスト
Game_Party.prototype.increaseSteps = function () {
  this._steps++;
  $gameVariables._data[46] = $gameVariables.value(46) + 1
};




//服や頭などのスロット番号
function ClothSlotNum() {
  return 1
}

function HeadSlotNum() {
  return 2
}

function LegSlotNum() {
  return 3
}





function callmenustand() {
  console.log(this);
  if (this._menustand) {
    this.removeChild(this._menustand)//シーン名変更
    this._menustand = null;//シーン名変更
  }
  var standbase = "STAND/Actor01_Pose01_Body04"
  var standback = "STAND/Stand_back4"
  this._menustand = new Sprite();
  this._menustand.x = Graphics.boxWidth - standarea() + 8; this._menustand.y = 0//座標指定
  this._menustand.bitmap = ImageManager.loadPicture(standback);//bgBitmapNameで指定した背景をロード
  this.addChild(this._menustand);
  //console.log(this._menustand)


  var Coordinate = StandCoordinate()
  var Stand1X = Coordinate[0]
  var Stand1Y = Coordinate[1]
  this._menustand = new Sprite();
  this._menustand.x = Stand1X; this._menustand.y = Stand1Y//座標指定
  this._menustand.bitmap = ImageManager.loadPicture(standbase);//bgBitmapNameで指定した背景をロード
  this.addChild(this._menustand);
  console.log("立ち絵更新")
}

function standarea() {
  return 342
}


TextManager.weaponname = function (EqSlot) {
  if ($gameActors._data[1]._equips[EqSlot]._itemId >= 1) {
    return $dataWeapons[$gameActors._data[1]._equips[EqSlot]._itemId].name || "";
  } else { return "" }
};

TextManager.armorname = function (EqSlot) {
  //console.log(EqSlot)
  if ($gameActors._data[1]._equips[EqSlot]._itemId >= 1) {
    return $dataArmors[$gameActors._data[1]._equips[EqSlot]._itemId].name || "";
  } else { return "" }
};



TextManager.eqtype = function (eqtype) {
  return $dataSystem.equipTypes[eqtype] || "";
};

TextManager.paraname = function (varname) {
  return $dataSystem.variables[varname] || "";
};

TextManager.actorparaname = function (varname) {
  return $dataSystem.terms.params[varname] || "";
};


//ティッカーで報酬のアイコンや単位などを表示
function tickergamevar(Type, Value) {
  var IconLust = $dataItems[354].iconIndex
  var IconMoney = $dataItems[351].iconIndex
  var IconExp = $dataItems[356].iconIndex
  var IconCoin = $dataItems[352].iconIndex
  var IconBustle = $dataItems[353].iconIndex
  var IconEventP = 0
  var IconSP = $dataItems[361].iconIndex
  var IconChurch = $dataItems[357].iconIndex

  var VarNameA = ''
  var VarNameB = ''
  var Icon = 0

  if (Type == 'Rewards') { Icon = IconCoin; VarNameA = TextManager.paraname(109); VarNameB = ' \\g' }
  else if (Type == 'Exp') { Icon = IconExp; VarNameA = TextManager.exp; }
  else if (Type == 'ExpGoal') { Icon = IconExp; VarNameA = TextManager.exp; VarNameB = ' <Quest Reward>' }
  else if (Type == 'Saraly') { Icon = IconCoin; VarNameA = TextManager.paraname(109); VarNameB = ' \\g' }
  else if (Type == 'Bustle') { Icon = IconBustle; VarNameA = TextManager.paraname(117) }
  else if (Type == 'Lust') { Icon = IconLust; VarNameA = TextManager.paraname(205) }
  else if (Type == 'CLevel') { Icon = IconChurch; VarNameA = TextManager.paraname(113) }
  else if (Type == 'SP') { Icon = IconSP; VarNameA = TextManager.paraname(127) }
  else if (Type == 'EventP') { Icon = IconEventP; VarNameA = $gameVariables.value(258) }
  else if (Type == 'Debt') { Icon = IconMoney; VarNameA = TextManager.paraname(125); VarNameB = ' \\g' }
  else if (Type == 'Desire') { Icon = 0; VarNameA = TextManager.paraname(77); }

  //console.log(Value,$gameVariables.value(258))オリジナルポイント名
  //var IconType = "\\i[" + Icon + "]"
  if (Value != 0) {
    $TM.show(VarNameA + ' + ' + Value + VarNameB)
  }

}


function skilllvcul(SKILLVVAR, EXPVAR) {
  var SkillLV = $gameVariables.value(SKILLVVAR)//132-139
  var lvLimit = $gameVariables.value(108) >= 1 ? $gameVariables.value(108) : 5//165-172
  var nextexp = skillexpcul(SkillLV, lvLimit)
  var noDisplay = $gameSwitches.value(107) ? true : false

  var SkillEXP = $gameVariables.value(EXPVAR)

  if (nextexp != 'Max' && SkillEXP >= nextexp) {
    $gameVariables._data[SKILLVVAR] += 1
    var SkillName = TextManager.paraname(SKILLVVAR)


    //ticker
    var IconSkillUP = $dataItems[362].iconIndex
    var Icon = IconSkillUP
    var IconType = "\\i[" + Icon + "]"
    if (!noDisplay) $TM.show(IconType + SkillName + ' + ' + 1)
  }
}


function skillexpcul(NOWLV, MAXLV) {
  if (NOWLV >= MAXLV) {
    var TOTAL = 'Max'
  } else {
    TOTAL = SH_expForSkillLevel(NOWLV)
  }
  return TOTAL
}


function parameterskillget() {
  var SkillActorId = 1
  for (var i = 251; i < $dataSkills.length; i++) {
    if ($dataSkills[i].meta['ParameterSkill']) {
      if ($gameActors.actor(SkillActorId).isLearnedSkill(i) || $gameActors.actor(1).isLearnedSkill(i)) {
        //習得済み
      } else {
        var varnum = Number($dataSkills[i].meta['Paravar'].split(',')[0])
        var value = Number($dataSkills[i].meta['Paravar'].split(',')[1])
        //console.log(varnum,value)
        if ($gameVariables.value(varnum) >= value) {
          $gameActors.actor(SkillActorId).learnSkill(i)
          var IconType = "\\i[" + $dataSkills[i].iconIndex + "]"

          $TM.show('New aptitude/constitution has been added.' + IconType + "\\c[6][" + $dataSkills[i].name + "]")
          //console.log('スキル追加')
        }
      }
    } else if ($dataSkills[i].meta['OriginalSkill']) {
      if ($gameActors.actor(SkillActorId).isLearnedSkill(i) || $gameActors.actor(1).isLearnedSkill(i)) {
        //習得済み
      } else {
        $gameActors.actor(SkillActorId).learnSkill(i)
      }

    }
  }
}


function eroscenestage(scenevar, common) {
  var sceneid = Number(scenevar)
  var commonid = common
  var lustlv = $gameVariables.value(204)//淫欲度
  var start = Number($gameVariables.value(sceneid).startstage)
  var nowstage = $gameVariables.value(sceneid).nowstage
  var maxstage = $gameVariables.value(sceneid).maxstage
  var openstage = maxstage
  var activatecommon = 0
  var commonsceneflag = $gameVariables.value(sceneid).commonscene


  //開始段階判定
  if (start >= lustlv) {
    //解放
    var sceneopen = true//シーン解放
  } else {
    //console.log('パラメータ不足 '　+ start + ' ' +lustlv)
    var sceneopen = false
  }

  //開放されている段階

  //開始ステージから最大ステージ
  //スタート段階が1の時、2段階目に淫欲2が必要
  //淫欲レベル1、開始段階1、最大段階2の時、1まで解放
  if (sceneopen == true) {
    if (lustlv >= start) {//開始段階以上
      if (lustlv >= 2) {
        openstage = maxstage//淫欲レベルが最大の時、最大まで解放
      } else {
        openstage = lustlv//淫欲レベルがスタート段階以上かつ最大未満の時、現在の淫欲レベルまで解放。例えば淫欲0、スタート段階が0で最大2の場合、
      }
    } else {
      openstage = 0 //淫欲レベルがスタート段階に満たない
    }

    //汎用シーンか否か。実行シーンが段階と同じときに判定
    if ($gameVariables._data[sceneid].commonsceneflag == 'true' && nowstage >= lustlv) {
      var commonsceneon = 1
    } else { var commonsceneon = 0 }
    //console.log(openstage,nowstage)

    activatecommon = commonid += nowstage + 1; console.log(commonid)//コモンid指定
    //実行コモン番号を渡す

    if (openstage > nowstage) { $gameVariables._data[sceneid].nowstage += 1; console.log('シーン段階アップ') }//段階アップ
  }
  return [activatecommon, commonsceneon]


};

function eroscenestage2(itemid) {
  var sceneitemid = itemid
  //console.log(sceneitemid)
  var openstage = 0
  var scenedatabase = $dataItems[sceneitemid]
  var lustlv = $gameVariables.value(204)//淫欲
  var scenevar = Number(scenedatabase.meta.scenevar)//アイテムのメタ
  var commonidbase = Number(scenedatabase.meta.commonid)
  var nowstage = $gameVariables.value(scenevar).nowstage//到達済みの段階
  var scenedata1 = $dataItems[sceneitemid + 1]
  var scenedata1commonflag = scenedata1.meta.commonscene//汎用シーンの有無
  var scenedata2 = $dataItems[sceneitemid + 2]
  var scenedata2commonflag = scenedata2.meta.commonscene//汎用シーンの有無
  var scenedata3 = $dataItems[sceneitemid + 3]
  var scenedata3commonflag = scenedata3.meta.commonscene//汎用シーンの有無

  if (scenedata1.meta.needlustlv <= lustlv) {//実行可能な段階判定する
    openstage = 1
  }
  if (scenedata3.meta.needlustlv && scenedata2.meta.needlustlv <= lustlv) {
    openstage = 2
  }
  if (scenedata3.meta.needlustlv && scenedata3.meta.needlustlv <= lustlv) {
    openstage = 3
  }

  if (nowstage < openstage) {//解放されている段階より解放済みの段階が少ない場合、コモン番号+1
    var activatestage = nowstage + 1
    var stageup = 1
    var commonsceneon = 0
  } else {
    var activatestage = nowstage
    var commonsceneon = 1
    var stageup = 0
  }

  if ($dataItems[sceneitemid + activatestage].meta.commonsceneflag == 'false') { commonsceneon = 0 }
  //console.log(sceneitemid + activatestage)
  //console.log(commonsceneon)
  //実行コモン番号　基本コモン番号+↑
  var activatecommon = commonidbase + activatestage

  if (openstage == 0) {
    activatecommon = 0
    console.log('実行不可')
  } else {
    if (stageup == 1) { $gameVariables._data[scenevar].nowstage += 1 }
    $gameVariables._data[scenevar].eventtimes += 1
  }

  return [activatecommon, commonsceneon, $dataItems[sceneitemid].id + activatestage]


};


function eroscenestage3(commonid) {
  var sceneCommonId = commonid//ベースコモン
  var commonMemo = SH_getMemo(sceneCommonId)//ベースコモンのメモ取得
  var openStage = 0//開放可能な段階用の変数
  //var scenedatabase = $dataItems[sceneitemid]
  var lustlv = $gameVariables.value(204)//淫欲LV
  var sceneVar = commonMemo.scenevar//エロシーン情報を格納するゲーム変数の番号
  var nowStage = $gameVariables.value(sceneVar).nowstage//到達済みの段階をゲーム変数から取得
  var timeCountFlag = commonMemo.timeCount ? true : false//回数制
  var nowCount = $gameVariables.value(sceneVar).eventtimes//回数

  var capSwitch = null//スイッチによる進行阻害
  //var commonidbase = commonid


  //段階1のメモ取得
  var commonIdStage1 = commonid + 1
  var commonMemoStage1 = SH_getMemo(commonIdStage1)
  //段階2のメモ取得
  var commonIdStage2 = commonid + 2
  var commonMemoStage2 = SH_getMemo(commonIdStage2)
  //段階3のメモ取得
  var commonIdStage3 = commonid + 3
  var commonMemoStage3 = SH_getMemo(commonIdStage3)
  console.log(commonMemoStage3)

  if (timeCountFlag) {
    if (commonMemoStage1.needlustlv <= nowCount) {//実行可能な段階判定する
      openStage = 1
    }
    if (commonMemoStage2 && commonMemoStage2.needTimeCount && commonMemoStage2.needTimeCount <= nowCount) {
      capSwitch = commonMemoStage2.capSwitch ? Number(commonMemoStage2.capSwitch) : null//エロシーン情報を格納するゲーム変数の番号
      if (!capSwitch || capSwitch && !$gameSwitches.value(capSwitch)) openStage = 2
    }
    if (commonMemoStage3 && commonMemoStage3.needTimeCount && commonMemoStage3.needTimeCount <= nowCount) {
      capSwitch = commonMemoStage3.capSwitch ? Number(commonMemoStage3.capSwitch) : null//エロシーン情報を格納するゲーム変数の番号
      //console.log(capSwitch)
      if (!capSwitch || capSwitch && $gameSwitches.value(capSwitch)) openStage = 3
    }
  } else {
    if (commonMemoStage1.needlustlv <= lustlv) {//実行可能な段階判定する
      openStage = 1
    }
    if (commonMemoStage2 && commonMemoStage2.needlustlv && commonMemoStage2.needlustlv <= lustlv) {
      capSwitch = commonMemoStage2.capSwitch ? Number(commonMemoStage2.capSwitch) : null//エロシーン情報を格納するゲーム変数の番号
      if (!capSwitch || capSwitch && !$gameSwitches.value(capSwitch)) openStage = 2
    }
    if (commonMemoStage3 && commonMemoStage3.needlustlv && commonMemoStage3.needlustlv <= lustlv) {
      capSwitch = commonMemoStage3.capSwitch ? Number(commonMemoStage3.capSwitch) : null//エロシーン情報を格納するゲーム変数の番号
      //console.log(capSwitch)
      if (!capSwitch || capSwitch && $gameSwitches.value(capSwitch)) openStage = 3
    }
  }







  if (nowStage < openStage) {//解放されている段階より解放済みの段階が少ない場合、コモン番号+1
    var activateStage = nowStage + 1
    var stageUp = 1
    var commonSceneOn = 0
  } else {
    var activateStage = nowStage//現状維持
    var commonSceneOn = 1//汎用シーン
    var stageUp = 0
  }

  var actStageCommonMemo = SH_getMemo(sceneCommonId + activateStage)//実行する段階のメモを取得
  if (actStageCommonMemo.commonsceneflag == 'false' || actStageCommonMemo.commonsceneflag == false) {
    commonSceneOn = 0//汎用シーンがない場合は強制オフ
  }
  var activateCommon = sceneCommonId + activateStage

  if (openStage == 0) {
    activateCommon = 0
    console.log('実行不可')
  } else {
    if (stageUp == 1) { $gameVariables._data[sceneVar].nowstage += 1 }
    $gameVariables._data[sceneVar].eventtimes += 1
  }
  //console.log("実行シーン:",sceneCommonId+activateStage,"汎用シーン可否:",commonSceneOn )
  return [activateCommon, commonSceneOn, sceneCommonId + activateStage]


};


function SH_EroSceneStageCap() {//エロシーンの進行を防止する
  if ($gameSwitches.value(2005) && !$gameSwitches.value(9)) {
    var sceneCommonId = $gameVariables.value(2211)
    var commonMemo = SH_getMemo(sceneCommonId)//ベースコモンのメモ取得
    var sceneVar = commonMemo.scenevar//エロシーン情報を格納するゲーム変数の番号
    $gameVariables._data[sceneVar].nowstage -= 1
  }
  $gameSwitches.setValue(2005, false)
}


//------------------------------------------------------------------------
function erohistory(message) {//行動履歴に情報を追加
  var historynum = 40
  var historymin = 1061
  var historymax = historymin + historynum - 1
  for (var i = historymax; i >= historymin; i--) {
    if (i != historymax) {
      $gameVariables._data[i + 1] = $gameVariables._data[i]
    }
  }
  var day = 'Day ' + $gameVariables.value(26) + ':'
  $gameVariables._data[1061] = day + message
};
//------------------------------------------------------------------------
// function erohistory(message){
//   var historymax = 1072
//   if($gameVariables.value(historymax) != ' '){
//     for (var i = 1062; i <= historymax; i++){
//       $gameVariables._data[i-1] = $gameVariables._data[i]
//     } 
//     $gameVariables._data[historymax] = ' '
//   }
//   for (var i = 1061; i <= historymax; i++){
//     if($gameVariables.value(i) == ' '){
//       $gameVariables._data[i] = message
//       break;
//     }
//   }
// };

//------------------------------------------------------------------------
//ARPG関連（たぶん使わない）
function ARPGDamageCul(A_ATK, B_DEF) {
  var Damage = A_ATK - B_DEF / 2
  return Damage
};

function EnemyAtkRange(Id, range, obj) {

  //console.log(obj)
  var atkrange = range;
  var EventId = Id
  var Event = obj.character(Id)
  var eventX = Event.x; var eventY = Event.y
  var playerX = obj.character(-1).x; var playerY = obj.character(-1).y
  var attack = 0

  //（↓２　←４　→６　↑８）
  if (Event.direction() == 2 && playerX == eventX && playerY > eventY) {
    if (playerY <= eventY + atkrange) {
      //console.log('攻撃範囲');
      attack = 1
    }
  }
  if (Event.direction() == 4 && playerX < eventX && playerY == eventY) {
    if (playerX >= eventX - atkrange) {
      //console.log('攻撃範囲');
      attack = 1
    }
  }
  if (Event.direction() == 6 && playerX > eventX && playerY == eventY) {
    if (playerX <= eventX + atkrange) {
      //console.log('攻撃範囲');
      attack = 1
    }
  }
  if (Event.direction() == 8 && playerX == eventX && playerY < eventY) {
    if (playerY >= eventY - atkrange) {
      //console.log('攻撃範囲');
      attack = 1
    }
  }
  return attack

};

function HitEnemyArrow(Id, obj) {

  //console.log(obj)
  var EventId = Id
  var Event = obj.character(Id)
  var eventX = Event.x; var eventY = Event.y
  var playerX = obj.character(-1).x; var playerY = obj.character(-1).y
  var attack = 0

  //（↓２　←４　→６　↑８）
  if (playerX == eventX && playerY == eventY) { attack = 1 }

  return attack

};
//------------------------------------------------------------------------

//衣装タグの読み込み
function ClothTag(ActorID) {
  SlotID = ClothSlotNum()//装備ID
  if ($gameActors._data[ActorID]._equips[SlotID]._itemId >= 2) {
    var ArmorsID = $gameActors._data[ActorID]._equips[SlotID]._itemId
  } else {
    var ArmorsID = 1//全裸
  }
  $gameVariables._data[261] = ArmorsID

  //衣装のタグ読み込み
  //ピクチャ名
  if ($dataArmors[ArmorsID].meta.CLOTHTYPE) {
    var ClothType = $dataArmors[ArmorsID].meta.CLOTHTYPE
  } else {
    var ClothType = "NAKED"
  }
  $gameVariables._data[262] = ClothType

  if ($dataArmors[ArmorsID].meta.CLOTHPICNUM) {
    var ClothPicStr = $dataArmors[ArmorsID].meta.CLOTHPICNUM
  } else {
    var ClothPicStr = "Body_0001"//変更
  }

  return ClothPicStr
}

function ClothType(ActorID) {
  SlotID = ClothSlotNum()//装備ID
  if ($gameActors._data[ActorID]._equips[SlotID]._itemId >= 2) {
    var ArmorsID = $gameActors._data[ActorID]._equips[SlotID]._itemId
  } else {
    var ArmorsID = 1//全裸
  }
  //衣装のタグ読み込み
  //ピクチャ名
  if ($dataArmors[ArmorsID].meta.type) {
    var ClothType = $dataArmors[ArmorsID].meta.type
  } else {
    var ClothType = "naked"
  }
  return ClothType
}

function EqClothPic(ActorID) {
  SlotID = ClothSlotNum()//装備ID
  if ($gameActors._data[ActorID]._equips[SlotID]._itemId >= 2) {
    var ArmorsID = $gameActors._data[ActorID]._equips[SlotID]._itemId
  } else {
    var ArmorsID = 1//全裸
  }
  if ($dataArmors[ArmorsID].meta.CLOTHID) {
    var ClothPicStr = $dataArmors[ArmorsID].meta.CLOTHID
  } else {
    var ClothPicStr = ""
  }
  return ClothPicStr
}

function ClothTalkTag(ActorID) {
  SlotID = ClothSlotNum()//装備ID
  if ($gameActors._data[ActorID]._equips[SlotID]._itemId >= 2) {
    var ArmorsID = $gameActors._data[ActorID]._equips[SlotID]._itemId
  } else {
    var ArmorsID = ClothSlotNum()//装備ID
  }
  $gameVariables._data[261] = ArmorsID

  //衣装のタグ読み込み
  //ピクチャ名
  if ($dataArmors[ArmorsID].meta.TALKCATEGORY) {
    var ClothTalkType = $dataArmors[ArmorsID].meta.TALKCATEGORY
  } else {
    var ClothTalkType = "NAKED"
  }

  return ClothTalkType
}




function EraceStand() {
  $gameScreen.clearPictures();
}




function zeroPadding(NUM, LEN) {//ゼロ埋め
  return (Array(LEN).join('0') + NUM).slice(-LEN);
}


function QuestClearTimes(Id) {
  var questvar = Number($dataItems[Id].meta.questvar);
  var ClearTimes = $gameVariables.value(questvar).cleartimes
  return ClearTimes

};

function EroEventVar(Id) {
  var evvar = Number(Id);
  var nowstage = $gameVariables.value(evvar).nowstage
  return nowstage

};


function ResetActorName(min, max, text) {
  for (var i = min; i < max + 1; i++) {
    $gameActors.actor(i).setName(text)
    $gameActors.actor(i).setNickname(text)
  }
};


function ActorNameAndNickName(actorId, EventNum) {
  var name = $dataActors[actorId].name;
  var nickname = $dataActors[actorId].nickname;
  var numbername = 50 + EventNum
  var numbernickname = 60 + EventNum
  $gameActors.actor(numbername).setName(name);
  $gameActors.actor(numbernickname).setName(nickname);
};


function SH_ClampVar(VarId, min, max) {
  var x = $gameVariables.value(VarId)
  console.log(x, max)
  x = x.clamp(min, max)
  return x
}







//ダイスバトル関連
// function SH_SkillData(SkillId,Returnvar) {
//   var SkillName = $dataSkills[SkillId].name
//   var WeaponId = $gameVariables.value(897)
//   var Icon = Number($dataSkills[SkillId].iconIndex)

//   //初期設定
//   var Animation = 1
//   var DiceNum = 1
//   var AddATK = 0
//   var AddATK2 = 0
//   var AddATK3 = 0
//   var AddATK4 = 0 
//   var Element = "Material"
//   var Critical = 99
//   var Range = "EnemySingle"
//   var Type = "Attack"

//   if($dataSkills[SkillId].meta.Weapon){//武器の場合
//     if($dataWeapons[WeaponId].meta.Dice){DiceNum = Number($dataWeapons[WeaponId].meta.Dice)}//武器ダイス数
//     if($dataWeapons[WeaponId].meta.Unique){AddATK = Number($dataWeapons[WeaponId].meta.Unique)}//武器固有値
//     if($dataWeapons[WeaponId].meta.Element){Element = $dataWeapons[WeaponId].meta.Element}//武器属性
//     Animation = $dataWeapons[WeaponId].animationId
//     if($dataWeapons[WeaponId].meta.Critical){Critical = Number($dataWeapons[WeaponId].meta.Critical)}//武器属性
//     if($dataWeapons[WeaponId].meta.Range){Range = $dataWeapons[WeaponId].meta.Range}//行動対象
//     if($dataWeapons[WeaponId].meta.Type){Type = $dataWeapons[WeaponId].meta.Type}//行動タイプ
//   }else{//スキルの固有値を使う時
//     if($dataSkills[SkillId].meta.Dice){DiceNum = Number($dataSkills[SkillId].meta.Dice)}//スキルダイス数
//     if($dataSkills[SkillId].meta.Unique){AddATK2 = Number($dataSkills[SkillId].meta.Unique)}//スキル固有値
//     if($dataSkills[SkillId].meta.Element){Element = $dataSkills[SkillId].meta.Element}//スキル属性
//     Animation = $dataSkills[SkillId].animationId
//     if($dataSkills[SkillId].meta.Critical){Critical = Number($dataSkills[SkillId].meta.Critical)}//武器属性
//     if($dataSkills[SkillId].meta.Range){Range = $dataSkills[SkillId].meta.Range}//行動対象
//     if($dataSkills[SkillId].meta.Type){Type = $dataSkills[SkillId].meta.Type}//行動タイプ
//   }

//   if($dataSkills[SkillId].meta.AddDice){DiceNum += $dataSkills[SkillId].meta.AddDice}//ダイス目追加スキル
//   if($dataSkills[SkillId].meta.AddCritical){Critical = $dataSkills[SkillId].meta.AddCritical}//クリティカル値をスキルで決める
//   if($dataSkills[SkillId].meta.AddElement){Element = $dataSkills[SkillId].meta.AddElement}//ダイス目追加スキル
//   if($dataSkills[SkillId].meta.AddUnique){AddATK2 += $dataSkills[SkillId].meta.AddUnique}//固有値追加スキル
//   if($dataSkills[SkillId].meta.AddRange){Range = $dataSkills[SkillId].meta.AddRange}//固有値追加スキル
//   if($dataSkills[SkillId].meta.AddType){Type = $dataSkills[SkillId].meta.AddType}//固有値追加スキル

//   var array = [SkillName,Icon,Animation,DiceNum,Element,Critical,AddATK,AddATK2,AddATK3,AddATK4]
//   var obj = {
//     name:SkillName,
//     icon:Icon,
//     animation:Animation,
//     dice:DiceNum,
//     element:Element,
//     critical:Critical,
//     range:Range,
//     type:Type,
//     add1:AddATK,
//     add2:AddATK2,
//     add3:AddATK3,
//     add4:AddATK4
//   }
//   //console.log(obj)
//   return obj
// }


// function SH_SkillRange(VarId,Turn) {
//   var obj = $gameVariables.value(VarId)
//   var Turget = 0
//   console.log(Turn)
//   if(Turn == 0){
//     if(obj.range == "EnemySingle"){
//       Turget = 1
//     }else if(obj.range == "EnemyAll"){
//       Turget = 99
//     }else if(obj.range == "Self"){
//       Turget = 0  
//     }
//     console.log(Turget)
//   }else{
//     if(obj.range == "EnemySingle"){
//       Turget = 0
//     }else if(obj.range == "EnemyAll"){
//       Turget = 0
//     }else if(obj.range == "Self"){
//       Turget = 1
//     }
//   }

//   if(Turget == 1){
//     if($gameSwitches.value(941)){
//       Turget = 1
//     }else if($gameSwitches.value(942)){
//       Turget = 2
//     }else if($gameSwitches.value(943)){
//       Turget = 3
//     }
//   }



//   return Turget

// }






// function SH_DamageCul(VarId) {
//     var obj = $gameVariables.value(VarId)
//     console.log(obj)
//     var Dice = $gameVariables.value(917)
//     var Damage = 0

//     var Attacker = $gameVariables.value(898)//行動者
//     var Defender = $gameVariables.value(899)//対象者
//     var DEF = 0

//     var PTATK = 0
//     var Enemy1ATK = $gameVariables.value(945)//攻撃補正(add3)
//     var Enemy2ATK = $gameVariables.value(955)
//     var Enemy3ATK = $gameVariables.value(965)
//     var PTDEF = $gameVariables.value(925)
//     var Enemy1DEF = $gameVariables.value(946)
//     var Enemy2DEF = $gameVariables.value(956)
//     var Enemy3DEF = $gameVariables.value(966)

//     if(Attacker == 0){//プレイヤーが攻撃者の場合
//       obj.add3 = PTATK //レベルなどの補正
//       obj.add4 = 0 //レベルなどの補正
//     }else if(Attacker == 1){//エネミー1
//       obj.add3 = Enemy1ATK
//       obj.add4 = 0
//     }else if(Attacker == 2){
//       obj.add3 = Enemy2ATK
//       obj.add4 = 0
//     }else if(Attacker == 3){
//       obj.add3 = Enemy3ATK
//       obj.add4 = 0
//     }

//     //対象
//     if(Defender == 0){//プレイヤーが攻撃者の場合
//       DEF = PTDEF
//     }else if(Defender == 1){//エネミー1
//       DEF = Enemy1DEF
//     }else if(Defender == 2){
//       DEF = Enemy2DEF
//     }else if(Defender == 3){
//       DEF = Enemy3DEF
//     }
//     if($gameSwitches.value(952)){
//       Damege = Dice * 2
//       Damage = Damege + obj.add1 + obj.add2 + obj.add3 + obj.add4
//       console.log("Damage",Dice," * 2 + ",obj.add1," + ",obj.add2," + ",obj.add3," + ",obj.add4)


//     }else if($gameSwitches.value(951)){//ファンブル
//       Damage = 0
//     }else{//通常ヒット
//       Damage = (Dice + obj.add1 + obj.add2 + obj.add3 + obj.add4)
//       Damage -= DEF
//       console.log("Damage",Dice," + ",obj.add1," + ",obj.add2," + ",obj.add3," + ",obj.add4," - ",DEF)
//     }


//     return Damage
// }





function SH_DiceAbillity(Type) {
  var AbiVar = 0
  if (Type == "Luck") { AbiVar = 927 }
  else if (Type == "Power") { AbiVar = 923 }
  else if (Type == "Tec") { AbiVar = 924 }
  else if (Type == "Mental") { AbiVar = 926 }
  $gameVariables._data[904] = $gameVariables.value(917)
  $gameVariables._data[918] = $gameVariables.value(AbiVar)
  $gameVariables._data[904] += $gameVariables.value(AbiVar)
}


// function SH_BattleHPMP(){
//   var PTNum = $gameParty.size()
//   var PT1 = $gameParty.members()[0].actorId() //一人目のアクター
//   var PTmaxXP = $gameActors.actor(PT1).param(0);
//   if(PTNum >= 2){
//     var PT2 = $gameParty.members()[1].actorId();
//     PTmaxXP += $gameActors.actor(PT2).param(0);
//   }
//   if(PTNum >= 3){
//     var PT3 = $gameParty.members()[2].actorId();
//     PTmaxXP += $gameActors.actor(PT3).param(0);
//   }
//   if(PTNum >= 4){
//     var PT4 = $gameParty.members()[3].actorId();
//     PTmaxXP += $gameActors.actor(PT4).param(0);
//   }
//   $gameVariables._data[922] = PTmaxXP
// }








//--------------------------------------------------------------------
//特定のタグが付いたアイテムのみ売却する
function SH_SellItemTag(SellType, Ratio, outPutOnly) {
  console.log(SellType)
  if (!Ratio) { var Ratio = 50 }
  var getGold = 0; var icon
  var array = []
  var data = $dataItems
  var itemData = {}
  for (var id = 850; id < 1500; id++) {
    // 値が 1000 から 1499 まで実行
    if (data[id].meta[SellType] && $gameParty.hasItem(data[id]) && !data[id].meta["noAutoSell"]) {
      //itemNum = $gameParty.numItems($dataItems[id])
      //price = $dataItems[id].price * Ratio / 100

      itemData = {
        id: id,
        icon: data[id].iconIndex,
        itemNum: $gameParty.numItems(data[id]),
        price: Math.round(data[id].price * Ratio / 100),
        rare: data[id].meta.rate,
      }
      array.push(itemData)
      getGold += itemData.itemNum * itemData.price
      if (outPutOnly) continue;

      icon = `\\i[${itemData.icon}]`
      $gameParty.loseItem(data[id], itemData.itemNum)
      //$TM.show(icon + data[id].name + "(買取額" + itemData.price + "\\g)" + ' を ' + itemData.itemNum + ' 個売却した。')
    }
  }
  //console.log(getGold + "G")
  if (outPutOnly) return { itemArray: array, total: getGold }
  return getGold
}
//--------------------------------------------------------------------


function SH_getItemTextPicture(arrayData) {
  var itemArray = arrayData.itemArray
  var totalGold = arrayData.total
  var priceText = "Price: "
  var text = ""
  var row = 0
  var rowLimit = 12
  //console.log(itemArray)
  if (!itemArray.length || itemArray.length == 0) return
  for (var i = 0; i < itemArray.length; i++) {
    if (row >= 1 && row <= rowLimit) text += "\n"

    var itemId = itemArray[i].id
    var itemPrice = itemArray[i].price
    var itemNum = itemArray[i].itemNum
    var itemRate = itemArray[i].rare
    var color = 0
    if (itemRate == "R" || itemRate == "SR" || itemRate == "SSR") color = 14
    if (itemRate == "UR") color = 31
    var addText = `\\c[${color}]\\item[${itemId}]<Rarity: ${itemRate}> (${priceText}${itemPrice} \\g)\\c[0] * ${itemNum}`
    if (row >= rowLimit) {
      if (row == rowLimit) text += "Other"
    } else {
      text += addText
    }
    row += 1
  }
  //console.log(text)
  return text
}

function SH_LoseItemArray(arrayData) {
  var itemArray = arrayData.itemArray
  var data = $dataItems
  if (!itemArray.length || itemArray.length == 0) return
  for (var i = 0; i < itemArray.length; i++) {
    var itemId = itemArray[i].id
    var itemNum = itemArray[i].itemNum
    $gameParty.loseItem(data[itemId], itemNum)
  }
  return
}





//--------------------------------------------------------------------
//特定のタグが付いたアイテムのみ取得（テスト用）
function SH_getItemTag(type, tag) {
  if (type == 'item') { var item = $dataItems }
  if (type == 'weapon') { var item = $dataWeapons }
  if (type == 'armor') { var item = $dataArmors }
  for (var i = 1; i < item.length; i++) {
    if (item[i].meta[tag]) {
      $gameParty.gainItem(item[i], 1)
      //$TM.show(icon + $dataItems[id].name + "(買取額" + price + "\\g)" + ' を ' + itemNum + ' 個売却した。')
    }
  }
}
//--------------------------------------------------------------------

//所持しているアイテムやスキルのメタデータのパラメータ取得
function SH_getMetaParameter(type, tag, array) {//arrayは[id最小値,id最大値]。軽量化のため
  if (type == 'item') { var item = $dataItems }
  if (type == 'weapon') { var item = $dataWeapons }
  if (type == 'armor') { var item = $dataArmors }
  if (type == 'skill') { var item = $dataSkills }
  //if(type == 'state'){var item = $dataStates}
  var total = 0
  var num = 0
  var min = array ? array[0] : 1
  var max = array ? array[1] : item.length
  var learnFlag = false

  for (var i = min; i < max; i++) {

    if (type == 'item' && $gameParty.hasItem(item[i]) && item[i].meta[tag]) total += Number(item[i].meta[tag]);
    if (type == 'weapon' && $gameParty.hasItem(item[i], true) && item[i].meta[tag]) total += Number(item[i].meta[tag]);
    if (type == 'armor' && $gameParty.hasItem(item[i], true) && item[i].meta[tag]) total += Number(item[i].meta[tag]);
    if (type == 'skill' && item[i].meta[tag]) {
      if ($gameActors.actor($gameParty.members()[0]._actorId).hasSkill(i)) learnFlag = true
      if ($gameParty.size() >= 2 && $gameActors.actor($gameParty.members()[1]._actorId).hasSkill(i)) learnFlag = true
      if ($gameParty.size() == 3 && $gameActors.actor($gameParty.members()[2]._actorId).hasSkill(i)) learnFlag = true
      //console.log(learnFlag)
      if (learnFlag == true) total += Number(item[i].meta[tag])
      learnFlag = false
    }
  }
  //console.log(total)
  return total
}

//特定のアクターのみに限定
function SH_getMetaParameterActor(type, tag, array, actorId) {//arrayは[id最小値,id最大値]。軽量化のため
  if (type == 'weapon') { var item = $dataWeapons }
  if (type == 'armor') { var item = $dataArmors }
  if (type == 'skill') { var item = $dataSkills }
  //if(type == 'state'){var item = $dataStates}
  var total = 0
  var min = array ? array[0] : 1
  var max = array ? array[1] : item.length
  for (var i = min; i < max; i++) {
    if (type == 'weapon' && $gameActors.actor(actorId).hasWeapon(item[i]) && item[i].meta[tag]) total += Number(item[i].meta[tag]);
    if (type == 'armor' && $gameActors.actor(actorId).hasArmor(item[i]) && item[i].meta[tag]) total += Number(item[i].meta[tag]);
    if (type == 'skill' && $gameActors.actor(actorId).hasSkill(i) && item[i].meta[tag]) total += Number(item[i].meta[tag])
  }
  //console.log(total)
  return total
}

function SH_getMetaFlag(type, tag, array, actorId) {//特定のアクターが特定のMetaタグを持っているか。持っていればその時点でOK
  if (type == 'weapon') { var item = $dataWeapons }
  if (type == 'armor') { var item = $dataArmors }
  if (type == 'skill') { var item = $dataSkills }
  var min = array ? array[0] : 1
  var max = array ? array[1] : item.length
  var hasFlag = false
  for (var i = min; i < max; i++) {
    if (type == 'weapon' && $gameActors.actor(actorId).hasWeapon(item[i]) && item[i].meta[tag]) hasFlag = true;
    if (type == 'armor' && $gameActors.actor(actorId).hasArmor(item[i]) && item[i].meta[tag]) hasFlag = true;
    if (type == 'skill' && $gameActors.actor(actorId).hasSkill(i) && item[i].meta[tag]) hasFlag = true;
    if (hasFlag) break;
  }
  return hasFlag
}

function SH_getHasFlag(type, id) {
  if (type == 'item') { var item = $dataItems }
  if (type == 'weapon') { var item = $dataWeapons }
  if (type == 'armor') { var item = $dataArmors }
  if (type == 'skill') { var item = $dataSkills }
  //if(type == 'state'){var item = $dataStates}
  var hasFlag = false
  for (var i = 1; i < item.length; i++) {
    if (type == 'item' && $gameParty.hasItem(item[id])) hasFlag = true
    if (type == 'weapon' && $gameParty.hasItem(item[id], true)) hasFlag = true
    if (type == 'armor' && $gameParty.hasItem(item[id], true)) hasFlag = true
    if (type == 'skill') {
      if ($gameActors.actor($gameParty.members()[0]._actorId).hasSkill(id)) hasFlag = true
      if ($gameParty.size() >= 2 && $gameActors.actor($gameParty.members()[1]._actorId).hasSkill(id)) hasFlag = true
      if ($gameParty.size() == 3 && $gameActors.actor($gameParty.members()[2]._actorId).hasSkill(id)) hasFlag = true
    }
  }
  return hasFlag
}
//--------------------------------------------------------------------

//--------------------------------------------------------------------
//プレイヤーの座標などを取得
function SH_playerPoint() {
  if ($dataMap.meta) {//マップシーンのみ
    $gameVariables._data[311] = $gameMap.mapId()
    $gameVariables._data[312] = $gamePlayer.x
    $gameVariables._data[313] = $gamePlayer.y
    $gameVariables._data[314] = $gameMap.regionId($gameVariables.value(312), $gameVariables.value(313))
    $gameVariables._data[302] = $dataMap.meta["MAPNAME"]
    $gameVariables._data[303] = $dataMap.meta["MAPTYPE"]
    $gameVariables._data[304] = $dataMap.meta["MAPLOCATION"]
  }
}
//--------------------------------------------------------------------


function SH_genericName(actorid, genericid) {
  var GenericActorId = genericid
  var GenericActorIdNickname = GenericActorId + 10
  var actorId = actorid
  var actorName = $dataActors[actorId].name;
  var actorNickname = $dataActors[actorId].nickname;

  $gameActors.actor(GenericActorId).setName(actorName)
  $gameActors.actor(GenericActorId).setNickname(actorNickname)
  $gameActors.actor(GenericActorIdNickname).setName(actorNickname)
  //console.log($gameActors.actor(GenericActorIdNickname)._name,$gameActors.actor(GenericActorId)._name)
}


function SH_getMemo(num) {
  //console.log(num)
  let commonEvent = $dataCommonEvents[num];
  if (commonEvent.list[0].code != 108) return null;   //最初のイベントが注釈でなければ対象外
  if (commonEvent.list[0].parameters[0].indexOf('EVM:') !== 0) return null; //EVM:で始らなければ対象外
  //(↑こういう書き方するとif文の階層が深くならないで済みます)

  let memos = [];
  for (let i = 1; commonEvent.list[i].code == 408; i++) {  //注釈は一行ごとに408のコードを持つ。全行取得のため408の間だけループ
    memos.push(commonEvent.list[i].parameters[0]);
  }

  let data = { note: memos.join('\n') };   //改行をくっつけて結合
  DataManager.extractMetadata(data);   //メモデータを解析するメソッドが用意されているのでそれに投げる。戻りはdata.metaにくっついてくる

  //以下のループはメモ読むだけなら必要でないが、数字は数値として扱うようにしたいし、\Vも変数展開するためにループする。
  for (let key in data.meta) {
    data.meta[key] = PluginManagerEx.findMetaValue(data, key);
  }
  return data.meta;
}


function SH_commonParameter(commonId) {
  //コモンの注釈に設定されたパラメーターを自動的に上昇させる。
  var parameterVar = SH_getMemo(commonId)//注釈を取得
  var Icon = 0
  var num = 0

  var LoseTime = parameterVar.LoseTime || 0

  //一般
  var num = parameterVar.holy || 0; paraUpCommon(num, "holy")
  var num = parameterVar.service || 0; paraUpCommon(num, "service")
  var num = parameterVar.magic || 0; paraUpCommon(num, "magic")
  var num = parameterVar.town || 0; paraUpCommon(num, "town")
  var num = parameterVar.church || 0; paraUpCommon(num, "church")
  var num = parameterVar.erotec || 0; paraUpCommon(num, "erotec")
  var num = parameterVar.dance || 0; paraUpCommon(num, "dance")

  var num = parameterVar.e_desire || 0; paraUpCommon(num, "e_desire")



  //エロステ
  var num = parameterVar.GetLustEXP || 0; paraUpCommon(num, "lust")
  var num = parameterVar.kuchi || 0; paraUpCommon(num, "kuchi")
  var num = parameterVar.mune || 0; paraUpCommon(num, "mune")
  var num = parameterVar.vagina || 0; paraUpCommon(num, "vagina")
  var num = parameterVar.anus || 0; paraUpCommon(num, "anus")
  var num = parameterVar.kiss || 0; paraUpCommon(num, "kiss")
  var num = parameterVar.houshi || 0; paraUpCommon(num, "houshi")
  var num = parameterVar.aibu || 0; paraUpCommon(num, "aibu")
  if (!$gameSwitches.value(134)) var num = parameterVar.haru || 0; paraUpCommon(num, "haru")//売春
  var num = parameterVar.jii || 0; paraUpCommon(num, "jii")
  var num = parameterVar.sex || 0; paraUpCommon(num, "sex")
  var num = parameterVar.analsex || 0; paraUpCommon(num, "analsex")
  var num = parameterVar.semen || 0; paraUpCommon(num, "semen")
  var num = parameterVar.shame || 0; paraUpCommon(num, "shame")
  var num = parameterVar.rankou || 0; paraUpCommon(num, "rankou")
  var num = parameterVar.ninshin || 0; paraUpCommon(num, "ninshin")
  var num = parameterVar.maso || 0; paraUpCommon(num, "maso")
  var num = parameterVar.chikan || 0; paraUpCommon(num, "chikan")
  var num = parameterVar.saimin || 0; paraUpCommon(num, "saimin")
  var num = parameterVar.loseRape || 0; paraUpCommon(num, "loseRape")
  var num = parameterVar.mamono || 0; paraUpCommon(num, "mamono")
  var num = parameterVar.shota || 0; paraUpCommon(num, "shota")
  var num = parameterVar.ojisan || 0; paraUpCommon(num, "ojisan")
  var num = parameterVar.slum || 0; paraUpCommon(num, "slum")
  var num = parameterVar.searcher || 0; paraUpCommon(num, "searcher")
  var num = parameterVar.penis || 0; paraUpCommon(num, "penis")
  var num = parameterVar.orgasm || 0; paraUpCommon(num, "orgasm")

  var num = parameterVar.SkillEXP || 0
  //console.log(num,Number(num))

  //-------------------------------------------------------------
}

//-------------------------------------------------------------
//スキル入手の処理
function SH_learnSkillAuto() {
  let min = 800
  let max = Object.keys($dataSkills).length
  console.log(max)
  var actorId = 1
  var noDisplay = $gameSwitches.value(107) ? true : false
  for (let step = min; step < max; step++) {
    if (!$dataSkills[step].meta["trial"] && $gameSwitches.value(8)) continue;//体験版かつtrialが付いていない場合  
    if ($dataSkills[step].meta['autoLearn'] && !$gameActors.actor(actorId).isLearnedSkill(step)) {
      var skilldata = $dataSkills[step]
      var condVar1 = Number(skilldata.meta.condVar || 0)
      var condNum = Number(skilldata.meta.condNum || 0)
      var condVar2 = Number(skilldata.meta.condVar2 || 0)
      var condNum2 = Number(skilldata.meta.condNum2 || 0)
      if ($gameVariables.value(condVar1) >= condNum && $gameVariables.value(condVar2) >= condNum2) {
        $gameActors.actor(actorId).learnSkill(step)

        var skillIcon = skilldata.iconIndex
        var skillName = skilldata.name
        var unHoly = skilldata.meta.unHoly ? skilldata.meta.unHoly : null
        var skillDesc = skilldata.description
        var icon = ""
        if (skillIcon >= 1) {
          icon = "\\i[" + skillIcon + "]"
        }
        if (!noDisplay) $TM.show('\\c[1]New aptitude/constitution has been added.')
        if (!noDisplay) $TM.show("\\c[1]Acquired : \\c[6]" + icon + skillName + " \\c[0]")
        if (!noDisplay && unHoly) $TM.show(`\\c[31]Sanctity -${unHoly}`)
      }
    } else if ($dataSkills[step].meta['OriginalSkill'] && !$gameActors.actor(actorId).isLearnedSkill(step)) {
      $gameActors.actor(actorId).learnSkill(step)//初期スキル

    } else if ($dataSkills[step].meta['VirginSkill']) {
      var skilldata = $dataSkills[step]
      var condVar1 = Number(skilldata.meta.condVar || 0)
      var condNum = Number(skilldata.meta.condNum || 0)
      var condVar2 = Number(skilldata.meta.condVar2 || 0)
      var condNum2 = Number(skilldata.meta.condNum2 || 0)
      //条件次第で失うスキル。condVar1は==0のみ
      if ($gameVariables.value(condVar1) == condNum) {
        if ($gameVariables.value(condVar2) >= condNum2) {
          $gameActors.actor(actorId).learnSkill(step)
        }
      } else {//処女でない場合
        $gameActors.actor(1).forgetSkill(step);
      }


    } else if ($dataSkills[step].meta['corruptionSkill'] && !$gameActors.actor(actorId).isLearnedSkill(step)) {
      var skilldata = $dataSkills[step]
      var condVar1 = Number(skilldata.meta.condVar || 0)
      var condNum = Number(skilldata.meta.condNum || 0)
      var condVar2 = Number(skilldata.meta.condVar2 || 0)
      var condNum2 = Number(skilldata.meta.condNum2 || 0)
      var cap = Number(skilldata.meta.capSwitch)
      //条件次第で失うスキル。condVar1は==0のみ
      if ($gameVariables.value(condVar1) >= condNum && $gameVariables.value(condVar2) >= condNum2 && $gameSwitches.value(cap)) {
        $gameActors.actor(actorId).learnSkill(step)
        var skillIcon = skilldata.iconIndex
        var skillName = skilldata.name
        var icon = ""
        if (skillIcon >= 1) {
          icon = "\\i[" + skillIcon + "]"
        }
        if (!noDisplay) $TM.show('\\c[1]New aptitude/constitution has been added.')
        if (!noDisplay) $TM.show("\\c[1]Acquired : \\c[6]" + icon + skillName + " \\c[0]")
        if (!noDisplay) $TM.show("\\c[27]Maximum Lust EXP has increased...")
      }


    }
  }
}


//-------------------------------------------------------------
//変数パラメータアップの処理。jsonから最大値などを取得
function paraUpCommon(num, varName) {
  var data = $dataUniques.gameVariable[varName]
  var variableId = Number(data.varId)
  var iconId = Number(data.icon)
  var paraName = data.name
  var min = Number(data.min)
  var max = Number(data.max)
  var hide = data.hide || 0
  var dispOnly = false
  var opTxt = ""
  //var dispOnly = $gameSwitches.value(9) == true ? true :false; 
  //console.log(dispOnly)
  //console.log(num,varName)
  if (!data) {
    console.error(data + "パラメータ名のミス　コモン" + $gameVariables.value(786))
  } else {
    if (num != 0) {//ticker表示
      if (!dispOnly) $gameVariables._data[variableId] = $gameVariables.value(variableId) + num//変数数値

      if (num < 0) { var operator = ' \\c[10]' } else { var operator = ' \\c[1]+' }
      $gameVariables._data[variableId] = SH_NumberLimit($gameVariables.value(variableId), max, min)
      if (iconId >= 1 && hide != "hide") {
        var icon = "\\i[" + iconId + "]"
        //$TM.show(icon + paraName + operator + num  + "(" + $gameVariables.value(variableId) + ")")
        if (varName == "lust" && $gameActors.actor(1).isStateAffected(57) && num >= 1) {
          if (!dispOnly) $gameVariables._data[variableId] = $gameVariables.value(variableId) + 1
          num += 1
          opTxt = "<Estrust Modifier+1>"
        }
        $TM.show(icon + paraName + operator + num + opTxt)
      }
    }
  }
  if (varName == "lust" && $gameActors.actor(1).hasSkill(239) && num >= 1) {
    SH_ContructPoint(239, num * 10)//契約ポイントの処理
  }
}






//-------------------------------------------------------------
//パラメータ表示改変 0,4,2,5,1という順番で表示したい。可能なら独自パラメータも……
Window_EquipStatus.prototype.drawAllParams = function () {
  // for (let i = 0; i < 6; i++) {
  //     console.log(i)
  //     const x = this.itemPadding();
  //     const y = this.paramY(i);
  //     this.drawItem(x, y, 2 + i);
  // }
  let i = 0
  let x = this.itemPadding();
  let y = this.paramY(i);
  this.drawItem(x, y, 99);//オリジナルパラメータ
  i++
  y = this.paramY(i);
  this.drawItem(x, y, 2 + 0);//筋力
  i++
  y = this.paramY(i);
  this.drawItem(x, y, 2 + 4);//技量
  i++
  y = this.paramY(i);
  this.drawItem(x, y, 2 + 2);//精神
  i++
  y = this.paramY(i);
  this.drawItem(x, y, 2 + 5);//幸運
  i++
  y = this.paramY(i);
  this.drawItem(x, y, 2 + 1);//防御
  // i++
  // y = this.paramY(i);
  // this.drawItem(x, y, 0 + 0);//最大HP
  // i++
  // y = this.paramY(i);
  // this.drawItem(x, y, 0 + 1);//最大SP
  // i++
  // y = this.paramY(i);


};
Window_EquipStatus.prototype.drawItem = function (x, y, paramId) {//表示座標変更
  const paramX = this.paramX() - 32;
  const paramWidth = this.paramWidth() + 20;
  const rightArrowWidth = this.rightArrowWidth();

  if (paramId != 99) {
    this.drawParamName(x, y, paramId);
    if (this._actor) {
      this.drawCurrentParam(paramX, y, paramId);
    }
    this.drawRightArrow(paramX + paramWidth, y);
    if (this._tempActor) {
      this.drawNewParam(paramX + paramWidth + rightArrowWidth, y, paramId);
    }
  } else {
    this.drawParamNameOriginal(x, y, paramId);
    if (this._actor) {
      this.drawCurrentParamOriginal(paramX, y, paramId);
    }
    this.drawRightArrow(paramX + paramWidth, y);
    if (this._tempActor) {
      this.drawNewParamOriginal(paramX + paramWidth + rightArrowWidth, y, paramId);
    }
  }
};

Window_EquipStatus.prototype.drawParamNameOriginal = function (x, y, paramId) {
  const width = this.paramX() - this.itemPadding() * 2;
  this.changeTextColor(ColorManager.systemColor());
  var paraName = "D-Value"
  this.drawText(paraName, x, y, width);
  // this.drawText(TextManager.param(paramId), x, y, width);
};

Window_EquipStatus.prototype.drawCurrentParamOriginal = function (x, y, paramId) {
  const paramWidth = this.paramWidth();
  this.resetTextColor();
  var itemIdCurrent = this._actor._equips[0]._itemId || 0
  var diceParamCurrent = weaponDice(itemIdCurrent)
  this.drawText(diceParamCurrent[0], x, y, paramWidth, "right");
};

// Window_EquipStatus.prototype.drawRightArrow = function(x, y) {
//   const rightArrowWidth = this.rightArrowWidth();
//   this.changeTextColor(ColorManager.systemColor());
//   this.drawText("\u2192", x, y, rightArrowWidth, "center");
// };

function weaponDice(itemId) {

  var dice = "1"; var unique = 0
  if (itemId != 0) { dice = $dataWeapons[itemId].meta.Dice || 1; unique = $dataWeapons[itemId].meta.Unique || 0; }
  var diceParam = dice + "d6"
  if (unique >= 1) { diceParam = diceParam + "+" + unique }
  var array = [diceParam, dice, unique]
  //console.log(array)
  return array
}

Window_EquipStatus.prototype.drawNewParamOriginal = function (x, y, paramId) {
  const paramWidth = this.paramWidth();
  var itemIdNew = this._tempActor._equips[0]._itemId || 0
  var diceParamNew = weaponDice(itemIdNew)
  var itemIdCurrent = this._actor._equips[0]._itemId || 0
  var diceParamCurrent = weaponDice(itemIdCurrent)
  var newParam = Number(diceParamNew[1]) * 6 + Number(diceParamNew[2])
  var currentParam = Number(diceParamCurrent[1]) * 6 + Number(diceParamCurrent[2])

  const diffvalue = newParam - currentParam;
  this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
  this.drawText(diceParamNew[0], x, y, paramWidth, "right");
};





function SH_semen(part, num) {
  if (part == 'body' || part == 'Body') {
    partvar = 181
  } else if (part == 'vagina' || part == 'Vagina') {
    partvar = 182
  } else if (part == part == 'anus' || part == 'Anus') {
    partvar = 183
  } else if (part == 'face' || part == 'Face') {
    partvar = 184
  } else if (part == 'mouth' || part == 'Mouth') {
    partvar = 185
  } else if (part == 'bukkake' || part == 'Bukkake') {
    var array = [181, 184]
    partvar = SH_randomArray(array)
  }

  if (partvar >= 181) {
    $gameVariables._data[partvar] += num
  }
}

function SH_clearSemen() {
  let min = 181
  let max = 185
  for (let step = min; step <= max; step++) {
    $gameVariables._data[step] = 0
  }
}

function SH_totalSemen() {
  var numbers = [$gameVariables.value(181), $gameVariables.value(182), $gameVariables.value(183), $gameVariables.value(184), $gameVariables.value(185)];
  let total = numbers.reduce(function (sum, element) {
    return sum + element;
  }, 0);
  return total
}



var normRand = function (m, s) {//正規分布
  var a = 1 - Math.random();
  var b = 1 - Math.random();
  var c = Math.sqrt(-2 * Math.log(a));
  if (0.5 - Math.random() > 0) {
    return Math.floor(c * Math.sin(Math.PI * 2 * b) * s + m);
  } else {
    return Math.floor(c * Math.cos(Math.PI * 2 * b) * s + m);
  }
};




function SH_useFood(id, target) {//食べ物使用時の処理
  var foodNow = $gameVariables.value(128)
  var foodMax = $gameVariables.value(129)
  var hpHeal = $dataItems[id].meta["hpHeal"] ? Number($dataItems[id].meta.hpHeal) : 0
  var mpHeal = $dataItems[id].meta["mpHeal"] ? Number($dataItems[id].meta.mpHeal) : 0
  var actorId = target._actorId
  var data = $dataItems[id]
  var partySize = $gameParty.size()
  var lastMemberId = $gameParty.members()[partySize - 1] ? $gameParty.members()[partySize - 1]._actorId : 1
  if (foodNow < foodMax) {//上限でない場合  
    if (!$gameActors.actor(actorId).isStateAffected(1)) {//戦闘不能以外
      $gameActors.actor(actorId).gainHp(hpHeal)
      $gameActors.actor(actorId).gainMp(mpHeal)
    }
    if (actorId == 1) {
      var voice = ['talk0002', 'talk0001', 'talk0003']
      voice = voice[Math.floor(Math.random() * voice.length)];
      var args = { seid: voice, volume: 'default', pitch: 100, pan: 0 }
      if (data.meta["crab"]) $gameVariables._data[230] += 1//カニ
      $gameParty.loseItem($dataItems[id], 1)
      PluginManager.callCommand(Game_Interpreter.prototype, 'SH_PlaySEMZ', 'PlayVoice', args);
    }
    //console.log(lastMemberId)
    if (actorId == lastMemberId) {
      $gameVariables._data[128] += 1//食事回数
      $gameVariables._data[257] += 1//累計食事回数
    }
  } else {
    if (actorId == 1) {
      var voice = ['talk0006', 'talk0007', 'talk0004']
      voice = voice[Math.floor(Math.random() * voice.length)];
      var args = { seid: voice, volume: 'default', pitch: 100, pan: 0 }
      PluginManager.callCommand(Game_Interpreter.prototype, 'SH_PlaySEMZ', 'PlayVoice', args);
    }
  }
};

function SH_useDrink(id, target) {//食べ物使用時の処理
  var foodNow = $gameVariables.value(298)
  var foodMax = $gameVariables.value(299)
  var hpHeal = $dataItems[id].meta["hpHeal"] ? Number($dataItems[id].meta.hpHeal) : 0
  var mpHeal = $dataItems[id].meta["mpHeal"] ? Number($dataItems[id].meta.mpHeal) : 0
  var actorId = target._actorId
  var data = $dataItems[id]
  var partySize = $gameParty.size()
  var lastMemberId = $gameParty.members()[partySize - 1] ? $gameParty.members()[partySize - 1]._actorId : 1
  if (foodNow < foodMax) {//上限でない場合  
    if (!$gameActors.actor(actorId).isStateAffected(1)) {//戦闘不能以外
      $gameActors.actor(actorId).gainHp(hpHeal)
      $gameActors.actor(actorId).gainMp(mpHeal)
    }
    if (actorId == 1) {

      $gameParty.loseItem($dataItems[id], 1)
      //var voice = ['talk0002','talk0001','talk0003']
      //voice = voice[Math.floor(Math.random() * voice.length)];
      //var args = {seid:voice,volume:'default',pitch:100,pan:0}
      //PluginManager.callCommand(Game_Interpreter.prototype,'SH_PlaySEMZ', 'PlayVoice', args);
    }
    if (actorId == lastMemberId) {
      $gameVariables._data[298] += 1//食事回数
      $gameVariables._data[297] += 1//累計食事回数
    }
  } else {
    if (actorId == 1) {
      var args = { seid: "buzzer", volume: 'default', pitch: 100, pan: 0 }
      PluginManager.callCommand(Game_Interpreter.prototype, 'SH_PlaySEMZ', 'PlaySE', args);
      //var voice = ['talk0006','talk0007','talk0004']
      //voice = voice[Math.floor(Math.random() * voice.length)];
      //var args = {seid:voice,volume:'default',pitch:100,pan:0}
      //PluginManager.callCommand(Game_Interpreter.prototype,'SH_PlaySEMZ', 'PlayVoice', args);
    }
  }
};






function SH_extasy(part, num) {
  var partParameter = 0
  var base = num || 0
  var extasy = 0
  if (part == "nipple") partParameter = $gameVariables.value(218);
  else if (part == "mouth") partParameter = $gameVariables.value(217);
  else if (part == "vagina") partParameter = $gameVariables.value(219);
  else if (part == "anus") partParameter = $gameVariables.value(220);
  else if (part == "skin") partParameter = 0;
  if (partParameter >= 100) partParameter = 100//性感限度
  extasy = Math.floor(base + (partParameter * base * 0.05))
  extasy = SH_randomRange(extasy, 20)
  //console.log(extasy)
  $TM.show('\\c[27]Sensitivity + ' + extasy)
  $gameVariables._data[210] += extasy
  return extasy
}

function SH_random(min, max) {//汎用乱数生成
  var random = Math.floor(Math.random() * (max - min + 1) + min);
  return random
}

function SH_randomRange(num, per) {//指定パーセントの範囲内で乱数を生成
  var max = num * (100 + per) / 100
  var min = num * (100 - per) / 100
  var random = Math.floor(Math.random() * (max - min + 1) + min);


  return random
}

function SH_actorNameAndNickName(actorId, genId) {//固有アクターidの名前と肩書を汎用に入れる
  if (genId <= 50 || genId >= 71) { console.error("名前指定の汎用領域外"); genId = 51 }
  var genName = genId
  var genNickName = genId + 10
  //console.log($gameActors.actor(actorId).name(),$gameActors.actor(actorId).nickname())
  $gameActors.actor(genName).setName($gameActors.actor(actorId).name())
  $gameActors.actor(genNickName).setName($gameActors.actor(actorId).nickname())
  //console.log($gameActors.actor(genName).name(),$gameActors.actor(genNickName).name())
}

function SH_shakeTemplate(shakeType) {//シェイク設定
  var array = [5, 5, 30, 0]
  var randomAngle = SH_random(0, 180)

  if (shakeType == "デフォルト")
    if (shakeType == "ジャンプ") array = [5, 5, 20, 90]
  if (shakeType == "ダメージ") array = [5, 5, 20, 0]
  if (shakeType == "びっくり") array = [5, 5, 20, 0]
  if (shakeType == "横揺れ") array = [5, 5, 30, 0]
  if (shakeType == "ピストン早") array = [5, 5, 30, 90]
  if (shakeType == "ピストン中") array = [5, 5, 40, 90]
  if (shakeType == "ピストン遅") array = [5, 5, 50, 90]
  if (shakeType == "ランダム小") array = [3, 3, 30, randomAngle]
  if (shakeType == "絶頂") array = [5, 10, 10, randomAngle]


  var force = array[0]; var speed = array[1]; var time = array[2]; var angle = array[3]
  $gameVariables._data[1051] = force; $gameVariables._data[1052] = speed; $gameVariables._data[1053] = time; $gameVariables._data[1054] = angle
  $gameSwitches.setValue(215, true)//シェイク
  $gameVariables._data[1056] = time//ウェイト用
}


function SH_randomArray(array) {//配列内からランダム抽出
  if (Array.isArray(array) == false) {
    console.error(array, "配列でない値を配列抽出しようとした");
    array = [array]
  }
  var random = array[Math.floor(Math.random() * array.length)];
  return random
}

function SH_sugorokuItem(obj) {//すごろく時のみ有効なアイテム

  if ($gameSwitches.value(901)) {//すごろくスイッチがオンの時
    if (obj.varId) $gameVariables._data[obj.varId] = obj.varNum || 0
    if (obj.switchId) $gameSwitches.setValue(obj.switchId, true)
    $gameParty.loseItem($dataItems[obj.itemId], 1)

  } else {
    //$TM.show('今は効果がないようだ。')//遷移してないので出ない
    $gameSwitches.setValue(918, true)
  }
}

function SH_lostVirgin(part, commonNumber, nameDirect) {
  if (!$gameSwitches.value(9) && $gameVariables.value(201) == 0) {//回想時は無効
    var name = "不明"
    var commonMemo = SH_getMemo(commonNumber)
    if (commonMemo && commonMemo.lostVirgin) name = commonMemo.lostVirgin
    if (nameDirect) name = nameDirect//直接指定
    $gameVariables._data[145] = name//初めての相手
    $gameVariables._data[201] = 1//非処女にする
    $TM.show('\\n[1] has lost their virginity...')
  }
}

function SH_lostAnalVirgin(part, commonNumber) {
  if (!$gameSwitches.value(9) && $gameVariables.value(202) == 0) {//回想時は無効
    var name = "不明"
    var commonMemo = SH_getMemo(commonNumber)
    if (commonMemo && commonMemo.lostAnalVirgin) name = commonMemo.lostAnalVirgin

    $gameVariables._data[200] = name//初めての相手
    $gameVariables._data[202] = 1//非処女にする
  }
}

function SH_ClearEstrus(commonNumber) {//発情解除イベント
  if (!$gameSwitches.value(9)) {//回想時は無効
    var commonMemo = SH_getMemo(commonNumber)
    if (commonMemo && commonMemo.clearEstrus) $gameActors.actor(1).removeState(57)
  }
}

function gacha(table, level) {
  //levelによってテーブル変化
  if (!table) table = 1
  if (!level) level = "common"
  var mag = 1
  if (level == "rare") mag = 1.5
  if (level == "legend") mag = 2.0

  var data = {
    'R': 11 * mag, // 30% 
    'UC': 30 * mag
  }

  if (table == 2) {
    data = {
      'SR': 6 * mag, // 30% 
      'R': 11 * mag, // 30% 
      'UC': 30 * mag
    }
  }

  if (table == 3) {
    data = {
      'SSR': 2.5 * mag,
      'SR': 6 * mag, // 30% 
      'R': 11 * mag, // 30% 
      'UC': 30 * mag
    }
  }

  if (table == 4) {
    data = {
      'UR': 0.5 * mag,
      'SSR': 2.5 * mag,
      'SR': 6 * mag, // 30% 
      'R': 11 * mag, // 30% 
      'UC': 30 * mag
    }
  }

  const rand = Math.floor(Math.random() * 100)
  let result = 'C'
  let rate = 0
  for (const prop in data) {
    rate += data[prop]
    if (rand <= rate) {
      result = prop
      break
    }
  }
  return result
  // 1等や2等などを設定した確率で表示 


}


function SH_getItemGachaRandom(type, tag, table, level) {
  //typeは種類、tagはfoodなどの特定タグ
  //levelは場所のレアレベル
  if (type == 'item') { var item = $dataItems };
  if (type == 'weapon') { var item = $dataWeapons };
  if (type == 'armor') { var item = $dataArmors };

  if (!level) { level = 1 }
  var rare = gacha(table, level)
  var itemArray = []
  itemArray = SH_itemTagSearch(item, tag, rare)
  //console.log(tag)
  while (itemArray.length == 0) {//ないことを許容する場合コメントアウト
    rare = gacha(table, level)
    itemArray = SH_itemTagSearch(item, tag, rare)
  }
  if (itemArray.length == 0) {
    //console.log("ない")
  }//存在しない場合


  //入手処理
  var itemId = SH_randomArray(itemArray)
  $gameSwitches.setValue(66, true)
  if (type == 'item' && itemId >= 1) Game_Interpreter.prototype.command126(params2 = [itemId, 0, 0, 1, false]);
  if (type == 'weapon' && itemId >= 1) Game_Interpreter.prototype.command127(params2 = [itemId, 0, 0, 1, false]);
  if (type == 'armor' && itemId >= 1) Game_Interpreter.prototype.command128(params2 = [itemId, 0, 0, 1, false]);
  $gameSwitches.setValue(66, false)

}//特定タグからランダム取得

function SH_itemTagSearch(item, tag, rare) {
  var itemArray = []
  for (var i = 1; i < item.length; i++) {
    if (item[i].meta[tag] && item[i].meta.rate == [rare] || tag == "all" && item[i].meta && item[i].meta.rate == [rare]) {
      itemArray.push(i)
    }
  }
  return itemArray
}


function SH_treasureRandom(array, remainder) {
  //配列のアイテムのみが出現する
  var data = {}
  //console.log(array)
  if (array.includes('Treasure')) data.Treasure = 30
  if (array.includes('newTreasure')) data.newTreasure = 20
  if (array.includes('junk')) data.junk = 30
  if (array.includes('liquor')) data.liquor = 20
  if (array.includes('junkWeapon')) data.junkWeapon = 15
  if (array.includes('weapon')) data.weapon = 10
  if (array.includes('armor')) data.armor = 10
  if (array.includes('food')) data.food = 10
  if (array.includes('potion')) data.potion = 10
  if (array.includes('coin')) data.coin = 10
  if (array.includes('Herb')) data.Herb = 50
  if (array.includes('mushroom')) data.Herb = 50

  const rand = Math.floor(Math.random() * 100)
  let result = 'Treasure'
  if (remainder) result = remainder
  let rate = 0
  for (const prop in data) {
    rate += data[prop]
    if (rand <= rate) {
      result = prop
      break
    }
  }
  var type = "item"
  if (result == 'Treasure') type = "item"
  if (result == 'newTreasure') type = "item"
  if (result == 'junk') type = "item"
  if (result == 'liquor') type = "item"
  if (result == 'junkWeapon') type = "weapon"
  if (result == 'weapon') type = "weapon"
  if (result == 'armor') type = "armor"
  if (result == 'food') type = "item"
  if (result == 'potion') type = "item"
  if (result == 'coin') type = "item"
  if (result == 'Herb') type = "item"
  if (result == 'mushroom') type = "item"
  //console.log(result)
  var returnarray = [result, type]

  return returnarray
}





function SH_ConvertVar(args) {
  var a = args
  if (args.match(/\\v/) || args.match(/\\V/)) a = Number(args.match(/\[(.*?)\]/)[1])
  return a
}


function SH_enemyAgi() {//逃走目標値。生存している敵の中で最大の技量+3が目標値
  var enemyLength = $gameTroop.aliveMembers().length
  var maxAgi = 0
  var enemyAgi = 0
  var base = 3
  var i = enemyLength - 1
  var escapeSuccess = 0
  var addEscape = SH_getMetaParameter("skill", "addEscape", [1000, 1100])
  while (enemyLength >= 1) {
    enemyAgi = $gameTroop.aliveMembers()[i].param(6)
    if (maxAgi < enemyAgi) {
      maxAgi = enemyAgi
    }
    enemyLength -= 1
    i -= 1
  }
  escapeSuccess = maxAgi + base - addEscape
  if (escapeSuccess <= 0) escapeSuccess = 1
  $gameVariables._data[932] = escapeSuccess
  //console.log("逃走値" + $gameVariables.value(932))
}


function SH_sexExp(name, num) {//経験相手を数える処理
  //固有キャラは一回のみ。lengthで取得し、不特定多数とは分ける。
  //console.log(name)
  if (!$gameSwitches.value(9)) {//回想ではオフ
    var array = $gameVariables.value(291)//固有キャラ配列を代入
    if (!num) num = 1//多数でない場合省略可
    if (array == 0 || array == null) array = []//初期値の場合配列化
    if (name == "unknown" || name == "不特定多数") {//不明の相手の場合人数に加算
      $gameVariables._data[292] += num
    } else if (!array.includes(name)) {//不明以外で、かつ配列に名前がない場合配列に追加
      array.push(name)//名前追加
      $gameVariables._data[291] = array//固有キャラの配列更新
      $gameVariables._data[293] = array.length//配列の数を代入
    };
    $gameVariables._data[153] = $gameVariables.value(292) + $gameVariables.value(293)//総経験
  }

}

//カスタムメニュー作成プラグインの説明を書き換える。（変数項目を自動表示）デフォのヘルプにも応用可能かも。
function SH_descReplace(item) {//カスタムメニュー作成のfindHelpText()に独自スクリプトを書き加えているため注意
  // var desc = SH_descReplace(item)
  // return desc != "" ? desc : super.findHelpText();
  //以上が追加項目。returnする元のスクリプトはコメントアウトしている。
  if (item && item.meta) {
    var var1 = item.meta["condVar"] ? Number(item.meta.condVar) : 0
    var num1 = item.meta["condNum"] ? Number(item.meta.condNum) : 0
    var var2 = item.meta["condVar2"] ? Number(item.meta.condVar2) : 0
    var num2 = item.meta["condNum2"] ? Number(item.meta.condNum2) : 0
    var unHoly = item.meta["unHoly"] ? Number(item.meta.unHoly) : 0
    var shameLimit = item.meta["shameLimit"] ? Number(item.meta.shameLimit) : 0
    var addText = item.meta["addText"] ? item.meta["addText"] : null
    //console.log(var1,num1)
  }
  var desc = item && item.description ? item.description : "";
  if (desc.match("[var1]")) {
    var name = SH_varNameFilter(var1) || ""
    desc = desc.replace('[var1]', name)
    desc = desc.replace('[num1]', ` ${num1} `)
  }
  if (desc.match("[var2]")) {
    var name2 = SH_varNameFilter(var2) || ""
    desc = desc.replace('[var2]', name2)
    desc = desc.replace('[num2]', ` ${num2} `)
  }
  if (desc.match("[unHoly]")) {
    var name2 = SH_varNameFilter(130) || ""
    desc = desc.replace('[unHoly]', `\\c[13][${name2} -${unHoly}]`)
  }
  if (desc.match("[shameLimit]")) {
    var name2 = SH_varNameFilter(208) || ""
    desc = desc.replace('[shameLimit]', `\\c[24][${name2} +${shameLimit}]`)
  }
  if (addText) desc += addText
  return desc
};

function SH_varNameFilter(num) {//jsonの連想配列から変数番号が一致するものの変数名を呼び出す。
  var data = $dataUniques.gameVariable
  var keys = Object.keys(data)
  var length = Object.keys(data).length;
  var varId = 0
  var min = 0
  var name = ""

  for (var i = min; i < length; i++) {
    varId = Number(data[keys[i]].varId)
    if (varId == num) {
      name = data[keys[i]].name;
      break;
    }
  }
  return name
};


//特定のアイテムのみを選択可能にする
Window_EventItem.prototype.includes = function (item) {
  const itypeId = $gameMessage.itemChoiceItypeId();
  var switchNum = 0
  if ($gameSwitches.value(75)) switchNum = 75//食べ物のみ
  if ($gameSwitches.value(76)) switchNum = 76//すごろくのみ
  if (switchNum >= 1 && $gameSwitches.value(switchNum)) {
    return DataManager.isItem(item) && item.itypeId === itypeId && Number(item.meta.selectSwitch) === switchNum;
  } else {
    return DataManager.isItem(item) && item.itypeId === itypeId;
  }
};


//オプションのウィンドウサイズ
Window_Options.prototype.initialize = function (rect) {
  rect.height = 600
  rect.y = 40
  Window_Command.prototype.initialize.call(this, rect);
};




// //ここで回想用にequipsを改変
// if($gameSwitches.value(2006)){
//   //衣装
//   var forceCloth = $gameVariables.value(775)

//   var forceBody = null;var forceHead = null;var forceLeg = null
//   if(forceCloth == "sister"){forceBody = 5;forceLeg = 22;console.log(forceCloth)}
//   if(forceCloth == "bath"){forceBody = 7}
//   if(forceCloth == "eroSister"){forceBody = 6;forceLeg = 22}
//   if(forceCloth == "swim"){forceBody = 10;forceLeg = 22}
//   if(forceCloth == "whiteSwim"){forceBody = 16}
//   if(forceCloth == "naked"){forceLeg = 22}
//   if(forceCloth == "sisterBunny"){forceBody = 11;forceHead = 28;forceLeg = 24}
//   if(forceCloth == "prostisute"){forceBody = 13;forceLeg = 24}
//   if(forceCloth == "maid"){forceBody = 12;forceLeg = 22}
//   if(forceCloth == "dancer"){forceBody = 15;}
//   if(forceCloth == "bondage"){forceBody = 18;}
//   equips[1] = forceBody ? $dataArmors[forceBody] : null
//   equips[2] = forceHead ? $dataArmors[forceHead] : null
//   equips[3] = forceLeg ? $dataArmors[forceLeg] : null
// }

function SH_getClothTag(ActorID) {
  var SlotID = ClothSlotNum()//装備ID

  //通常
  if ($gameActors._data[ActorID]._equips[SlotID]._itemId >= 2) {
    var ArmorsID = $gameActors._data[ActorID]._equips[SlotID]._itemId
  } else {
    var ArmorsID = 1//全裸
  }


  //回想
  if ($gameSwitches.value(2006)) {

    var forceCloth = $gameVariables.value(775)
    if (forceCloth == "sister") { ArmorsID = 5; }
    if (forceCloth == "bath") { ArmorsID = 7 }
    if (forceCloth == "eroSister") { ArmorsID = 6; }
    if (forceCloth == "swim") { ArmorsID = 10; }
    if (forceCloth == "whiteSwim") { ArmorsID = 16 }
    if (forceCloth == "naked") { ArmorsID = 1 }
    if (forceCloth == "sisterBunny") { ArmorsID = 11; }
    if (forceCloth == "prostisute") { ArmorsID = 13; }
    if (forceCloth == "maid") { ArmorsID = 12; }
    if (forceCloth == "dancer") { ArmorsID = 15; }
    if (forceCloth == "bondage") { ArmorsID = 18; }
  }

  if ($dataArmors[ArmorsID].meta.CLOTHID) {
    var ClothPicStr = $dataArmors[ArmorsID].meta.CLOTHID
  } else {
    var ClothPicStr = ""
  }

  if ($dataArmors[ArmorsID].meta.socks) {
    var socksFlag = Number($dataArmors[ArmorsID].meta.socks)
  } else {
    var socksFlag = null
  }

  if ($dataArmors[ArmorsID].meta.Under) {
    var underFlag = Number($dataArmors[ArmorsID].meta.Under)
  } else {
    var underFlag = null
  }
  if ($dataArmors[ArmorsID].meta.type) {
    var type = $dataArmors[ArmorsID].meta.type
  } else {
    var type = "naked"
  }
  var array = [ClothPicStr, socksFlag, underFlag, type]
  return array
}

//スキルの説明をアイテムに代入したり。
Window_Help.prototype.setItem = function (item) {
  item = SH_replaceItemText(item)


  this.setText(item ? item.description : "");

};


//スキルの説明にすげかえ

function SH_replaceItemText(item) {


  if (item && item.description.match('skillDesc') && $gameSwitches.value(55)) {
    var learnLv = item.meta.learnLV ? `\\c[4][Required LV:${item.meta.learnLV}]\\c[0]` : null
    var skillClassText = ``
    if (item.meta.ranger) skillClassText += skillClassText == `` ? `Ranger` : `, Ranger`
    if (item.meta.monster) skillClassText += skillClassText == `` ? `Animal/Monster` : `, Animal/Monster`
    if (item.meta.civilian) skillClassText += skillClassText == `` ? `Civilian` : `, Civilian`
    if (item.meta.wizard) skillClassText += skillClassText == `` ? `Wizard` : `, Wizard`
    if (item.meta.fighter) skillClassText += skillClassText == `` ? `Figher` : `, Figher`
    if (item.meta.priest) skillClassText += skillClassText == `` ? `Priest` : `, Priest`
    var skillClass = skillClassText != `` ? `\\c[0][Acquired Class: ${skillClassText}]\\c[0]` : skillClassText

    item = $dataSkills[Number(item.meta.learnSkill)]
    var desc = item.description
  } else {
    var desc = item ? item.description : ""
  }
  if (desc.match('skillDesc') && !$gameSwitches.value(55)) {//スキルショップ以外
    var desc = $dataSkills[Number(item.meta.learnSkill)].description
  }
  if (desc.match("skillName")) {
    var skillName = $dataSkills[Number(item.meta.skillBook)].name || ""
    desc = desc.replace('[skillName]', skillName)
  }
  if (desc.match("[dice]")) {
    var dice = item.meta["Dice"] ? Number(item.meta.Dice) : ""
    //if(dice == 0)dice = ""//diceがゼロの時
    if (dice >= 1) dice = "\\i[757]" + dice + "d6"//diceが1以上の時nd6表記
    var unique = item.meta["Unique"] ? Number(item.meta.Unique) : 0
    if (unique == 0) unique = ""
    if (unique >= 1 && dice == 0) unique = "固定値" + unique
    var plus = unique && dice ? " + " : ""
    var diceText = unique || dice ? "[" + dice + plus + unique + "]" : ""
    desc = desc.replace('[dice]', diceText)
  }
  if (desc.match("[param]")) {
    var paraType = item.meta["Type"] ? item.meta.Type : ""
    if (paraType == "Agi") paraType = "Skill Check"
    if (paraType == "Atk") paraType = "Strength Check"
    if (paraType == "Mat") paraType = "Spirit Check"
    if (paraType == "Luk") paraType = "Luck Check"

    var Fold = item.meta["Fold"] ? Number(item.meta.Fold) : 0//倍率
    if (Fold >= 2) paraType = paraType + "(*" + Fold + ")"//倍率の表記

    if (paraType) paraType = `[${paraType}]`
    desc = desc.replace('[param]', paraType)
  }
  if (desc.match("[heal]")) {
    var healText = ""
    var healHP = ""; var healMP = "";
    if (item["effects"]) {
      var array = item.effects
      healHP = array.find(value => value.code == 11) ? array.find(value => value.code == 11) : ""
      healMP = array.find(value => value.code == 12) ? array.find(value => value.code == 12) : ""
      healHP = healHP && healHP.value2 >= 1 ? healHP.value2 : ""
      healMP = healMP && healMP.value2 >= 1 ? healMP.value2 : ""
    }
    if (item.meta["food"] || item.meta["foodArin"]) {
      if (item.meta["hpHeal"]) healHP = Number(item.meta.hpHeal) >= 1 ? Number(item.meta.hpHeal) : ""
      if (item.meta["mpHeal"]) healMP = Number(item.meta.mpHeal) >= 1 ? Number(item.meta.mpHeal) : ""
    }
    healHP = healHP ? "HP " + healHP : ""
    healMP = healMP ? "SP " + healMP : ""
    if (healHP) healText += healHP
    if (healHP && healMP) healText += " / "
    if (healMP) healText += healMP
    if (healHP || healMP) healText = "[" + healText + " Recovered]"
    desc = desc.replace('[heal]', healText)
  }
  if (desc.match("[itemEffect]")) {
    var itemText = "";
    if (item.meta["eat"]) itemText += "[Food(\\v[128] / \\v[129])]"
    if (item.meta["drink"]) itemText += "[Drink(\\v[298] / \\v[299])]"
    if (item.meta["quick"]) itemText += "[Immediate(Can be used during battle)]"
    if (item.meta["MaxItems"]) itemText += "[Limit: " + item.meta.MaxItems + "]"
    if (item.meta["rate"]) itemText += "[Rarity: " + item.meta.rate + "]"
    desc = desc.replace('[itemEffect]', itemText)
  }
  if (desc.match("[special]")) {
    var spText = ""
    if (item["params"]) {
      var paramId = 3; var paramName = "Defense"; var plus = ""
      if (item.params[paramId] != 0) {
        plus = item.params[paramId] >= 1 ? "+" : ""; spText += "[" + paramName + plus + item.params[paramId] + "]"
      }
      paramId = 2; paramName = "Strength"
      if (item.params[paramId] != 0) {
        plus = item.params[paramId] >= 1 ? "+" : ""; spText += "[" + paramName + plus + item.params[paramId] + "]"
      }
      paramId = 4; paramName = "Spirit"
      if (item.params[paramId] != 0) {
        plus = item.params[paramId] >= 1 ? "+" : ""; spText += "[" + paramName + plus + item.params[paramId] + "]"
      }
      paramId = 6; paramName = "Skill"
      if (item.params[paramId] != 0) {
        plus = item.params[paramId] >= 1 ? "+" : ""; spText += "[" + paramName + plus + item.params[paramId] + "]"
      }
      paramId = 7; paramName = "Luck"
      if (item.params[paramId] != 0) {
        plus = item.params[paramId] >= 1 ? "+" : ""; spText += "[" + paramName + plus + item.params[paramId] + "]"
      }
      paramId = 0; paramName = "HP"
      if (item.params[paramId] != 0) {
        plus = item.params[paramId] >= 1 ? "+" : ""; spText += "[" + paramName + plus + item.params[paramId] + "]"
      }
      paramId = 1; paramName = "SP"
      if (item.params[paramId] != 0) {
        plus = item.params[paramId] >= 1 ? "+" : ""; spText += "[" + paramName + plus + item.params[paramId] + "]"
      }
    }
    if (item.meta["shame"]) spText += "[Required Shame LV:" + Number(item.meta.shame) + "(Current:\\v[208])]"
    if (item.meta["AddDice"]) spText += "[No of Dice + " + Number(item.meta.AddDice) + "]"
    if (item.meta["AddUnique"]) spText += "[Damage Modifier + " + Number(item.meta.AddUnique) + "]"
    if (item.meta["AddCritical"]) spText += "[Crit Modifier " + Number(item.meta.AddCritical) + "]"
    // if(item.meta["addElement"]){//属性補正
    //   var elem = JSON.parse(item.meta.addElement);var name = $dataSystem.elements[elem[0]];var value = elem[1]
    //   spText += `[属性補正:${name}+${value}` + "]"
    // }

    if (item.meta["Penetrate"]) spText += "[Penetration Value]"
    if (item.meta["AbsAim"]) spText += "[Guaranteed Hit]"
    if (item.meta["DualAttack"]) spText += "[Double Attack]"
    if (item.meta["addText"]) spText += item.meta.addText
    //if(item.meta["Twohanded"])spText += "[両手武器]"
    if (item.meta["Equipment Requirements"] && Number(item.meta["Equipment Requirements"]) == 1081) spText += "[Heavy Weapons]"
    if (item.meta["Equipment Requirements"] && Number(item.meta["Equipment Requirements"]) == 1083) spText += "[Heavy Armor]"
    if (item.meta["Character Requirement"] && Number(item.meta["Character Requirement"]) == 1) spText += "[\\n[1] Exclusive]"
    if (skillClass) spText += skillClass
    if (learnLv) spText += learnLv

    if (item.meta["MaxItems"]) spText += "[Limit: " + item.meta.MaxItems + "]"
    if (item && item.meta["rate"]) spText += "[Rarity: " + item.meta.rate + "]"
    desc = desc.replace('[special]', spText)
  }
  if (desc.match("[uniquePlusPara]")) {
    var paraType = item.meta["Type"] ? item.meta.Type : ""
    if (paraType == "Agi") paraType = "Skill"
    if (paraType == "Atk") paraType = "Strength"
    if (paraType == "Mat") paraType = "Spirit"
    if (paraType == "Luk") paraType = "Luck"
    var Fold = item.meta["Fold"] ? Number(item.meta.Fold) : 0//倍率
    if (Fold >= 2) paraType = paraType + "(*" + Fold + ")"//倍率の表記

    var unique = item.meta["Unique"] ? Number(item.meta.Unique) : 0
    if (unique == 0) unique = ""
    var plus = unique && paraType ? " + " : ""
    var upText = unique || paraType ? "[" + unique + plus + paraType + "]" : ""
    desc = desc.replace('[uniquePlusPara]', upText)
  }
  if (item) item.description = desc ? desc : ""
  return item
}


Window_ShopBuy.prototype.drawItem = function (index) {//説明に[skillDesc]と入ったアイテムの説明やアイコンをlearnSkillのものに変更
  const item = this.itemAt(index);
  const price = this.price(item);
  const rect = this.itemLineRect(index);
  const priceWidth = this.priceWidth();
  const priceX = rect.x + rect.width - priceWidth;
  const nameWidth = rect.width - priceWidth;
  this.changePaintOpacity(this.isEnabled(item));
  //console.log(item)
  //var itemReplace = item
  // if(itemReplace.description.match('skillDesc') && $gameSwitches.value(55)){
  //   desc = $dataSkills[Number(itemReplace.meta.learnSkill)].description
  //   itemReplace.name = $dataSkills[Number(itemReplace.meta.learnSkill)].name
  //   itemReplace.iconIndex = $dataSkills[Number(itemReplace.meta.learnSkill)].iconIndex
  // }
  // this.drawItemName(itemReplace, rect.x, rect.y, nameWidth);
  var replace = SH_replaceItemText(item)
  this.drawItemName(replace, rect.x, rect.y, nameWidth);
  this.drawText(price, priceX, rect.y, priceWidth, "right");
  this.changePaintOpacity(true);
};



//HPの計算式を変更。筋力や精神を元に自動計算される。
Game_BattlerBase.prototype.paramBasePlus = function (paramId) {
  if (this._actorId) {//アクターの場合
    if (paramId == 0) {//HP。20 + LV*5 + 筋力*4 + 精神*2
      return Math.max(0, this.paramBase(paramId) + (this._level * 5) + ((this.paramBase(2) + this.paramPlus(2)) * 4) + ((this.paramBase(4) + this.paramPlus(4)) * 2)) + this.paramPlus(paramId);
    } else if (this._actorId && paramId == 1) {//SP。15 + LV* + 精神*2 + 技量
      return Math.max(0, this.paramBase(paramId) + (this._level * 3) + ((this.paramBase(4) + this.paramPlus(4)) * 2)) + (this.paramBase(6) + this.paramPlus(6)) + this.paramPlus(paramId);
    }
    return Math.max(0, this.paramBase(paramId) + this.paramPlus(paramId))
  } else {
    //敵パラメータの難易度補正
    var difLv = $gameVariables.value(44)//戦闘難易度
    var cor1 = 1//倍率
    if (difLv == 0) { cor1 = 0.8 }
    if (difLv == 2) { cor1 = 1.2 }
    if (difLv >= 3) { cor1 = 1.4 }
    var eParam = Math.max(0, (this.paramBase(paramId) + this.paramPlus(paramId)) * cor1)
    //console.log(eParam)
    return Math.round(eParam);
  }
};

//var mhp = this.param(0) + (this._level * 5) + (this.param(2) * 4) + (this.param(4) * 2);return mhp
//------------------------------------------------------------------------------------------------------
//選択肢座標の固定
Window_ChoiceList.prototype.windowX = function () {
  return 700;
  // const positionType = $gameMessage.choicePositionType();
  // if (positionType === 1) {
  //     return (Graphics.boxWidth - this.windowWidth()) / 2;
  // } else if (positionType === 2) {
  //     return Graphics.boxWidth - this.windowWidth();
  // } else {
  //     return 0;
  // }
};

Window_ChoiceList.prototype.windowY = function () {
  return messageY = 0
  // const messageY = this._messageWindow.y;
  // if (messageY >= Graphics.boxHeight / 2) {
  //     return messageY - this.windowHeight();
  // } else {
  //     return messageY + this._messageWindow.height;
  // }
};

Window_ChoiceList.prototype.windowWidth = function () {
  const width = this.maxChoiceWidth() + this.colSpacing() + this.padding * 2;
  return Math.min(width, Graphics.boxWidth);
};

Window_ChoiceList.prototype.windowHeight = function () {
  return this.fittingHeight(this.numVisibleRows());
};
//------------------------------------------------------------------------------------------------------



function SH_MoveEffect(data) {//Moveイベントの各種フラグ
  //console.log(data)
  var stepFlag = 1
  var closeFlag = 0
  var eraseFlag = 0
  var nowTime = $gameVariables.value(31)
  var key = data["key"] || null;
  var inBar = data["inBar"] || null;//酒場内の場所移動
  var inPalace = data["inPalace"] || null;//富豪の館内の場所移動
  var flag = Number(data.flag || null);//スイッチによる表示フラグ
  var objectFlag = data.door || data.stair || data.warp ? 1 : null;//階段やドアなどの場合
  var doorAnime = Number(data.doorAnime || null);//スイッチによる表示フラグ
  var openKeyFlag = Number(data.openKeyFlag || null);//スイッチによる表示フラグ
  var touchFlag = data.touch ? true : false;//スイッチによる表示フラグ
  var openTime = Number(data["openTime"]) || 0;//開店時間
  var closeTime = Number(data["closeTime"]) || 99;//閉店時間

  //非表示or閉店フラグ
  if (openTime > nowTime || closeTime <= nowTime) closeFlag = 1//開店/閉店時間の条件
  if (flag && !$gameSwitches.value(flag)) eraseFlag = 1
  if ($gameSwitches.value(1227) && !objectFlag && !inBar || $gameSwitches.value(1391) && !objectFlag && !inPalace) eraseFlag = 1//酒場バイトor掃除
  if ($gameSwitches.value(1227) && objectFlag && !inBar || $gameSwitches.value(1391) && objectFlag && !inPalace) closeFlag = 1//酒場バイト
  if (key) closeFlag = 1
  if (openKeyFlag) {
    if ($gameSwitches.value(openKeyFlag)) {
      closeFlag = 0
    } else {
      closeFlag = 1
    }
  }
  if (doorAnime) stepFlag = 0


  var array = [closeFlag, eraseFlag, stepFlag, touchFlag]
  return array
}

function SH_eventOnFlag(data) {
  //console.log(data)
  var eraseFlag = 0
  var flagSwitch = Number(data.flagSwitch || null);//スイッチによる表示フラグ
  var flagValue = Number(data.flagValue || null);//変数による表示フラグ

  //非表示
  if (flagSwitch && !$gameSwitches.value(flagSwitch)) eraseFlag = 1
  if (flagValue && $gameVariables.value(flagValue) == 0) eraseFlag = 1
  return eraseFlag
}

function SH_ItemEventOnFlag(data) {
  //console.log(data)
  var getFlag = 0
  var flagSwitch = Number(data.getSwitch || null);//スイッチによる表示フラグ

  //非表示
  if (flagSwitch && $gameSwitches.value(flagSwitch)) getFlag = 1
  return getFlag
}

function SH_CallStandSimple(actorId, FaceId) {
  var actorName = ""

  if (actorId == 32) actorName = "Reciel"
  if (actorId == 31) actorName = "Grunt"
  if (actorId == 2) actorName = "Wize"
  if (actorId == 34) actorName = "Suya"
  if (actorId == 35) actorName = "Luna"
  if (actorId == 41) actorName = "Agol"
  if (actorId == 21) actorName = "Belsef"
  if (actorName) $gameVariables._data[1019] = actorName
  if (FaceId) $gameVariables._data[1018] = FaceId
  //console.log(actorName)
  $gameSwitches.setValue(220, true)
}

function SH_EraceStandSimple() {
  $gameSwitches.setValue(219, true)
}

//敵名にレベルと種族の表示
Window_BattleEnemy.prototype.drawItem = function (index) {
  this.resetTextColor();

  var enemyLv = $dataEnemies[this._enemies[index]._enemyId].meta["enemyLv"] ? Number($dataEnemies[this._enemies[index]._enemyId].meta.enemyLv) : 0
  var enemyRace = $dataEnemies[this._enemies[index]._enemyId].meta["race"] ? $dataEnemies[this._enemies[index]._enemyId].meta.race : "種族不明"

  var lvText = `<${enemyRace}:LV ${enemyLv}>`
  if ($dataEnemies[this._enemies[index]._enemyId].meta["strong"] && $gameSwitches.value(922)) {
    this.changeTextColor(ColorManager.textColor(18))
  }
  if ($dataEnemies[this._enemies[index]._enemyId].meta["boss"] && $gameSwitches.value(922)) {
    this.changeTextColor(ColorManager.textColor(18))
  }
  const name = this._enemies[index].name() + lvText;
  const rect = this.itemLineRect(index);
  this.drawText(name, rect.x, rect.y, rect.width);
};

//経験値のコントロール
Game_Actor.prototype.expForLevel = function (level) {
  const c = this.currentClass();
  var array = [0, 100, 200, 350, 500, 700, 950, 1250, 1650, 2150, 2750, 3500, 4300, 5300, 6350, 7700, 10000, 10000, 10000, 10000, 10000, 10000, 10000]
  var totalExp = 0
  for (var i = 0; i < level; i++) {
    totalExp += array[i] ? array[i] : 10000
  }

  return Math.round(
    totalExp
  );
};

function SH_CM_NextLevel(item) {
  var text = ""
  if (item.meta.next) {
    var varId = Number(item.meta.skillVar)
    var skillLv = $gameVariables.value(varId)
    //console.log(skillLv)
    var next = "---"
    if (skillLv < 5) {
      next = SH_expForSkillLevel(skillLv)
    }
    text = ' / ' + next
  }
  return text
}

function SH_expForSkillLevel(level) {
  var array = [10, 15, 20, 25, 30, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
  var totalExp = 0
  for (var i = 0; i <= level; i++) {
    totalExp += array[i] ? array[i] : 100
  }
  if (totalExp == 0) { totalExp = 15 }

  return Math.round(
    totalExp
  );
};

//敵の座標を補正
Game_Enemy.prototype.screenX = function () {
  return this._screenX - 250;
};

Game_Enemy.prototype.screenY = function () {
  return this._screenY - 80;
};


function SH_eroNpcSwitch() {//テンプレートの注釈から自動で呼び出し、探索を判定
  //console.log("eroNpc")
  if (!$gameSwitches.value(58)) $gameSwitches.setValue(58, true)//セクハラNPCいる
  if ($dataMap.meta["hentai"] || $gameActors.actor(1).hasSkill(237)) {
    $gameSwitches.setValue(330, true)
  } else {
    $gameSwitches.setValue(330, false)
  }
}

function SH_NpcAutoGenerate() {//自動生成されるNPCのいるマップ
  if (!$gameSwitches.value(57)) $gameSwitches.setValue(57, true)
}

//スリップダメージに関する処理
Game_Battler.prototype.regenerateHp = function () {
  const minRecover = -this.maxSlipDamage();
  var hrg = this.hrg * 100//デフォルトでは小数点ダメージ*最大HPの仕様になっているのを整数の固定値に変更。
  const value = Math.max(Math.floor(hrg), minRecover);
  if (value !== 0) {
    this.gainHp(value);
  }
};
Game_Battler.prototype.regenerateMp = function () {
  var mrg = this.mrg * 100
  const value = Math.floor(mrg);
  if (value !== 0) {
    this.gainMp(value);
  }
};

//スキル封印。特定のタグで判定する。
Game_BattlerBase.prototype.isSkillSealed = function (skillId) {
  if (this.isStateAffected(6) && $dataSkills[skillId].meta["magic"]) return true
  if (this.isStateAffected(7) && $dataSkills[skillId].meta["combat"]) return true
  return this.traitsSet(Game_BattlerBase.TRAIT_SKILL_SEAL).includes(skillId);
};


function SH_ContructPoint(id, point) {//契約ポイントの入手
  var skill = $dataSkills[id];
  point = Math.round(point);

  if ($gameActors.actor(1).hasSkill(id) && point >= 1 && !$gameSwitches.value(9)) {

    var skillName = `\\i[${skill.iconIndex}]` + skill.name;
    $TM.show("\\c[13]Due to " + skillName + ' Contract Points increased.\\c[27]+' + point);
    $gameVariables._data[212] += point;
  }
}


function SH_ContructEstrus(id, per) {//契約紋の効果で発情
  var skill = $dataSkills[id];
  var bool = false
  var random = Math.floor(Math.random() * 100) + 1
  if (random <= per && $gameActors.actor(1).hasSkill(id) && !$gameSwitches.value(9) && !$gameActors.actor(1).isStateAffected(57)) {
    bool = true
  }

  if (bool) {
    var skillName = `\\i[${skill.iconIndex}]` + skill.name;
    $TM.show("\\c[13]Due to " + skillName + ' has gone into heat.');

    $gameActors.actor(1).addState(57)
  }

}
function SH_Filter(actorId, item, tag) {//フィルタリングして返す
  var dataName = $dataSkills;
  var itemArray = 0;
  if (item == "item") {
    dataName = $dataItems;
    itemArray = dataName.filter(data => data && data.meta[tag] && $gameParty.hasItem(data.id));
  }
  if (item == "weapon") {
    dataName = $dataWeapons;
    itemArray = dataName.filter(data => data && data.meta[tag] && $gameActors.actor(actorId).hasItem(data.id));

  }
  if (item == "armor") {
    dataName = $dataArmors;
    itemArray = dataName.filter(data => data && data.meta[tag] && $gameActors.actor(actorId).hasItem(data.id));
  }
  if (item == "skill") {
    dataName = $dataSkills;
    itemArray = dataName.filter(data => data && data.meta[tag] && $gameActors.actor(actorId).hasSkill(data.id));
  }
  return itemArray
}


function SH_equipForceChange(actorId, equipSlot, equipItemId, getFlag) {
  //getFlagは所持していない場合入手した上で強制装備。
  var data = $dataWeapons[equipItemId];
  if (equipSlot >= 1) { data = $dataArmors[equipItemId] };

  if ($gameParty.hasItem(data, false)) {
    $gameActors.actor(actorId).changeEquip(equipSlot, data);
  } else if (getFlag) {
    $gameParty.gainItem(data, 1)
    $gameActors.actor(actorId).changeEquip(equipSlot, data);
  }
  if (actorId == 1) $gameSwitches.setValue(93, true)//キャラチップ変更確認
}




function SH_LoadBattleBack(bgName) {
  var texture = ImageManager.loadBattleback1(bgName)
  var sprite = new Sprite(texture);
  SceneManager._scene._spriteset._tilemap.addChild(sprite); sprite.x = 0; sprite.y = 0; sprite.z = 8;
  sprite.scale.x = 1.37;
  sprite.scale.y = 1.05;
  SceneManager._scene.standBG = sprite
}

function SH_LoadBattleBack2(bgName) {
  var texture = ImageManager.loadBattleback2(bgName)
  var sprite = new Sprite(texture);
  SceneManager._scene._spriteset._tilemap.addChild(sprite); sprite.x = 0; sprite.y = 0; sprite.z = 8;
  sprite.scale.x = 1.37;
  sprite.scale.y = 1.05;
  SceneManager._scene.standBG2 = sprite
  //console.log(sprite.scale)
}

function SH_LoadBattleBack3(bgName) {
  var texture = ImageManager.loadPicture(bgName)
  var sprite = new Sprite(texture);
  SceneManager._scene._spriteset._tilemap.addChild(sprite); sprite.x = 0; sprite.y = 0; sprite.z = 8; sprite.blendMode = 2;
  sprite.scale.x = 1.37;
  sprite.scale.y = 1.05;
  SceneManager._scene.standBG3 = sprite
}

// function SH_LoadBattleBack(bgName){
//   var BG = bgName
//   var file    = 'img/battlebacks1/' + encodeURIComponent(BG) + '.png';
//   var texture = new PIXI.Texture( PIXI.BaseTexture.fromImage( file ), new PIXI.Rectangle( 0, 0, 342, 740 ) );
//   var sprite = new PIXI.Sprite( texture );
//   SceneManager._scene._spriteset._tilemap.addChild(sprite); sprite.x = 1024; sprite.y = 0; sprite.z = 8;
//   sprite.scale.y = 1.1;
//   SceneManager._scene.standBG = sprite
// }

// function SH_LoadBattleBack2(bgName){//右端のみ
//   var BG = bgName
//   var file    = 'img/battlebacks2/' + encodeURIComponent(BG) + '.png';
//   var texture = new PIXI.Texture( PIXI.BaseTexture.fromImage( file ), new PIXI.Rectangle( 0, 0, 342, 740 ) );
//   var sprite = new PIXI.Sprite( texture );
//   SceneManager._scene._spriteset._tilemap.addChild(sprite); sprite.x = 1024; sprite.y = 0; sprite.z = 8;
//   sprite.scale.y = 1.1;
//   SceneManager._scene.standBG2 = sprite
// }

function SH_EraseBattleBack() {
  if (SceneManager._scene.standBG) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset._tilemap.removeChild(SceneManager._scene.standBG)
    SceneManager._scene.standBG = null;//シーン名変更
  }
  if (SceneManager._scene.standBG2) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset._tilemap.removeChild(SceneManager._scene.standBG2)
    SceneManager._scene.standBG2 = null;//シーン名変更
  }
  if (SceneManager._scene.standBG3) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset._tilemap.removeChild(SceneManager._scene.standBG3)
    SceneManager._scene.standBG3 = null;//シーン名変更
  }
}

// function SH_ChangeCharaChip(){
//   var actorId = 1
//   var equipId = $gameActors.actor(actorId)._equips[1] ? $gameActors.actor(1)._equips[1]._itemId : 0 
//   var picName = equipId >= 1 && $dataArmors[equipId].meta["charaChip"] ? $dataArmors[equipId].meta.charaChip : "actor_0001"
//   var picNum = equipId >= 1 && $dataArmors[equipId].meta["ChipNum"] ? Number($dataArmors[equipId].meta.ChipNum) : 1//とりあえず現状は下着強制

//   if(picNum == 2 && picName == "actor_0001" && $gameActors.actor(actorId).hasArmor($dataArmors[27]))picNum = 3//シスター服着ててベール装備

//   $gameActors.actor(actorId).setCharacterImage("actor/" + picName, picNum)
//   $gamePlayer.refresh()
// }

function SH_ChangeCharaChip() {
  var actorId = 1
  var equipId = $gameActors.actor(actorId)._equips[1] ? $gameActors.actor(actorId)._equips[1]._itemId : 0 //装備している時Id代入
  var equipIdHead = $gameActors.actor(actorId)._equips[2] ? $gameActors.actor(actorId)._equips[2]._itemId : 0 //装備している時Id代入
  var equipLeg = $gameActors.actor(actorId)._equips[3] ? $gameActors.actor(actorId)._equips[3]._itemId : 0 //装備している時Id代入
  var picName = equipId >= 1 && $dataArmors[equipId].meta["charaChip"] ? $dataArmors[equipId].meta.charaChip : "actor_0001"//ファイル名前半（現状固定）

  var picNum = equipId >= 1 && $dataArmors[equipId].meta["ChipNum"] ? Number($dataArmors[equipId].meta.ChipNum) : 1//ファイル名後半
  picNum = ('0000' + picNum).slice(-4);//ファイル名後半ゼロ埋め
  var picName2 = "_" + picNum//アンダーバーを付けて結合




  //髪型により番号決定
  var graphicNum = equipIdHead >= 1 && $dataArmors[equipIdHead].meta["Chiphair"] ? $dataArmors[equipIdHead].meta.Chiphair : 0//頭装備から髪型を取得
  //ここに下着状態の差分
  var picName3 = ""
  if (equipId == 0 && equipLeg == 22) {//裸かつガーター装備
    picName3 = "_b"
  }

  //ベール系の装備が反映される衣装
  var Veil = equipId >= 1 && $dataArmors[equipId].meta["Veil"] ? Number($dataArmors[equipId].meta.Veil) : 0
  if (equipIdHead == Veil) graphicNum = 4//ベール装備中かつ組み合わせと適合した場合4強制

  $gameActors.actor(actorId).setCharacterImage("actor/" + picName + picName2 + picName3, graphicNum)
  $gamePlayer.refresh()
}


Window_StatusBase.prototype.drawActorIcons = function (actor, x, y, width) {
  //width = width || 144;
  width = width || 344;
  const iconWidth = ImageManager.iconWidth - 10;
  const icons = actor.allIcons().slice(0, Math.floor(width / iconWidth));
  let iconX = x;
  for (const icon of icons) {
    this.drawIcon(icon, iconX, y + 2);
    iconX += iconWidth;
  }
};






function SH_skillBook(actorId, lastItem) {
  var shopId = 0
  var itemId = lastItem
  var classid = $gameActors.actor(actorId)._classId//クラスid
  var skillId = Number($dataItems[itemId].meta.skillBook) || 1//ブックに記載されたスキル
  var skillType = $dataClasses[classid].meta["skillType"] ? $dataClasses[classid].meta.skillType : null//アクターのクラス
  var classType = $dataItems[itemId].meta["skillClass"] ? $dataItems[itemId].meta.skillClass : null//取得可能なクラス

  var classSkill = false
  if (classType) classSkill = SH_classSkill(classType, [1000, 1100], actorId)

  if (!$gameActors.actor(actorId).hasSkill(skillId)) {//スキルを覚えていない
    if (skillType && classType.indexOf(skillType) >= 1 || classSkill) {//取得可能クラスであるか、クラススキルを持っている時
      shopId = skillId
      $gameSwitches.setValue(53, true)//習得可能フラグ
    } else {
      $TM.show("\\n[\\v[9]] cannot acquire skill.")
      shopId = 0
    }
  } else {
    $TM.show("\\n[\\v[9]] has already acquired that skill.")
    shopId = 0
  }
  return shopId
}

function SH_classSkill(classType, array, actorId) {//特定のアクターが特定のMetaタグを持っているか。持っていればその時点でOK
  var min = array ? array[0] : 1
  var max = array ? array[1] : item.length
  var hasFlag = false
  for (var i = min; i < max; i++) {
    if ($gameActors.actor(actorId).hasSkill(i) && classType.indexOf($dataSkills[i].meta.classSkill) >= 1) hasFlag = true;
    //所持しているスキルのclassSkillTagの中に、スキルブックのclassTypeの中身が存在する場合
    if (hasFlag) break;
  }
  //console.log(classType,hasFlag)
  return hasFlag
}

Scene_MenuBase.prototype.mainAreaTop = function () {//タッチUIエリアは無視して返す
  if (!this.isBottomHelpMode()) {
    return this.helpAreaBottom();
  }
  return 0;
  // } else if (this.isBottomButtonMode()) {
  //     return 0;
  // } else {
  //     return this.buttonAreaBottom();
  // }
};

Scene_MenuBase.prototype.mainAreaHeight = function () {//メイン領域の高さ。タッチUIエリアは無視する。
  return Graphics.boxHeight - this.helpAreaHeight();
  //return Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight();
}

function SH_CallHelp() {
  var args = { type: 2, category: "HELP", listIndex: 0 }
  $gameParty.clearGlossaryIndex();
  $gameParty.setSelectedGlossaryType(args.type);
  if (args[1]) {
    var index = $gameParty.setGlossaryCategoryIndexByName(args.category);
    if (index >= 0) {
      $gameParty.setGlossaryListIndex(args.listIndex || 0);
    }
  }
  //console.log(args)
  SceneManager.push(Scene_Glossary);
}

function SH_AddEstrus() {
  $gameActors.actor(1).addState(57)
}

//敵経験値の処理
Game_Enemy.prototype.exp = function () {
  var lv = this.enemy().meta.enemyLv ? Number(this.enemy().meta.enemyLv) : 1
  var result = lv * 2
  if (this.enemy().meta.strong && $gameSwitches.value(922)) { result = lv * 3 }//強敵
  if (this.enemy().meta.boss && $gameSwitches.value(922)) { result = lv * 4 }//ボス
  return Math.round(result);
};




function SH_raceStateId(race) {
  let raceStateId = 351
  if (race == "Spirit") raceStateId = 357
  if (race == "Demon") raceStateId = 351
  if (race == "Human") raceStateId = 352
  if (race == "Animal") raceStateId = 353
  if (race == "Magic Creature") raceStateId = 354
  if (race == "Undead") raceStateId = 355
  if (race == "Ghost") raceStateId = 356
  if (race == "Spirit") raceStateId = 357
  if (race == "Plant") raceStateId = 358
  if (race == "Slime") raceStateId = 359
  if (race == "Insect") raceStateId = 360
  if (race == "Crustacean") raceStateId = 361
  if (race == "Rastian") raceStateId = 362
  if (race == "Fish") raceStateId = 363
  if (race == "Unknown") raceStateId = 364
  if (race == "Dragon") raceStateId = 371
  return raceStateId
}

function SH_TextIconReplace(text) {//特定の単語の前に自動でアイコンを付与
  for (let i = 1; i < 20; i++) {
    if (text.match($dataStates[i].name)) {
      text = text.replace($dataStates[i].name, "\\i[" + $dataStates[i].iconIndex + "]" + $dataStates[i].name)
    }
  }
  return text
}


function SH_FileCheck(filePath) {//特定の単語の前に自動でアイコンを付与
  const fs = require('fs');
  const path = filePath;
  if (fs.existsSync(path)) {
    //console.log( path + " は存在します。");
    return true
  } else {
    console.error(path + " は存在しません。");
    return false
  }

}

function SH_NewLocation(flagId, name) {//特定の単語の前に自動でアイコンを付与
  if (!$gameSwitches.value(flagId)) {
    $gameSwitches.setValue(flagId, true)
    var icon = `\\i[${190}]`
    var locName = `\\c[6]` + name
    var message = "\\c[0] appeared on the map."
    var args = { seid: "LOCATION", volume: 'default', pitch: 100, pan: 0 }
    PluginManager.callCommand(Game_Interpreter.prototype, 'SH_PlaySEMZ', 'PlaySE', args);
    $TM.show(icon + locName + message)
  }

}

function SH_NeedItemArray(Num) {
  var i = Num//現在の配列番号
  var need = $gameVariables.value(14)[i]//配列内配列の取得
  var itemId = need[0]//各要素の取得
  var itemNum = need[1]
  var itemType = need[2]
  var fontColor = 0
  //種別
  var data = $dataItems
  if (itemType == 1) data = $dataWeapons
  if (itemType == 2) data = $dataArmors

  //文字列
  if (itemType != 99) {
    var itemName = data[itemId].name
    var itemIcon = data[itemId].iconIndex
  } else {
    var itemName = '\\G'
    var itemIcon = 314
  }


  //所持数
  if (itemType != 99) {
    var hasNum = $gameParty.numItems(data[itemId])
    if (itemNum > hasNum) {
      $gameSwitches.setValue(65, false);
      fontColor = 8
    }

    itemList = 621 + i
    $gameVariables._data[itemList] = `\\c[${fontColor}]\\i[${itemIcon}]` + itemName + `* ${itemNum} (所持数:${hasNum})`
    return
  } else {
    var hasNum = $gameParty.gold()
    if (itemNum > hasNum) {
      $gameSwitches.setValue(65, false);
      fontColor = 8
    }
    itemList = 621 + i
    $gameVariables._data[itemList] = `\\c[${fontColor}]\\i[${itemIcon}]` + `${itemNum} \\G (所持金:${hasNum}　\\G)`
    return

  }
}

function SH_TakeItemArray(Num) {
  var i = Num//現在の配列番号
  var need = $gameVariables.value(14)[i]//配列内配列の取得
  //console.log($gameVariables.value(14))
  var itemId = need[0]//各要素の取得
  var itemNum = need[1]
  var itemType = need[2]
  //種別
  var data = $dataItems
  if (itemType == 1) data = $dataWeapons
  if (itemType == 2) data = $dataArmors

  //文字列
  if (itemType != 99) {
    $gameParty.loseItem(data[itemId], itemNum)
  } else {
    $gameParty.gainGold(-itemNum)
  }

  return
}


function SH_Region(evId) {//現在リージョンIDを返す
  if (!evId) evId = -1//空欄の場合プレイヤー
  if (evId == -1) {
    var pointX = $gameMap._interpreter.character(evId).x;
    var pointY = $gameMap._interpreter.character(evId).y;
  }
  if (evId >= 0) {
    var pointX = $gameMap.events()[evId].x;
    var pointY = $gameMap.events()[evId].y;
  }
  regionId = $gameMap.regionId(pointX, pointY)
  return regionId
}





function SH_DspPic(args) {
  var PicName = args.picname
  var PicType = args.pictype
  var PicNumBase = 70
  //console.log(PicName)

  //タイプによりピクチャ番号変更
  if (PicType == "EVENT" || PicType == "EROEVENT" || PicType == "ANIME") {
    // PicNumBase = 70
    // $gameScreen.showPicture(PicNumBase,"CGBackground",0,0,0,100,100,255,0)
    // $gameScreen.showPicture(PicNumBase + 1,PicName,0,0,0,100,100,255,0)
    // $gameScreen.showPicture(PicNumBase + 2,"Krach_frame",0,0,0,100,100,255,0)
    if (PicType == "ANIME" && !$gameSwitches.value(2007)) return
    PicNumBase = 70
    var point = 0;//左上
    var scaleX = 80
    var scaleY = 80
    picX = 100
    //var picX = (Graphics.width - (1024 * 0.8)) / 2
    var picY = 0

    //アニメーションかつスイッチなしの場合処理終了
    $gameScreen.showPicture(PicNumBase, "CGBackground", point, picX, picY, scaleX, scaleY, 255, 0)
    $gameScreen.showPicture(PicNumBase + 1, PicName, point, picX, picY, scaleX, scaleY, 255, 0)
    $gameScreen.showPicture(PicNumBase + 2, "Krach_frame", point, picX, picY, scaleX, scaleY, 255, 0)
  } else if (PicType == "EVENT_MINI") {
    PicNumBase = 70
    var point = 0;//左上
    var scaleX = 50
    var scaleY = 50
    var transparency = 180
    picX = 150
    //var picX = (Graphics.width - (1024 * 0.8)) / 2
    var picY = 150

    $gameScreen.showPicture(PicNumBase, "CGBackground", point, picX, picY, scaleX, scaleY, transparency, 0)
    $gameScreen.showPicture(PicNumBase + 1, PicName, point, picX, picY, scaleX, scaleY, transparency, 0)
    $gameScreen.showPicture(PicNumBase + 2, "Krach_frame", point, picX, picY, scaleX, scaleY, 255, 0)
  } else if (PicType == "MAPPIC") {
    PicNumBase = 91
    var point = 0;//左上
    var scaleX = 25
    var scaleY = 25
    var transparency = 180
    picX = 150
    //var picX = (Graphics.width - (1024 * 0.8)) / 2
    var picY = 150
    $gameScreen.showPicture(PicNumBase, "CGBackground", point, picX, picY, scaleX, scaleY, transparency, 0)
    $gameScreen.showPicture(PicNumBase + 1, PicName, point, picX, picY, scaleX, scaleY, transparency, 0)
    $gameScreen.showPicture(PicNumBase + 2, "Krach_frame", point, picX, picY, scaleX, scaleY, 255, 0)
  } else if (PicType == "CUTIN") {
    PicNumBase = 80
    var point = 0;//左上
    var picX = 400
    var picY = 140
    $gameScreen.showPicture(PicNumBase, "CUT/cut_back_01", point, picX, picY, 100, 100, 255, 0)
    $gameScreen.showPicture(PicNumBase + 1, PicName, point, picX, picY, 100, 100, 255, 0)
    $gameScreen.showPicture(PicNumBase + 2, "CUT/cut_frame", point, picX, picY, 100, 100, 255, 0)
  }
}

function SH_DspMapPic(args) {
  var playerX = $gameMap._interpreter.character(-1).x
  var playerY = $gameMap._interpreter.character(-1).y

  var eventId = $gameMap.eventIdXy(playerX, playerY - 1)
  if (eventId && eventId != 0 && !$gameMap.isEventRunning()) {
    if ($gameMap.event(eventId).event().meta.eroCommon) {
      var commonId = Number($gameMap.event(eventId).event().meta.eroCommon);
      //var stage = Number($gameMap.event(eventId).event().meta.erostage)
      var eventX = $gameMap.event(eventId).event().x
      var eventY = $gameMap.event(eventId).event().y
      var stage = $gameMap.regionId(eventX, eventY) - 90
      //console.log(stage)
      var sceneFlag = commonId + 1600 + stage;
      var commonMemo = SH_getMemo(commonId)
      var picname = commonMemo.CG ? commonMemo.CG : 0
      if (picname && picname != 0 && $gameSwitches.value(sceneFlag)) {
        var args = new Object();
        args.picname = "EVENT/" + picname + "_0001"
        args.pictype = "MAPPIC"
        if (!$gameScreen.picture(94) || $gameScreen.picture(94).name() != args.picname) SH_DspPic(args)
      }
    } else {
      //海草イベントではないためピクチャ消去
      var erace = { pictype: "MAPPIC" }
      SH_EracePic(erace)
    }
  } else {
    //イベントないためピクチャ消去
    var erace = { pictype: "MAPPIC" }
    SH_EracePic(erace)
  }
}

function SH_EracePic(args) {

  var PicType = args.pictype
  var PicNumBase = 70
  //タイプによりピクチャ番号変更
  if (PicType == "EVENT" || PicType == "EROEVENT") {
    PicNumBase = 70
    $gameScreen.erasePicture(PicNumBase)
    $gameScreen.erasePicture(PicNumBase + 1)
    $gameScreen.erasePicture(PicNumBase + 2)
  } else if (PicType == "MAPPIC") {
    PicNumBase = 91
    $gameScreen.erasePicture(PicNumBase)
    $gameScreen.erasePicture(PicNumBase + 1)
    $gameScreen.erasePicture(PicNumBase + 2)
  } else if (PicType == "CUTIN") {
    PicNumBase = 80
    $gameScreen.erasePicture(PicNumBase)
    $gameScreen.erasePicture(PicNumBase + 1)
    $gameScreen.erasePicture(PicNumBase + 2)
  }
}



function SH_DspMapPic2(args) {
  var playerX = $gameMap._interpreter.character(-1).x//プレイヤー座標
  var playerY = $gameMap._interpreter.character(-1).y
  var eventId = $gameMap.eventIdXy(playerX, playerY - 1)//プレイヤーの頭上のイベントID
  if (eventId && eventId != 0 && !$gameMap.isEventRunning()) {//頭上にイベントがあり、かつイベント中でない
    if ($gameMap.event(eventId).event().meta.eroCommon) {//頭上イベントのメタタグに<eroCommon:n>が設定されている
      var commonId = Number($gameMap.event(eventId).event().meta.eroCommon);//<eroCommon:n>
      //var stage = Number($gameMap.event(eventId).event().meta.erostage)//<erostage:n>エロの段階
      var eventX = $gameMap.event(eventId)._x
      var eventY = $gameMap.event(eventId)._y
      var stage = $gameMap.regionId(eventX, eventY) - 90
      //console.log( stage)

      var sceneFlag = commonId + 1600 + stage;//シーン回想スイッチ判定用
      if ($gameSwitches.value(2000)) sceneFlag = 2000//全解放オンの場合2000で判定
      var commonMemo = SH_getMemo(commonId) //コモンに設定されているメモの取得
      var picname = commonMemo.CG ? commonMemo.CG : 0//CGファイル名
      if (stage == 2 && commonMemo.CG2) { picname = commonMemo.CG2 }
      if (stage == 3 && commonMemo.CG3) { picname = commonMemo.CG3 }
      if (stage == 4 && commonMemo.CG4) { picname = commonMemo.CG4 }
      var title = commonMemo.title ? commonMemo.title : null//シーンタイトル
      var picX = commonMemo.CGX ? commonMemo.CGX : 0//CG座標補正

      //if(commonMemo.standEro)picname = "States_body01"立ち絵イベント用のなにか処理作る

      if (title && $gameSwitches.value(sceneFlag)) {
        $gameVariables._data[790] = title

        $gameSwitches.setValue(2003, true)
      }
      if (picname && picname != 0 && $gameSwitches.value(sceneFlag)) {//CGファイル名が存在し、かつ回想フラグがオン
        var args = new Object();
        args.picname = "EVENT/" + picname
        args.pictype = "MAPPIC"
        args.picX = picX
        if (!SceneManager._scene.mapPic || SceneManager._scene.mapPic._bitmap._url != args.picname) {//スプライト非表示or表示されているファイル名が指定と異なる場合
          SH_EracePic2(); SH_DspMapPicPath(args);
        }
      }
    } else {
      //回想イベントではないためピクチャ消去
      $gameSwitches.setValue(2002, false)
      $gameSwitches.setValue(2003, false)
      SH_EracePic2()
    }
  } else {
    //頭上にイベントないためピクチャ消去
    $gameSwitches.setValue(2002, false)
    $gameSwitches.setValue(2003, false)
    SH_EracePic2()
  }
}

function SH_DspMapPicPath(args) {//実際の表示処理
  var file = args.picname
  var texture = ImageManager.loadPicture(file);
  var sprite = new Sprite(texture);
  SceneManager._scene._spriteset._tilemap.addChild(sprite); sprite.x = 0; sprite.y = 0; sprite.z = 7; sprite.opacity = 200;
  sprite.scale.x = 1;
  sprite.scale.y = 1;
  //setFrame (x, y, width, height)
  sprite.setFrame(368 + args.picX, 0, 400, 768)
  SceneManager._scene.mapPic = sprite
}


function SH_EracePic2() {
  if (SceneManager._scene.mapPic) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset._tilemap.removeChild(SceneManager._scene.mapPic)
    SceneManager._scene.mapPic = null;//シーン名変更
  }
}




function SH_getEventImage(id) {
  var data = $gameMap.event(id)
  var chipImage = data._characterName
  var chipIndex = data._characterIndex
  $gameVariables._data[360] = [chipImage, chipIndex]
  // if(data._templateEvent){
  //   // page = 
  //   // data = data._templateEvent.pages[page].image
  //   // var chipImage = data.characterName
  //   // var chipIndex = data.characterIndex
  // }else{
  //   var chipImage = data._characterName
  //   var chipIndex = data._characterIndex
  //   console.log(data)
  //   $gameVariables._data[360] = [chipImage,chipIndex]
  // }

}

function SH_setEventImage(evId) {//指定イベントのチップ変更
  if ($gameVariables.value(360) != 0) {
    var chipImage = $gameVariables.value(360)[0]
    var chipIndex = $gameVariables.value(360)[1]
    $gameMap.event(evId).setImage(chipImage, chipIndex)
  }
}

function SH_Inyoku(needLv, sign) {//淫欲分岐の簡易化
  var inyokuLV = $gameVariables.value(204)
  var successFlag = false
  if (sign == "higher" || sign == 1) {
    if (inyokuLV >= needLv) successFlag = true
  } else if (sign == "lower" || sign == 2) {
    if (inyokuLV <= needLv) successFlag = true
  } else if (sign == "equal" || sign == 0 || !sign) {//イコール。省略可能
    if (inyokuLV == needLv) successFlag = true
  } else {//signに間違った文字列が入っている
    console.error("変数signの入力ミス:" + sign)
  }
  return successFlag
}


function SH_OpenSelection(array) {//選択肢の解放条件
  var array = $gameVariables.value(815)
  var max = array.length;
  var actor = 1
  var switchNum = 881
  for (var i = 0; i < max; i++) {
    //console.log(i)
    $gameSwitches.setValue(switchNum + i, false);
    var commonMemo = SH_getMemo(array[i])
    var condHp = commonMemo.LoseHP ? Number(commonMemo.LoseHP) : 0
    var condMp = commonMemo.LoseMP ? Number(commonMemo.LoseMP) : 0
    var needLustLv = commonMemo.needLustLv ? Number(commonMemo.needLustLv) : null
    var bool = true
    //スイッチ条件。,区切っていくつでも指定可能
    var SwitchArr = commonMemo.openSwitch ? commonMemo.openSwitch : null

    var varArr = []//変数条件
    varArr[0] = commonMemo.openVar1 ? commonMemo.openVar1 : null//変数条件。[番号,数値,記号]
    varArr[1] = commonMemo.openVar2 ? commonMemo.openVar2 : null//変数条件。[番号,数値,記号]
    varArr[2] = commonMemo.openVar3 ? commonMemo.openVar3 : null//変数条件。[番号,数値,記号]

    var needItemArr = []//アイテム条件
    needItemArr[0] = commonMemo.needItem ? commonMemo.needItem : null
    needItemArr[1] = commonMemo.needItem2 ? commonMemo.needItem2 : null
    needItemArr[2] = commonMemo.needItem3 ? commonMemo.needItem3 : null
    needItemArr[3] = commonMemo.needItem4 ? commonMemo.needItem4 : null

    var needSkillArr = []//スキル条件
    needSkillArr[0] = commonMemo.needSkill ? commonMemo.needSkill : null
    needSkillArr[1] = commonMemo.needSkill2 ? commonMemo.needSkill2 : null

    if ($gameActors.actor(1).hp < condHp || $gameActors.actor(1).hp == 1 && condHp >= 1) bool = false;//HP不足
    if ($gameActors.actor(1).mp < condMp) bool = false;//SP不足
    if (needLustLv) {//淫欲レベルが必要に満たない時
      if ($gameVariables.value(204) < needLustLv) bool = false;
    }

    if (SwitchArr) {//条件スイッチを配列で
      //SwitchArr = SwitchArr.split(',');
      SwitchArr = (String(SwitchArr)).split(',');
      let result = SwitchArr.every(function (val) {
        return $gameSwitches.value(val) == true;
      });
      //console.log(SwitchArr,result)
      if (!result) bool = false;
    }

    for (let i = 0; i < varArr.length; i++) {
      if (varArr[i]) {
        data = varArr[i].split(',');
        if (data[2] == 0 || !data[2]) result = $gameVariables.value(data[0]) == data[1] ? true : false
        if (data[2] == 1) result = $gameVariables.value(data[0]) >= data[1] ? true : false
        if (data[2] == 2) result = $gameVariables.value(data[0]) <= data[1] ? true : false
        if (!result) bool = false;
      }
    }

    for (let i = 0; i < needItemArr.length; i++) {
      if (needItemArr[i]) {
        itemArr = needItemArr[i].split(',');
        result = $gameParty.numItems($dataItems[itemArr[0]]) >= itemArr[1] ? true : false
        if (!result) bool = false;
      }
    }
    for (let i = 0; i < needSkillArr.length; i++) {
      if (needSkillArr[i]) {
        var skillId = needSkillArr[i];
        result = $gameParty.members()[0].hasSkill(skillId) ? true : false
        if (!result) bool = false;
      }
    }

    if (bool == true) $gameSwitches.setValue(switchNum + i, true)
  }

}

//NPC制御--------------------------------------------------------------
function SH_eventFilter(tag, type) {
  var array = $gameMap.events().filter(function (item, index) {
    if (item) {
      var gameEvent = $gameMap.event(item._eventId).event() ? $gameMap.event(item._eventId).event() : null
      if (gameEvent) {
        if (!tag) var regexp = /people|actor|akunin/i;//タグがない場合キャラ全部
        if (tag && type == "picName") var regexp = new RegExp(tag);//キャラチップ名タグ
        if (regexp.test(item._characterName)) return true;
        if (tag && type == "meta" && gameEvent.meta.pattern == tag && item._characterName != "") return true;
      }
    }
  });
  return array
}

function SH_MobLooking(tag, type, dataLoad) {//マップ内のキャラを主人公の方に向かせる
  if (!Scene_Map) return;
  var evId = 0
  var charaArray = SH_eventFilter(tag, type)
  for (var num = 0; num <= charaArray.length - 1; ++num) {
    evId = charaArray[num]._eventId
    var data = dataLoad ? dataLoad : $gameMap._interpreter.character(evId)
    //console.log(data)
    if (data) {
      data.forceMoveRoute({
        "list": [{ "code": 25 }],
        "repeat": false,
        "skippable": true
      })
    }
  }
}

function SH_MobRoute(tag, type, code, parameters) {//マップ内のキャラに移動ルートのコードで特定の行動をさせる
  if (!Scene_Map) return;
  var evId = 0
  var charaArray = SH_eventFilter(tag, type)
  for (var num = 0; num <= charaArray.length - 1; ++num) {
    evId = charaArray[num]._eventId
    var data = $gameMap._interpreter.character(evId)
    if (parameters) {
      data.forceMoveRoute({
        "list": [{ "code": code, "parameters": parameters }],
        "repeat": false,
        "skippable": true
      })
    } else {
      data.forceMoveRoute({
        "list": [{ "code": code }],
        "repeat": false,
        "skippable": true
      })
    }


  }
}

function SH_eventDistance(tag, type, distanceBase) {//特定のタグを持つイベントとの距離を測定しidかえす
  if (!Scene_Map) return;
  var evId = 0
  var charaArray = SH_eventFilter(tag, type)

  for (var num = 0; num <= charaArray.length - 1; ++num) {
    evId = charaArray[num]._eventId
    var data = $gameMap._interpreter.character(evId)
    playerPoint = { x: $gamePlayer.x, y: $gamePlayer.y }
    eventPoint = { x: data.x, y: data.y }
    var distance = Math.sqrt(Math.pow(eventPoint.x - playerPoint.x, 2) + Math.pow(eventPoint.y - playerPoint.y, 2));
    if (distance <= distanceBase) {
      var array = evId
      return array
    }
  }

}

function SH_ArroundNpc(tag, type) {//マップ内のキャラ数を調べる。過信は禁物
  if (!Scene_Map) return 0;
  var charaArray = SH_eventFilter(tag, type)
  return charaArray.length ? charaArray.length : 0
}






function SH_CheckItems(type, name) {//無名のアイテムをチェックする
  var data = $dataItems//データベース
  var hasItem = $gameParty._items//所持アイテム
  var checkString = name ? name : ""
  if (type == "weapon") {
    data = $dataWeapons
    hasItem = $gameParty._weapons
  } else if (type == "armor") {
    data = $dataArmors
    hasItem = $gameParty._armors
  }
  var array = data.filter(function (item, index) {
    if (item && hasItem[item.id] && item.name == checkString) return true;
  });

  for (var i = 0; i <= array.length - 1; ++i) {//フィルタリングしたアイテムをあれこれする処理
    $gameParty.loseItem(data[array[i].id], 999)
  }
  //console.log(array)//取得した一覧
}


function SH_ReturnTalk(talkType) {//TypeごとのTalkをランダムで返す
  var data = $dataUniques.randomExtra//json読む
  var randomTalk = data.filter(function (item, index) {
    if (item["Type"] == talkType) return true;
  })
  var talk = randomTalk[Math.floor(Math.random() * randomTalk.length)]
  return talk["TalkJp"]
}

function SH_SetTalkPoint(type) {//Typeごとの座標のTalkをランダムで返す
  var size = {}
  var playerArround = true
  if (!type) type = "map"
  if (type == "map") {
    size = { pointX: 100, pointY: 100, rangeX: 800, rangeY: 600 }
    playerArround = true
  }
  if (type == "event") {
    size = { pointX: 100, pointY: 100, rangeX: 924, rangeY: 600 }
    playerArround = false
  }
  if (type == "semen") {
    size = { pointX: 300, pointY: 200, rangeX: 550, rangeY: 400 }
    playerArround = false
  }
  if (type == "stand") {
    size = { pointX: 750, pointY: 300, rangeX: 400, rangeY: 400 }
    playerArround = false
  }
  if (type == "standCenter") {
    size = { pointX: 450, pointY: 300, rangeX: 450, rangeY: 400 }
    playerArround = false
  }
  $gameVariables._data[481] = size.pointX
  $gameVariables._data[482] = size.pointY
  $gameVariables._data[483] = size.rangeX
  $gameVariables._data[484] = size.rangeY
  //console.log(size,$gameVariables.value(481))
  $gameSwitches.setValue(238, playerArround)
}

function SH_RandomSwitch(talk, number) {//シンプルに2分の1でスイッチをほオンオフ
  var random = Math.floor(Math.random() * 2 + 1)
  var flag = random == 1 ? true : false
  $gameSwitches.setValue(number, flag)
  if (flag) {
    //talk = talk.replace('ー', '｜')
    talk = talk.replace(/ー/g, '｜')
    console.log(talk)
  };
  return talk
}


function SH_ReverseSwitch(number) {//シンプルにスイッチ反転
  var flag = true
  if ($gameSwitches.value(number)) { flag = false }
  $gameSwitches.setValue(number, flag)
  //console.log(flag) 
}

function SH_MoveDirectin(id, d) {//指定idのイベントから見て特定の方向が移動可能か
  var pointX = $gameMap._interpreter.character(id).x; var pointY = $gameMap._interpreter.character(id).y;
  //console.log($gamePlayer.canPass(pointX, pointY,d))
  if ($gamePlayer.canPass(pointX, pointY, d)) return true
}

function SH_Time(d, time) {//イベント解放条件管理
  var nowTime = $gameVariables.value(31)
  if (time == "night") time = 3
  if (time == "morning") time = 0
  if (time == "afternoon") time = 1
  if (time == "evening") time = 2
  if (time == "midnight") time = 4
  //console.log(nowTime,d,time)

  if (d == "==" || d == "===" || d == "=") {//等しい
    if (nowTime == time) return true;
  }
  if (d == ">=") {//基準時以上
    if (nowTime >= time) return true;
  }

  if (d == "<=") {//基準時以下
    if (nowTime <= time) return true;
  }

  if (d == ">") {//基準時超過
    if (nowTime > time) return true;
  }

  if (d == "<") {//基準時未満
    if (nowTime < time) return true;
  }

  if (d == "!=") {//基準時以外
    if (nowTime != time) return true;
  }

  return false

}

function SH_SimplePer(per) {//シンプルに確率抽選
  var min = 1
  var max = 100
  var random = Math.floor(Math.random() * (max - min) + min);
  if (per >= random) return true
}

function SH_FootStep() {//シンプルに確率抽選
  if (!Scene_Map) return
  var stepsVar = 326
  //console.log($gameParty.steps(),$gameVariables.value(stepsVar))
  if ($gameParty.steps() != $gameVariables.value(stepsVar)) {
    //鳴らす
    var seName = $dataMap.meta.footStep ? $dataMap.meta.footStep : "walkStone"
    //console.log(seName)
    var args = { seid: seName, volume: 'default', pitch: 100, pan: 0 }
    PluginManager.callCommand(Game_Interpreter.prototype, 'SH_PlaySEMZ', 'PlaySE', args);
    $gameVariables._data[stepsVar] = $gameParty.steps()
  }
}

(function () {//バトルメッセージとばす。オーバーライド
  BattleManager.startBattle = function () {
    this._phase = 'start';
    $gameSystem.onBattleStart();
    $gameParty.onBattleStart(this._preemptive);
    $gameTroop.onBattleStart(this._surprise);
    //this.displayStartMessages();
  };
})();


// function SH_Troops(race,lv){//条件にあった敵グループをランダムで呼ぶ
//   var data = $dataTroops
//   var randomTroops = data
//   if(race){
//     randomTroops = data.filter(function(item, index,lvRange) {
//       if (item && item.meta["race"] && item.meta["race"] == race)return true;
//     })
//   }
//   if(lv){
//     randomTroops = randomTroops.filter(function(item, index) {
//       if(!item || !item.meta["lv"])return false;
//       if(item.meta["lv"] == lv)return true; 
//       //if(lvRange)       
//     })
//   }
//   //ユニーク、ボスをはじく
//   console.log(randomTroops)
//   var troop = randomTroops.length ? randomTroops[Math.floor(Math.random()*randomTroops.length)] : $dataTroops[4]//バグ精霊
//   console.log(troop.id,troop.name)
//   //return talk["TalkJp"]
// }

function SH_TroopsTag(tag, lv, lvRangeHigher, lvRangeLower) {//条件にあった敵グループをランダムで呼ぶ
  var data = $dataTroops
  var randomTroops = data
  //console.log(tag,lv,lvRangeHigher,lvRangeLower)
  var lvMax = lvRangeHigher ? lv + lvRangeHigher : lv
  var lvMin = lvRangeLower && lv - lvRangeLower >= 1 ? lv - lvRangeLower : lv
  if (tag) {
    tag = tag.split(',');
    randomTroops = data.filter(function (item, index) {
      if (!item || !item.meta["tag"]) return false;
      for (var i = 0; i < tag.length; i++) {
        if (item.meta["tag"].indexOf(tag[i]) >= 0) return true;
      }
    })
  }
  if (lv) {
    randomTroops = randomTroops.filter(function (item, index) {
      if (!item || !item.meta["lv"]) return false;
      if (item.meta["lv"] >= lvMin && item.meta["lv"] <= lvMax) return true;
      //if(lvRange)       
    })
  }
  //レアエネミーいるかチェック
  var random = Math.floor(Math.random() * (100 - 1) + 1);//乱数作っておく
  var rareEnemy = randomTroops.filter(function (item, index) {
    if (!item) return false;
    if (item.meta["rare"]) return true;
  })
  if (rareEnemy.length && random >= 95) {//レアエネミーいる場合
    randomTroops = rareEnemy//確率5%でレアエネミーテーブルに
  }
  console.log(randomTroops)
  var troop = randomTroops.length ? randomTroops[Math.floor(Math.random() * randomTroops.length)] : $dataTroops[4]//バグ精霊
  //console.log(troop.id,troop.name)
  return troop.id
}//コモン1480








function SH_DanceClothCheck() {//脱衣スキルの解放をチェック。コモン1251
  var actorId = 1
  var mood = $gameVariables.value(259)
  var clothType = $gameVariables.value(550)//0:踊り子,1:バニー,2:シスター
  var testFlag = $gameTemp.isPlaytest() ? true : false

  var state = {
    bra: 166,
    under: 167,
    all: 169
  }
  var openState = {
    bra: 176,
    under: 177
  }
  var braFlag = $gameActors.actor(1).isStateAffected(openState.bra) ? true : false//上脱衣ステートがあるか否か
  var underFlag = $gameActors.actor(1).isStateAffected(openState.under) ? true : false//下脱衣ステートがあるか否か

  if (mood >= 50 && SH_Inyoku(1, 1)) {
    if (clothType == 0) $gameActors.actor(actorId).removeState(state.bra)
  }

  if (mood >= 80 && SH_Inyoku(2, 1)) {
    if (clothType == 0) $gameActors.actor(actorId).removeState(state.under)
    if (clothType >= 1) $gameActors.actor(actorId).removeState(state.all)

  }

  //封印
  if (braFlag) { $gameActors.actor(actorId).addState(state.bra) }//上脱衣済の時スキル封印
  if (underFlag) { $gameActors.actor(actorId).addState(state.under) }//下脱衣済の時スキル封印
  if (braFlag || underFlag) { $gameActors.actor(actorId).addState(state.all) }//どちらか脱衣済の時全脱衣スキル封印


}



function SH_EventTrigger(evId) {//ポップアップトリガーや出現フラグが複雑なキャラ用。
  var charaId = evId
  var switchflag = SH_SwitchFlagName()
  var valueFlag = SH_ValueFlagName()


  if (charaId == 29) {//領主
    //最初の職人依頼、完了済み&未報告
    if ($gameSwitches.value(switchflag.craftsman1RemindEnd) && !$gameSwitches.value(switchflag.craftsman1EndResult)) return true
    //最初の依頼をクリアし、なおかつ領主評価(\v[137]が2以上の場合次の任務)
    if ($gameVariables.value(valueFlag.ghostLv) >= 2 && $gameSwitches.value(switchflag.craftsman2Flag) && !$gameSwitches.value(switchflag.craftsman2Start)) return true
    //ナーメス職人依頼報告、完了済み&未報告
    if ($gameSwitches.value(switchflag.craftsmanNarmes) && !$gameSwitches.value(switchflag.craftsman2EndResult)) return true
    //2つ目の依頼をクリアし、なおかつ領主評価(\v[137]が3以上、かつ日陰通りオープンの場合次の任務)
    if ($gameVariables.value(valueFlag.ghostLv) >= 3 && $gameSwitches.value(switchflag.openHikage) && $gameSwitches.value(switchflag.craftsman3Flag) && !$gameSwitches.value(switchflag.craftsman3Start)) return true
    //最後の依頼、トリガーがオンになっている時
    if ($gameSwitches.value(switchflag.craftsmanMaven) && !$gameSwitches.value(switchflag.craftsman3EndResult)) return true
  }
  if (charaId == 18) {//シキミ
    //薬草採取開放
    if (!$gameSwitches.value(538)) return true
    //聖油クエストでまだシキミと会話していない
    if ($gameSwitches.value(1313) && !$gameSwitches.value(1319)) return true
    //まだ聖油を作っていない
    if ($gameSwitches.value(1319) && !$gameSwitches.value(1314)) return true
    //黒紋病についてパルムに聞いた後
    if ($gameSwitches.value(479) && !$gameSwitches.value(472)) return true
  }
  if (charaId == 18) {//ルシード
    //娼婦未登録
    if ($gameSwitches.value(541) && $gameSwitches.value(542) && !$gameSwitches.value(543)) return true
    //ロッジの場所未特定
    if ($gameSwitches.value(670) && !$gameSwitches.value(680)) return true
  }
  if (charaId == 34) {//スヤー
    //魔法習得フラグ
    if ($gameSwitches.value(636) && !$gameSwitches.value(637)) return true
    //クライアのアトリエ出現していない
    if ($gameSwitches.value(470) && $gameSwitches.value(472) && !$gameSwitches.value(464)) return true
    //お守り入手していない
    if ($gameSwitches.value(470) && $gameSwitches.value(473) && !$gameSwitches.value(475)) return true
    //モモコ借りる
    if ($gameSwitches.value(680) && !$gameSwitches.value(692)) return true
    if ($gameSwitches.value(692) && !$gameSwitches.value(692)) return true
  }
  if (charaId == 35) {//ルナ古王通り
    //夜はいない
    if ($gameVariables.value(31) >= 3) return true
    //領主に呼ばれる
    if ($gameSwitches.value(1231) && $gameVariables.value(137) >= 2 && !$gameSwitches.value(1232)) return true
    //攫われたアリン後&話しかける前
    if ($gameSwitches.value(1450) && !$gameSwitches.value(673)) return true
  }
  return false
}


function SH_eventOpen() {
  var trial = $gameSwitches.value(8) ? true : false
  var day = $gameVariables.value(26)
  var time = $gameVariables.value(31)
  var skills = $gameActors.actor(1).skills()
  var hasLicense = $gameParty.hasItem($dataItems[808]) ? true : false
  var switchflag = SH_SwitchFlagName()
  var valueFlag = SH_ValueFlagName()

  if ($gameSwitches.value(switchflag.gameStart)) {//ゲームスタート後
    //無条件開放
    $gameVariables._data[valueFlag.barEv].open = 'true'//酒場
    $gameVariables._data[valueFlag.hospitalEv].open = 'true'//治療院
    $gameVariables._data[valueFlag.ZibeltaEv].open = 'true'//配達
    $gameVariables._data[valueFlag.tailorEv].open = 'true'//仕立て屋
    $gameVariables._data[valueFlag.porko].open = 'true'//ぶた
    $gameSwitches.setValue(switchflag.souko, true)//倉庫

    //???
    //悪霊退治
    $gameVariables._data[671].open = 'true'
    //街道の悪霊//カエデ
    $gameVariables._data[646].open = 'true'

    //回想開放
    $gameSwitches.setValue(switchflag.kaisou, true)//できればイベント

    //信徒生成。テンプレートイベントモブ生成
    $gameSwitches._data[switchflag.createChurchMob] = SH_Time("<", "night") && $gameSwitches.value(switchflag.openChurch) ? true : false;
    //探索者資格ゲット
    $gameSwitches._data[switchflag.licenseFlag] = $gameVariables.value(valueFlag.advSuccess) >= 3 ? true : false

    //ルナ悪霊退治難易度開放
    $gameVariables._data[valueFlag.ghostDiff] = $gameVariables.value(valueFlag.ghostLv) >= 1 ? 2 : 1

    if (trial) return;//!!!!!体験版!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //ルナ悪霊退治難易度開放 領主評価2以上
    if ($gameVariables.value(valueFlag.ghostLv) >= 2) $gameVariables._data[valueFlag.ghostDiff] = 3

    //グラントと謎の遺跡
    if ($gameVariables.value(valueFlag.grunt) >= 7 && SH_Inyoku(1, 1)) $gameSwitches._data[switchflag.gruntSex] = true

    //無条件開放
    $gameVariables._data[valueFlag.cleaningEv].open = 'true'//邸宅の掃除
    $gameVariables._data[valueFlag.ashikokiEv].open = 'true'//あしこき

    //富豪　掃除イベント後
    if ($gameSwitches.value(switchflag.earthStone)) $gameVariables._data[valueFlag.fugouEv].open = 'true'

    //魔法実験　ある程度スヤーと話す？
    $gameVariables._data[valueFlag.useMagicEv].open = 'true'

    //返済後の教会イベント
    if ($gameSwitches.value(switchflag.debtClear)) $gameSwitches._data[switchflag.afterDebt] = true


    //メインストーリー・魔物増加の原因、8日以降&探索者資格&探索成功回数5以上(またはデアシール踏破階層3Fにする？)
    $gameSwitches._data[switchflag.mainMamono] = hasLicense && day >= 8 && $gameVariables.value(valueFlag.advSuccess) >= 5 ? true : false

    //メインストーリー・日陰通り開通(openHikage)
    //if(day >= 7)$gameSwitches._data[switchflag.openHikage] = true ウィゼとの会話をフラグにした

    //メインストーリー・マルスタ開通(南街道)
    //7日目以降、受けられる？富豪に届け物
    if (day >= 7) $gameSwitches._data[switchflag.malstaOpen] = true

    //メインストーリー騎士の動向の調査　特別依頼3つクリア後
    if (day >= 14 && $gameSwitches.value(switchflag.criminalKnight) && $gameVariables.value(valueFlag.researchDay) >= 3) $gameSwitches._data[switchflag.edoPoppoOpen] = true

    //職人依頼段階1完了$gameSwitches.value(switchflag.craftsmanTanzo)タンゾーはいったん除外
    if ($gameSwitches.value(switchflag.craftsmanKaede) && $gameSwitches.value(switchflag.craftsmanCloro)) {
      $gameSwitches._data[switchflag.craftsman1End] = true
      if (!$gameSwitches.value(switchflag.craftsman1RemindEnd)) $gameSwitches._data[switchflag.craftsman1Remind] = true
    }

    //聖油発生フラグ　領主評価&依頼1報告済み&依頼2未発生
    if ($gameVariables.value(valueFlag.ghostLv) >= 2 && $gameSwitches.value(switchflag.craftsman1EndResult) && !$gameSwitches.value(switchflag.craftsman2Start)) {
      $gameSwitches._data[switchflag.craftsman2Flag] = true

    }

    //聖油完了
    if ($gameSwitches.value(switchflag.craftsmanNarmes)) {
      $gameSwitches._data[switchflag.craftsman2End] = true
    }

    //悪霊発生フラグ　領主評価&依頼1報告済み&依頼3未発生
    if ($gameSwitches.value(switchflag.openHikage) && $gameVariables.value(valueFlag.ghostLv) >= 3 && $gameSwitches.value(switchflag.craftsman2EndResult) && !$gameSwitches.value(switchflag.craftsman3Start)) {
      $gameSwitches._data[switchflag.craftsman3Flag] = true
    }
    //悪霊完了
    if ($gameSwitches.value(switchflag.craftsmanMaven)) {
      $gameSwitches._data[switchflag.craftsman3End] = true
    }


    //マルスタ397
    //盗掘者396
    //ビーチ388
    //間道392
    //メインストーリーに係わる占い屋
    //紋章通りか日陰通りに設置

    //起床イベント　コモン1008と連携

    if (day >= 10 && time == 0) $gameSwitches._data[switchflag.kokumonOpen] = true

    //スヤー魔法
    if ($gameSwitches.value(switchflag.NasiaBed)) $gameSwitches._data[switchflag.SuyaMagic] = true

    //最終クエスト　アリンと三つのクエスト
    if ($gameSwitches.value(switchflag.arinEnd) && $gameSwitches.value(switchflag.NasiaBed) && $gameSwitches.value(switchflag.craftsman3EndResult) && $gameSwitches.value(switchflag.edoPoppoEnd)) {
      $gameSwitches._data[switchflag.lastQuest] = true
    }

    //スキルフラグ
    if ($gameVariables.value(valueFlag.danceLv) >= 2) $gameSwitches.setValue(switchflag.danceScout, true)//踊り子スカウト開放
    if ($gameVariables.value(valueFlag.holyLv) >= 2) $gameSwitches.setValue(switchflag.churchZange, true)//懺悔室開放
    if ($gameVariables.value(valueFlag.holyLv) >= 2) {
      $gameSwitches.setValue(switchflag.ghost, true)//懺悔室開放
      $gameVariables._data[valueFlag.ghostEv].open = 'true'
    }


  }//ゲームスタートここまで
}



function SH_SwitchFlagName() {
  var obj = {
    test: $gameTemp.isPlaytest() ? true : false,
    gameStart: 1220,
    danceScout: 1290,
    churchZange: 643,
    souko: 525,//倉庫
    ghost: 510,
    cleaning: 1392,//邸宅掃除初後
    debtClear: 1240,//返済フラグ
    afterDebt: 1242,//返済後イベント
    kaisou: 1421,//回想への入り口
    openChurch: 1425,
    createChurchMob: 1426,
    licenseFlag: 1430,//探索者資格
    mainMamono: 1431,//魔物増加調査
    openHikage: 544,//日陰通り開放
    SuyaMagic: 636,//スヤー魔法
    kokumonOpen: 462,//黒紋イベント可能
    NasiaBed: 476,//院長治療
    malstaOpen: 1388,
    criminalKnight: 488,//マントから犯人が騎士であることを突き止める
    edoPoppoOpen: 487,//特別依頼最終イベント発生
    edoPoppoEnd: 486,//特別依頼最終イベント発生
    earthStone: 1412,//地霊晶石
    craftsmanTanzo: 1325,//職人依頼・鉄
    craftsmanKaede: 1306,//職人依頼・カエデ
    craftsmanCloro: 1336,//職人依頼・クロロ
    craftsman1End: 1239,//職人1
    craftsman1EndResult: 1245,
    craftsman1Remind: 1407,//依頼完遂テロップ
    craftsman1RemindEnd: 1408,//依頼完遂テロップ出したか
    craftsman2Flag: 1447,//職人2発生フラグ
    craftsman2Start: 1246,//職人2開始
    craftsmanNarmes: 1316,//聖油おわり
    craftsman2End: 1238,//職人2
    craftsman2EndResult: 1247,
    craftsmanMaven: 1359,//メイブン打倒
    craftsman3Start: 1248,
    craftsman3Flag: 1448,//職人3発生フラグ
    craftsman3End: 1249,//職人3終わり
    craftsman3EndResult: 1236,//職人3終わり
    arinEnd: 624,
    lastQuest: 1450,
    gruntSex: 1273,//グラント遺跡イベ
  }
  return obj
}


function SH_ValueFlagName() {
  var obj = {
    danceLv: 139,
    holyLv: 132,
    ghostLv: 137,//領主評価
    barEv: 690,//酒場手伝い
    hospitalEv: 665,//治療院
    ZibeltaEv: 668,//配達
    tailorEv: 693,//仕立て屋
    cleaningEv: 685,//邸宅の掃除
    useMagicEv: 691,//魔法実験
    ghostEv: 644,//悪霊退治
    ashikokiEv: 687,//あしこき
    porko: 683,//ぶたさん
    fugouEv: 697,//富豪
    wize: 698,//ウィゼの依頼
    researchDay: 536,//特別依頼からの日数
    grunt: 254,
    advSuccess: 253,//遺跡探索回数
    ghostDiff: 516,//悪霊退治の開放度

  }

  return obj
}


function SH_SearchArray(array, searchId) {//配列内のid要素を検索
  var items = array.filter(function (item, index) {
    if (!item) return false;
    if (item.id == searchId) return true;
  })
  //console.log(items.length)
  return items.length >= 1 ? items : null
}

function SH_SearchArrayMeta(array, metaTag) {//配列内のメタタグを検索
  var items = array.filter(function (item, index) {
    if (!item || !item.meta) return false;
    if (item.meta[metaTag]) return true;
  })
  //console.log(items.length)
  return items.length >= 1 ? items : null
}


function SH_DreamFlag() {//配列内のid要素を検索
  var trial = $gameSwitches.value(8) ? true : false
  if (trial) return null
  var oldDream = $gameVariables.value(281)//見た昔の夢
  var dreamFlag = 0
  var day = $gameVariables.value(26)
  var dreamProbability = 50//夢を見る確率
  var items = $gameParty.items()
  var skills = $gameActors.actor(1).skills()
  var dreamArray = []
  var returnDream = null
  var random = Math.floor(Math.random() * 100) + 1
  var lustExp = $gameVariables.value(205)
  var lustLv1 = 111
  var lustLv2 = 112

  //夢配列追加
  if (day >= 4) dreamFlag += 1
  if (day >= 8 && oldDream >= 1) dreamFlag += 1
  if (day >= 12 && oldDream >= 2) dreamFlag += 1
  if (day >= 16 && oldDream >= 3) dreamFlag += 1
  if (oldDream < dreamFlag) {
    dreamArray.push("oldDream" + dreamFlag)
    dreamProbability = 100
  }

  if (!$gameSwitches.value(lustLv1) && lustExp >= 100) { dreamArray.push("lust1"); dreamProbability = 100 }
  if (!$gameSwitches.value(lustLv2) && lustExp >= 300) { dreamArray.push("lust2"); dreamProbability = 100 }
  //ラスティウムの鍵　淫夢と贄
  if ($dataMap.meta["church"] && SH_SearchArray(skills, 240) && SH_SearchArray(skills, 244) && !SH_SearchArray(items, 807)) dreamArray.push("lustium")//呼び声
  if (SH_SearchArray(items, 845)) dreamArray.push("shark")//サメ
  if (SH_SearchArrayMeta(skills, "nightmare")) dreamArray.push("nightmare")//淫夢の契約紋
  //配列からランダムで返し、確率で夢を見る。ただし昔の夢、。淫欲は優先
  //console.log(dreamArray)
  if (dreamArray.length >= 1 && random <= dreamProbability) {//夢配列が存在しランダム抽選成功
    var result = dreamArray.filter(function (item, index) {
      if (!item) return false;
      if (item.indexOf("lust1") != -1) return true;
      if (item.indexOf("lust2") != -1) return true;
      if (item.indexOf("oldDream") != -1) return true;
      if (item.indexOf("lustium") != -1) return true; //優先イベント
    })
    //console.log(result)
    if (result.length >= 1) {//優先イベントが存在する場合
      returnDream = result[0]//resultで見つかった配列番号の夢を代入
    } else {
      returnDream = SH_randomArray(dreamArray)
    }

  }

  return returnDream ? returnDream : null
}

function SH_MapTag(tag, tagName) {
  //エフェクトタグ、イベントタグ、BGMタグなどなど分けるといいかも
  if (!Scene_Map || !$dataMap.meta) return false
  var tagArray = tagName ? $dataMap.meta[tagName] : $dataMap.meta
  if (tagName) {
    tagArray = tagArray.split(',');
    var result = tagArray.filter(function (item, index) {
      for (var i = 0; i < tagArray.length; i++) {
        if (item.indexOf(tag[i]) >= 0) return true;
      }
    })
  } else {
    if (tagArray[tag]) result = [tag]
  }


  //console.log(result)
  return result.length >= 1 ? true : false
}


function SH_RandomEventFilter(tileTag, locTag) {
  var data = $dataCommonEvents
  var result = data.filter(function (item, index) {
    if (!item || item.id <= 1325) return false
    var commonMemo = SH_getMemo(item.id)//ベースコモンのメモ取得
    if (!commonMemo || !commonMemo.sugorokuEv || !commonMemo.tag) return false

    //タグ内の要素を検索
    let searchTileTag = tileTag.split(',');;
    let searchLocTag = locTag.split(',');;
    let commonTileTag = commonMemo.tileTag.split(',');
    let commonLocTag = commonMemo.tag.split(',');
    let evFlag = true;
    //console.log(searchTag,commonTag)
    for (let i = 0; i < searchTileTag.length; i++) {
      if (!commonTileTag.includes(searchTileTag[i])) {
        evFlag = false;
        break;
      }
    }
    for (let i = 0; i < searchLocTag.length; i++) {
      if (!commonLocTag.includes(searchLocTag[i]) && !commonLocTag.includes("anywhere")) {
        evFlag = false;
        break;
      }
    }

    return evFlag;

  })
  //console.log(result)
  var randomEv = result.length ? result[Math.floor(Math.random() * result.length)] : null
  //console.log(randomEv.id)
  return randomEv ? randomEv.id : 1552

}
function SH_CampMapIdXY(data) {
  $gameVariables._data[366] = 0
  var campVar = data.meta && data.meta["camp"] ? Number(data.meta.camp) : null
  if (campVar && $gameVariables.value(campVar) != 0) {
    $gameVariables._data[366] = $gameVariables.value(campVar).id
    $gameVariables._data[367] = $gameVariables.value(campVar).x
    $gameVariables._data[368] = $gameVariables.value(campVar).y
    $gameVariables._data[369] = $gameVariables.value(campVar).d

  }
}

function SH_CampMapSave(mapVar, direction) {
  $gameVariables._data[mapVar] = {
    id: $gameMap.mapId(),
    x: $gamePlayer.x,
    y: $gamePlayer.y,
    d: direction
  }
}

function SH_ActorSkill(tagOrId, type, arrayFlag) {//特定のスキルID、またはタグを持つスキルを所持するアクターをランダム抽出
  var gameParty = $gameParty.members()
  if (!type) type = "id"
  var result = gameParty.filter(function (actor, index) {
    for (var i = 0; i < gameParty.length; i++) {
      if (type == "id" && $gameActors.actor(item._actorId).hasSkill(tagOrId)) return true;
      if (type == "tag") {
        var skills = actor._skills
        var result2 = skills.filter(function (skillId, index) {//タグの有無を検索
          for (var i = 0; i < skills.length; i++) {
            var skill = $dataSkills[skillId]
            if (!skill && !skill.meta) return false;
            if (skill.meta[tagOrId]) return true;
          }
        })
        if (result2 >= 1) return true;
      }


    }
  })
  //console.log(result)
  var random = result.length ? result[Math.floor(Math.random() * result.length)] : null
  if (!arrayFlag) return random ? random._actorId : null
  if (arrayFlag) return result
}


function SH_OpenedTreasureBox(varId) {
  array = {
    id: $gameMap.mapId(),
    x: $gamePlayer.x,
    y: $gamePlayer.y,
  }
  $gameVariables._data[varId].push(array)


}

function SH_OpenedTreasureBoxCheck(varId) {
  list = $gameVariables.value(varId)
  if (list == 0) return false
  var result = list.filter(function (box, index) {
    for (var i = 0; i < list.length; i++) {
      if (box.id == $gameMap.mapId() && box.x == $gamePlayer.x && box.y == $gamePlayer.y) return true
    }
  })
  //console.log(result)
  return result.length >= 1 ? true : false

}





function SH_EraceSprite(name) {
  if (SceneManager._scene[name]) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset._tilemap.removeChild(SceneManager._scene[name])
    SceneManager._scene[name] = null;//シーン名変更
  }
}

function SH_TrimingPicture(sprite, numX, numY) {//sprite.setFrame(x, y , width, height);

  var width = sprite.width / 12
  var height = sprite.height / 8
  var x = (width * numX) - width
  var y = (height * numY) - height
  sprite.setFrame(x, y, width, height)

  return sprite
}


function SH_PushArray(name, varId) {
  if (!Array.isArray($gameVariables.value(varId))) $gameVariables._data[varId] = []
  $gameVariables._data[varId].push(name)
}

function SH_ReturnRandomArray(varId) {
  //console.log($gameVariables.value(varId))
  var list = $gameVariables.value(varId)
  var name = list.length ? list[Math.floor(Math.random() * list.length)] : 0
  $gameVariables._data[varId] = 0//リセット
  //console.log(name)
  return name

}

function SH_Pregnancy(name, flag, add) {
  var pregnancyVar = 196//妊娠中の子供の父親情報を格納する変数番号。妊娠判定にも使う
  var childRace = 188//種族
  if ($gameSwitches.value(8) || $gameSwitches.value(9)) return//体験版/回想
  if (flag == "monster" && !$gameActors.actor(1).hasSkill(244)) return//魔物の場合基本は妊娠しない、贄の紋様必要
  if ($gameVariables.value(pregnancyVar) != 0) return//妊娠配列に既に入っている場合
  if ($gameActors.actor(1).isStateAffected(59) || $gameActors.actor(1).hasArmor($dataArmors[193])) {//避妊ステートの時
    //何らかの処理？
    return
  }
  // 確率で妊娠
  var pregnancyBase = 10//基礎確率
  var pregnancyPer = add ? pregnancyBase + add : pregnancyBase

  if ($gameActors.actor(1).hasArmor($dataArmors[199])) {//しるべ
    pregnancyPer += 100
  }
  if ($gameActors.actor(1).isStateAffected(58)) {//排卵ステートの時
    pregnancyPer += 30
  }
  if ($gameActors.actor(1).isStateAffected(155)) {//種付けおじさんの時
    pregnancyPer += 20
  }
  if ($gameActors.actor(1).isStateAffected(99)) {//妊娠加護の時
    pregnancyPer += 20
  }
  var random = Math.floor(Math.random() * 100) + 1
  if (random <= pregnancyPer) {
    $gameVariables._data[childRace] = flag ? flag : "human"
    $gameVariables._data[pregnancyVar] = name

  }
}

function SH_Childbirth(type, name, sex, loc) {//出産or堕胎,name,sexは外部から
  var childArrayVar = 198//子供情報を格納する配列の変数番号
  var childRace = 188//種族
  var childNumVar = 199//子供の数を格納する変数番号
  var pregnancyVar = 196//妊娠中の子供の父親情報を格納する変数番号。妊娠判定にも使う
  var childbirthVar = 237
  var childLimit = 20//子供情報保存限界

  if ($gameVariables.value(childArrayVar) == 0) $gameVariables._data[childArrayVar] = []//0かつ配列化していない場合配列化

  if ($gameSwitches.value(8) || $gameVariables.value(pregnancyVar) == 0) return//体験版または妊娠情報がない
  if (type == "abortion") {//堕胎した
    SH_ResetPregnancy()
    return
  }
  if ($gameVariables.value(childNumVar) >= childLimit) {//子供限界数オーバーの時
    SH_ResetPregnancy()
    $gameVariables._data[childbirthVar] += 1
    return
  }


  //子供配列追加
  var childArray = {
    name: name,
    father: $gameVariables.value(pregnancyVar),
    sex: sex,
    locFlag: loc,
    race: $gameVariables.value(childRace),
  }
  $gameVariables._data[childArrayVar].push(childArray)//子供情報を追加
  $gameVariables._data[childNumVar] = $gameVariables.value(childArrayVar).length//子供の数反映
  $gameVariables._data[childbirthVar] += 1
  SH_ResetPregnancy()
}

function SH_ResetPregnancy() {//妊娠関係リセット
  var pregnancyFlag = 197//
  var childRace = 188//
  var pregnancyVar = 196//妊娠中の子供の父親情報を格納する変数番号。妊娠判定にも使う
  $gameVariables._data[pregnancyVar] = 0//妊娠情報リセット
  $gameVariables._data[pregnancyFlag] = 0//妊娠フラグリセット
  $gameVariables._data[childRace] = 0//妊娠フラグリセット
}

function SH_ChildInfo(num) {//子供情報呼び出し
  var childArrayVar = 198//子供情報を格納する配列の変数番号
  var childArray = $gameVariables.value(childArrayVar)
  if (childArray == 0 || childArray.length == 0 || num >= 21 || num <= -1) return null

  var childObj = childArray[num]
  return childObj
}

function SH_ChildInfoLoc(loc) {//場所別の子供情報呼び出し
  var childArrayVar = 198//子供情報を格納する配列の変数番号
  var childArray = $gameVariables.value(childArrayVar)
  if (childArray == 0 || childArray.length == 0) return null

  var result = childArray.filter(function (item, index) {
    for (var i = 0; i < childArray.length; i++) {
      if (item && item.locFlag == loc) return true
    }
  })
  return result
}

function SH_ChildAltLoc(loc, altLoc) {//子供の場所を変える
  if ($gameVariables.value(198) == 0) return
  //var array = SH_ChildInfoLoc(loc)//場所の子供を配列で読み込む
  var array = $gameVariables.value(198)
  console.log(array)
  for (var i = 0; i <= array.length; i++) {//配列の子供の場所のみ書き換え
    if (!$gameVariables._data[198][i] || !$gameVariables._data[198][i].locFlag) continue;//安全装置
    console.log(i)
    $gameVariables._data[198][i].locFlag = altLoc
  }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SH_CM_EroSkillFilter(item) {//カスタムメニュー作成プラグイン用
  // if(item.meta['eroskill'] && $gameActors.actor(1).hasSkill(item.id)){
  if (item.meta['eroskill']) {
    if (!item.meta['VirginSkill'] && !item.meta['secretSkill']) return true;
    if (item.meta['VirginSkill'] && $gameActors.actor(1).hasSkill(item.id)) return true;
    if (item.meta['secretSkill'] && $gameActors.actor(1).hasSkill(item.id)) return true;
  }
  return false;
}

function SH_CM_EroSkillDisplay(item) {//カスタムメニュー作成プラグイン用
  if ($gameActors.actor(1).hasSkill(item.id)) {
    return item
  } else {
    return $dataSkills[802]
  }
}

function SH_CM_EroSkillSelect(item) {//カスタムメニュー作成プラグイン用
  if ($gameActors.actor(1).hasSkill(item.id)) {
    ; // 名前にvalueを含む){
    return true;
  } else {
    return false;
  }
}


function SH_CM_EroMarkGet() {//契約紋取得画面用。体験版や個別取得用に除外
  var trial = $gameSwitches.value(8) ? true : false
  var result = $dataSkills.filter(function (data, index) {//タグの有無を検索
    if (!data || data.meta["secretMark"] || !data.meta["eromark"]) return false
    if (data.meta["hideSwitch"] && $gameSwitches.value(Number(data.meta["hideSwitch"]))) return false//恥辱用。特定のスイッチで隠す
    if (trial && !data.meta["trial"]) return false
    return true
  })
  return result
}


function SH_CM_EroMarkFilter(item) {//カスタムメニュー作成プラグイン用
  if (item) {
    var preSkill = SH_PreSkill(1, item.id);
    if (preSkill || $gameActors.actor(1).hasSkill(item.id)) return true
  }
  return false;
}

function SH_CM_EroMarkSelect(item) {//カスタムメニュー作成プラグイン用
  var preSkill = SH_PreSkill(1, item.id);
  if (preSkill && !$gameActors.actor(1).hasSkill(item.id)) {
    ; // 名前にvalueを含む){
    return true;
  } else {
    return false;
  }
}

function SH_PreSkill(actorId, skillId) {//契約紋の前提を満たしているかどうか
  var preSkill = $dataSkills[skillId].meta["preSkill"] ? Number($dataSkills[skillId].meta.preSkill) : null;//前提スキル
  var holy = $dataSkills[skillId].meta["holy"] ? Number($dataSkills[skillId].meta.holy) : 0;
  var lustLv = $dataSkills[skillId].meta["needLust"] ? Number($dataSkills[skillId].meta.needLust) : 0;
  var openSwitch = $dataSkills[skillId].meta["openSwitch"] ? Number($dataSkills[skillId].meta.openSwitch) : null;
  var openVar = $dataSkills[skillId].meta["openVar"] ? Number($dataSkills[skillId].meta.openVar) : 0;
  var open = true
  var lustLvNow = $gameVariables.value(204)
  var holyNow = $gameVariables.value(130)

  //スイッチフラグ
  if (openSwitch && !$gameSwitches.value(openSwitch)) return false

  //前提契約紋
  if (preSkill) {//前提スキルあり
    if ($gameActors.actor(actorId).hasSkill(preSkill) && holyNow <= holy && lustLvNow >= lustLv) {
      return true
    } else {
      return false
    }
  } else {//前提スキルなし
    if (holyNow <= holy && lustLvNow >= lustLv) {
      return true
    } else {
      return false
    }

  }
}


function SH_CM_DrawStandMenu(data) {//カスタムメニュー作成プラグイン用
  // console.log(data)
  // data.drawPicture($gameVariables.value(806), 80,-60); // 指定したメモ欄のピクチャを描画

  var r = {
    x: 800,
    y: 0,
    opacity: 255,
    blendMode: 0,
    visible: true
  }

  var name1 = "eroStand"
  var filePath = ImageManager.loadPicture($gameVariables.value(806));
  SH_CM_DrawStandPic(name1, filePath, r)

  var name2 = "eroMark"
  var filePath = ImageManager.loadPicture(`States_body_inmon`);
  var mark = SH_SkillFilter(1, "eromark")
  r.blendMode = 2
  r.opacity = SH_InmonOpacity()
  if (!mark) r.visible = false
  SH_CM_DrawStandPic(name2, filePath, r)

}

function SH_InmonOpacity() {
  var mark = SH_SkillFilter(1, "eromark")
  var opacity = mark.length ? 15 * mark.length : 0
  if (opacity > 255) opacity = 255
  return opacity
}


function SH_SkillFilter(actorId, tag) {
  var skills = $gameActors.actor(actorId)._skills
  var result = skills.filter(function (skillId, index) {//タグの有無を検索
    for (var i = 0; i < skills.length; i++) {
      var skill = $dataSkills[skillId]
      if (!skill && !skill.meta) return false;
      if (skill.meta[tag]) return true;
    }
  })
  return result
}


function SH_CM_DrawStandPic(name, filePath, r) {//カスタムメニュー作成プラグイン用
  if (SceneManager._scene[name]) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene.removeChild(SceneManager._scene[name])
    SceneManager._scene[name] = null;//シーン名変更
  }
  var sprite = new Sprite(filePath);
  SceneManager._scene.addChild(sprite);
  sprite.x = r.x; sprite.y = r.y; sprite.opacity = r.opacity; sprite.blendMode = r.blendMode;
  SceneManager._scene[name] = sprite
}


/////////////////////////////////////////////////////////////////////////////////////////////////

function SH_LegChange(actorId, itemId) {
  var Slot = LegSlotNum()
  sh_equipchangearmor(actorId, Slot, itemId)
}

function sh_equipchangearmor(actorId, slotid, itemid) {
  $gameActors.actor(actorId).changeEquip(slotid, $dataArmors[itemid]);
  if (actorId == 1) $gameSwitches.setValue(93, true)//キャラチップ変更確認
}

function SH_GenerateNpc(genNum, limit, now) {
  var generate = genNum//生成数
  var commuLimit = limit//1日の接触数上限
  var commuNow = now
  var oddGenerate = commuLimit - commuNow//残りの生成可能数
  if (generate > oddGenerate) generate = oddGenerate
  return generate


}

function SH_AddNoResetVar(noResetTag, varId) {
  //スキル
  var varArray = $gameVariables.value(varId)
  if (varArray == 0) varArray = []

  if (noResetTag == "custom") {
    varArray = SH_PushVarId(varArray, 981, 990)//カスタムキャラ作成フラグを残す
  }

  if (noResetTag == "point") {
    varArray = SH_PushVarId(varArray, 212, 212)//契約ポイント
  }

  if (noResetTag == "child") {
    varArray = SH_PushVarId(varArray, 198, 199)//子供の情報
  }
  if (noResetTag == "virgin") {
    varArray = SH_PushVarId(varArray, 200, 203)//貞操
    varArray = SH_PushVarId(varArray, 291, 293)//経験
    varArray = SH_PushVarId(varArray, 153, 153)//相手
  }
  if (noResetTag == "sex") {
    varArray = SH_PushVarId(varArray, 204, 211)//性経験
    varArray = SH_PushVarId(varArray, 213, 228)//性経験
    varArray = SH_PushVarId(varArray, 231, 247)//性経験
    varArray = SH_PushVarId(varArray, 250, 250)//性経験
  }

  //各経験
  if (noResetTag == "exp") {
    varArray = SH_PushVarId(varArray, 161, 180)//スキル経験を除外
    varArray = SH_PushVarId(varArray, 229, 230)//経験たべもの
    varArray = SH_PushVarId(varArray, 256, 257)//経験たべもの
    varArray = SH_PushVarId(varArray, 297, 297)//経験のみもの
    varArray = SH_PushVarId(varArray, 529, 529)//経験治療
    varArray = SH_PushVarId(varArray, 509, 509)//経験治療
  }

  $gameVariables._data[varId] = varArray
  //console.log(varArray)
}

function SH_ResetGame(resetTag) {
  //スキル
  var child = resetTag && resetTag.includes("child") ? true : false
  var notVirgin = resetTag && resetTag.includes("virgin") ? true : false
  var sexExp = resetTag && resetTag.includes("sexExp") ? true : false
  let varArray = []//ここに除外する変数番号を入れる
  let switchArray = []

  //確定項目-------------------------------------
  switchArray = [30, 69, 70, 71, 72, 73, 80, 95, 905, 925]//オプション項目などを除外、また2000-は回想
  //周回数・戦闘難易度
  varArray = SH_PushVarId(varArray, 44, 44)
  varArray = SH_PushVarId(varArray, 85, 85)
  //確定項目-------------------------------------

  switchArray = SH_PushVarId(switchArray, 981, 990)//カスタムキャラ作成フラグを残す

  //カスタムキャラ
  varArray = SH_PushVarId(varArray, 161, 180)//スキル経験を除外

  //経験
  varArray = SH_PushVarId(varArray, 256, 257)//経験たべもの
  varArray = SH_PushVarId(varArray, 297, 297)//経験のみもの
  varArray = SH_PushVarId(varArray, 529, 529)//経験治療
  varArray = SH_PushVarId(varArray, 509, 509)//経験治療


  if (child) varArray = SH_PushVarId(varArray, 198, 199)//子供の情報

  if (notVirgin) varArray = SH_PushVarId(varArray, 200, 203)//貞操
  if (notVirgin) varArray = SH_PushVarId(varArray, 291, 293)//経験

  if (sexExp) varArray = SH_PushVarId(varArray, 204, 247)//性経験
  if (sexExp) varArray = SH_PushVarId(varArray, 250, 250)//性経験
  //console.log(varArray)
  SH_ResetVar(varArray, 1, 3500)
  SH_ResetSwitch(switchArray, 1, 2000)


}

function SH_ResetVar(array, num, stopNum) {
  for (var i = num; i <= stopNum; i++) {//配列の子供の場所のみ書き換え
    if (array.includes(i)) {
      //console.log(i,$gameVariables.value(i),"含まれる")
      continue;
    }//配列に含まれる場合除外
    $gameVariables._data[i] = 0
  }
}

function SH_ResetSwitch(array, num, stopNum) {
  for (var i = num; i <= stopNum; i++) {//配列の子供の場所のみ書き換え
    if (array.includes(i)) {
      continue;
    }//配列に含まれる場合除外
    $gameSwitches.setValue(i, false)
  }
}

function SH_PushVarId(array, num, stopNum) {
  for (var i = num; i <= stopNum; i++) {
    array.push(i)
  }
  return array
}

function SH_RestItem(type, tag) {
  var data = $dataItems
  if (type == "weapon") data = $dataWeapons
  if (type == "armor") data = $dataArmors
  if (type == "skill") data = $dataSkills
  for (var i = 0; i < data.length; i++) {
    if (!data[i] || !data[i].meta) continue
    if (data[i].meta[tag]) {
      if (type != "skill") $gameParty.loseItem(data[i], 9999)
      if (type == "skill") $gameActors.actor(1).forgetSkill(i);
    }
  }

}


function SH_CutSprite(filePath, name, cutFlag, centerFlag) {//探索ピクチャ
  var sprite = new Sprite(filePath);
  var picX = $gameVariables.value(979);
  var picY = $gameVariables.value(980);
  var r = {
    iW: sprite.width,	//　画像の横幅
    iH: sprite.height,	//画像の縦幅
    wW: 500,//カットイン領域
    wH: 382,//カットイン領域
  }
  if ($gameSwitches.value(901)) {
    SceneManager._scene._spriteset._tilemap.addChild(sprite);//すごろく中はタイル表示
  } else {
    SceneManager._scene._spriteset.addChild(sprite);
  }
  sprite.x = picX; sprite.y = picY;
  sprite.z = 7;
  if (centerFlag) sprite = SH_SetCenter(sprite, picX, picY, r)
  if (cutFlag) sprite.setFrame(cutFlag, 0, r.wW, r.wH)
  SceneManager._scene[name] = sprite
}

function SH_EraceCutSprite(eraceArray) {//探索ピクチャ
  for (var i = 0; i < eraceArray.length; i++) {
    var d = eraceArray[i]
    if (SceneManager._scene[d]) {//既に表示がある場合消す処理//シーン名変更
      SceneManager._scene._spriteset.removeChild(SceneManager._scene[d])
      SceneManager._scene._spriteset._tilemap.removeChild(SceneManager._scene[d])
      SceneManager._scene[d] = null;//シーン名変更
    }
  }
}

function SH_SetCenter(sprite, picX, picY, r) {
  var cx = (r.wW - r.iW) / 2
  var cy = r.iH <= r.wH ? (r.wH - r.iH) / 2 : 0
  sprite.x = picX + cx;
  sprite.y = picY + cy;
  sprite.setFrame(0, 0, r.wW, r.wH)
  return sprite
}

function SH_NameNgList(nameId) {
  var actorShip = null
  var array = [
    { name: $gameActors.actor(1).name(), ship: "self" },
    { name: $gameActors.actor(2).name(), ship: "friend" },
    { name: $gameActors.actor(6).name(), ship: "legend" },
    { name: $gameActors.actor(8).name(), ship: "deary" },
    { name: $gameActors.actor(11).name(), ship: "child" },
    { name: $gameActors.actor(12).name(), ship: "child" },
    { name: $gameActors.actor(13).name(), ship: "child" },
    { name: $gameActors.actor(14).name(), ship: "child" },
    { name: $gameActors.actor(15).name(), ship: "child" },
    { name: $gameActors.actor(16).name(), ship: "child" },
    { name: $gameActors.actor(18).name(), ship: "unique" },
    { name: $gameActors.actor(21).name(), ship: "enemy" },
    { name: $gameActors.actor(25).name(), ship: "deary3" },
    { name: $gameActors.actor(31).name(), ship: "unique" },
    { name: $gameActors.actor(32).name(), ship: "unique" },
    { name: $gameActors.actor(34).name(), ship: "friend" },
    { name: $gameActors.actor(35).name(), ship: "legend" },
    { name: $gameActors.actor(40).name(), ship: "legend" },
    { name: "ナーシア", ship: "deary2" },
    { name: "アミノン", ship: "aminon" },
    { name: "アマネ", ship: "heroine" },
    { name: "セレスフォニア", ship: "heroine" },
    { name: "ハヅキ", ship: "heroine" },
    { name: "ナツ", ship: "heroine" },
    { name: "フローデ", ship: "heroine" },
    { name: "サメ", ship: "same" },
  ]
  var fakeName = $gameActors.actor(nameId).name()
  for (var i = 0; i < array.length; i++) {
    var actorName = array[i].name
    if (fakeName == actorName) {
      actorShip = array[i].ship
      break;

    }
  }
  //console.log(fakeName,actorShip)
  return actorShip

}

function SH_CulProstitute(base) {
  var eroTecLv = $gameVariables.value(138)
  var desire = $gameVariables.value(77)

  var addReward = (base * eroTecLv) / 10
  desire = desire * 0.5
  var addDesireReward = (base * desire) / 100

  return Math.round(base + addReward + addDesireReward)
}

function SH_TextProstitute(num1, num2) {
  var textColor = 6
  var resetTextColor = 0
  var icon = 314

  var text = `\\c[${textColor}][\\i[${icon}]Reward: ${num1} \\G (Reward: ${num2} \\G + Lewdness Modifier + Desire Modifier)]\\c[${resetTextColor}]`

  return text
}

function SH_ProfileTextArray(text, num) {
  if ($gameVariables.value(num) == 0) {
    $gameVariables._data[num] = []
  }
  $gameVariables._data[num].push(text)

}

function SH_SetProfileText(num) {
  var result = ""
  var row = 0
  var array = $gameVariables.value(num)
  for (var i = 0; i < array.length; i++) {
    if (array[i]) {
      if (result.length >= 60) break;
      if (result.length >= 30 && row == 0) {
        row += 1
        result += "\n"
      }
      if (result != "") result += " / "
      result += array[i]
    }
  }
  $gameVariables._data[num] = 0
  return result
}


function SH_SwitchNameFlag(tag, flag) {
  var strings = $dataSystem.switches
  for (var i = 1; i < strings.length; i++) {
    switchName = strings[i]
    if (switchName && switchName.includes(tag)) {
      $gameSwitches.setValue(i, flag)
      //console.log(switchName,i)
    }
  }

}



function SH_HentaiH() {
  var bool = false
  var base = 20
  if ($gameSwitches.value(7)) base + 100 //テストプレイ
  if (!SH_Inyoku(2, 1)) return false//淫欲2未満
  var random = Math.floor(Math.random() * 100) + 1
  if (random <= base) {
    bool = true
  }

  return bool
}





function SH_ShopItemFilter(type, tag, tag2) {
  if (type == 'item' || type == 0) { var data = $dataItems; type = 0 }
  if (type == 'weapon' || type == 1) { var data = $dataWeapons; type = 1 }
  if (type == 'armor' || type == 2) { var data = $dataArmors;; type = 2 }

  var result = data.filter(function (item, index) {//タグの有無を検索
    for (var i = 1; i < data.length; i++) {
      if (tag2) {
        if (item && item.meta[tag] && item.meta[tag2]) {
          return true
        } else {
          return false
        }
      }
      if (item && item.meta[tag]) return true
    }
  })
  var goods = []
  for (var i = 0; i < result.length; i++) {
    goods.push([type, result[i].id, 0, 0, true])
  }
  //console.log(goods)
  return goods
}

function SH_ShopSkillFilter(type, tag, actorId) {
  if (type == 'item' || type == 0) { var data = $dataItems; type = 0 }
  if (type == 'weapon' || type == 1) { var data = $dataWeapons; type = 1 }
  if (type == 'armor' || type == 2) { var data = $dataArmors;; type = 2 }

  //console.log(classArray)
  var result = data.filter(function (item, index) {//タグの有無を検索
    for (var i = 1; i < data.length; i++) {
      if (!item || item.meta["noSkillShop"]) return false
      //var skillLv = item && item.meta["learnLV"] ? Number(item.meta["learnLV"]) : 0
      //var actorLv = $gameActors.actor(actorId).level
      //if(skillLv > actorLv)return false
      if (item.meta["all"]) return true
      for (var i2 = 0; i2 < tag.length; i2++) {
        if (item.meta[tag[i2]]) return true
      }
    }
  })
  var goods = []
  for (var i = 0; i < result.length; i++) {
    goods.push([type, result[i].id, 0, 0, true])
  }
  //console.log(goods)
  return goods
}



function SH_SimpleClothType() {
  var actorId = 1
  var actorData = $gameActors.actor(actorId)
  var slot = ClothSlotNum()
  var equip = actorData.equips()[slot] ? actorData.equips()[slot] : null
  var tag = equip ? equip.meta.type : "naked"
  //console.log(tag)
  return tag
}



function SH_HasSkillMember(skillId) {
  var members = $gameParty.members()
  var result = members.filter(function (item, index) {//タグの有無を検索
    for (var i = 0; i < members.length; i++) {
      var actorId = item._actorId
      var actorData = $gameActors.actor(actorId)
      if (actorData.hasSkill(skillId)) return true
    }
  })
  return result

}




function SH_HasSkillEffect(skillId) {
  var members = SH_HasSkillMember(skillId)
  //console.log(members)
  if (!members.length || members.length == 0) return
  var data = $dataSkills[skillId]
  var gainHp = data.meta["gainHp"] ? Number(data.meta["gainHp"]) : 0
  var gainMp = data.meta["gainMp"] ? Number(data.meta["gainMp"]) : 0
  var stateId = data.meta["autoState"] ? Number(data.meta["autoState"]) : null
  var target = data.meta["party"] ? "party" : "self"
  if (target == "party") {
    //対象が全体(ループさせない)
    $gameParty.members().forEach(function (actor) {
      var actorId = actor._actorId
      if ($gameActors.actor(actorId).isStateAffected(1)) return;
      actor.gainHp(gainHp);
      actor.gainMp(gainMp);
      if (stateId) { actor.addState(stateId) };
    });
  } else {
    //対象は所有者のみ
    for (var i = 0; i < members.length; i++) {
      var actorId = members[i]._actorId
      if ($gameActors.actor(actorId).isStateAffected(1)) return;
      $gameActors.actor(actorId).gainHp(gainHp)
      $gameActors.actor(actorId).gainMp(gainMp)
      if (stateId) $gameActors.actor(actorId).addState(stateId)
    }
  }
}

function SH_ClearStateTag(tag) {//特定タグのステートを全解除
  var data = $dataStates
  var result = data.filter(function (item, index) {//タグの有無を検索
    if (item && item.meta[tag]) return true
  })
  //console.log(result)
  for (var i = 0; i < result.length; i++) {
    $gameParty.members().forEach(function (actor) {
      var stateId = result[i].id
      actor.removeState(stateId);
    });
  }

}


function SH_SearchArrayReturn(num, tag) {
  var bool = tag.includes(num)
  return bool
}






function SH_randomTarget() {
  var partySize = $gameParty.size()
  min = 0
  max = partySize - 1
  var actorNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
  //console.log(actorNumber)
  return actorNumber
}

function SH_Exibition() {//着られる衣装の判定
  var clothCan = []
  var ngFlag = false
  var shameLimit = $gameVariables.value(208)//露出耐性
  //if($dataMap.meta["private"] ||$dataMap.meta["debug"])return true//なんでも着られる
  var data = $dataArmors
  var length = 30//防具21番まで

  for (var i = 1; i < length; i++) {
    cloth = $dataArmors[i]
    if (cloth.meta["CLOTHTYPE"] && cloth.meta["shame"] && shameLimit >= Number(cloth.meta.shame)) {
      clothCan.push(cloth.meta.type)
    }
  }
  if ($gameSwitches.value(119)) clothCan.push("naked")
  if ($gameVariables.value(208) >= 100) clothCan.push("naked")
  if ($dataMap.meta["clothBath"]) clothCan.push("bath")
  if ($dataMap.meta["clothSp"]) clothCan.push($dataMap.meta.clothSp)
  if ($dataMap.meta["clothSp2"]) clothCan.push($dataMap.meta.clothSp2)

  //console.log(clothCan)
  return clothCan
}

function SH_ClothFlagReturn(tag) {//指定タグを着ているか
  var bool = false
  var clothType = SH_getClothTag(1)
  if (clothType[3] == tag) bool = true
  return bool
}

function SH_ClothArrayIncludes(varId) {//指定タグを着ているか
  var bool = false
  var clothCan = $gameVariables.value(varId)
  var clothType = SH_getClothTag(1);
  if (clothCan.includes(clothType[3])) bool = true
  return bool
}

function SH_UseSkillBook() {
  if ($gameSwitches.value(901)) {
    $gameSwitches.setValue(903, true)
    return
  }
}

