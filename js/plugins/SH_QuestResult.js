/*:
 * @target MZ
 * @plugindesc クエストシステム
 * @author しもや
 * @help
 * 色んな処理します。
 * @command ItemQuest
 * @text 
 * @desc 
 * @arg questid
 * @type number
 * 
 * @command QuestAccept
 * @text 
 * @desc 
 * @arg questid
 * @type string 
 * 
 * @command QuestClearFlag
 * @text 
 * @desc 
 * @arg questid
 * @type string 
 * 
 * @command QuestProgress
 * @text 
 * @desc 
 * @arg questid
 * @type string 
 * 
 * @arg progress
 * @type number
 * 
 * @command QuestEnd
 * @text 
 * @desc 
 * @arg questid
 * @type string 
 * 
 * @command QuestFailed
 * @text 
 * @desc 
 * @arg questid
 * @type string 
 * 
 * @command LoseQuestItem
 * @text 
 * @desc 
 * @arg questid
 * @type number 
 * 
 * @command QuestResult
 * @text 
 * @desc 
 * @arg questid
 * @type string 
 * 
 * @command QuestHint
 * @text 
 * @desc 
 * @arg questid
 * @type string 
 * 
 * @arg message
 * @type multiline_string
 * 
 */


(() => {
    const pluginName = "SH_QuestResult";
  
//収集クエスト

    PluginManager.registerCommand(pluginName, "ItemQuest", function(args){
        var questid = args.questid;   // データベースから1番のアイテムを取得
        
        var questType = $dataItems[questid].meta.Type;

        //アイテム判定
        $gameVariables._data[620] = CallItemId(questid)

    });

    PluginManager.registerCommand(pluginName, "LoseQuestItem", function(args){

        var questid = 105;   // データベースから1番のアイテムを取得
        CallItemId(questid)
        var ItemIdVar = 601;ItemNumNar = ItemIdVar + 10
        if($gameVariables.value(ItemIdVar) >= 1){$gameParty.loseItem($dataItems[$gameVariables.value(ItemIdVar)], $gameVariables.value(ItemNumNar))}
        var ItemIdVar = 602;ItemNumNar = ItemIdVar + 10
        if($gameVariables.value(ItemIdVar) >= 1){$gameParty.loseItem($dataItems[$gameVariables.value(ItemIdVar)], $gameVariables.value(ItemNumNar))}
        var ItemIdVar = 603;ItemNumNar = ItemIdVar + 10
        if($gameVariables.value(ItemIdVar) >= 1){$gameParty.loseItem($dataItems[$gameVariables.value(ItemIdVar)], $gameVariables.value(ItemNumNar))}
    });

    PluginManager.registerCommand(pluginName, "QuestProgress", function(args){
        var questid = args.questid;   // データベースから1番のアイテムを取得
        questid = ConvertCC(questid)
        var questVar = Number($dataItems[questid].meta.questvar);

        $gameVariables._data[questVar].progress = Number(args.progress)//受諾
        console.log($gameVariables.value(questVar).progress)
        if($gameVariables.value(questVar).progress >= 100){$gameVariables._data[questVar].progress = 100}
    });


    PluginManager.registerCommand(pluginName, "QuestClearFlag", function(args){
        var questid = args.questid;   // データベースから1番のアイテムを取得
        questid = ConvertCC(questid)
        var questVar = Number($dataItems[questid].meta.questvar);

        $gameVariables._data[questVar].clearflag = 'true'//受諾
    });


    PluginManager.registerCommand(pluginName, "QuestAccept", function(args){
        var questid = args.questid;   // データベースから1番のアイテムを取得
        questid = ConvertCC(questid)
        var questVar = Number($dataItems[questid].meta.questvar);

        $gameVariables._data[questVar].accept = 'true'//受諾
    });



    PluginManager.registerCommand(pluginName, "QuestEnd", function(args){
        var questid = args.questid;   // データベースから1番のアイテムを取得
        questid = ConvertCC(questid)
        var questVar = Number($dataItems[questid].meta.questvar);

             

        $gameVariables._data[questVar].clear = 'true'//クリア
        $gameVariables._data[questVar].accept = 'false'//受諾中フラグリセット
        $gameVariables._data[questVar].cleartimes += 1//クリア回数
    });


    PluginManager.registerCommand(pluginName, "QuestFailed", function(args){
        var questid = args.questid;   // データベースから1番のアイテムを取得
        questid = ConvertCC(questid)
        console.log(questid)
        var questVar = Number($dataItems[questid].meta.questvar);

             

        $gameVariables._data[questVar].clear = 'false'//クリア
        $gameVariables._data[questVar].accept = 'false'//受諾中フラグリセット
        $gameVariables._data[questVar].clearflag = 'false'
        $gameVariables._data[questVar].progress = 0
        $gameVariables._data[questVar].questhint = ' '
    });

        

    PluginManager.registerCommand(pluginName, "QuestResult", function(args){
        var questid = args.questid;   // データベースから1番のアイテムを取得4
        questid = ConvertCC(questid)
        var questObj = $dataItems[questid]
        //var questType = questObj.meta.Type;//ミニゲームなどを判定（いまのところ無意味？）

        var Money = Number(questObj.meta.Money || 0)
        var Exp = Number(questObj.meta.Exp || 0)
        //var Bustle = Number(questObj.meta.Bustle || 0)
        var Lust = Number(questObj.meta.Lust || 0)
        if(questObj.meta.resultPointVar){//ポイントによる報酬変動
            var resultPointVar = Number(questObj.meta.resultPointVar || 0)
            Money = Money * $gameVariables.value(resultPointVar)
            $gameVariables._data[resultPointVar] = 0
        }
        
        var resultVar = Number(questObj.meta.resultVar || 0)//変数報酬
        var resultP = Number(questObj.meta.resultP || 0)
        var resultVar2 = Number(questObj.meta.resultVar || 0)
        var resultP2 = Number(questObj.meta.resultP || 0)
        $TM.show('Quest Complete!')

        //アイテム判定        
        if(Money != 0){$gameParty.gainGold(Money);tickergamevar('Rewards',Money);}
        if(Exp != 0){
            //$gameActors.actor(1).changeExp(Exp);tickergamevar('Exp',Exp);
            if($gameActors.actor(1).isStateAffected(96)){
                Exp = Math.round(Exp * 1.5)//お祈り効果
                $TM.show('Experience and rewards increased through blessings by prayer.');
            }
            $gameParty.changeExp(Exp);tickergamevar('Exp',Exp);
            
        }
        //if(Bustle |= 0){$gameVariables._data[117] += Bustle;tickergamevar('Bustle',Bustle)    }
        if(Lust != 0){paraUpCommon(Lust,"lust")}
        if(resultVar != 0){$gameVariables._data[resultVar] += resultP;}
        if(resultVar2 != 0){$gameVariables._data[resultVar2] += resultP2;}


    });


    PluginManager.registerCommand(pluginName, "QuestHint", function(args){
        var questid = args.questid;   // データベースから1番のアイテムを取得4
        questid = ConvertCC(questid)
        var hint = args.message
        hint = 'Next : ' + hint
        var questvar = Number($dataItems[questid].meta.questvar)
        $gameVariables._data[questvar].questhint = hint
        $TM.show('Quests have been updated.')
    });
    


    function CallItemId(questid){
        var ItemId = 0
        var ItemNum = 0
        var ItemId2 = 0
        var ItemNum2 = 0
        var ItemId3 = 0
        var ItemNum3 = 0
        var ItemId4 = 0
        var ItemNum4 = 0
        var ItemId5 = 0
        var ItemNum5 = 0

        if($dataItems[questid].meta.NeedItemId){
            var ItemId = Number($dataItems[questid].meta.NeedItemId) 
            var ItemNum = Number($dataItems[questid].meta.NeedItemNum)
            $gameVariables._data[601] = ItemId;$gameVariables._data[611] = ItemNum
        }

        if($dataItems[questid].meta.NeedItemId2){
            var ItemId2 = Number($dataItems[questid].meta.NeedItemId2) 
            var ItemNum2 = Number($dataItems[questid].meta.NeedItemNum2)
            $gameVariables._data[602] = ItemId2;$gameVariables._data[612] = ItemNum2
        }

        if($dataItems[questid].meta.NeedItemId3){
            var ItemId3 = Number($dataItems[questid].meta.NeedItemId3) 
            var ItemNum3 = Number($dataItems[questid].meta.NeedItemNum3)
            $gameVariables._data[603] = ItemId3;$gameVariables._data[613] = ItemNum3
        }

        if($dataItems[questid].meta.NeedItemId4){
            var ItemId4 = Number($dataItems[questid].meta.NeedItemId4) 
            var ItemNum4 = Number($dataItems[questid].meta.NeedItemNum4)
            $gameVariables._data[604] = ItemId4;$gameVariables._data[614] = ItemNum4
        }

        if($dataItems[questid].meta.NeedItemId5){
            var ItemId5 = Number($dataItems[questid].meta.NeedItemId5) 
            var ItemNum5 = Number($dataItems[questid].meta.NeedItemNum5)
            $gameVariables._data[605] = ItemId5;$gameVariables._data[615] = ItemNum5
        }

        console.log($gameParty.numItems($dataItems[ItemId]))
        if(ItemNum <= $gameParty.numItems($dataItems[ItemId]) && ItemNum2 <= $gameParty.numItems($dataItems[ItemId2]) && ItemNum3 <= $gameParty.numItems($dataItems[ItemId3]) && ItemNum4 <= $gameParty.numItems($dataItems[ItemId4])  && ItemNum5 <= $gameParty.numItems($dataItems[ItemId5])){
            var Successflag = 1
        }else{
            var Successflag = 0
        }
        return Successflag
    }




})();