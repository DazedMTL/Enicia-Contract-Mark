
/*=============================================================================*
 * SH_messageWindowBg.js しもや 2021/11/18
 *=============================================================================*/

/*:
 * @target MZ
 * @plugindesc 「キャラ名」の有無で自動的にウィンドウ背景を変更するプラグイン
 * @author しもや
 * @help
 * プラグインコマンドはありません。
 * イベントコマンド「文章の入力」で、名前が書かれている場合と空欄のウィンドウ背景を自動的に設定します。
 * 
 * @param nameBackground
 * @text キャラ名が存在する場合のウィンドウ背景
 * @desc 0.ウィンドウ 1.黒背景 2.透明
 * @default 0
 * @type number
 * 
 * @param noNameBackground
 * @text キャラ名が存在しない場合のウィンドウ背景
 * @desc 0.ウィンドウ 1.黒背景 2.透明
 * @default 1
 * @type number
 * 
 * @param switch
 * @text プラグインの機能を有効化するスイッチ
 * @desc スイッチ番号
 * @default 1
 * @type switch
 */

(() => {
'use strict';   
const pluginName = "SH_messageWindowBg";
const PARAM	= PluginManager.parameters(pluginName);
const nameBg = Number(PARAM.nameBackground)
const noNameBg = Number(PARAM.noNameBackground)
const switchNum = Number(PARAM.switch)
    
function SH_changeMessageWindow(gameMessage){       
    var bgNum = gameMessage._background
    if($gameSwitches.value(switchNum)){
        if(!gameMessage._speakerName){
            bgNum = noNameBg
        }else{
            bgNum = nameBg
        }
    }         
    return bgNum
}

function SH_getActorName(text){      
    let actorName = "" 
    let actorNickname = ""
    let nameMatch = text.match(/\\NBX\[(\d+)\]/i)
    if(nameMatch){
        var actorId = Number(nameMatch[1])
        if($gameSwitches.value(47) && actorId == 1)actorId = 5//娼婦
        
        actorName = `\\n[${actorId}]`
        actorNickname = $gameActors.actor(actorId)._nickname
        actorName = actorNickname + actorName
        //console.log(actorNickname)
        text = text.replace(/\\NBX\[(\d+)\]/i,"")
    }
    let array = [actorName,text]
    return array
}

Game_Interpreter.prototype.command101 = function(params) {
    if ($gameMessage.isBusy()) {
        return false;
    }
    $gameMessage.setFaceImage(params[0], params[1]);
    $gameMessage.setBackground(params[2]);
    $gameMessage.setPositionType(params[3]);
    $gameMessage.setSpeakerName(params[4]);
    while (this.nextEventCode() === 401) {
        // Text data
        this._index++;
        //ハートマークをピンクにする処理
        this.currentCommand().parameters[0] = this.currentCommand().parameters[0].replace(/♥/g,"\\c[27]♥\\c[0]")
        this.currentCommand().parameters[0] = this.currentCommand().parameters[0].replace(/♡/g,"\\c[27]♥\\c[0]")
        ///プラグイン追加部分        
        if($gameMessage._speakerName == ""){
            let altText = SH_getActorName(this.currentCommand().parameters[0])
            $gameMessage.setSpeakerName(altText[0]);
            $gameMessage.add(altText[1]);
        }else{
            $gameMessage.add(this.currentCommand().parameters[0]);
        }
        //ここまで
        //$gameMessage.add(this.currentCommand().parameters[0]);//元の処理

    }
    switch (this.nextEventCode()) {
        case 102: // Show Choices
            this._index++;
            this.setupChoices(this.currentCommand().parameters);
            break;
        case 103: // Input Number
            this._index++;
            this.setupNumInput(this.currentCommand().parameters);
            break;
        case 104: // Select Item
            this._index++;
            this.setupItemChoice(this.currentCommand().parameters);
            break;
    }

    ///プラグイン追加部分
    var bgNum = SH_changeMessageWindow($gameMessage)
    $gameMessage.setBackground(bgNum);
    //ここまで
    this.setWaitMode("message");
    //本を読んでいる時のSEスイッチ
    if($gameSwitches.value(320))$gameSwitches.setValue(319,true)
    //
    return true;
};

})();
