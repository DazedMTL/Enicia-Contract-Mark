/*:
 * @target MZ
 * @plugindesc スキル実行
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CallEmo
 * @command SkillCheck
 * @text スキル実行条件チェック
 * @desc スキルの実行条件の成否を返します。
 * 
 * @arg skillid
 * @text スキルID変数
 * @desc スキルID変数
 * @default 61
 * @type variable
 * 
 * @arg actorid
 * @text アクターID
 * @desc アクターID
 * @default 1
 * @type number
 *
 * @command SkillCheckCommon
 * @text スキル実行条件チェックコモン
 * @desc スキルの実行条件の成否を返します。
 * 
 * @arg skillid
 * @text コモンID変数
 * @desc コモンID変数
 * @default 61
 * @type variable
 * 
 * @arg actorid
 * @text アクターID
 * @desc アクターID
 * @default 1
 * @type number
 * 
 * @command SkillActivate
 * @text スキル有効化
 * @desc スキルの実行処理をします。
 * 
 * @arg skillid
 * @text スキルID変数
 * @desc スキルID変数
 * @default 61
 * @type variable
 * 
 * @arg actorid
 * @text アクターID
 * @desc アクターID
 * @default 1
 * @type number
 * 
 *  @command SkillActivateItem
 * @text スキル有効化アイテム
 * @desc スキルの実行処理をします。
 * 
 * @arg itemid
 * @text アイテムID変数
 * @desc アイテムID変数
 * @default 61
 * @type variable
 * 
 * @arg actorid
 * @text アクターID
 * @desc アクターID
 * @default 1
 * @type number
 * 
 * @command SkillActivateCommon
 * @text スキル有効化コモン
 * @desc スキルの実行処理をします。
 * 
 * @arg itemid
 * @text コモンID変数
 * @desc コモンID変数
 * @default 61
 * @type variable
 * 
 * @arg actorid
 * @text アクターID
 * @desc アクターID
 * @default 1
 * @type number
 * 
 * @command SkillCommon
 * @text スキルコモン
 * @desc スキルに設定されたコモンの実行
 * 
 * @arg skillid
 * @text スキルID変数
 * @desc スキルID変数
 * @default 61
 * @type variable
 * 
 * 
 * @command MessageLoad
 * @text 相手によるメッセージ変化
 * @desc メッセージを読み込みます。
 * 
 * @arg loadid
 * @text スキルID入力
 * @desc 反応を得るためのスキルIDです。
 * @default 61
 * @type variable
 * 
 * @arg type
 * @text 相手タイプ
 * @desc 相手のタイプです。
 * @type variable
 */


(() => {
  const pluginName = "SH_SkillCheck";
  PluginManager.registerCommand(pluginName, "SkillCheck", function (args) {

    var SkillId = $gameVariables.value(args.skillid)//変数61　スキル番号指定
    var ActorId = args.actorid
    $gameVariables._data[63] = $dataSkills[SkillId].name//実行したコマンド名取得

    var activeskill = $gameVariables.value(61)//実行したスキルID。
    var successarray = $gameVariables.value(72) || [0]//成功スキル配列？コモン91で指定。現状スキルIDになっている
    var normalarray = $gameVariables.value(71) || [0]//通常成功？コモン91で指定。現状スキルIDになっている

    console.log(activeskill, successarray)


    if (successarray.includes(activeskill)) {//includes...特定の要素が配列に含まれるか
      $gameVariables._data[74] = 2//スキル大成功
    } else if (normalarray.includes(activeskill)) {
      $gameVariables._data[74] = 1//スキル成功
    } else {
      $gameVariables._data[74] = 0//スキル失敗
    }





    SkillConditionsHp(SkillId, ActorId)
  });

  PluginManager.registerCommand(pluginName, "SkillCheckCommon", function (args) {

    var SkillId = $gameVariables.value(args.skillid)//変数61　スキル番号指定
    var ActorId = args.actorid
    var commonMemo = SH_getMemo(SkillId)
    $gameVariables._data[63] = commonMemo.name//実行したコマンド名取得

    var activeskill = $gameVariables.value(61)//実行したスキルID。
    var successarray = $gameVariables.value(72) || [0]//成功スキル配列？コモン91で指定。現状スキルIDになっている
    var normalarray = $gameVariables.value(71) || [0]//通常成功？コモン91で指定。現状スキルIDになっている

    //console.log(activeskill,successarray)


    if (successarray.includes(activeskill)) {//includes...特定の要素が配列に含まれるか
      $gameVariables._data[74] = 2//スキル大成功
    } else if (normalarray.includes(activeskill)) {
      $gameVariables._data[74] = 1//スキル成功
    } else {
      $gameVariables._data[74] = 0//スキル失敗
    }





    SkillConditionsHp(SkillId, ActorId)
  });

  PluginManager.registerCommand(pluginName, "SkillActivate", function (args) {

    var SkillId = $gameVariables.value(args.skillid)
    var ActorId = args.actorid
    SkillActive(SkillId, ActorId)
  });

  PluginManager.registerCommand(pluginName, "SkillActivateItem", function (args) {
    var SkillId = $gameVariables.value(args.itemid)
    var ActorId = args.actorid
    SkillActive(SkillId, ActorId, 'item')
  });

  PluginManager.registerCommand(pluginName, "SkillActivateCommon", function (args) {
    var SkillId = $gameVariables.value(args.itemid)
    var ActorId = args.actorid
    SkillActive(SkillId, ActorId, 'common')
  });

  // PluginManager.registerCommand(pluginName, "SkillCommon", function(args){
  //   var SkillId = $gameVariables.value(args.skillid)
  //   if($dataSkills[SkillId].meta.CommonEvent){
  //       var CommonId = SkillId + 100
  //       //this.setupChild($dataCommonEvents[CommonId].list, 0)
  //       this.command117([CommonId]);
  //   }
  // });

  PluginManager.registerCommand(pluginName, "SkillCommon", function (args) {
    var SkillId = $gameVariables.value(args.skillid)
    var CommonId = SkillId
    //this.setupChild($dataCommonEvents[CommonId].list, 0)
    this.command117([CommonId]);
  });

  PluginManager.registerCommand(pluginName, "MessageLoad", function (args) {
    var MessageVarNum = 80
    var LoadID = $gameVariables.value(args.loadid)
    var Type = $gameVariables.value(args.type)
    var index = $dataUniques.skilltalk.ID.indexOf(LoadID);
    var Base = $dataUniques.skilltalk[Type][index]

    var Success = $dataUniques.skilltalk[Type][index + 1]
    var Normal = $dataUniques.skilltalk[Type][index + 2]
    var Failed = $dataUniques.skilltalk[Type][index + 3]
    $gameVariables._data[MessageVarNum] = [Base, Success, Normal, Failed]
    $gameVariables._data[464] = Base
    $gameVariables._data[465] = Success
    $gameVariables._data[466] = Normal
    $gameVariables._data[467] = Failed



  });


  function SkillConditionsHp(SkillId, ActorId) {
    $gameSwitches.setValue(41, true)//スキル実行条件
    //if($gameActors.actor(ActorId).hp >= Number($dataSkills[SkillId].meta.LoseHP)){
    //分岐成功
    //    $gameSwitches.setValue(41,true)
    //}else{
    //    $gameSwitches.setValue(41,false)
    //}
  }






  function SkillActive(SkillId, ActorId, itemflag) {
    if (itemflag == "item") {
      var skilldata = $dataItems[SkillId].meta
    } else if (itemflag == "common") {
      var skilldata = SH_getMemo(SkillId)
    } else {
      var skilldata = $dataSkills[SkillId].meta
    }
    var LoseHP = Number(skilldata.LoseHP) || 0
    var LoseMP = Number(skilldata.LoseMP) || 0
    var GainHP = skilldata.GainHP || 0
    var GainMP = skilldata.GainMP || 0
    var Success = $gameVariables.value(75)
    //var Rewards = Number(skilldata.Rewards) || 0
    var Donate = Number(skilldata.donate) || 0
    var Money = Number(skilldata.Money) || 0
    var EventP = Number(skilldata.GetEventP) || 0
    var LoseTime = skilldata.LoseTime || 0
    if (LoseTime == "NextDay") {//経過時間
      console.log($gameVariables.value(31))
      var nowTime = $gameVariables.value(31)//現在の時間帯
      if (nowTime >= 4) { nowTime = 4 }//4以上の場合4に固定
      LoseTime = 5 - nowTime//5-現在時間=経過させる時間
      // var nowminutes = $gameVariables.value(33)
      // var nowhowr = $gameVariables.value(34)
      // var hour = (24 - nowhowr + 6) * 60
      // var Minutes = 60 - nowminutes
      // LoseTime = hour + Minutes
    } else {
      LoseTime = Number(LoseTime)
    }


    if (itemflag == "common") SH_commonParameter(SkillId)


    //var Lusty = Number(skilldata.Lusty) || 0
    //var Bustle = Number(skilldata.Bustle) || 0
    // var skillexp = skilldata.SkillEXP || 0
    // var skillexp2 = skilldata.SkillEXP2 || 0

    // var skillexpvar = 0;var skillexpnum = 0
    // if(skillexp != 0){skillexp = skillexp.split(',');var skillexpvar = Number(skillexp[0]);var skillexpnum = Number(skillexp[1])}

    // var skillexpvar2 = 0;var skillexpnum2 = 0
    // if(skillexp2 != 0){skillexp2 = skillexp2.split(',');var skillexpvar2 = Number(skillexp2[0]);var skillexpnum2 = Number(skillexp2[1])}

    var skillVar = Number(skilldata.skillVar || 0)
    var skillVar2 = Number(skilldata.skillVar2 || 0)
    var exp1 = Number(skilldata.exp || 0)
    var exp2 = Number(skilldata.exp2 || 0)

    var DonateVar = 110
    // var NowHPVar = 124
    // var MaxHPVar = 123
    // var NowMPVar = 126
    // var MaxMPVar = 125
    var EventPVar = 259

    //console.log(skillexpvar,skillexpnum)
    //技能経験加算
    if (exp1 >= 1) { $gameVariables._data[skillVar] += exp1 }
    if (exp2 >= 1) { $gameVariables._data[skillVar2] += exp2 }


    //HP
    LoseHP = 0 - LoseHP
    var MaxHP = $gameActors.actor(ActorId).param(0)
    var MaxMP = $gameActors.actor(ActorId).param(1)
    Game_Interpreter.prototype.changeHp($gameActors.actor(ActorId), LoseHP, false)
    //SP
    LoseMP = 0 - LoseMP
    $gameActors.actor(ActorId).gainMp(LoseMP)

    //パーティー全体回復
    var actorData = $gameActors._data
    for (var i = 1; i < actorData.length; i++) {
      if (!actorData[i]) continue;
      var actor = $gameActors.actor(i)
      console.log(actor)
      MaxHP = actor.mhp
      MaxMP = actor.mmp
      if (GainHP == "MAX") {
        $gameActors.actor(i).gainHp(MaxHP)
      } else if (GainHP == "HALF") {//半回復の処理
        $gameActors.actor(i).gainHp(Math.round(MaxHP / 2))
      } else {
        GainHP = Number(GainHP)
        $gameActors.actor(i).gainHp(GainHP)
      }
      if (GainMP == "MAX") {//全回復の処理
        $gameActors.actor(i).gainMp(MaxMP)
      } else if (GainMP == "HALF") {//半回復の処理
        $gameActors.actor(i).gainMp(Math.round(MaxMP / 2))
      } else {
        GainMP = Number(GainMP)
        $gameActors.actor(i).gainMp(GainMP)
      }
      var reState = null
      if ($gameActors.actor(i).isStateAffected(96)) reState = 96
      if ($gameActors.actor(i).isStateAffected(97)) reState = 97
      if ($gameActors.actor(i).isStateAffected(99)) reState = 99
      if (skilldata.clearState) $gameActors.actor(i).clearStates()
      //console.log(reState)
      if (reState) $gameActors.actor(i).addState(reState)

    }



    // //パーティー全体回復
    // var actors = $gameParty.members()
    // var step = 0  
    // while(step < actors.length){
    //   MaxHP = $gameParty.members()[step].mhp
    //   MaxMP = $gameParty.members()[step].mmp
    //   if(GainHP == "MAX"){//全回復の処理
    //     $gameParty.members()[step].gainHp(MaxHP)
    //   }else if(GainHP == "HALF"){//半回復の処理
    //     $gameParty.members()[step].gainHp(Math.round(MaxHP / 2))
    //   }else{
    //     GainHP = Number(GainHP)
    //     $gameParty.members()[step].gainHp(GainHP)
    //   }

    //   if(GainMP == "MAX"){//全回復の処理
    //     $gameParty.members()[step].gainMp(MaxMP)
    //   }else if(GainMP == "HALF"){//半回復の処理
    //     $gameParty.members()[step].gainMp(Math.round(MaxMP / 2))
    //   }else{
    //     GainMP = Number(GainMP)
    //     $gameParty.members()[step].gainMp(GainMP)
    //   }
    //   //バステ全快
    //   if(skilldata.clearState)$gameParty.members()[step].clearStates()
    //   step++
    // }


    if (skilldata.clearSemen) SH_clearSemen()

    //給料
    if (Money != 0) {
      Money = Math.floor(Money * Success / 100)//成功値補正
      var min = Money * 0.8
      var max = Money * 1.2
      Money = Math.floor(Math.random() * (max - min + 1) + min);
      Money = SH_NumberLimit(Money, 9999, 0)
      //$gameParty.gainGold(Money);

      Game_Interpreter.prototype.command125(params2 = [0, 0, Money]);
      //console.log("通過")
    }

    //寄付加算
    //console.log(Donate)
    if (Donate != 0) {
      Donate = Math.floor(Donate * Success / 100)//成功値補正
      $gameVariables._data[DonateVar] += Donate;
    }
    //--------------------------------------------------------------------

    //イベントポイント
    var epBonusBar = 0
    if ($gameSwitches.value(1227)) epBonusBar = SH_getMetaParameter("skill", "epBonusBar")//酒場イベント中
    EventP += epBonusBar
    EventP = Math.floor(EventP * Success / 100)//成功値補正
    $gameVariables._data[EventPVar] += EventP;
    tickergamevar('EventP', EventP)




    //淫欲経験
    // $gameVariables._data[205] += LustEXP
    // tickergamevar('Lust',LustEXP) 

    //雰囲気
    // $gameVariables._data[115] += Lusty
    // $gameVariables._data[115]  = SH_NumberLimit($gameVariables.value(115),100,0)

    // //人気
    // $gameVariables._data[114] += Bustle
    // $gameVariables._data[114] = SH_NumberLimit($gameVariables.value(114),100,0)
    // //$gameVariables._data[114] =  Math.max(0, Math.min(100, $gameVariables.value(114) + Bustle));
    // var Icon = "\\i[" + IconBustle + "]"
    // if(Bustle != 0){$TM.show(Icon +  TextManager.paraname(114) + '+' + Bustle)}

    //貢献
    //$gameVariables._data[114] =  Math.max(0, Math.min(100, $gameVariables.value(114) + Bustle));
    // if(Bustle != 0){
    //   Bustle = Math.floor(Bustle * Success / 100)//成功値補正
    //   $gameVariables._data[117] += Bustle
    //   tickergamevar('Bustle',Bustle) 
    // }
    // $gameVariables._data[117] = SH_NumberLimit($gameVariables.value(117),9999,0)

    //教会レベルアップ-------------------------------------------------------------
    // var CLevelVar = 113
    // var CLevel = $gameVariables.value(CLevelVar)
    // var CExpVar = 117
    // var CExp = $gameVariables.value(CExpVar)
    // var NextExpVar = 118

    // var NextLevel = CLevel
    // var NextExp = SH_CLevel(NextLevel)
    // if(CExp >= NextExp && $gameVariables.value(CLevelVar) <= 9){
    //   $gameVariables._data[CLevelVar] += 1
    //   CLevel += 1
    //   tickergamevar('CLevel',1) 
    //   $gameVariables._data[CExpVar] -= $gameVariables.value(NextExpVar)
    // }

    //次回経験値・表示用
    // NextLevel = CLevel 
    // NextEXP = SH_CLevel(NextLevel)
    // $gameVariables._data[NextExpVar] = NextExp

    //-------------------------------------------------------------


    //経過時間
    $gameVariables._data[29] = LoseTime



    ParaLimit()
    //-------------------------------------------------------------
  }






})();

function SH_NumberLimit(number, maxnum, minnum) {
  number = Math.max(minnum, Math.min(maxnum, number));

  return number
}


function SH_CLevel(number) {
  var CLevel = number
  var BaseExp = 30
  if (CLevel < 1) { CLevel = 1 }

  var LevelCul = 1
  var BeforeExp = BaseExp
  var NextExp = BaseExp
  var Arg2 = 0.20

  while (LevelCul < CLevel) {
    LevelCul += 1
    NextExp = Math.floor((BaseExp * (1 + (1 / (1 + (LevelCul + (1 / 0.1)) * Arg2))) ** (LevelCul - 1) * LevelCul))
    console.log(NextExp)
    // LevelCul += 1
    // var ExpA = BeforeExp * 1.1
    // var ExpB = LevelCul * 15
    // NextExp = Math.floor((ExpA + ExpB) / 2)
    // BeforeExp = NextExp
    // console.log(BeforeExp,LevelCul,NextExp)
  }
  return NextExp
}


function SkillDesc() {
  var actorid = 1
  var SkillId = 1; var skilltextvar = 1100; var skilldescvar = 1200; var skillresource = 1300; var hasskill = 1400;
  while (SkillId < 100) {
    SkillId; skilltextvar = 1100 + SkillId; skilldescvar = 1200 + SkillId; skillresource = 1300 + SkillId; hasskill = 1400 + SkillId
    var name = $dataSkills[SkillId].name
    var icon = $dataSkills[SkillId].iconIndex
    var desc = $dataSkills[SkillId].description
    var time = $dataSkills[SkillId].meta.LoseTime || 0
    var losehp = $dataSkills[SkillId].meta.LoseHP || 0
    var losemp = $dataSkills[SkillId].meta.LoseMP || 0



    var text = "\\i[" + icon + "]" + name
    var hasflag = 0
    if ($gameActors.actor(actorid).isLearnedSkill(SkillId)) { hasflag = 1 }

    var nowTime = $gameVariables.value(31)
    var timeDsp1 = "なし"
    var timeDsp2 = ""
    if (time == "NextDay") {
      time = 5
    } else {
      time = Number(time)
    }

    if (time >= 1) {
      if (nowTime == 0) { timeDsp1 = "Morning→" }
      if (nowTime == 1) { timeDsp1 = "Afternoon→" }
      if (nowTime == 2) { timeDsp1 = "Evening→" }
      if (nowTime == 3) { timeDsp1 = "Night→" }
      if (nowTime == 4) { timeDsp1 = "Late Night→" }
      var totalTime = nowTime + time//総時間。イベント後の時間を判定。
      if (totalTime >= 5) { timeDsp2 = "Next Day" }
      if (totalTime == 4) { timeDsp2 = "Late Night" }
      if (totalTime == 3) { timeDsp2 = "Evening" }
      if (totalTime == 2) { timeDsp2 = "Afternoon" }
      if (totalTime == 1) { timeDsp2 = "Morning" }
      if (totalTime == 0) { timeDsp2 = "Night" }
    }



    if (losehp > $gameVariables.value(124)) { var hpcolor = "\\c[" + 18 + "]" } else { var hpcolor = "\\c[" + 4 + "]" }
    var text2 = "Elapsed Time : " + timeDsp1 + timeDsp2 + hpcolor + "   HP Consumption : " + losehp + hpcolor + "   SP Consumption : " + losemp
    $gameVariables._data[skilltextvar] = text;
    $gameVariables._data[skilldescvar] = desc;
    $gameVariables._data[skillresource] = text2; SkillId += 1
    $gameVariables._data[hasskill] = hasflag;
  }
}

function SkillDescCommon() {
  var actorid = 1
  var SkillId = 100; var skilltextvar = 1000; var skilldescvar = skilltextvar + 100; var skillresource = skilldescvar + 100; var hasskill = skillresource + 100;
  while (SkillId < 200) {
    SkillId; skilltextvar = 1000 + SkillId; skilldescvar = skilltextvar + 100; skillresource = skilldescvar + 100; hasskill = skillresource + 100
    var commnMemo = SH_getMemo(SkillId)
    if (commnMemo) {
      var name = commnMemo.name || ""
      var icon = commnMemo.icon || 0
      var desc = commnMemo.help || ""
      var time = commnMemo.LoseTime || 0
      var losehp = commnMemo.LoseHP || 0
      var losemp = commnMemo.LoseMP || 0
    } else {
      var name = ""
      var icon = 0
      var desc = ""
      var time = 0
      var losehp = 0
      var losemp = 0
    }



    var text = "\\i[" + icon + "]" + name

    var nowTime = $gameVariables.value(31)
    var timeDsp1 = "None"
    var timeDsp2 = ""
    if (time == "NextDay") {
      time = 5
    } else {
      time = Number(time)
    }

    if (time >= 1) {
      if (nowTime == 0) { timeDsp1 = "Morning→" }
      if (nowTime == 1) { timeDsp1 = "Afternoon→" }
      if (nowTime == 2) { timeDsp1 = "Evening→" }
      if (nowTime == 3) { timeDsp1 = "Night→" }
      if (nowTime == 4) { timeDsp1 = "Late Night→" }
      var totalTime = nowTime + time//総時間。イベント後の時間を判定。
      if (totalTime >= 5) { timeDsp2 = "Next Day" }
      if (totalTime == 4) { timeDsp2 = "Late Night" }
      if (totalTime == 3) { timeDsp2 = "Night" }
      if (totalTime == 2) { timeDsp2 = "Evening" }
      if (totalTime == 1) { timeDsp2 = "Afternoon" }
      if (totalTime == 0) { timeDsp2 = "Morning" }
    }



    if (losehp > $gameActors.actor(actorid).hp) { var hpcolor = "\\c[" + 18 + "]" } else { var hpcolor = "\\c[" + 4 + "]" }
    if (losemp > $gameActors.actor(actorid).mp) { var mpcolor = "\\c[" + 18 + "]" } else { var mpcolor = "\\c[" + 4 + "]" }
    var text2 = "Elapsed Time : " + timeDsp1 + timeDsp2 + hpcolor + "   HP Consumption : " + losehp + mpcolor + "   SP Consumption : " + losemp
    $gameVariables._data[skilltextvar] = text;
    $gameVariables._data[skilldescvar] = desc;
    $gameVariables._data[skillresource] = text2; SkillId += 1
  }
}

function ParaLimit() {
  //体力
  var VarNum = 124
  var num = $gameVariables.value(VarNum); var max = $gameVariables.value(123); var min = 0;; $gameVariables._data[VarNum] = SH_NumberLimit(num, max, min)
  //気力
  var VarNum = 126
  var num = $gameVariables.value(VarNum); var max = $gameVariables.value(125); var min = 0; $gameVariables._data[VarNum] = SH_NumberLimit(num, max, min)

  //人気
  var VarNum = 114
  var num = $gameVariables.value(VarNum); var max = 100; var min = 0; $gameVariables._data[VarNum] = SH_NumberLimit(num, max, min)

  var VarNum = 115
  var num = $gameVariables.value(VarNum); var max = 100; var min = 0; $gameVariables._data[VarNum] = SH_NumberLimit(num, max, min)



}





