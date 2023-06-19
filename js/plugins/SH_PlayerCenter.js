/*:
 * @target MZ
 * @plugindesc プレイヤー表示座標変更
 * @author しもや(改良:kido)
 * @help
 * ・プラグインコマンドはありません。
 * @text プレイヤー表示座標変更
 * @desc プレイヤーの表示座標を変更します。
 *
 */

(() => {


    Game_Player.prototype.centerX = function () {
        let mapArea = Graphics.width - standarea();
        return (mapArea / $gameMap.tileWidth() - 1) / 2;
    };

    Game_Map.prototype.expandedWidth = function () {
        return this.width() + standarea() / this.tileWidth();
    }

    Game_Map.prototype.setDisplayPos = function (x, y) {
        if (this.isLoopHorizontal()) {
            this._displayX = x.mod(this.width());
            this._parallaxX = x;
        } else {
            const endX = this.expandedWidth() - this.screenTileX();
            this._displayX = endX < 0 ? endX / 2 : x.clamp(0, endX);
            this._parallaxX = this._displayX;
        }
        if (this.isLoopVertical()) {
            this._displayY = y.mod(this.height());
            this._parallaxY = y;
        } else {
            const endY = this.height() - this.screenTileY();
            this._displayY = endY < 0 ? endY / 2 : y.clamp(0, endY);
            this._parallaxY = this._displayY;
        }
    };

    Game_Map.prototype.scrollLeft = function (distance) {
        if (this.isLoopHorizontal()) {
            this._displayX += $dataMap.width - distance;
            this._displayX %= $dataMap.width;
            if (this._parallaxLoopX) {
                this._parallaxX -= distance;
            }
        } else if (this.expandedWidth() >= this.screenTileX()) {
            const lastX = this._displayX;
            this._displayX = Math.max(this._displayX - distance, 0);
            this._parallaxX += this._displayX - lastX;
        }
    };

    Game_Map.prototype.scrollRight = function (distance) {
        if (this.isLoopHorizontal()) {
            this._displayX += distance;
            this._displayX %= $dataMap.width;
            if (this._parallaxLoopX) {
                this._parallaxX += distance;
            }
        } else if (this.expandedWidth() >= this.screenTileX()) {
            const lastX = this._displayX;
            this._displayX = Math.min(
                this._displayX + distance,
                this.expandedWidth() - this.screenTileX()//右側の立ち絵用の領域
            );
            this._parallaxX += this._displayX - lastX;
        }
    };


})();