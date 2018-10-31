(function(lib, img, cjs, ss) {
  var p; // shortcut to reference prototypes
  lib.webFontTxtFilters = {};

  // library properties:
  lib.properties = {
    width: 40,
    height: 40,
    fps: 24,
    color: '#454545',
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

  (lib.bh3 = function(mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .rf(['#090D17', 'rgba(9,13,23,0)'], [0.498, 1], 0, 0, 0, 0, 0, 89.3)
      .s()
      .p(
        'AlaM2QighEh8h7Qh7h8hEigQhGimAAi1QAAi0BGimQBEigB7h8QB8h7CghEQCmhGC0AAQC1AACmBGQCgBEB8B7QB7B8BECgQBGCmAAC0QAAC1hGCmQhECgh7B8Qh8B7igBEQimBGi1AAQi0AAimhGg',
      );
    this.shape.setTransform(143.1, 146);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#090D17')
      .s()
      .p(
        'ACKWMQCyg6CghXQIAkXCQnWIAFgSQA/i9gVjoQgnmplRlFIgIgGQhkhUiUg6QkNhrkWA2QhqAVhdAwQhhAwhLBJQh9B4glCYIgGAXQgEANgBAIQgZCZAdB0QAyDLDQBCQgug9gRhiQgOhMAIhAQAUh5BMhfQBih9CngrQBWgVBcAIQBYAIBVAkQCMA6BfBjQB/CGAbC+IAIBOQAFBggPBgQgwE0jkDDQhRBMiWA+QkqB8lVhFQhpgRiQhNQkfiYi+krQgNgWgUgpQgmhUgfhoQhSkZAnkOQAlkDCUjyQA2hYBDhNQBQhnCdhnQE4jPF6gIQipAUjPBeQmfC6i9FyQgrBOgmCBQhNECAYEBQAOCbA+CPQA9CRBnB2QChC7DJBkQCQBHChAOQCiAOCWgwQCDgpB0hRQB/hZA5hoQAkg7AWheQAri8hHiuQgOgmgkgsQhIhZhvgZQAaAqAQAxQATA3ABAuIgDBEQgIBUgdBKQheDrkHAmQiFAPiZguQkxhehhk4QgdhZAAiGQABkMCYjZQA/hUB6hYQDzivEhgLIBbABQByAIByAfQFsBgDjEeIAwBFQA5BZArBjQCNE/gnE0IgIBBQgNBRgZBUQhPEKilC3QiJCTiMBaQk5DLmRAog',
      );
    this.shape_1.setTransform(142.4, 146);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#202D48')
      .s()
      .p(
        'AQXIsQAYiKgBhxIAAgdQAEjmhajUQgdhDgig6IgdgsQjsmJm7h3QiKgliNgGIhzADQkpARjmDLQhzBmg6BnQgBAEEMieIEMifImhEnIhkD/Ig6EoIC8GNIEECUIH+jXQggDTi0BhQh4BAiRgPQjjgViwhpQg3ghgrglIgggfQiyivgRk8QgFhhAMhlIANhSQA7kqD5jPQB8hnBxgsQEWiKFwAiQC5ARCBAsQHoCVDSHkQBBCXAeClQAPBUACA1QAYFYiREgQhICRhNBLQBrjOArjxg',
      );
    this.shape_2.setTransform(169.1, 130.1);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#202D48')
      .s()
      .p(
        'AgIP8QiMgPi0hFQlpiJjMkNQhJhhhFidQiLk3AQkqQAHiGAridQBIkLCKiEQg5BPg0CRQhpEgAYFFIATB5QAeCPA7CEQC5GkGJCOIAnAPQCyBPDEAMQFbAVDqjeIDLjSICCkEIg6nbIh1jcIkbA5IoXB+QAZiDBch1QC7jnFkAiIBGAQQBWAXBNAsQD2CKBCEWIAQBdQANB1gKB0QggF5kBD1QhaBdibBWQkJCUkSAAQguAAgtgEg',
      );
    this.shape_3.setTransform(116.1, 159.2);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f('#65748D')
      .s()
      .p(
        'AoLUXQiggui4h6Qlwj1h3l+IATAkQAaAuAhAxQBrCbCKB7QG7GGJWhZIAmgGQAwgKA0gQQClg0CJhiQG2k7gDqcQgciuhaihQi1lBk3BOQgOAElKJIIF7iyIAtAtQAzA7AgBBQBmDVh9DTQgXAmgtAxQhbBjhyA7QlqC9nFkcQghgTgugqQhdhThDhwQjWloCAoFQAJgrAZhCQAyiFBQh1QD/l3HIhRIAvgIQA8gJBAgDQDVgLDHAtQJ8CQEDKHQhLificilQk4lKmXgfQhsgUigAHQk+APkBCKQh7BBh2CTQjrElAfGaIDSHtIExiQIi3iVQgIg1ABhNQABieAtiFQCOmrIIgWIBtAEQCGAOB6AzQGFChB+HRIAWB3QATCUgRCWQg3HfmFEuQh7BhjLBNQj0BbjxAAQihAAihgog',
      );
    this.shape_4.setTransform(142.1, 144.9);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1),
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 286.3, 292);

  // stage content:
  (lib.blackhole = function(mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.instance = new lib.bh3();
    this.instance.setTransform(20, 20, 0.137, 0.137, 0, 0, 0, 143.1, 146);

    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .to({ rotation: -360 }, 25)
        .wait(1),
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(20.4, 20, 39.2, 40);
})((lib = lib || {}), (images = images || {}), (createjs = createjs || {}), (ss = ss || {}));
var lib, images, createjs, ss;
