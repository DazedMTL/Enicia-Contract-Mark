//=============================================================================
// TRP_ParticleMZ_Editor.js
//=============================================================================
/*:
 * @target MZ
 * @author Thirop
 * @plugindesc パーティクルデータの編集[開発用]
 * @base TRP_ParticleMZ
 * @orderAfter TRP_ParticleMZ
 *
 * @help
 * 【更新履歴】 
 * 1.15 2021/12/6  カラーピッカーの不具合修正
 * 1.13 2021/11/3  不具合修正
 * 1.09 2021/8/18  プリセットピッカーの操作性修正
 * 1.06 2021/6/1   コマンド生成のデフォルト値変更
 * 1.03 2021/4/14  表示の微修正
 * 1.01 2021/4/12  内部処理の微細な変更
 * 1.00 2021/4/10  初版。
 *
 *
 * @param showGuide
 * @text 項目ヘルプの表示
 * @desc ON/trueにすると編集中の項目の説明が左下に表示されます。
 * @type Boolean
 * @default true
 *
 * @param paramFontSize
 * @text 項目フォントサイズ
 * @desc 画面右に表示される項目のフォントサイズ。見切れる場合には小さくしてください。(デフォ値18)
 * @type number
 * @default 18
 *
 * @param noColorCode
 * @text 色コード非表示
 * @desc colorパラメータのコード(#ffffffなど)の非表示設定。横幅が見切れる場合はON(非表示)推奨
 * @type Boolean
 * @default false
 *
 * @param buttonFontSize
 * @text ボタンフォントサイズ
 * @desc 画面右下に表示されるボタンのフォントサイズ。見切れる場合には小さくしてください。(デフォ値13)
 * @type number
 * @default 13
 *
 * @param buttonWidth
 * @text ボタンの横幅
 * @desc 画面右下に表示されるボタンの横幅。見切れる場合には小さくしてください。(デフォ値120)
 * @type number
 * @default 86
 *
 * @param saveAsArray
 * @text 配列圧縮して保存
 * @desc 配列圧縮して保存することでファイル容量を削減します。
 * @type boolean
 * @default false
 *
 * @param copyAsArray
 * @text 配列圧縮してコピー
 * @desc 配列圧縮してコピーすることでテキスト量を削減します。
 * @type boolean
 * @default true
 *
 * @param  skipListCommand
 * @text リストのコマンド削除
 * @desc TRP_ParticleMZ_Listプラグインの簡易set/play呼び出しコマンドを削除
 * @default false
 * @type boolean
 *
 */
//============================================================================= 
//PRAGMA_END: editorHeader

// ParticleEditor
// ParticleParam
// ParticleParam.ValueParam
// ParticleParam.NodeParam
// ParticleParam.ColorNodeParam
// ColorPicker
// ImagePicker

function ParticleEditor(){
    this.initialize.apply(this, arguments);
}
if (Utils.isNwjs() && Utils.isOptionValid('test')){
//PRAGMA: editorPathSetting
	ParticleEditor.DATA_DIR_PATH = 'dataEx';
	ParticleEditor.FILE_PATH = 'dataEx/TrpParticles.json';
	ParticleEditor.HELP_PATH = 'js/plugins/TRP_ParticleMZ_List.js';
	ParticleEditor.IMAGE_PATH = 'img/particles/';
	ParticleEditor.ANIMATION_PATH = 'img/animations/';
//PRAGMA_END: editorPathSetting

	//make animation dir
    var fs = require('fs');
	var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    var filePath = path.join(base, ParticleEditor.ANIMATION_PATH);
    if(!fs.existsSync(filePath)){
    	fs.mkdirSync(ParticleEditor.ANIMATION_PATH)
    }
    if(!fs.existsSync(ParticleEditor.DATA_DIR_PATH)){
    	fs.mkdirSync(ParticleEditor.DATA_DIR_PATH);
    }
};



(function(){
	"use strict";
	if (!Utils.isNwjs() || !Utils.isOptionValid('test')){
		return;
	}
    var fs = require('fs');
	var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    var filePath = path.join(base, ParticleEditor.FILE_PATH);
    if(!fs.existsSync(filePath)){
    	var file = '{}';
    	fs.writeFileSync(filePath,file);
    }
})();


(function(){
"use strict";

if (!Utils.isNwjs() || !Utils.isOptionValid('test')){
	return;
};

//PRAGMA: editorPluginNames
var pluginName = 'TRP_ParticleMZ_Editor';
var basePluginName = 'TRP_ParticleMZ';
var listPluginName = 'TRP_ParticleMZ_List';
//PRAGMA_END: editorPluginNames

var LC = TRP_Localize.localize.bind(TRP_Localize,'parEd');
var NLC = TRP_Localize.noLocalize;

var parameters = PluginManager.parameters(pluginName);
parameters.imageNames = null;
parameters.animationNames = null;

var showGuide = parameters.showGuide==='true';
var paramFontSize = Number(parameters.paramFontSize)||18;
var noColorCode = parameters.noColorCode==='true';

var saveAsArray = parameters.saveAsArray==='true';
var copyAsArray = parameters.copyAsArray==='true';

var noLineBreaks = parameters.noLineBreaks===saveAsArray;


var isMac = navigator.userAgent.match(/Macintosh|Mac/);
var displayCount = PluginManager.parameters(basePluginName).displayCount==='true';
ParticleEditor.DEFAULT_DATA = Game_Particle.DEFAULT_DATA;


(function(){
	ParticleEditor.GUIDE_TEXTS = {
		alpha:[LC('【アルファ/不透明度】',0),LC('値の範囲:0~1',1),null,LC('<中間値設定可能>',2),LC('左端が開始時(時間0)、右端が終了時(時間1)の値',3),LC('@時間(0~1) + Enterで中間値を設定可能',4),LC('delete(Macはfn+delete)で中間値の削除',5),LC('中間値編集中にshift+@時間(0~1)+Enterで時間変更',6),LC('例)@0.5 + Enterで中間地点での値を設定開始',7)],
		scale:[LC('【スケール/拡大率】',8),LC('1で等倍',9),null,LC('<中間値設定可能>',10),LC('左端が開始時(時間0)、右端が終了時(時間1)の値',11),LC('@時間(0~1) + Enterで中間値を設定可能',12),LC('delete(Macはfn+delete)で中間値の削除',13),LC('中間値編集中にshift+@時間(0~1)+Enterで時間変更',14),LC('例)@0.5 + Enterで中間地点での値を設定開始',15)],
		minimumScaleMultiplier:[LC('【最小スケール倍率】',16),LC('パーティクル生成時の最小スケール倍率',17),LC('例)0.1として開始時のスケールが0.5の場合は',18),LC('　 0.5*0.1=0.05から0.5の間の',19),LC('　 ランダムなスケールのパーティクルが発生。',20)],
		speed:[LC('【スピード/速度】',21),LC('パーティクルの速度。開始値は0にしないこと。',22),null,LC('<中間値設定可能>',23),LC('左端が開始時(時間0)、右端が終了時(時間1)の値',24),LC('@時間(0~1) + Enterで中間値を設定可能',25),LC('delete(Macはfn+delete)で中間値の削除',26),LC('中間値編集中にshift+@時間(0~1)+Enterで時間変更',27),LC('例)@0.5 + Enterで中間地点での値を設定開始',28)],
		minimumSpeedMultiplier:[LC('【最小スピード倍率】',29),LC('パーティクル生成時の最小スピード倍率',30),LC('例)0.1として開始時のスピードが0.5の場合は',31),LC('　 0.5*0.1=0.05から0.5の間の',32),LC('　 ランダムなスピードのパーティクルが発生。',33)],
		color:[LC('【カラー/色】',34),LC('左上のカラーピッカーで設定可能',35),LC('バックスペース(Macはdelete)で白にリセット',36),null,LC('<中間値設定可能>',37),LC('左端が開始時(時間0)、右端が終了時(時間1)の値',38),LC('@時間(0~1) + Enterで中間値を設定可能',39),LC('delete(Macはfn+delete)で中間値の削除',40),LC('中間値編集中にshift+@時間(0~1)+Enterで時間変更',41),LC('例)@0.5 + Enterで中間地点での値を設定開始',42)],
		colorMode:[LC('【カラーモード】',43),LC('0で時間によって色が変化。',44),LC('0以外で発生時の色の分布を変化(時間変化無し)',45)],
		acceleration:[LC('【加速度】',46),LC('加速度が有効な場合は画像の向きは移動方向で固定',47)],
		startRotation:[LC('【発生時の射出角度】',48),LC('パーティクルの飛び出す方向。(画像の向きも連動)',49),LC('0で右,90で下,180で左,270(-90)で上方向。',50)],
		rotationSpeed:[LC('【画像回転速度】',51),LC('画像の回転速度の最小値と最大値。',52),LC('動きには影響なし。',53)],
		imageOption:[LC('【画像表示設定】',54),LC('画像の向き/反転の設定。動きには影響なし。',55),LC('angle:0~360で画像のみ回転、-1でランダムな角度。',56),LC('mirror:0で調整なし,1で反転,2でランダム。',57)],
		lifetime:[LC('【パーティクル寿命】',58),LC('個々のパーティクルの消えるまでの秒数',59)],
		blendMode:[],
		frequency:[LC('【フリクエンシー/発生間隔】',60),LC('パーティクルが発生する間隔',61),LC('0.01とすると0.01秒に1回発生し、1秒間に100回',62)],
		spawnChance:[LC('【発生確率】',63),LC('各発生タイミングに、パーティクルが発生する確率。',64)],
		particlesPerWave:[LC('【1回での発生個数】',65),LC('各発生タイミングに同時に発生する個数。',66),LC('同時に発生するパーティクルのlifetimeは固定',67)],
		emitterLifetime:[LC('【エミッター寿命】',68),LC('-1で無限。0より大きくすると、指定時間で発生終了',69)],
		maxParticles:[LC('【最大表示数の制限】',70),LC('このエミッターから発生する最大数の制限値',71)],
		fluctuation:[LC('【フラクチュエーション/ゆらぎ】',72),LC('角度のゆらぎ設定。',73),LC('max:各フレームで角度の変化幅の最大値',74),LC('sensitivity:0~1で指定。小さいほどゆるやかに、大きいほど激しくゆらぐ。',75)],
		pos:[LC('【ポイント(発生方法)】',76),LC('指定の点から発生。',77),LC('<※発生方法はいずれか１つのみ指定が有効>',78)],
		rect:[LC('【レクト/四角(発生方法)】',79),LC('四角形の中からランダムに発生。',80),LC('左上の点をx,y、幅/高さをwidth,heightで指定',81),LC('<※発生方法はいずれか１つのみ指定が有効>',82)],
		circle:[LC('【サークル/円(発生方法)】',83),LC('円の中からからランダムに発生',84),LC('中心点をx,y、半径をradiusで指定。',85),LC('<※発生方法はいずれか１つのみ指定が有効>',86)],
		ring:[LC('【リング(発生方法)】',87),LC('ドーナツ状のリングからランダムに発生。',88),LC('中心点をx,y、外側の半径をradius',89),LC('内側の半径をminRで指定。',90),LC('<※発生方法はいずれか１つのみ指定が有効>',91)],
		burst:[LC('【バースト(発生方法)】',92),LC('particlesPerWaveで規則的に発生させる',93),LC('ps:射出角度の差(particleSpacing)',94),LC('sa:開始角度。ps*sa=360とすると放射状に射出(startAngle)',95),LC('dt:射出時間の差(deltaTime)',96),LC('rt:0=開始角度(startRotation)無視',97),LC('└1=開始角度優先,2=開始角度を加算(rotationType)',98),LC('r:半径(radius)',99),LC('dr:半径の差。マイナスで1周ごとの差(deltaRadius)',100),LC('dx:xの差(deltaX)',101),LC('dy:yの差(deltaY)',102),LC('<※発生方法はいずれか１つのみ指定が有効>',103)],

		sub:[LC('【サブエミッター設定】',104),LC('st:射出開始タイミング(0~1)',105),LC('et:射出終了タイミング(0~1。-1で無効)',106),LC('spd:慣性の影響度合い。0=影響なし、1=100%影響。',107),LC('iAngle:1=開始角度は慣性方向基準',108),LC('iScale:1=親パーティクルの拡大率乗数を継承',109)]
	};

	//blend mode guide text
	var texts = ParticleEditor.GUIDE_TEXTS.blendMode;
    ParticleEditor.BLEND_MODE_NAMES = Game_Particle.BLEND_MODE_NAMES;
    texts.push(LC('【ブレンドモード/画像合成方法】',110));
    var length = ParticleEditor.BLEND_MODE_NAMES.length;
    var text = '';
    for(var i = 0; i<length; i=(i+1)|0){
    	if(i%3 === 0){
    		if(i>0){
	        	texts.push(text);
	        }
    		text = '';
    	}else{
    		text += ',';
    	}
        text += i + ':' + ParticleEditor.BLEND_MODE_NAMES[i];
        if(i===length-1){
        	texts.push(text);
        }
    }
})();

function supplement(defaultValue,optionArg){
	if(optionArg === undefined){
		return defaultValue;
	}
	return optionArg;
};
function supplementNum(defaultValue,optionArg){
	return Number(supplement(defaultValue,optionArg));
};

var _supplementDefWords = ['default','def','d'];
function supplementDef(defaultValue, optionArg, otherWords) {
	var value = supplement(defaultValue,optionArg);

	var defTargetWords = otherWords || [];
	if(defTargetWords){
		defTargetWords = defTargetWords.concat(_supplementDefWords);
	}else{
		defTargetWords = _supplementDefWords;
	}

	var length = defTargetWords.length;
	for(var i=0; i<length; i=(i+1)|0){
		var target = defTargetWords[i];
		if(value === target){
			value = defaultValue;
			break;
		}
	}
	return value;
};
function supplementDefNum(defaultValue, optionArg, otherWords) {
	var value = supplementDef(defaultValue,optionArg,otherWords);
	return Number(value);
};

//=============================================================================
// Game_Particle
//=============================================================================
Game_Particle.prototype.particleEdit = function(eventId,id,target,name,z,x,y,image){
	this._particleEdit(eventId,null,id,target,name,z,x,y,image);
};
Game_Particle.prototype._particleEditWithExData = function(exData,eventId,copyName,id,target,name,z,x,y,image){
	this._particleEdit(eventId,copyName,id,target,name,z,x,y,image,exData);
};
Game_Particle.prototype._particleEdit = function(eventId,copyName,id,target,name,z,x,y,image,exData=null){
	var mainId = '';
	var subId = '';
	if(id.contains(Game_Particle.SUB_EMITTER_DEV_SUFFIX)){
		var args = id.split(Game_Particle.SUB_EMITTER_DEV_SUFFIX);
		mainId = args[0];
		subId = args[1];
		name = supplementDef(subId,name)||subId;
	}else{
		mainId = id;
		name = supplementDef(id,name)||id;
	}
	
	//ensure config data exists
	if(copyName){
		var copyData = $dataTrpParticles[copyName];
		if(!copyData){
			throw new Error('not found copy original data for name '+copyName);
		}
		$dataTrpParticles[name] = JsonEx.makeDeepCopy($dataTrpParticles[copyName]);
	}else if(!$dataTrpParticles[name]){
		if($dataTrpParticlePreset[name]){
			$dataTrpParticles[name] = JsonEx.makeDeepCopy($dataTrpParticlePreset[name]);
		}else{
			$dataTrpParticles[name] = JsonEx.makeDeepCopy(ParticleEditor.DEFAULT_DATA);
		}
	}

	//ensure emitter data exists
	var data = this.dataWithId(mainId,true);
	if(!data){
		if(!subId){
			this.particleSet(eventId,mainId,target,name,z,x,y,image);
		}else{
			throw new Error(LC('管理ID「%1」は再生されてません。',111).format(mainId));
		}
	}

	id = this.idWithSuffix(id);
    SceneManager._scene.startParticleEdit(this,id,exData);

    return true;
};




//=============================================================================
// ParticleEmitter
//=============================================================================
var _ParticleEmitter_update = ParticleEmitter.prototype.update;
ParticleEmitter.prototype.update = function(){
	if(this._destroyed)return false;

	var changed = false;
	if(this._data.editing){
		ParticleEditor.EDITING_EMITTER = this;
		changed = this.updateForEditing();
	}
	return _ParticleEmitter_update.call(this) || changed;
};

ParticleEmitter.prototype.updateForEditing = function(){
	var changed = false;
	if(this._data.forceChangeImage){
		this._data.forceChangeImage = false;
		this.changeImage(this._data.image);
	}

	if(this._data.editingSubData){
		var subData = this._data.editingSubData;
		if(subData.forceChangeImage){
			subData.forceChangeImage = false;
			this.changeImage(subData.image,this.subEmitter(subData.name));
		}
		if(subData.pChanged){
			this.updateParams(subData,this.subEmitter(subData.name));
			subData.pChanged = false;

			changed = true;
		}
	}
	return changed;
};

var _ParticleEmitter_updateEmitter = ParticleEmitter.prototype.updateEmitter;
ParticleEmitter.prototype.updateEmitter = function(){
	_ParticleEmitter_updateEmitter.call(this);
	
	if(this._restartCount<=0 
		&& this._data 
		&& this._data.editing
		&& this._emitter 
		&& ((this._emitter._emitterLife===0||!this._emitter.emit)||this.isEmitByOriginalTrigger())
		&& this._emitter.particleCount===0
		&& this._targetType!==TARGET_TYPES.click
		&& this._targetType!==TARGET_TYPES.drag)
	{
		this.restartForEditing();	
	}
};

var _ParticleEmitter_tryDestroy = ParticleEmitter.prototype.tryDestroy;
ParticleEmitter.EDIT_RESTART_COUNT = 10;
ParticleEmitter.prototype.tryDestroy = function(){
	if(this._data.editing){
		this.restartForEditing();
		return;
	}

	_ParticleEmitter_tryDestroy.call(this);
};


ParticleEmitter.prototype.restartForEditing = function(){
	this._emitter.emit = false;
	this._restartCount = ParticleEmitter.EDIT_RESTART_COUNT;
	this._stop = false;
	this._data.stop = false;
};

var _ParticleEmitter_updateForWalk = ParticleEmitter.prototype.updateForWalk;
ParticleEmitter.prototype.updateForWalk = function(){
	if(this._data.editing){
		this._emitter.emit = true;
	}else{
		_ParticleEmitter_updateForWalk.call(this);
	}
};

var _ParticleEmitter_updateForStartDash = ParticleEmitter.prototype.updateForStartDash;
ParticleEmitter.prototype.updateForStartDash = function(){
	if(this._data.editing){
		this._emitter.emit = true;
	}else{
		_ParticleEmitter_updateForStartDash.call(this);
	}
};


//=============================================================================
// Scenes
//=============================================================================
var _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	_Scene_Boot_start.call(this);

	PresetPicker.CATEGORY_NAMES = [NLC('キャラ対象',158,'character'),NLC('スクリーン/天候/リージョン',159,'screen/weather/region'),NLC('マウス/タップ',160,'click/drag'),NLC('その他',161,'Others'),NLC('非表示(/h)',162,'hidden(/h)')];
};

Scene_Base.prototype.particleCountHandlerWithId = function(id,subId){
	if(!this._particleSystem)return null;

	var emitter = this._particleSystem._emitters[id];
	if(!emitter)return null;

	return emitter.particleCount.bind(emitter,subId);
};

Scene_Base.prototype.startParticleEdit = function(particle,id,exData){
	if(this._particleEditor){
		this.addChild(this._particleEditor);
		return;
	}
	if(!this._particleSystem)return;

	this._particleEditor = new ParticleEditor(particle,id,exData);
	this.addChild(this._particleEditor);
};


var _Scene_Base_update =  Scene_Base.prototype.update;
Scene_Base.prototype.update = function(){
	if(!!this._particleEditor){
		this.updateForParticleEdit();
	}else{
		_Scene_Base_update.call(this);
	}
};
Scene_Base.prototype.updateForParticleEdit = function(){
	$gameScreen._particle.update();
	this._particleSystem.updateForEditor(this);
	this._particleEditor.update();
	if(this._particleEditor.isTerminated()){
		this.removeChild(this._particleEditor);
		this._particleEditor = null;
	}
};


var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	if(!!this._particleEditor){
		Scene_Base.prototype.update.call(this);
		this._spriteset._destinationSprite.update();
	}else{
		_Scene_Map_update.call(this);
	}
};



var _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	if(!!this._particleEditor){
		Scene_Base.prototype.update.call(this);
	}else{
		_Scene_Battle_update.call(this);
	}    
};



//=============================================================================
// Manager
//=============================================================================
ImageManager.loadParticlePreset = function(filename, hue) {
    return this.loadBitmap('img/particlePresets/', filename, hue, true);
};



//=============================================================================
// ParticleEditor
//=============================================================================
ParticleEditor.EDITING_EMITTER = null;
ParticleEditor.prototype = Object.create(PIXI.Container.prototype);
ParticleEditor.prototype.constructor = ParticleEditor;

ParticleEditor.prototype.initialize = function(particle,id,exData){
    PIXI.Container.call(this);
    this.initMembers();

    this.width = Graphics.width;
    this.height = Graphics.height;
    Input.clear();

	var data,subData,targetData;
	var subConfig = null;
	var mainId = id;
	var subId = '';
    if(id.contains(Game_Particle.SUB_EMITTER_DEV_SUFFIX)){
    	var args = id.split(Game_Particle.SUB_EMITTER_DEV_SUFFIX);
    	mainId = args[0];
    	subId = args[1];

		data = particle._data[mainId];
		targetData = subData = particle.particleData(0,subId,'this',args[1],data.z,data.x,data.y);
		subConfig = exData||{
			timing:0,
			speedRate:0,
			inheritAngle:0,
			inheritScale:0,
		};
	}else{
		targetData = data = particle._data[id];
		subData = null;
	}
	var config = Game_Particle.configData(targetData);

    if(targetData.image){
    	this.checkImageExists(targetData);
    }else if(config.image){
    	this.checkImageExists(config);
    }

    data.editing = true;
    if(subData){
    	subData.editing = true;
    }
    data.editingSubData = subData;

    this._id = id;
    this._mainId = mainId;
    this._subId = subId;
    this._particle = particle;

    this._data = data;
    this._subData = subData;
    this._config = config;
    this._subConfig = subConfig;
    this._image = config.image;

    this.trySearchImageNames();

   	this.createSelectorSprite();
    this.createParts(targetData,config);
    this.createColorPicker();
    this.createMenuButtons();
    this.createNumInfo();

    if(showGuide){
	    this.createGuideSprite();
    }

    this.registerKeyListeners();
    this.resetInputingWords();

    this.refreshPartsHidden();
};
ParticleEditor.prototype.initMembers = function(){
    this._id = '';
    this._mainId = '';
    this._subId = '';
    this._particle = null;

    this._terminated = false;
    this._data = null;
    this._subData = null;
    this._config = null;
    this._subConfig = null;
    this._image = '';

    this._lastEditingIndex = -1;
    this._editingIndex = -1;
    this._particleCount = 0;
    this._particleCountInterval = 0;
    this._commands = [];
    this._menuCommands = [];
    this._saveButton = null;
    this._hiddenButton = null;

    this._guideSprite = null;
    this._guideCache = null;

    this._countHandler = null;
    this._keydownListener = null;
    this._keyupListener = null;
    this._keyCode = 0;
    this._key = '';


    this._parts = [];
    this._particleCountSprite = null;
    this._inputtingWords = null;

    this._colorPicker = null;

    this._imagePicker = null;
    this._tilePicker = null;
    this._animationPicker = null;
    this._presetPicker = null;
    this._loadPicker = null;
    this._activePicker = null;

    this._menuSprites = [];
};

ParticleEditor.prototype.terminate = function(){
	this._terminated = true;

	var emitter = ParticleEditor.EDITING_EMITTER;
	ParticleEditor.EDITING_EMITTER = null;

	if(this._data){
		delete this._data.editing;
		delete this._data.editingSubData;
		if(emitter && emitter._emitter && emitter._emitter._emitterLife>=0){
			this._data.clear = true;
		}
	}
	if(this._subData){
		delete this._subData.editing;
	}

	this._countHandler = null;
	this._particle = null;
	this._data = null;
	this._subData = null;
	this._config = null;

	this.removeEventListeners();

	emitter = null;
}


ParticleEditor.prototype.isTerminated = function(){
	return this._terminated;
};

ParticleEditor.prototype.trySearchImageNames = function(){
	if(parameters.imageNames)return;

	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var dirPath = path.join(base,ParticleEditor.IMAGE_PATH);

	var imageNames = [];
	var files = fs.readdirSync(dirPath)
	var length = files.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var file = files[i];
    	var fp = path.join(dirPath,file);

    	if(!fs.statSync(fp).isFile())continue;
    	if(!(/.*\.png$/.test(file)))continue;
		if(file.indexOf('_ANIM_')!==0){
			imageNames.push(file.replace('.png',''));
		}
    }
    imageNames.sort();
    parameters.imageNames = imageNames;

    //animations
	dirPath = path.join(base,ParticleEditor.ANIMATION_PATH);
    var animationNames = [];
    var files = fs.readdirSync(dirPath)
	var length = files.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var file = files[i];
    	var fp = path.join(dirPath,file);

    	if(!fs.statSync(fp).isFile())continue;
    	if(!(/.*\.png$/.test(file)))continue;
		animationNames.push(file.replace('.png',''));
    }
    animationNames.sort();
    parameters.animationNames = animationNames;
};

ParticleEditor.prototype.targetData = function(){
	return this._subData || this._data;
};

/* key
===================================*/
ParticleEditor.prototype.registerKeyListeners = function(){
    var listener = this._onKeyDown.bind(this);
    this._keydownListener = listener;
    document.addEventListener('keydown', listener);

    listener = this._onKeyUp.bind(this);
    this._keyupListener = listener;
    document.addEventListener('keyup', listener);

    listener = this.processCopy.bind(this);
    this._copyListener = listener;
	document.addEventListener('copy', listener);

	listener = this.processPaste.bind(this);
    this._pasteListener = listener;
	document.addEventListener('paste', listener);
};
ParticleEditor.prototype.removeEventListeners = function(){
	if(this._keydownListener){
		document.removeEventListener('keydown',this._keydownListener);
		this._keydownListener = null;
	}
	if(this._keyupListener){
		document.removeEventListener('keyup',this._keyupListener);
		this._keyupListener = null;
	}
	if(this._copyListener){
		document.removeEventListener('copy',this._copyListener);
		this._copyListener = null;
	}
	if(this._pasteListener){
		document.removeEventListener('paste',this._pasteListener);
		this._pasteListener = null;
	}
};

ParticleEditor.prototype._onKeyDown = function(event){
	if((event.ctrlKey||event.metaKey) && event.keyCode===KEY_CODE.g){
		this.processHide();
		return;
	}
	if(this._activePicker){
		this._activePicker.onKeyDown(event.keyCode,event);
		return;
	}

	if(event.ctrlKey||event.metaKey){
		this._onControlKeyDown(event);
	}else if(!event.ctrlKey && !event.altKey) {
		this._keyCode = event.keyCode;
		this._key = event.key;
    }
};

ParticleEditor.prototype._onControlKeyDown = function(event){
	if(event.keyCode===KEY_CODE.s){
		//save
		this.processSave();
	}else if(event.keyCode===KEY_CODE.i){
		if(parameters.imageNames&&parameters.imageNames.length>0){
			this.processPickImage();
		}
	}else if(event.keyCode===KEY_CODE.p){
		this.processPickPreset();
	}else if(event.keyCode===KEY_CODE.a){
		if(parameters.animationNames&&parameters.animationNames.length>0){
			this.processPickAnimation();
		}
	}else if(event.keyCode===KEY_CODE.w){
		this.processQuit();
	}else if(event.keyCode===KEY_CODE.e){
		this.processComplete();
	}else if(event.keyCode===KEY_CODE.t){
		this.processPickTile();
	}else if(event.keyCode===KEY_CODE.l){
		this.processPickLoad();
	}
}

ParticleEditor.prototype._onKeyUp = function(event){
	// this._keyCode = 0;
};




/* word inputting
===================================*/
ParticleEditor.prototype.resetInputingWords = function(){
	if(this._inputtingWords==='')return;

	this._inputtingWords = '';
	this.prepareInputtingCandidates();
};
ParticleEditor.prototype.prepareInputtingCandidates = function(){
	this._inputtingCandidates = this._commands.concat();
	this._inputtingCandidates.push('SCREEN');
};
ParticleEditor.prototype.pushInputtingCharacter = function(chara){
	this._inputtingWords += chara;
	var words = this._inputtingWords;
	var candidates = this._inputtingCandidates;
	var length = candidates.length;
	var firstHit = null;
    for(var i = 0; i<length; i=(i+1)|0){
        var word = candidates[i];
        if(word.indexOf(words)!==0){
        	candidates.splice(i,1);
        	i -= 1;
        	length -= 1;
        }else{
        	firstHit = firstHit || word;
        }
    }
    
    if(!firstHit){
    	this.prepareInputtingCandidates();
	    candidates = this._inputtingCandidates
	    var length = candidates.length;
	    while(words.length>0 && !firstHit){
	    	for(var i=0; i<length; i=(i+1)|0){
	    		if(candidates[i].indexOf(words)!==0)continue;
	    		firstHit = candidates[i];
	    		break;
	    	}
	    	if(!firstHit){
		    	words = words.substr(1);
	    	}
	    }
	    if(firstHit){
	    	for(var i=length-1; i>=0; i=(i-1)|0){
	    		if(candidates[i].indexOf(words)!==0)continue;
	    		candidates.splice(i,1);
	    	}	
	    }
	    this._inputtingWords = words;
    }

    if(firstHit){
    	this.tryInputtingFirstHit(firstHit)
    }
};
ParticleEditor.prototype.tryInputtingFirstHit = function(firstHit){
	var perfectHit = this._inputtingWords===firstHit;
	if(firstHit==='SCREEN'){
		if(perfectHit){
			var index = this._commands.indexOf('RECT');
			this.targetData().params.rect = [-Graphics.width/2,-Graphics.height/2,Graphics.width,Graphics.height];
			this._parts[index].refreshParts();
			this.startEditing(index);
		}
	}else{
		var index = this._commands.indexOf(firstHit);
		this.startEditing(index);
	}
};


/* update
===================================*/
ParticleEditor.prototype.update = function(){
	if(this._terminated)return;

	if(this.updateParticleCount){
		this.updateParticleCount();
	}

	if(this._activePicker){
		this._activePicker.update();
		this._keyCode = 0;
		this._key = '';
		return;
	}

    var children = this.children;
    var length = children.length;
    var i=length-1;
    for(;i>=0;i-=1){
        var child = children[i];
        if (child && child.update){
            child.update();
        }
    }

    /* input & return
	===================================*/
    if(TouchInput.isTriggered()||TouchInput.isPressed()){
	    this.processTouch();
    }else if(Input._latestButton || this._keyCode){
    	this.processInput();
    }
    this._keyCode = 0;
    this._key = '';
};


ParticleEditor.prototype.processTouch = function(){
	var allParts = this._parts;
    var length = allParts.length;
    var x = TouchInput.x;
    var y = TouchInput.y;

    var margin = ParticleEditor.SELECTOR_MARGIN;
    for(var i = 0; i<length; i=(i+1)|0){
        var parts = allParts[i];
        if(parts.processTouch(x,y,margin)){
        	TouchInput.clear();
        	this.startEditing(i);
        	return;
        }else if(this._editingIndex===i){
        	if(parts.hasSaveData()){
				this.saveEditingParams();
			}
        }
    }

    //menu
    var sprites = this._menuSprites;
    var length = sprites.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var sprite = sprites[i];
        if(!sprite.visible)continue;
        if(sprite.x<=x && x<=sprite.x+sprite.width &&
        	sprite.y<=y && y<=sprite.y+sprite.height)
        {
        	this.processMenuCommand(i);
        	TouchInput.clear();
        	return;
        }
    }
};

ParticleEditor.prototype.processInput = function(){
	if(Input.isRepeated('down') && this._keyCode!==98){
		var index = this._editingIndex;
		do{
			index = (index+1)%this._parts.length;
		}while(this._parts[index].isSpawnParam());

		this.startEditing(index);
		this.resetInputingWords();
	}else if(Input.isRepeated('up') && this._keyCode!==104){
		var index = this._editingIndex;
		do{
			index -= 1;
			if(index<0)index = this._parts.length-1;
		}while(this._parts[index].isSpawnParam());
		this.startEditing(index);
		this.resetInputingWords();
	}else if(this._keyCode>=KEY_CODE.alphabet && this._keyCode<=KEY_CODE.alphabetEnd){
		this.pushInputtingCharacter(String.fromCharCode(this._keyCode));
	}else{
		var editing = this._editingIndex>=0 ? this.editingParts() : null;
		if(editing){
			if(!editing.processInput(this._keyCode,this._key)){
				this.endEditing();	
			}else{
				this.selectParts(this._editingIndex);
				if(editing.hasSaveData()){
					this.saveEditingParams();
				}
			}
		}else if(Input.isTriggered('cancel')&&this._keyCode!==96){
			if(this._saveButton.opacity<255){
				this.processQuit();
			}else{
				SoundManager.playBuzzer();
			}
		}
		if(this._keyCode!==0){
			this.resetInputingWords();
		}
	}
};

ParticleEditor.prototype.saveEditingParams = function(){
	var editing = this.editingParts();
	if(!editing)return;

	this.supplyEditingParams(editing);

	var saveData = editing.handOverSaveData();
	if(!saveData)return;
	this.saveEditingData(saveData);

	editing.didSaveParams();
};
ParticleEditor.prototype.supplyEditingParams = function(editing){};
ParticleEditor.prototype.saveEditingData = function(saveData){
	var editing = this.editingParts();
	if(!editing)return;
	this._saveEditingData(editing._title,saveData);
};
ParticleEditor.prototype._saveEditingData = function(title,saveData){
	saveData.unshift(title);
	saveData.unshift(this._id);

	this._applySaveData(saveData);
	this._saveButton.opacity = 255;
};
ParticleEditor.prototype._applySaveData = function(saveData){
	if(this._subData){
		var id = saveData.shift();
		var key = saveData.shift();
		var data = this._subData;
		this._particle.tryUpdateSpawnType(key,data);
		data.params[key] = saveData;
		data.pChanged = true;
	}else{
		this._particle.particleUpdate(saveData);
	}
};

var _ParticleEmitter__updateParam = ParticleEmitter.prototype._updateParam;
ParticleEmitter.prototype._updateParam = function(key,args,rate,emitter=this._emitter){
	if(key==='sub'){
		emitter.timing = Number(args[0])||0;
		emitter.endTiming = supplementDefNum(-1,args[1]);
		emitter.speedRate = Number(args[2])||0;
		emitter.inheritAngle = Number(args[3])||0;
		emitter.inheritScale = Number(args[4])||0;
		if(Game_Particle.GROUP_EDITOR){
			Game_Particle.GROUP_EDITOR.changeSubEmitterConfig(emitter.timing,emitter.endTiming,emitter.speedRate,emitter.inheritAngle,emitter.inheritScale);
		}
	}else{
		_ParticleEmitter__updateParam.apply(this,arguments);
	}
};

ParticleEditor.prototype.startEditing = function(index){
	if(index<0)return;

	if(this._editingIndex === index)return;


	SoundManager.playCursor();	

	var target = this._parts[index];
	if(this._editingIndex>=0){
		this._endEditing();
		index = this._parts.indexOf(target);
		if(index<0){
			this._editingIndex = -1;
			this.deselectParts();
			return;
		}
	}

	if(!target){
		this.refreshPartsHidden();
		return;
	}

	this._editingIndex = index;

	target.startEditing();

	var title = target.title();
	this.showGuideWithTitle(title);
	if(target.type() === 'color'){
		target.setPicker(this._colorPicker);
	}

	if(target.isSpawnParam()){
		var saveData = target.paramSaveData();
		this.saveEditingData(saveData);
	}

	this.refreshPartsHidden();
	this.selectParts(index);
};

ParticleEditor.prototype.spawnType = function(){
	var spawnType = this._config.spawnType;

	var params = this.targetData().params;
	if(params.rect)spawnType = 'rect';
	else if(params.circle)spawnType = 'circle';
	else if(params.ring)spawnType = 'ring';
	else if(params.burst)spawnType = 'burst';
	else if(params.pos||params.point||params.spawnPos)spawnType = 'point';

	if(spawnType==='position'||spawnType==='pos')spawnType = 'point';

	return spawnType;
};


ParticleEditor.prototype.refreshPartsHidden = function(){
	var spawnType = this.spawnType();

	var allParts = this._parts;
	var length = allParts.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var parts = allParts[i];
    	if(parts.isSpawnParam() && parts._title!==spawnType){
    		parts.hide();
    	}else{
    		parts.show();
    	}
    }
};

ParticleEditor.prototype.endEditing = function(){
	SoundManager.playCancel();

	this._lastEditingIndex = this._editingIndex;
	this._endEditing();

	this._editingIndex = -1;
	this.deselectParts();
};
ParticleEditor.prototype._endEditing = function(){
	var editing = this.editingParts();
	if(editing){
		editing.endEditing();

		if(editing.hasSaveData()){
			this.saveEditingParams();
		}
	}
}
ParticleEditor.prototype.editingParts = function(){
	return this._parts[this._editingIndex];
};

/* selector
===================================*/
ParticleEditor.prototype.createSelectorSprite = function(){
	var size = ParticleParam.LINE_HEIGHT;
	var bitmap = new Bitmap(size,size);
	bitmap.fillAll('rgb(255,255,255)');

	var sprite = new Sprite(bitmap);
	sprite.opacity = 150;
	this._selectorSprite = sprite;
	this.addChild(sprite);
	sprite.visible = false;
};
ParticleEditor.SELECTOR_MARGIN = 20;
ParticleEditor.prototype.selectParts = function(index){
	var parts = this._parts[index];
	var sprite = this._selectorSprite;
	
	var size = sprite.bitmap.height;
	sprite.y = parts.y;
	
	if(parts._align==='right'){
		sprite.anchor.set(1,0);
		sprite.x = Graphics.width;
	}else{
		sprite.anchor.set(0,0);
		sprite.x = 0;
	}
	sprite.scale.x = (parts._width+ParticleEditor.SELECTOR_MARGIN)/size;
	sprite.visible = true;
};
ParticleEditor.prototype.deselectParts = function(){
	this._selectorSprite.visible = false;
};


/* parts
===================================*/
ParticleEditor.prototype.createParts = function(data,config){
	var title,configNames,headers;
	var y = 5;

	title = 'alpha';
	configNames = ['alpha'];
	y += this.addNodeParts(y,data,config,configNames,title);

	title = 'scale';
	configNames = ['scale'];
	y += this.addNodeParts(y,data,config,configNames,title);
	title = 'minimumScaleMultiplier';
	configNames = ['scale.minimumScaleMultiplier'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);


	title = 'speed';
	configNames = ['speed'];
	y += this.addNodeParts(y,data,config,configNames,title);

	title = 'minimumSpeedMultiplier';
	configNames = ['speed.minimumSpeedMultiplier'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'color';
	configNames = ['color'];
	y += this.addColorNodeParts(y,data,config,configNames,title);

	title = 'colorMode';
	configNames = ['colorMode'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'acceleration';
	configNames = ['acceleration.x','acceleration.y'];
	headers = ['x','y'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'startRotation';
	configNames = ['startRotation.min','startRotation.max'];
	headers = ['min','max'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'rotationSpeed';
	configNames = ['rotationSpeed.min','rotationSpeed.max'];
	headers = ['min','max'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'imageOption';
	configNames = ['angle','mirrorType'];
	headers = ['angle','mirror'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'lifetime';
	configNames = ['lifetime.min','lifetime.max'];
	headers = ['min','max'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'blendMode';
	configNames = ['blendMode'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);


	title = 'frequency';
	configNames = ['frequency'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'spawnChance';
	configNames = ['spawnChance'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'particlesPerWave';
	configNames = ['particlesPerWave'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);


	title = 'emitterLifetime';
	configNames = ['emitterLifetime'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'maxParticles';
	configNames = ['maxParticles'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'fluctuation';
	configNames = ['fluctuation.max','fluctuation.sensitivity'];
	headers = ['max','sensitivity'];
	y += this.addValueParts(y,data,config,configNames,title,headers);



	y += 10;

	title = 'point';
	configNames = ['pos.x','pos.y'];
	headers = ['x','y'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'rect';
	configNames = ['spawnRect.x','spawnRect.y','spawnRect.w','spawnRect.h'];
	headers = ['x','y','w','h'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'circle';
	configNames = ['spawnCircle.x','spawnCircle.y','spawnCircle.r'];
	headers = ['x','y','r'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'ring';
	configNames = ['spawnCircle.x','spawnCircle.y','spawnCircle.r','spawnCircle.minR'];
	headers = ['x','y','r','minR'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	title = 'burst';
	configNames = ['particleSpacing','angleStart','bdt','brt','br','bdr','bdx','bdy'];
	headers = ['ps','as','dt','rt','r','dr','dx','dy'];
	y += this.addValueParts(y,data,config,configNames,title,headers);

	if(this._subData){
		y += 10;
		title = 'sub';
		configNames = ['timing','endTiming','speedRate','inheritAngle',''];
		headers = ['st','et','spd','iAngle','iScale'];
		y += this.addValueParts(y,data,this._subConfig,configNames,title,headers);
	}
};

ParticleEditor.POS_PARAMS = ['point','rect','circle','ring','burst'];

ParticleEditor.prototype.addValueParts = function(y,data,config,configNames,title,headers){
	var parts = new ParticleParam.ValueParam(data,config,configNames,title,headers);
	return this._addParts(y,parts,title);
};
ParticleEditor.prototype.addNodeParts = function(y,data,config,configNames,title){
	var parts = new ParticleParam.NodeParam(data,config,configNames,title);
	return this._addParts(y,parts,title);
};
ParticleEditor.prototype.addColorNodeParts = function(y,data,config,configNames,title){
	var parts = new ParticleParam.ColorNodeParam(data,config,configNames,title);
	return this._addParts(y,parts,title);
};

ParticleEditor.prototype._addParts = function(y,parts,title){
	parts.refresh();
	this.addChild(parts);
	this._commands.push(title.toUpperCase());
	this._parts.push(parts);
	parts.y = y;
	return parts._height;
};


/* picker
===================================*/
ParticleEditor.prototype.createColorPicker = function(){
	var size = 144;
	var picker = new ColorPicker(size);
	this._colorPicker = picker;
	this.addChild(picker);
	picker.x = 10;
	picker.y = 30;
	picker.visible = false;
};

ParticleEditor.prototype.createMenuButtons = function(){
	var sprite;
	var commands = this._menuCommands;
	var color = 'black';

	var index = 0;
	var xOffset = 0;
	var categoryOffset = 10;

	//complete
	commands.push('processComplete');
	sprite = this.menuButtonSprite(index++,xOffset,color,LC('保存＆終了',113),'(ctrl+E)');
	//save
	commands.push('processSave');
	sprite = this.menuButtonSprite(index++,xOffset,color,LC('保存',114),'(ctrl+S)');
	this._saveButton = sprite;

	xOffset += categoryOffset;

	if(this.usePickingMenuButtons()){
		//change image
		if(parameters.imageNames){
			commands.push('processPickImage');
			sprite = this.menuButtonSprite(index++,xOffset,color,LC('画像選択',115),'(ctrl+I)');
		}
		//change tile
		commands.push('processPickTile');
		sprite = this.menuButtonSprite(index++,xOffset,color,LC('タイル選択',116),'(ctrl+T)');

		//change animation
		if(parameters.animationNames){
			commands.push('processPickAnimation');
			sprite = this.menuButtonSprite(index++,xOffset,color,LC('アニメーション選択',117),'(ctrl+A)');
		}
	}


	xOffset += categoryOffset;

	//preset
	commands.push('processPickPreset');
	sprite = this.menuButtonSprite(index++,xOffset,color,LC('プリセット',118),'(ctrl+P)');

	//load
	commands.push('processPickLoad');
	sprite = this.menuButtonSprite(index++,xOffset,color,LC('読みこみ',119),'(ctrl+L)');

	xOffset += categoryOffset;

	//quit
	commands.push('processQuit');
	sprite = this.menuButtonSprite(index++,xOffset,'rgb(100,100,100)',LC('終了',120),'(ctrl+W)');


	//hidden
	commands.push('processHide');
	sprite = this.hideButtonSprite();
	this._hiddenButton = sprite;
};

ParticleEditor.prototype.usePickingMenuButtons = function(){
	return true;
};


ParticleEditor.BUTTON_FONT_SIZE = Number(parameters.buttonFontSize||16);
ParticleEditor.BUTTON_WIDTH = Number(parameters.buttonWidth||144)
ParticleEditor.BUTTON_MIN_HEIGHT = 24;
ParticleEditor.prototype.menuButtonSprite = function(index,xOffset,color,name,keyInfo){
	var fontSize = ParticleEditor.BUTTON_FONT_SIZE;
	var keyFontSize = fontSize - 2;
	var marginTB = 2;
	var calcHeight = fontSize+keyFontSize + 2*marginTB;
	var height = Math.max(ParticleEditor.BUTTON_MIN_HEIGHT,calcHeight);
	var width = ParticleEditor.BUTTON_WIDTH;
	var margin = 4;

	var bitmap = new Bitmap(width,height);
	var sprite = new Sprite(bitmap);
	this._menuSprites.push(sprite);
	this.addChild(sprite);
	bitmap.fillAll('rgba(255,255,255,0.8)');

	var y = marginTB;
	bitmap.fontSize = fontSize;
	bitmap.textColor = color;
	bitmap.outlineWidth = 0;
	bitmap.drawText(name,0,y,width,fontSize,'center');

	y += fontSize
	bitmap.fontSize = keyFontSize;
	bitmap.drawText(keyInfo,0,y,width,keyFontSize,'center');

	sprite.x = Graphics.width-margin-index*(width+margin)-width - xOffset;
	sprite.y = Graphics.height-margin-height;

	return sprite;
};

ParticleEditor.prototype.hideButtonSprite = function(){
	var w = 42;
	var h = 30;
	var bitmap = new Bitmap(w,h);
	var sprite = new Sprite(bitmap);
	this._menuSprites.push(sprite);
	this.addChild(sprite);
	sprite.x = Graphics.width-w-5;
	var button = this._menuSprites[0];
	sprite.y = button.y - h - 5;


	var ctx = bitmap._context;
	var textH = 12;

	//rounded rect
	var r = 5;
	ctx.save();
	ctx.fillStyle = 'rgba(255,255,255,0.8)';
	ctx.beginPath();
	ctx.moveTo(0+r,0);
	ctx.lineTo(w-r,0);
	ctx.arc(w-r,r,r,-90*Math.PI/180,0,false);
	ctx.lineTo(w,h-r);
	ctx.arc(w-r,h-r,r,0,90*Math.PI/180,false);
	ctx.lineTo(r,h);
	ctx.arc(r,h-r,r,90*Math.PI/180,180*Math.PI/180,false);
	ctx.lineTo(0,r);
	ctx.arc(r,r,r,180*Math.PI/180,270*Math.PI/180,false);
	ctx.fill();
	ctx.restore();

	//icon
	var cx = w/2;
	var cy = Math.floor((h-textH)/2)+2;
	var ir = ((h-textH)-10)/2;
	var irx = 15;
	var ia = 50;
	ctx.save();
	ctx.fillStyle = ctx.strokeStyle = 'rgb(160,160,160)';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(cx,cy,ir,0,Math.PI*2,false);
	ctx.fill();

	ctx.beginPath();
	ctx.arc(cx,cy+(irx-ir-2),irx,(-90-ia)*Math.PI/180,(-90+ia)*Math.PI/180);
	ctx.arc(cx,cy-(irx-ir-2),irx,(90-ia)*Math.PI/180,(90+ia)*Math.PI/180);

	ctx.closePath();
	ctx.stroke();
	ctx.restore();


	//text 
	var y = h-textH;
	bitmap.fontSize = textH-2;
	bitmap.textColor = 'black';
	bitmap.outlineWidth = 0;
	bitmap.drawText('ctrl+G',0,y,w,textH,'center');
};

ParticleEditor.prototype.processMenuCommand = function(i){
	this[this._menuCommands[i]]();
};

ParticleEditor.prototype.processSave = function(){
	if(this._saveButton.opacity<255)return;
	this.executeSave();
	SoundManager.playSave();
	this._saveButton.opacity = 100;
};
ParticleEditor.prototype.processQuit = function(){
	this.executeQuit();
};
ParticleEditor.prototype.executeQuit = function(){
	this.terminate();
	SoundManager.playCancel();
};
ParticleEditor.prototype.processComplete = function(){
	this.processSave();
	this.executeQuit();
};

ParticleEditor.prototype.processPickImage = function(){
	if(!this._imagePicker){
		this.createImagePicker();	
		if(!this._imagePicker)return;
	}
	var image = this.targetData().image || this._config.image;
	this._imagePicker.startPicking(this,image);
	this.startPicking(this._imagePicker);
};
ParticleEditor.prototype.processPickTile = function(){
	if(!(SceneManager._scene instanceof Scene_Map)){
		SoundManager.playBuzzer();
		return;
	}
	if(!this._tilePicker){
		this.createTilePicker();	
	}
	var image = this.targetData().image || this._config.image;
	this._tilePicker.startPicking(this,image);
	this.startPicking(this._tilePicker);
};
ParticleEditor.prototype.processPickAnimation = function(){
	if(!this._animationPicker){
		this.createAnimationPicker();	
	}
	var image = this.targetData().image || this._config.image;
	this._animationPicker.startPicking(this,image);
	this.startPicking(this._animationPicker);
};
ParticleEditor.prototype.processPickPreset = function(){
	if(!this._presetPicker){
		this.createPresetPicker();	
		if(!this._presetPicker)return;
	}

	var targetType = this.targetData().targetType;
	var currentData = this.editingDataObject();
	this._presetPicker.startPicking(this,targetType,currentData);
	this.startPicking(this._presetPicker);
};
ParticleEditor.prototype.processPickLoad = function(){
	if(!this._loadPicker){
		this.createLoadPicker();	
		if(!this._loadPicker)return;
	}
	var targetType = this.targetData().targetType;
	var currentData = this.editingDataObject();
	this._loadPicker.startPicking(this,targetType,currentData);
	this.startPicking(this._loadPicker);
};
ParticleEditor.prototype.startPicking = function(picker){
	this.endEditing();

	this._activePicker = picker;
	this.addChild(picker);
	this.hideMenu();
	this.hideParts();

	var dx = picker.x+ picker._width;
	this.slideNumSpritesX(dx);

	if(this._guideSprite){
		this._guideSprite.visible = false;
	}
};
ParticleEditor.prototype.didEndPicking = function(){
	var dx = -this._activePicker.x -this._activePicker._width;
	this.slideNumSpritesX(dx);

	this._activePicker.parent.removeChild(this._activePicker);
	this._activePicker = null;

	this.showParts();
	this.showMenu();

	if(this._lastEditingIndex>=0){
		this.startEditing(this._lastEditingIndex);
	}

	if(this._guideSprite){
		this._guideSprite.visible = true;
	}
};
ParticleEditor.prototype.slideNumSpritesX = function(dx){
	var system = SceneManager._scene._particleSystem;
	for(var i=0; i<3; i=(i+1)|0){
		var sprite;
		if(i===0)sprite = this._particleCountSprite;
		else if(i===1)sprite = system ? system._countSprite : null;
		else sprite = system ? system._limitedSprite : null;

		if(sprite){
			sprite.x += dx;
		}
	}
};

ParticleEditor.prototype.hideParts = function(){
	var parts = this._parts;
	var length = parts.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var sprite = parts[i];
        sprite.alpha = 0.3;
    }
};
ParticleEditor.prototype.showParts = function(){
	var parts = this._parts;
	var length = parts.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var sprite = parts[i];
        sprite.alpha = 1;
    }
};

ParticleEditor.prototype._addPicker = function(picker){
	this.addChild(picker);
	picker.x = 10;
	picker.y = 0;
}
ParticleEditor.prototype.createImagePicker = function(){
	if(!parameters.imageNames||parameters.imageNames.length===0)return;

	var picker = new ImagePicker(parameters.imageNames);
	this._imagePicker = picker;
	this._addPicker(picker);
};
ParticleEditor.prototype.createTilePicker = function(){
	var picker = new TilePicker();
	this._tilePicker = picker;
	this._addPicker(picker);
};
ParticleEditor.prototype.createAnimationPicker = function(){
	var picker = new AnimationPicker(parameters.animationNames);
	this._animationPicker = picker;
	this._addPicker(picker);
};
ParticleEditor.prototype.createPresetPicker = function(){
	var picker = new PresetPicker();
	this._presetPicker = picker;
	this._addPicker(picker);
};
ParticleEditor.prototype.createLoadPicker = function(){
	var picker = new LoadPicker();
	this._loadPicker = picker;
	this._addPicker(picker);
};

ParticleEditor.prototype.didPickImage = function(image){
	this.forceChangeImage(image);
};
ParticleEditor.prototype.changeImage = function(image){
	this._image = image || this._image;
	this.targetData().image = this._image;

	this.checkImageExists(this.targetData());
};
ParticleEditor.prototype.forceChangeImage = function(image){
	this.changeImage(image);
	this.targetData().forceChangeImage = true;
};
ParticleEditor.prototype.checkImageExists = function(data){
	var images = data.image.split(',');
	var length = images.length;

	var fs = require('fs');
	var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    var dirPath = path.join(base, ParticleEditor.IMAGE_PATH);
    var animPath = path.join(base,ParticleEditor.ANIMATION_PATH);
    var splitAnimImages = PluginManager.parameters(listPluginName).animImages||[];

    var ext = '.png';
    for(var i=length-1; i>=0; i=(i-1)|0){
        var image = images[i];
        if(image.indexOf('tile:')===0)continue

    	var filePath;
        if(image.indexOf('ANIM:')===0){
        	if(splitAnimImages.contains(image)){
        		filePath = path.join(dirPath, '_'+image.replace(/:/gi,'_')+ext);
        	}else{
        		filePath = path.join(animPath, image.split(':')[1]+ext);
        	}
        }else{
        	filePath = path.join(dirPath, image+ext)
        }
        if(!fs.existsSync(filePath)){
        	images.splice(i,1);
	    }
    }
    if(length !== images.length){
    	var length = images.length;
    	var image = '';
	    for(var i = 0; i<length; i=(i+1)|0){
	    	if(i>0){
	    		image += ',';
	    	}
	        image += images[i];
	    }
	    if(image.length===0){
	    	image = Game_Particle.defaultImage();
	    }
    	data.image = image;
    }
};

/* applyData
===================================*/
ParticleEditor.prototype.applyData = function(applyData,originalName){
	Game_Particle.migrateConfig(applyData);
	
	var allParts = this._parts;
	var length = allParts.length;
	if(this._subData){
		length -=1 ;
	}

	var data = this.targetData();
	data.params = {};

    for(var i = 0; i<length; i=(i+1)|0){
        var parts = allParts[i];
        parts.refreshWithConfigData(applyData);
    }

    var spawnType = applyData.spawnType;
    var spawnTitles = [spawnType];
    if(spawnType==='point')spawnTitles.push('pos');
    if(spawnType==='pos')spawnTitles.push('point');
    for(var i = 0; i<length; i=(i+1)|0){
        var parts = allParts[i];
        if(parts.isSpawnParam()){
        	if(!spawnTitles.contains(parts._title)){
	        	continue;
	        }
        }

        parts.applyAll();
		var saveData = parts.handOverSaveData();
		if(saveData){
			this._saveEditingData(parts._title,saveData);
		}
    }

    if(!applyData.image){
    	applyData.image = Game_Particle.defaultImage();
    }
	// this.changeImage(applyData.image);
	this.forceChangeImage(applyData.image);

    this.refreshPartsHidden();

    this.cleanupCurrentParticles();
};
ParticleEditor.prototype.cleanupCurrentParticles = function(){
	var emitter = ParticleEditor.EDITING_EMITTER;
	if(!emitter)return;

	emitter.cleanup();
};


/* numInfo
===================================*/
ParticleEditor.PARTICLE_NUM_HEADER_WIDTH = 128;
ParticleEditor.PARTICLE_NUM_HEIGHT = 20;
ParticleEditor.prototype.createNumInfo = function(){
	var width = 192;
	var height = ParticleEditor.PARTICLE_NUM_HEIGHT;
	var fontSize = 16;
	var margin = 6;

	var bitmap = new Bitmap(width,height);
	// bitmap.fillAll('rgba(0,0,0,0.3)')

	var sprite = new Sprite(bitmap);
	this._particleCountSprite = sprite;
	this.addChild(sprite);
	sprite.x = margin;
	sprite.y = margin;
	if(displayCount){
		sprite.y += 26;
	}

	bitmap.fontSize = fontSize;
	bitmap.outlineColor ='black';
	bitmap.outlineWidth = 4;
	bitmap.textColor = 'rgb(255,255,150)';
	var dw = ParticleEditor.PARTICLE_NUM_HEADER_WIDTH;
	bitmap.drawText(LC('パーティクル数:',121),0,0,dw,height);
};
ParticleEditor.PARTICLE_COUNT_INTERVAL = 10;
ParticleEditor.prototype.updateParticleCount = function(){
	var handler = this._countHandler;
	if(!handler){
		handler = SceneManager._scene.particleCountHandlerWithId(this._mainId,this._subId);
		if(handler){
			this._countHandler = handler;
		}else{
			return;
		}
	}

	this._particleCountInterval -= 1;
	if(this._particleCountInterval>0){
		return;
	}

	this._particleCountInterval = ParticleEditor.PARTICLE_COUNT_INTERVAL;
	var num = handler();
	if(this._particleCount === num)return;
	this._particleCount = num;

	var bitmap = this._particleCountSprite.bitmap;
	var x = ParticleEditor.PARTICLE_NUM_HEADER_WIDTH;
	var width = bitmap.width-x;
	var height = bitmap.height;
	bitmap.clearRect(x-2,0,width+2,height);

	bitmap.drawText(num,x,0,width,height);
};

/* guideSprite
===================================*/
ParticleEditor.GUIDE_TEXT_MARGIN = 5;
ParticleEditor.GUIDE_TEXT_FONT_SIZE = 14;
ParticleEditor.GUIDE_TEXT_LINE_HEIGHT = 18;
ParticleEditor.GUIDE_TEXT_MAX_ROW = 12;
ParticleEditor.prototype.createGuideSprite = function(){
	var maxRow = ParticleEditor.GUIDE_TEXT_MAX_ROW;
	var fontSize = ParticleEditor.GUIDE_TEXT_FONT_SIZE;
	var lineHeight = ParticleEditor.GUIDE_TEXT_LINE_HEIGHT;

	var width = $gameSystem.isJapanese() ? 300 : 500;
	var height = lineHeight*maxRow+2*ParticleEditor.GUIDE_TEXT_MARGIN;
	
	var bitmap = new Bitmap(width,height)
	var sprite = new Sprite(bitmap);
	this.addChild(sprite);
	this._guideSprite = sprite;
	sprite.anchor.set(0,1);
	sprite.visible = false;
	sprite.x = 5;
	sprite.y = Graphics.height - ParticleEditor.GUIDE_TEXT_LINE_HEIGHT - 20;

	bitmap.fontSize = fontSize;
	bitmap.outlineColor = 'black';
	bitmap.outlineWidth = 4;
};

ParticleEditor.prototype.guideTexts = function(title){
	 return ParticleEditor.GUIDE_TEXTS[title];
};
ParticleEditor.prototype.showGuideWithTitle = function(title){
	if(!showGuide)return;
	
	var sprite = this._guideSprite;
	var texts = this.guideTexts(title);
	if(!texts || texts.length===0){
		sprite.visible = false;
		return;
	}

	sprite.visible = true;
	
	if(this._guideCache===title)return;
	this._guideCache = title;

	var bitmap = sprite.bitmap;
	bitmap.clear();
	bitmap.fillAll('rgba(0,0,0,0.3)')

	var margin = ParticleEditor.GUIDE_TEXT_MARGIN;

	var width = bitmap.width;
	var height = ParticleEditor.GUIDE_TEXT_LINE_HEIGHT;
	var length = Math.min(ParticleEditor.GUIDE_TEXT_MAX_ROW,texts.length);
	var y = ParticleEditor.GUIDE_TEXT_MARGIN;
    for(var i = 0; i<length; i=(i+1)|0){
        var text = texts[i];
        if(text){
        	if(i===0){
	        	bitmap.textColor = 'rgb(255,200,150)';
	        }else if(i===1){
	        	bitmap.textColor = 'white';
	        }
	        bitmap.drawText(text,margin,y,width-2*margin,height)
        }else{
        	bitmap.textColor = 'rgb(220,220,255)';
        }
        y += height;
    }
    y += margin;
    sprite.setFrame(0,0,width,y);
};



/* save
===================================*/
ParticleEditor.prototype.executeSave = function(){
	var data = this.editingDataObject();
	if(saveAsArray){
    	data = Game_Particle.compressConfigDataToArray(data);
    }

	var date = new Date();
	var year = (date.getFullYear()%100).padZero(2);
	var month = (date.getMonth()+1).padZero(2);
	var day = date.getDate().padZero(2);
	data.comment = year+month+day;

	//register to config
	var name = this.targetData().name;
    $dataTrpParticles[name] = data;

    var file;
    if(noLineBreaks){
    	file = JSON.stringify($dataTrpParticles);
    }else{
    	file = JSON.stringify($dataTrpParticles,null,4);
    }
	this.writeSaveData(file);

	//save help
	this.writeHelpFile();
};

ParticleEditor.prototype.editingDataObject = function(){
	var allParts = this._parts;
	var length = allParts.length;

	var data = JsonEx.makeDeepCopy(ParticleEditor.DEFAULT_DATA);
    for(var i = 0; i<length; i=(i+1)|0){
        var parts = allParts[i];
        if(parts._title==='point' || !parts._hidden){
	        parts.pushSaveDataParams(data);
        }
    }

    if(!isNaN(data.blendMode)){
		data.blendMode = ParticleEditor.BLEND_MODE_NAMES[data.blendMode];
    	if(data.blendMode === undefined){
    		data.blendMode = 0;
    	}
    }
    
    this.adjustSpawnParamData(data,this.spawnType());
    
    var spawnParams = ParticleEditor.POS_PARAMS;
    var length = spawnParams.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var spawnParam = spawnParams[i];
        if(spawnParam==='point'){
        	continue;
        }
		if(data.spawnType !== spawnParam){
			delete data[spawnParam];
		}
    }

    data.noRotation = false;
    data.addAtBack = false;
    data.image = this._image;

    //add meta data
	data.targetType = this.targetData().targetType;

    return data;
};


ParticleEditor.prototype.writeSaveData = function(file,filePath = this.saveFilePath()){
    var fs = require('fs');
	var path = require('path');
    var base = path.dirname(process.mainModule.filename);
	filePath = path.join(base, filePath);
    fs.writeFileSync(filePath, file);
};
ParticleEditor.prototype.saveFilePath = function(){
	return ParticleEditor.FILE_PATH
};

ParticleEditor.prototype.adjustSpawnParamData = function(data,spawnType){
    data.spawnType = spawnType;
    if(!data.pos){
    	data.pos = {x:0,y:0};
    }
    var spawnParams = ParticleEditor.POS_PARAMS;
    var length = spawnParams.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var spawnParam = spawnParams[i];
        if(spawnParam === 'point')continue;
		if(spawnType !== spawnParam){
			delete data[spawnParam];
		}
    }
};

/* save help plugin
===================================*/
Game_Particle.isIdHidden = function(id){
	return /\/(?:h|H)(?:$|\/)/.test(id);
};
ParticleEditor.prototype.writeHelpFile = function(){
	var database = $dataTrpParticles;
	var keys = Object.keys(database);
	keys.sort();
	var length = keys.length;
	
	var file = '/*'+': @target MZ\n';
	file += ' * @'+'base TRP_ParticleMZ\n';
	file += ' * @'+'plugindesc '+LC('自作パーティクル設定の一覧',122)+'\n';
	file += ' * @'+'help\n';


	var images = [];

	var idx = 0;
    for(var i = 0; i<length; i=(i+1)|0){
    	var key = keys[i];
    	var data = database[key];

    	var isHidden = Game_Particle.isIdHidden(key)

        if(Array.isArray(data)){
        	data = Game_Particle.decompressConfigDataFromArray(data.concat());
        }
    	var imageStr = data.image;
    	var targetType = data.targetType;
    	var comment = data.comment;

        if(!isHidden){
	        if(idx++>0){
	    		file += '\n';
	    	}
	        file += ' * '+ParticleEditor.helpFileListText(key,targetType,comment);
        }

        if(imageStr){
        	imageStr.split(',').forEach(function(image){
        		if(image.indexOf('tile:')===0)return;
        		if(image.indexOf('ANIM:')===0){

        		}else if(!images.contains(image)){
	        		images.push(image);
	        	}
        	});
        }
    }

    file += this.helpPluginExtraHelpTexts();
    file += '\n *';

    if(parameters.skipListCommand !=='true'){
    	file += this.helpPluginCommandTexts();
	    file += '\n *';
    }

    var length = images.length;
    for(var i = 0; i<length; i=(i+1)|0){
        file += '\n * @requiredAssets img/particles/'+images[i];
    }

    var animImages = PluginManager.parameters(listPluginName).animImages||null;
    var length = animImages ? animImages.length : 0;
    var animImageArrStr = '';
    for(var i = 0; i<length; i=(i+1)|0){
        var image = '_'+animImages[i].replace(/:/gi,'_');
        file += '\n * @requiredAssets img/particles/'+image;
        if(i>0){
        	animImageArrStr+=',';
        }
        animImageArrStr+='"'+animImages[i]+'"';
    }
    file += '\n *'+'/';

    if(animImageArrStr.length>0){
//PRAGMA: saveListData
    	file += '\nPluginManager._parameters.trp_particlemz_list = {';
    	file += '\n\tanimImages:['+animImageArrStr+']';
    	file += '\n};';
//PRAGMA_END: saveListData
    }

    
    var fs = require('fs');
	var path = require('path');
    var base = path.dirname(process.mainModule.filename);
	var filePath = path.join(base, ParticleEditor.HELP_PATH);
    fs.writeFileSync(filePath, file);
};
ParticleEditor.helpFileListText = function(key,targetType,comment){
    var text = key + ' <';
	text += PresetPicker.TARGET_NAMES[targetType]||'---';
	text += '> ＠';
	var date = comment;
	if(!date){
		text += '---';
	}else if(isNaN(date)){
		text += comment;
	}else{
		var day = date%100;
    	var month = Math.floor(date/100)%100;
    	var year = Math.floor(date/10000)%100;
    	text += '20'+year+'/'+month+'/'+day;
	}
	return text;
}
ParticleEditor.prototype.helpPluginExtraHelpTexts = function(){
	return '';
};
ParticleEditor.prototype.helpPluginCommandTexts = function(database = $dataTrpParticles){
	var texts = '';

	var allKeys = Object.keys(database);
	allKeys.sort();
	var length = allKeys.length;

	var setDatabase = {};
	var playDatabase = {};

	var INDEXES = Game_Particle.CONFIG_PARAM_INDEXES.all;
    for(var i=0; i<length; i=(i+1)|0){
        var key = allKeys[i];
        var data = database[key];

        if(Game_Particle.isIdHidden(key)){
        	continue;
        }

        if(Array.isArray(data)){
        	data = Game_Particle.decompressConfigDataFromArray(data.concat());
        }
        var emitterLifetime = data.emitterLifetime;
        if(emitterLifetime>0){
        	playDatabase[key] = data;
        }else{
        	setDatabase[key] = data;
        }
    }

    var setData = [];
	var setNames = [];
	PresetPicker.setCategoriedList(setDatabase,setData,setNames);
	var playData = [];
	var playNames = [];
	PresetPicker.setCategoriedList(playDatabase,playData,playNames);

	var dataArr,keysArr,command;
	for(var i=0; i<2; i=(i+1)|0){
		var isSetCommand = i===0;
		if(isSetCommand){
			dataArr = setData;
			keysArr = setNames;
		}else{
			dataArr = playData;
			keysArr = playNames;
		}

		var categoryLen = keysArr.length;
	    for(var j=0; j<categoryLen; j=(j+1)|0){
	        var dataList = dataArr[j];
	        var keys = keysArr[j];
	        var category = PresetPicker.CATEGORY_NAMES_EN[j];
	        var categoryText = PresetPicker.CATEGORY_NAMES[j];
	        var keysLen = keys.length;
	        if(keysLen===0)continue;

	        if(isSetCommand){
	        	texts += '\n * @command set_'+category;
				texts += NLC('\n * @text set/表示 > ',123)+categoryText+'('+keysLen+')';
				texts += NLC('\n * @desc パーティクル表示',124);
	        }else{
	        	texts += '\n * @command play_'+category;
				texts += NLC('\n * @text play/１回再生 > ',125)+categoryText+'('+keysLen+')';
				texts += NLC('\n * @desc パーティクルを１回だけ再生',126);
	        }
    		texts += '\n *';
			texts += '\n * @arg id';
			texts += NLC('\n * @text 管理ID',127);
			texts += NLC('\n * @desc 他と被らない管理ID。「def」で設定名,「-EID」で設定名-EID',128);
			texts += '\n * @default def';
			texts += '\n *';
			texts += '\n * @arg target';
			texts += NLC('\n * @text ターゲット',129);
			texts += NLC('\n * @desc thisでこのイベント。「event:イベントID」「player」「weather」など',130);
			if(category==='screen'){
				texts += '\n * @default this';
			}else{
				texts += '\n * @default weather';
			}
			
			texts += '\n *';
			texts += '\n * @arg name';
			texts += NLC('\n * @text 《データ名》',131);
			texts += NLC('\n * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）',132);
			texts += NLC('\n * @default 《呼び出す設定を選択》',133);
		    texts += '\n * @type select';
		    for(var k = 0; k<keysLen; k=(k+1)|0){
		        var key = keys[k];
		        var data = dataList[k];
		        var targetType = data.targetType;
		        var comment = data.comment;
		        texts += '\n * @option '+ParticleEditor.helpFileListText(key,targetType,comment);
			    texts += '\n * @value '+key;
		    }
		    texts += '\n *';
			texts += '\n * @arg z';
			texts += NLC('\n * @text Z値',134);
			texts += NLC('\n * @desc 重なり順。above:上、below:後ろ、screen、spritesetなど。数値指定も可',135);
			texts += '\n * @default def';
			texts += '\n *';
			texts += '\n * @arg tag';
			texts += NLC('\n * @text 管理タグ',136);
			texts += NLC('\n * @desc 管理用のタグ名',137);
			texts += '\n *';
			texts += '\n * @arg edit';
			texts += NLC('\n * @text Editモード',138);
			texts += NLC('\n * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)',139);
			texts += '\n * @default false';
			texts += '\n * @type boolean';
			texts += '\n *';
			texts += '\n * @arg delay';
			texts += NLC('\n * @text _ディレイ',140);
			texts += NLC('\n * @desc 1以上とすると、指定フレーム後にコマンドを実効',141);
			texts += '\n * @default 0';
			texts += '\n * @type number';
			texts += '\n * @min 0';
			texts += '\n *';
			texts += '\n *';
	    }
	}
	return texts;
};



/* copy & paste
===================================*/
ParticleEditor.prototype.processCopy = function(e){
	var data = this.editingDataObject();
	delete data.comment;

	var file;
	if(copyAsArray){
		if(!Array.isArray(data)){
			data = Game_Particle.compressConfigDataToArray(data);
		}
		file = JSON.stringify(data);
	}else{
		file = JSON.stringify(data,null,4);
	}

	e.clipboardData.setData("text/plain" , file);
    e.preventDefault();

	SoundManager.playSave();
};

ParticleEditor.prototype.processPaste = function(e){
	e.preventDefault();
    var clipboardData = e.clipboardData;
    if(!clipboardData){
    	SoundManager.playBuzzer();
    	return;
    }

    var text = clipboardData.getData("text/plain");
    try{
    	var data = JSON.parse(text);
    	var dataObj = null;
    	if(Array.isArray(data)){
    		dataObj = Game_Particle.decompressConfigDataFromArray(data);
    	}else{
    		dataObj = data;
    	}

    	this.endEditing();

    	this.applyData(dataObj);
    	SoundManager.playLoad();
    } catch(e){
    	SoundManager.playBuzzer();
    }
};



/* helper
===================================*/
ParticleEditor.prototype.hideMenu = function(){
	var menuSprites = this._menuSprites;
	var length = menuSprites.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var sprite = menuSprites[i];
        sprite.opacity = 0.3*255;
    }
};
ParticleEditor.prototype.showMenu = function(){
	var menuSprites = this._menuSprites;
	var length = menuSprites.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var sprite = menuSprites[i];
        sprite.opacity = 255;
    }
};

ParticleEditor.prototype.processHide = function(){
	if(this.alpha === 1){
		this.alpha = 0.25;
	}else{
		this.alpha = 1;
	}
	SoundManager.playCursor();
};


//=============================================================================
// ParticleParam
//=============================================================================
ParticleEditor.ParticleParam = function ParticleParam(){
    this.initialize.apply(this, arguments);
};
var ParticleParam = ParticleEditor.ParticleParam;

ParticleParam.FONT_SIZE = paramFontSize||18;
ParticleParam.LINE_HEIGHT = ParticleParam.FONT_SIZE+4;

ParticleParam.prototype = Object.create(PIXI.Container.prototype);
ParticleParam.prototype.constructor = ParticleParam;
ParticleParam.prototype.initialize = function(data,config,configNames,title) {
	PIXI.Container.call(this);
    this.width = Graphics.width;
    this.height = Graphics.height;

    this._data = data;
    this._config = config;
    this._configNames = configNames;
    this._title = title;
    this._hidden = false;
    this._align = 'right';

    this._isSpawnParam = ParticleEditor.POS_PARAMS.contains(title);

    this._width = 0;
    this._height = ParticleParam.LINE_HEIGHT;

    this._titleWidth = 0;
    this._titleSprite = null;
    this._parts = [];
    this._textsCache = [];

    this._saveData = null;

    this._editingIndex = -1;
    this._inputting = '';
};

ParticleParam.prototype.title = function(){
	return this._title;
};

ParticleParam.prototype.type = function(){
	return 'value';
};
ParticleParam.prototype.isSpawnParam = function(){
	return this._isSpawnParam;
};

ParticleParam.prototype.refreshWithConfigData = function(config){
	this.refresh();
};

ParticleParam.prototype.refresh = function(){
	this.refreshParts();
};

ParticleParam.prototype.titleColor = function(){
	if(this._isSpawnParam){
		return 'rgb(255,200,100)';
	}else{
		return 'rgb(100,200,255)';
	}
};
ParticleParam.prototype.partsColor = function(){
	if(this._isSpawnParam){
		return 'rgb(255,255,200)';
	}else{
		return 'rgb(200,255,255)';
	}
};
ParticleParam.prototype.titleText = function(){
	return '['+this._title+']';
};
ParticleParam.prototype.createTitleSprite = function(){
	var sprite = new Sprite();
	this.addChild(sprite);
	this._titleSprite = sprite;

	this.refreshTitleSprite();
};
ParticleParam.prototype.refreshTitleSprite = function(){
	var text = this.titleText();

	var sprite = this._titleSprite;
	var bitmap = sprite.bitmap;

	var fontSize = ParticleParam.FONT_SIZE;
	var width = text.length*fontSize+4;
	var height = fontSize+4;
	if(bitmap && bitmap.width<width){
		bitmap.clear();
	}else{
		bitmap = new Bitmap(width,height);
		sprite.bitmap = bitmap;
	}
	

	sprite.anchor.set(this._align==='right'?1:0,0);

	bitmap.fontSize = fontSize;
	bitmap.outlineColor = 'black';
	bitmap.outlineWidth = 5;
	bitmap.textColor = this.titleColor();
	bitmap.drawText(text,0,0,width,height,this._align);

	this._titleWidth = bitmap.measureTextWidth(text);
};
ParticleParam.prototype.setAlign = function(align){
	this._align = align||'right';
}

ParticleParam.prototype.refreshParts = function(){
	var parts = this._parts;
	var length = this.partsNum();

    for(var i = 0; i<length; i=(i+1)|0){
        var text = this.partsText(i);
    	var sprite = parts[i];
    	if(!sprite){
    		sprite = this.createPartsSprite();
    		this.addChild(sprite);
    		parts[i] = sprite;
    		this._textsCache[i] = null;
    	}else{
    		sprite.visible = true;
    	}
    	if(this.checkChangeFromCache(text,i)){
	    	this.refreshPartsText(sprite,text,i);
    	}
    }
    
    var partsLen = parts.length;
    for(;i<partsLen;i=(i+1)|0){
    	parts[i].parent.removeChild(parts[i]);
    }
    parts.length = length;

    this.layout();
};

ParticleParam.prototype.checkChangeFromCache = function(text,i){
	if(this._textsCache[i] === text){
		return false;
	}

	this._textsCache[i] = text;
	return true;
};

ParticleParam.prototype.partsNum = function(){
	return 1;
};

ParticleParam.prototype.partsText = function(index){};
ParticleParam.prototype.defaultValue = function(){
	return 0;
};

ParticleParam.prototype.pushSaveDataParams = function(data){
};


ParticleParam.prototype.configValue = function(configName,config){
	var elems = configName.split('.');
	config = config || this._config;
	while(elems.length>0 && config){
		var elem = elems.shift();
		config = config[elem];
	}
	return config||this.defaultValue();
};
ParticleParam.prototype.defaultValue = function(){
	return 0;
};


ParticleParam.MAX_PARTS_WIDTH = 128;
ParticleParam.prototype.maxPartsWidth = function(){
	return ParticleParam.MAX_PARTS_WIDTH;
};

ParticleParam.prototype.createPartsSprite = function(){
	var fontSize = ParticleParam.FONT_SIZE;
	var width = this.maxPartsWidth();
	var height = fontSize+4;

	var bitmap = new Bitmap(width,height);
	bitmap.fontSize = fontSize;
	bitmap.outlineColor = 'black';
	bitmap.outlineWidth = 5;
	bitmap.textColor = this.partsColor();
	var sprite = new Sprite(bitmap);

	return sprite;
};

ParticleParam.prototype.refreshPartsText = function(sprite,text,i){
	var bitmap = sprite.bitmap;
	bitmap.clear();

	var width = bitmap.width;
	var height = bitmap.height;
	var textWidth = Math.min(width,bitmap.measureTextWidth(text)+2);
	bitmap.drawText(text,1,0,width-2,height);

	sprite._frame.width = textWidth;
	sprite._refresh();
};


ParticleParam.prototype.layout = function(){
	if(!this._titleSprite){
		this.createTitleSprite();
	}

	var margin = 5;
	var x;
	var rightAlign = this._align==='right';

	var title = this._titleSprite;
	if(rightAlign){
		x = Graphics.width-margin;
	}else{
		x = margin;
		title.x = x;
		x += this._titleWidth + margin;
	}
	

	var allParts = this._parts;
	var length = allParts.length;
	if(rightAlign){
		for(var i=length-1; i>=0; i=(i-1)|0){
	        var parts = allParts[i];
	        parts.visible = !this._hidden;
	        if(!parts.visible)continue;

        	x -= parts.width;
	        parts.x = x;
        	x -= margin;
	    }
	}else{
		for(var i = 0; i<length; i=(i+1)|0){
	        var parts = allParts[i];
	        parts.visible = !this._hidden;
	        if(!parts.visible)continue;

	        parts.x = x;
	        x += parts.width + margin;
	    }
	}
   

    var title = this._titleSprite;
    if(rightAlign){
    	title.x = x;
    	this._width = Graphics.width-x + this._titleWidth;
    }else{
    	this._width = x-margin;
    }
};

ParticleParam.prototype.show = function(){
	if(!this._hidden)return;
	this._hidden = false;
	this.layout();
};
ParticleParam.prototype.hide = function(){
	if(this._hidden)return;
	this._hidden = true;
	this.layout();
};


/* edit
===================================*/
ParticleParam.prototype.processTouch = function(x,y,margin){
	if(y<this.y)return false;
	if(y>this.y+this._height)return false;

	var rightAlign = this._align==='right';
	if(rightAlign){
		if(x<Graphics.width-this._width-margin)return false;
	}else{
		if(this._width+margin<x)return false;
	}

	var allParts = this._parts;
	var length = allParts.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var parts = allParts[i];
        if(parts.x<=x && x<=parts.x+parts.width){
        	this.setEditing(i);
        	return true;
        }
    }
	return true;
};

ParticleParam.prototype.startEditing = function(){
	this.setEditing(Math.max(0,this._editingIndex));
};
ParticleParam.prototype.setEditing = function(index){
	var parts = this._parts;
	var length = parts.length;
	index = index % length;	
	this._editingIndex = index;
	this.clearInputting();

    for(var i = 0; i<length; i=(i+1)|0){
        parts[i].opacity = i===index ? 255 : 150;
    }
    this.refreshParts();
};
ParticleParam.prototype.endEditing = function(){
	var needsRefresh = this._editingIndex>=0;
	this._editingIndex = -1;
	var parts = this._parts;
	var length = parts.length;
    for(var i = 0; i<length; i=(i+1)|0){
        parts[i].opacity = 255;
    }

    if(needsRefresh){
	    this.refreshParts();
    }
};

ParticleParam.KEY_CODE = {
	backSpace:8,
	tab:9,
	delete:46,
	num:48,
	alphabet:65,
	a:65,
	c:67,
	e:69,
	f:70,
	g:71,
	i:73,
	l:76,
	p:80,
	s:83,
	t:84,
	v:86,
	w:87,
	alphabetEnd: 90,
	tenkey:96,
	minus:189,
	tenkeyMinus:109,
	dot:190,
	tenkeyDot:110,
	at: 192,
	bracket: 219
};
var KEY_CODE = ParticleParam.KEY_CODE;

ParticleParam.prototype.processInput = function(keyCode,key){
	if(Input.isTriggered('cancel')&&keyCode!==96){
		return false;
	}else if(Input.isTriggered('ok')){
		this.clearInputting();
	}else if(keyCode===KEY_CODE.tab || (Input.isTriggered('right')&&keyCode!==102)){
		var index = this._editingIndex+1;
		if(index>this._parts.length-1)index = 0;
		this.setEditing(index);
	}else if(Input.isTriggered('left') && keyCode!==100){
		var index = this._editingIndex-1;
		if(index<0)index = this._parts.length-1;
		this.setEditing(index);
	}else if(keyCode===KEY_CODE.backSpace){
		this.clearInputting(true);
		this.applyEditing();
	}else{
		this._processCharacterInput(keyCode,key);
	}

	return true;
};
ParticleParam.prototype._processCharacterInput = function(keyCode){
	var numKeyCode = KEY_CODE.num;
	var tenKeyCode = KEY_CODE.tenkey;
	var chara = null;

	if(keyCode>=numKeyCode&&keyCode<numKeyCode+10){
		chara = Number(keyCode-numKeyCode);
	}else if(keyCode>=tenKeyCode&&keyCode<tenKeyCode+10){
		chara = Number(keyCode-tenKeyCode);
	}else if(keyCode===KEY_CODE.minus||keyCode===KEY_CODE.tenkeyMinus){
		chara = '-';
		this._inputting = '';
	}else if(keyCode===KEY_CODE.dot||keyCode===KEY_CODE.tenkeyDot){
		if(!this._inputting.contains('.')){
			chara = '.';
		}
	}
	if(chara!==null){
		this._inputting += chara;
		this.applyEditing();
	}
};

ParticleParam.prototype.clearInputting = function(){
	this._inputting = '';
};

ParticleParam.prototype.applyEditing = function(){
	var index = this._editingIndex;
	if(index<0)return;

	var value = this.valueWithInputting();
	var data = this.paramSaveData(index,value);

	if(data){
		this.saveToParam(data);
	}
	this.refreshParts();
};

ParticleParam.prototype.valueWithInputting = function(){
	var input = this._inputting;
	var value;
	if(this.type()==='color'){
		value = this._inputting;
	}else{
		value = Number(this._inputting);
		if(value === NaN){
			value = this.value(this._editingIndex);
			this._inputting = String(value);
		}
	}
	return value;
};

ParticleParam.prototype.value = function(config){return 0;};

ParticleParam.prototype.shouldSave = function(data){
	return true;
};
ParticleParam.prototype.isEqualsToLast = function(){

};
ParticleParam.prototype.saveToParam = function(data){
	if(!this.shouldSave(data)){
		return false;
	}


	data = data||this.paramSaveData();
	if(!data)return;

	this._saveData = data;
};
ParticleParam.prototype.hasSaveData = function(){
	return !!this._saveData;
};
ParticleParam.prototype.handOverSaveData = function(){
	var data = this._saveData;
	this._saveData = null;
	return data;
};
ParticleParam.prototype.didSaveParams = function(){};


//=============================================================================
// ParticleParam.ValueParam
//=============================================================================
ParticleParam.ValueParam = function(){
    this.initialize.apply(this, arguments);
};
var ValueParam = ParticleParam.ValueParam;
ValueParam.prototype = Object.create(ParticleParam.prototype);
ValueParam.prototype.constructor = ValueParam;
ValueParam.prototype.initialize = function(data,config,name,title,headers){
	ParticleParam.prototype.initialize.call(this,data,config,name,title);
	this._headers = headers;
};
ValueParam.prototype.partsHeader = function(index){
	var headers = this._headers;
	if(!headers || headers.length===0)return '';
	else if(headers.length===1)return headers[0];
	else return headers[index];
};

ValueParam.prototype.partsNum = function(){
	return this._configNames.length;
};

ValueParam.prototype.partsText = function(index){
	var text = index===this._editingIndex ? this._inputting : String(this.value(index));
	if(text === ''){
		text = String(this.value(index))
	}

	var header = this.partsHeader(index);
	if(header){
		text = header + ':'+ text;
	}
	return text
};

ValueParam.prototype.paramSaveData = function(index,value){
	var values = this.values();

	if(this._configNames[0]==='frequency' && value===0){
		return null;
	}

	if(value !== undefined){
		if(isNaN(value))return null;
		values[index] = Number(value);
	}

	return values;
};

ValueParam.prototype.values = function(){
	var ret = [];
	var num = this._parts.length;
    for(var i = 0; i<num; i=(i+1)|0){
    	var value = this.value(i);
        ret.push(value);
    }
    return ret;
};

ValueParam.prototype.value = function(index){
	var name = this._title;

	var params = this._data.params[name];
	if(params!==undefined)return params[index];

	var config = this.configValue(this._configNames[index]);
	if(config!==undefined)return config;

	return 0;
};

ValueParam.prototype.pushSaveDataParams = function(data){
	var saveData = this.paramSaveData();
	var length = saveData.length;

    for(var i = 0; i<length; i=(i+1)|0){
        var value = saveData[i];

		var configName = this._configNames[i];
		configName = configName.replace('point','pos');

		var elems = configName.split('.');
		var targetObj = data;
		while(elems.length>1){
			var elem = elems.shift();
			if(!targetObj[elem]){
				targetObj[elem] = {};
			}
			targetObj = targetObj[elem];
		}
		targetObj[elems[0]] = value;
    }
};

ValueParam.prototype.refreshWithConfigData = function(config){
	var names = this._configNames;
	var length = names.length;

	var data = this._data.params[this._title];
    for(var i = 0; i<length; i=(i+1)|0){
        var name = names[i];
        var value = this.configValue(name,config);
        if(value===undefined || value===null){
        	if(data){
        		delete this._data.params[this._title];
        	}
        	return;
        }
        if(!data){
			data = this._data.params[this._title] = [];
		}
        data[i] = value;
    }

    ParticleParam.prototype.refreshWithConfigData.call(this,config);
};
ParticleParam.prototype.applyAll = function(){
	var names = this._configNames;
	var length = names.length;

	var data = this.paramSaveData();
	if(data){
		this.saveToParam(data);
	}
};




//=============================================================================
// ParticleParam.NodeParam
//=============================================================================
ParticleParam.NodeParam = function(){
    this.initialize.apply(this, arguments);
};

var NodeParam = ParticleParam.NodeParam;
NodeParam.prototype = Object.create(ParticleParam.prototype);
NodeParam.prototype.constructor = NodeParam;
NodeParam.prototype.initialize = function(data,config,name,title) {
    ParticleParam.prototype.initialize.call(this,data,config,name,title);

    this._inputtingTimeSprite = null;
    this._lastInputtingTimeText = null;
    this._inputtingTime = null;
    this._innerData = [];
	this.initInnerData(data,config,title);
};

NodeParam.prototype.initInnerData = function(data,config,title){
	this._innerData.length = 0;

	var params = data.params[title];
	if(params){
		var length = params.length;
	    for(var i = 0; i<length; i=(i+1)|0){
	        var elems = params[i].split('@');
	        this._innerData.push({
	        	time:Number(elems[1]),
	        	value:isNaN(elems[0])?elems[0]:Number(elems[0])
	        });
	    }
	}else if(config[title].list){
		this._innerData = config[title].list.concat();
	}else{
		this._innerData.push({
			time:0,
			value:config[title].start
		});
		this._innerData.push({
			time:1,
			value:config[title].end
		});
	}
	this.sortInnerData();
};


NodeParam.prototype.refreshParts = function(){
	this.refreshInputtingSprite();
	ParticleParam.prototype.refreshParts.call(this);
};

NodeParam.prototype.refreshInputtingSprite = function(){
	var sprite = this._inputtingTimeSprite;
	if(this._inputtingTime!==null && this._editingIndex<0){
		if(!sprite){
			this._inputtingTimeSprite = sprite = this.createPartsSprite();
			this.addChild(sprite);
			sprite.anchor.set(1,0);
		}
		sprite.visible = true;
		var text = '@' + this._inputtingTime + '→';
		if(text !== this._lastInputtingTimeText){
			this._lastInputtingTimeText = text;

			var bitmap = sprite.bitmap;
			bitmap.clear();
			bitmap.fillAll('rgb(150,150,0)');
			bitmap.drawText(text,0,0,bitmap.width,bitmap.height,'right');
		}
	}else{
		if(sprite){
			sprite.visible = false;
		}
	}
};
NodeParam.prototype.layout = function(){
	ParticleParam.prototype.layout.call(this);
	var sprite = this._inputtingTimeSprite;
	if(!sprite || !sprite.visible)return;
	sprite.x = this._titleSprite.x - this._titleWidth - 4;
};

NodeParam.prototype.partsText = function(index){
	var data = this._innerData[index];
	var editing = index===this._editingIndex;
	var text = (editing&&this._inputtingTime===null) ? this._inputting : String(data.value);
	if(text === '')text = String(data.value);
	text += this._timeText(index)
	
	return text;
};
NodeParam.prototype._timeText = function(index){
	var data = this._innerData[index];
	var editing = index===this._editingIndex;
	var text = '';
	if(index>0 && index<this._innerData.length-1){
		text += '@'+data.time;
		if(this._inputtingTime!==null && editing){
			text += '→' + this._inputtingTime;
		}
	}
	return text;
};

NodeParam.prototype.titleColor = function(){
	return 'rgb(200,150,255)';
};
// NodeParam.prototype.titleText = function(){
// 	return '['+this._title+']';
// };

NodeParam.prototype.paramSaveData = function(index,value){
	var data;

	if(value !== undefined){
		value = isNaN(value) ? value : Number(value)
		var data = this._innerData[index];
		data.value = value;

		this.sortInnerData();

		var lastInputting = this._inputting;
		this.setEditing(this._innerData.indexOf(data));
		this._inputting = lastInputting;
	}


	var saveData = [];
	var innerData = this._innerData;
	var length = innerData.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var data = innerData[i];
        saveData.push(data.value+'@'+data.time);
    };

    return saveData;
};




NodeParam.prototype.sortInnerData = function(){
	this._innerData.sort(NodeParam.prototype.compareInnerData.bind(this));
};

NodeParam.prototype.compareInnerData = function(a, b) {
    return a.time-b.time;
};

NodeParam.prototype.partsNum = function(){
	return this._innerData.length;
};

/* input
===================================*/
NodeParam.prototype.processInput = function(keyCode,key){
	if(keyCode === KEY_CODE.delete){
		if(this._editingIndex!==0&&this._editingIndex!==this._innerData.length-1){
			this._innerData.splice(this._editingIndex,1);
			this.saveToParam();
			this._inputting = String(this._innerData[this._editingIndex].value);
			this.refreshParts();
		}
	}else if(keyCode===KEY_CODE.at && (isMac || Input.isPressed('shift'))){
		// mac > at = shift + @
		if(this._editingIndex>0 && this._editingIndex<this._innerData.length-1){
			this._inputtingTime = '';
			this.refreshParts();
		}else{
			SoundManager.playBuzzer();
		}
	}else if(isMac ? keyCode===KEY_CODE.bracket : keyCode===KEY_CODE.at){//[ > new
		// mac > @ = bracket
		this.setEditing(-1);
		this._inputtingTime = '';
		this.refreshParts();
	}else if(this._inputtingTime!==null){
		this.processInputForInputtingTime(keyCode,key);
	}else{
		return ParticleParam.prototype.processInput.call(this,keyCode,key);
	}
	return true;
};
NodeParam.prototype.processInputForInputtingTime = function(keyCode,key){
	var numKeyCode = KEY_CODE.num;
	var tenKeyCode = KEY_CODE.tenkey;
	if(Input.isTriggered('ok')){
		this.startEditingPartsWithTime(Number(this._inputtingTime));
		this._inputtingTime = null;
	}else if(keyCode===KEY_CODE.backSpace){
		this._inputtingTime = null;
		this.refreshParts();
	}else if(keyCode===KEY_CODE.dot||keyCode===KEY_CODE.tenkeyDot){
		if(this._inputtingTime.contains('.')){
			SoundManager.playBuzzer();
		}else{
			this._inputtingTime += '.';
		}
		this.refreshParts();
	}else if((keyCode>=numKeyCode&&keyCode<numKeyCode+10)
		||(keyCode>=tenKeyCode&&keyCode<tenKeyCode+10))
	{
		var num = (keyCode>=tenKeyCode ? keyCode-tenKeyCode : keyCode-numKeyCode);
		if(this._inputtingTime.contains('.')){
			this._inputtingTime += num;
		}else{
			this._inputtingTime = num===0 ? '0' : '1';
		}
		this.refreshParts();
	}else{
		return;
	}
};


NodeParam.prototype.setEditing = function(index){
	this._inputtingTime = null;
	ParticleParam.prototype.setEditing.call(this,index);
};
NodeParam.prototype.startEditingPartsWithTime = function(time){
	var innerData = this._innerData;
	var length = innerData.length;

	var data = this._editingIndex>=0 ? innerData[this._editingIndex] : null;
	if(data){
    	data.time = time;
    	this._inputting = String(data.value);
    }

    for(var i = 0; i<length; i=(i+1)|0){
        if(innerData[i].time === time){
        	if(this._editingIndex>=0){
        		if(this._editingIndex!==i){
	        		innerData.splice(i,1);
	        		break;
        		}
        	}else{
	        	this.setEditing(i);
	        	return;
        	}
        }
    }

   
	if(!data){
		data = {
	    	time:time,
	    	value:this.defaultValue()
	    };
	    this._inputting = data.value;
	    innerData.push(data);
	}

    this.sortInnerData();

    var index = innerData.indexOf(data);
    this._editingIndex = index;
   		
    this.setEditing(index);
    this.applyAll();
};

NodeParam.prototype.endEditing = function(){
	this._inputtingTime = null;
	ParticleParam.prototype.endEditing.call(this);
	if(this._inputtingTimeSprite){
		this._inputtingTimeSprite.visible = false;
	}
};

NodeParam.prototype.pushSaveDataParams = function(data){
	var list = this._innerData.concat();
	var configName = this._configNames[0];
	if(!data[configName]){
		data[configName] = {};
	}
	data[configName].list = list;
};


NodeParam.prototype.refreshWithConfigData = function(config){
	var params = config[this._title];
	if(!params || !params.list)return;
	
	this._innerData = params.list.concat();
	this.sortInnerData();

    ParticleParam.prototype.refreshWithConfigData.call(this,config);
};


//=============================================================================
// ParticleParam.ColorNodeParam
//=============================================================================
ParticleParam.ColorNodeParam = function(){
    this.initialize.apply(this, arguments);
};

var ColorNodeParam = ParticleParam.ColorNodeParam;
ColorNodeParam.prototype = Object.create(NodeParam.prototype);
ColorNodeParam.prototype.constructor = ColorNodeParam;
ColorNodeParam.prototype.initialize = function(data,config,name,title) {
    NodeParam.prototype.initialize.call(this,data,config,name,title);

    this._colorPicker = null;
};
ColorNodeParam.prototype.type = function(){
	return 'color';
};
ColorNodeParam.prototype.defaultValue = function(){
	return this._colorPicker ? this._colorPicker.color() : 'rgb(255,255,255)';
};

ColorNodeParam.prototype.setPicker = function(picker){
	this._colorPicker = picker;
	picker.visible = true;

	this.refreshPickerColor();
};
ColorNodeParam.prototype.refreshPickerColor = function(){
	var picker = this._colorPicker;
	if(!picker)return;

	var index = this._editingIndex;
	if(index<0)return;

	var value = this._innerData[index].value;
	picker.setColor(value);
};

ColorNodeParam.prototype.setEditing = function(index){
	NodeParam.prototype.setEditing.call(this,index);
	this.refreshPickerColor();
};
ColorNodeParam.prototype.endEditing = function(){
	NodeParam.prototype.endEditing.call(this);
	this._colorPicker.visible = false;
	this._colorPicker = null;
};
ColorNodeParam.prototype.processTouch = function(x,y,margin){
	var editingData = this._innerData[this._editingIndex];
	if(!!editingData && this._colorPicker){
		var color = this._colorPicker.color();
		if(color !== editingData.value){
			this._inputting = color;
			this.applyEditing();
		}
	}

	return NodeParam.prototype.processTouch.call(this,x,y,margin);
};

ColorNodeParam.prototype.paramSaveData = function(index,value){
	//check value is color
	if(value!==undefined){
		if(value.indexOf('rgb')===0){
			if(!value.match(/rgb\(\d+,\d+,\d+\)/)){
				return null;
			}
		}else{
			var color;
			if(value[0]==='#'){
				color = value.substr(1);
			}else{
				color = value;
				value = '#'+value;
			}

			if(isNaN(color) && color.length!==6){
				return null;
			}
		}
	}
	return NodeParam.prototype.paramSaveData.call(this,index,value);
};

/* input
===================================*/
ColorNodeParam.prototype.processInput = function(keyCode,key){
	if(keyCode === KEY_CODE.delete){
		if(this._editingIndex!==0&&this._editingIndex!==this._innerData.length-1){
			var index = this._editingIndex;
			this._innerData.splice(this._editingIndex,1);
			this._inputting = this._innerData[this._editingIndex].value;
			this.applyEditing();
		}
	}else{
		return NodeParam.prototype.processInput.call(this,keyCode,key);
	}
	return true;
};

ColorNodeParam.prototype.clearInputting = function(deleteFlag=false){
	if(deleteFlag){
		if(this._editingIndex===0){
			this._inputting = '#ffffff';
		}else{
			var previousNode = this._innerData[this._editingIndex-1];
			this._inputting = this.colorCodeWithValue(previousNode.value);
		}
	}else{
		var innerData = this._innerData[this._editingIndex];
		if(!innerData){
			innerData = this._innerData[this._editingIndex-1];
		}
		this._inputting = innerData ? innerData.value : '#ffffff';
	}
};


ColorNodeParam.prototype.refreshPartsText = function(sprite,text,i){
	var bitmap = sprite.bitmap;
	bitmap.clear();

	var width = bitmap.width;
	var height = bitmap.height;

	var data = this._innerData[i];
	var color = data ? data.value : null;
	if(color.indexOf('rgb')===0){
		if(!color.match(/rgb\(\d+,\d+,\d+\)/)){
			color = 'white';
		}
	}else{
		if(color[0]==='#'){
			color = color.substr(1);
		}
		if(!color.match(/[0-9a-f]+/)){
			color = 'white;'
		}else if(color.length!==6){
			color = 'white';
		}else{
			color = '#'+color;
		}
	}
	bitmap.fillRect(0,1,height-2,height-2,'black');
	bitmap.fillRect(1,2,height-4,height-4,color);

	var textWidth = Math.min(width,height+bitmap.measureTextWidth(text)+2);
	bitmap.drawText(text,height,0,width-2-height,height);

	sprite._frame.width = textWidth;
	sprite._refresh();
};

ColorNodeParam.prototype.partsText = function(index){
	return this._partsText(index,noColorCode);
};
ColorNodeParam.prototype._partsText = function(index,noColorCode){
	var data = this._innerData[index];
	var text;
	if(noColorCode){
		text = '';
	}else{
		text = index===this._editingIndex ? this._inputting : String(data.value);
	}	
	if(index>0 && index<this._innerData.length-1){
		// text += '@'+data.time;
		text += this._timeText(index);
	}
	return text;
};

ColorNodeParam.prototype.checkChangeFromCache = function(text,i){
	var withColorCode = this._partsText(i,false);
	if(this._textsCache[i] === withColorCode){
		return false;
	}

	this._textsCache[i] = withColorCode;
	return true;
};

ColorNodeParam.prototype.pushSaveDataParams = function(data){
	var list = this._innerData.concat();
	var configName = this._configNames[0];
	if(!data[configName]){
		data[configName] = {};
	}

	var length = list.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var node = list[i];
        var value = node.value;
        node.value = this.colorCodeWithValue(value);
    }

	data[configName].list = list;
};

ColorNodeParam.prototype.colorCodeWithValue = function(value){
    if(value.indexOf('rgb')===0){
        var values = value.match(/\((\d+),(\d+),(\d+)/);
    	return '#'+Number(values[1]).toString(16)+Number(values[2]).toString(16)+Number(values[3].toString(16));
    }else{
	    return value
    }
};


//=============================================================================
// ColorPicker
//=============================================================================
ParticleEditor.ColorPicker = function ColorPicker(){
    this.initialize.apply(this, arguments);
};
var ColorPicker = ParticleEditor.ColorPicker;


ColorPicker.colorWithHsv = function(h,s,v){
	var max = v;
	var min = max-((s/255)*max);
	var r,g,b;
	if(h<=60){
		r = max;
		g = (h/60)*(max-min)+min;
		b = min;
	}else if(h<=120){
		r = ((120-h)/60)*(max-min)+min;
		g = max;
		b = min;
	}else if(h<=180){
		r = min;
		g = max;
		b = ((h-120)/60)*(max-min)+min;
	}else if(h<=240){
		r = min;
		g = ((240-h)/60)*(max-min)+min;
		b = max;
	}else if(h<=300){
		r = ((h-240)/60)*(max-min)+min;
		g = min;
		b = max;
	}else{
		r = max;
		g = min;
		b = ((360-h)/60)*(max-min)+min;
	}
	r = Math.round(r).toString(16);
	g = Math.round(g).toString(16);
	b = Math.round(b).toString(16);
	if(r.length===1)r='0'+r;
	if(g.length===1)g='0'+g;
	if(b.length===1)b='0'+b;
	var color = '#'+r+g+b;
	return color;
};

ColorPicker.HUE_WIDTH = 20;
ColorPicker.MARGIN = 3;

ColorPicker.prototype = Object.create(PIXI.Container.prototype);
ColorPicker.prototype.constructor = ColorPicker;
ColorPicker.prototype.initialize = function(size){
    PIXI.Container.call(this);

    this._size = size;

    this._hue = -1;
    this._saturation = -1;
    this._value = -1;
    this._color = null;

    this._touchingHue = false;
    this._touchingSv = false;

    var margin = ColorPicker.MARGIN;
    var hueWidth = ColorPicker.HUE_WIDTH;
    var totalWidth = margin*3 + size + hueWidth;
    var totalHeight = margin*2 + size;

    var bitmap,sprite;

    //this > backBitmap
    bitmap = new Bitmap(16,16);
    bitmap.fillAll('rgba(0,0,0,0.5)');
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.scale.set(totalWidth/16,totalHeight/16);
    this._backSprite = sprite;


  	//pickerSprite
    bitmap = new Bitmap(size,size);
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.x = margin;
    sprite.y = margin;
    this._pickerSprite = sprite;
    this.bitmap = bitmap;

    //huePicker
    bitmap = new Bitmap(hueWidth,size);
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.x = margin*2 + size;
    sprite.y = margin;
    this._huePicker = sprite;

    //pointer
    bitmap = new Bitmap(16,16);
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.anchor.set(0.5,0.5);
    this._pointer = sprite;
    var ctx = bitmap._context;
    ctx.beginPath();
    ctx.arc(8,8,6,0,360*Math.PI/180,false);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(8,8,3,0,360*Math.PI/180,false);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fill();

    //huePointer
    var lineWidth = 2;
    var spaceHeight = 2;
    bitmap = new Bitmap(hueWidth+lineWidth*2,spaceHeight+lineWidth*2);
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.anchor.set(0.5,0.5);
    this._huePointer = sprite;
    bitmap.fillAll('black');
    bitmap.clearRect(lineWidth,lineWidth,bitmap.width-lineWidth*2,bitmap.height-lineWidth*2);


    this.setupHuePicker();
    this.setColor('rgb(255,255,255)');
};

ColorPicker.prototype.setupHuePicker = function(){
	var bitmap = this._huePicker.bitmap;
	var width = bitmap.width;
	var height = bitmap.height;

	var s = 255;
	var v = 255;
	for(var y=0; y<height; y=(y+1)|0){
		var h = 360*(y/height);
		var color = ColorPicker.colorWithHsv(h,s,v);
		bitmap.fillRect(0,y,width,1,color);
	}
};

ColorPicker.prototype.setupPallete = function(h){
	var bitmap = this._pickerSprite.bitmap;
	bitmap.clear();

	var width = this.width;
	var height = this.height;

	var r,g,b;
	for(var x=0; x<width; x=(x+1)|0){
		var s = 255*x/width;
		for(var y=0; y<height; y=(y+1)|0){
			var v = 255*y/height;
			var color = ColorPicker.colorWithHsv(h,s,v);
			bitmap.fillRect(x,height-y-1,1,1,color);
		}
	}
};

ColorPicker.prototype.setColor = function(color){
	var r,g,b;
	if(color.indexOf('rgb')!==0){
        if(color[0] == "#"){
            color = color.substr(1);
        }else if(color.indexOf("0x")===0){
            color = color.substr(2);
        }
        if(color.length == 8){
            color = color.substr(2);
        }
        r = parseInt(color.substr(0, 2), 16);
        g = parseInt(color.substr(2, 2), 16);
        b = parseInt(color.substr(4, 2), 16);
	}else{
		var args = color.match(/\((.+)\)/)[1].split(',');
		r = Number(args[0]);
		g = Number(args[1]);
		b = Number(args[2]);
	}

	var h,s,v;
	var max = Math.max(r,g,b);
	var min = Math.min(r,g,b);
	if(r===g && g===b){
		h = Math.max(0,this._hue);
	}else if(r>=g && r>=b){
		h = 60*(g-b)/(max-min);		
	}else if(g>=r && g>=b){
		h = 60*(b-r)/(max-min)+120;
	}else{
		h = 60*(r-g)/(max-min)+240;
	}

	s = (max-min)/max*255;
	v = max;

	if(h<0){
		h += 360;
	}else if(h>360){
		h -= 360;
	}

	this.setHue(h);
	this.setSV(s,v);
};

ColorPicker.prototype.updateResultColor = function(){
	this._color = ColorPicker.colorWithHsv(this._hue,this._saturation,this._value);
};

ColorPicker.prototype.color = function(){
	return this._color;
};

ColorPicker.prototype.setHue = function(h){
	h = h.clamp(0,360);
	if(this._hue === h)return;

	var dh = h-this._hue;
	this._hue = h;
	this.setupPallete(this._hue);

	var sprite = this._huePicker;
	var pointer = this._huePointer;
	pointer.x = sprite.x+sprite.width/2;
	pointer.y = sprite.y+sprite.height*h/360;

	this.updateResultColor();
};

ColorPicker.prototype.setSV = function(s,v){
	if(this._saturation===s && this._value===v)return;

	this._saturation = s;
	this._value = v;

	var margin = ColorPicker.MARGIN
	var size = this._size;

	var pointer = this._pointer;
	pointer.x = margin+Math.round((s/255)*size);
	pointer.y = margin+Math.round(size-(v/255)*size-1);

	this.updateResultColor();
};

ColorPicker.prototype.update = function(){
	if(!this.visible){
		this._touchingHue = false;
		this._touchingSv = false;
		return;
	}
	if(!TouchInput.isTriggered() && !TouchInput.isPressed()){
		this._touchingHue = false;
		this._touchingSv = false;
		return;
	}

	var x = TouchInput.x-this.x;
	var y = TouchInput.y-this.y;
	var dx,dy,touchInside;

	var hPicker = this._huePicker;
	dx = x-hPicker.x;
	dy = y-hPicker.y;

	touchInside = (dx>=0 && dx<=hPicker.width && dy>=0 && dy<=hPicker.height);
    if(this._touchingHue || (!this._touchingSv&&touchInside)){
		dy = dy.clamp(0,hPicker.height-1);
		var hue = Math.round(dy/(hPicker.height-1)*360);
		this.setHue(hue);
		this._touchingHue = true;
		return;
	}

	var svPicker = this._pickerSprite;
	dx = x-svPicker.x;
	dy = y-svPicker.y;
	touchInside = (dx>=0 && dx<=svPicker.width && dy>=0 && dy<=svPicker.height);
	if(this._touchingSv || (!this._touchingHue&&touchInside)){
		dx = dx.clamp(0,svPicker.width-1);
		dy = dy.clamp(0,svPicker.height-1);
		var s = Math.round(dx/(svPicker.width-1)*255);
		var v = Math.round((svPicker.height-1-dy)/(svPicker.height-1)*255);
		this.setSV(s,v);
		this._touchingSv = true;
		return;
	}
};



//=============================================================================
// PickerBase
//=============================================================================
function PickerBase(){
    this.initialize.apply(this, arguments);
};
PickerBase.TINT_SEVERAL = 0xaaffff;
PickerBase.TINT_NORMAL = 0xffffaa;
PickerBase.TINT_SEARCH = 0xaaffaa;
PickerBase.LAYOUT = {
	marginTopBottom:5
};

PickerBase.prototype = Object.create(PIXI.Container.prototype);
PickerBase.prototype.constructor = PickerBase;
PickerBase.prototype.initialize = function() {
    PIXI.Container.call(this);
	this.initMembers();

	this.createBackSprite();
	this.createHighlightBitmap();
	this.createGuideSprite();
	this.createHeaderSprite();
};

PickerBase.prototype.initMembers = function(){
	this._header = '';
	this._headerSprite = null;

	this._topRow = 0;
	this._maxRow = 0;
	this._dispRows = 0;
	this._maxTopRow = 0;

	this._owner = null;
    this._severalMode = false;
    this._severalModeSwitched = false;
    this._selectingIndexes = [];

    this._backSprite = null;
    this._highlightSprites = [];
    this._highlightBitmap = null;
    this._guideSprite = null;
    this._searchSprite = null;

    this._listType = null;

    this._categoryIndex = 0;
};

PickerBase.prototype.startPicking = function(owner){
	this.visible = true;
	this._owner = owner;

	Input.clear();
	TouchInput.clear();
	this.registerWheelListener();

	this.refresh();
	this._headerSprite.opacity = 255;
	this._headerSprite.visible = true;

	if(this._guideSprite){
		var sprite = this._guideSprite;
		sprite.x = this._width + 10;
		sprite.y = Graphics.height-50+(this._topRow*this.itemHeight());
	}
};

PickerBase.prototype.end = function(){
	if(this._owner){
		this._owner.didEndPicking();
	}
	this._owner = null;

	this.resignWheelListener();
	this.visible = false;


	SoundManager.playCancel();
	Input.clear();
	TouchInput.clear();
};

PickerBase.prototype.refresh = function(){
	var type = this.categoryType();
	if(this._listType === type)return;
	this.setListType(type);

	if(this.isReady()){
		this._refresh();
	}
};

PickerBase.prototype.isReady = function(){
	return true;
};

PickerBase.prototype._refresh = function(){
	var col = this.maxColumns();

	var itemWidth = this.itemWidth();
	var itemHeight = this.itemHeight();

	var margin = PickerBase.LAYOUT.marginTopBottom;
	var itemNum = this.maxItems();

	var mx = this.itemMarginX();
	var my = this.itemMarginY();

	this._maxRow = Math.ceil(itemNum/col);
	this._dispRows = Math.floor((Graphics.height-2*margin)/(itemHeight+my));
	this._maxTopRow = Math.max(0,this._maxRow-this._dispRows-1);

	var row = this._maxRow;
    var width = itemWidth*col+mx*(col-1)+margin*2;
    this._width = width;
    this._height = Graphics.height;

    this.refreshBackSprite();
	this.refreshItems();
};
PickerBase.prototype.setListType = function(type){
	this._listType = type;
	this.refreshHeaderSprite();
};

PickerBase.prototype.refreshItems = function(){};


/* needs overwrite
===================================*/
PickerBase.prototype.maxColumns = function(){return 4;};
PickerBase.prototype.itemHeight = function(){return 48;};
PickerBase.prototype.itemWidth = function(){return 48;};
PickerBase.prototype.maxItems = function(){return 0;};
PickerBase.prototype.guideTexts = function(){return null;};
PickerBase.prototype.itemMarginX = function(){return 0;};
PickerBase.prototype.itemMarginY = function(){return 0;};
PickerBase.prototype.categoryType = function(){
	return 1;
};
PickerBase.prototype.headerText = function(){return '';}

//category
PickerBase.prototype.maxCategories = function(){return 1};
PickerBase.prototype.isCategoryValid = function(index){return true};
PickerBase.prototype.isSeveralModeValid = function(){return true};
PickerBase.prototype.applyData = function(){};


/* select
===================================*/
PickerBase.prototype.deselectIndex = function(index){
	if(index<0)return;
	var arrayIdx = this._selectingIndexes.indexOf(index);
	if(arrayIdx<0)return;

	this._selectingIndexes.splice(arrayIdx,1);
	var sprite = this._highlightSprites[arrayIdx];
	if(sprite){
		this._highlightSprites.splice(arrayIdx,1);
		sprite.parent.removeChild(sprite);
	}
};

PickerBase.prototype.didPickData = function(index){
	if(this._selectingIndexes.contains(index)){
		this.deselectIndex(index);
	}else{
		this.setSelectingIndex(index);
	}
	this.applyData();
};




/* update
===================================*/
PickerBase.prototype.update = function(){
	if(this._headerSprite.visible){
		this.updateHeaderSprite();
	}
	if(this._searchSprite && this._searchSprite.opacity>0){
		this._searchSprite.opacity -= 3;
	}

	if(Input._latestButton){
		this.processInput();
	}else if(TouchInput.isLongPressed() && this.isSeveralModeValid()){
		if(!this._severalModeSwitched){
			this.switchSelectingMode();
			this._severalModeSwitched = true;
			if(this._selectingIndexes.length===0){
				this.processTouch();
			}
			this.applyData();
		}
	}else if(TouchInput.isTriggered()){
		this.processTouch();
		this._severalModeSwitched = false;
	}
};
PickerBase.prototype.onKeyDown = function(keyCode,event){
	if((!event.ctrlKey&&!event.metaKey) && keyCode>=KEY_CODE.alphabet && keyCode<=KEY_CODE.alphabetEnd){
		var chara = event.key;
		this.search(chara);
	}
};
PickerBase.prototype.search = function(chara){};
PickerBase.prototype.didSuccessSearch = function(index){
	this.setTopIndex(index);
	var sprite = this._searchSprite;
	if(!sprite){
		sprite = this.createHighlightSprite();
		this._searchSprite = sprite;
		sprite.tint = PickerBase.TINT_SEARCH;
	}
	this.setHighlightSpritePosition(sprite,index);
	sprite.opacity = 150;
};


PickerBase.prototype.processTouch = function(){
	var x = TouchInput.x - this.x;
	var y = TouchInput.y - this.y;

	if(x<0 || x>this._width){
		this.end();
		return;
	}

	var maxCol = this.maxColumns();
	var length = this.maxItems();
	var margin = PickerBase.LAYOUT.marginTopBottom;
	var mx = this.itemMarginX();
	var my = this.itemMarginY();
	var itemWidth = this.itemWidth();
	var itemHeight = this.itemHeight();
	var colW = itemWidth+mx;
	var rowH = itemHeight+my;
	var x0 = margin/2;

	var ix = x0;
	var iy = margin/2;
    for(var i = 0; i<length; i=(i+1)|0){
    	if(i===0){
    	}else if(i%maxCol === 0){
    		ix = margin/2;
    		iy += rowH;
    	}else{
    		ix += colW;
    	}
    	if(ix<=x && x<=ix+colW && iy<=y && y<=iy+rowH){
    		this.didPickData(i);
    		return;
    	}
    }
};

PickerBase.prototype.setSelectingIndex = function(index){
	SoundManager.playCursor();
	var sprite = null;
	var noSelect = index<0;

	if(this._severalMode){
		if(this._selectingIndexes.contains(index)){
			return;
		}
		this._selectingIndexes.push(index);
	}else{
		this._selectingIndexes[0] = index;
		sprite = this._highlightSprites[0];
		if(noSelect){
			if(sprite){
				this._highlightSprites.length = 0;
				sprite.parent.removeChild(sprite);
			}
			return;
		}
	}
	if(noSelect)return;

	if(!sprite){
		sprite = this.createHighlightSprite();
		this._highlightSprites.push(sprite);
	}
	sprite.tint = this._severalMode?PickerBase.TINT_SEVERAL:PickerBase.TINT_NORMAL;
	this.setHighlightSpritePosition(sprite,index);
};

PickerBase.prototype.setHighlightSpritePosition = function(sprite,index){
	var maxCol = this.maxColumns();
	var margin = PickerBase.LAYOUT.marginTopBottom;
	var mx = this.itemMarginX();
	var my = this.itemMarginY();
	var itemWidth = this.itemWidth();
	var itemHeight = this.itemHeight();

	var col = index%maxCol;
	var row = Math.floor(index/maxCol);
	sprite.visible = true;
	sprite.x = margin + col*itemWidth+(col-1)*mx;
	sprite.y = margin + row*itemHeight+(row-1)*my;
};

PickerBase.prototype.deselectAll = function(){
	var sprites = this._highlightSprites;
	var length = sprites.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var sprite = sprites[i];
        sprite.parent.removeChild(sprite);
    }
    sprites.length = 0;
    this._selectingIndexes.length = 0;
};

/* headerSprite
===================================*/
PickerBase.prototype.createHeaderSprite = function(){
	var bitmap = new Bitmap(256,24);
	var sprite = new Sprite(bitmap);
	bitmap.fontSize = 21;
	bitmap.textColor = 'white'
	bitmap.outlineWidth = 6;
	this.addChild(sprite);
	this._headerSprite = sprite;
};
PickerBase.prototype.refreshHeaderSprite = function(){
	var header = this.headerText();
	this.showHeaderSprite(header);
};
PickerBase.prototype.showHeaderSprite = function(header,color='rgb(0,0,200)'){
	if(header === this._header)return;
	this._header = header;
	var sprite = this._headerSprite;
	var bitmap = sprite.bitmap;
	bitmap.clear();
	bitmap.outlineColor = color;
	bitmap.drawText(header,1,0,bitmap.width-2,bitmap.height);
	sprite.opacity = 255;
	sprite.visible = true;

	this.addChild(sprite);
};
PickerBase.prototype.updateHeaderSprite = function(){
	if(this._headerSprite.opacity>200){
		this._headerSprite.opacity -= 1;
	}else{
		this._headerSprite.opacity -= 5;
	}
	if(this._headerSprite.opacity<=0){
		this._headerSprite.visible = false;
	}
};


/* backSprite
===================================*/
PickerBase.prototype.createBackSprite = function(){
	var sprite,bitmap;
	bitmap = new Bitmap(16,16);
	sprite = new Sprite(bitmap);
	this.addChild(sprite);
	this._backSprite = sprite;
	sprite.opacity = 150;
	bitmap.fillAll('black');
};
PickerBase.prototype.refreshBackSprite = function(){
	var width = this._width;
	var height = Graphics.height;
	var sprite = this._backSprite;
	sprite.scale.set(width/16,height/16);
};


/* highlight sprites
===================================*/
PickerBase.prototype.createHighlightBitmap = function(){
	var bitmap = new Bitmap(16,16);
	bitmap.fillAll('white');
	this._highlightBitmap = bitmap;
};
PickerBase.prototype.createHighlightSprite = function(){
	var itemHeight = this.itemHeight();
	var itemWidth = this._width / this.maxColumns();

	var bitmap = this._highlightBitmap;
	var sprite = new Sprite(bitmap);
	this.addChild(sprite);
	sprite.opacity = 100;
	sprite.scale.set(itemWidth/bitmap.width,itemHeight/bitmap.height);
	return sprite;
};

/* guide sprite
===================================*/
PickerBase.prototype.createGuideSprite = function(){
	var texts = this.guideTexts();
	if(!texts)return;

	var fontSize = 14;
	var width = $gameSystem.isJapanese() ? 200 : 400;
	var lineHeight = fontSize + 4;
	var lines = texts.length;
	var height = lineHeight*lines;
	var bitmap = new Bitmap(width,height);
	var sprite = new Sprite(bitmap);
	this.addChild(sprite);
	this._guideSprite = sprite;

	sprite.anchor.set(0,1);

	bitmap.fontSize =  fontSize;
	bitmap.fillAll('rgb(0,0,150,0.6)');

	var y = 0;
	var length = texts.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var text = texts[i];
		bitmap.drawText(text,1,y,width-2,lineHeight);
		y += lineHeight;
	};
};

/* scroll
===================================*/
PickerBase.prototype.setTopIndex = function(i){
	var row = Math.floor(i/this.maxColumns());
	var newRow = row.clamp(0,this._maxTopRow);
	if(this._topRow === newRow)return;
	this._topRow = newRow;
	this.refreshPosition();
};
PickerBase.prototype.setTopRowNext = function(){
	var index = (this._topRow-1)*this.maxColumns()
	this.setTopIndex(index);
};
PickerBase.prototype.setTopRowPrevious = function(){
	var index = (this._topRow+1)*this.maxColumns();
	this.setTopIndex(index);
};
PickerBase.prototype.refreshPosition = function(){
	var oldY = this.y
	this.y = -this._topRow*this.itemHeight();
	if(this._topRow!==0){
		this.y -= PickerBase.LAYOUT.marginTopBottom;
	}

	var dy = this.y - oldY;
	this._backSprite.y -= dy;
	if(this._guideSprite){
		this._guideSprite.y -= dy;
	}
	if(this._headerSprite){
		this._headerSprite.y -= dy;	
	}
};

PickerBase.prototype.processInput = function(){
	if(Input.isTriggered('ok')||Input.isTriggered('cancel')){
		this.end();
	}else if(Input.isRepeated('up')){
		SoundManager.playCursor();
		this.setTopRowNext();
	}else if(Input.isRepeated('down')){
		SoundManager.playCursor();
		this.setTopRowPrevious();
	}else if(Input.isRepeated('left')){
		this.processPageDown();
	}else if(Input.isRepeated('right')){
		this.processPageUp();
	}
};

PickerBase.prototype.processPageUp = function(){
	SoundManager.playCursor();
	if(this.maxCategories()>1){
		this._topRow = 0;
		var index = this._categoryIndex;
		do{
			index += 1;
			if(index>=this.maxCategories()){
				index = 0;
			}
		}while(index!==this._categoryIndex && !this.isCategoryValid(index));
		this._categoryIndex = index;
		this.refreshCategory();
	}else{
		this._topRow = Math.min(this._maxTopRow,this._topRow+this._dispRows);
		this.refreshPosition();
	}
};
PickerBase.prototype.processPageDown = function(){
	SoundManager.playCursor();
	if(this.maxCategories()>1){
		this._topRow = 0;
		var index = this._categoryIndex;
		do{
			index -= 1;
			if(index<0){
				index = this.maxCategories()-1;
			}
		}while(index!==this._categoryIndex && !this.isCategoryValid(index));
		this._categoryIndex = index;
		this.refreshCategory();
	}else{
		this._topRow = Math.max(0,this._topRow-this._dispRows);
		this.refreshPosition();	
	}
};

PickerBase.prototype.refreshCategory = function(){
	this.deselectAll();
	this.refresh();
	this.refreshPosition();
};



/* several mode
===================================*/
PickerBase.prototype.switchSelectingMode = function(){
	this.setSeveralMode(!this._severalMode);
};
PickerBase.prototype.setSeveralMode = function(valid){
	if(this._severalMode===valid)return;
	this._severalMode = valid;

	this.deselectAll();
};

/* wheel
===================================*/
PickerBase.prototype.registerWheelListener = function(){
	var listener = this._onWheel.bind(this);
    this._wheelListener = listener;
    document.addEventListener('wheel', listener);
};
PickerBase.prototype.resignWheelListener = function(){
	if(!this._wheelListener)return;

	document.removeEventListener('wheel', this._wheelListener);
	this._wheelListener = null;
};

PickerBase.prototype._onWheel = function(event) {
	if(event.deltaY>0){
		this.setTopRowNext();
	}else if(event.deltaY<0){
		this.setTopRowPrevious();
	}
    event.stopPropagation();
};


//=============================================================================
// ImagePickerBase
//=============================================================================
ParticleEditor.ImagePickerBase = function ImagePickerBase(){
    this.initialize.apply(this, arguments);
};
var ImagePickerBase = ParticleEditor.ImagePickerBase;

ImagePickerBase.prototype = Object.create(PickerBase.prototype);
ImagePickerBase.prototype.constructor = ImagePickerBase;
ImagePickerBase.prototype.initialize = function() {
    PickerBase.prototype.initialize.call(this);  
};
ImagePickerBase.prototype.applyData = function(){
	if(this._owner){
		var imageName = this.imageName();
		this._owner.didPickImage(imageName);
	}
};
ImagePickerBase.prototype.imageName = function(){return '';};




//=============================================================================
// ImagePicker
//=============================================================================
ParticleEditor.ImagePicker = function ImagePicker(){
    this.initialize.apply(this, arguments);
};
var ImagePicker = ParticleEditor.ImagePicker;

ImagePicker.MARGIN = 5;
ImagePicker.NAME_HEIGHT = 14;
ImagePicker.MAX_COL = 4;
ImagePicker.IMAGE_SIZE = 48;


ImagePicker.prototype = Object.create(ImagePickerBase.prototype);
ImagePicker.prototype.constructor = ImagePicker;
ImagePicker.prototype.initialize = function(){
    ImagePickerBase.prototype.initialize.call(this);

    this._imageNames = parameters.imageNames;
    this._imageSize = this.imageSize();

    this._imageSprites = [];
	this._nameSprites = [];
};


/* overwrite setting
===================================*/
ImagePicker.prototype.maxItems = function(){
	return this._imageNames.length;
};
ImagePicker.prototype.maxColumns = function(){
	return ImagePicker.MAX_COL;
};
ImagePicker.prototype.itemHeight = function(){
	var nameHeight = ImagePicker.NAME_HEIGHT;
	return this.imageSize() + nameHeight;
};
ImagePicker.prototype.itemWidth = function(){
	return this.imageSize();
};
ImagePicker.prototype.itemMarginX = function(){
	return ImagePicker.MARGIN;
};
ImagePicker.prototype.itemMarginY = function(){
	return 0;
};
ImagePicker.prototype.guideTexts = function(){
	return [
		LC('↑↓キー、マウスホイールでスクロール',142),
		LC('決定キー、リスト外クリックで選択終了',143),
		LC('長押しクリックで複数<=>単体選択切り替え',144)
	];
};
ImagePicker.prototype.imageName = function(){
	var name = '';
	var indexes = this._selectingIndexes;
	var length = indexes.length;
    for(var i = 0; i<length; i=(i+1)|0){
    	if(i>0){
    		name += ',';
    	}
        var index = indexes[i];
        name += this._imageNames[index];
    }
	return name;
};


/* originalSetting
===================================*/
ImagePicker.prototype.imageSize = function(){
	return ImagePicker.IMAGE_SIZE;
};

/* refresh
===================================*/
ImagePicker.prototype.refreshItems = function(){
	var nameHeight = ImagePicker.NAME_HEIGHT;
	var mx = this.itemMarginX();
	var my = this.itemMarginY();
	var margin = PickerBase.LAYOUT.marginTopBottom;

	//images
	var width = this._width;
	var itemWidth = this.itemWidth();
	var itemHeight = this.itemHeight();
	var imageSize = this.imageSize();

	var colW = itemWidth + mx;
	var rowH = itemHeight + my;
	
	var nameSprites = this._nameSprites;
	var nameSprite,nameBitmap,bitmap,sprite;

	var col = this.maxColumns();

	var imageNames = this._imageNames;
	var length = imageNames.length;
    for(var i = 0; i<length; i=(i+1)|0){
    	var r = Math.floor(i/col);
    	var c = i%col;
    	if(c===0){
    		nameSprite = nameSprites[r];
    		if(!nameSprite){
    			nameBitmap = new Bitmap(width,nameHeight);
    			nameBitmap.fontSize = nameHeight-2;

    			nameSprite = new Sprite(nameBitmap);
    			this.addChild(nameSprite);
    			nameSprites[r] = nameSprite;
    			nameSprite.y = margin+imageSize+r*rowH;
    		}else{
    			nameSprite.bitmap.clear();
    		}
    		nameBitmap = nameSprite.bitmap;
    	}

    	var name = imageNames[i];
    	var x = margin+c*(colW);
    	var y = margin+r*(rowH);
    	bitmap = ImageManager.loadParticle(name);
    	sprite = new Sprite(bitmap);
    	this.addChild(sprite);
    	sprite.anchor.set(0.5,0.5);
    	sprite.x = x+imageSize/2;
    	sprite.y = y+imageSize/2;
    	this._imageSprites.push(sprite);
    	bitmap.addLoadListener(this._adjustSpriteScale.bind(this,sprite,itemWidth,itemHeight));

    	nameBitmap.drawText(name,x,0,imageSize,nameHeight,'center');
    }
};

ImagePicker.prototype._adjustSpriteScale = function(sprite,width,height,bitmap){
	if(sprite.bitmap !== bitmap)return;

	var scale = Math.min(1,width/sprite.width,height/sprite.height);
	sprite.scale.set(scale,scale);
};


/* start picking
===================================*/
ImagePicker.prototype.startPicking = function(owner,image){
	ImagePickerBase.prototype.startPicking.call(this,owner);

	if(image){
		var images = image.split(',');
		var length = images.length;
	    var validIndexes = [];
	    for(var i = 0; i<length; i=(i+1)|0){
	        var index = this._imageNames.indexOf(images[i]);
	        if(index>=0){
	        	validIndexes.push(index);
	        }
	    }

	    length = validIndexes.length;
	    var severalMode = length>=2;
	    this.setSeveralMode(severalMode);

	    for(var i = 0; i<length; i=(i+1)|0){
	        var index = validIndexes[i];
	        this.setSelectingIndex(index);
	    }
	}
};


/* search
===================================*/
ImagePicker.prototype.search = function(chara){
	var names = this._imageNames;
	var length = names.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var name = names[i];
        if(name[0] === chara){
        	this.didSuccessSearch(i);
        	return;
        }
    }
};






//=============================================================================
// TilePicker
//=============================================================================
ParticleEditor.TilePicker =  function TilePicker(){
    this.initialize.apply(this, arguments);
};
var TilePicker = ParticleEditor.TilePicker;

TilePicker.MAX_COL = 8;
TilePicker.TILE_SCALE = 0.5;


TilePicker.prototype = Object.create(ImagePickerBase.prototype);
TilePicker.prototype.constructor = ImagePicker;
TilePicker.prototype.initialize = function(){
    ImagePickerBase.prototype.initialize.call(this);

    this._bitmaps = this.tilesetBitmaps();


    this._maxItems = 0;
    this._tileSize = this.tileSize();
    this._imageRows = 0;
    this._imageCols = 0;

    var scale = this.tileScale();
    var sprite = new Sprite();
    this._upperSprite = sprite;
    this.addChild(sprite);
    sprite.scale.set(scale,scale);

    sprite = new Sprite();
    this._lowerSprite = sprite;
    this.addChild(sprite);
    sprite.scale.set(scale,scale);
};

//PRAGMA: tilesetBitmaps
TilePicker.prototype.tilesetBitmaps = function(){
	return SceneManager._scene._spriteset._tilemap._bitmaps;
};
//PRAGMA_END: tilesetBitmaps

/* overwrite setting
===================================*/
TilePicker.prototype.maxItems = function(){
	return this._maxItems;
};
TilePicker.prototype.maxColumns = function(){
	return TilePicker.MAX_COL;
};
TilePicker.prototype.itemHeight = function(){
	return this.tileSize()*this.tileScale();
};
TilePicker.prototype.itemWidth = function(){
	return this.tileSize()*this.tileScale();
};
TilePicker.prototype.itemMarginX = function(){
	return 0;
};
TilePicker.prototype.itemMarginY = function(){
	return 0;
};
TilePicker.prototype.guideTexts = function(){
	return [
		LC('１つのタイルセットのみから選択可',145),
		LC('↑↓キー、マウスホイールでスクロール',146),
		LC('←→キー、タイルセット切り替え',147),
		LC('決定キー、リスト外クリックで選択終了',148),
		LC('長押しクリックで複数<=>単体選択切り替え',149)
	];
};

TilePicker.prototype.bitmapsImages = function(){
	var bitmaps = this._bitmaps;
	var images = [];
	var length = bitmaps.length;
    for(var i=0; i<length; i=(i+1)|0){
        var bitmap = bitmaps[i];
        if(bitmap){
        	images.push(this.imageNameForBitmap(bitmap));
        }
    }
    return images;
};
TilePicker.prototype.imageNameForBitmap = function(bitmap){
	var bitmapNameElems = bitmap._url.split('/');
	var bitmapName = bitmapNameElems[bitmapNameElems.length-1].replace('.png','');
	return bitmapName;
};
TilePicker.prototype.imageName = function(){
	var bitmapIndex = this._categoryIndex;
	var bitmapName = this.imageNameForBitmap(this._bitmaps[bitmapIndex]);
	var name = '';

	var indexes = this._selectingIndexes;
	var length = indexes.length;
	var rows = this._imageRows;
	var cols = this.maxColumns();
	var tilesetCols = ParticleEmitter.TILESET_COLUMNS;

	var lowerSpriteIndex = rows*cols;
    for(var i = 0; i<length; i=(i+1)|0){
    	if(i>0){
    		name += ',';
    	}
        var index = indexes[i];
        var tileIndex;
        var c = index%cols;
        var r = Math.floor(index/cols);
        if(index>=lowerSpriteIndex){
        	c += cols;
        	r -= rows;
        }
        var tileIndex = r*tilesetCols+c;
        
        // name += 'tile:'+bitmapIndex+':'+tileIndex;
        name +='tile:'+bitmapName+':'+tileIndex;
    }
	return name;
};
TilePicker.prototype.categoryType = function(){
	return this._categoryIndex;
};

TilePicker.prototype.maxCategories = function(){
	return this._bitmaps ? this._bitmaps.length : 1; 
};
TilePicker.prototype.isCategoryValid = function(index){
	var bitmap = this._bitmaps[index];
	if(!bitmap)return false;
	return bitmap.width>=48 && bitmap.height>=48;
};



/* originalSetting
===================================*/
TilePicker.prototype.tileSize = function(){
	return 48;
};
TilePicker.prototype.tileScale = function(){
	return TilePicker.TILE_SCALE;
};

/* refresh
===================================*/
TilePicker.prototype.setListType = function(type){
	ImagePickerBase.prototype.setListType.call(this,type);
	var tileSize = this.tileSize();

	var bitmap = this.bitmap();
	var width = bitmap.width;
	var height = bitmap.height;
	var imageCols = Math.floor(width/tileSize);
	var imageRows = Math.floor(height/tileSize);

	this._imageCols = imageCols;
	this._imageRows = imageRows;

	var maxCol = this.maxColumns();
	var validCols = Math.ceil(imageCols/maxCol)*maxCol;
	
	this._maxItems = validCols*imageRows;
};
TilePicker.prototype.refreshItems = function(){
	var tileSize = this.tileSize();

	var bitmap = this.bitmap();
	var width = bitmap.width;
	var height = bitmap.height;
	var imageCols = Math.floor(width/tileSize);
	var imageRows = Math.floor(height/tileSize);
	var maxCol = this.maxColumns();
	var margin = PickerBase.LAYOUT.marginTopBottom;

	var sprite = this._upperSprite;
	sprite.bitmap = bitmap;
	sprite._frame.width = maxCol*tileSize;
	sprite._refresh();
	sprite.x = margin;
	sprite.y = margin;

	sprite = this._lowerSprite
	sprite.visible = imageCols>maxCol
	if(sprite.visible){
		sprite.bitmap = bitmap;
		sprite._frame.x = maxCol*tileSize;
		sprite._refresh();
		sprite.x = margin;
		sprite.y = margin+height*this.tileScale();
	}
};

TilePicker.prototype.bitmap = function(){
	return this._bitmaps[this._categoryIndex];
};


/* start picking
===================================*/
TilePicker.prototype.startPicking = function(owner,imagestr){
	var tileIndexes = [];
	if(imagestr){
		var images = imagestr.split(',');

		var tilesetImages = this.bitmapsImages();
		var bitmaps = this._bitmaps;

		var tilesetIndex = -1;
		var length = images.length;
	    for(var i = 0; i<length; i=(i+1)|0){
	    	var image = images[i];
	    	var setIndex = -1;
	    	if(image.indexOf('tile:')===0){
	    		var elems = image.split(':');
	    		setIndex = tilesetImages.indexOf(elems[1]);
	    		if(tilesetIndex<0){
	    			tilesetIndex = setIndex;
	    		}else if(tilesetIndex!==setIndex){
	    			continue;
	    		}
				var tileIndex = Number(elems[2]);
	    		tileIndexes.push(tileIndex)
	    	}
	    }
	    this._categoryIndex = tilesetIndex;
	};
	if(this._categoryIndex<0){
		this._categoryIndex = this._bitmaps.length>=6 ? 5 : 0;
	}

	ImagePickerBase.prototype.startPicking.call(this,owner);
	
	var rows = this._imageRows;
	var cols = this.maxColumns();
	var tilesetCols = ParticleEmitter.TILESET_COLUMNS;
	var lowerSpriteIndex = cols*rows;
	var length = tileIndexes.length;

	var severalMode = length>=2;
    this.setSeveralMode(severalMode);

    for(var i = 0; i<length; i=(i+1)|0){
        var tileIndex = tileIndexes[i];

		var col,row;
		var col = tileIndex%tilesetCols;
		var row = Math.floor(tileIndex/tilesetCols);
		if(col >= cols){
			row += rows;
			col -= cols;
		}
		var index = row*cols + col;
		this.setSelectingIndex(index);
	}
};






//=============================================================================
// AnimationPicker
//=============================================================================
ParticleEditor.AnimationPicker =  function AnimationPicker(){
    this.initialize.apply(this, arguments);
};
var AnimationPicker = ParticleEditor.AnimationPicker;



AnimationPicker.MAX_COL = 5;
AnimationPicker.IMAGE_SCALE = 1/3;

AnimationPicker.prototype = Object.create(ImagePickerBase.prototype);
AnimationPicker.prototype.constructor = ImagePicker;
AnimationPicker.prototype.initialize = function(){
    ImagePickerBase.prototype.initialize.call(this);

    this._imageNames = parameters.animationNames;
    this._monoTone = false;

    this._maxItems = 0;
    this._imageSize = this.imageSize();
    this._imageRows = 0;
    this._imageCols = 0;

    this._bitmap = null;

    var scale = this.imageScale();
    var sprite = new Sprite();
    this._imageSprite = sprite;
    this.addChild(sprite);
    sprite.scale.set(scale,scale);
};

/* overwrite setting
===================================*/
AnimationPicker.prototype.maxItems = function(){
	return this._maxItems;
};
AnimationPicker.prototype.maxColumns = function(){
	return AnimationPicker.MAX_COL;
};
AnimationPicker.prototype.itemHeight = function(){
	return this.imageSize()*this.imageScale();
};
AnimationPicker.prototype.itemWidth = function(){
	return this.imageSize()*this.imageScale();
};
AnimationPicker.prototype.itemMarginX = function(){
	return 0;
};
AnimationPicker.prototype.itemMarginY = function(){
	return 0;
};
AnimationPicker.prototype.guideTexts = function(){
	return [
		LC('１つのアニメーション画像のみから選択可',150),
		LC('↑↓キー、マウスホイールでスクロール',151),
		LC('←→キー、画像切り替え',152),
		LC('キーボードで頭1文字をサーチ可能',153),
		LC('決定キー、リスト外クリックで選択終了',154),
		LC('長押しクリックで複数<=>単体選択切り替え',155),
		LC('Shiftでモノトーン切り替え',156),
		LC('(モノトーンはピッカー終了時に反映)',157)
	];
};
AnimationPicker.prototype.imageName = function(){
	var imageName = this._imageNames[this._categoryIndex];
	var name = ''

	var indexes = this._selectingIndexes;
	var length = indexes.length;
    for(var i = 0; i<length; i=(i+1)|0){
    	if(i>0){
    		name += ',';
    	}
        var index = indexes[i];
        name +='ANIM:'+imageName+':'+index;
        if(this._monoTone){
        	name += ':M';
        }
    }
	return name;
};
AnimationPicker.prototype.headerText = function(){
	var imageName = this._imageNames[this._categoryIndex];
	var text = '【'+imageName+'】('+(this._categoryIndex+1)+'/'+this._imageNames.length+')';
	return text;
};
AnimationPicker.prototype.categoryType = function(){
	return this._categoryIndex;
};
AnimationPicker.prototype.maxCategories = function(){
	return this._imageNames ? this._imageNames.length : 1; 
};
AnimationPicker.prototype.isCategoryValid = function(index){
	return !!this._imageNames[index];
};


/* originalSetting
===================================*/
AnimationPicker.prototype.imageSize = function(){
	return 192;
};
AnimationPicker.prototype.imageScale = function(){
	return AnimationPicker.IMAGE_SCALE;
};

/* refresh
===================================*/
AnimationPicker.prototype.setListType = function(type){
	ImagePickerBase.prototype.setListType.call(this,type);
			
	this._imageCols = 0;
	this._imageRows = 0;
	this._maxItems = 0;

	var bitmap = this.bitmap();
	this._bitmap = bitmap;
	bitmap.addLoadListener(AnimationPicker.prototype._setListType.bind(this));
};
AnimationPicker.prototype._setListType = function(bitmap){
	if(this._bitmap !== bitmap)return;

	var imageSize = this.imageSize();
	var width = bitmap.width;
	var height = bitmap.height;
	var imageCols = Math.floor(width/imageSize);
	var imageRows = Math.floor(height/imageSize);
	this._imageCols = imageCols;
	this._imageRows = imageRows;

	var maxCol = this.maxColumns();
	var validCols = Math.ceil(imageCols/maxCol)*maxCol;
	this._maxItems = validCols*imageRows;

	this._refresh();
};

AnimationPicker.prototype.refreshItems = function(){
	var imageSize = this.imageSize();

	var bitmap = this.bitmap();
	var width = bitmap.width;
	var height = bitmap.height;
	var imageCols = Math.floor(width/imageSize);
	var imageRows = Math.floor(height/imageSize);
	var maxCol = this.maxColumns();
	var margin = PickerBase.LAYOUT.marginTopBottom;

	var sprite = this._imageSprite;
	sprite.bitmap = bitmap;
	sprite._frame.width = maxCol*imageSize;
	sprite._refresh();
	sprite.x = margin;
	sprite.y = margin;
};

AnimationPicker.prototype.bitmap = function(){
	var imageName = this._imageNames[this._categoryIndex];
	return ImageManager.loadAnimation(imageName);
};


/* start picking
===================================*/
AnimationPicker.prototype.startPicking = function(owner,imagestr){
	var frames = [];
	if(imagestr){
		var images = imagestr.split(',');

		var length = images.length;
		var index = -1;
	    for(var i = 0; i<length; i=(i+1)|0){
	    	var image = images[i];
	    	if(image.indexOf('ANIM:')===0){
	    		var elems = image.split(':');
	    		var animImage = elems[1];
	    		if(index<0){
	    			index = this._imageNames.indexOf(animImage);
	    		}
				var frame = Number(elems[2]);
	    		frames.push(frame)
	    	}
	    }
	    this._categoryIndex = index;
	};
	if(this._categoryIndex<0){
		this._categoryIndex = 0;
	}

	ImagePickerBase.prototype.startPicking.call(this,owner);
	
	var rows = this._imageRows;
	var cols = this.maxColumns();
	var length = frames.length;

	var severalMode = length>=2;
    this.setSeveralMode(severalMode);
    for(var i = 0; i<length; i=(i+1)|0){
        var frame = frames[i];

		var col,row;
		var col = frame%cols;
		var row = Math.floor(frame/cols);
		if(col >= cols){
			row += rows;
			col -= cols;
		}
		var index = row*cols + col;
		this.setSelectingIndex(index);
	}
};

/* search
===================================*/
AnimationPicker.prototype.search = function(chara){
	var imageNames = this._imageNames;
	var length = imageNames.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var image = imageNames[i];
        if(image[0].toLowerCase()===chara){
        	SoundManager.playCursor();
        	if(this._categoryIndex===i){
        		this._headerSprite.opacity = 255;
				this._headerSprite.visible = true;
        	}else{
	        	this._categoryIndex = i;
	        	this._topRow = 0;
	        	this.refreshCategory();
        	}
        	return;
        }
    }
};

/* MonoTone
===================================*/
AnimationPicker.prototype.update = function(){
	PickerBase.prototype.update.call(this);
	if(Input.isTriggered('shift')){
		this.changeMonoTone();
	}
};
AnimationPicker.prototype.changeMonoTone = function(){
	if(PIXI.filters.ColorMatrixFilter){
		this._monoTone = !this._monoTone;
		SoundManager.playCursor();
		if(this._monoTone){
			var filter = new PIXI.filters.ColorMatrixFilter();
	    	filter.saturate(-1);
	    	this._imageSprite.filters = [filter];
		}else{
			this._imageSprite.filters = null;
		}
    }
};




/* write image
===================================*/
AnimationPicker.prototype.end = function(){
	var indexes = this._selectingIndexes;
	var imageName = this.imageName();
	if(indexes.length>0){
		this.writeImageFiles(indexes);
		this.registerAnimationImageNames(imageName);
	}
	var owner = this._owner;
	PickerBase.prototype.end.call(this);

	if(owner && indexes.length>0){
		owner.forceChangeImage(imageName);
		owner.writeHelpFile();
	}
};
AnimationPicker.prototype.registerAnimationImageNames = function(imageName){
	var params = PluginManager._parameters.trp_particlelist;
	if(!params){
		params = PluginManager._parameters.trp_particlelist = {};
	}
	var animImages = params.animImages;
    if(!animImages){
    	animImages = params.animImages = [];
    }
    var imageNames = imageName.split(',');
    var length = imageNames.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var image = imageNames[i];
        if(!animImages.contains(image)){
        	animImages.push(image);
        }
    }
};
AnimationPicker.prototype.writeImageFiles = function(indexes){
	var bitmap = this.bitmap();

	var length = indexes.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var index = indexes[i];
        this.writeImageFile(bitmap,index);
    }
};
AnimationPicker.prototype.writeImageFile = function(bitmap,index){
	var size = this.imageSize();
	var cols = this._imageCols;
	var col = index%cols;
	var row = Math.floor(index/cols);

	var x = col*size;
	var y = row*size;

	var sprite = new Sprite(this._imageSprite.bitmap);
    sprite.setFrame(x,y,size,size);
    sprite.filters = this._imageSprite.filters;

    var renderTexture = PIXI.RenderTexture.create(size,size);

    //PRAGMA: renderAnimation
    Graphics.app.renderer.render(sprite, renderTexture);
    sprite.worldTransform.identity();
    var canvas = Graphics.app.renderer.extract.canvas(renderTexture);
    //PRAGMA_END: renderAnimation

    var imageName = this._imageNames[this._categoryIndex];
    imageName += '_'+index;
    if(this._monoTone){
    	imageName+='_M';
    }
    var name = '_ANIM_'+imageName+'.png';
    
    var fs = require('fs');
    var path = require('path');
    var base = ParticleEditor.IMAGE_PATH;
    var filePath = path.join(base,name);
    var urlData = canvas.toDataURL('image/png')

    var regex = (/^data:image\/png;base64,/);
    var base64Data = urlData.replace(regex, "");
    fs.writeFileSync(filePath, base64Data, 'base64');

    renderTexture.destroy({ destroyBase: true });
};




//=============================================================================
// PresetPicker
//=============================================================================
ParticleEditor.PresetPicker = function PresetPicker(){
    this.initialize.apply(this, arguments);
};
var PresetPicker = ParticleEditor.PresetPicker

PresetPicker.MARGIN = 5;
PresetPicker.ROW_HEIGHT = 20;
PresetPicker.COL_WIDTH = 300;
PresetPicker.MAX_COL = 1;


var TARGET_TYPES = ParticleEmitter.TARGET_TYPES;
PresetPicker.TARGET_NAMES = [];
PresetPicker.TARGET_NAMES[TARGET_TYPES.character] = 'character';
PresetPicker.TARGET_NAMES[TARGET_TYPES.walk] = 'walk';
PresetPicker.TARGET_NAMES[TARGET_TYPES.startdash] = 'startdash';
PresetPicker.TARGET_NAMES[TARGET_TYPES.attach] = 'character';
PresetPicker.TARGET_NAMES[TARGET_TYPES.tilemap] = 'tilemap';

PresetPicker.TARGET_NAMES[TARGET_TYPES.screen] = 'screen';
PresetPicker.TARGET_NAMES[TARGET_TYPES.weather] = 'weather';
PresetPicker.TARGET_NAMES[TARGET_TYPES.region] = 'region';

PresetPicker.TARGET_NAMES[TARGET_TYPES.actor] = 'actor';
PresetPicker.TARGET_NAMES[TARGET_TYPES.party] = 'party';
PresetPicker.TARGET_NAMES[TARGET_TYPES.enemy] = 'enemy';
PresetPicker.TARGET_NAMES[TARGET_TYPES.battle] = 'battle';
PresetPicker.TARGET_NAMES[TARGET_TYPES.battleWeather] = 'bWeather';

PresetPicker.TARGET_NAMES[TARGET_TYPES.click] = 'click';
PresetPicker.TARGET_NAMES[TARGET_TYPES.drag] = 'drag';

PresetPicker.TARGET_NAMES[TARGET_TYPES.picture] = 'picture';
PresetPicker.TARGET_NAMES[TARGET_TYPES.battlePicture] = 'picture';
PresetPicker.TARGET_NAMES[TARGET_TYPES.skit] = 'skit';
PresetPicker.TARGET_NAMES[TARGET_TYPES.battleSkit] = 'skit';
PresetPicker.TARGET_NAMES[TARGET_TYPES.attachActor] = 'actor';
PresetPicker.TARGET_NAMES[TARGET_TYPES.attachParty] = 'party';
PresetPicker.TARGET_NAMES[TARGET_TYPES.attachEnemy] = 'enemy';


// Game_Particle.TARGET_CATEGORIES = [['character','walk','tilemap','startdash'],['screen','weather','region'],['click','drag'],['others'],['hidden']];
// Game_Particle.CATEGORY_NAMES = ['character','screen','system','others','hidden'];

PresetPicker.CATEGORIES = Game_Particle.TARGET_CATEGORIES;
PresetPicker.CATEGORY_NAMES_EN = Game_Particle.CATEGORY_NAMES;
//dummySet > Scene_Boot.prototype.start
PresetPicker.CATEGORY_NAMES = [LC('キャラ対象',158),NLC('スクリーン/天候/リージョン',159,'screen/weather/region'),NLC('マウス/タップ',160,'click/drag'),LC('その他',161,'Others'),LC('非表示(/h)',162)];

PresetPicker.prototype = Object.create(PickerBase.prototype);
PresetPicker.prototype.constructor = PresetPicker;
PresetPicker.prototype.initialize = function(){
    PickerBase.prototype.initialize.call(this);

    this._list = [];
    this._names = [];
    this._contentsSprite = null;
    this._allData = null;
    this._allNames = null;
    this._filterMode = '';
    this._targetType = -1;
    this._currentData = null;

    this.createAllData();
    this.createContentsSprite();
};

PresetPicker.prototype.createContentsSprite = function(){
	var maxNum = 0;
	var allData = this.allData();
	var length = allData.length;
    for(var i = 0; i<length; i=(i+1)|0){
    	var categoryData = allData[i];
    	maxNum = Math.max(maxNum,Object.keys(categoryData).length);
    }

    var width = this.itemWidth();
    var height = this.itemHeight()*maxNum;

	var bitmap = new Bitmap(width,height);
	var sprite = new Sprite(bitmap);
	this.addChild(sprite);
	this._contentsSprite = sprite;
	sprite.y = PickerBase.LAYOUT.marginTopBottom;
};
PresetPicker.prototype.rawData = function(){
	return $dataTrpParticlePreset;
};
PresetPicker.prototype.createAllData = function(){
	return this._createAllData(this.rawData());
};
PresetPicker.prototype._createAllData = function(database){
	var allData = [];
	var allNames = [];
	this._allData = allData;
	this._allNames = allNames;

	PresetPicker.setCategoriedList(database,allData,allNames);
};
PresetPicker.setCategoriedList = function(database,allData,allNames){
	var categoryLength = PresetPicker.CATEGORIES.length;
    for(var i = 0; i<categoryLength; i=(i+1)|0){
    	allData.push([]);
    	allNames.push([]);
    }

    //add hidden category
    var keys = Object.keys(database).sort();
	var length = keys.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var key = keys[i];
        var data = database[key];
        if(Array.isArray(data)){
        	data = Game_Particle.decompressConfigDataFromArray(data.concat());
        }

        if(Game_Particle.isIdHidden(key)){
        	allData[allData.length-1].push(data);
        	allNames[allNames.length-1].push(key);
        }else{
	        var targetType = PresetPicker.TARGET_NAMES[data.targetType];
	        var pushed = false;
	        for(var j=0; j<categoryLength-1; j=(j+1)|0){
	        	if(PresetPicker.CATEGORIES[j].contains(targetType)){
	        		pushed = true;
	        		allData[j].push(data);
	        		allNames[j].push(key);
	        		break;
	        	}
	        }
	        if(!pushed){
	        	allData[allData.length-2].push(data);
	        	allNames[allNames.length-2].push(key);
	        }
        }
    }
};
PresetPicker.prototype.allData = function(){
	return this._allData;
};


/* overwrite setting
===================================*/
PresetPicker.prototype.maxItems = function(){
	return this._list.length;
};
PresetPicker.prototype.maxColumns = function(){
	return PresetPicker.MAX_COL;
};
PresetPicker.prototype.itemHeight = function(){
	return PresetPicker.ROW_HEIGHT;
};
PresetPicker.prototype.itemWidth = function(){
	return PresetPicker.COL_WIDTH;
};
PresetPicker.prototype.itemMarginX = function(){
	return PresetPicker.MARGIN;
};
PresetPicker.prototype.itemMarginY = function(){
	return 0;
};
PresetPicker.prototype.guideTexts = function(){
	return [
		LC('プリセットの設定を読み込みます。',163),
		LC('↑↓キー、マウスホイールでスクロール',164),
		LC('←→キー、カテゴリー切り替え',165),
		LC('決定キー、リスト外クリックで選択終了',166)
	];
};
PresetPicker.prototype.headerText = function(){
	return '【'+PresetPicker.CATEGORY_NAMES[this._categoryIndex]+'】';
};
PresetPicker.prototype.categoryType = function(){
	return this._categoryIndex;
};
PresetPicker.prototype.maxCategories = function(){
	return PresetPicker.CATEGORIES.length;
};
PresetPicker.prototype.isCategoryValid = function(index){
	return index===0 || (this._allData[index]&&this._allData[index].length>0);
}
PresetPicker.prototype.isSeveralModeValid = function(){return false};

PresetPicker.prototype.applyData = function(){
	if(!this._owner)return;

	var index = this._selectingIndexes[0];
	var data = this._list[index];
	if(!data)return;

	var name = this._names[index];
	this._owner.applyData(JsonEx.makeDeepCopy(data),name);
};

/* refresh
===================================*/
PresetPicker.prototype.setListType = function(type){
	PickerBase.prototype.setListType.call(this,type);

	var names = this._allNames[this._categoryIndex];
	var list = this.allData()[this._categoryIndex];
	if(this._filterMode){
		names = names.concat();
		list = list.concat();
		var length = names.length;
	    for(var i=length-1; i>=0; i=(i-1)|0){
	        var data = list[i];
	        if(data){
	        	var mode = data.emitterLifetime>0 ? 'play' : 'set';
	        	if(this._filterMode!==mode){
	        		list.splice(i,1);
	        		names.splice(i,1);
	        	}
	        }
	    }
	}

	this._names = names;
	this._list = list;
};

PresetPicker.prototype.refreshItems = function(){
	var width = this.itemWidth();
	var lineHeight = this.itemHeight();
	var list = this._list;
	var length = list.length;
	var height = lineHeight * length;

	var bitmap = this._contentsSprite.bitmap;
	bitmap.clear();

	var margin = 5;
	var names = this._names;
	var length = list.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var data = list[i];
        var name = names[i];
        var x = margin;
        var y = i*lineHeight;

        var elemWidth = 100;
        bitmap.fontSize = lineHeight-3;

        //name
        bitmap.drawText(name,x,y,elemWidth,lineHeight);
        x += elemWidth + margin;

        //comment(target)
        var text = data.comment;
        if(!text){
        	text = PresetPicker.TARGET_NAMES[data.targetType]||null;
        	if(text){
        		text = '['+text+']';
        	}
        }
        if(text){
        	bitmap.drawText(text,x,y,width-x,lineHeight);
        }
    }
};

/* start picking
===================================*/
PresetPicker.prototype.startPicking = function(owner,targetType,currentData){
	this._categoryIndex = 0;
	this._currentData = currentData;
	this._targetType = targetType;

	this.deselectAll();
	if(targetType>=0){
		var typeName = PresetPicker.TARGET_NAMES[targetType];
		var categories = PresetPicker.CATEGORIES;
		var length = categories.length;
	    for(var i=0; i<length; i=(i+1)|0){
	    	if(categories[i].contains(typeName)){
	    		this._categoryIndex = i;
	    		this.refreshCategory();
	    		break;
	    	}
	    }
	}
	PickerBase.prototype.startPicking.call(this,owner);
};

/* search
===================================*/
PresetPicker.prototype.search = function(chara){
	var names = this._names;
	var length = names.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var name = names[i];
        if(name[0] === chara){
        	this.didSuccessSearch(i);
        	return;
        }
    }
};

/* filter
===================================*/
PresetPicker.prototype.onKeyDown = function(keyCode,event){
	if(keyCode === KEY_CODE.f && (event.ctrlKey||event.metaKey)){
		this.changeFilterMode();
	}else{
		PickerBase.prototype.onKeyDown.call(this,keyCode,event);
	}
};
PickerBase.prototype.changeFilterMode = function(){
	var header;
	if(this._filterMode==='set'){
		this._filterMode = 'play';
		header = LC('《フィルター=play用》',167);
	}else if(this._filterMode==='play'){
		this._filterMode = '';
		header = LC('《フィルター=なし》',168);
	}else{
		this._filterMode = 'set';
		header = LC('《フィルター=set用》',169);

	}

	this._listType = -1;
	SoundManager.playCursor();

	this.refreshCategory();
	this.showHeaderSprite(header,'rgb(0,150,0)');
};


/* input
===================================*/
PresetPicker.prototype.processInput = function(){
	if(Input.isRepeated('cancel')){
		this._owner.applyData(this._currentData);
		this.end();
	}else if(Input.isRepeated('down')){
		this.selectNext();
	}else if(Input.isRepeated('up')){
		this.selectPrevious();
	}else{
		PickerBase.prototype.processInput.call(this);
	}
};
PresetPicker.prototype.selectNext = function(){
	var index = this._selectingIndexes.length ? this._selectingIndexes[0] : -1;
	index += 1;
	if(index>=this.maxItems()){
		SoundManager.playBuzzer();
		return;
	}
	this.didPickData(index);
	if(index > this._topRow+this._dispRows){
		this.setTopRowPrevious();
	}
};
PresetPicker.prototype.selectPrevious = function(){
	var index = this._selectingIndexes.length ? this._selectingIndexes[0] : this.maxItems();
	index -= 1;
	if(index<0){
		SoundManager.playBuzzer();
		return;
	}
	this.didPickData(index);
	if(index < this._topRow){
		this.setTopRowNext();
	}
};






//=============================================================================
// LoadPicker
//=============================================================================
ParticleEditor.LoadPicker = function LoadPicker(){
    this.initialize.apply(this, arguments);
};
var LoadPicker = ParticleEditor.LoadPicker
LoadPicker.prototype = Object.create(PresetPicker.prototype);
LoadPicker.prototype.constructor = LoadPicker;
LoadPicker.prototype.initialize = function(){
    PresetPicker.prototype.initialize.call(this);
};

LoadPicker.prototype.refreshItems = function(){
	var width = this.itemWidth();
	var lineHeight = this.itemHeight();
	var list = this._list;
	var length = list.length;
	var height = lineHeight * length;

	var bitmap = this._contentsSprite.bitmap;
	bitmap.clear();

	var margin = 5;
	var names = this._names;
	var length = list.length;
	var today = new Date();
    for(var i = 0; i<length; i=(i+1)|0){
        var data = list[i];
        var name = names[i];
        var x = margin;
        var y = i*lineHeight;

        var elemWidth = 140;
        bitmap.fontSize = lineHeight-3;
        bitmap.drawText(name,x,y,elemWidth,lineHeight);
        x += elemWidth + margin;

        elemWidth = 60;
        var text = PresetPicker.TARGET_NAMES[data.targetType]||null;
        if(text){
        	bitmap.textColor = 'rgb(150,200,255)';
        	bitmap.fontSize -= 1;
        	bitmap.drawText(text,x,y,elemWidth,lineHeight)
        	bitmap.textColor = 'white';
        	bitmap.fontSize += 1;
        }
        x += elemWidth + margin;

        elemWidth = 90;
        bitmap.fontSize -= 2;

        var comment = data.comment;
        var text;
        if(!comment){
        	text = '---';
        }else if(isNaN(comment)){
	        text = '-'+comment+'-';
        }else{
        	var dateNum = Number(comment);
        	var day = dateNum%100;
	    	var month = Math.floor(dateNum/100)%100;
	    	var year = 2000+Math.floor(dateNum/10000)%100;
	    	var date = new Date(year,month-1,day);
	    	var diff = today - date;
	    	var diffDate = Math.floor(diff/(1000*60*60*24));
	    	text = '-'+month+'/'+day;
	    	if(diffDate===0)text += LC('(今日)-',171);
	    	else if(diffDate===1)text += LC('(昨日)-',172);
	    	else text += '('+diffDate+LC('日前)-',173);
        }
        text = text;
        bitmap.drawText(text,x,y,elemWidth,lineHeight)
    }
};



/* overwrite setting
===================================*/
LoadPicker.prototype.guideTexts = function(){
	return [
		LC('保存データ設定をコピーします。',174),
		LC('マウスホイールでスクロール',175),
		LC('↑↓キー、上下のデータを選択',181),
		LC('←→キー、カテゴリー切り替え',176),
		LC('決定キー、リスト外クリックで選択終了',177),
		LC('対象は編集時に設定していた対象(参考用)。',178),
		LC('deleteキー(macはfn+delete)でデータ削除',179),
		LC('（データ削除は保存を行った時点で確定します）',180),
	];
};
LoadPicker.prototype.rawData = function(){
	return $dataTrpParticles;
};


/* delete
===================================*/
LoadPicker.prototype.onKeyDown = function(keyCode,event){
	PresetPicker.prototype.onKeyDown.call(this,keyCode,event);
	if(keyCode === KEY_CODE.delete){
		this.processDelete();
	}
};
LoadPicker.prototype.processDelete = function(){
	if(this._selectingIndexes.length===0)return;
	var index = this._selectingIndexes[0];
	var key = this._names[index];
	delete this.rawData()[key];

	this._names.splice(index,1);
	this._list.splice(index,1);
	this.refreshItems();

	this.deselectAll();
};



})();