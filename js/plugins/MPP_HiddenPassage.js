//=============================================================================
// MPP_HiddenPassage.js
//=============================================================================
// Copyright (c) 2018 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Displays the tile with the specified region ID above the player.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 3.0.2]
 * - This plugin is for RPG Maker MV and MZ.
 * - Displays the tile with the specified region ID above the player.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing v[N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v[N] to refer to the variable N.
 *  
 *  〇 MV / MZ
 *  
 *  〇 SetPlayerZ z  / setPlayerZ
 *       z : Z coordinate
 *   - Set the Z coordinate of the player.
 *   - Of the region IDs set in the plug-in parameters,
 *     the regions below this number are displayed below the player.
 *   - Actually, we are not changing the Z coordinate of the character,
 *     we are just changing the method of determining whether to display
 *     it above the character.
 *   - Only the player can specify the Z coordinate.
 * 
 * ▼ Plugin parameters
 *  〇 Passable Region Ids / Impassable Region Ids
 *   - Tiles with the set region ID and higher than the player's Z coordinate are
 *     displayed above the character.
 *   - If it is displayed below the character, it will be a normal tile.
 *   - Range specification is available for these plug-in parameters.
 *   - You can specify a number from N to M by writing N-M.
 *      Example: 1-4,8,10 => 1 to 4 and 8 and 10
 * 
 * ▼ Note
 *  - The upper part of the A4 (wall) of the tile set is passable due
 *    to the specifications on the Maker side.
 *  - When creating secret passages, it is recommended to make both sides accessible
 *    and impassable.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setPlayerZ
 *      @desc 
 *      @arg z
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 255
 *          @default 0
 *
 * 
 *  @param Passable Region Ids
 *      @desc An array of region IDs displayed above and passable.(Range can be specified)
 *      @default 32
 *
 *  @param Impassable Region Ids
 *      @desc An array of region IDs that are displayed above and cannot be passed.(Range can be specified)
 *      @default 33
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc 指定したリージョンIDのタイルをプレイヤーより上に表示させます。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 3.0.2]
 * - このプラグインはRPGツクールMVおよびMZ用です。
 * - 指定したリージョンIDのタイルをプレイヤーより上に表示させます。
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  
 *  〇 MV / MZ
 *  
 *  〇 SetPlayerZ z  / プレイヤーZ座標設定
 *       z : Z座標
 *   - プレイヤーのZ座標を設定します。
 *   - プラグインパラメータで設定したリージョンIDのうち、
 *     この数値以下のリージョンはプレイヤーより下に表示されます。
 *   - 実際にはキャラクターのZ座標を変更しているのではなく、
 *     キャラクターより上に表示させるかどうかの判定方法を変えているだけです。
 *   - Z座標を指定できるのはプレイヤーのみです。
 * 
 * ▼ プラグインパラメータ
 *  〇 通行可能リージョン / 通行不可リージョン
 *   - 設定したリージョンIDで、かつプレイヤーのZ座標より高いタイルは、
 *     キャラクターより上に表示されます。
 *   - キャラクターより下に表示された場合は通常のタイルとなります。
 *   - これらのプラグインパラメータでは範囲指定が使用できます。
 *   - n-m と表記することで、nからmまでの数値を指定できます。
 *      例: 1-4,8,10 => 1から4と8と10
 * 
 * ▼ 注意点
 *  - ツクール側の仕様でタイルセットのA4(壁)は上部が通行可能となっています。
 *  - 隠し通路等を作る際は、通行可能にした両側面を通行不可にすることをお勧めします。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setPlayerZ
 *      @text プレイヤーZ座標設定
 *      @desc 
 *      @arg z
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 255
 *          @default 0
 *
 * 
 *  @param Passable Region Ids
 *      @text 通行可能リージョン
 *      @desc 上に表示し通行可能なリージョンIDの配列
 * (範囲指定可)
 *      @default 32
 *
 *  @param Impassable Region Ids
 *      @text 通行不可リージョン
 *      @desc 上に表示し通行できないリージョンIDの配列
 * (範囲指定可)
 *      @default 33
 *
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_HiddenPassage';

    const parameters = PluginManager.parameters(pluginName);
    const convertToArray = (param) => {
        return param.split(',').reduce((r, item) => {
            const match = /(\d+)-(\d+)/.exec(item);
            if (match) {
                const start = Number(match[1]);
                const end = Number(match[2]);
                return r.concat([...Array(end + 1).keys()].slice(start));
            } else {
                return item ? r.concat(Number(item)) : r;
            }
        }, []);
    };
    
    const param_PassableRegionIds = convertToArray(parameters['Passable Region Ids']);
    const param_ImpassableRegionIds = convertToArray(parameters['Impassable Region Ids']);
        
    //-------------------------------------------------------------------------
    // Tilemap

    // MV
    const _Tilemap__paintTiles = Tilemap.prototype._paintTiles;
    Tilemap.prototype._paintTiles = function(startX, startY, x, y) {
        const regionId = this._readMapData(startX + x, startY + y, 5);
        this._forceHigher = $gamePlayer.isUpperRegion(regionId);
        _Tilemap__paintTiles.apply(this, arguments);
    };

    //MZ
    const _Tilemap__addSpot = Tilemap.prototype._addSpot;
    Tilemap.prototype._addSpot = function(startX, startY, x, y) {
        const regionId = this._readMapData(startX + x, startY + y, 5);
        this._forceHigher = $gamePlayer.isUpperRegion(regionId);
        _Tilemap__addSpot.apply(this, arguments);
    };

    const _Tilemap__isHigherTile = Tilemap.prototype._isHigherTile;
    Tilemap.prototype._isHigherTile = function(tileId) {
        return (
            this._forceHigher ||
            _Tilemap__isHigherTile.apply(this, arguments)
        );
    };

    //-------------------------------------------------------------------------
    // ShaderTilemap

    if (Utils.RPGMAKER_NAME === 'MV') {
        
        const _ShaderTilemap__paintTiles = ShaderTilemap.prototype._paintTiles;
        ShaderTilemap.prototype._paintTiles = function(startX, startY, x, y) {
            const regionId = this._readMapData(startX + x, startY + y, 5);
            this._forceHigher = $gamePlayer.isUpperRegion(regionId);
            _ShaderTilemap__paintTiles.apply(this, arguments);
        };

    }

    //-------------------------------------------------------------------------
    // Game_Map

    const _Game_Map_checkPassage = Game_Map.prototype.checkPassage;
    Game_Map.prototype.checkPassage = function(x, y, bit) {
        const regionId = this.regionId(x, y);
        if ($gamePlayer.isUpperRegion(regionId)) {
            return param_PassableRegionIds.includes(regionId);
        }
        return _Game_Map_checkPassage.apply(this, arguments);
    };

    //-------------------------------------------------------------------------
    // Game_Player

    Game_Player.prototype.isUpperRegion = function(regionId) {
        const z = this.mppHidPasZ || 0;
        return z < regionId && (
            param_PassableRegionIds.includes(regionId) ||
            param_ImpassableRegionIds.includes(regionId)
        );
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        SetPlayerZ: { name:'setPlayerZ', keys:['z'] }
    };
    Object.assign(_mzCommands, {
        'エフェクトタイプ変更': _mzCommands.SetPlayerZ
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(
                ...mzCommand.keys.map((k, i) => ({[k]: args[i]}))
            );
            PluginManager.callCommandMV(this, pluginName, mzCommand.name, args2);
        }
    };

    //-------------------------------------------------------------------------
    // PluginManager
    
    if (!PluginManager.registerCommand) {
        PluginManager._commandsMV = PluginManager._commandsMV || {};

        PluginManager.registerCommandMV = function(pluginName, commandName, func) {
            const key = pluginName + ':' + commandName;
            this._commandsMV[key] = func;
        };
        
        PluginManager.callCommandMV = function(self, pluginName, commandName, args) {
            const key = pluginName + ':' + commandName;
            const func = this._commandsMV[key];
            if (typeof func === 'function') {
                func.bind(self)(args);
            }
        };
    }

    {
        const _registerCommand = PluginManager.registerCommand || PluginManager.registerCommandMV;

        _registerCommand.call(PluginManager, pluginName, 'setPlayerZ', args => {
            $gamePlayer.mppHidPasZ = PluginManager.mppValue(args.z);
            if (!$gameParty.inBattle()) {
                SceneManager._scene._spriteset._tilemap.refresh();
            }
        });
    }

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };

})();
