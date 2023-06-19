//=============================================================================
// TRP_ParticleMZ_GroupEditor.js
//=============================================================================
/*:
 * @target MZ
 * @author Thirop
 * @plugindesc グループ設定の編集[開発用]
 * @base TRP_ParticleMZ_Group
 * @orderAfter TRP_ParticleMZ_Group
 *
 * @help
 * 【更新履歴】
 * 1.12 2021/10/23 カーソル位置がずれる不具合修正
 * 1.10 2021/9/21  プリセットピッカー呼び出し時の不具合修正
 * 1.09 2021/8/18  一覧プラグインが正しく保存されない不具合修正
 * 1.06 2021/6/1   デプロイメント時に含まれてると発生する不具合修正
 * 1.04 2021/4/19  ペースト操作、スペースキーの不具合修正
 * 1.03 2021/4/14  表示の微修正
 * 1.01 2021/4/12  sub/edit簡易コマンドの不具合修正
 * 1.00 2021/4/10  初版
 *
 *
 */
//============================================================================= 


function ParticleGroupEditor(){
    this.initialize.apply(this, arguments);
}
if (Utils.isNwjs() && Utils.isOptionValid('test')){
	ParticleGroupEditor.FILE_PATH = 'dataEx/TrpParticleGroups.json';
	ParticleGroupEditor.HELP_PATH = 'js/plugins/TRP_ParticleMZ_List.js';
};

(function(){
	"use strict";
	if (!Utils.isNwjs() || !Utils.isOptionValid('test')){
		return;
	}
    var fs = require('fs');
	var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    var filePath = path.join(base, ParticleGroupEditor.FILE_PATH);
    if(!fs.existsSync(filePath)){
    	var file = '{}';
    	fs.writeFileSync(filePath,file);
    }
})();


(function(){
'use strict';
if (!Utils.isNwjs() || !Utils.isOptionValid('test')){
	return;
}

var parameters = PluginManager.parameters('TRP_ParticleMZ_GroupEditor');
var baseParameters = PluginManager.parameters('TRP_ParticleMZ');

var LC = TRP_Localize.localize.bind(TRP_Localize,'parGe');
var NLC = TRP_Localize.noLocalize;

var isMac = navigator.userAgent.match(/Macintosh|Mac/);

var ParticleGroup = Game_Particle.ParticleGroup;



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

	var defTargetWords = otherWords ||[];
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
function concatToString(args,separator=' '){
	var length = args.length;
	var str = '';
    for(var i=0; i<length; i=(i+1)|0){
    	if(i>0){
    		str += separator;
    	}
    	str += args[i];
    }
    return str;
};


ParticleGroupEditor.DEFAULT_DATA = {
	repeat:-1,
	list:[''],
};

Game_Particle.prototype.particleGroupEdit = function(eventId,id,target,tag,name,x,y){
	name = supplementDef(id,name)||id;
	
	id = this.idWithSuffix(id);
	var data = this._groups[id];
	
	if(!$dataTrpParticleGroups[name]){
		if($dataTrpParticleGroupsPreset[name]){
			$dataTrpParticleGroups[name] = JsonEx.makeDeepCopy($dataTrpParticleGroupsPreset[name]);
		}else{
			$dataTrpParticleGroups[name] = JsonEx.makeDeepCopy(ParticleGroupEditor.DEFAULT_DATA);
		}
	}

	if(!data){
		this.particleGroupSet(eventId,id,target,tag,name,x,y);
		data = this._groups[id];
	}

	data.editing = true;
    SceneManager._scene.startParticleGroupEdit(this,id);

    return true;
};




//=============================================================================
// ParticleGroup
//=============================================================================
var _ParticleGroup_initialize = ParticleGroup.prototype.initialize;
ParticleGroup.prototype.initialize = function(eventId,id,target,tag,name,x,y){
	this._editing = false;
	_ParticleGroup_initialize.apply(this,arguments)
};

Object.defineProperty(ParticleGroup.prototype, 'editing', {
    get: function() {
        return this._editing;
    },set: function(value){
    	if(value){
    		this._editing = true;
    	}else{
    		delete this._editing;
    	}
        this.applyData();
    },
    configurable: true
});


var _ParticleGroup_applyData = ParticleGroup.prototype.applyData
ParticleGroup.prototype.applyData = function(){
	_ParticleGroup_applyData.call(this);
	if(this.editing){
		if(this.repeat<0){
			this.repeat = 0;
		}
	}
};




//=============================================================================
// Scenes
//=============================================================================
Scene_Base.prototype.startParticleGroupEdit = function(particle,id){
	if(this._particleGroupEditor){
		this.addChild(this._particleGroupEditor);
		return;
	}
	if(!this._particleSystem)return;

	this._particleGroupEditor = new ParticleGroupEditor(particle,id);
	this.addChild(this._particleGroupEditor);
};


var _Scene_Base_startParticleEdit = Scene_Base.prototype.startParticleEdit;
Scene_Base.prototype.startParticleEdit = function(particle,id,exData=null){
	if(this._particleGroupEditor){
		this._particleGroupEditor.willStartParticleEdit();
	}
	_Scene_Base_startParticleEdit.call(this,particle,id,exData);
};


var _Scene_Base_update =  Scene_Base.prototype.update;
Scene_Base.prototype.update = function(){
	if(!!this._particleGroupEditor){
		if(!!this._particleEditor){
			this.updateForParticleEdit();
			if(!this._particleEditor){
				this._particleGroupEditor.didEndParticleEditing();
			}
		}else{
			this.updateForParticleGroupEdit();
		}
	}else{
		_Scene_Base_update.call(this);
	}
};
Scene_Base.prototype.updateForParticleGroupEdit = function(){
	$gameScreen._particle.update();

	this._particleSystem.updateForEditor(this);
	this._particleGroupEditor.update();
	if(this._particleGroupEditor.isTerminated()){
		this.removeChild(this._particleGroupEditor);
		this._particleGroupEditor = null;
	}
};

var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	if(!!this._particleGroupEditor){
		Scene_Base.prototype.update.call(this);
		this._spriteset._destinationSprite.update();
	}else{
		_Scene_Map_update.call(this);
	}
};

var _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	if(!!this._particleGroupEditor){
		Scene_Base.prototype.update.call(this);
	}else{
		_Scene_Battle_update.call(this);
	}    
};




//=============================================================================
// ParticleEditor
//=============================================================================
ParticleGroupEditor.prototype = Object.create(ParticleEditor.prototype);
ParticleGroupEditor.prototype.constructor = ParticleGroupEditor;

ParticleGroupEditor.GUIDE_TEXTS = {
	repeat:[LC('【リピート設定】',0),LC('-1:リピート無し',1),LC('0以上:リピートするまでの待機フレーム',2),null,LC('ctrl/cmd+C:グループ全体をコピー',3)],
	command:[LC('【コマンド】',4),LC('particleを抜かしたコマンドを入力',5),LC('Enter:コマンドを反映',6),LC('Shift+←(→):行頭(行末)へ',7),LC('alt/opt+←(→):前(次)の項目へ',8),LC('alt/opt+↑(↓):上(下)にコマンド挿入',9),null,LC('alt/opt+E(S|P):edit(set,play)切り替え',10),LC('Shift+alt/opt+P:設定名をプリセットから変更',11),LC('Shift+alt/opt+L:設定名を保存データから変更',12)],
};

ParticleGroupEditor.prototype.guideTexts = function(title){
	if(title.contains('command')){
		title = 'command';
	}
	return ParticleGroupEditor.GUIDE_TEXTS[title];
};
Game_Particle.EDITING_GROUP = null;


ParticleGroupEditor.prototype.initMembers = function(){
	ParticleEditor.prototype.initMembers.call(this);

	this._isParticleEditing = false;
    this._isJustParticleEditingDone = false;

    this._lastList = null;
    this._lastSubCommand = 'play';
    
    this._presetConfigPicker = null;
    this._loadConfigPicker = null;
};
ParticleGroupEditor.prototype.initialize = function(particle,id){
	Game_Particle.GROUP_EDITOR = this;

    PIXI.Container.call(this);
    this.initMembers();

    this.width = Graphics.width;
    this.height = Graphics.height;
    Input.clear();

    var data = particle._groups[id];
    var config = Game_Particle.groupData(data);

    if(data.image){
    	this.checkImageExists(data);
    }else if(config.image){
    	this.checkImageExists(config);
    }

    data.editing = true;

    this._id = id;
    this._particle = particle;
    this._data = data;
    this._config = config;

    this._lastList = data.list.concat();

   	this.createSelectorSprite();
    this.createParts(data,config);
    this.createMenuButtons();

    this.createGuideSprite();

    this.registerKeyListeners();
    this.resetInputingWords();

    this.refreshPartsHidden();
};

ParticleGroupEditor.prototype.terminate = function(){
	Game_Particle.GROUP_EDITOR = null;

	this._terminated = true;

	if(this._data){
		this._data.editing = false;
	}

	this._particle = null;
	this._data = null;
	this._config = null;

	this.removeEventListeners();
};

ParticleGroupEditor.prototype.willStartParticleEdit = function(){
	this._isParticleEditing = true;
	this._isJustParticleEditingDone = false;
	this.visible = false;
};
ParticleGroupEditor.prototype.didEndParticleEditing = function(){
	this._isParticleEditing = false;
	this._isJustParticleEditingDone = true;
	this.visible = true;
	Input.clear();
	TouchInput.clear();

	var needsSave = false;
	var list = this._data.list;
	var length = list.length;
    for(var i=0; i<length; i=(i+1)|0){
        var command = list[i];
        var args = command.split(' ');
        var sub = ParticleGroup.processParticleSubCommand(args);

        if(sub==='edit'){
        	needsSave = true;
	    	args[0] = this._lastSubCommand;
	    }else if(sub==='sub'&&args[1]==='edit'){
	    	needsSave = true;
	    	args[1] = this._lastSubCommand;
	    }else{
	    	continue;
	    }
    	list[i] = concatToString(args);
    }
    this._data.data().list = list;
    this._lastList = list.concat();



    var allParts = this._parts;
    var length = allParts.length;
    for(var i=0; i<length; i=(i+1)|0){
        var parts = allParts[i];
        if(parts instanceof CommandParam){
        	parts.clearInputting();
        	parts.clearInputting();
        	parts.refresh();
        }
    }
};

/* key
===================================*/
ParticleGroupEditor.prototype._onKeyDown = function(event){
	if(this._isParticleEditing || this._isJustParticleEditingDone){
		return;	
	}

	if(event.altKey){
		if(event.shiftKey && event.keyCode===KEY_CODE.l){
			this.changePlayCommandConfigName(false);
			return;
		}else if(event.shiftKey && event.keyCode===KEY_CODE.p){
			this.changePlayCommandConfigName(true);
			return;
		}else if(event.keyCode===KEY_CODE.s){
			this.changeSubCommand('set');
			return;
		}else if(event.keyCode===KEY_CODE.p){
			this.changeSubCommand('play');
			return;
		}else if(event.keyCode===KEY_CODE.e){
			this.changeSubCommand('edit');
			return;
		}else if(event.keyCode===KEY_CODE.backSpace && event.altKey){
			var editing = this.editingParts();
			if(editing && (editing instanceof CommandParam)){
				SoundManager.playCursor();
				editing.deleteTailArgOfInputting();
				editing.applyEditing();
			}
			return;
		}
	}
	ParticleEditor.prototype._onKeyDown.call(this,event);
};

ParticleGroupEditor.prototype._onControlKeyDown = function(event){
	if(this._isParticleEditing || this._isJustParticleEditingDone){
		return;	
	}
	
	if(event.keyCode===KEY_CODE.s){
		//save
		this.processSave();
	}else if(event.keyCode===KEY_CODE.p){
		this.processPickPreset();
	}else if(event.keyCode===KEY_CODE.w){
		this.processQuit();
	}else if(event.keyCode===KEY_CODE.e){
		this.processComplete();
	}else if(event.keyCode===KEY_CODE.l){
		this.processPickLoad();
	}
};

ParticleGroupEditor.prototype.changeSubCommand = function(value){
	var parts = this.editingParts();
	if(!parts || !(parts instanceof CommandParam)){
		SoundManager.playBuzzer();
		return;
	}

	var lastSub = parts.changeSubCommand(value);
	if(!!lastSub){
		this._lastSubCommand = lastSub;
		SoundManager.playCursor();
		this.saveEditingParams();
	}else{
		SoundManager.playBuzzer();
	}
};

/* config picker
===================================*/
ParticleGroupEditor.prototype.changePlayCommandConfigName = function(isPreset=false){
	var editing = this.editingParts();
	if(!editing || !(editing instanceof CommandParam)){
		SoundManager.playBuzzer();
		return
	}
	if(!editing.isCommandValid() || (!editing.isPlaySomeCommand()&&!editing.isSubSetCommand())){
		SoundManager.playBuzzer();
		return
	}

	if(isPreset){
		this.processPickPresetConfig();
	}else{
		this.processPickLoadConfig();
	}
};
ParticleGroupEditor.prototype.applyPlayCommandConfigName = function(name){
	var editing = this._parts[this._lastEditingIndex];
	if(editing && editing.changePlayCommandConfigName(name)){
		this.saveEditingParams();
	}
};


/* sub emitter
===================================*/
ParticleGroupEditor.prototype.changeSubEmitterConfig = function(timing,endTiming,speedRate,inheritAngle,inheritScale){
	var parts = this._parts[this._editingIndex];
	if(!parts || (!parts instanceof CommandParam)){
		SoundManager.playBuzzer();
		return;
	}

	if(parts.changeSubEmitterParams(timing,endTiming,speedRate,inheritAngle,inheritScale)){
		this.saveEditingParams();
		return true;
	}else{
		return false;
	}
};
ParticleGroupEditor.prototype.supplyEditingParams = function(editing){
	ParticleEditor.prototype.supplyEditingParams.call(this,editing);

	if(editing instanceof CommandParam){
		if(editing._inputting==='sub'){
			this.supplySubEditCommand(editing);
		}else if(editing._inputting==='edit'){
			this.supplyEditCommand(editing);
		}
	}
};

ParticleGroupEditor.prototype.supplyEditCommand = function(editing){
	var autoNameIdxes = null;
 	
 	var regExp = /^_auto:([0-9]+)$/;
	var list = this._data.list;
	for(var i=list.length-1; i>=0; i=(i-1)|0){
		var command = list[i];
		var args = command.split(' ');
		var sub = ParticleGroup.processParticleSubCommand(args);
		if(Game_Particle.isPlayCommands(sub)){
			var id = args[1];
			var match = id?id.match(regExp):null;
			if(match){
				autoNameIdxes = autoNameIdxes||[];
				autoNameIdxes.push(Number(match[1]));
			}
		}
	}

	var autoIndex = 0;
	if(autoNameIdxes){
		autoNameIdxes.sort(function(a,b){
			return a-b;
		});
		var length = autoNameIdxes.length;
		autoIndex = -1;
	    for(var i=0; i<length; i=(i+1)|0){
	        var idx = autoNameIdxes[i];
	        if(idx!==i){
	        	autoIndex = i;
	        	break;
	        }
	    }
	    if(autoIndex<0){
	    	autoIndex = length;
	    }
	}

	var name = '_auto:'+autoIndex;
	var command = 'edit '+name+' target';

	this._lastSubCommand = 'play';
	editing._inputting = command;
	editing._needsSave = true;
	editing.applyEditing();

	SoundManager.playCursor();
};

ParticleGroupEditor.prototype.supplySubEditCommand = function(editing){
	var mainId = '';
	var subNameIdxes = null;
 	
 	var regExp = /^_sub:([0-9]+)$/;
	var list = this._data.list;
	for(var i=list.length-1; i>=0; i=(i-1)|0){
		var command = list[i];
		var args = command.split(' ');
		var sub = ParticleGroup.processParticleSubCommand(args);
		if(i<editing.listIndex&&Game_Particle.isPlayCommands(sub)){
			if(mainId)continue;
			mainId = args[1];
		}else if(sub==='sub'){
			var name = args[3];
			var match = name?name.match(regExp):null;
			if(match){
				subNameIdxes = subNameIdxes||[];
				subNameIdxes.push(Number(match[1]));
			}
		}
	}


	if(!mainId)return;

	var subIndex = 0;
	if(subNameIdxes){
		subNameIdxes.sort(function(a,b){
			return a-b;
		});
		var length = subNameIdxes.length;
		subIndex = -1;
	    for(var i=0; i<length; i=(i+1)|0){
	        var idx = subNameIdxes[i];
	        if(idx!==i){
	        	subIndex = i;
	        	break;
	        }
	    }
	    if(subIndex<0){
	    	subIndex = length;
	    }
	}

	var name = '_sub:'+subIndex;
	var command = 'sub edit '+mainId
		+ ' ' + name
		+ ' 0 -1 0 0 0';

	this._lastSubCommand = 'play';
	editing._inputting = command;
	editing._needsSave = true;
	editing.applyEditing();

	SoundManager.playCursor();
};

ParticleGroupEditor.prototype.deleteNonUseAutoNamedSubCommand = function(){
	var database = $dataTrpParticles;
	var keys = Object.keys(database);
	var length = keys.length;

	//prepare current group auto supplied config names
 	var existsNames = [];
    for(var i=0; i<length; i=(i+1)|0){
        var key = keys[i];
        if(/^_sub:([0-9]+)$/.test(key)){
        	existsNames.push(key);
        }
    }

    //check using configs on this group list
	var list = this._data.list;
	var length = list.length;
	for(var i=0; i<length; i=(i+1)|0){
		var command = list[i];
		var args = command.split(' ');
		var sub = ParticleGroup.processParticleSubCommand(args);
		if(sub!=='sub')continue;

		var name = args[3];
		if(existsNames.contains(name)){
			existsNames.splice(existsNames.indexOf(name),1);
		}
	}

	//delete non use config
	var length = existsNames.length;
    for(var i=0; i<length; i=(i+1)|0){
        var name = existsNames[i];
        delete database[name];
    }

    //save database($dataTrpParticles)
    var editorParams = PluginManager.parameters('TRP_ParticleMZ_Editor');
    var noLineBreaks = editorParams ? (editorParams.noLineBreaks||true) : true;
    var file;
    if(noLineBreaks){
    	file = JSON.stringify(database);
    }else{
    	file = JSON.stringify(database,null,4);
    }

    var filePath = ParticleEditor.prototype.saveFilePath.call(this);
    this.writeSaveData(file,filePath);
};



/* word inputting
===================================*/
ParticleGroupEditor.prototype.resetInputingWords = ParticleEditor.prototype.resetInputingWords;
ParticleGroupEditor.prototype.prepareInputtingCandidates = ParticleEditor.prototype.prepareInputtingCandidates;

ParticleGroupEditor.prototype.pushInputtingCharacter = function(chara){
	var editing = this._parts[this._editingIndex];
	if(editing && editing instanceof CommandParam){
		editing._processCharacterInput(this._keyCode,this._key);
		if(editing.hasSaveData()){
			this.saveEditingParams();
		}
	}else{
		ParticleEditor.prototype.pushInputtingCharacter.call(this,chara);
	}
};
ParticleGroupEditor.prototype.tryInputtingFirstHit = function(firstHit){
	var perfectHit = this._inputtingWords===firstHit;
	var index = this._commands.indexOf(firstHit);
	this.startEditing(index);
};


/* copy & paste
===================================*/
ParticleGroupEditor.prototype.processCopy = function(e){
	if(this._isParticleEditing)return;
	e.preventDefault();

	var editing = this.editingParts()
	var text;
	if(!editing || !(editing instanceof CommandParam)){
		text = JSON.stringify(this.editingDataObject());
	}else{
		text = editing._inputting;
	}
	e.clipboardData.setData("text/plain" , text);
    SoundManager.playCursor();
};

ParticleGroupEditor.prototype.processPaste = function(e){
	if(this._isParticleEditing)return;

	e.preventDefault();
    var clipboardData = e.clipboardData;
    var text = clipboardData ? clipboardData.getData("text/plain") : '';
    if(!text){
    	SoundManager.playBuzzer();
    	return;
    }


    var data = null;
    if(text[0]==='{'){
	    try{
	    	data = JSON.parse(text);
	    }catch(e){}

	    if(!Array.isArray(data.list)){
	    	data = null;
	    }
    }

    if(data){
    	//whole command
    	this.applyData(data);
    	SoundManager.playCursor();
    }else{
    	//plain command
	    var editing = this.editingParts()
	    if(editing && (editing instanceof CommandParam)){
	    	SoundManager.playCursor();
	    	editing.addText(text);
		    var cursorIndex = editing._cursorIndex;
		    this.saveEditingParams();
		    editing.setCursor(cursorIndex);
		}else{
			SoundManager.playBuzzer();
		}
    }
};



/* update
===================================*/
ParticleGroupEditor.prototype.update = function(){
	if(this._isParticleEditing){
		return;
	}else if(this._isJustParticleEditingDone){
		this._isJustParticleEditingDone = false;
		return;
	}

	ParticleEditor.prototype.update.call(this);
};
ParticleGroupEditor.prototype.updateParticleCount = null;

ParticleGroupEditor.prototype.processInput = function(keyCode,key){
	if(Input.isPressed('control')){
		if(Input.isTriggered('up')){
			this.insertCommandToUpper();
			return;
		}else if(Input.isTriggered('down')){
			this.insertCommandToLower();
			return;
		}
	}

	var okTriggered = Input.isTriggered('ok')&&this._key!==' ';
	var ret = ParticleEditor.prototype.processInput.call(this);

	if(okTriggered){
		var editing = this.editingParts();
		if(editing && (editing instanceof CommandParam) && editing.hasSaveData()){
			//param saved & particleCleared
		}else{
			SoundManager.playCursor();
			this.tryParticleClear();
		}
	}

	return ret;
};

ParticleGroupEditor.prototype._applySaveData = function(saveData){
	var id = saveData.shift();
	var title = saveData.shift();

	var data = this._data;
	var config = data.data();
	var param = saveData[0];

	if(title === 'repeat'){
		config.repeat = param;
	}else if(title.indexOf(ParticleGroupEditor.COMMAND_TITLE)===0){
		var index = Number(title.substring(7))-1;
		config.list[index] = param;
		data.list[index] = param;

		this.tryParticleClear();
	}
	data.applyData();
};

ParticleGroupEditor.prototype.tryParticleClear = function(){
	if(this._isParticleEditing)return;

	var data = this._data;

	var list = data.list;
	var lastList = this._lastList;
	this._lastList = data.list.concat();

	var length = list.length;
	var lastLen = lastList.length;

    for(var i=0; i<lastLen; i=(i+1)|0){
        var command = lastList[i];
        var args = command.split(' ');

        var sub = ParticleGroup.processParticleSubCommand(args);
        if(args.length<=2)continue;

        if(!Game_Particle.isPlayCommands(sub)){
        	continue;
        }

        var targetId = args[1];
        if(/^_auto:[0-9]+$/.test(targetId)){
			targetId += ':'+data.name+'/h';
		}
        if(!targetId.contains('/GROUP:')){
        	targetId += ParticleGroup.idSuffix(this._data.id);
        }
        this._particle.particleClear(targetId,true);
    }

    this._data._wait = 1;
    this._data._index = -1;
};

ParticleGroupEditor.prototype._endEditing = function(){
	ParticleEditor.prototype._endEditing.call(this);
	this.deleteEmptyCommandRows();
};
ParticleGroupEditor.prototype.deleteEmptyCommandRows = function(){
	var allParts = this._parts;
	var partsBeginIdx = this._commandPartsIdx;
	var deletedNum = 0;

	var list = this._data.list;
	var length = list.length;
	if(length<=1)return;

	var title = ParticleGroupEditor.COMMAND_TITLE;

    for(var i=0; i<length; i=(i+1)|0){
        var command = list[i];
        var partsIndex = i+partsBeginIdx;
        var parts = allParts[partsIndex];

        if(command===''){
        	list.splice(i,1);
	        i-=1;
	        length-=1;
	        deletedNum += 1;

	        this._commands.splice(partsIndex,1);
	        this._parts.splice(partsIndex,1);
	        parts.parent.removeChild(parts);

	        if(this._editingIndex<=partsIndex){
	        	this._editingIndex -= 1;
	        }
		}else if(deletedNum>0){
			parts._title = title+(i+1);
			parts._configNames = ['list.'+i];
			parts.y -= deletedNum*parts._height;
			parts.refreshTitleSprite();
			parts.refresh();
		}
    }



    return deletedNum>0;
};


/* parts
===================================*/
ParticleGroupEditor.LINE_MARGIN = 15;
ParticleGroupEditor.prototype.createParts = function(data,config){
	var title,configNames,headers;
	var y = 10;

	title = 'repeat';
	configNames = ['repeat'];
	headers = null;
	y += this.addValueParts(y,data,config,configNames,title,headers);
	y += 15;

	this._commandPartsIdx = this._parts.length;

	var list = data.list;
	this.addAllCommmandParts(data,config,list,y);
};
ParticleGroupEditor.prototype.addAllCommmandParts = function(data,config,list,y){
	var title = ParticleGroupEditor.COMMAND_TITLE;
	var headers = null;
	var length = list.length||1;
	for(var i=0; i<length; i=(i+1)|0){
		var configNames = ['list.'+i];
		y += this.addCommandParts(y,data,config,configNames,title+(i+1),headers);
	}
};

ParticleGroupEditor.prototype._addParts = function(y,parts,title){
	parts.setAlign('left');
	return ParticleEditor.prototype._addParts.apply(this,arguments);
};

ParticleGroupEditor.prototype.addCommandParts = function(y,data,config,configNames,title,headers){
	var parts = new CommandParam(data,config,configNames,title,headers);
	this._addParts(y,parts,title);
	return parts._height;
};

ParticleGroupEditor.prototype.insertCommandToUpper = function(){
	this.insertCommand(0);
};
ParticleGroupEditor.prototype.insertCommandToLower = function(){
	this.insertCommand(1);
};

ParticleGroupEditor.COMMAND_TITLE = 'command';
ParticleGroupEditor.prototype.insertCommand = function(delta){
	var currentIndex = this._editingIndex;
	var current = this._parts[currentIndex];
	if(!current || !(current instanceof CommandParam)){
		SoundManager.playBuzzer();
		return;
	}

	var partsIndex = currentIndex+delta;
	var dataIndex = Number(current._configNames[0].split('.')[1]);
	if((this._data.list[dataIndex]||current._inputting)===''){
		SoundManager.playBuzzer();
		return;
	}

	dataIndex+=delta;

	this._endEditing();
	this._editingIndex = -1;
	this.deselectParts();

	var data = this._data;
	var config = data.data();

	data.list.splice(dataIndex,0,'');
	if(data.list !== config.list){
		config.list.splice(dataIndex,0,'');
	}


	var y;
	if(this._parts[partsIndex]){
		y = this._parts[partsIndex].y;
	}else{
		y = this._parts[partsIndex-1].y+this._parts[partsIndex-1]._height;
	}

	var title = ParticleGroupEditor.COMMAND_TITLE;
	var configNames = ['list.'+dataIndex];
	var headers = null;
	var parts = new CommandParam(data,config,configNames,title+(dataIndex+1),headers);
	parts.setAlign('left');

	parts.refresh();
	this.addChild(parts);
	this._commands.splice(partsIndex,0,title.toUpperCase());
	this._parts.splice(partsIndex,0,parts);
	parts.y = y;
	y += parts._height;

	var length = this._parts.length;
	var dIndex = dataIndex-partsIndex;
	for(var i=partsIndex+1; i<length; i=(i+1)|0){
		dataIndex = i+dIndex;

		var parts = this._parts[i];
		parts._configNames = ['list.'+dataIndex];
		parts._title = title+(dataIndex+1);
		parts.y += parts._height;
		parts.refreshTitleSprite();
		parts.refresh();
	}

	this.startEditing(partsIndex);
};


/* picker
===================================*/
ParticleGroupEditor.prototype.usePickingMenuButtons = function(){
	return false;
};
ParticleGroupEditor.prototype.processPickPresetConfig = function(){
	if(!this._presetConfigPicker){
		this.createPresetConfigPicker();	
		if(!this._presetConfigPicker)return;
	}
	var targetType = this.targetData().targetType;
	var currentData = this.editingDataObject();
	this._presetConfigPicker.startPicking(this,targetType,currentData);
	this.startPicking(this._presetConfigPicker);
	this.startEditing(this._lastEditingIndex);
};
ParticleGroupEditor.prototype.processPickLoadConfig = function(){
	if(!this._loadConfigPicker){
		this.createLoadConfigPicker();	
		if(!this._loadConfigPicker)return;
	}
	var targetType = this.targetData().targetType;
	var currentData = this.editingDataObject();
	this._loadConfigPicker.startPicking(this,targetType,currentData);
	this.startPicking(this._loadConfigPicker);
	this.startEditing(this._lastEditingIndex);

};

ParticleGroupEditor.prototype.createPresetPicker = function(){
	var picker = new GroupPresetPicker();
	this._presetPicker = picker;
	this._addPicker(picker);
};
ParticleGroupEditor.prototype.createLoadPicker = function(){
	var picker = new GroupLoadPicker();
	this._loadPicker = picker;
	this._addPicker(picker);
};
ParticleGroupEditor.prototype.createPresetConfigPicker = function(){
	var picker = new GroupPresetConfigPicker();
	this._presetConfigPicker = picker;
	this._addPicker(picker);
};
ParticleGroupEditor.prototype.createLoadConfigPicker = function(){
	var picker = new GroupLoadConfigPicker();
	this._loadConfigPicker = picker;
	this._addPicker(picker);
};

/* applyData
===================================*/
ParticleGroupEditor.prototype.applyData = function(applyData,originalName){
	var allParts = this._parts;
	var length = allParts.length;

	var data = this._data;
	var config = data.data();
	var allParts = this._parts;

	//convert _sub & _auto
	var list = applyData.list.concat();

	if(originalName){
		var length = list.length;
	    for(var i=0; i<length; i=(i+1)|0){
	        list[i] = list[i].replace(/(?:_sub|_auto):[0-9]+/gi,function(a){
	        	return a+':'+originalName+'/h';
	        });
	    }
	}

	config.repeat = applyData.repeat;
	config.list = list;

	data.applyData();


	//repeat parts
	allParts[0].refresh();

	//remove all commandParts once
	var length = allParts.length;
	for(var i=this._commandPartsIdx; i<length; i=(i+1)|0){
		var parts = allParts[i];
		parts.parent.removeChild(parts);
	}
	this._commands.length = this._commandPartsIdx;
	this._parts.length = this._commandPartsIdx;

	var lastParts = allParts[allParts.length-1];
	var y = lastParts.y + lastParts._height + ParticleGroupEditor.LINE_MARGIN;
	this.addAllCommmandParts(data,config,list,y);

	if(this._activePicker){
		this._activePicker.parent.addChild(this._activePicker);
		this.hideParts();
	}

	this.tryParticleClear();
};


/* save
===================================*/
ParticleGroupEditor.prototype.executeSave = function(){
	var editing = this._parts[this._editingIndex];
	if(editing){
		editing._needsSave = true;
		editing.applyEditing();
		this.saveEditingParams();
	}

	this.deleteNonUseAutoNamedSubCommand();

	var data = this.editingDataObject();

	var date = new Date();
	var year = (date.getFullYear()%100).padZero(2);
	var month = (date.getMonth()+1).padZero(2);
	var day = date.getDate().padZero(2);
	data.comment = year+month+day;

	//register to config
	var name = this._data.name;
	var editing = $dataTrpParticleGroups[name]
    $dataTrpParticleGroups[name] = data;

    var file = JSON.stringify($dataTrpParticleGroups);
	this.writeSaveData(file);

	$dataTrpParticleGroups[name] = editing;

	//save help
	this.writeHelpFile();
};

ParticleGroupEditor.prototype.editingDataObject = function(){
	var allParts = this._parts;
	var length = allParts.length;

	var data = JsonEx.makeDeepCopy(ParticleGroupEditor.DEFAULT_DATA);
    for(var i = 0; i<length; i=(i+1)|0){
        var parts = allParts[i];
        parts.pushSaveDataParams(data);
    }

    //add meta data
    var group = this._data;
    var particleData = this._particle.particleData(group.eventId,group.id,group.target,group.name,undefined,undefined,undefined,undefined,true);
	data.targetType = particleData.targetType;

    return data;
};

ParticleGroupEditor.prototype.saveFilePath = function(){
	return ParticleGroupEditor.FILE_PATH
};

/* save help plugin
===================================*/
var _ParticleEditor_helpPluginExtraHelpTexts = ParticleEditor.prototype.helpPluginExtraHelpTexts;
ParticleEditor.prototype.helpPluginExtraHelpTexts = function(){
	var texts = _ParticleEditor_helpPluginExtraHelpTexts.call(this);

	var database = $dataTrpParticleGroups;
	var keys = Object.keys(database);
	if(keys.length===0){
		return texts;
	}

	texts += '\n *\n *\n * '+NLC('【パーティクルグループ】',13,'[GroupData]')+'\n';

	keys.sort();
	var length = keys.length;

	var idx = 0;
    for(var i = 0; i<length; i=(i+1)|0){
    	var key = keys[i];
    	if(Game_Particle.isIdHidden(key)){
    		continue;
    	}

        var data = database[key];
    	if(idx++>0){
    		texts += '\n';
    	}
        
        var targetType = data.targetType;
        var comment = data.comment;
        texts += ' * '+ParticleEditor.helpFileListText(key,targetType,comment);
    }

	texts += '\n *';
	return texts;
};

var _ParticleEditor_helpPluginCommandTexts = ParticleEditor.prototype.helpPluginCommandTexts;
ParticleEditor.prototype.helpPluginCommandTexts = function(database){
	var texts = _ParticleEditor_helpPluginCommandTexts.call(this,database);
	texts += '\n *\n *';
	texts += ParticleGroupEditor._helpPluginCommandTexts();
	return texts;
};


ParticleGroupEditor.prototype._helpPluginCommandTexts = function(database = $dataTrpParticleGroups){
	var allKeys = Object.keys(database);
	allKeys.sort();
	var length = allKeys.length;

	var allData = [];
	var allNames = [];
	PresetPicker.setCategoriedList(database,allData,allNames);

	var texts = '';
	var categoryLen = allNames.length;
	for(var i=0; i<categoryLen; i=(i+1)|0){
		var dataList = allData[i];
        var keys = allNames[i];
        var category = PresetPicker.CATEGORY_NAMES_EN[i];
        var categoryText = PresetPicker.CATEGORY_NAMES[i];
        var keysLen = keys.length;
        if(keysLen===0)continue;

    	texts += '\n * @command group_'+category;
		texts += NLC('\n * @text group/グループ > ',14)+categoryText+'('+keysLen+')';
		texts += NLC('\n * @desc グループ呼び出し',15);

	    texts += '\n * @arg id';
	    texts += NLC('\n * @text グループ管理ID',16);
	    texts += NLC('\n * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。',17);
	    texts += '\n * @default def';

	    texts += '\n * @arg target';
	    texts += NLC('\n * @text 対象',18);
	    texts += NLC('\n * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効',19);
	    texts += '\n * @default this';

		texts += '\n * @arg name';
	    texts += NLC('\n * @text 《グループ設定名》',20);
	    texts += NLC('\n * @desc 呼び出すグループの設定名',21);
	    texts += '\n * @type select';
	    texts += NLC('\n * @default 《呼び出す設定を選択》',22);

	    for(var j = 0; j<keysLen; j=(j+1)|0){
	        var key = keys[j];
	        if(Game_Particle.isIdHidden(key)){
	        	continue;
	        }
	        var data = database[key];
	        var targetType = data.targetType;
	        var comment = data.comment;

	        texts += '\n * @option '+ParticleEditor.helpFileListText(key,targetType,comment);
		    texts += '\n * @value '+key;
	    }

		texts += '\n * @arg tag';
		texts += NLC('\n * @text 管理タグ',23);
		texts += NLC('\n * @desc 管理用のタグ名。省略で「group:グループID」',24);

		texts += '\n * @arg edit';
		texts += NLC('\n * @text Editモード',25);
		texts += NLC('\n * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)',26);
		texts += '\n * @default false';
		texts += '\n * @type boolean';
		texts += ParticleGroup.DELAY_ARG_TEXT;
	}



	
	// texts += '\n * @command groupSet';
	// texts += NLC('\n * @text group/グループ',27);
	// texts += NLC('\n * @desc グループ呼び出し',28);

 //    texts += '\n * @arg id';
 //    texts += NLC('\n * @text グループ管理ID',29);
 //    texts += NLC('\n * @desc 他と被らないグループ用管理ID。「def」でIDは設定名、「-EID」で設定名-EID。',30);
 //    texts += '\n * @default def';

 //    texts += '\n * @arg target';
 //    texts += NLC('\n * @text 対象',31);
 //    texts += NLC('\n * @desc 対象。this,player,weatherなど。対象をtargetとしたコマンドで有効',32);
 //    texts += '\n * @default this';

	// texts += '\n * @arg name';
 //    texts += NLC('\n * @text 《グループ設定名》',33);
 //    texts += NLC('\n * @desc 呼び出すグループの設定名',34);
 //    texts += '\n * @type select';
 //    texts += NLC('\n * @default 《呼び出す設定を選択》',35);

 //    for(var i = 0; i<length; i=(i+1)|0){
 //        var key = keys[i];
 //        if(Game_Particle.isIdHidden(key)){
 //        	continue;
 //        }
 //        var data = database[key];
 //        var targetType = data.targetType;
 //        var comment = data.comment;

 //        texts += '\n * @option '+ParticleEditor.helpFileListText(key,targetType,comment);
	//     texts += '\n * @value '+key;
 //    }

	// texts += '\n * @arg tag';
	// texts += NLC('\n * @text 管理タグ',36);
	// texts += NLC('\n * @desc 管理用のタグ名',37);

	// texts += '\n * @arg edit';
	// texts += NLC('\n * @text Editモード',38);
	// texts += NLC('\n * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)',39);
	// texts += '\n * @default false';
	// texts += '\n * @type boolean';
	// texts += ParticleGroup.DELAY_ARG_TEXT;

	texts += '\n *';
	return texts;
};
ParticleGroupEditor._helpPluginCommandTexts = ParticleGroupEditor.prototype._helpPluginCommandTexts;
ParticleGroup.DELAY_ARG_TEXT =
	'\n * @arg delay'
	+ NLC('\n * @text _ディレイ',40)
	+ NLC('\n * @desc 1以上とすると、指定フレーム後にコマンドを実効',41)
	+ '\n * @default 0'
	+ '\n * @type number'
	+ '\n * @min 0';





//=============================================================================
// Param
//=============================================================================
var ParticleParam = ParticleEditor.ParticleParam;
var KEY_CODE = ParticleParam.KEY_CODE;
var ValueParam = ParticleParam.ValueParam;

//=============================================================================
// CommandParam
//=============================================================================
var CommandParam = ParticleParam.CommandParam = function CommandParam(){
    this.initialize.apply(this, arguments);
}
CommandParam.prototype = Object.create(ValueParam.prototype);
CommandParam.prototype.constructor = CommandParam;
CommandParam.prototype.initialize = function(data,config,configNames,title) {
	ParticleParam.prototype.initialize.apply(this,arguments);

	this.listIndex = Number(configNames[0].split('.')[1]);
	this._needsSave = false;

	this._lastInputting = '';

	this._cursorIndex = -1;
	this._cursorSprite = null;
	this._cursorFrame = 0;

	this.createCursorSprite();

	this.clearInputting();
	this._lastInputting = this._inputting;
	
};


CommandParam.prototype.update = function(){
	if(ValueParam.prototype.update){
		ValueParam.prototype.update.call(this);
	}
	if(this._cursorSprite.visible){
		this.updateCursor();
	}
};



/* cursor
===================================*/
CommandParam.CURSOR_ANIMATION_BASE = 15;
CommandParam.prototype.updateCursor = function(){
	this._cursorFrame += 1;
	if(this._cursorFrame>=2*CommandParam.CURSOR_ANIMATION_BASE){
		this._cursorFrame = 0;
		this._cursorSprite.opacity = 200;
	}else if(this._cursorFrame===CommandParam.CURSOR_ANIMATION_BASE){
		this._cursorSprite.opacity = 100;
	}
};

CommandParam.prototype.createCursorSprite = function(){
	var bitmap = CommandParam.CURSOR_BITMAP = new Bitmap(3,ParticleParam.LINE_HEIGHT);
	bitmap.fillAll('rgb(200,255,255)');

	var sprite = new Sprite(bitmap);
	this._cursorSprite = sprite;
	return sprite;
};
CommandParam.prototype.setCursor = function(index,force){
	var sprite = this._cursorSprite;
	if(this._editingIndex<0){
		sprite.visible = false;
		return;
	}

	sprite.visible = true;
	sprite.opacity = 255;
	this._cursorFrame = 0;

	var parts = this._parts[0];
	if(!parts || parts.length===0)return;

	parts.addChild(sprite);

	index = Math.min(this._inputting.length,index);

	if(!force && this._cursorIndex===index)return;
	this._cursorIndex = index;

	if(index<0){
		sprite.visible = false;
		return;
	}

	var text = this._inputting.substring(0,index);
	var width = parts.bitmap.measureTextWidth(text);

	sprite.x = width;
};
CommandParam.prototype.setCursorTail = function(force=false){
	this.setCursor(this._inputting.length,force);
};
CommandParam.prototype.setCursorToNextArg = function(){
	var index = this._cursorIndex;
	var tail = this._inputting.substring(index);
	if(tail.length===0)return;

	var args = tail.split(' ');
	var top = args.shift();
	if(!top){
		top = args.shift();
		index += 1;
	}
	index += top.length;
	this.setCursor(index);
};
CommandParam.prototype.setCursorToPreviousArg = function(){
	var index = this._cursorIndex;
	var header = this._inputting.substring(0,index);
	if(header.length===0)return;

	var args = header.split(' ');
	var last = args.pop();
	if(!last){
		last = args.pop();
		index -= 1;
	}

	index -= last.length;
	this.setCursor(index);	
};



/*===================================*/
CommandParam.prototype.defaultValue = function(){
	return '';
};
CommandParam.prototype.isDataInputting = function(){
	return this._inputting !== this._savedValue;
};

CommandParam.prototype.processInput = function(keyCode,key){
	if(Input.isRepeated('left')){
		if(this._cursorIndex>0){
			if(Input.isPressed('shift')){
				this.setCursor(0);
			}else if(Input.isPressed('control')){
				this.setCursorToPreviousArg();
			}else{
				this.setCursor(this._cursorIndex-1);
			}
		}
	}else if(Input.isRepeated('right')){
		if(this._cursorIndex<this._inputting.length){
			if(Input.isPressed('shift')){
				this.setCursorTail();
			}else if(Input.isPressed('control')){
				this.setCursorToNextArg();
			}else{
				this.setCursor(this._cursorIndex+1);
			}
		}
	}else if(key===' '){
		//add space if not space continues
		if(this._cursorIndex===0 || this._inputting[this._cursorIndex-1]!==' '){
			if(this._cursorIndex===this._inputting.length || this._inputting[this._cursorIndex]!==' '){
				this._processCharacterInput(keyCode,key);
				Input.clear();
			}
		}
	}else if(keyCode===KEY_CODE.backSpace){
		if(Input.isPressed('shift')){
			this._inputting = '';
			this.applyEditing();
			this.setCursorTail();
			SoundManager.playCursor();
		}else if(this._inputting.length>0 && this._cursorIndex>0){
			this._inputting = (
				this._inputting.substring(0,this._cursorIndex-1)
				+ this._inputting.substring(this._cursorIndex)
			);
			this.applyEditing();
			this.setCursor(this._cursorIndex-1);
		}
	}else if(Input.isTriggered('ok')){
		this._needsSave = true;
		this.applyEditing();
		SoundManager.playCursor();
	}else{
		return ParticleParam.prototype.processInput.call(this,keyCode,key);
	}
	return true;
};
CommandParam.prototype.deleteTailArgOfInputting = function(){
	var target = this._inputting.substring(0,this._cursorIndex);
	var tail = this._inputting.substring(this._cursorIndex);

	var args = target.split(' ');
	if(args.pop() === ''){
		args.pop();
	}

	target = concatToString(args);
	if(target.length>0){
		target += ' ';
	}

	this._inputting = target+tail;
	this.setCursor(target.length);
};
CommandParam.prototype.isPlaySomeCommand = function(){
	var command = this._inputting;
	var args = command.split(' ');
	var sub = ParticleGroup.processParticleSubCommand(args);
	return Game_Particle.isPlayCommands(sub);
};
CommandParam.prototype.isSubSetCommand = function(){
	var command = this._inputting;
	var args = command.split(' ');
	var sub = ParticleGroup.processParticleSubCommand(args);
	return sub==='sub';
};
CommandParam.prototype.changeSubCommand = function(value){
	var command = this._inputting;
	var args = command.split(' ');
	var sub = ParticleGroup.processParticleSubCommand(args);

	if(!sub || sub===value)return '';

	var subIndex = -1;
	if(Game_Particle.isPlayCommands(sub)){
		subIndex = 0;
	}else if(sub==='sub'){
		subIndex = 1;
	}else{
		return false;
	}

	var lastSub = args[subIndex];
	args[subIndex] = value;

    this._inputting = concatToString(args);;

    this._needsSave = true;
    this.applyEditing();

    return lastSub;
};
CommandParam.prototype.changePlayCommandConfigName = function(newName){
	var command = this._inputting;
	var args = command.split(' ');
	var sub = ParticleGroup.processParticleSubCommand(args);
	if(!sub)return false;

	if(sub==='sub'){
		args[3] = newName;
	}else{
		var id = args[1];
		var name = args[3];
		if(name && name!=='def'){
			//change config name
			args[3] = newName;
		}else{
			//change id
			args[1] = newName;
			if(/-EID$/.test(id)){
				args[1] += '-EID';
			}
		}		
	}

	this._inputting = concatToString(args);
	this._needsSave = true;
    this.applyEditing();
    return true;
};

CommandParam.prototype.changeSubEmitterParams = function(timing,endTiming,speedRate,inheritAngle,inheritScale){
	var command = this._inputting;
	var args = command.split(' ');
	var sub = ParticleGroup.processParticleSubCommand(args);

	//sub, edit, id, name, timing, endTiming, speedRate
	args[4] = String(timing);
	args[5] = String(endTiming);
	args[6] = String(speedRate);
	args[7] = String(inheritAngle);
	args[8] = String(inheritScale);

    this._inputting = concatToString(args);
    this._needsSave = true;
    this.applyEditing();

    return true;
};

CommandParam.prototype.clearInputting = function(deleteFlag){
	this._lastInputting = this._inputting;
	this._inputting = this.value(0);

	this._textsCache.length = 0;
	this.setCursorTail();
};

CommandParam.prototype._processCharacterInput = function(keyCode,key){
	if(keyCode && key && key.length===1){
		this._inputting = (
			this._inputting.substring(0,this._cursorIndex)
			+ key
			+ this._inputting.substring(this._cursorIndex)
		);
		this.applyEditing();
		this.setCursor(this._cursorIndex+1);
	}
};
CommandParam.prototype.addText = function(text){
	this._inputting = (
		this._inputting.substring(0,this._cursorIndex)
		+ text
		+ this._inputting.substring(this._cursorIndex)
	);
	this.setCursor(this._cursorIndex+text.length)

    this._needsSave = true;
    this.applyEditing();
};

CommandParam.prototype.valueWithInputting = function(){
	var input = this._inputting;
	return input;
};


CommandParam.prototype.layout = function(){
	ParticleParam.prototype.layout.call(this);
	this._width = this._titleWidth + this.maxPartsWidth();
};
CommandParam.prototype.partsText = function(index){
	var text = this._inputting;
	var header = this.partsHeader(index);
	if(header){
		text = header + ':'+ text;
	}
	return text
};


CommandParam.prototype.endEditing = function(){
	var index = this._editingIndex;
	if(index<0)return;
	var value = this.valueWithInputting();

	this._needsSave = true;
	this.applyEditing();

	ParticleParam.prototype.endEditing.call(this);

	this._cursorSprite.visible = false;
	this._cursorIndex = -1;
	this._cursorFrame = 0;
};


CommandParam.prototype.shouldSave = function(data){
	if(!this._needsSave){
		return false;
	}
	this._needsSave = false;
	if(this._inputting === this._lastInputting)return false;
	this._lastInputting = this._inputting;

	this._needsSave = false;
	return true;
};

CommandParam.prototype.paramSaveData = function(index,value){
	var values = this.values();
	if(value !== undefined){
		values[index] = value;
	}

	return values;
};
CommandParam.prototype.didSaveParams = function(){
	this.clearInputting();
	this.refresh();
};

CommandParam.MAX_PARTS_WIDTH = 512;
CommandParam.prototype.maxPartsWidth = function(){
	return CommandParam.MAX_PARTS_WIDTH;
};
CommandParam.prototype.refresh = function(){
	ValueParam.prototype.refresh.call(this);

	this.setCursorTail(true);
};
CommandParam.prototype.refreshPartsText = function(sprite,text,i){
	var bitmap = sprite.bitmap;
	if(this.isCommandValid(i)){
		if(this._inputting === this._lastInputting){
			bitmap.textColor = 'white';
		}else{
			bitmap.textColor = 'rgb(200,200,255)'
		}
	}else{
		bitmap.textColor = 'red';
	}
	ParticleParam.prototype.refreshPartsText.apply(this,arguments);
	bitmap.textColor = 'white';
};


CommandParam.prototype.isCommandValid = function(i){
	var index = this.listIndex;
	var command = this._inputting;
	var commandValidFunc = ParticleGroup.isCommandTargetIdValid;

	ParticleGroup.isCommandTargetIdValid = ParticleGroup.isCommandTargetIdValidForEdit.bind(this,this._data.list,index);

	var ret = ParticleGroup.isCommandValid(command,this._data.id,this._data.name,null);

	ParticleGroup.isCommandTargetIdValid = commandValidFunc;
	return ret;
};

ParticleGroup.isCommandTargetIdValidForEdit = function(list,index,groupId,groupName,id){
	if(id===undefined){
		return false;
	}
	if(id==='' || id===' '){
		return false;
	}

	if(id.contains(':')){
		return true;
	}

	if($gameScreen._particle._data[id+ParticleGroup.idSuffix(groupId)]){
		return true;
	}

	var length = list.length;
    for(var i=0; i<index; i=(i+1)|0){
        var command = list[i];
        var args = command.split(' ');
        var sub = ParticleGroup.processParticleSubCommand(args);
        if(sub==='set'||sub==='play'||sub==='edit'){
        	var playId = args[1];
        	if(playId===id){
        		return true;
        	}
        }
    }
    return false;
};



//=============================================================================
// PresetPicker
//=============================================================================
var PresetPicker = ParticleEditor.PresetPicker
function GroupPresetPicker(){
    this.initialize.apply(this, arguments);
};
GroupPresetPicker.prototype = Object.create(PresetPicker.prototype);
GroupPresetPicker.prototype.constructor = GroupPresetPicker;

GroupPresetPicker.prototype.createAllData = function(){
	return this._createAllData($dataTrpParticleGroupsPreset);
};

//=============================================================================
// LoadPicker
//=============================================================================
var LoadPicker = ParticleEditor.LoadPicker
function GroupLoadPicker(){
    this.initialize.apply(this, arguments);
};
GroupLoadPicker.prototype = Object.create(LoadPicker.prototype);
GroupLoadPicker.prototype.constructor = GroupLoadPicker;
GroupLoadPicker.prototype.initialize = function(){
    LoadPicker.prototype.initialize.call(this);
};

GroupLoadPicker.prototype.rawData = function(){
	return $dataTrpParticleGroups;
};


//=============================================================================
// GroupPresetConfigPicker
//=============================================================================
function GroupPresetConfigPicker(){
    this.initialize.apply(this, arguments);
};
GroupPresetConfigPicker.prototype = Object.create(PresetPicker.prototype);
GroupPresetConfigPicker.prototype.constructor = GroupPresetConfigPicker;
GroupPresetConfigPicker.prototype.applyData = function(){
	if(!this._owner)return;

	var name = this._names[this._selectingIndexes[0]];
	if(!name)return;
	this._owner.applyPlayCommandConfigName(name)
};


//=============================================================================
// GroupLoadConfigPicker
//=============================================================================
function GroupLoadConfigPicker(){
    this.initialize.apply(this, arguments);
};
GroupLoadConfigPicker.prototype = Object.create(LoadPicker.prototype);
GroupLoadConfigPicker.prototype.constructor = GroupLoadConfigPicker;
GroupLoadConfigPicker.prototype.applyData = GroupPresetConfigPicker.prototype.applyData;





})();