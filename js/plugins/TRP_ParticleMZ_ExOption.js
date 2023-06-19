//=============================================================================
// TRP_ParticleMZ_ExOption.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 負荷調整用のオプション追加
 * @author Thirop
 * @orderAfter TRP_ParticleMZ
 * 【更新履歴】
 * 1.12 2021/10/31 (設定のparse方式変更)
 * 1.07 2021/6/22  ゲーム起動時の不具合修正
 * 1.00 2021/4/10  初版
 *
 * @param name
 * @text オプション名
 * @desc オプションに表示する名称
 * @type string
 * @default パーティクル演出量
 *
 * @param index
 * @text 表示順
 * @desc オプションの上から何番目に表示するか。(正しく反映するにはプラグインをなるべく下に配置）
 * @type number
 * @default 999
 *
 * @param levels
 * @text 負荷設定リスト
 * @desc 各段階の負荷設定
 * @type struct<OptionLevel>[]
 * @default ["{\"name\":\"最高\",\"value\":\"0\"}","{\"name\":\"高\",\"value\":\"2000\"}","{\"name\":\"中\",\"value\":\"1000\"}","{\"name\":\"低\",\"value\":\"300\"}","{\"name\":\"最低\",\"value\":\"100\"}"]
 *
 *
 */
//============================================================================= 

/*~struct~OptionLevel:
 * @param name
 * @text 負荷表示名
 * @desc 選択時のオプション表示名
 * @default 最高
 *
 * @param value
 * @text 発生キャパシティ
 * @desc パーティクル発生能力の値。(maxコマンドと同じ仕様。0で制限無し)
 * @default 0
 * @type number
 * @min 0
 */


(function(){
var parameters = PluginManager.parameters('TRP_ParticleMZ_ExOption');
parameters = JSON.parse(JSON.stringify(parameters, function(key, value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        try {
            if(value[0]==='['||value[0]==='{'){
                if(value.contains(' ')){
                    return value;
                }
                return eval(value);
            }else if(value===''){
                return value;
            }else if(!isNaN(value)){
                return Number(value);
            }else if(value==='true'){
                return true;
            }else if(value==='false'){
                return false;
            }else{
                return value;
            }
        } catch (e) {
            return value;
        }
    }
}));

var commandIndex = Number(parameters.index);
var commandName = parameters.name;
var commandLevels = parameters.levels || [{"name":"最高","value":"0"},{"name":"高","value":"2000"},{"name":"中","value":"1000"},{"name":"低","value":"300"},{"name":"最低","value":"100"}];

var DEFAULT_LEVEL = {name:'無制限',value:0};
var TARGET_SYMBOL = 'trpParticleNumLevel';


//=============================================================================
// ConfigManager
//=============================================================================
ConfigManager.trpParticleNumLevel = 0;

var _ConfigManager_load = ConfigManager.load;
ConfigManager.load = function() {
	_ConfigManager_load.call(this);
	this.applyTrpParticleNum();
};

var _ConfigManager_save = ConfigManager.save;
ConfigManager.save = function() {
	_ConfigManager_save.call(this);
    this.applyTrpParticleNum();
};

var _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	var config = _ConfigManager_makeData.call(this);
	config.trpParticleNumLevel = this.trpParticleNumLevel||0;
    return config;
};

var _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	_ConfigManager_applyData.call(this,config);

	this.trpParticleNumLevel = Number(config.trpParticleNumLevel)||0;
};

ConfigManager.applyTrpParticleNum = function(){
	if($gameScreen && $gameScreen._particle){
		$gameScreen._particle.resetMaxParticlesIfNotCustomValueSet();
	}
};

ConfigManager.trpParticleNum = function(){
	var level = commandLevels[this.trpParticleNumLevel]||commandLevels[0]||DEFAULT_LEVEL;
	return level.value;
};


//=============================================================================
// Game_Particle
//=============================================================================
Game_Particle.prototype.resetMaxParticlesIfNotCustomValueSet = function(){
	if(this._customMaxValueSet)return;
	this._maxParticles = ConfigManager.trpParticleNum();
};

Game_Particle.prototype.resetMaxParticles = function(){
	this._maxParticles = ConfigManager.trpParticleNum();
	this._customMaxValueSet = false;
};

Object.defineProperty(Game_Particle.prototype, 'maxParticles', {
    get: function() {
        return this._maxParticles||0;
    },set: function(value){
        this._maxParticles = value||0;
        this._customMaxValueSet = true;
    },
    configurable: true
});






//=============================================================================
// Window_Options
//=============================================================================
var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
	_Window_Options_makeCommandList.call(this);
		
	this.addCommand(commandName, TARGET_SYMBOL);
	var command = this._list.pop();
	var index = commandIndex.clamp(0,this._list.length);
	this._list.splice(index,0,command);
};

var _Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    if(symbol === TARGET_SYMBOL){
    	var value = this.getConfigValue(symbol);
    	return this.trpParticleNumText(value);
    }else{
    	return _Window_Options_statusText.call(this,index);
    }
};

Window_Options.prototype.trpParticleNumText = function(value){
	var level = commandLevels[value];
	if(!level)level = commandLevels[0]||DEFAULT_LEVEL;
	return level.name;
};


var _Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol === TARGET_SYMBOL) {
        this.changeTrpParticleNumValue(symbol,-1);
    } else {
        _Window_Options_processOk.call(this);
    }
};

Window_Options.prototype.changeTrpParticleNumValue = function(symbol, delta){
    var value = this.getConfigValue(symbol);
    value += delta;
    value = value.clamp(0,commandLevels.length-1);


    this.setConfigValue(symbol, value);
    this.redrawItem(this.findSymbol(symbol));
    SoundManager.playCursor();
};

var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
	var index = this.index();
    var symbol = this.commandSymbol(index);
    if(symbol === TARGET_SYMBOL){
    	this.changeTrpParticleNumValue(symbol,-1);
    }else{
    	_Window_Options_cursorRight.call(this,wrap);
    }
};

var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
	var index = this.index();
    var symbol = this.commandSymbol(index);
    if(symbol === TARGET_SYMBOL){
    	this.changeTrpParticleNumValue(symbol,1);
    }else{
    	_Window_Options_cursorLeft.call(this);
    }
};




})();