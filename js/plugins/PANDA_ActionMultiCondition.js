//=============================================================================
// PANDA_ActionMultiCondition.js
//=============================================================================
// [Update History]
// 2022-02-11 Ver.1.0.0 First Release for MV/MZ.

/*:
 * @target MV MZ
 * @plugindesc allows multiple conditions for the action pattern of enemies.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220211145411.html
 * 
 * @help This is a plug-in that allows you to specify multiple conditions
 * for the action pattern of enemies.
 * 
 * At first, create a skill for specifying multiple conditions.
 * The skill name should be "Additional Condition".
 * Then, set this skill in the "Additional Condition Skill"
 * of the plug-in parameter.
 * 
 * If you specify the Additional Condition Skill in the action pattern,
 * the condition will be added to the condition of the next action pattern.
 * Two or more additional conditions can be stacked,
 * and it will be activated only when all the conditions are met.
 * The Ratings of the additional conditions are ignored.
 * 
 * [Example]
 * Attack                Always
 * Additional Condition  HP 0% - 50%
 * Heal                  Turn 3+3*X
 * Additional Condition  Party Level >= 30
 * Additional Condition  HP 50% - 70%
 * Flame                 Turn 2+3*X
 * 
 * When the action patterns are set as above,
 * the actual action pattern and conditions are as follows:
 * 1: Attack   Always
 * 2: Heal     HP 0% - 50% and Turn 3+3X
 * 3: Flame    Party Level >= 30 and HP 50% - 70% and Turn 2+3*X
 * 
 * When used in combination with Multiple Action Plug-in(PANDA_MultiAction.js),
 * the action pattern of the additional conditions is not counted as the index.
 * In the above example, specify Attack as #1, Heal as #2, Flame as #3
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param AdditionalConditionSkillID
 * @text Additional Condition Skill
 * @desc Specify the skill to be set for the action pattern to be used as additional conditions.
 * @type skill
 * @default 
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 敵キャラの行動パターンに複数条件を指定可能にします。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220211145411.html
 * 
 * @help 敵キャラの行動パターンに複数の条件を指定できるようにするプラグインです。
 * 
 * まず最初に、複数条件指定用のスキルを作成します。
 * スキル名は「↓追加条件」とでもしておくといいでしょう。
 * そして、プラグインパラメータの「追加条件用スキル」にこのスキルを設定します。
 * 
 * 敵キャラの行動パターンで、上記で設定した追加条件用スキルをスキルに指定すると
 * 条件が直後の行動パターンの条件に追加されます。
 * 追加条件は2個以上重ねることもでき、全ての条件を満たした場合のみ発動します。
 * 追加条件のレーティングは無視されます。
 * 
 * ■ 例
 * 攻撃　　　　　常時
 * ↓追加条件　　HP 0%～50%
 * ヒール　　　　ターン 3+3*X
 * ↓追加条件　　パーティーLV>=30
 * ↓追加条件　　HP 50%～70%
 * フレイム　　　ターン 2+3*X
 * 
 * 行動パターンが上記のように設定されている場合、
 * 実際の行動パターンと発動条件は以下のようになります。
 * 1： 攻撃　　　常時
 * 2： ヒール　　HP 0%～50% かつ ターン 3+3X
 * 3： フレイム　パーティーLV>=30 かつ HP 50%～70% かつ ターン 2+3*X
 * 
 * 複数回行動条件設定プラグイン(PANDA_MultiAction.js)と併用する場合、
 * 追加条件の行動パターンは、行動パターン番号としてカウントしません。
 * 上記の例なら、攻撃は1番、ヒールは2番、フレイムは3番として指定してください。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param AdditionalConditionSkillID
 * @text 追加条件用スキル
 * @desc 追加条件として使用する行動パターンに設定するスキルを指定します。
 * @type skill
 * @default 
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 적 캐릭터의 행동 패턴에 복수 조건을 지정 가능하게 합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220211145411.html
 * 
 * @help 적 캐릭터의 행동 패턴에 복수 조건을 지정 가능하게 하는 플러그인입니다.
 * 
 * 우선, 복수 조건 지정용 스킬을 만듭니다.
 * 스킬명은 "추가 조건"이라도 해 두는 것이 좋습니다.
 * 그리고 플러그인 매개 변수의 [추가 조건용 스킬]에 이 스킬을 설정합니다.
 * 
 * 적의 행동 패턴에서 위에서 설정한 추가 조건용 스킬을 스킬로 지정하면
 * 그 조건이 직후의 행동 패턴의 조건에 추가됩니다.
 * 추가 조건은 2개 이상 겹칠 수도 있으며, 모든 조건에 맞는 경우에만 발동합니다.
 * 추가 조건의 우선도는 무시됩니다.
 * 
 * [예]
 * 공격          항상
 * 추가 조건     HP 0% - 50%
 * 회복 마법     순번 3+3*X
 * 추가 조건     파티 레벨 >= 30
 * 추가 조건     HP 50% - 70%
 * 화염 마법     순번 2+3*X
 * 
 * 행동 패턴이 위와 같으면, 실제 행동 패턴과 발동 조건은 다음과 같습니다.
 * 1: 공격       항상
 * 2: 회복 마법  HP 0% - 50% 및 순번 3+3X
 * 3: 화염 마법  파티 레벨 >= 30 및 HP 50% - 70% 및 순번 2+3*X
 * 
 * 여러 번 행동 조건 설정 플러그인(PANDA_MultiAction.js)과 함께 사용하는 경우,
 * 추가 조건의 행동 패턴은 행동 패턴 번호로 카운트하지 않습니다.
 * 위의 예라면, 공격은 1번, 회복 마법은 2번, 화염 마법은 3번으로 지정하십시오.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param AdditionalConditionSkillID
 * @text 추가 조건용 스킬
 * @desc 추가 조건으로 사용할 행동 패턴에 설정할 스킬을 지정합니다.
 * @type skill
 * @default 
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const AdditionalConditionSkillID = Number(parameters['AdditionalConditionSkillID']) || 0;
	
	
	//--------------------------------------------------
	// DataManager.onLoad
	//  [Added Definition]
	//--------------------------------------------------
	const _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object) {
		_DataManager_onLoad.call(this, object);
		if (this.isEnemiesObject(object)) {
			this.convertEnemiesActions(object);
		}
	};
	
	//--------------------------------------------------
	// DataManager.isEnemiesObject
	//  [New Definition]
	//--------------------------------------------------
	DataManager.isEnemiesObject = function(object) {
		if (Array.isArray(object)) {
			if (object[1]) {
				return !!(object[1].actions);
			}
		}
		return false;
	};
	
	//--------------------------------------------------
	// DataManager.convertEnemiesActions
	//  [New Definition]
	//--------------------------------------------------
	DataManager.convertEnemiesActions = function(array) {
		if (Array.isArray(array)) {
			for (const data of array) {
				if (data && 'actions' in data) {
					this.convertActions(data);
				}
			}
		}
	};
	
	//--------------------------------------------------
	// DataManager.convertActions
	//  [New Definition]
	//--------------------------------------------------
	DataManager.convertActions = function(data) {
		const actions = [];
		let conditions = [];
		for (let i in data.actions) {
			const action = data.actions[i];
			conditions.push({'conditionType': action.conditionType,
			                 'conditionParam1': action.conditionParam1,
			                 'conditionParam2': action.conditionParam2
			                });
			if (action.skillId !== AdditionalConditionSkillID) {
				action['conditions'] = conditions;
				actions.push(action);
				conditions = [];
			}
		}
		data.actions = actions;
	};
	
	
	//--------------------------------------------------
	// Game_Enemy.meetsCondition
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Enemy_meetsCondition = Game_Enemy.prototype.meetsCondition;
	Game_Enemy.prototype.meetsCondition = function(action) {
		if (action.conditions) {
			return action.conditions.every(value => _Game_Enemy_meetsCondition.call(this, value));
		} else {
			return _Game_Enemy_meetsCondition.call(this, action);
		}
	}
	
	
})();

