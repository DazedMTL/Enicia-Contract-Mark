//=============================================================================
// PANDA_MultiAction.js
//=============================================================================
// [Update History]
// 2021-06-01 Ver.1.0.0 First Release for MV/MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0) and bug fix for transformation.
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MV MZ
 * @plugindesc set the detail action pattern of enemies who have multiple action.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210601210432.html
 * 
 * @help [How to Use]
 * In the action pattern of the enemies who have multiple action,
 * you can make following actions by writing them in the note of the enemies.
 * 
 * <MultiActionX:Action Pattern Numbers>
 *  Select the specified actions only for the Xth action of multiple action.
 * <LastAction:Action Pattern Numbers>
 *  Cancel the after actions when the specified actions are selected.
 * The Action Pattern Numbers specifies the order of the action pattern list
 * separated by commas(,).
 * 
 * Example: When the action pattern is following:
 *   - Normal Attack
 *   - Fire Magic for single target
 *   - Fire Magic for all
 *   - Special Move for all
 *  <MultiAction1:4>   -> Special Move is selected only in the 1st action.
 *  <MultiAction2:2,3> -> Fire Magics are selected only in the 2nd action.
 *  <LastAction:4>     -> Cancel the after actions if Special Move is selected.
 *   * Normal Attack is selected in either 1st or 2nd action.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param MaxMultiAction
 * @text Max number of actions
 * @desc Specifies the maximum number of actions enemies can take in the game.
 * @type number
 * @default 3
 * @decimals 0
 * @min 1
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 敵キャラの複数回行動で単独行動や特定回のみ有効な行動を作ります。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210601210432.html
 * 
 * @help ■ 使い方
 * 複数回行動する敵キャラの行動パターンにおいて、
 * 敵キャラのメモに記述することで、以下のような行動パターンを作成できます。
 * 
 * <MultiActionX:行動パターン番号>
 *  指定した行動パターンは、複数回行動のうちX回目の行動でのみ選択されます。
 * <LastAction:行動パターン番号>
 *  指定した行動パターンを選択すると、以降の複数回行動は行わなくなります。
 * 行動パターン番号は、行動パターンリストの順番をカンマ(,)区切りで指定します。
 * 
 * 例：行動パターンが以下で指定されている時
 *   ・通常攻撃
 *   ・単体炎魔法
 *   ・全体炎魔法
 *   ・全体必殺技
 *  <MultiAction1:4>   → 全体必殺技は1回目の行動でのみ選択
 *  <MultiAction2:2,3> → 単体炎魔法と全体炎魔法は2回目の行動でのみ選択
 *  <LastAction:4>     → 全体必殺技を選んだらそれ以降の行動はしない
 *   ※ 通常攻撃は1回目でも2回目でも選択
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param MaxMultiAction
 * @text 複数回行動最大値
 * @desc ゲーム内で敵キャラが取り得る最大の行動回数を指定します。大きくしすぎると動作が重くなります。
 * @type number
 * @default 3
 * @decimals 0
 * @min 1
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 적의 여러 번 행동에서 1회 행동이나 특정회에만 유효한 행동을 만듭니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210601210432.html
 * 
 * @help [사용법]
 * 여러 번 행동하는 적 캐릭터의 행동 패턴에서
 * 적 캐릭터의 메모란에 기술함으로 다음과 같은 행동 패턴을 만들 수 있습니다.
 * 
 * <MultiActionX:행동 패턴 번호>
 *  지정된 번호의 행동 패턴은 여러 번 행동중 X번째 행동에서만 선택됩니다.
 * <LastAction:행동 패턴 번호>
 *  지정된 번호의 행동 패턴이 선택되면 이후의 행동을 안 하게 됩니다.
 * 행동 패턴 번호는 행동 패턴 리스트의 순서를 쉼표(,)로 구분하여 지정합니다.
 * 
 * 예) 행동 패턴이 다음과 같이 지정되어 있을 때
 *   - 일반 공격
 *   - 단독 화염 마법
 *   - 전체 화염 마법
 *   - 전체 필살기
 *  <MultiAction1:4>   -> 전체 필살기는 첫번째 행동에서만 선택됨
 *  <MultiAction2:2,3> -> 단독 및 전체 화염 마법은 두번째 행동에서만 선택됨
 *  <LastAction:4>     -> 전체 필살기가 선택되면 이후의 행동은 하지 않음
 *   * 일반 공격은 첫번째나 두번째나 선택됨
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param MaxMultiAction
 * @text 여러 번 행동 최대치
 * @desc 게임 내에서 적 캐릭터가 취할 수 있는 최대 행동 횟수를 지정합니다. 너무 크게 하면 동작이 무거워집니다.
 * @type number
 * @default 3
 * @decimals 0
 * @min 1
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const MaxMultiAction = Number(parameters['MaxMultiAction']) || 3;
	
	
	//--------------------------------------------------
	// Game_Enemy.selectAllActions
	//  [Modified Definition]
	//--------------------------------------------------
	Game_Enemy.prototype.selectAllActions = function(actionList) {
		const ratingMax = Math.max(...actionList.map(a => a.rating));
		const ratingZero = ratingMax - 3;
		actionList = actionList.filter(a => a.rating > ratingZero);
		const action = this.selectAction(actionList, ratingZero);
		this.action(this._actionIndex).setEnemyAction(action);
		// delete next actions if last action
		if (this._lastActionList.indexOf(action) != -1) {
			this._actions.length = this._actionIndex + 1;
		}
	}
	
	
	//--------------------------------------------------
	// Game_Enemy.makeActions
	//  [Modified Definition]
	//--------------------------------------------------
	Game_Enemy.prototype.makeActions = function() {
		Game_Battler.prototype.makeActions.call(this);
		// make multi action list
		this.makeMultiActionList();
		for (let i = 0; i < this.numActions(); i++) {
			this._actionIndex = i;
			if (this._multiActionList[i]) {
				const actionList = this._multiActionList[i].filter(a => this.isActionValid(a));
				if (actionList.length > 0) {
					this.selectAllActions(actionList);
				}
			}
		}
		this.setActionState("waiting");
	}
	
	
	//--------------------------------------------------
	// Game_Enemy.makeMultiActionList
	//  [New Definition]
	//--------------------------------------------------
	Game_Enemy.prototype.makeMultiActionList = function() {
		// make last action list
		this._lastActionList = this.parseActionList(this.enemy().meta.LastAction).map(n => this.enemy().actions[n - 1]);
		// get meta data and initialize multi action list
		this._multiActionList = [];
		const multiActions = [];
		for (let i = 1; i <= MaxMultiAction; i++) {
			multiActions.push(this.parseActionList(this.enemy().meta['MultiAction' + i]));
			this._multiActionList.push([]);
		}
		// make multi action list
		for (let a = 0; a < this.enemy().actions.length; a++) {
			let pushed = false;
			for (let i = 0; i < MaxMultiAction; i++) {
				if (multiActions[i].indexOf(a + 1) != -1) {
					this._multiActionList[i].push(this.enemy().actions[a]);
					pushed = true;
				}
			}
			if (!pushed) {
				// can always use
				for (let i = 0; i < MaxMultiAction; i++) {
					this._multiActionList[i].push(this.enemy().actions[a]);
				}
			}
		}
	}
	
	//--------------------------------------------------
	// Game_Enemy.parseActionList
	//  [New Definition]
	//--------------------------------------------------
	Game_Enemy.prototype.parseActionList = function(actionList) {
		if (actionList) {
			return actionList.split(',').map(Number);
		} else {
			return [];
		}
	}
	
})();

