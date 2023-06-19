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
 * @command AddVar
 * @text AddVar
 * @desc 変数を加算します。

 * @arg VarName
 * @type variable
 * @text 変数名選択
 * @desc 変数を選択してください。
 * 
 * 
 * @arg VarNumber
 * @type number
 * @text 値を入力
 * @default 0
 * @desc 変数に加算する値を指定してください。
 * 
 * @arg VarLimit
 * @type select
 * @text 上限下限選択
 * @default UNLIMITED
 * @desc 上限・下限の値を選択
 * 
 * @option UNLIMITED
 * 
 * @option MIN0MAX999
 * 
 * @option MIN-999MAX999
 * 
 * @option MIN0MAX100
 * 
 * @option MIN-100MAX100
 *
 * @option Lust
 * 
 * @arg Ticker
 * @type boolean
 * @text on/of
 * @default on
 * @desc ティッカーによる表示
 * 
 * @arg Icon
 * @type number
 * @text icon
 * @default 0
 * @desc アイコン番号です。0は非表示
 * 
 * 
 * 
 * @command AddParams
 * @text AddParams
 * @desc 変数を加算します。
 * @arg VarName
 * @type variable
 * @text 変数名選択
 * @desc 変数を選択してください。
 * 
 * @arg VarNumber
 * @type number
 * @text 値を入力
 * @default 0
 * @max 9999
 * @min -9999
 * @desc 変数に加算する値を指定してください。
 * 
 * 
 * 
 * @command EroHistory
 * @text EroHistory
 * @desc エロ経験を入力します。
 * @arg text
 * @type strings
 * @text 経験詳細
 * @desc 経験について入力します。
 * 
 * 
 */




(() => {
    const pluginName = "SH_Addvar";
    PluginManager.registerCommand(pluginName, "AddVar", function(args){
        var VarId = Number(args.VarName)
        var VarNum = Number(args.VarNumber)
        $gameVariables._data[VarId] = $gameVariables.value(VarId) + VarNum 
        var DisVarName = TextManager.paraname(VarId)
        var icon = args.Icon


        var Limit = args.VarLimit
        if(Limit == 'MIN0MAX999'){
            Paramax0_999(VarId) //上限下限の処理
        }else if(Limit == 'MIN-999MAX999'){
            ParamaxUnder999(VarId)
        }else if(Limit == 'MIN0MAX100'){
            Paramax0_100(VarId)
        }else if(Limit == 'MIN-100MAX100'){
            ParamaxUnder100(VarId)
        }else if(Limit == 'Lust'){
            ParamaxLust(VarId)            
        }
        if(icon >= 1){var iconnum = "\\i[" + icon +"]" }else{var iconnum = ""}
        if(args.Ticker){$TM.show(iconnum + DisVarName + " + " + VarNum)};


        //Ticker等で数値を出す場合
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

    function ParaLimit(VarId,Over,Under) {
        var high = Over
        var low = Under
        $gameVariables._data[VarId] = $gameVariables.value(VarId).clamp(low,high)
    }


    PluginManager.registerCommand(pluginName, "AddParams", function(args){
        var VarId = Number(args.VarName)
        var VarNum = Number(args.VarNumber)
        $gameVariables._data[VarId] = $gameVariables.value(VarId) + VarNum 
        var DisVarName = TextManager.paraname(VarId)
        var icon = Number($dataUniques.eroparams[VarId].icon)
        var limit = Number($dataUniques.eroparams[VarId].overlimit)
        var underlimit = Number($dataUniques.eroparams[VarId].underlimit)
        ParaLimit(VarId,limit,underlimit)    
        if(icon >= 1){var iconnum = "\\i[" + icon +"]" }else{var iconnum = ""}
        if(VarNum >= 0){
            $TM.show(iconnum + DisVarName + " + " + VarNum)
        }else{
            $TM.show(iconnum + DisVarName + " " + VarNum)
        };


        //Ticker等で数値を出す場合
    });






    PluginManager.registerCommand(pluginName, "EroHistory", function(args){
        var text = args.text
        console.log(text)
        $gameVariables._data[146] = text

        //Ticker等で数値を出す場合
    });

})();
