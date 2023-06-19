/* ---------------------------------------------------------------------------*
 * 2023/03/26 kido0617
 *--------------------------------------------------------------------------- */

// eslint-disable-next-line spaced-comment
/*:
 * @plugindesc Coreスクリプトでエラーが出るのを抑止
 * @target MZ
 * @author kido
 * @help
 * Coreスクリプトでエラーが出るのを抑止
 * 
 */

(() => {

    TilingSprite.prototype._onBitmapLoad = function () {
        if (this.texture) {
            this.texture.baseTexture = this._bitmap.baseTexture;
            this._refresh();
        }
    };

    Sprite_Animation.prototype.targetPosition = function (renderer) {
        const pos = new Point();
        if (this._animation.displayType === 2) {
            pos.x = renderer.view.width / 2;
            pos.y = renderer.view.height / 2;
        } else {
            for (const target of this._targets) {
                if (!target.parent) continue;
                const tpos = this.targetSpritePosition(target);
                pos.x += tpos.x;
                pos.y += tpos.y;
            }
            pos.x /= this._targets.length;
            pos.y /= this._targets.length;
        }
        return pos;
    };

})();