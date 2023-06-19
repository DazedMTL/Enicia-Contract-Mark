//=============================================================================
// TRP_ParticleMZ_Group.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc グループ再生機能の有効化
 * @author Thirop
 * @base TRP_ParticleMZ
 * @orderAfter TRP_ParticleMZ
 *
 * 【更新履歴】
 * 1.13 2021/11/4  隠しコマンド(flash/shake/se)に対応
 * 1.09 2021/7/19  設定名の「/h」を自動補完
 *                 座標調整が正しく反映されない不具合修正 
 * 1.05 2021/4/22  設定名に「_auto:~」使用可能に修正
 * 1.00 2021/4/10  初版
 *
 *
 * @command set
 * @text set/表示
 * @desc パーティクル表示
 *
 * @arg id
 * @text 管理ID
 * @desc 他と被らない管理ID。（末尾に-EIDをつけるとEIDがイベントIDに置き換わる。）
 * @default def
 *
 * @arg target
 * @text ターゲット
 * @desc thisでこのイベント。「event:イベントID」「player」「weather」など
 * @default this
 *
 * @arg name
 * @text データ名
 * @desc データ名。defとすると管理IDをデータ名として使用。（重み同じデータ名を複数表示するときは管理IDを分ける）
 * @default def
 *
 * @arg tag
 * @text 管理タグ
 * @desc 管理用のタグ名。省略で「group:グループ管理ID」
 *
 * @arg edit
 * @text Editモード
 * @desc ONにするとエディタを呼び出し(テストプレイ時のみ有効)
 * @default false
 * @type boolean
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @command clear
 * @text clear/クリア
 * @desc グループの再生停止。(setコマンドで再生中のパーティクルを消すにはparticle clear tag:group:グループ管理ID)
 *
 * @arg id
 * @text 対象グループ管理ID
 * @desc 対象グループ管理ID
 *
 * @arg quit
 * @text 中断
 * @desc on/trueとすると再生完了を待たずに中断
 * @type boolean
 * @default false
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効
 * @default 0
 * @type number
 * @min 0
 */
//============================================================================= 
//PRAGMA_END: groupHeader

var $dataTrpParticleGroupsPreset = $dataTrpParticleGroupsPreset||null;
var $dataTrpParticleGroups = null;


(function(){
'use strict';
//PRAGMA: groupPluginSetting
var pluginName = 'TRP_ParticleMZ_Group';
Game_Particle.GROUP_DATA_FIILE_PATH = '../dataEx/TrpParticleGroups.json';
var baseParameters = PluginManager.parameters('TRP_ParticleMZ');
//PRAGMA_END: groupPluginSetting

var LC = TRP_Localize.localize.bind(TRP_Localize,'parGr');
var NLC = TRP_Localize.noLocalize;

var errorLog = baseParameters.errorLog === 'true';

DataManager._databaseFiles.push({
	name:'$dataTrpParticleGroups',
	src:Game_Particle.GROUP_DATA_FIILE_PATH,
});

var _DataManager_loadDataFile = DataManager.loadDataFile;
DataManager.loadDataFile = function(name, src) {
	if(src.contains('Test_')&&src.contains('TrpParticleGroups')){
		src = Game_Particle.GROUP_DATA_FIILE_PATH;
	}
	_DataManager_loadDataFile.call(this,name,src);
};

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


//PRAGMA: groupCommandRegister
//=============================================================================
// Plugin Command
//=============================================================================
(()=>{
	const commands = ['set','clear'];
	for(const command of commands){
		PluginManager.registerCommand(pluginName, command, function(args){
			//this > interpreter
			var argsArr = Object.values(args)
			var delay = Number(argsArr.pop())||0;

			var pCommand = command;
			if(command==='set'){
				var editFlag = argsArr.pop()==='true';
				if(editFlag){
					pCommand = 'edit';
				}
				var tag = argsArr.pop();
				if(tag){
					if(!tag.contains('tag:')){
						tag = 'tag:'+tag;
					}
					argsArr.push(tag);
				}
			}

			argsArr.unshift(pCommand);
			argsArr.unshift('group');
		
			var eventId = this.eventId();
			if(delay>0){
				$gameScreen._particle.reservePluginCommand(delay,this,argsArr,eventId);
			}else{
				$gameScreen._particle.pluginCommand(this,argsArr,eventId);
			}
		});
	}


	/* TRP_ParticleList
	===================================*/
	function _listCommand(command,args){
		//this > interpreter
		var id;
		if(!args.id||args.id==='def'||args.id==='d'){
			args.id = args.name;
		}
		if(id==='-EID'){
			id = args.name+'-EID';
		}else{
			id = supplementDef(args.name,args.id);
		}

		var command = args.edit==='true' ? 'edit' : 'set';
		var delay = Number(args.delay)||0;
		var argsArr = ['group',command,id,args.target,args.name];
		if(args.tag){
			argsArr.push('tag:'+args.tag);
		}
		var eventId = this.eventId();

		if(delay>0){
			$gameScreen._particle.reservePluginCommand(delay,this,argsArr,eventId);
		}else{
			$gameScreen._particle.pluginCommand(this,argsArr,eventId);
		}
	}

	var categoryNames = Game_Particle.CATEGORY_NAMES;
	var categoryLength = categoryNames.length;
	var listPlugin = 'TRP_ParticleMZ_List';
	var presetPlugin = 'TRP_ParticleMZ_Preset';
	for(var j=0; j<categoryLength; j=(j+1)|0){
		var category = categoryNames[j];
		var command = 'group_'+category;
		PluginManager.registerCommand(listPlugin, command, function(args){
			_listCommand.call(this,command,args);
		});
		PluginManager.registerCommand(presetPlugin, command, function(args){
			_listCommand.call(this,command,args);
		});
	}
})();
//PRAGMA_END: groupCommandRegister



//=============================================================================
// Game_Particle
//=============================================================================
Game_Particle.groupData = function(data){
	return this.groupDataWithName(data.name);
};
Game_Particle.groupDataWithName = function(name){
	var config = $dataTrpParticleGroups[name];
	if(config){
		return config;
	}

	config = $dataTrpParticleGroupsPreset[name];
	if(config){
		return config;
	}

	if(name.indexOf('/h')!==name.length-2){
		return this.groupDataWithName(name+'/h');
	}
	
	return null;
};

var _Game_Particle_initialize = Game_Particle.prototype.initialize;
Game_Particle.prototype.initialize = function() {
	_Game_Particle_initialize.call(this);
	this._groups = {};
	this._groupKeys = [];
};

var _Game_Particle_pluginCommand= Game_Particle.prototype.pluginCommand;
Game_Particle.prototype.pluginCommand = function(interpreter,args,eventId){
	var sub = args[0].toLowerCase();
	if(sub === 'group'){
		this.processGroupCommand(interpreter,args,eventId);
	}else{
		_Game_Particle_pluginCommand.call(this,interpreter,args,eventId);
	}
};

Game_Particle.prototype.processGroupCommand = function(interpreter,args,eventId){
	var main = args.shift();
	var sub = args.shift().toLowerCase();

	//process eid
	if(!isNaN(eventId)){
		this.processArgsEventId(args,eventId);
	}

	var tag;
	if(sub==='set'||sub==='play'||sub==='edit'){
		tag = this.extractTagRegister(args);
		args.splice(-1+Game_Particle.GROUP_COMMAND_ARGS_INDEX_TAG,0,tag);

		var targetId = '';
		if(sub==='set'||sub==='play'){
			args.unshift(eventId);
			Game_Particle.prototype.particleGroupSet.apply(this,args);
			targetId = args[1];
		}else if(sub==='edit'){

			args.unshift(eventId);
			if(Game_Particle.prototype.particleGroupEdit.apply(this,args) && interpreter){
				interpreter.wait(1);
			}
			targetId = args[2];
		}
	}else if(sub==='clear'){
		Game_Particle.prototype.particleGroupClear.apply(this,args);
	}
};

Game_Particle.GROUP_COMMAND_ARGS_INDEX_TAG = 3;
Game_Particle.prototype.particleGroupEdit = function(){};
Game_Particle.prototype.particleGroupSet = function(eventId,id,target,tag,name,x,y){
	name = supplementDef(id,name)||id;
	id = this.idWithSuffix(id);

	if(!!this._groups[id]){
		return;
	}


	x = Number(x)||0;
	y = Number(y)||0;

	if(!Game_Particle.groupDataWithName(name)){
		if(errorLog){
			throw new Error(LC('設定名:%1のグループ設定データが存在しません。',0).format(name));
		}
		return;
	}
	if(errorLog && target===undefined){
		throw new Error(LC('パーティクル表示コマンドの対象が設定されてません。',2)+'(ID:'+id+')');
	}

	//make data
	var group = new ParticleGroup(eventId,id,target,tag,name,x,y);

	this._groups[id] = group;
	this._groupKeys.push(id);
	return group;
};

Game_Particle.prototype.particleGroupClear = function(id,quit){
	if(quit==='false'||quit==='f'){
		quit = false;
	}else if(quit==='true'||quit==='t'){
		quit = true;
	}else{
		quit = supplementDef(false,quit);
	}

	var data = this._groups[id];
	if(data){
		data.repeat = -1;
		if(quit){
			var index = this._groupKeys.indexOf(id);
			this._groupKeys.splice(index,1);
			delete this._groups[id];
		}
	}
};


var _Game_Particle_update = Game_Particle.prototype.update;
Game_Particle.prototype.update = function(){
	_Game_Particle_update.call(this);

	var keys = this._groupKeys;
	var length = keys.length;
	var destroyed = false;
    for(var i = length-1; i>=0; i=(i-1)|0){
        var key = keys[i];
        var group = this._groups[key];
        if(group && !group.destroy){
        	group.update(this);
        }

        if(!group || group.destroy){
        	keys.splice(i,1);
        	delete this._groups[key];
        }
    }
};

/* auto remove
===================================*/
var _Game_Particle_removeCharacterTargetParticles = Game_Particle.prototype.removeCharacterTargetParticles;
Game_Particle.prototype.removeCharacterTargetParticles = function(){
	this._removeCharacterTargetParticles(this._groupKeys,this._groups);

	_Game_Particle_removeCharacterTargetParticles.call(this);
};
var _Game_Particle_removePartyTargetParticles = Game_Particle.prototype.removePartyTargetParticles;
Game_Particle.prototype.removePartyTargetParticles = function(){
	this._removePartyTargetParticles(this._groupKeys,this._groups);

	_Game_Particle_removePartyTargetParticles.call(this);
};

var _Game_Particle_removeParticlesWithTargetTypes = Game_Particle.prototype.removeParticlesWithTargetTypes;
Game_Particle.prototype.removeParticlesWithTargetTypes = function(types){
	this._removeParticlesWithTargetTypes(types,this._groupKeys,this._groups);

	_Game_Particle_removeParticlesWithTargetTypes.call(this,types);
};

var _Game_Particle_clearTargetsParticles = Game_Particle.prototype.clearTargetsParticles;
Game_Particle.prototype.clearTargetsParticles = function(targetTypes,targetId,keys,allData){
	_Game_Particle_clearTargetsParticles.call(this,targetTypes,targetId,this._groupKeys,this._groups);
	_Game_Particle_clearTargetsParticles.call(this,targetTypes,targetId,keys,allData);
};


//=============================================================================
// ParticleGroup
//=============================================================================
Game_Particle.ParticleGroup =function ParticleGroup(){
    this.initialize.apply(this, arguments);
}
var ParticleGroup = Game_Particle.ParticleGroup;

ParticleGroup.prototype.initialize = function(eventId,id,target,tag,name,x,y){
	var particleData = $gameScreen._particle.particleData(eventId,id,target,name,undefined,undefined,undefined,undefined,true);

	this.id = id;
	this.eventId = eventId;
	this.target = target;
	this.targetType = particleData.targetType;
	this.targetId = particleData.targetId;
	this.name = name;
	this.replacedName = name.replace('/h','');
	this.tag = tag||('group:'+id);
	this.x = x;
	this.y = y;

	this.params = {};

	this._stop = false;
	this._clear = false;
	this.quit = false;
	this.interval = 0;

	this.exceed = null;

	this.list = null;
	this.repeat = 0;

	this.destroy = false;

	this._index = -1;
	this._wait = 0;

	this.applyData();
};
ParticleGroup.prototype.applyData = function(){
	var data = this.data();
	this.repeat = data.repeat;

	if(data.list.length === 0){
		data.list = [''];
	}
	this.list = data.list;
}
ParticleGroup.prototype.data = function(){
	return Game_Particle.groupData(this);
};
ParticleGroup.idSuffix = function(id){
	return '/GROUP:'+id
};

Object.defineProperty(ParticleGroup.prototype, 'clear', {
    get: function() {
        return this._clear
    },set: function(value){
        this._clear = value;
        if(value){
        	this.repeat = -1;
			if(this.stop){
				this.processQuit();
			}
        }
    },
    configurable: true
});
Object.defineProperty(ParticleGroup.prototype, 'stop', {
    get: function() {
        return this._stop
    },set: function(value){
        this._stop = value;
        if(value){
			if(this.clear){
				this.processQuit();
			}
        }
    },
    configurable: true
});
ParticleGroup.prototype.processQuit = function(particle=$gameScreen._particle){
	var index = particle._groupKeys.indexOf(this.id);
	if(index>=0){
		particle._groupKeys.splice(index,1);
		delete particle._groups[this.id];
	}
};


function activeInterpreter(){
	var interpreter;
	if($gameTroop.inBattle() && $gameTroop.isEventRunning()){
		interpreter = $gameTroop._interpreter;
	}else if($gameMap.isEventRunning()){
		interpreter = $gameMap._interpreter;
	}else{
		return null;
	}

	while(interpreter._childInterpreter){
		interpreter = interpreter._childInterpreter;
	}
	return interpreter;
};

ParticleGroup.processParticleSubCommand = function(args){
	if(baseParameters.commandNames.contains(args[0])){
		args.shift();
	}
	return args[0];
}

ParticleGroup.prototype.update = function(particle){
	if(this._wait>0){
		this._wait -= 1;
		return;
	}

	var list = this.data().list;
	var length = list.length;

	var suffix = ParticleGroup.idSuffix(this.id);
	$gameScreen._particle.addAutoIdSuffix(suffix);

	var interpreter = activeInterpreter();
	while(this._index<length-1 && this._wait<=0){
		this._index = (this._index+1)|0

		var command = list[this._index];

		var args = command.split(' ');
		var isPlayCommands = false;

		ParticleGroup.processParticleSubCommand(args);

		if(!this.isCommandValid(command,this.id,this.replacedName,args)){
			break;
		}

		switch(args[0].toLowerCase()){
		case 'wait':
			this._wait = Number(args[1]);
			break;


		case 'edit':
		case 'set':
		case 'play':
			isPlayCommands = true;
			var tag = particle.extractTagRegister(args);
			tag = tag || this.tag;

			if(tag){
				if(!tag.contains('tag:')){
					tag = 'tag:'+tag;
				}
				args.push(tag);
			}
			if(args[2]==='target'){
				args[2] = this.target;
			}
			if(/^_auto:[0-9]+$/.test(args[1])){
				args[1] += ':'+this.replacedName+'/h';
			}
			if(args[3] && /^_auto:[0-9]+$/.test(args[3])){
				args[3] += ':'+this.replacedName+'/h';
			}

			break;
		case 'repeat':
		case 'on':
		case 'off':
		case 'clear':
		case 'update':
		case 'animate':
		case 'move':
		case 'exceed':
		case 'screenLoop':
		case 'loop':
		case 'filter':
		case 'max':
			if(/^_auto:[0-9]+$/.test(args[1])){
				args[1] += ':'+this.replacedName+'/h';
			}
			break;

		case 'sub':
			if(/_auto:[0-9]+$/.test(args[2])){
				args[2] += ':'+this.replacedName+'/h';
			}
			if(/_sub:[0-9]+$/.test(args[3])){
				args[3] += ':'+this.replacedName+'/h';
			}
			break;
		}
		if(this._wait>0){
			break;
		}

		particle.pluginCommand(interpreter,args,this.eventId);
		if(isPlayCommands){
			if(this.x || this.y){
				particle.particleUpdate([args[1],'pos',this.x||0,this.y||0]);
			}
		}
	}

	$gameScreen._particle.removeAutoIdSuffix(suffix);

	if(this._wait<=0 && this._index >= length-1){
		if(this.repeat>=0){
			this._wait = this.repeat;
			this._index = -1;
		}else{
			this.destroy = true;
		}
	}
};


//=============================================================================
// command validation
//=============================================================================
ParticleGroup.prototype.isCommandValid = function(command,id,name,args){
	return ParticleGroup.isCommandValid(command,id,name,args);
};
ParticleGroup.isCommandValid = function(command,id,groupName,args=null){
	if(!command)return false;

	args = args || command.split(' ');
	var sub = ParticleGroup.processParticleSubCommand(args);
	if(!sub){
		return false;
	}

	sub = sub.toLowerCase();

	//check sub commands
	switch(sub){
	case 'wait':
		return !isNaN(args[1]) && Number(args[1])>=0
	case 'set':
	case 'play':
	case 'edit':
		return this._isPlayCommandValid(id,groupName,sub,args);

	case 'repeat':
	case 'on':
	case 'off':
	case 'clear':
	case 'update':
	case 'animate':
	case 'move':
	case 'exceed':
	case 'screenLoop':
	case 'loop':
	case 'filter':
	case 'max':
		if(!this.isCommandTargetIdValid(id,groupName,args[1])){
			return false;
		}
		break;
	case 'sub':
		if(/_auto:[0-9]+$/.test(args[2])){
			args[2] += ':'+groupName+'/h';
		}
		if(args[1]!=='edit'){
			var name = args[3];
			if(/^_sub:[0-9]+$/.test(name)){
				name += ':'+groupName+'/h';
			}
			if(!$dataTrpParticles[name] && !$dataTrpParticlePreset[name]){
				return false;
			}
		}
		if(!this.isCommandTargetIdValid(id,groupName,args[2])){
			return false;
		}
		break;


	case 'flash':
	case 'shake':
	case 'se':
		return true;

	case 'group':
		return false;
	default:
		return false;
	}

	return true;
};

ParticleGroup.isCommandTargetIdValid = function(groupId,groupName,id){
	if(id===undefined){
		return false;
	}
	if(id==='' || id===' '){
		return false;
	}
	if(/_auto:[0-9]+$/.test(id)){
		id += ':'+groupName+'/h';
	}

	if(!id.contains('/GROUP:')
		&& id!=='all'
		&& id.indexOf('all:')!==0
		&& id.indexOf('tag:')!==0)
	{
		id += ParticleGroup.idSuffix(groupId);	
		if(!$gameScreen._particle._data[id]){
			return false;
		}
	}
	
	return true;
};
ParticleGroup._isPlayCommandValid = function(groupId,groupName,command,args){
	if(args.length<=2 || args[2]===''||args[2]===' '){
		return false;
	}

	//remove tag arg
	var length = args.length;
    for(var i=0; i<length; i=(i+1)|0){
        var arg = args[i];
        if(arg.indexOf('tag:')===0){
        	args = args.concat();
        	args.splice(i,1);
        	break;
        }
    }

	var id = args[1];
	var target = args[2];
	var name = args[3];

	if(/^_auto:[0-9]+$/.test(id)){
		id += ':'+groupName+'/h';
	}
	if(/^_auto:[0-9]+$/.test(name)){
		name += ':'+groupName+'/h';
	}

	name = supplementDef(id,name)||id;

	// var eventId = this._data.eventId;
	// var data = $gameScreen._particle.particleData(eventId,id,target,name)
	// if(!data)return false;


	//check id
	if(id==='' || id===' '){
		return false;
	}


	//check name exists
	if(command!=='edit'){
		if(!$dataTrpParticles[name] && !$dataTrpParticlePreset[name]){
			return false;
		}
	}

	return true;
};




})();