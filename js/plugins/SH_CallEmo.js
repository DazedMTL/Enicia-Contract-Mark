/*:
 * @target MZ
 * @plugindesc 感情プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CallEmo
 * @command CallEmo
 * @text CallEmotion
 * @desc 感情エフェクトです。
 *
 */


(() => {
  const pluginName = "SH_CallEmo";
  PluginManager.registerCommand(pluginName, "CallEmo", function(args){

    console.log("開始")
      //立ち絵基本座標
      var Emo1X = 940
      var Emo1Y = 150
//      var EmoBase = 60
//      var FileName = "EMO/" + "emo05_01"//ファイル名指定
//      if($gameScreen.picture(EmoBase) && $gameScreen.picture(EmoBase)._name == FileName){
        //既に同じファイル名が表示されてる場合はスルー
//      }else{
//        $gameScreen.showPicture(EmoBase,FileName,0,Emo1X,Emo1Y,100,100,255,0)
//      }


        if(SceneManager._scene.Emo1) {//既に表示がある場合消す処理//シーン名変更
        SceneManager._scene._spriteset.removeChild(SceneManager._scene.Emo1)//シーン名変更
        SceneManager._scene.Emo1 = null;//シーン名変更
      }

        var FileName = "EMO/" + "emo31_01"//ファイル名指定
        var bitmap = ImageManager.loadPicture(FileName);//ファイル名
        var spriteBase = new Sprite(bitmap);//スプライト名
        SceneManager._scene._spriteset.addChild(spriteBase); spriteBase.x = Emo1X; spriteBase.y = Emo1Y;//スプライト名
        SceneManager._scene.Emo1 = spriteBase;//シーン名、スプライト名
        //ウェイト後消去
        var emotime = 0;
        var wait = setInterval(function() {
        console.log(emotime);
        emotime++;
        //終了条件
        if (emotime == 10) {
        clearInterval(wait);
        if(SceneManager._scene.Emo1) {//既に表示がある場合消す処理//シーン名変更
            SceneManager._scene._spriteset.removeChild(SceneManager._scene.Emo1)//シーン名変更
            SceneManager._scene.Emo1 = null;//シーン名変更
        }
        }
    }, 200);

    
  });
})();