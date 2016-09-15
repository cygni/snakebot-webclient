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



(lib.Star2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFDF4A").s().p("AAABqIAAhpIB7C9gAh7C9IAriPIgBgBIBRgsIh6C8gAAAAAIDHgsIh3BZIABABgAAAAAIAAi8IAAgBIAyCOIAAAAIgyAvgAjGgsIAAAAICVgDIAxAvg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F1BC14").s().p("AAAAAIAABpIAAAAIh6BUIB6i9IhRAsIh1hYIDGAsIgxgwIAxiMIAAC8IAAAAIBRAtIAqCQgAAygwICVAEIjHAsg");
	this.shape_1.setTransform(0,0.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFF037").s().p("AgYBfIAAi8IABgBIAvCMIABAAIgwAxg");
	this.shape_2.setTransform(2.6,-9.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFDF4A").s().p("AAAAjIAAhnIB7C7gAh7B3IAriOIgBgBIBRgsIh6C7gAAAhFIDHgtIh3BaIABABgAjGhyIAAgBICVgDIAxAxg");
	this.shape_3.setTransform(0,7.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1BC14").s().p("AAAAAIhRAsIh1hYIDGAsIgxgwIAxiMIAAC8IAAAAIAygwICVAEIjHAsIBRAtIAqCQgAAAAAIAABpIAAAAIh6BUg");
	this.shape_4.setTransform(0,0.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,240,55,0.498)").s().p("AgYBfIAAi8IABgBIAvCMIABAAIgwAxg");
	this.shape_5.setTransform(2.6,-9.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFDF4A").s().p("AAmAjIAAhnIB7C7gAhVB3IAriOIgBgBIBRgsIh6C7gAighyIAAgBICVgDIAwAxg");
	this.shape_6.setTransform(-3.8,7.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFF037").s().p("AhiAAIDFgsIh1BYIABABg");
	this.shape_7.setTransform(10,0.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F1BC14").s().p("AAAAAIAABpIAAAAIh6BUIB6i9IhRAsIh1hYIDGAsIgxgwIAxiMIAAC8IAAAAIAygwICVAEIjHAsIBRAtIAqCQg");
	this.shape_8.setTransform(0,0.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,240,55,0.498)").s().p("AhiAAIDFgsIh1BYIABABg");
	this.shape_9.setTransform(10,0.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFF037").s().p("Ag8AKIAAhnIB5C7g");
	this.shape_10.setTransform(6.2,9.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFDF4A").s().p("AgwC+IAriQIgBgBIBQgsIh6C9gABKAAIAAi7IAAgCIAyCOIABAAIgzAvgAh8grIAAgBICTgDIAyAvg");
	this.shape_11.setTransform(-7.4,0);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(255,240,55,0.498)").s().p("Ag8AKIAAhnIB5C7g");
	this.shape_12.setTransform(6.2,9.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFF037").s().p("Ag9BeIAriOIgBgBIBRgsIh6C7g");
	this.shape_13.setTransform(-6.2,9.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F1BC14").s().p("AAAAAIhRAsIh1hYIDGAsIgxgwIAxiMIAAC8IAAAAIBRAtIAqCQgAAAAAIAABpIAAAAIh6BUgAAAAAgAAAAAIAygwICVAEIjHAsg");
	this.shape_14.setTransform(0,0.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFDF4A").s().p("AAABIIDHguIh3BbIABABgAAABIIAAi8IAAgBIAyCMIAAAAIgyAxgAjGAaIAAAAICVgDIAxAxg");
	this.shape_15.setTransform(0,-7.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,240,55,0.498)").s().p("Ag9BeIAriOIgBgBIBRgsIh6C7g");
	this.shape_16.setTransform(-6.2,9.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFF037").s().p("AhigTIAAgBICTgDIAyAvg");
	this.shape_17.setTransform(-10,-2.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFDF4A").s().p("AhiBqIAAhpIB6C9gAhiAAIDFgsIh1BZIABABgAhjAAIAAi8IABgBIAyCOIABAAIgzAvg");
	this.shape_18.setTransform(10,0);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,240,55,0.498)").s().p("AhigTIAAgBICTgDIAyAvg");
	this.shape_19.setTransform(-10,-2.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F1BC14").s().p("AAAAAIhRAsIh1hYIDGAsIgxgwIAxiMIAAC8IAAAAIAygwICVAEIjHAsIBRAtIAqCQgAAAAAIAABpIAAAAIh6BUgAAAAAg");
	this.shape_20.setTransform(0,0.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFDF4A").s().p("AgkAhIAAhnIB6C7gAihB1IAriOIAAgBIBSgsIh8C7gAgkhHIDFgtIh3BaIABABg");
	this.shape_21.setTransform(3.8,7.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},200).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},2).to({state:[{t:this.shape_11},{t:this.shape_8},{t:this.shape_10},{t:this.shape_9}]},2).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},2).to({state:[{t:this.shape_18},{t:this.shape_14},{t:this.shape_17},{t:this.shape_16}]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_2},{t:this.shape_19}]},2).to({state:[{t:this.shape_3},{t:this.shape_8},{t:this.shape_5}]},2).wait(2));

	// Layer 1 copy
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F1BC14").s().p("AAAAAIAABpIAAAAIh6BUIB6i9IhRAsIh1hYIDGAsIgxgwIAxiMIAAC8IAAAAIBRAtIAqCQgAAygwICVAEIjHAsg");
	this.shape_22.setTransform(0,0.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFDF4A").s().p("AAABqIAAhpIB7C9gAh7C9IAriPIgBgBIBRgsIh6C8gAAAAAIDHgsIh3BZIABABgAAAAAIAAi8IAAgBIAyCOIAAAAIgyAvgAjGgsIAAAAICVgDIAxAvg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22}]}).wait(214));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-19,40,38.1);


(lib.Fade = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#F1BC14","rgba(255,223,74,0)"],[0,1],0,0,0,0,0,18.9).s().p("Ah+B+Qg1g0AAhKQAAhJA1g1QA1g1BJAAQBKAAA0A1QA1A1ABBJQgBBKg1A0Qg0A1hKABQhJgBg1g1g");
	this.shape.setTransform(18,18);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,36,36);


// stage content:
(lib.star = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Star
	this.instance = new lib.Star2();
	this.instance.parent = this;
	this.instance.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(61));

	// Fade
	this.instance_1 = new lib.Fade();
	this.instance_1.parent = this;
	this.instance_1.setTransform(20,20,1,1,0,0,0,18,18);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:0},30).to({alpha:1},30).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20.1,21,40,38.1);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;