/*:
 * @target MZ
 * @plugindesc SE再生プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *  PlaySE


 * @command PlaySE
 * @text SE再生
 * @desc jsonからSEを読み込んで再生します。
 * @arg seid
 * @type string
 * @text SEの種類
 * @desc SEの種類を指定します。
 *  
 * @arg volume
 * @type combo
 * @option default
 * @option variable
 * @default default
 * @max 100
 * @min 0
 * @text SEボリューム
 * @desc SEのボリュームを0-100で設定します。defaultにした場合自動設定されます。
 * 
 * @arg pitch
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * @text SEピッチ
 * @desc SEのピッチを設定します。
 * 
 * @arg pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * @text SEパン
 * @desc SEの定位を設定します。
 * 
 * @command PlayVoice
 * @text Voice再生
 * @desc jsonからtalkを読み込んで再生します。
 * @arg seid
 * @type string
 * @text SEの種類
 * @desc SEの種類を指定します。
 *  
 * @arg volume
 * @type combo
 * @option default
 * @option variable
 * @default default
 * @max 100
 * @min 0
 * @text SEボリューム
 * @desc SEのボリュームを0-100で設定します。defaultにした場合自動設定されます。
 * 
 * @arg pitch
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * @text SEピッチ
 * @desc SEのピッチを設定します。
 * 
 * @arg pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * @text SEパン
 * @desc SEの定位を設定します。
 * 
 * @param varvolume
 * @text SE音量制御用変数
 * @desc 音量制御に変数を指定した場合の変数番号です。
 * @default 53
 * @type variable
 * 
 * @param defvolume
 * @text SEデフォルト音量
 * @desc デフォルトの音量です。
 * @default 80
 * @type number
 * @max 100
 * @min 0
 * 
 * 
 * @param voiceswitch
 * @text ボイスオンオフスイッチ
 * @desc ボイスを有効化するスイッチを指定。
 * @default 1
 * @type switch
 * 
 * 
 * 
 * 
 * 
 * 
 */


(() => {
  const pluginName = "SH_PlaySEMZ";
  PluginManager.registerCommand(pluginName, "PlaySE", function(args){
      var parameters = PluginManager.parameters('SH_PlaySEMZ');
      var seid = args.seid
      var sevolume = args.volume
      var sepan = args.pan
      var sepitch = args.pitch
      if (sevolume == "default"){sevolume = parameters.defvolume}
      if (sevolume == "variable"){sevolume = $gameVariables.value(parameters.varvolume)}
      if(sevolume > 100){sevolume = 100}

      if(seid != -1){
          //var index = $dataUniques.selist.Id.indexOf(seid);

          //var sefile = $dataUniques.selist.File[index];
          var sefile = $dataUniques.selist[seid]          
          AudioManager.playSe({
                      name: sefile,
                      volume: isNaN(sevolume) ? 90 : sevolume,
                      pitch: isNaN(sepitch) ? 100 : sepitch,
                      pan: isNaN(sepan) ? 0 : sepan
                    });
        }else{
            console.error(seid + ' は見つかりません');
        }
  });

  PluginManager.registerCommand(pluginName, "PlayVoice", function(args){
    var parameters = PluginManager.parameters('SH_PlaySEMZ');
    var seid = args.seid
    var sevolume = args.volume
    var sepan = args.pan
    var sepitch = args.pitch
    var voiceSwitch = Number(parameters.voiceswitch)
    if (sevolume == "default"){sevolume = parameters.defvolume}
    if (sevolume == "variable"){sevolume = $gameVariables.value(parameters.varvolume)}
    if(sevolume > 100){sevolume = 100}

    if(seid != -1 && $gameSwitches.value(voiceSwitch)){
        //var index = $dataUniques.selist.Id.indexOf(seid);

        //var sefile = $dataUniques.selist.File[index];
        var sefile = $dataUniques.talklist[seid] 
        console.log(sefile)
        AudioManager.playSe({
                    name: sefile,
                    volume: isNaN(sevolume) ? 90 : sevolume,
                    pitch: isNaN(sepitch) ? 100 : sepitch,
                    pan: isNaN(sepan) ? 0 : sepan
                  });
      }else{
        if(seid == -1)console.error(seid + ' は見つかりません');
      }
});


})();