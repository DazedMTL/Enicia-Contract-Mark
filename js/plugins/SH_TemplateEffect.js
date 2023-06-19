/*:
 * @target MZ
 * @plugindesc テンプレートエフェクト
 * @author しもや
 * @help　よく使うエフェクト



 * @command TEF
 * @text テンプレエフェクト
 * @desc エフェクトをあれします。
 * 
 * @arg effect
 * @type string
 * @text エフェクト名
 * @desc エフェクト名
 *  
 * 
 * 
 * 
 */


(() => {
    const pluginName = "SH_TemplateEffect";
    PluginManager.registerCommand(pluginName, "TEF", function(args){
        var effectType = args.effect
        var wait = 0
        var flash = 0 
        var sename = 0
        var switchOn = null

        if(effectType == "semen"){
            var min = 1;var max = 9;
            var number = Math.floor( Math.random() * (max + 1 - min) ) + min ;
            var ret = ( '00' + number ).slice( -2 );
            flash = "white"
            wait = 20
            sename = "semen" + ret
            switchOn = 242
        }
        if(effectType == "extasy"){
            flash = "pink"
            wait = 40
        }
        if(effectType == "insert"){
            flash = "white"
            wait = 40
            sename = "insert02"
        }
        if(effectType == "pullout"){
            flash = "white"
            wait = 40
            sename = "pullout01"
        }
        if(effectType == "wetTouch"){
            wait = 40
            sename = "insert01"
        }
        if(effectType == "insertVargin"){
            flash = "red"
            wait = 40
            sename = "insert02"
        }
        if(effectType == "penetration"){
            flash = "red"
            wait = 40
            sename = "sting02"
        }
        if(effectType == "camera"){
            flash = "white"
            wait = 40
            sename = "camera01"
        }

        if(sename != 0){//SE

            //console.log("ok")
            var args = {seid:sename,volume:"default",pitch:100,pan:0}
            PluginManager.callCommand(this,"SH_PlaySEMZ","PlaySE", args);
        }
        if(switchOn)$gameSwitches.setValue(242,true)

        if(flash != 0){//Flash
            if(flash == "white"){
                $gameScreen.startFlash([255,255,255,120], wait)//ホワイト
            }else if(flash == "pink"){
                $gameScreen.startFlash([255,153,153,120], wait)//ビンク
            }else if(flash == "red"){
                $gameScreen.startFlash([255,0,0,120], wait)//ビンク
            }else if(flash == "purple"){
                $gameScreen.startFlash([128,0,128,120], wait)//パープル
            }else if(flash == "yellow"){
                $gameScreen.startFlash([255,255,0,120], wait)//イエロー
            }else if(flash == "black"){
                $gameScreen.startFlash([0,0,0,120], wait)//ブラック
            }else if(flash == "blue"){
                $gameScreen.startFlash([0,0,255,120], wait)//ブルー
            }            
        }

        if(wait >= 1){//Wait
            this.wait(wait)
        }



      });
  })();