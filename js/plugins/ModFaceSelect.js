/* ---------------------------------------------------------------------------*
 * 2023/01/09 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc 顔画像を選ぶシーンプラグイン
 * @target MZ
 * @author kido
 * @help
 * 
 * 
 *
 */


(() => {

  const params = PluginManager.parameters('ModImageLoader');

  const modFaceDirPath = params.dirName + '/' + params.faceDirName + '/';

  function Scene_FaceSelect() {
    this.initialize(...arguments);
  }

  Scene_FaceSelect.prototype = Object.create(Scene_Base.prototype);
  Scene_FaceSelect.prototype.constructor = Scene_FaceSelect;

  Scene_FaceSelect.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
  };

  Scene_FaceSelect.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createCharaFaceWindow();
  };

  Scene_FaceSelect.prototype.createCharaFaceWindow = function () {
    this.charaMakeFaceWindow = new Window_CharaMakeFaces(
      new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight)
    );
    this.charaMakeFaceWindow.setHandler("ok", this.onOk.bind(this));
    this.charaMakeFaceWindow.setHandler("cancel", this.popScene.bind(this));
    this.charaMakeFaceWindow.activate();
    this.charaMakeFaceWindow.select(0);
    this.addChild(this.charaMakeFaceWindow);
  };

  Scene_FaceSelect.prototype.onOk = function () {
    let actor = $gameActors.actor($gameVariables.value(951));
    actor.modFacePath = modFaceDirPath + this.charaMakeFaceWindow.fileNames[this.charaMakeFaceWindow.index()];
    this.popScene();
  };

  window.Scene_FaceSelect = Scene_FaceSelect;

  //---------------------------------------------------------
  function Window_CharaMakeFaces() {
    this.initialize(...arguments);
  }

  Window_CharaMakeFaces.prototype = Object.create(Window_Selectable.prototype);
  Window_CharaMakeFaces.prototype.constructor = Window_CharaMakeFaces;

  Window_CharaMakeFaces.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    const fs = require("fs");
    const allDirents = fs.readdirSync(modFaceDirPath, { withFileTypes: true });
    this.fileNames = allDirents.filter(dirent => dirent.isFile() && dirent.name.endsWith('.png')).map(({ name }) => name);
    this.fileNames.sort();
    this.bitmaps = [];
    for (let name of this.fileNames) {
      const url = modFaceDirPath + Utils.encodeURI(name);
      bitmap = ImageManager.loadBitmapFromUrl(url);
      this.bitmaps.push(bitmap);
    }
    this.drawn = false;
  };

  Window_CharaMakeFaces.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    if (this.drawn) return;
    let loaded = true;
    for (let bitmap of this.bitmaps) {
      if (!bitmap.isReady()) loaded = false;
    }
    if (loaded) {
      this.drawn = true;
      this.refresh();
    }
  };

  Window_CharaMakeFaces.prototype.maxCols = function () {
    return 8;
  };

  Window_CharaMakeFaces.prototype.maxItems = function () {
    return this.bitmaps.length;
  };

  Window_CharaMakeFaces.prototype.rowSpacing = function () {
    return 16;
  };

  Window_CharaMakeFaces.prototype.colSpacing = function () {
    return 16;
  };

  Window_CharaMakeFaces.prototype.itemWidth = function () {
    return 144 + this.colSpacing();
  };

  Window_CharaMakeFaces.prototype.itemHeight = function () {
    return 144 + this.rowSpacing();
  };

  Window_CharaMakeFaces.prototype.drawItem = function (index) {
    const rect = this.itemRect(index);
    this.contents.blt(this.bitmaps[index], 0, 0, 144, 144, rect.x, rect.y);
  };


  Window_CharaMakeFaces.prototype.itemRect = function (index) {
    let rect = Window_Selectable.prototype.itemRect.call(this, index);
    rect.x += 20;
    return rect;
  };

})();