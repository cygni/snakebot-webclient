(function(lib, img, cjs, ss) {
  var p; // shortcut to reference prototypes
  lib.webFontTxtFilters = {};

  // library properties:
  lib.properties = {
    width: 20,
    height: 20,
    fps: 24,
    color: '#FFFFFF',
    opacity: 1.0,
    webfonts: {},
    manifest: [],
  };

  lib.ssMetadata = [];

  lib.webfontAvailable = function(family) {
    lib.properties.webfonts[family] = true;
    var txtFilters = (lib.webFontTxtFilters && lib.webFontTxtFilters[family]) || [];
    for (var f = 0; f < txtFilters.length; ++f) {
      txtFilters[f].updateCache();
    }
  };
  // symbols:

  (lib.Star = function(mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#FFDF4A')
      .s()
      .p(
        'AAABqIAAhpIh6C8IgBAAIAriPIgBgBIBRgsIB7C9gAAAAAIDIgsIh4BZIABABgAAAAAIAAi8IAAgBIAyCOIAAAAIgyAvgAjGgsIgBAAICWgDIAxAvg',
      );

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#F1BC14')
      .s()
      .p('AAAAAIhRAsIh2hYIDHAsIgxgwIAxiMIAAC8IAAAAIBRAtIAqCQgAAAAAIAABpIAAAAIh6BUgAAygwICWAEIjIAsg');
    this.shape_1.setTransform(0.1, 0.1);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(59),
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-20, -19, 20, 20);

  // stage content:
  (lib.star = function(mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.instance = new lib.Star();
    this.instance.setTransform(40.1, 39.1, 0.999, 0.999, 0, 0, 0, 20.1, 19.1);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(20.1, 21, 20, 20);
})((lib = lib || {}), (images = images || {}), (createjs = createjs || {}), (ss = ss || {}));
var lib, images, createjs, ss;
