/*:
 * @target MZ
 * @plugindesc 時間経過
 * @author しもや
 * @help
 * 
 * 
 * 
 * @command ClockMinutes
 * @text 時間(分)を追加
 * @desc 時間(分)を追加
 * 
 * @arg Elapsed
 * @text 経過時間変数
 * @desc 経過時間変数
 * @default 29
 * @type variable
 *
 * 
 * @command ClockTimeZone
 * @text 時間帯を進める
 * @desc 時間帯を進める
 * 
 * @arg Elapsed
 * @text 進める時間帯
 * @desc 進める時間帯
 * @default 1
 * @type number
 * 
 * @command JustClock
 * @text 時間帯指定
 * @desc 時間帯指定
 * 
 * @arg Elapsed
 * @text 指定する時間帯
 * @desc 指定する時間帯
 * @default 0
 * @type number
 * 
 * @command ClockDay
 * @text 日数経過
 * @desc 日数経過。経過後の時間を指定する。
 * 
 * @arg Elapsed
 * @text 進める日数
 * @desc 進める日数
 * @default 1
 * @type number
 *
 * @arg Time
 * @text 日数経過後の時間(時)
 * @desc 日数経過後の時間
 * @default 7
 * @type number
 */


(() => {
  const pluginName = "SH_Clock";

  var MinutesVar = 33
  var TimeVar = 34
  var AddDayVar = 28//日数追加用変数番号
  var NowDay = 26
  var TimeZoneVar = 31
  var TimeZoneDispVar = 50
  var RefreshSwitch = 36
  var TimeLimit = 103
  var Deferment = 104
  var commonSwitch = 34

  var IconTime = 220


  //時間追加
  PluginManager.registerCommand(pluginName, "ClockMinutes", function(args){
    var Minutes = $gameVariables.value(MinutesVar)
    var Time = $gameVariables.value(TimeVar)
    var AddDay = 0

    //console.log(Time,Minutes)
    var Elapsed = $gameVariables.value(args.Elapsed)

    Minutes += Elapsed
    while(Minutes >= 60){Time += 1;Minutes -= 60}
    while(Time >= 24){AddDay += 1;Time -= 24}//日数経過フラグ

    TimeOutput(Minutes,Time,AddDay)
  });

  //時間帯を進める
  PluginManager.registerCommand(pluginName, "ClockTimeZone", function(args){
    var Minutes = $gameVariables.value(MinutesVar)
    
    var AddDay = 0

    var Elapsed = Number(args.Elapsed)

    if($gameVariables.value(TimeZoneVar) == 0)$gameVariables._data[TimeVar] = 7
    if($gameVariables.value(TimeZoneVar) == 1)$gameVariables._data[TimeVar] = 12
    if($gameVariables.value(TimeZoneVar) == 2)$gameVariables._data[TimeVar] = 17
    if($gameVariables.value(TimeZoneVar) == 3)$gameVariables._data[TimeVar] = 19
    if($gameVariables.value(TimeZoneVar) >= 4)$gameVariables._data[TimeVar] = 23
    var Time = $gameVariables.value(TimeVar)

    while(Elapsed >= 1){
      if(Time >= 23){Time = 6;Minutes = 0;AddDay += 1}
      else if(Time >= 19){Time = 23;Minutes = 0}
      else if(Time >= 17){Time = 19;Minutes = 0}
      else if(Time >= 12){Time = 17;Minutes = 0}
      else if(Time >= 6){Time = 12;Minutes = 0}
      else{Time = 6;Minutes = 0;AddDay += 1}
      Elapsed -= 1
    } 
    //変数出力
    //console.log(Time)
    TimeOutput(Minutes,Time,AddDay)
  });



  PluginManager.registerCommand(pluginName, "JustClock", function(args){//指定時間に変更
   
    var AddDay = 0

    var Elapsed = Number(args.Elapsed)

    if(Elapsed == 0){Time = 7;Minutes = 0}
    if(Elapsed == 1){Time = 12;Minutes = 0}
    if(Elapsed == 2){Time = 17;Minutes = 0}
    if(Elapsed == 3){Time = 19;Minutes = 0}
    if(Elapsed >= 4){Time = 23;Minutes = 0}

    //変数出力
    //console.log(Time)
    TimeOutput(Minutes,Time,AddDay)
  });


  //強制日数経過
  PluginManager.registerCommand(pluginName, "ClockDay", function(args){
    var MinutesVar = 33
    var TimeVar = 34
    var AddDayVar = 28//日数追加用変数番号
    var Minutes = $gameVariables.value(MinutesVar)
    var Time = $gameVariables.value(TimeVar)
    var AddDay = 0
    

    var Elapsed = Number(args.Elapsed)
    AddDay = Elapsed
    Time = Number(args.Time)
    Minutes = 0

    TimeOutput(Minutes,Time,AddDay)
  });

    //時間出力
    function TimeOutput(MinutesOut,TimeOut,AddDayOut){
        var BeforeTimeZone = $gameVariables.value(TimeZoneVar)//経過前の時間帯
        $gameSwitches.setValue(RefreshSwitch,false)//更新スイッチをオフ

        var DailyReset = 40//デイリーイベントリセット用スイッチ？
        $gameVariables._data[MinutesVar] = MinutesOut//分。たぶん未使用
        $gameVariables._data[TimeVar] = TimeOut//時。
        $gameVariables._data[AddDayVar] = AddDayOut//日。

        //寄付額など　できれば日数経過後の朝にひょぅじしたい
        if(AddDayOut >= 1){
            $TM.show('New day...')
            $gameVariables._data[NowDay] += AddDayOut//現在日数に加算。
            $gameSwitches.setValue(RefreshSwitch,true)
            $gameSwitches.setValue(DailyReset,true)
            $gameSwitches.setValue(commonSwitch,true)
            $gameSwitches.setValue(88,true)//おはようボイス用
            //console.log("寄付通過")
            $gameVariables._data[Deferment] = $gameVariables.value(TimeLimit) - $gameVariables.value(NowDay) //あと何日
            if($gameSwitches.value(1240)){$gameVariables._data[Deferment] = 999}
         }

        var AfterTimeZone = 0 
        var TimeString = ""
        if(TimeOut >= 23){AfterTimeZone = 4;TimeString = "Late Night"}
        else if(TimeOut >= 19){AfterTimeZone = 3;TimeString = "Night"}
        else if(TimeOut >= 17){AfterTimeZone = 2;TimeString= "Evening"}
        else if(TimeOut >= 12){AfterTimeZone = 1;TimeString = "Afternoon"}
        else if(TimeOut >= 6){AfterTimeZone = 0;TimeString = "Morning"}
        else{AfterTimeZone = 4;TimeString = "Late Night"}        

        $gameVariables._data[TimeZoneVar] = AfterTimeZone
        $gameVariables._data[TimeZoneDispVar] = TimeString

        


        var Icon = "\x1b\i[" + IconTime + "]"
        if($gameVariables.value(TimeZoneVar) != BeforeTimeZone){
          $gameVariables._data[40] = Icon + 'It is now \x1bc[6]\x1bv[50]\x1bc[0].';
          $gameSwitches.setValue(99,true)
          $gameSwitches.setValue(RefreshSwitch,true)
      }

    }











})();