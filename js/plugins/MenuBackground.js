/* ---------------------------------------------------------------------------*
 * 2022/02/21 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc メニュー系の背景を変える
 * @target MZ
 * @author kido
 * @help
 * 
 */

(() => {

  //レベルアップ画面
  Scene_LevelUp.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  //装備画面
  Scene_Equip.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  Scene_Options.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  Scene_GameEnd.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  Scene_File.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  Scene_Item.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };
  
  Scene_Skill.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  Scene_CharaEmploy.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  Scene_CharaMake.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  Scene_Name.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_church');
    this.addChild(this._backgroundSprite);
  };

  Scene_CharaEmploy.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_guild');
    this.addChild(this._backgroundSprite);
  };

  Scene_CharaMake.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_guild');
    this.addChild(this._backgroundSprite);
  };

  Scene_Name.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadParallax('mini_guild');
    this.addChild(this._backgroundSprite);
  };


  /* 元のコードは以下。これを上書きする
  Scene_MenuBase.prototype.createBackground = function () {
    this._backgroundFilter = new PIXI.filters.BlurFilter();
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();  //マップ表示時のキャプチャされた画像
    this._backgroundSprite.filters = [this._backgroundFilter];        //ぼかしフィルタかける
    this.addChild(this._backgroundSprite);
    this.setBackgroundOpacity(192);                                   //透過かける
  };
  */

})();