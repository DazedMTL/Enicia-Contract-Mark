/*:
 * @target MZ
 * @plugindesc BGS再生プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *  PlayBGS 


 * @command PlayBGS
 * @text BGS再生
 * @desc jsonからBGSを読み込んで再生します。
 * @arg bgsid
 * @type string
 * @text BGSの種類
 * @desc BGSの種類を指定します。mapを選択した場合、マップ固有のBGSを呼び出します。
 *  
 * @arg volume
 * @type combo
 * @option default
 * @option variable
 * @default default
 * @max 100
 * @min 0
 * @text BGSボリューム
 * @desc BGSのボリュームを0-100で設定します。defaultにした場合自動設定されます。
 * 
 * @arg pitch
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * @text BGSピッチ
 * @desc BGSのピッチを設定します。
 * 
 * @arg pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * @text BGSパン
 * @desc BGSの定位を設定します。
 * 
 *  
 * 
 * @command PlayEventBGS
 * @text イベントBGS再生
 * @desc jsonからBGSを読み込んで再生します。ライン2。
 * @arg bgsid
 * @type string
 * @text BGSの種類
 * @desc BGSの種類を指定します。mapを選択した場合、マップ固有のBGSを呼び出します。
 *  
 * @arg volume
 * @type combo
 * @option default
 * @option variable
 * @default default
 * @max 100
 * @min 0
 * @text BGSボリューム
 * @desc BGSのボリュームを0-100で設定します。defaultにした場合自動設定されます。
 * 
 * @arg pitch
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * @text BGSピッチ
 * @desc BGSのピッチを設定します。
 * 
 * @arg pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * @text BGSパン
 * @desc BGSの定位を設定します。
 * 
 * 
 * 
 * @command PlayBGV
 * @text BGV再生
 * @desc jsonからBGVを読み込んで再生します。
 * @arg bgvid
 * @type string
 * @text BGVの種類
 * @desc BGVの種類を指定します。
 * 
 * @arg volume
 * @type combo
 * @option default
 * @option variable
 * @default default
 * @max 100
 * @min 0
 * @text BGVボリューム
 * @desc BGVのボリュームを0-100で設定します。defaultにした場合自動設定されます。
 * 
 * @arg pitch
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * @text BGVピッチ
 * @desc BGVのピッチを設定します。
 * 
 * @arg pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * @text BGVパン
 * @desc BGVの定位を設定します。
 * 
 * @command StopEventBGS
 * @text イベントBGS停止
 * @desc イベントBGS(Line2)を停止します。
 * 
 * 
 * @command StopBGV
 * @text BGV停止
 * @desc BGV(Line5)を停止します。
 * 
 *  
 * @param TimeVariable
 * @text Time
 * @desc 時間帯を決定する変数を指定
 * @default 31
 * @type number
 * 
 * @param varvolume
 * @text BGS音量制御用変数
 * @desc 音量制御に変数を指定した場合の変数番号です。
 * @default 52
 * @type variable
 * 
 * @param defvolume
 * @text BGSデフォルト音量
 * @desc デフォルトの音量です。
 * @default 20
 * @type number
 * @max 100
 * @min 0
 * 
 * @param defevevolume
 * @text イベントBGSデフォルト音量
 * @desc デフォルトの音量です。
 * @default 80
 * @type number
 * @max 100
 * @min 0
 * 
 * @param defbgvvolume
 * @text BGVデフォルト音量
 * @desc デフォルトの音量です。
 * @default 80
 * @type number
 * @max 100
 * @min 0
 * 
 * @param bgvswitch
 * @text BGVオンオフスイッチ
 * @desc BGVを有効化するスイッチを指定。
 * @default 1
 * @type switch
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


(() => {
  const pluginName = "SH_PlayBGSMZ";
  const parameters = PluginManager.parameters(pluginName);
  const defvolume = parameters.defvolume
  const defbgvvolume = parameters.defbgvvolume
  const defevevolume = parameters.defevevolume
  
  PluginManager.registerCommand(pluginName, "PlayBGS", function(args){
      
      var Time = Number(parameters['TimeVariable'])
      var bgsid = args.bgsid
      var bgsvolume = args.volume
      var bgspan = args.pan
      var bgspitch = args.pitch
      var args = {line:'1'}
      PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
      if (bgsid == "MAP"){bgsid = map}
      if (bgsvolume == "default"){bgsvolume = defvolume}
      if (bgsvolume == "variable"){bgsvolume = $gameVariables.value(parameters.varvolume)}
      if (bgsvolume > 100){bgsvolume = 100}
      if(bgsid == "map"){
        var nobgs = 1
        if($dataMap.meta.MAPBGS){bgsid = $dataMap.meta.MAPBGS;nobgs = 0}
        if($gameVariables.value(Time) >= 0 && $gameVariables.value(Time) < 2 && $dataMap.meta.MAPBGS){bgsid = $dataMap.meta.MAPBGS;nobgs = 0};
        if($gameVariables.value(Time) == 0 && $dataMap.meta.MAPBGS_M){bgsid = $dataMap.meta.MAPBGS_M;nobgs = 0};
        if($gameVariables.value(Time) == 2 && $dataMap.meta.MAPBGS_E){bgsid = $dataMap.meta.MAPBGS_E;nobgs = 0};
        if($gameVariables.value(Time) >= 3 && $dataMap.meta.MAPBGS_N){bgsid = $dataMap.meta.MAPBGS_N;nobgs = 0};
      }//戦闘中はエラーが出るかも
      
      if(nobgs == 1){//停止
        AudioManager.playBgs({
        name: "",
        volume: 0,
        pitch: 100,
        pan: 0
      });

      }

      if(bgsid != -1 && bgsid != "map"){
        //var index = $dataUniques.bgslist.Id.indexOf(bgsid);
        //var bgsfile = $dataUniques.bgslist.File[index];
        var bgsfile = $dataUniques.bgslist[bgsid]
        AudioManager.playBgs({
          name: bgsfile,
          volume: isNaN(bgsvolume) ? 90 : bgsvolume,
            pitch: isNaN(bgspitch) ? 100 : bgspitch,
            pan: isNaN(bgspan) ? 0 : bgspan
        });
      }else{
        if(bgsid != "map")console.error(bgsid + ' は見つかりません');
      }
      args = {line:'1'}
      PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
  });

    PluginManager.registerCommand(pluginName, "PlayEventBGS", function(args){
        var bgsid = args.bgsid
        var bgsvolume = args.volume
        var bgspan = args.pan
        var bgspitch = args.pitch
        var args = {line:'2'}
        if (bgsvolume == "default"){bgsvolume = defevevolume}
        if (bgsvolume == "variable"){bgsvolume = $gameVariables.value(parameters.varvolume)}
        if (bgsvolume > 100){bgsvolume = 100}
        PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
        if(bgsid != -1){
          //var index = $dataUniques.bgslist.Id.indexOf(bgsid);
        //var bgsfile = $dataUniques.bgslist.File[index];
        var bgsfile = $dataUniques.bgslist[bgsid]
          AudioManager.playBgs({
            name: bgsfile,
            volume: isNaN(bgsvolume) ? 90 : bgsvolume,
            pitch: isNaN(bgspitch) ? 100 : bgspitch,
            pan: isNaN(bgspan) ? 0 : bgspan
          });
        }else{
          console.error(bgsid + ' は見つかりません');
        }
        args = {line:'1'}
        PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
    });

  PluginManager.registerCommand(pluginName, "PlayBGV", function(args){
    var bgsid = args.bgvid
    var bgsvolume = args.volume
    var bgspan = args.pan
    var bgspitch = args.pitch
    var bgvSwitch = Number(parameters.bgvswitch)
    if (bgsvolume == "default"){bgsvolume = defbgvvolume}
    if (bgsvolume == "variable"){bgsvolume = $gameVariables.value(parameters.varvolume)}
    if (bgsvolume > 100){bgsvolume = 100}
    var args = {line : '5'}
    //console.log(args)
    PluginManager.callCommand(this,'ParallelBgs','CHANGE_LINE', args);
    if(bgsid != -1 && $gameSwitches.value(bgvSwitch) && $dataUniques.bgvlist[bgsid]){
      var index = $dataUniques.bgvlist[bgsid]
      var bgsfile = index.File;
      var noLoopFlag = index.noLoopFlag || 0;
      if(noLoopFlag == "on"){
        AudioManager.playMeEx({
          name: bgsfile,
          volume: isNaN(bgsvolume) ? 90 : bgsvolume,
          pitch: isNaN(bgspitch) ? 100 : bgspitch,
          pan: isNaN(bgspan) ? 0 : bgspan
        });
      }else{
        //var bgsfile = $dataUniques.bgvlist[bgsid]
        AudioManager.playBgs({
          name: bgsfile,
          volume: isNaN(bgsvolume) ? 90 : bgsvolume,
          pitch: isNaN(bgspitch) ? 100 : bgspitch,
          pan: isNaN(bgspan) ? 0 : bgspan
        });
      }
      
    }else{
      console.error(bgsid + ' は見つかりません');
    }
    args = {line:'1'}
    PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
});



PluginManager.registerCommand(pluginName, "StopEventBGS", function(args){//イベント用BGS(2)停止
  var args = {line:'2'}
  PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
  AudioManager.playBgs({
    name: "",
    volume: 0,
    pitch: 100,
    pan: 0
  });
  args = {line:'1'}
  PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
});

PluginManager.registerCommand(pluginName, "StopBGV", function(args){//イベント用BGV(5)停止
  var args = {line:'5'}
  PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
  AudioManager.playBgs({
    name: "",
    volume: 0,
    pitch: 100,
    pan: 0
  });
  args = {line:'1'}
  PluginManager.callCommand(this,"ParallelBgs","CHANGE_LINE", args);
});

// AudioManager.playMeEx = function(me) {
//   this.stopMe();
//   if (me.name) {
//       if (this._bgmBuffer && this._currentBgm) {
//           this._currentBgm.pos = this._bgmBuffer.seek();
//           this._bgmBuffer.stop();
//       }
//       this._meBuffer = this.createBuffer("bgs/", me.name);
//       this.updateMeParameters(me);
//       this._meBuffer.play(false);
//       this._meBuffer.addStopListener(this.stopMe.bind(this));
//   }
// };

  AudioManager.playMeEx = function(me) {//BGSフォルダからME再生中し、ME再生中はBGSをフェード
    this.stopMe();
    if (me.name) {
        if (this._bgsBuffer && this._currentBgs) {
            this._currentBgs.pos = this._bgsBuffer.seek();
            this._bgsBuffer.stop();
        }
        this._meBuffer = this.createBuffer("bgs/", me.name);
        this.updateMeParameters(me);
        this._meBuffer.play(false);
        this._meBuffer.addStopListener(this.stopMe.bind(this));
    }
  };


})();

