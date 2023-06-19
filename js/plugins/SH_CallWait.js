/*:
 * @target MZ
 * @plugindesc スキップ機能付き可変ウェイト
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CallWait [time]
 * @command CallWait
 * @text CallWait
 * @desc スキップ可能なウェイトを呼び出します。
 *
 * @arg time
 * @type number
 * @text ウェイト秒数
 * @desc 指定の数値ぶんウェイトします。
 */

(() => {
  const pluginName = "SH_CallWaitMZ";
  PluginManager.registerCommand(pluginName, "CallWait", function(args){
    let WaitTime = Number(args.time);    
    console.log(WaitTime)
    if(Input.isPressed('control')){
        //スキップ中
    }else{
      this.wait(WaitTime)
    }

    
  });
})();