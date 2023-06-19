/*:
 * @target MZ
 * @plugindesc 表情指定
 * @author しもや
 * @help
 * 色んな処理します。
 * 
 * @command FaceId
 * @text 表情番号
 * @desc 1.微笑 2.無表 3.口開 4.不安 5.喜 6.驚 7.真顔 8.焦 9.疲 10.恐縮
 * 11.困笑 12.閉 13.戦 14.落 15.痛 16.ﾄﾞﾔ 17.ｼﾞﾄ 18.点 19.引 20.怒
 * @arg id
 * @type number
 * @default 1

 * 

 * 
 */



(() => {
  'use strict';
  const pluginName = "SH_FaceId";
  PluginManager.registerCommand(pluginName, "FaceId", function(args){
        var faceid = 0
        faceid = Number(args.id)
        if(faceid === 0){
          faceid = 1
        }

        for (var i = 101; i < 151; i++) {
            $gameActors.actor(1).removeState(i)
          }
        

        $gameVariables._data[1011] = faceid

        
        $gameActors.actor(1).addState(faceid+100)



});




})();
