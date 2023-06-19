/*:
 * @target MZ
 * @plugindesc マップ名表示
 * @author しもや
 * @help
 * 
 * 
 * 
 * @command DisMapName
 * @text マップ名を出す
 * @desc マップ名を出す
 * 
 * 
 * 
 * @param before
 * @type variable
 * @default 308
 * @desc 前のマップ名を格納する変数を指定します。
 * @text 前のマップ名
 * 
 * 
 */


(() => {
    const pluginName = "SH_AutoMapName"; 

    PluginManager.registerCommand(pluginName, "DisMapName", function(args){
        var parameters = PluginManager.parameters(pluginName);
        var MapName = $dataMapInfos[$gameMap.mapId()].name;
        var BeforeMapVar = Number(parameters['before'])
        var Before = $gameVariables.value(BeforeMapVar)

        if(!$dataMap.meta.NOMAPNAME || MapName != Before){
            
            $TM.show(MapName)
        }  
        $gameVariables._data[BeforeMapVar] = MapName

    });
  })();