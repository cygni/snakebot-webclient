(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];

// library properties:
lib.properties = {
	width: 40,
	height: 40,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: []
};



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
	if(cur != exportRoot) {	//we have found an element in the list		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) { //insert all it's children just before it		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {	//append element and it's parents in the array		
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



(lib.Exploasionlayeryellow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F1BC14").s().p("AC1KPQhdjsgGEHQgShUgUgRQgrgjgRFLQgBiBgMhhQgYjDg1CcQAEhHgUgGQgogLh3FIQAtibAMhrQAXjXilDtQA5hjgfgiQg+hDm8FFIB2hiQCHhzBPhSQBuhzgQghQgUgqjYBaIBKgkQBOgoAXgYQBIhLoAB9IBsgpQB7gwBQgnQEAh9kaANIAqgKQAvgNAagSQBWg0iahGQBEAKAUgRQAVgRgggiQhLhSkBhcIEIBSQDtBDiFhSQBNAmgJgoQgQhRmmmIIBTBAQBiBJBOAvQD4CWg5ipIAeAdQAjAbAPgJQAygbiWl3IArBRQA0BfAqBAQCIDPgDisIAOAjQARAlAOAKQAtAdAAkAIAmDeQAoC3APjIIAJAtQANAwAPAKQAwAiA8lbIgHBGQgGBRAFA2QASCtB9ijIgNAqQgKArAQAFQA2AUEvloQgXAggeAuQg8BbgkBFQh1DeCmhVQgSAQgTASQglAjgBAPQgHAtFbjCQiDBVhSBKQikCTD3g4QgXAJgZAMQg0AYgLARQgiAxE0gdQiTARhVAZQjDA8GhA6QihgShNAKQinAUHYCaQigguhtgOQjbgbD9CiQhBgigxgQQhjgjBOBVQgQgHgQgEQghgIADAPQAJAuFhD9Qihhnh4g+Qjwh/DODFQgVgNgZgKQgwgUgOANQgsAtFCFtQhxh8hrhTQjSioAoDIQgyhIgfAGQg9AOBhGNQgtiqguh1g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.2,-94.2,184.5,188.5);


(lib.Exploasionlayerorange = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E96D2D").s().p("ACVKPQhcjrgHEGQgRhUgVgRQgogjgUFLQAAiAgMhiQgYjDg2CcQAEhHgUgGQgogLh2FIQAsibAMhrQAYjYimDuQA6hjgfghQg+hEm8FFIB2hjQCGhyBPhSQBuhzgQghQgTgqjYBaIBJgkQBPgpAWgXQBJhLoAB9IBsgpQB7gwBQgmQD/h+kaANIArgKQAugOAbgQQBVg1iZhGQBFAKAagLQAcgLgagdQg9hEkjh7IBnAjQB3AnBSAXQD+BEjMiCQB+BMAXgOQAugconndIBsBYQB9BkBcA8QEkDCinkVIAeAdQAiAbAQgJQAxgbiVl3IAqBSQA0BeArBAQCHDPgCisIANAjQARAlAPAJQAtAeAAkAIAmDfQApC2ANjIIAKAtQAMAwAPAKQAxAiA7lbIgGBGQgGBRAFA2QARCsB9iiIgNAqQgKArARAFQA2AUEuloQgWAggfAtQg7BcglBFQh0DeClhVIgsAjQgsAnAFALQAOAjHoj3QiqBkh4BaQjwCyD2g4QgXAJgZAMQgzAYgLARQgjAxE1gdQiUARhUAaQjDA7GhA7QihgShOAJQimAUHYCaQihguhtgOQjagcD8CjQhAghgygSQhigiBNBVQgQgHgQgEQgggIADAOQAIAvFiD9Qiihmh3hAQjwh+DODFQgWgNgYgKQgxgUgNAOQgsArFCFuQhyh8hqhTQjTioAoDIQgxhIgfAGQg+AOBhGNQgsiqgvh1g");
	this.shape.setTransform(3.2,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.2,-94.2,190.8,188.5);


// stage content:
(lib.explosion = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Orange
	this.instance = new lib.Exploasionlayerorange();
	this.instance.parent = this;
	this.instance.setTransform(20,20.1,0.05,0.05);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(11).to({_off:false},0).to({regX:0.7,regY:0.7,scaleX:0.08,scaleY:0.08,alpha:1},2).to({regX:0,regY:0,scaleX:0.14,scaleY:0.14},5).to({regX:0.3,scaleX:0.16,scaleY:0.16},2).to({regX:0,scaleX:0.21,scaleY:0.21,alpha:0},5,cjs.Ease.get(0.3)).wait(1));

	// Yellow
	this.instance_1 = new lib.Exploasionlayeryellow();
	this.instance_1.parent = this;
	this.instance_1.setTransform(20,20.1,0.05,0.05);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({_off:false},0).to({regX:0.7,regY:0.7,scaleX:0.08,scaleY:0.08,alpha:1},2).to({regX:0,regY:0,scaleX:0.14,scaleY:0.14},5).to({regX:0.3,scaleX:0.16,scaleY:0.16},2).to({regX:0,scaleX:0.21,scaleY:0.21,alpha:0},5,cjs.Ease.get(0.1)).to({_off:true},1).wait(7));

	// Orange copy
	this.instance_2 = new lib.Exploasionlayerorange();
	this.instance_2.parent = this;
	this.instance_2.setTransform(20,20.1,0.05,0.05);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:0.7,regY:0.7,scaleX:0.08,scaleY:0.08,alpha:1},2).to({regX:0,regY:0,scaleX:0.14,scaleY:0.14},3).to({regX:0.3,scaleX:0.16,scaleY:0.16},2).to({regX:0,scaleX:0.21,scaleY:0.21,alpha:0},3,cjs.Ease.get(0.1)).to({_off:true},1).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(35.3,35.3,9.6,9.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;