/*:
 * @target MZ
 * @plugindesc BGM再生プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *  PlayBGM
 *  SetBattleBGM 


 * @command PlayBGM
 * @text BGM再生
 * @desc jsonからBGMを読み込んで再生します。
 * @arg bgmid
 * @type string
 * @text BGMの種類
 * @desc BGMの種類を指定します。mapを選択した場合、マップ固有のBGMを呼び出します。
 *  
 * @arg volume
 * @type combo
 
 * @option variable
 * @default default
 * @max 100
 * @min 0
 * @text BGMボリューム
 * @desc BGMのボリュームを0-100で設定します。defaultにした場合自動設定されます。
 * 
 * @arg pitch
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * @text BGMピッチ
 * @desc BGMのピッチを設定します。
 * 
 * @arg pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * @text BGMパン
 * @desc BGMの定位を設定します。
 * 
 *  
 * @command SetBattleBGM
 * @text 戦闘BGM設定
 * @desc jsonからBGMを読み込んで戦闘BGMに設定します。
 * 
 * @arg bbgmid
 * @type string
 * @text BGMの種類
 * @default BATTLE01
 * @desc 戦闘BGMの種類を指定します。
 *  
 * @arg bbgvolume
 * @type combo
 * @option default
 * @option variable
 * @default default
 * @max 100
 * @min 0
 * @text BGMボリューム
 * @desc BGMのボリュームを0-100で設定します。defaultにした場合自動設定されます。
 * 
 * @arg bbgpitch
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * @text BGMピッチ
 * @desc BGMのピッチを設定します。
 * 
 * @arg bbgpan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * @text BGMパン
 * @desc BGMの定位を設定します。
 *  
 * @param TimeVariable
 * @text Time
 * @desc 時間帯を決定する変数を指定
 * @default 31
 * @type number
 * 
 * @param varvolume
 * @text BGM音量制御用変数
 * @desc 音量制御に変数を指定した場合の変数番号です。
 * @default 51
 * @type variable
 * 
 * @param defvolume
 * @text BGMデフォルト音量
 * @desc デフォルトの音量です。
 * @default 80
 * @type number
 * @max 100
 * @min 0
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


(() => {
  const pluginName = "SH_PlayBGMMZ";
  PluginManager.registerCommand(pluginName, "PlayBGM", function(args){
      var parameters = PluginManager.parameters('SH_PlayBGMMZ');
      var Time = Number(parameters['TimeVariable'])
      var bgmid = args.bgmid
      var bgmvolume = args.volume
      var bgmpan = args.pan
      var bgmpitch = args.pitch
      if (bgmid == "MAP"){bgmid = "map"}
      if (bgmvolume = "default"){bgmvolume = parameters.defvolume}
      if (bgmvolume = "variable"){bgmvolume = $gameVariables.value(parameters.varvolume)}
      if (bgmvolume > 100){bgmvolume = 100}
      if(bgmid == "map"){
        if($dataMap.meta.MAPBGM){
          bgmid = $dataMap.meta.MAPBGM
          if($gameVariables.value(Time) >= 0 && $gameVariables.value(Time) < 2){bgmid = $dataMap.meta.MAPBGM};
          if($gameVariables.value(Time) == 2 && $dataMap.meta.MAPBGM_E){bgmid = $dataMap.meta.MAPBGM_E};
          if($gameVariables.value(Time) >= 3 && $dataMap.meta.MAPBGM_N){bgmid = $dataMap.meta.MAPBGM_N};
        }
      }//戦闘中はエラーが出るかも
      
      //console.log(bgmid)

      if(bgmid != -1 && bgmid != "map"){
        //var index = $dataUniques.bgmlist.Id.indexOf(bgmid);

          var bgmfile = $dataUniques.bgmlist[bgmid];
          //var bgmfile = $dataUniques.bgmlist[bgmid].File;
          AudioManager.playBgm({
                      name: bgmfile,
                      volume: isNaN(bgmvolume) ? 90 : bgmvolume,
                      pitch: isNaN(bgmpitch) ? 100 : bgmpitch,
                      pan: isNaN(bgmpan) ? 0 : bgmpan
                    });
        }else{
            //console.error(bgmid + ' は見つかりません');
        }
  });

  PluginManager.registerCommand(pluginName, "SetBattleBGM", function(args){
    var parameters = PluginManager.parameters('SH_PlayBGMMZ');
    var bgmid = args.bbgmid
    var bgmvolume = args.bbgvolume
    var bgmpan = args.bbgpan
    var bgmpitch = args.bbgpitch
    if (bgmvolume == "default"){bgmvolume = parameters.defvolume}
    if (bgmvolume == "variable"){bgmvolume = $gameVariables.value(parameters.varvolume)}
    if(bgmvolume > 100){bgmvolume = 100}
    if(bgmid == "valuable")bgmid = $gameVariables.value(740)
    console.log(bgmvolume)
    if(bgmid != -1){

      var bgmfile = $dataUniques.bgmlist[bgmid];
      $gameSystem.setBattleBgm({
        name: bgmfile,
        volume: isNaN(bgmvolume) ? 90 : bgmvolume,
        pitch: isNaN(bgmpitch) ? 100 : bgmpitch,
        pan: isNaN(bgmpan) ? 0 : bgmpan
        })
    }else{
        console.error(bgmid + ' は見つかりません');
    }
      
  });

})();