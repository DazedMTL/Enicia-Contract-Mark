/* ---------------------------------------------------------------------------*
 * 2022/02/20 kido0617
 * 制限:このプラグインの使用は許諾された個人・サークルに限ります。
 * http://kido0617.github.io/
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc アウトライン色をかえる
 * @target MZ
 * @author kido
 * @help
 * DTextPictureの機能で/OC[n]でアウトラインを変えられる
 * 元に戻す用として\ROC を追加
 */

(() => {

  const _processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
  Window_Base.prototype.processEscapeCharacter = function (code, textState) {
    _processEscapeCharacter.call(this, code, textState);
    switch (code) {
      case "ROC":
        this.resetOutlineColor();
        break;
    }
  };

  Window_Base.prototype.resetOutlineColor = function () {
    this.changeOutlineColor(ColorManager.outlineColor());
  };
})();
