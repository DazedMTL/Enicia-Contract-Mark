/* ---------------------------------------------------------------------------*
 * 2021/11/25 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc Mod画像ローダー
 * @target MZ
 * @author kido
 * @help
 * 
 * 傭兵として扱うアクターには<userchara:1> のように傭兵番号をメモ欄に設定する
 * 
 * ・顔画像の設定
 * プラグインパラメータで指定したフォルダにface_01.png などと傭兵番号を含めて画像を保存する
 * 
 * ・ピクチャの表示
 * プラグインコマンドのピクチャ名設定で読み込むピクチャ名を指定後、ピクチャの表示をピクチャ名指定せずに実行。
 * 
 * @param dirName
 * @text フォルダ名
 * @desc 外部画像を格納するフォルダ名
 * @default mod
 * @type string
 * 
 * @param faceDirName
 * @text 顔画像フォルダ名
 * @desc 
 * @default face
 * @type string
 * 
 * @command ModPictureName
 * @text ピクチャ名設定
 * @desc ピクチャの表示で使用するピクチャ名を設定する
 *
 * @arg name
 * @text ピクチャ名
 * @desc 拡張子不要。制御文字\v[n]を使用可。例: test_01
 * @default
 * @type string
 *
 */

(() => {

  const script = document.currentScript;
  const params = PluginManager.parameters('ModImageLoader');

  PluginManagerEx.registerCommand(script, 'ModPictureName', function (args) {
    const name = PluginManagerEx.convertEscapeCharacters(args.name);
    $gameScreen.reserveModPictureName(name);
  });

  const _setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function (actorId) {
    _setup.call(this, actorId);
    this.modFacePath = null;
  };

  Game_Screen.prototype.reserveModPictureName = function (name) {
    this._reserveModPictureName = params.dirName + '/' + name;
  };

  const _Game_Screen_showPicture = Game_Screen.prototype.showPicture;
  Game_Screen.prototype.showPicture = function (pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
    if (this._reserveModPictureName) {
      arguments[1] = this._reserveModPictureName;
      this._reserveModPictureName = null;
    }
    _Game_Screen_showPicture.apply(this, arguments);
  };


  Bitmap.prototype._startLoading = function () {
    this._image = new Image();
    this._image.onload = this._onLoad.bind(this);
    this._image.onerror = this._onError.bind(this);
    this._destroyCanvas();
    this._loadingState = 'loading';
    if (Utils.hasEncryptedImages() && this._url.indexOf(params.dirName) !== 0) {
      this._startDecrypting();
    } else {
      this._image.src = this._url;
    }
  };

  const _spritePictureLoadBitmap = Sprite_Picture.prototype.loadBitmap;
  Sprite_Picture.prototype.loadBitmap = function () {
    if (this._pictureName.indexOf(params.dirName) === 0) {
      const url = Utils.encodeURI(this._pictureName) + '.png';
      this.bitmap = ImageManager.loadBitmapFromUrl(url);
      return;
    }
    _spritePictureLoadBitmap.call(this);
  };


  const _spriteFaceLoadBitmap = Sprite_Face.prototype.loadBitmap;
  Sprite_Face.prototype.loadBitmap = function () {
    if (this.actor.actor().meta.userchara && this.actor.modFacePath) {
      this.setFrame(0, 0, ImageManager.faceWidth, ImageManager.faceHeight);
      const url = Utils.encodeURI(this.actor.modFacePath);
      this.bitmap = ImageManager.loadBitmapFromUrl(url);
      if (this.bitmap.isModLoadError) {
        _spriteFaceLoadBitmap.call(this);
      } else {
        this.bitmap._image.addEventListener('error', () => {
          this.bitmap.eraseError();
          this.bitmap.isModLoadError = true;
          _spriteFaceLoadBitmap.call(this);
        });
      }
      return;
    }
    _spriteFaceLoadBitmap.call(this);
  };

  Bitmap.prototype.eraseError = function () {
    this._hasError = false;
    this._isLoading = false;
    this._loadingState = 'loaded';
  };


  ImageManager.loadFace = function (filename) {
    if (filename.indexOf('userchara') == 0) {
      let id = filename.match(/userchara(\d+)/)[1];
      let actor = $gameActors.actor(150 + parseInt(id));
      if (actor.modFacePath) {
        const url = Utils.encodeURI(actor.modFacePath);
        let bitmap = ImageManager.loadBitmapFromUrl(url);
        bitmap._image.addEventListener('error', () => {
          bitmap.eraseError();
        });
        return bitmap;
      } else {
        return this.loadBitmap("img/faces/", filename);
      }
    } else {
      return this.loadBitmap("img/faces/", filename);
    }
  };

})();
