/* ---------------------------------------------------------------------------*
 * 2022/1/07 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc 立ち絵表示管理プラグイン拡張
 * @target MZ
 * @author kido
 * @help
 *
 *
 */

(() => {

  window.getCharacterPictureFileName = (actor, param) => {
    let actorId = actor._actorId;

    let str = 'Actor';   //ファイル名。以下で連結していく
    str += ('0' + actorId).slice(-2); // ゼロ埋め
    str += '_Pose';
    
    let poseNo = $gameVariables.value(1005)
    //ここでポーズ番号を取得する
    if(actorId == 1){
      if (poseNo == 0) {
        poseNo = 5
      }
    }else{
      poseNo = 1
    }
    
    
    str += ('0' + poseNo).slice(-2);

    if (actorId != 1) return str;  //エニシア以外はポーズで終わり?

    str += '_' + param.Type + '_'; // Body とか Socksとか

    let fileNo = getFileNo(actor, param);
    if (fileNo === null) return null;   //装備していないときとかそのパーツを描画する必要がないとき
    str += fileNo;

    return str;
  };

  //ここでファイル番号を取る処理をする。パーツごとにいろいろ違うはず
  function getFileNo(actor, param) {
    let fileNo = 1;
    let actorId = actor._actorId
    let equips = actor.equips();
    let poseNo = $gameVariables.value(1005)
    var stateIdMin = 191
    var stateIdMax = 220
    var zurashi = 222
    

    //ここで回想用にequipsを改変
    var forceCloth = null
    var Stripflag1 = null
    var Stripflag2 = null
    if($gameSwitches.value(2006)){//回想
      forceCloth = $gameVariables.value(775)
    }

    if(poseNo == 10){//踊り子衣装
      var dancerCloth = $gameVariables.value(550)
      Stripflag1 = $gameActors.actor(1).isStateAffected(176) ? true : false
      Stripflag2 = $gameActors.actor(1).isStateAffected(177) ? true : false
      forceCloth = "dancer"
      if(dancerCloth == 1)forceCloth = "sisterBunny"
      if(dancerCloth == 2)forceCloth = "sister"
    }
    if(forceCloth){
      var forceBody = null;var forceHead = null;var forceLeg = null
      if(forceCloth == "sister"){forceBody = Stripflag1 && Stripflag2 ? 294 : 5;//踊り子
        forceLeg = 22;
        if(equips[2] && equips[2].id == 27)forceHead = 27;
      }
      if(forceCloth == "bath"){forceBody = 7}
      if(forceCloth == "eroSister"){forceBody = 6;forceLeg = 22}
      if(forceCloth == "swim"){forceBody = 10;forceLeg = 22}
      if(forceCloth == "whiteSwim"){forceBody = 16}
      if(forceCloth == "naked"){forceLeg = 22}
      if(forceCloth == "sisterBunny"){forceBody = Stripflag1 && Stripflag2 ? 295 : 11;//踊り子
        forceHead = 28;forceLeg = 24}
      if(forceCloth == "prostisute"){forceBody = 13;forceLeg = 24}
      if(forceCloth == "maid"){forceBody = 12;forceLeg = 22}
      if(forceCloth == "dancer"){forceBody = 15;forceHead = 34;
        if(Stripflag1 && !Stripflag2)forceBody = 291
        if(!Stripflag1 && Stripflag2)forceBody = 292
        if(Stripflag1 && Stripflag2)forceBody = 293
      }
      if(forceCloth == "bondage"){forceBody = 18;}
      equips[1] = forceBody ? $dataArmors[forceBody] : null
      equips[2] = forceHead ? $dataArmors[forceHead] : null
      equips[3] = forceLeg ? $dataArmors[forceLeg] : null
    }


    if (param.Type == 'Body') {      
      fileNo = equips[3] ? equips[3].meta.leg : '1'
      if(poseNo == 10 && dancerCloth == 0)fileNo = 3
    } else if (param.Type == 'Standback') {
      return null;//なし

    } else if (param.Type == 'BodyLower') {//下半身分離型
      if (poseNo != 4 && poseNo != 3) return null;  //ポーズ4以外
      fileNo = equips[3] ? equips[3].meta.leg : '1'//食い込み判定タグ

    } else if (param.Type == 'Arm') {
      //現状1のみ
      if (poseNo == 10) return null;
      if (poseNo == 3) return null;
      if (poseNo == 2){
        var ArmNo = 1
        for (let i = 196; i <= 201; i++) {
          if ($gameActors.actor(actorId).isStateAffected(i)) { 
            ArmNo = Number($dataStates[i].meta.ArmPosi);
            break;
          }
        }
        fileNo = ArmNo
        //console.log(fileNo)
      }

    } else if (param.Type == 'Socks') {
      if (poseNo == 10) return null;
      if (!equips[3]) return null;  //脚パーツを装備していない
      if (equips[3] && equips[3].meta["invisible"]) return null;  //脚パーツを装備していない
      if (equips[1] && equips[1].meta.SolidLeg && poseNo == 4){//ポーズ番号は一旦4のみ。全対応させる
        fileNo = equips[1].meta.SolidLeg//脚パーツ固定タグ
      } else{
        fileNo = equips[3].meta.StandNo;  //メモ欄にファイル番号を入れている前提
      }

    } else if (param.Type == 'Cloth') {
      if(poseNo == 5 && $gameActors.actor(actorId).isStateAffected(98)){
        fileNo = 15//妊娠
        return ('000' + fileNo).slice(-4);
      }

      if (!equips[1] || !equips[1].meta.StandNo )return null;  //衣装パーツを装備していない
      fileNo = equips[1].meta.StandNo
      //メモ欄にファイル番号を入れている前提


    } else if (param.Type == 'ClothArm') {
      if (poseNo == 10) return null;
      if (!equips[1]) return null;  //衣装パーツを装備していない
      if (equips[1].meta.Arm == '0') return null;  //衣装パーツを装備しているが袖なし
      if(poseNo == 4){
        fileNo = Number(equips[1].meta.Arm);  //メモ欄にファイル番号を入れている前提
      }else if(poseNo == 2){
        fileNo = Number(equips[1].meta.Arm);  //メモ欄にファイル番号を入れている前提
        var baseArmNo = 0;
        //var i = 198
        //if($gameActors.actor(actorId).isStateAffected(i))//おなぬの場合        
        for (let i = 196; i <= 201; i++) {
          if ($gameActors.actor(actorId).isStateAffected(i)) {  //101～150が表情ステート
            baseArmNo = Number($dataStates[i].meta.BaseArmNum);
            break;
          }
        }
        fileNo += baseArmNo
      }else{//適合ポーズ以外
        return null;
      } 
      
      
    } else if (param.Type == 'Under0') {//下着。いずれ別でフラグを用意
      if (poseNo == 10) return null;//踊り子専用立ち絵
      if (poseNo == 3 && equips[1] && equips[1].meta.pose3Under || poseNo == 4 && equips[1] && equips[1].meta.pose3Under){//ポーズ3か4
        fileNo = !$gameSwitches.value(zurashi) ? equips[1].meta.pose3Under : equips[1].meta.pose3Under2
      } else if (equips[1] && equips[1].meta.Under == '1') {//アンダーフラグが1の場合、普通の下着
        fileNo = 1
      } else if (!equips[1]) {//全裸の場合。とりあえず現状は下着強制装備
        return null
      } else {
        return null//0の場合下着なし
      }

    } else if (param.Type == 'Cloth_n_Back') {
      if (!equips[2]) return null;  //頭パーツを装備していない
      if (poseNo == 4 || poseNo == 3) return null;  //ポーズ4|3の場合一旦なし　空の画像でも用意したほうがいいかも
      if (equips[2].meta.HeadType == 'Hat') {
        fileNo = equips[2].meta.StandNo
      } else {
        return null;
      }

    } else if (param.Type == 'Backhair') {//うしろ髪。頭用装備のメモ欄から判定
      fileNo = equips[2] ? equips[2].meta.Backhair : '1';  //メモ欄にファイル番号を入れている前提

    } else if (param.Type == 'Fronthair') {//前髪。基本固定だが、ポーズによってはベールなどを装備した時用のものが必要
      fileNo = equips[2] ? equips[2].meta.Fronthair : '1';  //メモ欄にファイル番号を入れている前提

    } else if (param.Type == 'Headacc') {//頭装備（ヴェールなど）
      if (equips[2] && equips[2].meta.HeadType == 'Hat') {
        fileNo = equips[2] ? equips[2].meta.StandNo : '1';//なにもない場合アホ毛
      }

    } else if (param.Type == 'Headacc2') {//頭装備（ヘアピンやリボンなど前髪の干渉のないもの）
      if (!equips[2]) return null;//特定ポーズか頭パーツを装備していない
      if (equips[2] && equips[2].meta.HeadType == 'Acc') {
        fileNo = equips[2].meta.StandNo
      } else {
        return null
      }
    } else if (param.Type == 'Headacc3') {//頭装備（衣装に付属するもの
      if (poseNo == 3) return null;//特定ポーズで表示なし
      if (equips[1] && equips[1].meta.FaceOpt) {
        fileNo = equips[1].meta.FaceOpt
      } else {
        return null
      }
    } else if (param.Type == 'earrings') {//頭装備（衣装に付属するもの
      if (poseNo == 4 || poseNo == 3 || poseNo == 10) return null;//特定ポーズで表示なし
      if ($gameActors.actor(1).hasArmor($dataArmors[196])) {
        fileNo = 1
      } else {
        return null
      }

    } else if (param.Type == 'Headacc4') {//モモコ　5のみ
      if (poseNo != 5) return null;//特定ポーズで表示なし// || $gameParty.hasItem($dataItems[810])シナリオではとりあえずいい
      if ($gameActors.actor(1).hasArmor($dataArmors[37])) {
        fileNo = 1
      } else if($gameActors.actor(1).hasArmor($dataArmors[38])){
        fileNo = 2
      } else {
        return null
      }
    } else if (param.Type == 'Face') {//表情。ステートで判定。サブキャラの場合は処理を変えるかも
      if (poseNo == 3) return null;//バックなので
      //表情はステートIDが大きい方を優先する
      //ステートは優先度順に並んでいる。優先度が同じ場合ステートIDの小さい順になるので配列の末尾から表情のステートを探す

      //各種条件

      
      if(poseNo == 5){
        var semen = $gameVariables.value(181) + $gameVariables.value(182) + $gameVariables.value(183) + $gameVariables.value(184)
        if($gameMap && $dataMap.meta["defaultFace"])fileNo = Number($dataMap.meta.defaultFace)//マップごとのデフォルト表情
        if($gameParty.inBattle())fileNo = 7;//戦闘中
        if($gameActors.actor(actorId).isStateAffected(16) || $gameActors.actor(actorId).isStateAffected(4))fileNo = 4;//毒
        if(semen >= 1)fileNo = 31;//精液
        if($gameActors.actor(actorId).isStateAffected(9))fileNo = 38;//魅了
        if($gameActors.actor(actorId).isStateAffected(57))fileNo = 35;//発情中
        if($gameActors.actor(actorId).isStateAffected(10))fileNo = 12;//睡眠
      }
      
      
      
      //表情ステート
      let states = actor.states();
      for (let i = states.length - 1; i >= 0; i--) {
        if (states[i].id >= 101 && states[i].id <= 150) {  //101～150が表情ステート
          fileNo = states[i].id - 100;
          break;
        }
      }


    //-------------------------------------------
    //立ち絵エロなど
    } else if (param.Type == 'SemenBody') {//精液
      if (poseNo == 10) return null;
      if($gameVariables.value(181) < 1){
        return null
      }else{
        if($gameVariables.value(181) >= 3){
          $gameVariables._data[181] = 3
        }
        fileNo = $gameVariables.value(181)
      }
      //いったんオフ

    } else if (param.Type == 'SemenVagina') {//精液
      if (poseNo == 10) return null;
      if($gameVariables.value(182) < 1){
        return null
      }else{
        if($gameVariables.value(182) >= 1){
          $gameVariables._data[182] = 1
        }
        fileNo = $gameVariables.value(182)
      }
      
    } else if (param.Type == 'SemenAnus') {//精液
      if (poseNo == 10) return null;
      if($gameVariables.value(183) < 1){
        return null
      }else{
        if($gameVariables.value(183) >= 1){
          $gameVariables._data[183] = 1
        }
        fileNo = $gameVariables.value(183)
      }
    } else if (param.Type == 'SemenFace') {//精液
      if (poseNo == 10) return null;
      if($gameVariables.value(184) < 1){
        return null
      }else{
        if($gameVariables.value(184) >= 1){
          $gameVariables._data[184] = 1
        }
        fileNo = $gameVariables.value(184)
      }
    } else if (param.Type == 'SemenMouth') {//精液
      if (poseNo == 10) return null;
      //いったんオフ
      return null
      if($gameVariables.value(185) < 1 || poseNo == 5){
        return null
      }

    } else if (param.Type == 'Breath') {//吐息　スイッチorステートで制御したい
      if($gameActors.actor(actorId).isStateAffected(57) || $gameActors.actor(actorId).isStateAffected(186)){//発情中
        fileNo = 1;
      }else{
        return null
      }
      
    } else if (param.Type == 'Mark') {//契約紋　進行で服の上に発光を重ねるのも面白いかも
      if (poseNo == 10 || poseNo == 3) return null;
      //いったんオフ
      var mark = $gameVariables.value(187)//契約紋の数
      if(!mark)return null
      fileNo = 1;



    } else if (param.Type == 'Front') {//前側。
      if (poseNo == 10) return null;
      let states = actor.states();
      let flag = 0//ステート存在フラグ
      for (let i = states.length - 1; i >= 0; i--) {
        if (states[i].id >= stateIdMin && states[i].id <= stateIdMax) {  //191～200が竿ステート
          if (poseNo == Number($dataStates[states[i].id].meta.Pose)) {//メタに設定されたPoseと現在のPoseが一致
            if($dataStates[states[i].id].meta.FrontNo){//FrontNoが存在する時
              fileNo = $dataStates[states[i].id].meta.FrontNo
              flag = 1
            }else{
              return null
            }
          } else {
            return null
          }
          break;
        }
      }
      if(flag == 0){
        return null
      }     
    }else if (param.Type == 'Behind') { 
      if (poseNo == 10) return null;
      let states = actor.states();
      let flag = 0//ステート存在フラグ
      for (let i = states.length - 1; i >= 0; i--) {
        if (states[i].id >= stateIdMin && states[i].id <= stateIdMax) {  //191～200が竿ステート
          if (poseNo == Number($dataStates[states[i].id].meta.Pose)) {//メタに設定されたPoseと現在のPoseが一致
            if($dataStates[states[i].id].meta.BehindNo){//BehindNoが存在する時
              fileNo = $dataStates[states[i].id].meta.BehindNo
              flag = 1
            }else{
              return null
            }
          } else {
            return null
          }
          break;
        }
      }
      if(flag == 0){
        return null
      }
    } else if (param.Type == 'Mid') { 
      if (poseNo == 10) return null;  
      let states = actor.states();
      let flag = 0//ステート存在フラグ
      for (let i = states.length - 1; i >= 0; i--) {
        if (states[i].id >= stateIdMin && states[i].id <= stateIdMax) {  //191～200が竿ステート
          if (poseNo == Number($dataStates[states[i].id].meta.Pose)) {//メタに設定されたPoseと現在のPoseが一致
            if($dataStates[states[i].id].meta.MidNo){//BehindNoが存在する時
              fileNo = $dataStates[states[i].id].meta.MidNo
              flag = 1
              //console.log("mid通過")
            }else{
              return null
            }
          } else {
            return null
          }
          break;
        }
      }
      if(flag == 0){
        return null
      }
    }

    




    //-------------------------------------------
    return ('000' + fileNo).slice(-4);
  }

  //ポーズによってレイヤー順を変えたい
  Sprite_StandPicture.prototype.updateLayers = function () {
    if (this._pictures._actor._actorId == 1) {  //エニシアのときだけ
      let poseNo = $gameVariables.value(1005);
      //デフォルトのレイヤーの並び定義
      let layers = ['Standback', 'Cloth_n_Back', 'Backhair', 'Body','earrings','Mark', 'Arm', 'Under0', 'Socks', 'SemenAnus','SemenVagina','Cloth', 'Fronthair', 'Face', 'Headacc2', 'Headacc','SemenBody','SemenFace','Breath'];
      if (poseNo == 2) {
        //レイヤー順を替えたい場合、自由に並び替える
        layers = ['Standback', 'Cloth_n_Back', 'Backhair', 'Body','earrings','Mark', 'Under0', 'Socks', 'SemenAnus','SemenVagina','Cloth', 'Fronthair', 'Face', 'Headacc2', 'Headacc','Arm', 'ClothArm' ,'SemenBody','SemenFace','Breath','Front'];
      }
      if (poseNo == 3) {
        //レイヤー順を替えたい場合、自由に並び替える
        layers = ['Standback','Behind',  'Breath','Fronthair', 'Body', 'Cloth', 'Backhair', 'Headacc2', 'Headacc' ,'SemenFace','Arm','Mid','BodyLower' , 'Under0', 'SemenAnus','SemenVagina','Socks','SemenBody','Front'];
      }
      if (poseNo == 4) {
        //レイヤー順を替えたい場合、自由に並び替える
        layers = ['Standback','Behind', 'Cloth_n_Back', 'Backhair', 'Body','Mark', 'Cloth', 'Fronthair', 'Face', 'Headacc2', 'Headacc' ,'SemenBody','SemenFace','Arm', 'ClothArm' ,'BodyLower' , 'Under0', 'SemenAnus','SemenVagina','Socks','Breath','Front'];
      }
      for (let i = 0; i < layers.length; i++) {
        for (let j = 0; j < this.children.length; j++) {
          if (this.children[j]._picture.Type == layers[i]) {
            this.setChildIndex(this.children[j], i);
            break;
          }
        }
      }
    }
    return this._base;
  };


  //ポーズによって座標を変えたい
  StandPictureParam.prototype.getBasePoint = function () {
    if (this._actor._actorId == 1) {  //エニシアのときだけ
      let poseNo = $gameVariables.value(1005);
      SH_getAnimePoint()
      if (poseNo == 2) return { X: 900, Y: 50 };
      if (poseNo == 3 && $gameSwitches.value(230)) return { X: 800, Y: -20};
      if (poseNo == 3) return { X: 300, Y: -20 };
      if (poseNo == 4) return { X: 600, Y: 50 };
    }
   
    return this._base;
  };

})();

function SH_getAnimePoint(){//ポーズごとのアニメーションの座標
  let poseNo = $gameVariables.value(1005);
  var x = 650;var y = 450
  if (poseNo == 2) { x = 1050};
  if (poseNo == 3) { x = 650};
  if (poseNo == 4) { x = 900};
  $gameVariables._data[16] = x
  $gameVariables._data[17] = y
}


function SH_changePoseEro(id){
  let actor = $gameActors.actor(1)
  let states = actor.states();
  var stateIdMin = 191
  var stateIdMax = 220
  if(id && id >= 1){
    $gameActors.actor(actor._actorId).addState(id)//idが1以上の場合そのステートに変更
  }
  for (let i = states.length - 1; i >= 0; i--) {
    if (states[i].id >= stateIdMin && states[i].id <= stateIdMax) {  //191～200が竿ステート
      //console.log(id,states[i].id)
      if(states[i].id != id || !id) $gameActors.actor(actor._actorId).removeState(states[i].id)
    }  
  }
}


