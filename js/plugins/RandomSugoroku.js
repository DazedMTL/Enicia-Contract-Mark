/* ---------------------------------------------------------------------------*
 * 2023/01/18 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc ランダムすごろくマップ生成プラグイン
 * @target MZ
 * @base PluginCommonBase
 * @author kido
 * @help
 *  
 * 
 * @param distance
 * @text ゴールまでの距離
 * @desc 
 * @default 50
 * 
 * @param branchMax
 * @text 分岐数
 * @desc 
 * @default 3
 * 
 * @param dirChangePer
 * @text 曲がる確率
 * @desc 0に近ければ近いほどまっすぐになります
 * @default 30
 * 
 */


(() => {
  const script = document.currentScript;
  const params = PluginManagerEx.createParameter(script);

  const xMin = 10, yMin = 10, xMax = 90, yMax = 90;  //上下左右10マスはウィンドウとかぶるので使用しない
  const emptyTile = 538, startTile = 538, goalTile = 514;
  const goalRegion = 20;
  const arrowDown = { tile: 552, tag: 1652 }, arrowUp = { tile: 553, tag: 1653 }, arrowLeft = { tile: 554, tag: 1660 }, arrowRight = { tile: 555, tag: 1661 };
  const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];

  //各出現％を指定します。合計が100になるように設定してください。何もなしは-1にしてください。「100 - 各合計」が何もなしの確率になります
  const tileRates = {
    520: 7,  //財宝
    521: 10,  //トラップ
    522: 7,  //ハプニング
    523: 4,  //レア財宝
    528: 6,  //キャンプ
    529: 14,  //エンカウント
    530: 0, //ボス
    531: 5,  //ショップ
    536: 0, //ハート
    538: -1,  //何もなし
    544: 0, //歩数移動
    545: 0,  //採取
  };
  let randomTiles = [];
  for (let tile in tileRates) {
    for (let i = 0; i < tileRates[tile]; i++) {
      randomTiles.push(tile);
    }
  }
  for (let i = 0; i < 100 - randomTiles.length; i++)randomTiles.push(emptyTile); //何もなし

  function getRandomTile() {
    return randomTiles[Math.randomInt(randomTiles.length)];
  }

  const _onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function () {
    _onMapLoaded.call(this);
    if (this._transfer && $gameMap.isGenegratedSugoroku()) {
      $gameMap.sugorokuGenerator.locatePlayerToStart();
    }
  };

  const _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    _Game_Map_setup.call(this, mapId)
    this.sugorokuGenerator = null;
    if (PluginManagerEx.findMetaValue($dataMap, 'randomSugoroku')) this.sugorokuGenerator = new SugorokuGenerator();
  };

  const _Game_Map_tileId = Game_Map.prototype.tileId;
  Game_Map.prototype.tileId = function (x, y, z) {
    if (this.isGenegratedSugoroku()) {
      return this.sugorokuGenerator.tileId(x, y, z);
    }
    return _Game_Map_tileId.call(this, x, y, z);
  };

  const _Game_Map_data = Game_Map.prototype.data;
  Game_Map.prototype.data = function () {
    if (this.isGenegratedSugoroku()) {
      return this.sugorokuGenerator.data();
    }
    return _Game_Map_data.call(this);
  };

  Game_Map.prototype.isGenegratedSugoroku = function () {
    return this.sugorokuGenerator;
  };

  class SugorokuGenerator {
    constructor() {
      this.distance = params.distance;
      this._data = [];
      let width = $dataMap.width;
      let height = $dataMap.height;
      for (let i = 0; i < width * height * 6; i++) this._data.push(0);
      this.setStart();
      this.makeStartToGoal();
      for (let i = 0; i < params.branchMax; i++) {
        this.makeBranch();
      }
      this.through = {};
      this.setPreventReverse(this.start.x, this.start.y);
    }
    setStart() {
      this.start = { x: Math.randomInt(xMax - xMin) + xMin, y: Math.randomInt(yMax - yMin) + yMin };
    }
    locatePlayerToStart() {
      $gamePlayer.locate(this.start.x, this.start.y);
      let near = this.getNearState(this.start.x, this.start.y);
      if (near.right) $gamePlayer.setDirection(6);
      else if (near.left) $gamePlayer.setDirection(4);
      else if (near.down) $gamePlayer.setDirection(2);
      else if (near.up) $gamePlayer.setDirection(8);
    }
    makeStartToGoal() {
      this.points = [];
      let dirChangePer = params.dirChangePer;
      while (true) {
        //console.log('make');
        this.setTile3(this.start.x, this.start.y, startTile);
        let p = { x: this.start.x, y: this.start.y };
        let dir = null;
        for (var i = 0; i < this.distance; i++) {
          if (!dir || Math.randomInt(100) < dirChangePer || !this.canPutTile(p.x + dir.x, p.y + dir.y) || this.isBranch(p.x + dir.x, p.y + dir.y)) {
            let candidate = [];
            for (let d of dirs) {
              if (d == dir) continue;
              if (this.canPutTile(p.x + d.x, p.y + d.y) && !this.isBranch(p.x + d.x, p.y + d.y)) candidate.push(d);
            }
            if (candidate.length == 0) break;
            dir = candidate[Math.randomInt(candidate.length)];
          }
          p.x += dir.x;
          p.y += dir.y;
          this.points.push({ x: p.x, y: p.y });
          this.setTile3(p.x, p.y, getRandomTile());
        }
        if (i == this.distance && !this.isStartBranched()) {
          this.setTile3(p.x, p.y, goalTile);//ゴール
          this.setTile(p.x, p.y, 5, goalRegion); //リージョン
          $gameMap.eventsXy(0, 0)[0].locate(p.x, p.y); //ゴール用イベント配置
          break;
        } else {
          //やり直し
          for (let i = 0; i < this._data.length; i++) this._data[i] = 0;
          this.points = [];
        }
      }
    }
    makeBranch() {
      let start = this.points[Math.randomInt(this.points.length - 5) + 2];
      let tmpData = [].concat(this._data);
      let branchLengthMax = this.distance / 2;
      let count = 0;
      while (true) {
        //console.log('branch');
        let p = { x: start.x, y: start.y };
        let isFinished = false;
        for (var i = 0; i < branchLengthMax; i++) {
          let candidate = [];
          for (let d of dirs) {
            if (this.canPutTile(p.x + d.x, p.y + d.y)) candidate.push(d);
          }
          if (candidate.length == 0) {
            break;
          }
          let dir = candidate[Math.randomInt(candidate.length)];
          p.x += dir.x;
          p.y += dir.y;
          this.setTile3(p.x, p.y, getRandomTile());
          if (this.isBranch(p.x, p.y)) {
            isFinished = true;
            break;
          }
        }
        if (isFinished && !this.isStartBranched()) {
          break;
        } else {
          //やり直し
          this._data = [].concat(tmpData);
          if (count++ == 50) break;
        }
      }
    }


    setPreventReverse(x, y, dir) {
      //逆流防止
      const key = x + ',' + y;
      if (this.through[key]) return;
      this.through[key] = true;
      let right, left, up, down;
      ({ right, left, up, down } = this.getNearState(x, y));
      if (right + left + up + down >= 3) {
        //分岐なので１個前を流入防止にする
        let t = 0;
        if (dir == 'right') {
          x -= 1;
          t = arrowRight;
        }
        else if (dir == 'left') {
          x += 1;
          t = arrowLeft;
        }
        else if (dir == 'up') {
          y += 1;
          t = arrowUp;
        } else if (dir == 'down') {
          y -= 1;
          t = arrowDown;
        }
        this.setTile(x, y, 0, t.tag);
        this.setTile3(x, y, t.tile);
        return;
      }
      if (right) this.setPreventReverse(x + 1, y, 'right');
      if (left) this.setPreventReverse(x - 1, y, 'left');
      if (up) this.setPreventReverse(x, y - 1, 'up');
      if (down) this.setPreventReverse(x, y + 1, 'down');
    }
    isBranch(x, y) {
      return this.getBranch(x, y) >= 2;
    }
    getBranch(x, y) {
      let right, left, up, down;
      ({ right, left, up, down } = this.getNearState(x, y));
      return right + left + up + down
    }
    getNearState(x, y) {
      return {
        right: this.tileId3(x + 1, y) ? 1 : 0,
        left: this.tileId3(x - 1, y) ? 1 : 0,
        up: this.tileId3(x, y - 1) ? 1 : 0,
        down: this.tileId3(x, y + 1) ? 1 : 0,
      }
    }
    isStartBranched() {
      //スタートから分岐するケースがあるのでそのチェック
      return this.getBranch(this.start.x, this.start.y) >= 2;
    }
    canPutTile(x, y) {
      if (x < xMin || x > xMax || y < yMin || y > yMax) return false;
      let id = this.tileId3(x, y);
      if (id) return false;

      //4マスが埋まる場合NGなのでそのチェック
      let x1y1 = this.tileId3(x - 1, y - 1), x2y1 = this.tileId3(x, y - 1), x3y1 = this.tileId3(x + 1, y - 1),
        x1y2 = this.tileId3(x - 1, y), x3y2 = this.tileId3(x + 1, y),
        x1y3 = this.tileId3(x - 1, y + 1), x2y3 = this.tileId3(x, y + 1), x3y3 = this.tileId3(x + 1, y + 1);
      if (x1y2 && x1y3 && x2y3) return false;
      if (x1y2 && x1y1 && x2y1) return false;
      if (x3y2 && x3y3 && x2y3) return false;
      if (x3y2 && x3y1 && x2y1) return false;

      return true;
    }
    setTile3(x, y, tileId) {
      this.setTile(x, y, 3, tileId);
    }
    setTile(x, y, z, tileId) {
      this._data[(z * $dataMap.height + y) * $dataMap.width + x] = tileId;
    }
    tileId3(x, y) {
      return this.tileId(x, y, 3);
    }
    tileId(x, y, z) {
      return this._data[(z * $dataMap.height + y) * $dataMap.width + x];
    }

    data() {
      return this._data;
    }

  }

})();
