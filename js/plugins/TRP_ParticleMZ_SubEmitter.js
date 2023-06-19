//=============================================================================
// TRP_ParticleMZ_SubEmitter.js
//=============================================================================
/* このソフトウェアは正規に購入したユーザーのみが利用規約に従って使用することができます。
   また、このソフトウェアはMITライセンス、ならびにApache 2.0ライセンスで配布されている製作物が含まれています。
   http://www.opensource.org/licenses/mit-license
   http://www.apache.org/licenses/LICENSE-2.0
 */


//=============================================================================
/*:
 * @target MZ
 * @plugindesc サブエミッター機能の有効化
 * @author Thirop
 * @base TRP_ParticleMZ
 * @orderAfter TRP_ParticleMZ
 * @help
 * 【更新履歴】
 * 1.13 2021/10/27 慣性が正しく働かない不具合修正
 * 1.09 2021/8/18  本体設定「キャッシュ設定(β)」に対応
 * 1.08 2021/6/30  Safari/iOSで生じる起動時エラー修正
 * 1.00 2021/4/10  初版。
 *
 * @command set
 * @text set/サブエミッターのセット
 * @desc サブエミッターをセット（親エミッターの再生直後に実行すること）
 *
 * @arg id
 * @text 親エミッターID
 * @desc 対象とする(再生中の)親エミッターID
 *
 * @arg name
 * @text 設定名
 * @desc サブエミッターとして再生する設定名
 *
 * @arg timing
 * @text 開始タイミング
 * @desc 射出を開始するタイミング(0~1)
 * @default 0
 *
 * @arg endTiming
 * @text 終了タイミング
 * @desc 射出を終了するタイミング(0~1)、-1で無効。emitterLifetimeか早いほうが優先。
 * @default -1
 *
 * @arg speedRate
 * @text 慣性速度
 * @desc 慣性の影響度合い(0~1で0%~100%)
 * @default 0
 *
 * @arg inheritAngle
 * @text 角度の継承
 * @desc 角度の継承モード。0で親パーティクルの角度の影響なし、1で影響あり。
 * @default 0
 *
 * @arg inheritScale
 * @text 拡大率乗数の継承
 * @desc 拡大率乗数の継承モード。0で親パーティクルのminimumScaleMultiplierの影響なし、1で影響あり。
 * @default 0
 *
 * @arg delay
 * @text _ディレイ
 * @desc 1以上とすると、指定フレーム後にコマンドを実効。
 * @default 0
 * @type number
 * @min 0
 * 
 */
//============================================================================= 
//PRAGMA_END: subEmitterHeader

(function(){
'use strict';


//PRAGMA: subEmitterRegisterCommands
(()=>{
	var pluginName = 'TRP_ParticleMZ_SubEmitter';
	var command = 'set';
	PluginManager.registerCommand(pluginName, command, function(args){
		//this > interpreter
		var argsArr = Object.values(args)
		var delay = Number(argsArr.pop())||0;
		var pCommand = command;

		argsArr.unshift(pCommand);
		argsArr.unshift('sub');
	
		var eventId = this.eventId();
		if(delay>0){
			$gameScreen._particle.reservePluginCommand(delay,this,argsArr,eventId);
		}else{
			$gameScreen._particle.pluginCommand(this,argsArr,eventId);
		}
	});
})();
//PRAGMA_END: subEmitterRegisterCommands


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/***************************************************************************** */

//PRAGMA: subEmitterPluginSetting
var baseParameters = PluginManager.parameters('TRP_ParticleMZ');
//PRAGMA_END: subEmitterPluginSetting

var LC = TRP_Localize.localize.bind(TRP_Localize,'parSe');

var _Game_Particle_particleData= Game_Particle.prototype.particleData;
Game_Particle.prototype.particleData = function(eventId,id,target,name,z,x,y,image){
	var data = _Game_Particle_particleData.apply(this,arguments);
	if(data.subs){
		data.subs = null;
	}
	return data;
};

var _Game_Particle_pluginCommand= Game_Particle.prototype.pluginCommand;
Game_Particle.prototype.pluginCommand = function(interpreter,args,eventId){
	var sub = args[0].toLowerCase();
	if(sub === 'sub'){
		this.processSubEmitterCommand(interpreter,args,eventId);
	}else{
		_Game_Particle_pluginCommand.call(this,interpreter,args,eventId);
	}
};

Game_Particle.prototype.processSubEmitterCommand = function(interpreter,args,eventId){
	var main = args.shift();
	var sub = args.shift().toLowerCase();

	if(!isNaN(eventId)){
		this.processArgsEventId(args,eventId);
	}

	if(sub==='set'||sub==='play'||sub==='edit'){
		if(sub==='set'||sub==='play'){
			Game_Particle.prototype.particleSubEmitterSet.apply(this,args);
		}else if(sub==='edit'){
			if(Game_Particle.prototype.particleSubEmitterEdit.apply(this,args) && interpreter){
				interpreter.wait(1);
			}
		}
	}
};

Game_Particle.prototype.particleSubEmitterSet = function(id,name,timing=0,endTiming=-1,speedRate=0,inheritAngle=0, inheritScale=0){
	var data = this.dataWithId(id);
	if(!data){
		return;
	}
	var subEmitters = data.subs;
	if(!subEmitters){
		subEmitters = data.subs = [];
	}


	var length = subEmitters.length;
    for(var i=0; i<length; i=(i+1)|0){
        var sb = subEmitters[i];
        if(sb[0]===name){
        	return;
        }
    }

	subEmitters.push([name,Number(timing),Number(endTiming),Number(speedRate),Number(inheritAngle),Number(inheritScale)]);
};


Game_Particle.SUB_EMITTER_DEFAULT_DATA = null;
Game_Particle.prototype.particleSubEmitterEdit = function(id,name,timing=0,endTiming=-1,speedRate=0,inheritAngle=0, inheritScale=0){
	//ensure config data exists
	if(!$dataTrpParticles[name] && !$dataTrpParticlePreset[name]){
		if(!Game_Particle.SUB_EMITTER_DEFAULT_DATA){
			Game_Particle.SUB_EMITTER_DEFAULT_DATA = JsonEx.makeDeepCopy(ParticleEditor.DEFAULT_DATA||{});
			Game_Particle.SUB_EMITTER_DEFAULT_DATA.frequency = 0.1;
		}
		$dataTrpParticles[name] = JsonEx.makeDeepCopy(Game_Particle.SUB_EMITTER_DEFAULT_DATA);
	}
	this.particleSubEmitterSet.apply(this,arguments);

	id = id+Game_Particle.SUB_EMITTER_DEV_SUFFIX+name;
	var exData = {
		timing:timing,
		endTiming:endTiming,
		speedRate:speedRate,
		inheritAngle:inheritAngle,
		inheritScale:inheritScale,
	}
	this._particleEditWithExData(exData,0,'',id);
};

Game_Particle.SUB_EMITTER_DEV_SUFFIX = '/SUB:';

var _Game_Particle_idWithSuffix = Game_Particle.prototype.idWithSuffix;
Game_Particle.prototype.idWithSuffix = function(id){
	if(this._suffix && id.contains(Game_Particle.SUB_EMITTER_DEV_SUFFIX)){
		var args = id.split(Game_Particle.SUB_EMITTER_DEV_SUFFIX);
		var main = args[0];
		var sub = args[1];

		main = _Game_Particle_idWithSuffix.call(this,main);
		return main + Game_Particle.SUB_EMITTER_DEV_SUFFIX + sub;
	}else{
		return _Game_Particle_idWithSuffix.call(this,id);
	}
};


//=============================================================================
// ParticleEmitter
//=============================================================================
var _ParticleEmitter_setupBitmaps = ParticleEmitter.prototype.setupBitmaps;
ParticleEmitter.prototype.setupBitmaps = function(image,bitmaps){
	_ParticleEmitter_setupBitmaps.call(this,image,bitmaps);

	this._setupSubEmitterBitmaps = true;
	if(this._data.subs){
		this.setupSubEmitters(image,bitmaps,this._data.subs);
	}else{
		this.tryStart(image,bitmaps);
	}
};

var _ParticleEmitter_initMembers = ParticleEmitter.prototype.initMembers;
ParticleEmitter.prototype.initMembers = function(){
	_ParticleEmitter_initMembers.call(this);

	this._setupSubEmitterBitmaps = false;
	this._subData = null;
	this._subNames = null;
	this._subBitmaps = null;
};

ParticleEmitter.prototype.setupSubEmitters = function(image,mainBitmaps,subData){
	this._subData = subData;
	this._subNames = [];
	var bitmaps = this._subBitmaps = [];

	var length = subData.length;
    for(var i=0; i<length; i=(i+1)|0){
    	var data = subData[i];
        var name = data[0];
        var config = Game_Particle.configDataWithName(name)
        Array.prototype.push.apply(bitmaps,this.bitmapsWithImage(config.image||baseParameters.defaultImage));
        this._subNames.push(name);
    }

    var length = bitmaps.length;
    for(var i = 0; i<length; i=(i+1)|0){
        bitmaps[i].addLoadListener(ParticleEmitter.prototype.tryStart.bind(this,image,mainBitmaps));
    }
};

var _ParticleEmitter_tryStart = ParticleEmitter.prototype.tryStart;
ParticleEmitter.prototype.tryStart = function(image,bitmaps){
	if(this._started)return;
	if(!this._setupSubEmitterBitmaps){
		return;
	}
	if(this._subBitmaps){
		for(const bitmap of this._subBitmaps){
         	if(!bitmap.isReady()){
         		return false;
         	}  
	    }
	    this._subBitmaps = null;
	}
	return _ParticleEmitter_tryStart.call(this,image,bitmaps);
};

var _ParticleEmitter_start = ParticleEmitter.prototype.start;
ParticleEmitter.prototype.start = function(image,bitmaps){
	_ParticleEmitter_start.call(this,image,bitmaps);

	if(this._subData){
		var emitter = this._emitter;
		var container = this._container;
		for(const data of this._subData){
			this.setSubEmitter(emitter,container,data);
	    }
	}
};
ParticleEmitter.prototype.setSubEmitter = function(emitter,container,data){
	var name = data[0];
	var timing = data[1]||0;
	var endTiming = data.length>=3 ? data[2]||0 : -1; 
	var speedRate = data[3]||0;
	var inheritAngle = data[4]||0;
	var inheritScale = data[5]||0;
	var config = Game_Particle.configDataWithName(name);


	var image = config.image||baseParameters.defaultImage;
	var bitmaps = this.bitmapsWithImage(image);
	var textures = this._texturesWithBitmaps(image,bitmaps);
	emitter.setSubEmitter(container,textures,config,timing,endTiming,speedRate,inheritAngle,inheritScale);
};

ParticleEmitter.prototype.particleConstructor = function(){
	return this._subData ? TRP_ParticleEx : TRP_Particle;
};
ParticleEmitter.prototype.emitterConstructor = function(){
	return this._subData ? TRP_EmitterEx : TRP_Emitter;
};
ParticleEmitter.prototype.subEmitter = function(name){
	return this._emitter._subEmitters ? this._emitter._subEmitters[this._subNames.indexOf(name)] : null;
};

var _ParticleEmitter_loopParticles = ParticleEmitter.prototype.loopParticles;
ParticleEmitter.prototype.loopParticles = function(loopX,loopY){
	_ParticleEmitter_loopParticles.call(this,loopX,loopY,this._emitter);

	if(this._subEmitters){
		var length = this._subEmitters.length;
	    for(var i=0; i<length; i=(i+1)|0){
	    	_ParticleEmitter_loopParticles.call(this,loopX,loopY,this._subEmitters[i]);
	    }
	}
};

var _ParticleEmitter_cleanup = ParticleEmitter.prototype.cleanup;
ParticleEmitter.prototype.cleanup = function(){
	_ParticleEmitter_cleanup.call(this);

	if(this._emitter instanceof TRP_EmitterEx){
		this._emitter.cleanupSubEmitters();
	}
};


//=============================================================================
// TRP_EmitterEx
//=============================================================================
var TRP_Emitter = ParticleEmitter.TRP_Emitter;
var Emitter = PIXI.particles.Emitter;

var TRP_EmitterEx = /** @class */(function(_super){
	__extends(TRP_EmitterEx,_super);

	var utils = PIXI.particles.ParticleUtils;
	function TRP_EmitterEx(particleParent, particleImages, config){
		var _this = _super.call(this, particleParent, particleImages, config)||this;
		_this._subEmitters = [];
		return _this;
	};

    TRP_EmitterEx.prototype.destroy = function(force){
    	if(!force && this.particleTotalCount()>0)return;

    	_super.prototype.destroy.call(this);

    	var length = this._subEmitters.length;
	    for(var i=0; i<length; i=(i+1)|0){
	        this._subEmitters[i].destroy();
	    }
	    this._subEmitters.length = 0;
    };

    TRP_EmitterEx.prototype.cleanupSubEmitters = function(){
		var length = this._subEmitters.length;
	    for(var i=0; i<length; i=(i+1)|0){
	    	var sub = this._subEmitters[i];
	        sub.cleanup();
	    }
    }

    TRP_EmitterEx.prototype.particleTotalCount = function(){
    	var count = this.particleCount;
    	var length = this._subEmitters.length;
	    for(var i=0; i<length; i=(i+1)|0){
	        count += this._subEmitters[i].particleCount;
	    }
		return count;
	};

	TRP_EmitterEx.prototype.update = function (delta) {
		_super.prototype.update.call(this,delta);

		if(!this._parent)return;
		if(this._subEmitters){
			var length = this._subEmitters.length;
		    for(var i=0; i<length; i=(i+1)|0){
		        this._subEmitters[i].update(delta);
		    }
		}
	};

	TRP_EmitterEx.prototype.setSubEmitter = function(container,textures,config,timing,endTiming,speedRate,inheritAngle,inheritScale){
		var emitter = new TRP_SubEmitter(container,textures,config,timing,endTiming,speedRate,inheritAngle,inheritScale);
		this._subEmitters.push(emitter);
	};

	TRP_EmitterEx.prototype.applyAdditionalProperties = function (p) {
		TRP_Emitter.prototype.applyAdditionalProperties.call(this,p);

		p.subEmitters = this._subEmitters;
		if(p.subEmitters){
			var emitters = p.subEmitters;
			var length = emitters.length;
		    for(var i=0; i<length; i=(i+1)|0){
		    	this.pushSubEmitterData(p,i);
		    }
		}
	};

	TRP_EmitterEx.prototype.pushSubEmitterData = function(p,i){
		var data = p.subEmitterData[i];
		if(!data){
			data = {};
			p.subEmitterData[i] = data;

			data._prevEmitterPos = new PIXI.Point(p.x,p.y);
		}else{
			data._prevEmitterPos.x = p.x;
			data._prevEmitterPos.y = p.y;
		}
		data._emit = false;
		data._spawnTimer = 0;
		data._emitterLife = 0;
		data._prevPosIsValid = false;
		data._spawn = false;
	};

	TRP_EmitterEx.prototype.applyCapacityLimit = function(){
		var naturalCapacity = this.naturalCapacity(this._originalFrequency,this._originalParticlesPerWave);
		var subCapacity = this.subEmittersCapacity();

		var mainRate = Math.pow(this._capacityRate,naturalCapacity/((naturalCapacity+subCapacity)||1));
		var subRate = this._capacityRate/(mainRate||1);

		//main limit
		var target = naturalCapacity*mainRate;
		this.maxParticles = target;
		if(this.particlesPerWave>1){
			this.particlesPerWave = Math.ceil(Math.min(this._originalParticlesPerWave,this._originalParticlesPerWave*(target/naturalCapacity)))||1;
			naturalCapacity = this.naturalCapacity(this._originalFrequency,this.particlesPerWave);
		}
		this.frequency = Math.max(this._originalFrequency,this._originalFrequency / (target/naturalCapacity));

		//sub limit
		var length = this._subEmitters.length;
	    for(var i=0; i<length; i=(i+1)|0){
	    	var sub = this._subEmitters[i];
	    	sub.capacityRate = subRate;
	    	sub.maxParticles = sub._originalMaxParticles*subRate;
	    }
	};

	TRP_EmitterEx.prototype.particleCapacity = function(){
		var capacity = _super.prototype.particleCapacity.call(this);
		var subCapacity = this.subEmittersCapacity();
	    return capacity*subCapacity;
	};
	TRP_EmitterEx.prototype.subEmittersCapacity = function(){
		var subCapacity = 1;
		var length = this._subEmitters.length;
	    for(var i=0; i<length; i=(i+1)|0){
	        subCapacity += this._subEmitters[i].particleCapacity();
	    }
	    return subCapacity;
	}

	return TRP_EmitterEx;
}(TRP_Emitter));
ParticleEmitter.TRP_EmitterEx = TRP_EmitterEx;




//=============================================================================
// TRP_SubEmitter
//=============================================================================
var TRP_SubEmitter = /** @class */(function(_super){
	__extends(TRP_SubEmitter,_super);

	var utils = PIXI.particles.ParticleUtils;
	function TRP_SubEmitter(particleParent, particleImages, config, timing=0, endTiming=-1, speedRate=0, inheritAngle=0, inheritScale=0){
		var _this = TRP_Emitter.call(this,particleParent, particleImages, config)||this;
		_this._particleConstructor = TRP_Particle;

		_this.timing = timing;
		_this.endTiming = endTiming;
		_this.speedRate = speedRate;
		_this.inheritAngle = inheritAngle;
		_this.inheritScale = inheritScale;

		return _this;
	};

	TRP_SubEmitter.prototype.update = function(delta){
		if (this._autoUpdate) {
            delta = delta / pixi.settings.TARGET_FPMS / 1000;
        }
        if (!this._parent) return;

        var i, particle, next;
        for (particle = this._activeParticlesFirst; particle; particle = next) {
            next = particle.next;
            particle.update(delta);
        }
	};

	TRP_SubEmitter.prototype.updateParticleEmitter = function(ep,lerp,delta,data){
		//data ~ time,
		//ep : emitter particle
		if(!data._emit){
			if(!data._spawn && lerp>=this.timing){
				data._emit = true;
				data._spawn = true;
				data._emitterLife = this.emitterLifetime
			}else{
				return;
			}
		}else if(this.endTiming>=0 && lerp>=this.endTiming){
			data._spawnTimer = 0;
            data._emitterLife = 0;
            data._emit = false;
            return;
		}

		if (!this._parent)
            return;

		if (this._autoUpdate) {
            delta = delta / pixi.settings.TARGET_FPMS / 1000;
        }

        //update existing particles        
        var prevX, prevY;
        //if the previous position is valid, store these for later interpolation
        if (data._prevPosIsValid) {
            prevX = data._prevEmitterPos.x;
            prevY = data._prevEmitterPos.y;
        }
        //store current position of the emitter as local variables
        var curX = ep.x + this.spawnPos.x;
        var curY = ep.y + this.spawnPos.y;
        var posChanged = data._prevPosIsValid && (prevX!==curX || prevY!==curY);

        //spawn new particles
        if (this._emit) {
            //decrease spawn timer
            data._spawnTimer -= delta < 0 ? 0 : delta;
            //while _spawnTimer < 0, we have particles to spawn
            while (data._spawnTimer <= 0) {
                //determine if the emitter should stop spawning
                if (data._emitterLife > 0) {
                    data._emitterLife -= this._frequency;
                    if (data._emitterLife <= 0) {
                        data._spawnTimer = 0;
                        data._emitterLife = 0;
                        data._emit = false;
                        break;
                    }
                }
                //determine if we have hit the particle limit
                if (this.particleCount >= this.maxParticles) {
                    data._spawnTimer += this._frequency;
                    continue;
                }
                //determine the particle lifetime
                var lifetime = void 0;
                if (this.minLifetime == this.maxLifetime)
                    lifetime = this.minLifetime;
                else
                    lifetime = Math.random() * (this.maxLifetime - this.minLifetime) + this.minLifetime;
                //only make the particle if it wouldn't immediately destroy itself
                if (-data._spawnTimer < lifetime) {
                    //If the position has changed and this isn't the first spawn,
                    //interpolate the spawn position
                    var emitPosX = void 0, emitPosY = void 0;
                    if (data._prevPosIsValid && posChanged) {
                        //1 - _spawnTimer / delta, but _spawnTimer is negative
                        var lerp = 1 + data._spawnTimer / delta;
                        emitPosX = (curX - prevX) * lerp + prevX;
                        emitPosY = (curY - prevY) * lerp + prevY;
                    }
                    else //otherwise just set to the spawn position
                     {
                        emitPosX = curX;
                        emitPosY = curY;
                    }
                    //create enough particles to fill the wave (non-burst types have a wave of 1)
                    var i = 0;
                    for (var len = Math.min(this.particlesPerWave, this.maxParticles - this.particleCount); i < len; ++i) {
                        //see if we actually spawn one
                        if (this.spawnChance < 1 && Math.random() >= this.spawnChance)
                            continue;
                        //create particle
                        var p = void 0;
                        if (this._poolFirst) {
                            p = this._poolFirst;
                            this._poolFirst = this._poolFirst.next;
                            p.next = null;
                        }
                        else {
                            p = new this.particleConstructor(this);
                        }
                        //set a random texture if we have more than one
                        if (this.particleImages.length > 1) {
                            // if using ordered art
                            if (this._currentImageIndex !== -1) {
                                // get current art index, then increment for the next particle
                                p.applyArt(this.particleImages[this._currentImageIndex++]);
                                // loop around if needed
                                if (this._currentImageIndex < 0 || this._currentImageIndex >= this.particleImages.length) {
                                    this._currentImageIndex = 0;
                                }
                            }
                            // otherwise grab a random one
                            else {
                                p.applyArt(this.particleImages[Math.floor(Math.random() * this.particleImages.length)]);
                            }
                        }
                        else {
                            //if they are actually the same texture, a standard particle
                            //will quit early from the texture setting in setTexture().
                            p.applyArt(this.particleImages[0]);
                        }
                        //set up the start and end values
                        p.alphaList.reset(this.startAlpha);
                        p.speedList.reset(this.startSpeed);
                        if (this.minimumSpeedMultiplier != 1) {
                            p.speedMultiplier = Math.random() * (1 - this.minimumSpeedMultiplier) + this.minimumSpeedMultiplier;
                        }
                        p.acceleration.x = this.acceleration.x;
                        p.acceleration.y = this.acceleration.y;
                        p.maxSpeed = this.maxSpeed;
                        if (this.minimumScaleMultiplier != 1) {
                            p.scaleMultiplier = Math.random() * (1 - this.minimumScaleMultiplier) + this.minimumScaleMultiplier;
                        }
                        p.scaleList.reset(this.startScale);
                        p.colorList.reset(this.startColor);
                        //randomize the rotation speed
                        if (this.minRotationSpeed == this.maxRotationSpeed)
                            p.rotationSpeed = this.minRotationSpeed;
                        else
                            p.rotationSpeed = Math.random() * (this.maxRotationSpeed - this.minRotationSpeed) + this.minRotationSpeed;
                        p.rotationAcceleration = this.rotationAcceleration;
                        p.noRotation = this.noRotation;
                        //set up the lifetime
                        p.maxLife = lifetime;
                        //set the blend mode
                        p.blendMode = this.particleBlendMode;
                        //set the custom ease, if any
                        p.ease = this.customEase;
                        //set the extra data, if any
                        p.extraData = this.extraData;


                        //set additional properties to particle
                        this.applyAdditionalProperties(p);
                        //call the proper function to handle rotation and position of particle
                        this._spawnFunc(p, emitPosX, emitPosY, i);

                        if(this.inheritScale>0){
                        	p.scaleMultiplier *= ep.scaleMultiplier;
                        }

                        //initialize particle
                        p.init();

                        //inertia
                        p.iVelocity.x = this.speedRate*ep.velocity.x;
                        p.iVelocity.y = this.speedRate*ep.velocity.y;
                        p._doInertia = !!(p.iVelocity.x||p.iVelocity.y);

                        //inheritAngle
                        if(this.inheritAngle>0){
                        	var v1Rotation = Math.atan2(ep.velocity.y, ep.velocity.x);
                        	utils.rotatePoint(v1Rotation/utils.DEG_TO_RADS, p.velocity);
                        	p.rotation += v1Rotation;
                        }

                        //update the particle by the time passed, so the particles are spread out properly
                        p.update(-data._spawnTimer); //we want a positive delta, because a negative delta messes things up
                        //add the particle to the display list
                        if (!p.parent) {
                            if (this.addAtBack)
                                this._parent.addChildAt(p, 0);
                            else
                                this._parent.addChild(p);
                        }
                        else {
                            //kind of hacky, but performance friendly
                            //shuffle children to correct place
                            var children = this._parent.children;
                            //avoid using splice if possible
                            if (children[0] == p)
                                children.shift();
                            else if (children[children.length - 1] == p)
                                children.pop();
                            else {
                                var index = children.indexOf(p);
                                children.splice(index, 1);
                            }
                            if (this.addAtBack)
                                children.unshift(p);
                            else
                                children.push(p);
                        }
                        //add particle to list of active particles
                        if (this._activeParticlesLast) {
                            this._activeParticlesLast.next = p;
                            p.prev = this._activeParticlesLast;
                            this._activeParticlesLast = p;
                        }
                        else {
                            this._activeParticlesLast = this._activeParticlesFirst = p;
                        }
                        ++this.particleCount;
                    }
                }
                //increase timer and continue on to any other particles that need to be created
                data._spawnTimer += this._frequency;
            }
            //if the position changed before this update, then keep track of that

            data._prevEmitterPos.x = curX;
            data._prevEmitterPos.y = curY;
            data._prevPosIsValid = true;
        }
	};
	return TRP_SubEmitter;
}(ParticleEmitter.TRP_Emitter));




//=============================================================================
// TRP_ParticleEx
//=============================================================================
var TRP_Particle = ParticleEmitter.TRP_Particle;
var TRP_ParticleEx = /** @class */(function(_super){
	__extends(TRP_ParticleEx,_super);

	var utils = PIXI.particles.ParticleUtils;
	function TRP_ParticleEx(emitter){
		var _this = _super.call(this,emitter)||this;
		_this.subEmitters = null;
		_this.subEmitterData = [];

		return _this;
	};

	TRP_ParticleEx.prototype.kill = function () {
		var emitters = this.subEmitters;
		var length = emitters ? emitters.length : 0;
	    for(var i=0; i<length; i=(i+1)|0){
	    	var data = this.subEmitterData[i];
	    	if(!data._spawn || data._emitterLife>0){
	    		return;
	    	}
	    }
        _super.prototype.kill.call(this);
    }

	TRP_ParticleEx.prototype.update = function(delta){
		var lerp = _super.prototype.update.call(this,delta);
		if(this._wait>0)return lerp;

		var emitters = this.subEmitters;
		var length = emitters ? emitters.length : 0;
		var subLerp = lerp<0 ? 1 : lerp;
	    for(var i=0; i<length; i=(i+1)|0){
	        emitters[i].updateParticleEmitter(this,subLerp,delta,this.subEmitterData[i]);
	    }
	    return lerp;
	};


	return TRP_ParticleEx;
}(TRP_Particle));



/* cache config
===================================*/
(function(){
	'use strict';
	if(!baseParameters.useCache||baseParameters.useCache==='false')return;

	//=============================================================================
	// TRP_Emitter
	//=============================================================================
	var Emitter = PIXI.particles.Emitter;
	var TRP_Emitter = ParticleEmitter.TRP_Emitter;
	var TRP_EmitterEx = ParticleEmitter.TRP_EmitterEx;
	if(TRP_EmitterEx){
		var _TRP_EmitterEx_applyAdditionalProperties = TRP_EmitterEx.prototype.applyAdditionalProperties;
		TRP_EmitterEx.prototype.applyAdditionalProperties = function(p){
			_TRP_EmitterEx_applyAdditionalProperties.call(this,p);

			var naturalCapacity = this.naturalCapacity(this._originalFrequency,this._originalParticlesPerWave);
			var rate = naturalCapacity -1;

			var subEmitters = this._subEmitters;
			var length = subEmitters.length;
		    for(var i=0; i<length; i=(i+1)|0){
		        var emitter = subEmitters[i];
		        emitter.preparePoolFromCache(rate);
		    }
		};
	}
})();






})();