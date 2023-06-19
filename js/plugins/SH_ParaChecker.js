/*---------------------------------------------------------------------------*
 * 2019/03/13 kido0617
 * http://kido0617.github.io/
 *---------------------------------------------------------------------------*/

/*:
 * @target MZ
 * @plugindesc アノテーションから増やす変数を選択する。
 * 上限・下限を自動で付け、なおかつ上昇の表示などをしたい時に。
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   Addvar 変数名 値
 * 
 * 
 

 * 
 * ////////////////////////////////////////////////////////////////////////
 * @command ParaCheck
 * @text ParaCheck
 * @desc パラメータを取得し代入します。
 * 
 * 
 * 
 */




(() => {
    const pluginName = "SH_ParaChecker";
    PluginManager.registerCommand(pluginName, "ParaCheck", function(args){
        var terms = $dataUniques.terms
        var language = "Jp"//言語
        var ActorID = 1
        var EqSlotCloth = 3
        var actorData = $gameActors.actor(ActorID)
        $gameVariables._data[108] = 5//最大技能Rank
        $gameVariables._data[122] = actorData.level//主人公レベル
        $gameVariables._data[105] = $gameParty._gold //所持金
        if($gameVariables.value(113) <= 0)$gameVariables._data[113] = 1//教会ランク

        $gameVariables._data[129] = 3//最大食事回数
        var food = SH_getMetaParameter("skill","foodMax",[900,1000]) || 0
        $gameVariables._data[129] += food
        
        $gameVariables._data[299] = 3//最大のみもの回数
        var food = SH_getMetaParameter("skill","DrinkMax",[900,1000]) || 0
        $gameVariables._data[299] += food
        
        //--------------------------------------------------
        //契約紋監視。濃度調整、なにもない場合は消すための処理
        //--------------------------------------------------
        var mark = SH_SkillFilter(1,"addMark")//追加契約配列
        var mark2  = SH_SkillFilter(1,"eromark")//契約紋そのものも含む配列
        $gameVariables._data[186] = SH_InmonOpacity()//濃度
        $gameVariables._data[187] = mark2.length >= 1 ? mark2.length : 0//契約紋スキルの数
        $gameVariables._data[357] = mark.length >= 1 ? mark.length : 0//追加契約の数

        var hensai = $gameSwitches.value(1240) ? true :false//返済が終わっている
        var startFlag = $gameSwitches.value(1206) ? true :false//オープニングイベントでの契約紋の処理開始
        var markBaseId = 231
        var markBaseAfter = 232//進行度によってスキル変更（メッセージ変更でもいいかも）

        //返済未完&本編開始
        if(!hensai && startFlag){
          if(!actorData.isLearnedSkill(markBaseId))$gameActors.actor(ActorID).learnSkill(markBaseId)
        }else{
          if(actorData.isLearnedSkill(markBaseId))$gameActors.actor(1).forgetSkill(markBaseId)
        }

        //返済完了&追加契約あり&契約紋なし
        if(hensai)$gameVariables._data[111] = 0
        if(hensai && mark.length >= 1){
          if(!actorData.isLearnedSkill(markBaseAfter))$gameActors.actor(ActorID).learnSkill(markBaseAfter)
        }else{
          if(actorData.isLearnedSkill(markBaseAfter))$gameActors.actor(1).forgetSkill(markBaseAfter)
        }
        //--------------------------------------------------
        //発情判定スイッチ
        //--------------------------------------------------
        if(actorData.isStateAffected(57)){
          $gameSwitches.setValue(117,true)
        }else{
          $gameSwitches.setValue(117,false)
        }
        //--------------------------------------------------
        //聖性の計算
        //--------------------------------------------------
        var skills = $dataSkills
        var unHolyArray = skills.filter(data => data && data.meta["unHoly"] && actorData.hasSkill(data.id));
        var holy = 100//初期値
        var unHoly = 0
        for(var i = 0;i < unHolyArray.length;i++){
          unHoly += Number(unHolyArray[i].meta.unHoly)
        }
        holy -= unHoly <= 100 ? unHoly : 100//減少。100以上の場合100に固定
        $gameVariables._data[130] = holy
        //--------------------------------------------------
        //売春可能フラグ。スイッチ417
        //--------------------------------------------------
        if(actorData.isLearnedSkill(249) && SH_Inyoku(2,"higher") && !$gameVariables.value(417) || $gameTemp.isPlaytest()){
          $gameSwitches.setValue(417,true)
        }
        //--------------------------------------------------
        //マップ座標などの取得
        //--------------------------------------------------
        SH_playerPoint()
        //--------------------------------------------------          
        var clothId = actorData.equips()[1] ? actorData.equips()[1].id : 0
        $gameVariables._data[263] = SH_SimpleClothType()
        $gameVariables._data[264] = clothId
        //var ClothPicStr = ClothTag(ActorID,EqSlotCloth)//CallStandから関数呼び出し
        var shameLimit = SH_getMetaParameter("skill","shameLimit",[800,1000]) || 0
        $gameVariables._data[208] = shameLimit//羞恥耐性

        //--------------------------------------------------
        //淫欲レベルチェック
        //--------------------------------------------------
        var lustLimit = SH_getMetaParameter("skill","lustLimit",[800,1000]) || 0
        lustLimit += 100
        $gameVariables._data[195] = lustLimit
        var maxLv = 0
        if($gameVariables.value(205) > lustLimit){$gameVariables._data[205] = lustLimit}
        if(lustLimit == 300){maxLv = 1}
        if(lustLimit == 999){maxLv = 2}
        $gameVariables._data[204] = maxLv

        //--------------------------------------------------
        //日数関連
        //--------------------------------------------------
        var Passed = $gameVariables.value(26)//経過日数
        var LimitDay = $gameVariables.value(103)//返済期限
        LimitDay += $gameParty.numItems($dataItems[840])//返済期限延長アイテムぶん加算
        var Grace = LimitDay
        $gameVariables._data[104] = Grace - Passed//後何日か
        if($gameSwitches.value(1240)){//返済済みの場合固定
          $gameVariables._data[103] = 999
          $gameVariables._data[104] = "---"
        }

        //--------------------------------------------------
        //貞操関連
        //--------------------------------------------------
        if($gameVariables.value(201) >= 1){//処女判定
          $gameVariables._data[150] = terms.nonvirgin[language]
        }else{
          $gameVariables._data[150] = terms.virgin[language]
        }
          //--------------------------------------------------
          //装備idチェック
          //--------------------------------------------------
          var EqVar = 280
          var Slot1 = $gameActors.actor(1).equips()[0] || 0 //武器
          var Slot2 = $gameActors.actor(1).equips()[1] || 0 //衣装
          var Slot3 = $gameActors.actor(1).equips()[2] || 0 //頭
          var Slot4 = $gameActors.actor(1).equips()[3] || 0
          var Slot5 = $gameActors.actor(1).equips()[4] || 0
          var Slot6 = $gameActors.actor(1).equips()[5] || 0
          var array = new Array(
            Slot1.id,//武器
            Slot2.id,//衣装
            Slot3.id,//頭
            Slot4.id,
            Slot5.id,
            Slot6.id
          );
          $gameVariables._data[EqVar] = array
          //--------------------------------------------------
    });




    function Paramax0_999(VarId) {
        var high = 999
        var low = 0
        $gameVariables._data[VarId] = $gameVariables.value(VarId).clamp(low,high)
    }

    function ParamaxUnder999(VarId) {
        var high = 999
        var low = -999
        $gameVariables._data[VarId] = $gameVariables.value(VarId).clamp(low,high)
    }

    function Paramax0_100(VarId) {
        var high = 100
        var low = 0
        $gameVariables._data[VarId] = $gameVariables.value(VarId).clamp(low,high)
    }

    function ParamaxUnder100(VarId) {
        var high = 100
        var low = -100
        $gameVariables._data[VarId] = $gameVariables.value(VarId).clamp(low,high)
    }

    function ParamaxLust(VarId) {
        var high = 100
        var low = 0
        $gameVariables._data[VarId] = $gameVariables.value(VarId).clamp(low,high)
    }

})();
