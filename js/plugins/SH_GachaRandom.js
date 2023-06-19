/*:
 * @target MZ
 * @plugindesc ランダムトレジャー入手
 * @author しもや
 * @help
 * 確率などを設定してランダムでアイテム獲得
 * 
 * @command getRandom
 * @text アイテム入手の処理
 * @desc アイテム入手の処理
 * 
 * @arg rarity
 * @text レア率
 * @desc レア率　変数指定の場合そちらが優先
 * @type struct<Rare>
 * 
 * @arg tag
 * @text 出現アイテムタグ
 * @desc どのタグのアイテムがどの程度の確率で出るか。
 * @type struct<box>
 * 
 * @arg gettime
 * @text 入手回数。変数指定の場合そちらを優先
 * @desc 入手回数
 * @default 1
 * @type string
 * 
 * @arg rareVar
 * @text レア率（変数）
 * @desc 構造体形式
 * @default 0
 * @type variable
 * 
 * @arg gettimeVar
 * @text 入手回数（変数）
 * @desc 入手回数。変数番号を指定
 * @default 0
 * @type variable
 *
 * 
 * 
 * @param itemTag
 * @text タグを登録
 * @desc タグ
 * @type struct<itemTag>[]
 * 
 *  
 * @arg select
 * @text 選出のみにするかのフラグ。入手はせずアイテム情報のみを変数に返す
 * @desc 指定しない場合通常のガチャ
 * @default 0
 * @type variable
 */ 
 /*~struct~Rare:
 * @param common
 * @text C
 * @desc C
 * @default 50
 * @type number
 * @decimals 1
 * 
 * @param unCommon
 * @text UC
 * @desc UC
 * @default 30
 * @type number
 * @decimals 1
 * 
 * @param rare
 * @text R
 * @desc R
 * @default 11
 * @type number
 * @decimals 1
 * 
 * @param superRare
 * @text SR
 * @desc SR
 * @default 6
 * @type number
 * @decimals 1
 * 
 * @param ssr
 * @text SSR
 * @desc SSR
 * @default 2.5
 * @type number
 * @decimals 1
 * 
 * @param ur
 * @text UR
 * @desc UR
 * @default 0.5
 * @type number
 * @decimals 1
 */
/*~struct~box:
 * @param tag1
 * @text アイテムタグ1
 * @desc アイテムタグ
 * @type string
 * 
 * @param tag1rate
 * @text 出現率
 * @desc 出現率
 * @default 50
 * @type number
 * @decimals 1
 * 
 * @param tag2
 * @text アイテムタグ2
 * @desc アイテムタグ
 * @type string
 * 
 * @param tag2rate
 * @text 出現率
 * @desc 出現率
 * @default 0
 * @type number
 * @decimals 1
 * 
 * 
 * @param tag3
 * @text アイテムタグ3
 * @desc アイテムタグ
 * @type string
 * 
 * @param tag3rate
 * @text 出現率
 * @desc 出現率
 * @default 0
 * @type number
 * @decimals 1
 * 
 * @param tag4
 * @text アイテムタグ4
 * @desc アイテムタグ
 * @type string
 * 
 * @param tag4rate
 * @text 出現率
 * @desc 出現率
 * @default 0
 * @type number
 * @decimals 1
 * 
 * @param tag5
 * @text アイテムタグ5
 * @desc アイテムタグ
 * @type string
 * 
 * @param tag5rate
 * @text 出現率
 * @desc 出現率
 * @default 0
 * @type number
 * @decimals 1
 * 
 * @param tag6
 * @text アイテムタグ6
 * @desc アイテムタグ
 * @type string
 * 
 * @param tag6rate
 * @text 出現率
 * @desc 出現率
 * @default 0
 * @type number
 * @decimals 1
 * 
 * @param tag7
 * @text アイテムタグ7
 * @desc アイテムタグ
 * @type string
 * 
 * @param tag7rate
 * @text 出現率
 * @desc 出現率
 * @default 0
 * @type number
 * @decimals 1
 * 
 * @param tag8
 * @text アイテムタグ8
 * @desc アイテムタグ
 * @type string
 * 
 * @param tag8rate
 * @text 出現率
 * @desc 出現率
 * @default 0
 * @type number
 * @decimals 1
 */
/*~struct~itemTag:
 * @param tag
 * @text アイテムタグ
 * @desc アイテムタグ
 * @type string
 * 
 * @param tagType
 * @text 種別
 * @desc 種別
 * @default item
 * @type select
 * @option item
 * @option weapon
 * @option armor
 */

  
(() => {
  const pluginName = "SH_GachaRandom";
  var parameters = PluginManager.parameters(pluginName);
  PluginManager.registerCommand(pluginName, "getRandom", function(args){
    $gameSwitches.setValue(66,true)
    var tag = JsonEx.parse(args.tag)
    var rarity = JsonEx.parse(args.rarity)
    if(args.rareVar && $gameVariables.value(Number(args.rareVar)) != 0){
      var rareVar = $gameVariables.value(Number(args.rareVar))
      rarity.common = rareVar.common || 0
      rarity.unCommon = rareVar.unCommon || 0
      rarity.rare = rareVar.rare || 0
      rarity.superRare = rareVar.sr || 0
      rarity.ssr = rareVar.ssr || 0
      rarity.ur = rareVar.ur || 0
    }

    
    
    var gettime = Number(args.gettime)//入手回数
    if(args.gettimeVar)gettime = $gameVariables.value(Number(args.gettimeVar))
    if(gettime <= 0)gettime = 1

    $gameVariables._data[Number(args.gettimeVar)] = 0//ゲーム変数をリセットしておく
    $gameVariables._data[Number(args.rareVar)] = 0

    var table = SH_gachaRarity(rarity) //各レアリティと確率を読み込む
    var selectFlag = Number(args.select) >= 1 ? Number(args.select) : 0
    while(gettime >= 1){
      var treasure = SH_gachaTag(tag)//指定したタグの出現率から抽選し、パラメータから種別を判定
      SH_getItemGachaRandom2(treasure[1],treasure[0],table,selectFlag)//一致するタグと種別のアイテムを抽選
      gettime -= 1
    }
  });

  

  function SH_getItemGachaRandom2(type,tag,table,selectFlag){
    //typeは種類、tagはfoodなどの特定タグ
    if(type == 'item'){var item = $dataItems};
    if(type == 'weapon'){var item = $dataWeapons};
    if(type == 'armor'){var item = $dataArmors};
    console.log(tag)
    var rare = SH_gacha(table)//レア度を決定
    var itemArray = []
    itemArray = SH_GachaItemTagSearch(item,tag,rare)
    //console.log(type,tag,table,selectFlag)
    var count = 0
    while (itemArray.length == 0) {//ないことを許容する場合コメントアウト
      rare = SH_gacha(table)
      //console.log(rare)
      itemArray = SH_GachaItemTagSearch(item,tag,rare)
      count += 1
      //console.log(count)
      if(count >= 50)break;//緊急避難
    }
    if(itemArray.length == 0){
      console.log("ない")//存在しない場合
      if(selectFlag >= 1)$gameVariables._data[selectFlag] = [805,'item']
    }else{//存在する
      var itemObj = SH_randomArray(itemArray)//配列の中からランダム抽出
      itemId = itemObj.id
      if(selectFlag >= 1){
        $gameVariables._data[selectFlag] = [itemId,type]
        console.log($gameVariables.value(selectFlag))
      }else{
        //レア時の演出
        var seName = "SH_Itempick"
        if(rare == "R")seName = "Ikaruga_s_076"
        if(rare == "SR")seName = "Ikaruga_s_076"
        if(rare == "SSR")seName = "Ikaruga_s_072"
        if(rare == "UR")seName = "Ikaruga_s_057"
        $gameSystem.ticker.getItemSE = {"name":seName,"volume":"90","pitch":"100","pan":"0"}
        //入手
        $gameSwitches.setValue(66,true)      
        if(type == 'item' && itemId >= 1)Game_Interpreter.prototype.command126(params2 = [itemId,0,0,1,false]);
        if(type == 'weapon' && itemId >= 1)Game_Interpreter.prototype.command127 (params2 = [itemId,0,0,1,false]);
        if(type == 'armor' && itemId >= 1)Game_Interpreter.prototype.command128 (params2 = [itemId,0,0,1,false]);
        $gameSwitches.setValue(66,false)

        //SE元に戻す
        seName = "SH_Itempick"
        $gameSystem.ticker.getItemSE = {"name":seName,"volume":"90","pitch":"100","pan":"0"}      
      }
    }
  }

  function SH_GachaItemTagSearch(item,tag,rare){
    //ランダムダンジョン
    if($gameSwitches.value(939)){//特殊装備
      var itemArray = item.filter(data => data && data.meta[tag] && data.meta["rate"] == rare && !data.meta["uniqueItem"]); // データベースのアイテム
    }else{
      var itemArray = item.filter(data => data && data.meta[tag] && data.meta["rate"] == rare && !data.meta["uniqueItem"] && !data.meta["flotsam"]); // データベースのアイテム
    }
    //console.log(itemArray)
    return itemArray
  }

  // function SH_GachaItemTagSearch(item,tag,rare){
  //   var itemArray = []
  //   for (var i = 1; i < item.length; i++) {
  //     if(item[i].meta[tag] && item[i].meta.rate == [rare] && !item[i].meta["uniqueItem"]|| tag == "all" && item[i].meta && item[i].meta.rate == [rare] && !item[i].meta["uniqueItem"]){
  //       itemArray.push(i)
  //     } 
  //   }
  //   return itemArray
  // }

  function SH_gachaRarity(rarity) { 
    var commonRate = Number(rarity["common"])
    var unCommonRate = Number(rarity["unCommon"])
    var rareRate = Number(rarity["rare"])
    var superRareRate = Number(rarity["superRare"])
    var ssrRate = Number(rarity["ssr"])
    var urRate = Number(rarity["ur"])
    var totalRate = commonRate + unCommonRate + rareRate + superRareRate + ssrRate + urRate
    if(totalRate != 100){//合計100以上の時コモン率から加減
      commonRate = totalRate > 100 ? commonRate - (totalRate - 100) : commonRate + (100 - totalRate)
    }
    var table = {'UC':unCommonRate,'R':rareRate,'SR':superRareRate,'SSR':ssrRate,'UR':urRate}
    return table
  } 

  function SH_gachaTag(tag) { 
    var data = { } 
      data[tag.tag1] = Number(tag['tag1rate']) || 0
      data[tag.tag2] = Number(tag['tag2rate']) || 0
      data[tag.tag3] = Number(tag['tag2rate']) || 0
      data[tag.tag4] = Number(tag['tag4rate']) || 0
      data[tag.tag5] = Number(tag['tag5rate']) || 0
      data[tag.tag6] = Number(tag['tag6rate']) || 0
      data[tag.tag7] = Number(tag['tag7rate']) || 0
      data[tag.tag8] = Number(tag['tag8rate']) || 0

      const rand = Math.floor(Math.random() * 100) 
      let result = tag.tag1
      let rate = 0 
      for (const prop in data) { 
        rate += data[prop] 
        if (rand <= rate) { 
          result = prop 
          break
        } 
      } 

      //パラメータに登録したタグから検索
      var itemTag = JsonEx.parse(parameters.itemTag)//パラメーターのタグ一覧から読み込む
      var max = itemTag.length
      var min = 0
      //console.log(itemTag)
      
      for(var i = min;i < max;i++){
        itemTag[i] = JsonEx.parse(itemTag[i])
        
        if(itemTag[i].tag == result){
          type = itemTag[i].tagType
          break;
        }
      }
      
    return [result,type]
  } 

  function SH_gacha(table) { //レアテーブルの確率から抽選しレア度を決定
    var data = table
    const rand = Math.floor(Math.random() * 100) 
    let result = 'C'
    let rate = 0 
    for (const prop in data) { 
      rate += data[prop] 
      if (rand <= rate) { 
        result = prop 
        break
      } 
    } 
    //console.log(result)
    return result
  } 

})();
