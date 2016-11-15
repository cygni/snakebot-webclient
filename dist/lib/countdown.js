(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Fight = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhWCpIAmgfQAEgDAGgPQAGgQAAgGIAAjMQgDgFgPAAQgcAAgJAIQgGAGgFAMQgEAMgDASQgKgegmhTIEzAAQgdAqgfBFIgFgaQgGgQgIgGQgKgGggAAQgFAAgDAHIAACgQAAAnAGAVQAGATAMANQALANARAIg");
	this.shape.setTransform(58,-1.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhED0QgRghgagbQgggjgbgFIAIgHQARAAAKgLQALgJAEgSQACgKAAgyIADgqIAAgiQAAhNgEgXQgCgOgSgNIgVgRICSAAIgbAXQgUAQAAAQIAABQIB+AAQAEgDAAgYIgBgoQgEgYgQgGIgVgIQANgEAPgKIAdgYQAbgbAPgbIAAC6IAABKIAAA+IAEAkQAFAMANAJIACABIAVAQIiaAAIAbgRQAKgGAGgNQAGgMAAgMIADg6IgBgYIiBAAIAADpg");
	this.shape_1.setTransform(23.3,0.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhnB+Qgpg0AAhEQAAhFAkg3QApg/BCAAQAMAAATAGIAnAPQAsAVALABIAVgGIAAAKIiABmIAOg2QAAgOgJgHQgJgGgRAAQgmgBgWAvQgHARgFASQgDASAAARQAAAWAEASQAFATAKAQQAXAkAoAAQAWAAAPgMQAOgNAAgXQAAgcgXAAIgJABIgKABQAWgVAkgcIBAgwIAGABQgbAhAABPQAAAWAFAOQAIAXARAAIgQAKIgRAKIgwAhQgOAHgOADQgOAEgOAAQhBAAgsg4g");
	this.shape_2.setTransform(-9.9,-1.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhJCoIAegYQAQgQAAgTIAAjRQAAgUgMgRQgLgRgXgNICRAAQgIACgPANQgUAQAAAMIAADtQAAASASAPIAbAWg");
	this.shape_3.setTransform(-33.3,-1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhdCcQgZgighgYIAZgLQAHgDAEgMQAFgMAAgIIAAjeQAAgQgMgMIgXgSQgNgJgBgFIE/AAIhRB2IABgMIABgMQAAgOgHgIQgGgHgNAAIhZAAIgPAAIAABfIAHAAIAKAAIAPAAQAcAAAKgDQASgIALgeQADgGAFAAIAACfIgGgEQgGgXgQgLQgPgLgYgBIglAAIgDAFIAAByIgBA8IgCA8QgQgqgZghg");
	this.shape_4.setTransform(-58.5,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Fight, new cjs.Rectangle(-76.5,-30.2,153.1,60.4), null);


(lib._5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhiCsIgmgVQgLgHgJAAQgFAAgLAHIgHgGIBBhVIAHAEIgCAMQAAAOAVAOQAXAOAZAHQAZAIAaAAQAlAAAYgPQAcgSAAgjQAAgigdgRQgYgOgkAAQgUAAgbAHQgSAEgJAGQgIAGAAAHIADALIgGAFIhfheIAGgGIADAAQANAAAAgQIAAhOQAAgQgRgEIAAgJIEhAAQAPAAAFgRIAIAAIAABhIgIAAQgFgSgPAAIjPAAIAABQQAWgLAZgGQAagFAcAAQBCAAAsAbQAzAgAAA+QAAAqgYAhQgVAcgkAOQgkAOgyAAQhAAAgvgXg");
	this.shape.setTransform(-0.1,-3.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib._5, new cjs.Rectangle(-21.7,-30.2,43.4,60.4), null);


(lib._4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAJDLQAFgbAAgNIAAhQIiIAAIAohxIgZAAIBPhvIgVCmIA/AAIAAjMIA9hXIAAEjIAwAAIgeA6IgSAAIAABMIATAAIhiBsg");
	this.shape.setTransform(-0.3,-8.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib._4, new cjs.Rectangle(-21.7,-30.2,43.4,60.4), null);


(lib._3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag5C2QghgHgegOQgZgMgHAAQgHAAgLAKIgIgEIArhjIAIADIgCAGQAAAQASANQARANAjAKQAkAKAiAAQAiAAAXgKQAggPAAgeQAAgagWgNQgVgMgrAAIgcABQgQADgDANIgJAAIAAhYIAJAAQADAOAPAEIAbABQAoAAATgMQAVgMAAgYQAAgYgVgMQgTgLgoAAQgbAAgYAFQgXAHgVAMQgUALAAANQAAAFAEAHIgHAGIg+hMIAHgGIAPAFQAFAAAJgHQAigWAlgLQAmgMApAAQAxAAAiAOQAhAPARAcQAOAWAAAbQAAAYgMASQgMATgXAOQAfAKAPAVQAPAUAAAdQAAA+g4AeQgWANgcAHQgbAGgiAAQgjAAgigIg");
	this.shape.setTransform(-0.6,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib._3, new cjs.Rectangle(-21.7,-30.2,43.4,60.4), null);


(lib._2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACmDDQgFgRgPAAIkcAAQgNAAgFACQgFAEgDALIgJAAIAAgRQAAgjAIgVQAHgXAPgUQAQgSAVgQQAWgQAzgXIAsgUQAegOAPgRQAPgRAAgUQAAgYgQgNQgQgMghAAQgcAAgjANQgVAKgKAKQgLALAAAMIAFARIgGAGIhIhNIAHgGIAPAFQAGAAAPgNQA7gzBVAAQAdAAAZAHQAXAGATAOQAqAfAAA3QAAAYgHATQgHAUgQAQQgXAXgwAWIgoASIgdAMIghAPQgRAKgKAOIDfAAQAPAAAFgRIAIAAIAABkg");
	this.shape.setTransform(-0.1,-2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib._2, new cjs.Rectangle(-21.7,-30.2,43.4,60.4), null);


(lib._1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AglC4IAAgJQASgEgBgQIAAjmIgZAFQgPAEgEARIgJAAIAAhiIAJAAQAFAPAJAAIAIgBIAWgFIAAgQQABgPgSgEIAAgJIBvAAIAAAJQgQAEAAAPIAAE1QAAAQAQAEIAAAJg");
	this.shape.setTransform(-0.4,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib._1, new cjs.Rectangle(-21.7,-30.2,43.4,60.4), null);


// stage content:
(lib.countdown = function(mode,startPosition,loop) {
	loop = false;
	this.initialize(mode,startPosition,loop,{});

	// Fight
	this.instance = new lib.Fight();
	this.instance.parent = this;
	this.instance.setTransform(320.1,280.2,1.382,1.382,0,0,0,0.1,0.2);
	this.instance.alpha = 0;
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(145).to({_off:false},0).to({alpha:1},5).wait(26).to({alpha:0},5).wait(1));

	// 1
	this.instance_1 = new lib._1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(320,280.4,4.607,4.607,0,0,0,0,0.1);
	this.instance_1.alpha = 0;
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,0);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(116).to({_off:false},0).to({scaleX:3.8,scaleY:3.8,alpha:1},5,cjs.Ease.get(0.3)).to({regX:0.1,regY:0.2,scaleX:0.85,scaleY:0.85,x:320.1,y:280.1},24).to({regX:0.2,regY:0.5,scaleX:0.23,scaleY:0.23,x:320,y:280,alpha:0},5).to({_off:true},1).wait(31));

	// 2
	this.instance_2 = new lib._2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(320,280.4,4.607,4.607,0,0,0,0,0.1);
	this.instance_2.alpha = 0;
	this.instance_2.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,0);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(87).to({_off:false},0).to({scaleX:3.8,scaleY:3.8,alpha:1},5,cjs.Ease.get(0.3)).to({regX:0.1,regY:0.2,scaleX:0.85,scaleY:0.85,x:320.1,y:280.1},24).to({regX:0.2,regY:0.5,scaleX:0.23,scaleY:0.23,x:320,y:280,alpha:0},5).to({_off:true},1).wait(60));

	// 3
	this.instance_3 = new lib._3();
	this.instance_3.parent = this;
	this.instance_3.setTransform(320,280.4,4.607,4.607,0,0,0,0,0.1);
	this.instance_3.alpha = 0;
	this.instance_3.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,0);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(58).to({_off:false},0).to({scaleX:3.8,scaleY:3.8,alpha:1},5,cjs.Ease.get(0.3)).to({regX:0.1,regY:0.2,scaleX:0.85,scaleY:0.85,x:320.1,y:280.1},24).to({regX:0.2,regY:0.5,scaleX:0.23,scaleY:0.23,x:320,y:280,alpha:0},5).to({_off:true},1).wait(89));

	// 4
	this.instance_4 = new lib._4();
	this.instance_4.parent = this;
	this.instance_4.setTransform(320,280.4,4.607,4.607,0,0,0,0,0.1);
	this.instance_4.alpha = 0;
	this.instance_4.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,0);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(29).to({_off:false},0).to({scaleX:3.8,scaleY:3.8,alpha:1},5,cjs.Ease.get(0.3)).to({regX:0.1,regY:0.2,scaleX:0.85,scaleY:0.85,x:320.1,y:280.1},24).to({regX:0.2,regY:0.5,scaleX:0.23,scaleY:0.23,x:320,y:280,alpha:0},5).to({_off:true},1).wait(118));

	// 5
	this.instance_5 = new lib._5();
	this.instance_5.parent = this;
	this.instance_5.setTransform(320,280.4,4.607,4.607,0,0,0,0,0.1);
	this.instance_5.alpha = 0;
	this.instance_5.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleX:3.8,scaleY:3.8,alpha:1},5,cjs.Ease.get(0.3)).to({regX:0.1,regY:0.2,scaleX:0.85,scaleY:0.85,x:320.1,y:280.1},24).to({regX:0.2,regY:0.5,scaleX:0.23,scaleY:0.23,x:320,y:280,alpha:0},5).to({_off:true},1).wait(147));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(538,418.9,216,295);
// library properties:
lib.properties = {
	width: 640,
	height: 560,
	fps: 24,
	color: "#454545",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;