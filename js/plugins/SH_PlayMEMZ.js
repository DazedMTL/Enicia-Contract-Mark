/*:
 * @target MZ
 * @plugindesc ME再生プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *  PlayME


 * @command PlayME
 * @text ME再生
 * @desc jsonからMEを読み込んで再生します。
 * @arg meid
 * @type string
 * @text MEの種類
 * @desc MEの種類を指定します。
 *  
 * @arg volume
 * @type combo
 * @option default
 * @option variable
 * @default default
 * @max 100
 * @min 0
 * @text MEボリューム
 * @desc MEのボリュームを0-100で設定します。defaultにした場合自動設定されます。
 * 
 * @arg pitch
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * @text MEピッチ
 * @desc MEのピッチを設定します。
 * 
 * @arg pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * @text MEパン
 * @desc MEの定位を設定します。
 * 
 *  
 
 * 
 * @param varvolume
 * @text ME音量制御用変数
 * @desc 音量制御に変数を指定した場合の変数番号です。
 * @default 53
 * @type variable
 * 
 * @param defvolume
 * @text MEデフォルト音量
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
  const pluginName = "SH_PlayMEMZ";
  PluginManager.registerCommand(pluginName, "PlayME", function(args){
      var parameters = PluginManager.parameters('SH_PlayMEMZ');
      var meid = args.meid
      var mevolume = args.volume
      var mepan = args.pan
      var mepitch = args.pitch
      if (mevolume == "default"){mevolume = parameters.defvolume}
      if (mevolume == "variable"){mevolume = $gameVariables.value(parameters.varvolume)}
      if(mevolume > 100){mevolume = 100}

      console.log(meid)

      if(meid != -1){
        console.log(meid)
        console.log($dataUniques.melist)
          var index = $dataUniques.melist.Id.indexOf(meid);

          var mefile = $dataUniques.melist.File[index];          
          AudioManager.playMe({
                      name: mefile,
                      volume: isNaN(mevolume) ? 90 : mevolume,
                      pitch: isNaN(mepitch) ? 100 : mepitch,
                      pan: isNaN(mepan) ? 0 : mepan
                    });
        }else{
            console.error(meid + ' は見つかりません');
        }
  });


})();