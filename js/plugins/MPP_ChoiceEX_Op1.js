//=============================================================================
// MPP_ChoiceEX_Op1.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Add the function to add choice and display it.
 * @author Mokusei Penguin
 * @url 
 *
 * @base MPP_ChoiceEX
 * @orderAfter MPP_ChoiceEX
 *
 * @help [version 1.0.1]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ 概要
 *  - You can add the contents of the options one by one and display them all
 *    together.
 *  - Most of the functions of MPP_ChoiceEX.js can be used.
 *  - The added choices are saved in the save data.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing v[N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v[N] to refer to the variable N.
 *  - If you use a variable, the value at the time of executing the command is
 *    applied.
 *  
 *  〇 MV / MZ
 *  
 *  〇 AddCustomChoice id text value  / addCustomChoice
 *       id    : ID of the array to add (integer greater than or equal to 0)
 *       text  : Choice text
 *       value : Return value
 *   - Add choices to the array.
 *   - Specify any numerical value for the array ID.
 *   - Some control characters and MPP_ChoiceEX.js functions if(condition)
 *     and en(condition) can be used for the choice text.
 *   - The return value is the number returned when this option is selected.
 *   - By design, MV does not allow spaces in the choice text.
 *   - If you want to use spaces in the text in the MV, edit the following
 *     code and execute it in the script.
 * ////////////////////////////////////////////////////////////////
 * const id = 0;
 * const choiceParams = {
 *     text: '',
 *     value: 0
 * };
 * $gameSystem.addCustomChoice(id, choiceParams);
 * ////////////////////////////////////////////////////////////////
 * 
 *  〇 ShowCustomChoices id vId back pos def cancel  / showCustomChoices
 *       id     : ID of the array to display
 *       vId    : The number of the variable to put the return value
 *       back   : Background (0:Window, 1:Dim, 2:Transparent / unset:0)
 *       pos    : Window Position (0:Left, 1:Middle, 2:Right / unset:2)
 *       def    : Default (-1:None / unset:0)
 *       cancel : Cancel (-2:Branch, -1:Disallow / unset:-2)
 *   - Show your choices.
 *   - The return value of the selected choice is put into a variable.
 *   - The Background, Window Position, Default, and Cancel are the same as
 *     the normal [Show Choices].
 *   - If [Cancel:Branch] is selected, the return value is -2.
 *   - When executed after [Show Text], the same process as the default
 *     [Show Choices] is performed.
 * 
 *  〇 DeleteCustomChoice id text  / deleteCustomChoice
 *       id    : Array ID
 *       text  : Choice text to delete
 *   - Removes all text-matched choices from the array.
 * 
 *  〇 ClearCustomChoices id  / clearCustomChoices
 *       id    : ID of the array to be deleted
 *   - Delete the array.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @command addCustomChoice
 *      @desc 
 *      @arg id
 *          @desc ID of the array to add
 *          It is used when displaying or deleting.
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 0
 *      @arg choiceText
 *          @desc 
 *          @default 
 *      @arg returnValue
 *          @desc The value to put in the variable when this option is selected
 *          @type number
 *              @min -999999
 *              @max 999999
 *          @default 0
 * 
 *  @command showCustomChoices
 *      @desc 
 *      @arg id
 *          @desc ID of the option to display
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 0
 *      @arg variableId
 *          @desc Variable to put the return value
 *          @type variable
 *          @default 0
 *      @arg background
 *          @desc 
 *          @type select
 *              @option Window
 *              @value 0
 *              @option Dim
 *              @value 1
 *              @option Transparent
 *              @value 2
 *          @default 0
 *      @arg positionType
 *          @desc 
 *          @type select
 *              @option Left
 *              @value 0
 *              @option Middle
 *              @value 1
 *              @option Right
 *              @value 2
 *          @default 2
 *      @arg defaultType
 *          @desc -1:None
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg cancelType
 *          @desc -2:Branch, -1:Disallow
 *          @type number
 *              @min -2
 *              @max 999
 *          @default -2
 * 
 *  @command deleteCustomChoice
 *      @desc Deletes the specified choice from the array.
 *      @arg id
 *          @desc ID of the array to delete
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 0
 *      @arg choiceText
 *          @desc 
 *          @default 
 * 
 *  @command clearCustomChoices
 *      @desc Delete the array of choices.
 *      @arg id
 *          @desc ID of the array to delete all
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 選択肢を追加していき、表示させる機能を追加します。
 * @author 木星ペンギン
 * @url 
 * 
 * @base MPP_ChoiceEX
 * @orderAfter MPP_ChoiceEX
 *
 * @help [version 1.0.1]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ 概要
 *  - 選択肢の内容を一つずつ追加していき、まとめて表示することができます。
 *  - MPP_ChoiceEX.jsの機能はおおむね使用できます。
 *  - 追加していった選択肢はセーブデータに保存されます。
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  - 変数を使用する場合、そのコマンド実行時の値が適用されます。
 *  
 *  〇 MV / MZ
 *  
 *  〇 AddCustomChoice id text value  / 選択肢追加
 *       id    : 追加する配列のID(0以上の整数)
 *       text  : 選択肢テキスト
 *       value : 返り値
 *   - 配列に選択肢を追加します。
 *   - 配列のIDは任意の数値を指定してください。
 *   - 選択肢テキスト(text)には一部の制御文字や、MPP_ChoiceEX.jsの機能である
 *     if(条件) や en(条件) が使用できます。
 *   - 返り値はこの選択肢が選ばれたときに返す数値です。
 *   - MVでは仕様上、選択肢テキストにスペースを使用することはできません。
 *   - MVでテキストにスペースを使いたい場合は、以下のコード編集して
 *     スクリプトで実行してください。
 * ////////////////////////////////////////////////////////////////
 * const id = 0;
 * const choiceParams = {
 *     text: '',
 *     value: 0
 * };
 * $gameSystem.addCustomChoice(id, choiceParams);
 * ////////////////////////////////////////////////////////////////
 * 
 *  〇 ShowCustomChoices id vId back pos def cancel  / 選択肢表示
 *       id     : 表示する配列のID
 *       vId    : 返り値を入れる変数の番号
 *       back   : 背景(0:ウィンドウ, 1:暗くする, 2:透明 / 未設定:0)
 *       pos    : ウィンドウ位置(0:左, 1:中, 2:右 / 未設定:2)
 *       def    : デフォルト(-1:なし / 未設定:0)
 *       cancel : キャンセル(-2:分岐, -1:禁止 / 未設定:-2)
 *   - 選択肢を表示します。
 *   - 選ばれた選択肢の返り値が変数に入れられます。
 *   - 背景・ウィンドウ位置・デフォルト・キャンセルは通常の[選択肢の表示]と
 *     同じです。
 *   - キャンセル:分岐が選ばれた場合の返り値は-2です。
 *   - [文章の表示]の後に実行した場合、デフォルトの[選択肢の表示]と
 *     同じ処理をします。
 * 
 *  〇 DeleteCustomChoice id text  / 選択肢削除
 *       id    : 配列のID
 *       text  : 削除する選択肢テキスト
 *   - 配列からテキストが一致した選択肢を全て削除します。
 * 
 *  〇 ClearCustomChoices id  / 選択肢クリア
 *       id    : 全削除する配列のID
 *   - 配列を削除します。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @command addCustomChoice
 *      @text 選択肢追加
 *      @desc 
 *      @arg id
 *          @desc 追加する配列のID
 *          表示や削除を行う際に使用します。
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 0
 *      @arg choiceText
 *          @text 選択肢テキスト
 *          @desc 
 *          @default 
 *      @arg returnValue
 *          @text 返り値
 *          @desc この選択肢が選ばれた際に変数に入れる値
 *          @type number
 *              @min -999999
 *              @max 999999
 *          @default 0
 * 
 *  @command showCustomChoices
 *      @text 選択肢表示
 *      @desc 
 *      @arg id
 *          @desc 表示する選択肢のID
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 0
 *      @arg variableId
 *          @text 変数
 *          @desc 返り値を入れる変数
 *          @type variable
 *          @default 0
 *      @arg background
 *          @text 背景
 *          @desc 
 *          @type select
 *              @option ウィンドウ
 *              @value 0
 *              @option 暗くする
 *              @value 1
 *              @option 透明
 *              @value 2
 *          @default 0
 *      @arg positionType
 *          @text ウィンドウ位置
 *          @desc 
 *          @type select
 *              @option 左
 *              @value 0
 *              @option 中
 *              @value 1
 *              @option 右
 *              @value 2
 *          @default 2
 *      @arg defaultType
 *          @text デフォルト
 *          @desc -1:なし
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg cancelType
 *          @text キャンセル
 *          @desc -2:分岐, -1:禁止
 *          @type number
 *              @min -2
 *              @max 999
 *          @default -2
 * 
 *  @command deleteCustomChoice
 *      @text 選択肢削除
 *      @desc 配列から指定した選択肢を削除します。
 *      @arg id
 *          @desc 削除する配列のID
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 0
 *      @arg choiceText
 *          @text 選択肢テキスト
 *          @desc 
 *          @default 
 * 
 *  @command clearCustomChoices
 *      @text 選択肢クリア
 *      @desc 選択肢の配列を削除します。
 *      @arg id
 *          @desc 全て削除する配列のID
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_ChoiceEX_Op1';
    
    //-----------------------------------------------------------------------------
    // Game_System

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.apply(this, arguments);
        this._customChoices = [];
    };
    
    Game_System.prototype.addCustomChoice = function(id, params) {
        if (!this._customChoices[id]) {
            this._customChoices[id] = [];
        }
        this._customChoices[id].push(params);
    };

    Game_System.prototype.deleteCustomChoice = function(id, text) {
        const customChoices = this.getCustomChoices(id);
        if (customChoices) {
            this._customChoices[id] = customChoices.filter(params =>
                params.text !== text
            );
            if (this._customChoices[id].length === 0) {
                this.clearCustomChoices(id);
            }
        }
    };

    Game_System.prototype.clearCustomChoices = function(id) {
        this._customChoices[id] = null;
    };

    Game_System.prototype.getCustomChoices = function(id) {
        return this._customChoices[id];
    };

    //-------------------------------------------------------------------------
    // Game_Message

    Game_Message.prototype.isTextOnly = function() {
        return (
            this.hasText() &&
            !this.isChoice() &&
            !this.isNumberInput() &&
            !this.isItemChoice()
        );
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        const result = _Game_Interpreter_command101.apply(this, arguments);
        if ($gameMessage.isTextOnly()) {
            if (Utils.RPGMAKER_NAME === 'MV') {
                const command = this.currentCommand();
                if (command.code === 356) {
                    const [comName, ...args] = command.parameters[0].split(' ');
                    if (['ShowCustomChoices', '選択肢表示'].includes(comName)) {
                        this._index++;
                        this.pluginCommand(comName, args);
                    }
                }
            } else {
                if (this.nextEventCode() === 357) {
                    const nextParams = this._list[this._index + 1].parameters;
                    if (
                        nextParams[0] === pluginName &&
                        nextParams[1] === 'showCustomChoices'
                    ) {
                        this._index++;
                        PluginManager.callCommand(
                            this, nextParams[0], nextParams[1], nextParams[3]
                        );
                    }
                }
            }
        }
        return result;
    };

    const _mzCommands = {
        AddCustomChoice: {
            name:'addCustomChoice',
            keys:['id', 'choiceText', 'returnValue']
        },
        ShowCustomChoices: {
            name:'showCustomChoices',
            keys:['id', 'variableId', 'background', 'positionType', 'defaultType', 'cancelType']
        },
        DeleteCustomChoice: {
            name:'deleteCustomChoice',
            keys:['id', 'choiceText']
        },
        ClearCustomChoices: { name:'clearCustomChoices', keys:['id'] }
    };
    Object.assign(_mzCommands, {
        '選択肢追加': _mzCommands.AddCustomChoice,
        '選択肢表示': _mzCommands.ShowCustomChoices,
        '選択肢削除': _mzCommands.DeleteCustomChoice,
        '選択肢クリア': _mzCommands.ClearCustomChoices
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(...mzCommand.keys.map((k,i) => ({[k]:args[i]})));
            PluginManager.callCommand(this, pluginName, mzCommand.name, args2);
        }
    };
    
    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager._commands = PluginManager._commands || {};
    
    if (!PluginManager.registerCommand) {
        PluginManager.registerCommand = function(pluginName, commandName, func) {
            const key = pluginName + ":" + commandName;
            this._commands[key] = func;
        };
    }

    if (!PluginManager.callCommand) {
        PluginManager.callCommand = function(self, pluginName, commandName, args) {
            const key = pluginName + ":" + commandName;
            const func = this._commands[key];
            if (typeof func === "function") {
                func.bind(self)(args);
            }
        };
    }

    PluginManager.registerCommand(pluginName, 'addCustomChoice', args => {
        const id = PluginManager.mppValue(args.id)
        const choiceParams = {
            text: args.choiceText,
            value: PluginManager.mppValue(args.returnValue)
        };
        $gameSystem.addCustomChoice(id, choiceParams);
    });

    PluginManager.registerCommand(pluginName, 'showCustomChoices', function(args) {
        const id = PluginManager.mppValue(args.id)
        const customChoices = $gameSystem.getCustomChoices(id);
        if (customChoices) {
            const data = {
                choices: [],
                enables: [],
                results: [],
                cancelType: PluginManager.mppValue(args.cancelType || '-2'),
                defaultType: PluginManager.mppValue(args.defaultType || '0')
            };
            const texts = customChoices.map(params => params.text);
            this.checkChoiceConditions(texts, data, 0);
            const results = data.results.map(n => customChoices[n].value);
            const cancelType = this.choiceCancelType(data);
            const defaultType = this.choiceDefaultType(data);
            const positionType = PluginManager.mppValue(args.positionType || '2');
            const background = PluginManager.mppValue(args.background || '0');
            const variableId = PluginManager.mppValue(args.variableId);
            $gameMessage.setChoices(data.choices, defaultType, cancelType);
            $gameMessage.setChoiceEnables(data.enables);
            $gameMessage.setChoiceResults(results);
            $gameMessage.setChoiceBackground(background);
            $gameMessage.setChoicePositionType(positionType);
            $gameMessage.setChoiceCallback(n =>
                $gameVariables.setValue(variableId, n < 0 ? n : results[n])
            );
            this.setWaitMode("message");
        }
    });

    PluginManager.registerCommand(pluginName, 'deleteCustomChoice', args => {
        const id = PluginManager.mppValue(args.id)
        $gameSystem.deleteCustomChoice(id, args.choiceText);
    });

    PluginManager.registerCommand(pluginName, 'clearCustomChoices', args => {
        const id = PluginManager.mppValue(args.id)
        $gameSystem.clearCustomChoices(id);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
})();
