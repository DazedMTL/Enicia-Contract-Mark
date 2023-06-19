/*:
 * @target MZ
 * @plugindesc 背景呼び出しプラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   DspBG


 * @command DspBG
 * @text 背景表示
 * @desc イベント用の背景を呼び出します。
 * @arg bgtype
 * @type string
 * @text 背景の種類
 * @desc 背景の種類を指定します。mapを選択した場合、マップ固有の背景を呼び出します。
 *  * 
 * @command EraceBG
 * @text 背景消去
 * @desc 背景を消去します。
 * 
 * 
 * @param TimeVariable
 * @text Time
 * @desc 時間帯を決定する変数を指定
 * @default 31
 * @type number
 * 
 * @param PictureId
 * @text PicId
 * @desc ピクチャ番号を指定
 * @default 5
 * @type number
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
  const pluginName = "SH_DspBgMZ";
  PluginManager.registerCommand(pluginName, "DspBG", function(args){
      var parameters = PluginManager.parameters('SH_DspBgMZ');
      var Time = Number(parameters['TimeVariable'])
      var PictureId = Number(parameters['PictureId'])
      var bgid = args.bgtype
      if(bgid == "map" || bgid == "MAP"){bgid = $dataMap.meta.MAPBG}//戦闘中はエラーが出るかも
      if($gameVariables.value(Time) <= 0 || $gameVariables.value(Time) >= 6){var CurrentTime = 'Midnight'};
      if($gameVariables.value(Time) >= 1 && $gameVariables.value(Time) < 4){var CurrentTime = 'Morning'};
      if($gameVariables.value(Time) == 4){var CurrentTime = 'Evening'};
      if($gameVariables.value(Time) == 5){var CurrentTime = 'Night'};
      if(bgid != -1){
          var bgfile =  "BG/" + $dataUniques.backgrounds[bgid][CurrentTime];
          $gameScreen.showPicture(PictureId,bgfile,0,0,0,100,100,255,0);
        }else{
            console.error(bgid + ' は見つかりません');
        }
  });

  PluginManager.registerCommand(pluginName, "EraceBG", function(args){
      var parameters = PluginManager.parameters('SH_DspBgMZ');
      var PictureId = Number(parameters['PictureId'])
      $gameScreen.erasePicture(PictureId)
    });
})();