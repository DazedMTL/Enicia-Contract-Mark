//=============================================================================
// PANDA_EnableSwitch.js
//=============================================================================
// [Update History]
// 2022-09-08 Ver.1.0.0 First Release for MV/MZ.

/*:
 * @target MV MZ
 * @plugindesc to control the availability of items and skills with a switch.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220908002443.html
 * 
 * @help If you write <enableSwitch:n> in the note of items or skills,
 * that item or skill will only be usable when the switch n is ON.
 * Usage conditions such as whether it is in Battle or in the Menu screen,
 * MP cost, etc. are applied separately.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc アイテムやスキルの使用可否をスイッチで制御できるようにします。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220908002443.html
 * 
 * @help アイテムやスキルのメモ欄に <enableSwitch:n> と記述すると、
 * そのアイテムやスキルは、n番のスイッチがONの時にのみ使用可能となります。
 * 戦闘中かメニュー画面か、消費MPなどの使用条件は、これとは別に適用されます。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 아이템이나 스킬의 사용 여부를 스위치로 제어할 수 있도록 합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220908002443.html
 * 
 * @help 아이템이나 스킬의 메모란에 <enableSwitch:n> 라고 기술하면
 * 그 아이템이나 스킬은 n번 스위치가 ON일 때에만 사용할 수 있게 됩니다.
 * 전투 화면인지 메뉴 화면인지, 소비 MP 같은 사용 조건은
 * 이와는 별도로 적용됩니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
	'use strict';
	
	//--------------------------------------------------
	// Game_BattlerBase.canUse
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
	Game_BattlerBase.prototype.canUse = function(item) {
		if (_Game_BattlerBase_canUse.call(this, item)) {
			const s = item.meta.enableSwitch;
			if (s) {
				return $gameSwitches.value(Number(s));
			} else {
				return true;
			}
		} else {
			return false;
		}
	};
	
})();

